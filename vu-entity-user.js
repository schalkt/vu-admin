
window.VuEntities = window.VuEntities ? window.VuEntities : {};

window.VuEntities.user = (preset) => {

	// templates that build HTML must escape every data value (XSS)
	const { escapeHtml, safeUrl } = window.VuAdminHelpers;

	const availableRoles = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'superuser', label: 'Superuser' },
		{ value: 'moderator', label: 'Moderator' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'guest', label: 'Guest' },
	];

	return {
		pkey: 'id',
		theme: 'dark',
		debug: false,
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
			title: 'Users',
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
					name: 'image',
					title: 'Avatar',
					sortable: false,
					template: function (image, item) {

						if (!image) {
							return;
						}

						let img = '<img class="rounded" height="24" src="' + escapeHtml(safeUrl(image)) + '" alt="' + escapeHtml(item['username']) + '" />';

						return img;
					},
				},
				{
					name: 'firstName',
					title: 'Name <span class="text-muted ms-1 fw-light">( username )</span>',
					template: (firstName, item) => {
						return escapeHtml(item.firstName + ' ' + item.lastName) + '<span class="text-muted ms-2 fw-light">( ' + escapeHtml(item.username) + ' )</span>';
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
					title: 'Birth date',
					convert: {
						in: (value, item, column) => {
							if (!value) return '';
							const d = new Date(value);
							return isNaN(d.getTime()) ? '' : d.toISOString().substring(0, 10);
						},
						out: (value, item, column) => {
							return value ? value.replace('-0', '-') : '';
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
					title: 'Height (cm)',
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
					title: 'Weight (kg)',
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
					name: 'twofa',
					title: '2FA',
					sortable: false,
					width: '7%',
					template: (value) => {
						if (!value) return '<span class="badge bg-secondary opacity-50">–</span>';
						if (value === 'email') return '<span class="badge bg-info text-dark">E-mail</span>';
						if (value === 'totp') return '<span class="badge bg-success">TOTP</span>';
						return escapeHtml(value);
					},
					filter: {
						type: 'select',
						options: [
							{ value: '', label: 'Mind' },
							{ value: 'email', label: 'E-mail' },
							{ value: 'totp', label: 'TOTP' },
						]
					}
				},
				{

					name: 'hair.color',
					title: 'Hair color',
					template: (value) => {

						if (!value) return '';
						let color = value.toLowerCase();
						let icon = '<i class="bi bi-circle-fill" style="color: ' + escapeHtml(color.replace('blonde', '#FBE7A1').replace(/[^a-z0-9#]/g, '')) + '"></i>';

						return icon + ' ' + '<span class="text-secondary ms-2">' + escapeHtml(color) + '</span>';

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
					title: 'Address',
					template: (value, item) => {

						let address = '<span>' + escapeHtml(value) + '</span> <small class="text-light">' + escapeHtml(item['address.address']) + '</small>';
						let search = 'https://www.google.com/maps/search/' + encodeURIComponent(value + ' ' + item['address.postalCode'] + ',' + item['address.address'] + ',' + item['address.country']);
						let link = '<a class="link-offset-2 link-underline link-underline-opacity-0" href="' + escapeHtml(search) + '" target="_blank" rel="noopener noreferrer"><i class="bi bi-geo-alt me-1"></i>' + address + '</a>';

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
								'<a target="_blank" rel="noopener noreferrer" href="' + escapeHtml(safeUrl(baseUrl + (img.types.large.url ? img.types.large.url : img.types.large.data))) + '"><img height="24" width="auto" class="" src="' + escapeHtml(safeUrl(baseUrl + (img.types.tiny.url ? img.types.tiny.url : img.types.tiny.data))) + '" alt="' + escapeHtml(img.title) + '" /></a>'
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
								// Send a FILTER event to the todos entity, the same as filterLink does
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
									return params?.item?.[params?.form?.settings?.pkey] ? false : true;
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
							return params?.item?.[params?.form?.settings?.pkey] ? false : true;
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
					title: 'Personal data',
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
								return '<img src="' + escapeHtml(safeUrl(src)) + '" height="64" width="64" class="rounded-circle border shadow mb-1"><br><small class="text-muted">' + escapeHtml(name.trim()) + '</small>';
							},
						},
						{
							type: 'text',
							name: 'firstName',
							label: 'First name',
							required: true,
							class: 'col-md-6',
						},
						{
							type: 'text',
							name: 'lastName',
							label: 'Last name',
							required: true,
							class: 'col-md-6',
						},
						{
							type: 'text',
							name: 'username',
							label: 'Username',
							required: true,
						},
						{
							type: 'email',
							name: 'email',
							label: 'E-mail address',
							required: true,
						},
						{
							type: 'date',
							name: 'birthDate',
							label: 'Birth date',
						},
						{
							type: 'select',
							name: 'gender',
							label: 'Gender',
							class: 'col-md-6',
							options: [
								{ value: 'male', label: 'Male' },
								{ value: 'female', label: 'Female' },
							],
						},

						{
							type: 'dropdown',
							name: 'roles',
							label: 'Roles',
							dropdown: {
								label: 'Add role',
								class: 'btn btn-sm btn-outline-secondary',
							},
							list: {
								class: 'badge bg-secondary me-1 cursor-pointer',
							},
							options: availableRoles
						},
						{
							type: 'select',
							name: 'twofa',
							label: 'Two-factor authentication (2FA)',
							options: [
								{ value: '', label: 'Kikapcsolva' },
								{ value: 'email', label: 'E-mail code' },
							],
						},
					]
				},
				{
					title: 'Physical data',
					class: 'border rounded p-4 col-md-3',
					fields: [
						{
							type: 'number',
							name: 'age',
							label: 'Age (years)',
							readonly: true,
						},
						{
							type: 'number',
							name: 'height',
							label: 'Height (cm)',
							min: 50,
							max: 250,
						},
						{
							type: 'number',
							name: 'weight',
							label: 'Weight (kg)',
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
								const cssColor = color.replace('blonde', '#FBE7A1').replace(/[^a-z0-9#]/g, '');
								return '<i class="bi bi-circle-fill me-2" style="color:' + cssColor + '"></i>' +
									'<span class="text-secondary">' + escapeHtml(hair.color) + ' · ' + escapeHtml(hair.type) + '</span>';
							},
						},
					]
				},
				{
					title: 'Home address',
					class: 'border rounded p-4 col-md-4',
					fields: [
						{
							type: 'template',
							name: 'address',
							label: null,
							template: ({ field, item }) => {
								const a = item[field.name];
								if (!a) return '<span class="text-muted">–</span>';
								return '<div class="mb-1"><strong>' + escapeHtml(a.address) + '</strong></div>' +
									'<div class="text-secondary">' + escapeHtml(a.postalCode) + ' ' + escapeHtml(a.city) + '</div>' +
									'<div class="text-muted">' + escapeHtml(a.country) + '</div>';
							},
						},
					]
				},
			]
		}

	};

};

