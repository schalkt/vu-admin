
let api = {
	url: '/api/products',
	// auth: {
	// 	type: 'Bearer',
	// 	token: 'token-123456789',
	// },
	// options: {
	// 	mode: "cors",
	// },
	input: {
		// when item is null -> item = response.data
		// when item is a string -> item = response.data[input.item]
		// when item is a function -> item = input.item(data, response)
		item: null,

		// when items is null -> items = response.data
		// when items is a string -> items = response.data[input.items]
		// when items is a function -> items = input.items(data, response)
		items: "products",

		// when total is a string -> total = response.data[input.total]
		total: "total",

		// when total is a function -> total = input.total(data, response)
		total: (data, response) => {
			return data.total || data.count || data.all || response.headers.get('X-Total');
		}

	},
	output: {
		fields: undefined
	}
};

let events = {
	afterSettingsInit: function (settings) {
		console.log('# afterSettingsInit', settings);
	},
	beforeItemsLoad: function (urlParams, settings) {
		console.log('# beforeItemsLoad', urlParams.filter, urlParams.order);
	},
	afterItemsLoad: function (data, response) {
		console.log('# afterItemsLoad', data, response.status);
	},
	afterItemLoad: function (data, response) {

		data.images = [];

		console.log('# afterItemLoad', data, response);
	},
	beforeItemSave: function (item, urlParams, unfiltered) {
		// because of https://dummyjson.com/ error: "Product with id '1' not found"
		console.log('# beforeItemSave', item, unfiltered);
		delete item.id;
	},

	afterItemSave: function (data, response) {
		console.log('# afterItemSave', data, response);
	},

	beforeItemDelete: function (item) {
		console.log('# beforeItemDelete', item);
	},

	afterItemDelete: function (data, response) {
		console.log('# afterItemDelete', data, response);
	},

	beforeBulkSave: function (bulkitem) {
		console.log('# beforeBulkSave', bulkitem);
	},

	afterBulkSave: function (data, response) {
		console.log('# afterBulkSave', data, response);
	},

	beforeItemsExport: function (items) {
		console.log('# beforeItemsExport', items);
	}
};

