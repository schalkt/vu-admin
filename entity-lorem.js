export default {
	pkey: 'id',
	api: {
		url: 'https://dummyjson.com/products',
		options: {
			mode: "cors",
		},
		input: {
			item: null,
			items: 'products'
		},
		auth: {
			type: 'Bearer',
			token: 'token-erhee',
		}
	},
	events: {
		beforeItemsLoad: function (query) {

			// console.log(query);			
			
			if (query.page) {
				query.skip =  (query.page - 1) * query.limit;				
			} else {
				query.skip = 0;
			}	

			delete query.page;

		},
		afterItemsLoad: function (data, response) {						

		}
	},
	init: function (settings) {
		
		//console.log(settings);

	},
	table: {
		title: 'Lorem',
		_pagination: {			
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

					return '<span class="badge bg-info text-dark me-1">' + tags.join('</span><span class="badge bg-info text-dark me-1">') + '</span>';

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

