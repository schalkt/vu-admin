export default {
	pkey: 'id',
	theme: 'dark',	
	debug: true,
	api: {
		url: '/api/users',
		options: {
			mode: "cors",
			cache: "no-cache"
		},
		input: {
			item: null,
			items: 'users'
		}
	},
	table: {
		title: 'Felhasználók',
		pagination: {
			limit: 5,
			size: 20,
			limits: [5, 10, 20, 50, 100, 200, 500]
		},
		columns: [
			{

				title: '#',
				click: 'TABLE_ROW_SELECT',
				index: true,
				sortable: false,
				width: '5%',
				header: {
					class: 'text-center',
				}
			},
			{
				name: 'id',
				title: 'Azonosító',
				class: 'text-end',
				width: '6%',
				filter: {
					type: 'number',
					operator: '=',
					buttonx: true
				}
			},
			{
				name: 'image',
				title: 'Avatár',
				sortable: false,
				template: function (image, item) {

					if (!image) {
						return;
					}

					let img = '<img class="rounded" height="24" src="' + image + '" alt="' + item['username'] + '" />';

					return img;
				},
			},
			{
				name: 'firstName',
				title: 'Név <span class="text-muted ms-1 fw-light">( felhasználónév )</span>',
				template: (firstName, item) => {
					return item.firstName + ' ' + item.lastName + '<span class="text-muted ms-2 fw-light">( ' + item.username + ' )</span>';
				}
			},
			{
				name: 'birthDate',
				title: 'Születési dátum',
				convert: {
					in: (value, item, column) => {
						return (new Date(value)).toISOString().substring(0, 10);
					},
					out: (value, item, column) => {
						return value.replace('-0', '-');
					}
				},
				filter: {
					type: 'date',
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
				input: {
					type: 'date',
					autosave: true,
					onchange: function (value, column, item) {
						console.log(value, column, item);
					}
				},
			},
			{
				name: 'age',
				title: 'Kor',
				width: '10%',
				progressbar: {
					class: 'bg-info text-dark fw-bold',
					max: 100,
					value: true,
				},
				filter: {
					type: 'number',
					default_operator: '=',
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
				}
			},
			{
				name: 'height',
				title: 'Magasság (cm)',
				width: '10%',
				progressbar: {
					class: 'bg-info text-dark fw-bold',
					max: 250,
					value: true,
				},
				convert: {
					in: (value) => {
						return Math.round(value);
					}
				},
				filter: {
					type: 'number',
					default_operator: '=',
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
				}
			},
			{
				name: 'weight',
				title: 'Súly (kg)',
				width: '10%',
				progressbar: {
					class: 'bg-info text-dark fw-bold',
					max: 120,
					value: true,
				},
				convert: {
					in: (value) => {
						return Math.round(value);
					}
				},
				filter: {
					type: 'number',
					default_operator: '=',
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
				}
			},
			{

				name: 'hair.color',
				title: 'Hajszín',
				template: (value) => {

					let color = value.toLowerCase();
					let icon = '<i class="bi bi-circle-fill" style="color: ' + color.replace('blonde', '#FBE7A1') + '"></i>';

					return icon + ' ' + '<span class="text-secondary ms-2">' + color + '</span>';

				},
				filter: {
					type: 'select',
					options: [
						{
							value: 'Brown'
						},
						{
							value: 'Green'
						},
						{
							value: 'Gray'
						},
						{
							value: 'White'
						},
						{
							value: 'Blonde'
						},
						{
							value: 'Blue'
						},
						{
							value: 'Purple'
						},
						{
							value: 'Red'
						}
					]
				}

			},
			{
				name: 'address.city',
				title: 'Cím',
				template: (value, item) => {

					let address = '<span>' + value + '</span> <small class="text-light">' + item['address.address'] + '</small>';
					let search = 'https://www.google.com/maps/search/' + value + ' ' + item['address.postalCode'] + ',' + item['address.address'] + ',' + item['address.country'];
					let link = '<a class="link-offset-2 link-underline link-underline-opacity-0" href="' + search + '" + search" target="_blank"><i class="bi bi-geo-alt me-1"></i>' + address + '</a>';

					return link;

				}

				// filter: {
				// 	type: 'select',
				// 	options: [
				// 		{
				// 			value: undefined,
				// 			label: 'All'
				// 		},
				// 		{
				// 			'label': 'Hunagrian',
				// 			'value': 'hu'
				// 		},
				// 		{
				// 			'label': 'English',
				// 			'value': 'en'
				// 		}
				// 	]
				// }
			},
			{
				name: 'images',
				hidden: true,
				template: function (images) {

					if (!images || !images.length) {
						return;
					}

					let elements = [];
					let img = images[0];
					let baseUrl = 'http://supercms.vi/';

					// for (let img of item.images) {

					if (img.types && img.types.large) {
						elements.push(
							'<a target="_blank" href="' + baseUrl + (img.types.large.url ? img.types.large.url : img.types.large.data) + '"><img height="24" width="auto" class="" src="' + baseUrl + (img.types.tiny.url ? img.types.tiny.url : img.types.tiny.data) + '" alt="' + img.title + '" /></a>'
						);
					}

					// }

					return elements.join(' ');

				}
			},
			{
				name: 'title',
				hidden: true,
				// filter: {
				// 	type: 'text'
				// }
			},
			{
				name: '#buttons',
				title: 'Buttons',
				header: {
					title: null,
					class: 'text-end text-nowrap',
					buttons: [
						{
							action: 'TABLE_RESET_ORDERS',
						},
					],
				},
				sortable: false,
				width: '10%',
				class: 'text-end text-nowrap',
				filter: {
					class: 'text-end text-nowrap',
					buttons: [
						// {
						// 	action: 'TABLE_CLOSE_DETAILS',
						// },
						{
							action: 'TABLE_RESET_FILTERS',
						},
					],
				},
				buttons: [
					// {
					// 	action: 'TABLE_ROW_DETAIL',
					// },
					{
						action: 'TABLE_ROW_EDIT',
					},
					{
						action: 'TABLE_ROW_DELETE',
					},
					// {
					// 	action: 'TABLE_ROW_SAVE',
					// },
				],
				bulkbuttons: [
					{
						action: 'TABLE_BULK_DELETE',
					},
					{
						action: 'TABLE_BULK_SAVE',
					},
				],
			},
		]
	},
	form: {
		groups: [
			{
				fields: [
					{
						type: 'select',
						name: 'status',
						label: 'Státusz',
						options: [
							{
								value: 0,
								label: 'Új'
							},
							{
								value: 1,
								label: 'Aktív'
							},
							{
								value: 9,
								label: 'Törölt'
							}
						]
					},
					{
						type: 'select',
						name: 'language',
						label: 'Nyelv',
						required: true,
						options: [
							{
								value: 'hu',
								label: 'Magyar'
							},
							{
								value: 'en',
								label: 'Angol'
							}
						]
					},
					{
						type: 'text',
						name: 'title',
						label: 'Cím',
						required: true,
					},
					{
						type: 'text',
						name: 'slug',
						label: 'Url cím'
					},
					{
						type: 'upload',
						name: 'images',
						label: 'Képek',
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
					{
						type: 'html',
						name: 'lead',
						label: 'Bevezető'
					},
					{
						type: 'html',
						name: 'body',
						label: 'Tartalom'
					},
				]
			}
		]
	}

};

