
window.VuEntities = window.VuEntities ? window.VuEntities : {};

window.VuEntities.post = (preset) => {

	let api = {
		url: '/api/posts',
		input: {
			item: null,
			items: "posts",
			total: "total",
		},
		output: {
			fields: undefined
		}
	};


	let columns = [
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
			name: 'userId',
			title: 'User',
			relation: {
				config: 'user1',
				params: {
					limit: 0,
					select: ['id', 'firstName', 'lastName'],
					entity: (params) => {
						// console.log(params);
						return params.column.relation.config;
					}
				}
			},
			template: (value, item, index, column) => {

				return;

				console.log(item.user, column);

				let button = ' <button class="btn btn-sm btn-outline-dark" type="button" @click="tableAction(button, item, index, $event)">Edit</button>';

				return item.user.firstName + ' ' + item.user.lastName + button;
			},
			buttons: [
				{
					action: (item, params, self) => {
						self.sendEvent('EDIT', 'user', {
							item: item.user,
							params: params
						});
					},
					class: 'btn btn-sm btn-outline-secondary w-100',
					icon: 'bi bi-person-fill me-1',
					template: (value, item, index, column) => {
						return item.user.firstName + ' ' + item.user.lastName
					}
				},
			],

		},
		{
			name: 'reactions.likes',
			title: 'Likes',
			width: '10%',
			progressbar: {
				class: 'bg-success text-light fw-bold',
				max: 1500,
				value: true,
			},
			filter: {
				type: 'number',
				default_operator: '>',
				// default_value: 4,
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
				buttonx: true
			}
		},
		{
			name: 'reactions.dislikes',
			title: 'Dislikes',
			width: '10%',
			progressbar: {
				class: 'bg-warning text-light fw-bold',
				max: 50,
				value: true,
			},
			filter: {
				type: 'number',
				default_operator: '>',
				// default_value: 4,
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
				buttonx: true
			}
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
			buttons: [
				// {
				// 	action: 'TABLE_ROW_DETAIL',
				// },
				{
					action: 'TABLE_ROW_EDIT',
				},
				{
					action: 'TABLE_ROW_DELETE',
					hidden: true,
				},
				// {
				// 	action: 'TABLE_ROW_SAVE',
				// },
			],
			sortable: false,
			width: '10%',
			class: 'text-end text-nowrap',
			filter: {
				class: 'text-end text-nowrap',
				buttons: [
					{
						action: 'TABLE_RESET_FILTERS',
					},
				],
			},
		},
	];

	let table = {
		title: 'Posts',
		class: 'table-hover table-responsive table-sm',
		pagination: {
			size: 10,
			limit: 10,
			limits: null,
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
					action: 'FORM_CREATE',
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
						action: 'TABLE_EXPORT',
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
	};

	let form = {
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
				fields: [

					{
						type: 'select',
						name: 'userId',
						label: 'User',
						suffix: (params, settings) => {
							return `<a href="/${params.item['user.id']}" class="link">LINK</a>`;
						},
						relation: {
							config: 'user1',
							params: {
								limit: 0,
								select: ['id', 'firstName', 'lastName'],
							},
						},
						options: (item, field, self) => {

							return field.relation.items.map(person => ({
								value: person.id,
								label: `${person.firstName} ${person.lastName}`
							}));

						},
						required: false,
						description: (params, settings) => {
							return `<small></small>${JSON.stringify(params.item['user.id'])}</small>`
						}
					},
					{
						type: 'list',
						name: 'owners',
						label: 'Owners',
						sort: false,
						elements: {
							owner: {
								type: 'select',
								options: () => {
									return [
										{
											label: 'Google',
											value: {
												id: 1,
												link: 'https://www.google.com/'
											}
										},
										{
											label: 'Youtube',
											value: {
												id: 2,
												link: 'https://www.youtube.com/'
											}

										}
									];
								},
								class: 'col-md-10',
								template: (value, params) => {
									console.log(value, params);
									return value.owner.link + ' ' + value.owner.id;;
								},
								required: true
							},
						}
					},
					{
						type: 'text',
						name: 'title',
						label: 'Title',
						required: true,
					},

					{
						type: 'html',
						name: 'body',
						label: 'Body'
					},
				]
			}
		]
	};

	return {
		pkey: 'id',
		debug: true,
		api: api,
		language: 'en',
		table: table,
		form: form,
		translate: {
			en: {
				First: '<i class="bi bi-chevron-double-left"></i>',
				Prev: '<i class="bi bi-chevron-left"></i>',
				Next: '<i class="bi bi-chevron-right"></i>',
				Last: '<i class="bi bi-chevron-double-right"></i>',
			}
		},
		relations: {
			user1: {
				entity: 'user',
				local: 'userId',
				foreign: 'id',
				api: {
					url: '/api/users',
					options: {
						mode: "cors",
						cache: "no-cache"
					},
					input: {
						items: 'users'
					}
				},
			},
			user2: {
				entity: 'user',
				local: 'userId',
				foreign: 'id',
				api: {
					url: '/api/users',
					options: {
						mode: "cors",
						cache: "no-cache"
					},
					input: {
						items: 'users'
					}
				},
			}
		},

	};

};

