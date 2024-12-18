
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

window.VuSettings = {
	button: {
		registration: {
			class: 'btn btn-warning me-2',
			label: 'Regisztráció',
			icon: 'bi bi-person-plus me-2',
		},
		login:
		{
			class: 'btn btn-outline-primary me-2',
			icon: 'bi bi-box-arrow-in-right me-2',

			dropdowns: [
				{
					class: 'dropdown-item fw-light',
					label: (params, settings, self) => {
						return self.auth.user.email;
					},
				}, {
					class: 'dropdown-divider'
				}, {
					class: 'dropdown-item cursor-pointer',
					label: (params, settings, self) => {
						return `<i class='bi bi-box-arrow-right me-1'></i> Kilépés`
					},
					action: (params, self) => {
						self.logout();
					}
				}],
			label: (params, settings, self) => {

				if (!self.auth || !self.auth.user) {
					return 'Bejelentkezés';
				}

				let fullName = [self.auth.user.firstName, self.auth.user.lastName].join(' ');
				let img = `<img class='img-fluid rounded me-2' width='22' src='${self.auth.user.image}' />`;

				return img + fullName;

			}

		}
	},
	auth: {
		api: {
			login: '/api/auth/login',
			register: '/api/auth/register',
			password: '/api/auth/password',
		},
		username: {
			value: 'emilys',
			type: 'text',
			label: 'Felhasználónév',
			icon: 'bi bi-envelope',
			placeholder: 'Add meg a felhasználóneved',
			_help: 'A Freemail és Citromail szolgáltatók nem minden esetben fogadják be megfelelően az e-maileket, így a kézbesítés nem garantált.'
		},
		password: {
			label: 'Jelszó',
			icon: 'bi bi-key-fill',
			placeholder: 'Add meg a jelszavad',
			type: 'password',
			help: 'Legyen benne legalább 1 kisbetű, 1 nagybetű és 1 szám. Minimum 4 karakter.',
			_pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
			pattern: '^(?=.*[a-z]).+$',
			minlength: 4,
			hash: 0
		},
		password_again: {
			label: 'Jelszó ismét',
			icon: 'bi bi-key-fill',
			type: 'password',
			placeholder: 'Ismételd meg a jelszavad',
			_help: 'Ide gépeld be újra a jelszavadat amit megadtál.'
		},
		_help: '<strong>Segítség</strong><br>Az alábbiakban...',
		accepts: [{
			label: () => {
				return `Elfogadom az <a href='/aszf.pdf'>Általános Szerződési Feltételeket</a>`
			},
			panels: ['registration'],
			required: true,
			name: 'aszf',
		},
		{
			label: () => {
				return `Elfogadom az <a href='/adatkezelesi-tajekoztato.pdf'>Adatkezelési tájékoztatóban</a> leírtakat`
			},
			panels: ['registration'],
			required: true,
			name: 'gdpr',

		},
		{
			label: 'Feliratkozom a hírlevelekre',
			panels: ['registration', 'login'],
			required: false,
			name: 'newsletter',

		}],
		onSuccess: {
			login: (responseData, auth) => {
				auth.user = responseData;
				// auth.token = responseData.accessToken;
				auth.header = {
					'X-Auth-Token' : responseData.accessToken,
					'X-Auth-Role' : auth.role ? auth.role: null,
				};

			}
		}
	},
	entity: {
		carts: {
			pkey: 'id',
			api: api,
			theme: 'dark',
			table: {
				title: 'Carts',
				columns: columns,
			},
		}
	}

};

