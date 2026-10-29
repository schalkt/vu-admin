// Showcase entity: most vu-admin table and form features in one place, on the https://dummyjson.com/products API.
// dummyjson does not know the vu-admin filter/order format and does not persist: beforeItemsLoad maps the sort,
// the title search and the category filter to dummyjson parameters; the other filters are only visible.
// Templates that build HTML must escape every data value (XSS) — the helpers come from the dist build.

window.VuEntities = window.VuEntities || {};

window.VuEntities.products = (preset) => {

	const { escapeHtml, safeUrl, getLanguage } = window.VuAdminHelpers;

	// entity dictionary (config.translate): vu-admin translates the config texts with it
	const translations = {
		hu: {
			'Products (showcase)': 'Termékek (bemutató)',
			Image: 'Kép',
			'Product <small class="text-muted fw-light">(search)</small>': 'Termék <small class="text-muted fw-light">(keresés)</small>',
			Brand: 'Márka',
			Category: 'Kategória',
			Tags: 'Címkék',
			Rating: 'Értékelés',
			Stock: 'Készlet',
			Price: 'Ár',
			Availability: 'Elérhetőség',
			Updated: 'Frissítve',
			'In stock': 'Raktáron',
			'Low stock': 'Kevés készlet',
			'Out of stock': 'Nincs készleten',
			'New product': 'Új termék',
			'CSV export': 'CSV export',
			'Clear filters': 'Szűrők törlése',
			'Clear sorting': 'Rendezés törlése',
			'Close details': 'Részletek bezárása',
			'Selected count': 'Kijelöltek száma',
			Description: 'Leírás',
			Warranty: 'Garancia',
			'Copy as new': 'Másolás újként',
			'<strong>Basic</strong> data': '<strong>Alap</strong> adatok',
			'Product name': 'Terméknév',
			'Read-only field': 'Csak olvasható mező',
			Discount: 'Kedvezmény',
			pcs: 'db',
			'Available from': 'Elérhető ettől',
			'Featured product': 'Kiemelt termék',
			Links: 'Linkek',
			Name: 'Név',
			'Description and media': 'Leírás és média',
			'Description (HTML editor with video embed)': 'Leírás (HTML szerkesztő videó beágyazással)',
			'Product description — bold, heading, list, link, image, video…': 'Termékleírás — félkövér, címsor, lista, link, kép, videó…',
			'Gallery (inline JSON, no upload URL)': 'Galéria (inline JSON, feltöltési URL nélkül)',
			'Click or drop images here': 'Kattints vagy húzd ide a képeket',
			Public: 'Nyilvános',
			Hidden: 'Rejtett',
			// category labels (label(slug))
			Beauty: 'Szépségápolás',
			Fragrances: 'Illatok',
			Furniture: 'Bútorok',
			Groceries: 'Élelmiszerek',
			'Home decoration': 'Lakásdekoráció',
			'Kitchen accessories': 'Konyhai kiegészítők',
			Laptops: 'Laptopok',
			'Mens shirts': 'Férfi ingek',
			'Mens shoes': 'Férfi cipők',
			'Mobile accessories': 'Mobil kiegészítők',
			Smartphones: 'Okostelefonok',
			Sunglasses: 'Napszemüvegek',
			Tablets: 'Tabletek',
			Tops: 'Felsők',
			Vehicle: 'Járművek',
			'Womens bags': 'Női táskák',
			'Womens dresses': 'Női ruhák',
			'Womens jewellery': 'Női ékszerek',
			'Womens watches': 'Női órák',
			'Mens watches': 'Férfi órák',
			Motorcycle: 'Motorok',
			'Skin care': 'Bőrápolás',
			'Sports accessories': 'Sportkiegészítők',
			'Womens shoes': 'Női cipők',
			// texts built by functions (t())
			'Custom action: {title} (#{id})': 'Egyedi művelet: {title} (#{id})',
			'{count} selected rows': '{count} kijelölt sor',
			Reviews: 'Vélemények',
			None: 'Nincs',
			'Tags ({count})': 'Címkék ({count})',
			'Add tag': 'Címke hozzáadása',
			'Add ({count})': 'Hozzáadás ({count})',
			'No image': 'Nincs kép',
		},
	};

	// texts returned by functions (templates, labels, messages) are not translated by vu-admin, and
	// window.VuAdminHelpers.translate() does not see the entity dictionary → own lookup first
	const t = (key, vars = {}) => ((translations[getLanguage()] || {})[key] || window.VuAdminHelpers.translate(key))
		.replace(/\{(\w+)\}/g, (match, name) => vars[name] !== undefined ? vars[name] : '');

	const BASE_URL = 'https://dummyjson.com/products';

	const categories = [
		'beauty', 'fragrances', 'furniture', 'groceries', 'home-decoration', 'kitchen-accessories',
		'laptops', 'mens-shirts', 'mens-shoes', 'mobile-accessories', 'smartphones', 'sunglasses',
		'tablets', 'tops', 'vehicle', 'womens-bags', 'womens-dresses', 'womens-jewellery', 'womens-watches',
	];

	const label = (slug) => slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

		// the final settings object (afterSettingsInit), so the form api url can be switched before saving
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

		// dummyjson: new item POST /products/add, update PUT /products/{id}
		beforeItemSave: (item, urlParams, input) => {
			if (settingsRef) {
				settingsRef.form.api.url = input && input.id ? BASE_URL : BASE_URL + '/add';
			}
			// only the actually editable fields are sent
			delete item.reviews;
			delete item.meta;
		},

		// delete and reload also use the form api → back to the base url
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
			// the dummyjson images field is a URL list; the gallery upload field is independent of it (inline JSON storage)
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
			title: 'Image',
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
			title: 'Product <small class="text-muted fw-light">(search)</small>',
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
			title: 'Brand',
			collapsible: true,
			class: 'text-nowrap',
			template: (brand) => brand ? escapeHtml(brand) : '<span class="text-muted">–</span>',
		},
		{
			name: 'category',
			title: 'Category',
			class: 'text-secondary',
			filter: {
				type: 'select',
				dropdown: true,
				multiple: true,
				default_operator: 'in',
				options: categories.map((slug) => ({ value: slug, label: label(slug) })),
			},
			template: (category) => '<span class="badge text-bg-light border">' + escapeHtml(t(label(category || ''))) + '</span>',
		},
		{
			name: 'tags',
			title: 'Tags',
			sortable: false,
			collapsed: true,
			template: (tags) => (tags || []).map((tag) => '<span class="badge border text-secondary me-1">' + escapeHtml(tag) + '</span>').join(''),
		},
		{
			name: 'rating',
			title: 'Rating',
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
			title: 'Stock',
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
			title: 'Price',
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
			title: 'Availability',
			collapsible: true,
			input: {
				type: 'select',
				options: [
					{ value: 'In Stock', label: 'In stock' },
					{ value: 'Low Stock', label: 'Low stock' },
					{ value: 'Out of Stock', label: 'Out of stock' },
				],
				autosave: true,
			},
			filter: {
				type: 'select',
				options: [
					{ value: '', label: 'All' },
					{ value: 'In Stock', label: 'In stock' },
					{ value: 'Low Stock', label: 'Low stock' },
					{ value: 'Out of Stock', label: 'Out of stock' },
				],
			},
			bulk: {
				enabled: true,
			},
		},
		{
			name: 'meta.updatedAt',
			title: 'Updated',
			class: 'text-nowrap small text-secondary',
			collapsible: true,
			convert: {
				in: (value) => value ? new Date(value).toLocaleDateString('en-US') : '',
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
			title: 'Actions',
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
					// custom action: own function, writes to the table's message bar
					action: (item, params, self) => {
						self.addTableMessage(t('Custom action: {title} (#{id})', { title: item.title, id: item.id }), 3000, 'info');
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
		title: 'Products (showcase)',
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
					title: 'Columns',
					class: 'btn btn-sm btn-outline-dark m-1',
					icon: 'bi bi-layout-three-columns',
				},
				{
					action: 'TABLE_RELOAD',
					title: 'Reload',
					class: 'btn btn-sm btn-outline-dark m-1',
					icon: 'bi bi-arrow-clockwise',
				},
				{
					action: 'FORM_CREATE',
					title: 'New product',
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
					title: 'More',
					class: 'btn btn-sm btn-outline-secondary m-1',
					icon: 'bi bi-three-dots',
					dropdowns: [
						{
							action: 'TABLE_RESET_FILTERS',
							title: 'Clear filters',
							class: 'dropdown-item cursor-pointer',
							icon: 'bi bi-funnel',
						},
						{
							action: 'TABLE_RESET_ORDERS',
							title: 'Clear sorting',
							class: 'dropdown-item cursor-pointer',
							icon: 'bi bi-sort-down',
						},
						{
							action: 'TABLE_CLOSE_DETAILS',
							title: 'Close details',
							class: 'dropdown-item cursor-pointer',
							icon: 'bi bi-chevron-bar-up',
						},
						{
							title: 'Selected count',
							class: 'dropdown-item cursor-pointer',
							icon: 'bi bi-check2-square',
							action: (item, params, self) => {
								self.addTableMessage(t('{count} selected rows', { count: self.selected.length }), 2500, 'secondary');
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
					label: 'Description',
					class: 'col-md-2',
					input: {
						type: 'textarea',
						class: 'col-md-8',
						autosave: true,
					},
				},
				{
					name: 'warrantyInformation',
					label: 'Warranty',
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
				return '<div class="small p-2"><strong>' + t('Reviews') + '</strong><ul class="mb-0">' + (reviews || '<li class="text-muted">' + t('None') + '</li>') + '</ul></div>';
			},
		},
		exports: {
			default: {
				type: 'csv',
				fields: [
					{ name: 'id', title: 'ID' },
					{ name: 'title', title: 'Product' },
					{ name: 'brand', title: 'Brand' },
					{ name: 'category', title: 'Category' },
					{ name: 'tags', title: 'Tags', template: (tags) => (tags || []).join(', ') },
					{ name: 'rating', title: 'Rating' },
					{ name: 'stock', title: 'Stock', template: (value) => value <= 0 ? 'OUT OF STOCK' : value },
					{ name: 'price', title: 'Price' },
					{ title: 'Currency', template: () => 'USD' },
				],
			},
		},
	};

	const form = {
		class: 'm-2',
		title: (item) => item.id ? escapeHtml(item.title) + ' <small class="text-muted">#' + escapeHtml(item.id) + '</small>' : t('New product'),
		default: {
			title: 'New product',
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
					title: 'More',
					class: 'btn btn-sm btn-outline-dark m-1',
					icon: 'bi bi-list',
					dropdowns: [
						{
							action: 'FORM_COPY',
							title: 'Copy as new',
							class: 'dropdown-item cursor-pointer p-1',
							icon: 'bi bi-copy',
						},
						{
							action: 'FORM_NEW',
							title: 'New product',
							class: 'dropdown-item cursor-pointer p-1',
							icon: 'bi bi-plus-circle',
						},
						{
							action: 'FORM_DELETE',
							title: 'Delete',
							class: 'dropdown-item cursor-pointer p-1 text-danger',
							icon: 'bi bi-trash',
							disabled: (params) => !params?.item?.id,
						},
					],
				},
				{
					action: 'FORM_RELOAD',
					title: 'Reload',
					class: 'btn btn-sm btn-outline-dark m-1',
					icon: 'bi bi-arrow-clockwise',
					disabled: (params) => !params?.item?.id,
				},
				{
					action: 'FORM_CLOSE',
					title: 'Close',
					class: 'btn btn-sm btn-secondary m-1',
					icon: 'bi bi-x',
				},
				{
					action: 'FORM_SAVE',
					title: 'Save',
					class: 'btn btn-sm btn-primary m-1',
					icon: 'bi bi-save',
				},
				{
					action: 'FORM_SAVE_AND_CLOSE',
					title: 'Save and close',
					class: 'btn btn-sm btn-success m-1',
					icon: 'bi bi-check2',
				},
			],
		},
		groups: [
			{
				title: '<strong>Basic</strong> data',
				class: 'border rounded p-4 col-md-6',
				fields: [
					{
						type: 'text',
						name: 'title',
						label: 'Product name',
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
						description: 'Read-only field',
					},
					{
						type: 'select',
						name: 'category',
						label: 'Category',
						required: true,
						class: 'col-md-6',
						options: categories.map((slug) => ({ value: slug, label: label(slug) })),
						inputclass: (params) => params.item[params.field.name] === 'beauty' ? 'bg-warning-subtle' : '',
					},
					{
						type: 'text',
						name: 'brand',
						label: 'Brand',
						class: 'col-md-6',
					},
					{
						type: 'number',
						name: 'price',
						label: 'Price',
						min: 0,
						step: 0.01,
						class: 'col-md-4',
						suffix: 'USD',
					},
					{
						type: 'number',
						name: 'discountPercentage',
						label: 'Discount',
						min: 0,
						max: 100,
						step: 0.01,
						class: 'col-md-4',
						suffix: '%',
					},
					{
						type: 'number',
						name: 'stock',
						label: 'Stock',
						min: 0,
						class: 'col-md-4',
						suffix: 'pcs',
					},
					{
						type: 'number',
						name: 'rating',
						min: 0,
						max: 5,
						step: 0.01,
						class: 'col-md-6',
						label: (params) => t('Rating') + ' <small class="text-muted">(' + params.field.min + '–' + params.field.max + ')</small>',
					},
					{
						type: 'date',
						name: 'availableFrom',
						label: 'Available from',
						class: 'col-md-6',
					},
					{
						type: 'dropdown',
						name: 'tags',
						label: 'Tags',
						class: 'col-md-12',
						dropdown: {
							label: ({ item, field }) => {
								const count = Array.isArray(item[field.name]) ? item[field.name].length : 0;
								return count ? t('Tags ({count})', { count }) : t('Add tag');
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
						checkbox: 'Featured product',
						true: true,
						false: false,
						class: 'col-md-6',
					},
					{
						type: 'checkbox',
						name: 'inStock',
						label: null,
						checkbox: 'In stock',
						true: true,
						false: false,
						class: 'col-md-6',
					},
					{
						type: 'list',
						name: 'links',
						label: 'Links',
						sortable: true,
						addButton: {
							class: 'btn btn-sm btn-outline-primary my-1 w-100',
							icon: 'bi bi-plus me-1',
							label: (item) => t('Add ({count})', { count: (item.links || []).length }),
							wrapperClass: 'col-3',
						},
						elements: {
							href: { type: 'url', class: 'col-md-7', prefix: 'URL' },
							name: { type: 'text', class: 'col-md-5', prefix: 'Name' },
						},
					},
				],
			},
			{
				title: 'Description and media',
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
								: '<span class="text-muted">' + t('No image') + '</span>';
						},
					},
					{
						type: 'textarea',
						name: 'warrantyInformation',
						label: 'Warranty',
						rows: 2,
					},
					{
						type: 'html',
						name: 'description',
						label: 'Description (HTML editor with video embed)',
						tiptap: {
							placeholder: 'Product description — bold, heading, list, link, image, video…',
						},
					},
					{
						type: 'upload',
						name: 'gallery',
						label: 'Gallery (inline JSON, no upload URL)',
						params: {
							ui: 'card',
							limit: 6,
							colclass: 'col-6',
							text: 'Click or drop images here',
							accept: ['png', 'jpg', 'jpeg', 'webp'],
							thumbnail: 'small',
							editor: true,
							languages: ['hu', 'en'],
							tags: [
								{ value: 'public', label: 'Public' },
								{ value: 'hidden', label: 'Hidden' },
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
		translate: translations,
		api: api,
		events: events,
		table: table,
		form: form,
	};
};
