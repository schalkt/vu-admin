
window.VuEntities = window.VuEntities ? window.VuEntities : {};

window.VuEntities.todos = (preset) => {

	return {
		pkey: 'id',
		debug: true,
		api: {
			url: '/api/todos',
			options: {
				mode: "cors",
				cache: "no-cache"
			},
			input: {
				item: null,
				items: 'todos',
				total: 'total'
			}
		},
		events: {
			beforeItemsLoad: (urlParams, settings) => {
				// Keresem a userId oszlopot és annak filter értékét
				const userIdColumn = settings.table.columns.find(col => col.name === 'userId');
				if (userIdColumn && userIdColumn.filter && userIdColumn.filter.value !== undefined && userIdColumn.filter.value !== null) {
					// Módosítom az API URL-t, hogy tartalmazza a user ID-t
					settings.table.api.url = '/api/todos/user/' + userIdColumn.filter.value;
				} else {
					// Ha nincs userId filter, visszaállítom az eredeti URL-t
					settings.table.api.url = '/api/todos';
				}
			}
		},
		table: {
			title: 'Todos',
			filterListen: {
				entity: 'user'
			},
			pagination: {
				limit: 10,
				size: 5,
				limits: [10, 20, 50, 100]
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
					name: 'todo',
					title: 'Todo',
					class: 'text-nowrap',
					filter: {
						type: 'text',
						default_operator: '%',
						buttonx: true
					}
				},
				{
					name: 'completed',
					title: 'Completed',
					width: '10%',
					class: 'text-center',
					template: (value) => {
						if (value) {
							return '<i class="bi bi-check-circle-fill text-success"></i> <span class="text-success">Yes</span>';
						}
						return '<i class="bi bi-x-circle-fill text-danger"></i> <span class="text-danger">No</span>';
					},
					filter: {
						type: 'select',
						options: [
							{
								value: true,
								label: 'Completed'
							},
							{
								value: false,
								label: 'Not completed'
							}
						]
					}
				},
				{
					name: 'userId',
					title: 'User ID',
					class: 'text-end',
					width: '10%',
					filter: {
						type: 'number',
						operator: '=',
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
					buttons: [
						{
							action: 'TABLE_ROW_EDIT',
						},
						{
							action: 'TABLE_ROW_DELETE',
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
							type: 'text',
							name: 'todo',
							label: 'Todo',
							required: true,
						},
						{
							type: 'select',
							name: 'completed',
							label: 'Completed',
							options: [
								{
									value: false,
									label: 'Not completed'
								},
								{
									value: true,
									label: 'Completed'
								}
							]
						},
						{
							type: 'text',
							name: 'userId',
							label: 'User ID',
							required: true,
							input: {
								type: 'number'
							}
						},
					]
				}
			]
		}
	};

};

