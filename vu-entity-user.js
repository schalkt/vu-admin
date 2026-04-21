
window.VuEntities = window.VuEntities ? window.VuEntities : {};

window.VuEntities.user = (preset) => {

	return {
		pkey: 'id',
		theme: 'dark',
		debug: true,
		events: {
			afterItemSave: (data, urlParams, auth) => {
				if (auth && auth.user && data && data.id === auth.user.id) {
					auth.user.firstName = data.firstName;
					auth.user.lastName = data.lastName;
					auth.user.image = data.image;
					localStorage.setItem('vu-user', JSON.stringify(auth.user));
				}
			},
		},
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
					},
					filterLink: {
						entity: 'todos',
						field: 'userId',
						value: 'id'
					},
					class: 'cursor-pointer'
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
							action: (item, params, self) => {
								// Küldjünk FILTER eventet a todos entity-nek, ugyanazt, mint a filterLink
								const filterValue = item[self.settings.pkey];
								if (filterValue !== undefined && filterValue !== null) {
									self.sendEvent('FILTER', 'todos', {
										field: 'userId',
										value: filterValue
									});
								}
							},
							title: 'Todos',
							class: 'btn btn-sm btn-outline-info',
							icon: 'bi bi-list-check'
						},
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
			control: {
				class: 'text-end',
				buttons: [
					{
						title: 'More actions',
						class: 'btn btn-sm btn-outline-dark m-1',
						icon: 'bi bi-list',
						dropdowns: [
							{
								action: 'FORM_COPY',
								title: 'Copy',
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
								title: 'Export data',
								class: 'dropdown-item cursor-pointer p-1',
								icon: 'bi bi-filetype-csv',
								action: (item, params) => {
									console.log(item);
									console.log(params);
	
									if (confirm('Are you sure?')) {
										console.log(items);
										alert('Hello :)');
									}
	
								},
								params: {
									export: true,
									type: 'default',
								},
							},
							{
								action: 'FORM_DELETE',
								title: 'Delete',
								class: 'dropdown-item cursor-pointer p-1 text-danger',
								icon: 'bi bi-trash',
								disabled: (params) => {
									return params.item[params.form.settings.pkey] ? false : true;
								}
							},
						]
					},
					{
						action: 'FORM_RELOAD',
						title: 'Reload',
						class: 'btn btn-sm btn-outline-dark m-1',
						icon: 'bi bi-arrow-clockwise',
						disabled: (params) => {
							return params.item[params.form.settings.pkey] ? false : true;
						}
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
						icon: 'bi bi-save',
					},
	
				],
			},
			groups: [
				{
					title: 'Személyes adatok',
					class: 'border rounded p-4 col-md-5',
					fields: [
						{
							type: 'template',
							name: 'image',
							label: null,
							class: 'col-md-12 text-center mb-2',
							template: ({ field, item }) => {
								const src = item[field.name] || '/mock/avatar/??';
								const name = (item.firstName || '') + ' ' + (item.lastName || '');
								return '<img src="' + src + '" height="64" width="64" class="rounded-circle border shadow mb-1"><br><small class="text-muted">' + name.trim() + '</small>';
							},
						},
						{
							type: 'text',
							name: 'firstName',
							label: 'Keresztnév',
							required: true,
							class: 'col-md-6',
						},
						{
							type: 'text',
							name: 'lastName',
							label: 'Vezetéknév',
							required: true,
							class: 'col-md-6',
						},
						{
							type: 'text',
							name: 'username',
							label: 'Felhasználónév',
							required: true,
						},
						{
							type: 'email',
							name: 'email',
							label: 'E-mail cím',
							required: true,
						},
						{
							type: 'date',
							name: 'birthDate',
							label: 'Születési dátum',
						},
						{
							type: 'select',
							name: 'gender',
							label: 'Nem',
							class: 'col-md-6',
							options: [
								{ value: 'male',   label: 'Férfi' },
								{ value: 'female', label: 'Nő' },
							],
						},
						{
							type: 'select',
							name: 'role',
							label: 'Elsődleges szerepkör',
							class: 'col-md-6',
							options: [
								{ value: 'admin',     label: 'Admin' },
								{ value: 'moderator', label: 'Moderátor' },
								{ value: 'editor',    label: 'Szerkesztő' },
								{ value: 'guest',     label: 'Vendég' },
							],
						},
						{
							type: 'dropdown',
							name: 'roles',
							label: 'Szerepkörök',
							dropdown: {
								label: 'Szerepkör hozzáadása',
								class: 'btn btn-sm btn-outline-secondary',
							},
							list: {
								class: 'badge bg-secondary me-1 cursor-pointer',
							},
							options: [
								{ value: 'admin',     label: 'Admin' },
								{ value: 'moderator', label: 'Moderátor' },
								{ value: 'editor',    label: 'Szerkesztő' },
								{ value: 'guest',     label: 'Vendég' },
							],
						},
					]
				},
				{
					title: 'Fizikai adatok',
					class: 'border rounded p-4 col-md-3',
					fields: [
						{
							type: 'number',
							name: 'age',
							label: 'Kor (év)',
							readonly: true,
						},
						{
							type: 'number',
							name: 'height',
							label: 'Magasság (cm)',
							min: 50,
							max: 250,
						},
						{
							type: 'number',
							name: 'weight',
							label: 'Súly (kg)',
							min: 20,
							max: 300,
						},
						{
							type: 'template',
							name: 'hair',
							label: 'Haj',
							template: ({ field, item }) => {
								const hair = item[field.name];
								if (!hair) return '<span class="text-muted">–</span>';
								const color = (hair.color || '').toLowerCase();
								const cssColor = color.replace('blonde', '#FBE7A1');
								return '<i class="bi bi-circle-fill me-2" style="color:' + cssColor + '"></i>' +
									'<span class="text-secondary">' + (hair.color || '') + ' · ' + (hair.type || '') + '</span>';
							},
						},
					]
				},
				{
					title: 'Lakcím',
					class: 'border rounded p-4 col-md-4',
					fields: [
						{
							type: 'template',
							name: 'address',
							label: null,
							template: ({ field, item }) => {
								const a = item[field.name];
								if (!a) return '<span class="text-muted">–</span>';
								return '<div class="mb-1"><strong>' + (a.address || '') + '</strong></div>' +
									'<div class="text-secondary">' + (a.postalCode || '') + ' ' + (a.city || '') + '</div>' +
									'<div class="text-muted">' + (a.country || '') + '</div>';
							},
						},
					]
				},
			]
		}

	};

};

