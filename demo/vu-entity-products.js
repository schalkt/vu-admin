// Showcase entitás: a vu-admin tábla és form funkcióinak nagy része egy helyen, a https://dummyjson.com/products API-n.
// A dummyjson nem ismeri a vu-admin filter/order formátumát és nem perzisztál: a beforeItemsLoad a rendezést,
// a cím keresést és a kategória szűrőt átfordítja a dummyjson paramétereire, a többi szűrő csak látható.
// HTML-t összefűző template-ekben minden adatot escape-elni kell (XSS) — a helperek a dist buildből jönnek.

window.VuEntities = window.VuEntities || {};

window.VuEntities.products = (preset) => {

	const { escapeHtml, safeUrl } = window.VuAdminHelpers;

	const BASE_URL = 'https://dummyjson.com/products';

	const categories = [
		'beauty', 'fragrances', 'furniture', 'groceries', 'home-decoration', 'kitchen-accessories',
		'laptops', 'mens-shirts', 'mens-shoes', 'mobile-accessories', 'smartphones', 'sunglasses',
		'tablets', 'tops', 'vehicle', 'womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-watches',
	];

	const label = (slug) => slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

	const money = (value) => Number(value || 0).toLocaleString('hu-HU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

	// a végleges settings objektum (afterSettingsInit), hogy a form api url-t mentés előtt át lehessen állítani
	let settingsRef = null;

	const api = {
		url: BASE_URL,
		input: {
			items: 'products',
			total: 'total',
		},
		output: {
			fields: undefined,
		},
	};

	const events = {
		afterSettingsInit: (settings) => {
			settingsRef = settings;
		},

		// vu-admin filter/order → dummyjson: ?sortBy=&order=, /search?q=, /category/{slug}
		beforeItemsLoad: (urlParams, settings) => {
			const order = Array.isArray(urlParams.order) ? urlParams.order.filter(Boolean)[0] : null;
			delete urlParams.order;
			if (order) {
				urlParams.sortBy = order.key;
				urlParams.order = String(order.dir).toLowerCase();
			}

			const filter = urlParams.filter || {};
			delete urlParams.filter;
			delete urlParams.page;

			let url = BASE_URL;
			const category = filter.category && [].concat(filter.category.value)[0];

			if (filter.title && filter.title.value) {
				url = BASE_URL + '/search';
				urlParams.q = filter.title.value;
			} else if (category) {
				url = BASE_URL + '/category/' + encodeURIComponent(category);
			}

			settings.table.api.url = url;
		},

		// dummyjson: új elem POST /products/add, módosítás PUT /products/{id}
		beforeItemSave: (item, urlParams, input) => {
			if (settingsRef) {
				settingsRef.form.api.url = input && input.id ? BASE_URL : BASE_URL + '/add';
			}
			// csak a ténylegesen szerkeszthető mezők mennek el
			delete item.reviews;
			delete item.meta;
		},

		// a form api-t a törlés és az újratöltés is használja → vissza az alap url-re
		afterItemSave: () => {
			if (settingsRef) {
				settingsRef.form.api.url = BASE_URL;
			}
		},

		beforeItemDelete: () => {
			if (settingsRef) {
				settingsRef.form.api.url = BASE_URL;
			}
		},

		afterItemsLoad: (data) => {
			// a dummyjson images mezője URL lista, a gallery upload mező ettől független (inline JSON tárolás)
			(data.products || []).forEach((product) => {
				if (!Array.isArray(product.gallery)) {
					product.gallery = [];
				}
				product.inStock = product.stock > 0;
			});
		},
	};

	const columns = [
		{
			title: '#',
			click: 'TABLE_ROW_SELECT',
			index: true,
			sortable: false,
			width: '3%',
			header: { class: 'text-center' },
		},
		{
			name: 'id',
			title: 'ID',
			width: '4%',
			class: 'text-end text-secondary',
			filter: {
				type: 'number',
				operators: true,
				buttonx: true,
			},
		},
		{
			name: 'thumbnail',
			title: 'Kép',
			sortable: false,
			width: '5%',
			class: 'text-center p-1',
			template: (thumbnail) => {
				const url = escapeHtml(safeUrl(thumbnail));
				if (!url) return '';
				return '<a target="_blank" rel="noopener noreferrer" href="' + url + '"><img class="border rounded shadow-sm" height="34" width="34" style="object-fit:cover" src="' + url + '"></a>';
			},
		},
		{
			name: 'title',
			title: 'Termék <small class="text-muted fw-light">(keresés)</small>',
			class: 'text-nowrap',
			filter: {
				type: 'text',
				default_operator: '%',
				buttonx: true,
			},
			input: {
				type: 'text',
				autosave: true,
			},
			bulk: {
				enabled: true,
			},
		},
		{
			name: 'sku',
			title: 'SKU',
			class: 'text-secondary small',
			hidden: true,
		},
		{
			name: 'brand',
			title: 'Márka',
			collapsible: true,
			class: 'text-nowrap',
			template: (brand) => brand ? escapeHtml(brand) : '<span class="text-muted">–</span>',
		},
		{
			name: 'category',
			title: 'Kategória',
			class: 'text-secondary',
			filter: {
				type: 'select',
				dropdown: true,
				multiple: true,
				default_operator: 'in',
				options: categories.map((slug) => ({ value: slug, label: label(slug) })),
			},
			template: (category) => '<span class="badge text-bg-light border">' + escapeHtml(label(category || '')) + '</span>',
		},
		{
			name: 'tags',
			title: 'Címkék',
			sortable: false,
			collapsed: true,
			template: (tags) => (tags || []).map((tag) => '<span class="badge border text-secondary me-1">' + escapeHtml(tag) + '</span>').join(''),
		},
		{
			name: 'rating',
			title: 'Értékelés',
			width: '9%',
			progressbar: {
				class: 'bg-warning text-dark fw-bold',
				max: 5,
				value: true,
			},
			filter: {
				type: 'number',
				operators: [
					{ label: '>', value: '>' },
					{ label: '<', value: '<' },
				],
				default_operator: '>',
			},
		},
		{
			name: 'stock',
			title: 'Készlet',
			width: '12%',
			filter: {
				type: 'number',
				operators: true,
				default_operator: '<',
			},
			input: {
				type: 'number',
				min: 0,
				max: 1000,
				class: (params) => {
					const stock = params.item.stock;
					return (stock < 10 ? 'bg-danger text-light' : (stock < 50 ? 'bg-warning text-dark' : 'bg-success text-light')) + ' text-end fw-bold';
				},
				prefixcheck: {
					name: 'inStock',
				},
				suffix: '<i class="bi bi-box-seam"></i>',
				autosave: true,
			},
			bulk: {
				enabled: true,
			},
		},
		{
			name: 'price',
			title: 'Ár',
			width: '11%',
			header: { class: 'text-end' },
			input: {
				type: 'number',
				class: 'text-end fw-bold',
				suffix: 'USD',
				autosave: true,
			},
			filter: {
				type: 'number',
				operators: true,
				default_operator: '<',
			},
		},
		{
			name: 'availabilityStatus',
			title: 'Elérhetőség',
			collapsible: true,
			input: {
				type: 'select',
				options: [
					{ value: 'In Stock', label: 'Raktáron' },
					{ value: 'Low Stock', label: 'Kevés' },
					{ value: 'Out of Stock', label: 'Elfogyott' },
				],
				autosave: true,
			},
			filter: {
				type: 'select',
				options: [
					{ value: '', label: 'Mind' },
					{ value: 'In Stock', label: 'Raktáron' },
					{ value: 'Low Stock', label: 'Kevés' },
					{ value: 'Out of Stock', label: 'Elfogyott' },
				],
			},
			bulk: {
				enabled: true,
			},
		},
		{
			name: 'meta.updatedAt',
			title: 'Módosítva',
			class: 'text-nowrap small text-secondary',
			collapsible: true,
			convert: {
				in: (value) => value ? new Date(value).toLocaleDateString('hu-HU') : '',
			},
			filter: {
				type: 'date',
				operators: [
					{ label: '>', value: '>' },
					{ label: '<', value: '<' },
				],
			},
		},
		{
			name: '#buttons',
			title: 'Műveletek',
			sortable: false,
			width: '12%',
			class: 'text-end text-nowrap',
			header: {
				title: null,
				class: 'text-end text-nowrap',
				buttons: [
					{ action: 'TABLE_RESET_ORDERS' },
				],
			},
			filter: {
				class: 'text-end text-nowrap',
				buttons: [
					{
						action: 'TABLE_CLOSE_DETAILS',
						disabled: (params, settings, vua) => !vua.details.length,
					},
					{ action: 'TABLE_RESET_FILTERS' },
				],
			},
			buttons: [
				{
					action: 'TABLE_ROW_DETAIL',
					icon: (params) => params.table.details.indexOf(params.item.id) >= 0 ? 'bi bi-chevron-up' : 'bi bi-chevron-down',
				},
				{
					// egyedi művelet: saját függvény, a tábla üzenetsávjába ír
					action: (item, params, self) => {
						self.addTableMessage('Egyedi művelet: ' + item.title + ' (#' + item.id + ')', 3000, 'info');
					},
					class: 'btn btn-sm btn-outline-info',
					icon: 'bi bi-lightning',
					disabled: (params) => !params?.item?.stock,
				},
				{ action: 'TABLE_ROW_EDIT' },
				{ action: 'TABLE_ROW_SAVE' },
				{ action: 'TABLE_ROW_DELETE' },
			],
			bulk: {
				buttons: [
					{ action: 'TABLE_BULK_SAVE' },
					{ action: 'TABLE_BULK_DELETE' },
				],
			},
		},
	];

	const table = {
		title: 'Termékek (showcase)',
		class: 'table-hover table-responsive table-sm',
		pagination: {
			limit: 10,
			size: 7,
			limits: [5, 10, 20, 50, 100],
		},
		order: {
			rating: { dir: 'DESC', idx: 0, fixed: false },
		},
		control: {
			class: 'text-center border rounded mt-2',
			buttons: [
				{
					action: 'TABLE_COLUMNS',
					title: 'Oszlopok',
					class: 'btn btn-sm btn-outline-dark m-1',
					icon: 'bi bi-layout-three-columns',
				},
				{
					action: 'TABLE_RELOAD',
					title: 'Frissítés',
					class: 'btn btn-sm btn-outline-dark m-1',
					icon: 'bi bi-arrow-clockwise',
				},
				{
					action: 'FORM_CREATE',
					title: 'Új termék',
					class: 'btn btn-sm btn-primary m-1',
					icon: 'bi bi-plus-lg',
				},
				{
					action: 'TABLE_EXPORT',
					title: 'CSV export',
					class: 'btn btn-sm btn-outline-success m-1',
					icon: 'bi bi-filetype-csv',
				},
				{
					title: 'Továbbiak',
					class: 'btn btn-sm btn-outline-secondary m-1',
					icon: 'bi bi-three-dots',
					dropdowns: [
						{
							action: 'TABLE_RESET_FILTERS',
							title: 'Szűrők törlése',
							class: 'dropdown-item cursor-pointer',
							icon: 'bi bi-funnel',
						},
						{
							action: 'TABLE_RESET_ORDERS',
							title: 'Rendezés törlése',
							class: 'dropdown-item cursor-pointer',
							icon: 'bi bi-sort-down',
						},
						{
							action: 'TABLE_CLOSE_DETAILS',
							title: 'Részletek bezárása',
							class: 'dropdown-item cursor-pointer',
							icon: 'bi bi-chevron-bar-up',
						},
						{
							title: 'Kijelöltek száma',
							class: 'dropdown-item cursor-pointer',
							icon: 'bi bi-check2-square',
							action: (item, params, self) => {
								self.addTableMessage(self.selected.length + ' kijelölt sor', 2500, 'secondary');
							},
						},
					],
				},
			],
		},
		columns: columns,
		details: {
			class: 'bg-body-tertiary',
			fields: [
				{
					name: 'description',
					label: 'Leírás',
					class: 'col-md-2',
					input: {
						type: 'textarea',
						class: 'col-md-8',
						autosave: true,
					},
				},
				{
					name: 'warrantyInformation',
					label: 'Garancia',
					class: 'col-md-2',
					input: {
						type: 'text',
						class: 'col-md-8',
						autosave: true,
					},
				},
			],
			raw: (item) => {
				const reviews = (item.reviews || []).slice(0, 3).map((review) =>
					'<li><span class="text-warning">' + '★'.repeat(Math.round(review.rating || 0)) + '</span> ' +
					escapeHtml(review.comment) + ' <small class="text-muted">— ' + escapeHtml(review.reviewerName) + '</small></li>'
				).join('');
				return '<div class="small p-2"><strong>Vélemények</strong><ul class="mb-0">' + (reviews || '<li class="text-muted">Nincs</li>') + '</ul></div>';
			},
		},
		exports: {
			default: {
				type: 'csv',
				fields: [
					{ name: 'id', title: 'ID' },
					{ name: 'title', title: 'Termék' },
					{ name: 'brand', title: 'Márka' },
					{ name: 'category', title: 'Kategória' },
					{ name: 'tags', title: 'Címkék', template: (tags) => (tags || []).join(', ') },
					{ name: 'rating', title: 'Értékelés', template: (value) => String(value).replace('.', ',') },
					{ name: 'stock', title: 'Készlet', template: (value) => value <= 0 ? 'NINCS' : value },
					{ name: 'price', title: 'Ár', template: (value) => String(value).replace('.', ',') },
					{ title: 'Pénznem', template: () => 'USD' },
				],
			},
		},
	};

	const form = {
		class: 'm-2',
		title: (item) => item.id ? escapeHtml(item.title) + ' <small class="text-muted">#' + escapeHtml(item.id) + '</small>' : 'Új termék',
		default: {
			title: 'Új termék',
			category: 'beauty',
			price: 9.99,
			stock: 10,
			tags: [],
			links: [],
			gallery: [],
			featured: false,
		},
		control: {
			class: 'text-end',
			buttons: [
				{
					title: 'Továbbiak',
					class: 'btn btn-sm btn-outline-dark m-1',
					icon: 'bi bi-list',
					dropdowns: [
						{
							action: 'FORM_COPY',
							title: 'Másolás újként',
							class: 'dropdown-item cursor-pointer p-1',
							icon: 'bi bi-copy',
						},
						{
							action: 'FORM_NEW',
							title: 'Új termék',
							class: 'dropdown-item cursor-pointer p-1',
							icon: 'bi bi-plus-circle',
						},
						{
							action: 'FORM_DELETE',
							title: 'Törlés',
							class: 'dropdown-item cursor-pointer p-1 text-danger',
							icon: 'bi bi-trash',
							disabled: (params) => !params?.item?.id,
						},
					],
				},
				{
					action: 'FORM_RELOAD',
					title: 'Újratöltés',
					class: 'btn btn-sm btn-outline-dark m-1',
					icon: 'bi bi-arrow-clockwise',
					disabled: (params) => !params?.item?.id,
				},
				{
					action: 'FORM_CLOSE',
					title: 'Bezár',
					class: 'btn btn-sm btn-secondary m-1',
					icon: 'bi bi-x',
				},
				{
					action: 'FORM_SAVE',
					title: 'Mentés',
					class: 'btn btn-sm btn-primary m-1',
					icon: 'bi bi-save',
				},
				{
					action: 'FORM_SAVE_AND_CLOSE',
					title: 'Mentés és bezár',
					class: 'btn btn-sm btn-success m-1',
					icon: 'bi bi-check2',
				},
			],
		},
		groups: [
			{
				title: '<strong>Alap</strong> adatok',
				class: 'border rounded p-4 col-md-6',
				fields: [
					{
						type: 'text',
						name: 'title',
						label: 'Termék neve',
						required: true,
						class: 'col-md-8',
						prefix: '<i class="bi bi-tag"></i>',
					},
					{
						type: 'text',
						name: 'sku',
						label: 'SKU',
						class: 'col-md-4',
						readonly: true,
						description: 'Csak olvasható mező',
					},
					{
						type: 'select',
						name: 'category',
						label: 'Kategória',
						required: true,
						class: 'col-md-6',
						options: categories.map((slug) => ({ value: slug, label: label(slug) })),
						inputclass: (params) => params.item[params.field.name] === 'beauty' ? 'bg-warning-subtle' : '',
					},
					{
						type: 'text',
						name: 'brand',
						label: 'Márka',
						class: 'col-md-6',
					},
					{
						type: 'number',
						name: 'price',
						label: 'Ár',
						min: 0,
						step: 0.01,
						class: 'col-md-4',
						suffix: 'USD',
					},
					{
						type: 'number',
						name: 'discountPercentage',
						label: 'Kedvezmény',
						min: 0,
						max: 100,
						step: 0.01,
						class: 'col-md-4',
						suffix: '%',
					},
					{
						type: 'number',
						name: 'stock',
						label: 'Készlet',
						min: 0,
						class: 'col-md-4',
						suffix: 'db',
					},
					{
						type: 'number',
						name: 'rating',
						min: 0,
						max: 5,
						step: 0.01,
						class: 'col-md-6',
						label: (params) => 'Értékelés <small class="text-muted">(' + params.field.min + '–' + params.field.max + ')</small>',
					},
					{
						type: 'date',
						name: 'availableFrom',
						label: 'Elérhető ettől',
						class: 'col-md-6',
					},
					{
						type: 'dropdown',
						name: 'tags',
						label: 'Címkék',
						class: 'col-md-12',
						dropdown: {
							label: ({ item, field }) => {
								const count = Array.isArray(item[field.name]) ? item[field.name].length : 0;
								return count ? 'Címkék (' + count + ')' : 'Címke hozzáadása';
							},
							class: 'btn btn-sm btn-outline-secondary',
						},
						options: [
							'beauty', 'mascara', 'eyeshadow', 'face powder', 'lipstick', 'nail polish',
							'fragrances', 'perfumes', 'furniture', 'beds', 'sofas', 'groceries', 'fruits', 'vegetables',
						].map((tag) => ({ value: tag, label: tag })),
					},
					{
						type: 'checkbox',
						name: 'featured',
						label: null,
						checkbox: 'Kiemelt termék',
						true: true,
						false: false,
						class: 'col-md-6',
					},
					{
						type: 'checkbox',
						name: 'inStock',
						label: null,
						checkbox: 'Raktáron',
						true: true,
						false: false,
						class: 'col-md-6',
					},
					{
						type: 'list',
						name: 'links',
						label: 'Linkek',
						sortable: true,
						addButton: {
							class: 'btn btn-sm btn-outline-primary my-1 w-100',
							icon: 'bi bi-plus me-1',
							label: (item) => 'Hozzáadás (' + (item.links || []).length + ')',
							wrapperClass: 'col-3',
						},
						elements: {
							href: { type: 'url', class: 'col-md-7', prefix: 'URL' },
							name: { type: 'text', class: 'col-md-5', prefix: 'Név' },
						},
					},
				],
			},
			{
				title: 'Leírás és média',
				class: 'p-4 col-md-6',
				fields: [
					{
						type: 'template',
						name: 'thumbnail',
						label: null,
						class: 'col-md-12 text-center mb-2',
						template: ({ field, item }) => {
							const url = escapeHtml(safeUrl(item[field.name]));
							return url
								? '<img src="' + url + '" height="120" class="rounded border shadow-sm">'
								: '<span class="text-muted">Nincs kép</span>';
						},
					},
					{
						type: 'textarea',
						name: 'warrantyInformation',
						label: 'Garancia',
						rows: 2,
					},
					{
						type: 'html',
						name: 'description',
						label: 'Leírás (HTML szerkesztő, videó beágyazással)',
						tiptap: {
							placeholder: 'Termékleírás — félkövér, címsor, lista, link, kép, videó…',
						},
					},
					{
						type: 'upload',
						name: 'gallery',
						label: 'Galéria (inline JSON, nincs feltöltési URL)',
						params: {
							ui: 'card',
							limit: 6,
							colclass: 'col-6',
							text: 'Kattints vagy húzd ide a képeket',
							accept: ['png', 'jpg', 'jpeg', 'webp'],
							thumbnail: 'small',
							editor: true,
							languages: ['hu', 'en'],
							tags: [
								{ value: 'public', label: 'Publikus' },
								{ value: 'hidden', label: 'Rejtett' },
							],
							presets: {
								default: { width: 1280, height: 960, extension: 'webp', quality: 0.85 },
								small: { width: 400, height: 300, extension: 'webp', quality: 0.75, crop: 'contain' },
							},
						},
					},
				],
			},
		],
	};

	return {
		pkey: 'id',
		debug: false,
		api: api,
		events: events,
		table: table,
		form: form,
	};
};
