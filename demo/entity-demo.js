
let api = {
	url: 'https://dummyjson.com/carts',
	input: {
		items: "carts",
		total: "total",
	}
};

let columns = [
	{
		name: 'id',
		sortable: false,
	},
	{
		name: 'products',
		title: 'Products',
		sortable: false,
		template: function (products) {

			if (!products) {
				return;
			}

			let items = [];

			for (let product of products) {
				items.push('<small class="mx-3"><span class="badge border border-secondary text-secondary me-1">' + product.quantity + ' x </span> ' + product.title + '</small>');
			}

			return items.join('|');

		}
	},
	{
		name: 'totalProducts',
		title: 'Total Products',
		sortable: false,
	},
	{
		name: 'totalQuantity',
		title: 'Total Quantity',
		sortable: false,
	},
	{
		name: 'total',
		title: 'Discount',
		class: 'text-end',
		header: {
			class: 'text-end'
		},
		sortable: false,
		template: (total, item) => {
			return '<small class="text-muted">' + Math.round(total - item.discountedTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '</small> <span class="badge bg-light border text-dark">HUF</span>'
		}

	},
	{
		name: 'discountedTotal',
		title: 'Total Price',
		class: 'text-end',
		header: {
			class: 'text-end'
		},
		sortable: false,
		template: (value) => {
			return '<strong class="text-info">' + Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + '</strong> <span class="badge bg-light border text-dark">HUF</span>'
		}
	},
];

window.VuEntities = {
	carts: {
		pkey: 'id',
		api: api,
		theme: 'dark',
		table: {
			title: 'Carts',
			columns: columns,
		},
	}

};

