// HTML-t összefűző template-ekben minden adatot escape-elni kell (XSS);
// a helperek a dist/vu-admin.umd.js-ből jönnek (window.VuAdminHelpers)
const { escapeHtml, safeUrl } = window.VuAdminHelpers;

let api = {
	url: 'https://dummyjson.com/carts',
	input: {
		items: "carts",
		total: "total",
	}
};

// relation: a userId helyett a dummyjson felhasználó neve/avatarja (egy kérés az összes userre)
let relations = {
	user: {
		entity: 'user',
		local: 'userId',
		foreign: 'id',
		api: {
			url: 'https://dummyjson.com/users',
			input: {
				items: 'users',
			},
		},
	},
};

let events = {
	// vu-admin order → dummyjson ?sortBy=&order= (a szűrőket a dummyjson nem ismeri, csak láthatók)
	beforeItemsLoad: (urlParams) => {
		const order = Array.isArray(urlParams.order) ? urlParams.order.filter(Boolean)[0] : null;
		delete urlParams.order;
		delete urlParams.filter;
		if (order) {
			urlParams.sortBy = order.key;
			urlParams.order = String(order.dir).toLowerCase();
		}
	},
};

let columns = [
	{
		title: '#',
		click: 'TABLE_ROW_SELECT',
		index: true,
		sortable: false,
		width: '4%',
		header: { class: 'text-center' }
	},
	{
		name: 'id',
		title: 'ID',
		width: '5%',
		class: 'text-end',
		sortable: false,
		filter: {
			type: 'number',
			operator: '=',
			buttonx: true,
		},
	},
	{
		name: 'products',
		title: 'Thumb',
		sortable: false,
		width: '6%',
		class: 'text-center p-0',
		template: function (products) {

			if (!products || !products.length) return '';

			const thumb = products[0].thumbnail;

			if (!thumb) return '';

			const url = escapeHtml(safeUrl(thumb));

			if (!url) return '';

			return '<a target="_blank" rel="noopener noreferrer" href="' + url + '"><img class="border border-secondary rounded shadow-sm" height="34" width="auto" src="' + url + '"></a>';
		}
	},
	{
		name: 'userId',
		title: 'User',
		width: '14%',
		class: 'text-nowrap',
		relation: {
			config: 'user',
			params: {
				limit: 0,
				select: ['id', 'firstName', 'lastName', 'image'],
			},
		},
		filter: {
			type: 'number',
			operator: '=',
			buttonx: true,
		},
		template: (userId, item) => {
			if (item.user) {
				return '<img src="' + escapeHtml(safeUrl(item.user.image)) + '" height="24" width="24" class="rounded-circle border me-1">' +
					escapeHtml(item.user.firstName + ' ' + item.user.lastName);
			}
			const colors = ['#4e79a7','#f28e2b','#e15759','#76b7b2','#59a14f','#edc948','#b07aa1','#ff9da7'];
			let h = 0;
			for (let i = 0; i < ('' + userId).length; i++) h = ('' + userId).charCodeAt(i) + ((h << 5) - h);
			const bg = colors[Math.abs(h) % colors.length];
			return `<span class="badge rounded-pill px-2" style="background:${bg};font-size:.75rem">#${escapeHtml(userId)}</span>`;
		}
	},
	{
		name: 'products',
		title: 'Products',
		sortable: false,
		collapsible: true,
		template: function (products) {

			if (!products) return '';

			let items = [];

			for (let product of products) {
				items.push(
					'<small class="mx-1">' +
					'<span class="badge border border-secondary text-secondary me-1">' + escapeHtml(product.quantity) + ' ×</span>' +
					escapeHtml(product.title) +
					'</small>'
				);
			}

			return items.join(' ');
		}
	},
	{
		name: 'totalProducts',
		title: 'Items',
		width: '6%',
		class: 'text-center',
		filter: {
			type: 'number',
			operators: [
				{ label: '=', value: '=' },
				{ label: '>', value: '>' },
				{ label: '<', value: '<' },
			],
		},
	},
	{
		name: 'totalQuantity',
		title: 'Qty',
		width: '6%',
		class: 'text-center',
		filter: {
			type: 'number',
			operators: [
				{ label: '=', value: '=' },
				{ label: '>', value: '>' },
				{ label: '<', value: '<' },
			],
		},
	},
	{
		name: 'total',
		title: 'Discount',
		class: 'text-end',
		header: { class: 'text-end' },
		width: '10%',
		collapsed: true,
		filter: {
			type: 'number',
			operators: [
				{ label: '>', value: '>' },
				{ label: '<', value: '<' },
			],
		},
		template: (total, item) => {
			const diff = Math.round(total - item.discountedTotal);
			return '<small class="text-muted">-' + diff.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '</small> <span class="badge bg-light border text-dark">USD</span>';
		}
	},
	{
		name: 'discountedTotal',
		title: 'Total',
		class: 'text-end',
		header: { class: 'text-end' },
		width: '10%',
		filter: {
			type: 'number',
			operators: [
				{ label: '>', value: '>' },
				{ label: '<', value: '<' },
			],
		},
		template: (value) => {
			return '<strong class="text-info">' + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + '</strong> <span class="badge bg-light border text-dark">USD</span>';
		}
	},
	{
		name: '#buttons',
		title: 'Actions',
		sortable: false,
		width: '8%',
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
				{ action: 'TABLE_RESET_FILTERS' },
			],
		},
		buttons: [
			{
				action: 'TABLE_ROW_EDIT',
				title: 'View',
				class: 'btn btn-sm btn-primary',
				icon: 'bi bi-eye me-1',
			},
		],
	},
];