let columns = [
	{

		title: '#',
		click: 'select',
		index: true,
		sortable: false,
		width: '5%',
		header: {
			class: 'text-center',
		}
	},
	{
		name: 'id',
		title: 'ID',
		class: 'text-end',
		width: '6%',
		filter: {
			type: 'number',
			operator: '=',
			buttonx: true
		}
	},
	{
		name: 'thumbnail',
		title: 'Thumb',
		class: 'text-center p-0',
		template: function (thumbnail) {

			if (!thumbnail) {
				return;
			}

			return '<a target="_blank" href="' + thumbnail + '"><img class="border border-light rounded shadow" height="34" width="auto" src="' + thumbnail + '"></a>';

		}
	},
	{
		name: 'title',
		title: 'Title',
		class: 'text-nowrap',
		// template: function (name, item) {
		// 	return name + ' <span class="fw-normal text-secondary">( ' + item.username + ' )</span>';
		// },
		filter: {
			// field: 'name-username',
			type: 'text',
			default_operator: '%',
			buttonx: true
		}
	},
	{
		name: 'sku',
		title: 'SKU',
		class: 'text-dark text-center'
	},
	{
		name: 'rating',
		title: 'Rating',
		width: '10%',
		progressbar: {
			class: 'bg-primary text-light fw-bold',
			max: 5,
			value: true,
		},
		filter: {
			type: 'number',
			default_operator: '>',
			default_value: 4,
			operators: [
				{
					label: '>',
					value: '>'
				},
				{
					label: '=',
					value: '='
				},
				{
					label: '<',
					value: '<'
				}
			],
			fixed: true,
			buttonx: true
		}
	},
	{
		name: 'category',
		title: 'Category',
		class: 'text-secondary',
		filter: {
			type: 'text',
			default_operator: '%',
			buttonx: true
		},
		input: {
			type: 'text',
			autosave: true,
		},
		bulk: {
			enabled: true,
		}

	},
	{
		name: 'tags',
		title: 'Tags',
		sortable: false,
		class: 'text-nowrap',
		template: (tags) => {
			return '<span class="badge border text-dark me-1 p-1">' + tags.join('</span><span class="badge border text-dark me-1 p-1">') + '</span>'
		},
		filter: {
			type: 'select',
			multiple: false,
			operator: 'in',
			options: [
				{
					value: 'beauty'
				},
				{
					value: 'mascara'
				},
				{
					value: 'face powder'
				},
				{
					value: 'lipstick'
				},
				{
					value: 'perfumes'
				},
				{
					value: 'fragrances'
				}
			]
		}
	},
	{
		name: 'brand',
		title: 'Brand',
		class: 'text-nowrap',
		template: function (website) {
			if (!website) {
				return '';
			}
			return '<a class="link" target="_blank" href="/">' + website + '</a>';
		},
		filter: {
			type: 'text',
			default_operator: '%',
			buttonx: true
		}
	},
	{
		name: 'stock',
		title: 'Stock',
		width: '8%',
		filter: {
			type: 'number',
			operators: true,
			default_operator: '<',
		},
		input: {
			type: 'number',
			min: 1,
			max: 1000,
			class: (params) => {
				let style = params.item['stock'] < 10 ? 'bg-danger text-light' : (params.item['stock'] < 20 ? 'bg-warning text-dark' : 'bg-success text-light');
				return style + ' text-end fw-bold'
			},
			prefix: '<i class="bi bi-box-seam"></i>',
			autosave: true
		}
	},
	{
		name: 'price',
		title: 'Price',
		width: '10%',
		header: {
			class: 'text-end',
		},
		input: {
			type: 'number',
			class: 'text-end fw-bold border border-dark shadow',
			suffix: 'EUR',
			autosave: true
		},
		filter: {
			type: 'number',
			operators: true,
			default_operator: '<',

		},

	},
	{
		name: 'meta.updatedAt',
		title: 'Updated',
		class: 'text-nowrap',
		template: (value) => {
			return '<small>' + value + '</small>';
		},
		convert: {
			in: (value, item) => {
				return (new Date(value)).toLocaleDateString(undefined, {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit',
					hour: '2-digit',
					minute: '2-digit',
				});
			}
		},
		filter: {
			type: 'datetime-local',
			operators: [
				{
					label: '>',
					value: '>'
				},
				{
					label: '<',
					value: '<'
				}
			],
			onchange: function (filter) {

				return Math.round((new Date(filter.value)).getTime() / 1000);
				//return Math.round((new Date(filter.value + ' 00:00:00')).getTime() / 1000);

			}
		},
	},
	{
		name: '#buttons',
		title: 'Buttons',
		header: {
			title: null,
			class: 'text-end text-nowrap',
			buttons: [
				{
					action: 'resetorders',
				},
			],
		},
		sortable: false,
		width: '10%',
		class: 'text-end text-nowrap',
		filter: {
			class: 'text-end text-nowrap',
			buttons: [
				{
					action: 'resetdetails',
					disabled: (params, settings, vua) => {
						// console.log('resetdetails', params, settings, vua);
						return vua.details.length ? false : true;

					}
				},
				{
					action: 'resetfilters',
				},
			],
		},
		buttons: [
			{
				action: 'details',
				icon: (params) => {
					// console.log(params);
					return params.table.details.indexOf(params.item.id) >= 0 ? 'bi bi-chevron-compact-up' : 'bi bi-chevron-compact-down';
				}
			},
			{
				action: 'edit',
			},
			{
				action: 'delete',
			},
			{
				action: 'save',
			},
		],
		bulkbuttons: [
			{
				action: 'delete',
			},
			{
				action: 'save',
			},
		],
	},
];

