export default {
	
	// set the primary key field
	pkey: 'id',

	// Bootstrap theme 
	theme: 'dark',

	__class: 'mt-2 p-2 rounded',
	init: function (settings) {

		console.log(settings);

	},
	api: {
		url: 'https://dummyjson.com/products',
		auth: {
			type: 'Bearer',
			token: 'token-123456789',
		},
		options: {
			mode: "cors",
		},
		input: {
			// when item is null -> item = response.data
			// when item is a string -> item = response.data[input.item]
			// when item is a function -> item = input.item(data, response)
			item: null,

			// when items is null -> items = response.data
			// when items is a string -> items = response.data[input.items]
			// when items is a function -> items = input.items(data, response)
			items: 'products',

			// when total is a string -> total = response.data[input.total]
			total: 'count',

			// when total is a function -> total = input.total(data, response)
			total: (data, response) => {
				return data.total || data.count || data.all || response.headers.get('X-Total');
			}

		},
	},
	events: {
		beforeItemsLoad: function (query) { },
		afterItemsLoad: function (data, response) { }
	},
	table: {
		title: 'Dummy JSON Products',
		pagination: {
			limit: 5,
			limits: [5, 10, 20, 50],
			size: 10,
		},
		columns: [
			{
				name: '',
				click: 'select',
				index: true,
				sortable: false,
				width: '5%',
				title: '#',
				class: 'text-nowrap',
			},
			{
				name: 'id',
				title: 'ID',
				filter: {
					type: 'number',
					operator: '='
				}
			},
			{
				name: 'images',
				title: 'Image',
				template: function (images) {

					if (!images || !images.length) {
						return;
					}

					let img = images[0];

					return '<a target="_blank" href="' + img + '"><img height="50" width="auto" src="' + img + '"></a>';

				}
			},
			{
				name: 'availabilityStatus',
				title: 'Status',
			},
			{
				name: 'brand',
				title: 'Brand',
			},
			{
				name: 'title',
				title: 'Title',
				filter: {
					type: 'text'
				}
			},
			{
				name: 'tags',
				title: 'Tags',
				template: function (tags, index, item, column) {

					return '<span class="badge border border-secondary text-info fw-light me-1">' + tags.join('</span><span class="badge border border-secondary text-info fw-light me-1">') + '</span>';

				}
			},
			{
				name: 'sku',
				title: 'SKU',
			},
			{
				name: 'weight',
				title: 'Weight',
			},
			{
				name: 'price',
				title: 'Price',
			},
		]
	}
};