let form = {
	title: (item) => 'Cart #' + escapeHtml(item.id),
	control: {
		class: 'text-end',
		buttons: [
			{
				action: 'FORM_CLOSE',
				title: 'Close',
				class: 'btn btn-sm btn-secondary m-1',
				icon: 'bi bi-x',
			},
		],
	},
	groups: [
		{
			title: 'Cart details',
			class: 'border rounded p-3 col-md-4',
			fields: [
				{
					type: 'number',
					name: 'id',
					label: 'Cart ID',
					readonly: true,
					class: 'col-md-6',
				},
				{
					type: 'number',
					name: 'userId',
					label: 'User ID',
					readonly: true,
					class: 'col-md-6',
				},
				{
					type: 'number',
					name: 'totalProducts',
					label: 'Unique products',
					readonly: true,
					class: 'col-md-6',
				},
				{
					type: 'number',
					name: 'totalQuantity',
					label: 'Total quantity',
					readonly: true,
					class: 'col-md-6',
				},
				{
					type: 'number',
					name: 'total',
					label: 'Original total (USD)',
					readonly: true,
				},
				{
					type: 'number',
					name: 'discountedTotal',
					label: 'Discounted total (USD)',
					readonly: true,
				},
			]
		},
		{
			title: 'Products in cart',
			class: 'border rounded p-3 col-md-8',
			fields: [
				{
					type: 'template',
					name: 'products',
					label: null,
					template: ({ field, item }) => {

						const products = item[field.name];

						if (!products || !products.length) return '<em class="text-muted">No products</em>';

						const rows = products.map(p => {
							const thumb = p.thumbnail
								? '<img height="40" width="40" src="' + escapeHtml(safeUrl(p.thumbnail)) + '" class="rounded border object-fit-cover me-2">'
								: '<span class="d-inline-block rounded border bg-secondary me-2" style="width:40px;height:40px"></span>';

							const discount = p.discountPercentage
								? '<span class="badge bg-danger ms-1">-' + Math.round(p.discountPercentage) + '%</span>'
								: '';

							return '<tr>' +
								'<td class="pe-2 align-middle">' + thumb + '</td>' +
								'<td class="pe-3 align-middle">' + escapeHtml(p.title) + discount + '</td>' +
								'<td class="text-center align-middle pe-3"><span class="badge bg-secondary">' + escapeHtml(p.quantity) + ' ×</span></td>' +
								'<td class="text-end align-middle pe-2"><small class="text-muted text-decoration-line-through">' + escapeHtml(p.price) + '</small></td>' +
								'<td class="text-end align-middle"><strong class="text-info">' + escapeHtml(p.discountedTotal ?? p.discountedPrice ?? p.total) + ' USD</strong></td>' +
								'</tr>';
						});

						return '<table class="table table-sm table-hover mb-0">' +
							'<thead><tr>' +
							'<th></th>' +
							'<th>Product</th>' +
							'<th class="text-center">Qty</th>' +
							'<th class="text-end">Price</th>' +
							'<th class="text-end">Total</th>' +
							'</tr></thead>' +
							'<tbody>' + rows.join('') + '</tbody>' +
							'</table>';
					},
				},
			]
		},
	]
};

window.VuEntities = window.VuEntities || {};

Object.assign(window.VuEntities, {

	carts: () => {
		return {
			pkey: 'id',
			api: api,
			events: events,
			relations: relations,
			theme: 'dark',
			table: {
				title: 'Carts',
				class: 'table-hover table-responsive table-sm',
				pagination: {
					limit: 10,
					size: 10,
					limits: [5, 10, 20, 50],
				},
				order: {
					discountedTotal: { dir: 'DESC', idx: 0, fixed: false },
				},
				control: {
					class: 'text-center border rounded mt-2',
					buttons: [
						{
							action: 'TABLE_COLUMNS',
							title: 'Columns',
							class: 'btn btn-sm btn-outline-dark m-1',
							icon: 'bi bi-table',
						},
						{
							action: 'TABLE_RELOAD',
							title: 'Reload',
							class: 'btn btn-sm btn-outline-dark m-1',
							icon: 'bi bi-arrow-clockwise',
						},
						{
							action: 'TABLE_EXPORT',
							title: 'CSV',
							class: 'btn btn-sm btn-outline-success m-1',
							icon: 'bi bi-filetype-csv',
						},
					],
				},
				columns: columns,
				exports: {
					default: {
						type: 'csv',
						fields: [
							{ name: 'id', title: 'Cart ID' },
							{ name: 'userId', title: 'User ID' },
							{ name: 'totalProducts', title: 'Items' },
							{ name: 'totalQuantity', title: 'Qty' },
							{ name: 'total', title: 'Total' },
							{ name: 'discountedTotal', title: 'Discounted total' },
						],
					},
				},
			},
			form: form,
		};
	}
});