let table = {
	title: 'Products',
	class: 'table-hover table-responsive table-sm',
	pagination: {
		size: 10,
		limit: 10,
		limits: [5, 10, 20, 50, 100, 200]
	},
	order: {
		'title': {
			dir: 'DESC',
			fixed: false,
			idx: 0
		},
		'rating': {
			dir: 'ASC',
			fixed: true,
			idx: 1
		}
	},
	control: {
		class: 'text-center border rounded mt-2',
		buttons: [
			{
				action: 'columns',
				title: 'Columns',
				class: 'btn btn-sm btn-outline-dark m-1',
				icon: 'bi bi-table',
			},
			{
				action: 'reload',
				title: 'Reload',
				class: 'btn btn-sm btn-outline-dark m-1',
				icon: 'bi bi-arrow-clockwise',
			},
			{
				action: 'create',
				title: 'New',
				class: 'btn btn-sm btn-warning m-1',
				icon: 'bi bi-plus-circle',
			},
			{
				action: function (items) {

					if (confirm('Are you sure?')) {
						console.log(items);
						alert('Hello :)');
					}

				},
				title: 'Hello',
				class: 'btn btn-sm btn-dark m-1',
				icon: 'bi bi-emoji-smile',
			},
			{
				title: 'Export',
				class: 'btn btn-sm btn-primary m-1',
				icon: 'bi bi-download',
				dropdowns: [{
					action: 'export',
					params: {
						export: true,
						type: 'default',
					},
					title: 'Default export',
					class: 'fw-bolder',
					icon: 'bi bi-filetype-csv'
				}]
			}
		]
	},
	columns: columns,
	details: {
		class: 'text-secondary',
		fields: [
			{
				name: 'description',
				class: 'col-md-3',
				label: 'Description',
				input: {
					type: 'textarea',
					autosave: true,
				},
			},
			{
				name: 'meta.barcode',
				label: 'Barcode',
				class: 'col-md-3',
				input: {
					type: 'text',
					autosave: true,
					onchange: function (value, column, item) {
						console.log(value, column, item);
					},
				},
			},
		],
		raw: function (item) {
			return [
				'<div class="my-1 p-2 bg-secondary text-dark d-flex align-items-center justify-content-center">',
				'<small>' + JSON.stringify(item) + '</small>',
				// '<small class="me-4"><strong class="me-2">Azonosító</strong><span>' + item['_id'] + '</span></small>',
				// '<small class="me-4"><strong class="me-2">Létrehozva</strong><span>' + (new Date(item['date_created_at'])).toLocaleString('hu-HU') + '</span></small>',
				// '<small class="me-4"><strong class="me-2">Módosítva</strong><span>' + (new Date(item['date_updated_at'])).toLocaleString('hu-HU') + '</span></small>',
				'</div>'
			].join('');
		}
	},
	exports: {
		default: {
			type: 'csv',
			fields: [{
				name: 'id',
				title: 'ID'
			},
			{
				name: 'title',
			},
			{
				name: 'sku',
			},
			{
				name: 'rating',
				template: (value) => ("" + (Math.round(value * 10) / 10)).replace('.', ',')
			},
			{
				name: 'category',
			},
			{
				name: 'tags',
			},
			{
				name: 'brand',
			},
			{
				name: 'stock',
				template: (value, row, items) => {
					// console.log(value, row, items)
					return value <= 0 ? 'NOT IN STOCK' : value
				}
			},
			{
				name: 'price',
				template: (value) => ("" + value).replace('.', ',')
			},
			{
				title: 'Currency',
				template: () => 'EUR'
			}
			]
		}
	}
};
let form = {
	class: 'm-2',
	rowclass: 'm-2',
	title: (item) => {
		return (item.title ? item.title : '') + (item.id ? '<span class="badge border text-dark ms-2 p-badge">#' + item.id + '</span>' : '');
	},
	groups: [
		{
			title: 'Main parameters',

			class: 'border border-dark rounded p-4 mb-4 col-md-6',
			fields: [
				{
					type: 'text',
					name: 'title',
					label: 'Product',
					required: true,
				},
				{
					type: 'select',
					name: 'category',
					label: 'Category',
					required: true,
					options: [
						{
							value: 'beauty',
						},
						{
							value: 'fragrances'
						}
					]
				},

			]
		},
		{
			title: 'More information',
			class: 'p-4 mb-4 col-md-6',
			fields: [
				{
					type: 'html',
					name: 'description',
					label: 'Description'
				},	
				{
					type: 'number',
					step: 0.01,
					min: 0,
					max: 5,
					name: 'rating',
					label: (params) => {
						return 'Rating <small">( min: ' + params.field.min + ', max: ' + params.field.max + ' )</small>';
					}
				},
				{
					type: 'image',
					name: 'images',
					label: 'Images',
					required: false,
					params: {
						limit: 1,
						text: 'Click here to upload',
						accept: ["image/png", "image/jpeg", "image/webp"],
						thumbnail: 'small',
						download: 'large',
						editor: false,
						presets: {
							large: {
								width: 1920,
								height: 1080,
								convert: "image/webp",
								quality: 0.85
							},
							small: {
								width: 400,
								height: 320,
								convert: "image/webp",
								quality: 0.75
							},
							tiny: {
								width: 160,
								height: 100,
								convert: "image/webp",
								quality: 0.7
							},
						},
					}
				},			
			]
		}
	]
}

export default {

	// set the primary key field
	pkey: 'id',
	api: api,
	events: events,
	translate: {
		'en': {
			'New': 'New product',
			'Thumb': 'Photo',
			'Title': 'Product'
		}
	},
	// relations: {
	// 	user: {
	// 		entity: 'user',
	// 		local: 'user_id',
	// 		foreign: 'id',
	// 		type: '1-8',
	// 	}
	// },
	table: table,
	form: form,

};

