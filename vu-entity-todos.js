
window.VuEntities = window.VuEntities ? window.VuEntities : {};

window.VuEntities.todos = (preset) => {

	// templates that build HTML must escape every data value (XSS)
	const { escapeHtml, safeUrl } = window.VuAdminHelpers;

	// user filter options: every user by name (with the stored login header, like the tables)
	const loadUserOptions = async (column) => {
		try {
			let headers = {};
			try {
				headers = JSON.parse(localStorage.getItem('vu-header')) || {};
			} catch (e) {
				// no stored header
			}
			const response = await fetch('/api/users?limit=0', { headers });
			if (!response.ok) {
				return;
			}
			const data = await response.json();
			const users = Array.isArray(data.users) ? data.users : [];
			column.filter.options = users
				.map((user) => ({ value: user.id, label: [user.firstName, user.lastName].join(' ').trim() || '#' + user.id }))
				.sort((a, b) => a.label.localeCompare(b.label));
		} catch (e) {
			console.error('[todos] user filter options', e);
		}
	};

	return {
		pkey: 'id',
		debug: false,
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
			// the related user (relation) is only for display, it is not saved into the todo
			beforeItemSave: (item) => {
				delete item.user;
			},
			afterSettingsInit: (settings) => {
				const userColumn = settings.table.columns.find((column) => column.name === 'userId');
				if (userColumn && userColumn.filter) {
					loadUserOptions(userColumn);
				}
			},
		},
		relations: {
			// userId → user (name, avatar); one request for the users of the current page
			user: {
				entity: 'user',
				local: 'userId',
				foreign: 'id',
				api: {
					url: '/api/users',
					input: {
						items: 'users',
					},
				},
			},
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
					width: '12%',
					class: 'text-center',
					// editable in the row: saved right after the change
					input: {
						type: 'select',
						autosave: true,
						class: (params) => (params.item && params.item.completed ? 'text-success' : 'text-danger'),
						options: [
							{ value: false, label: 'No' },
							{ value: true, label: 'Yes' },
						],
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
					title: 'User',
					class: 'text-nowrap',
					width: '16%',
					relation: {
						config: 'user',
						params: {
							limit: 0,
						},
					},
					template: (userId, item) => {
						if (!item.user) {
							return '<span class="text-muted">#' + escapeHtml(userId) + '</span>';
						}
						const name = [item.user.firstName, item.user.lastName].join(' ').trim();
						return '<img src="' + escapeHtml(safeUrl(item.user.image)) + '" height="20" width="20" class="rounded-circle border me-1">' + escapeHtml(name);
					},
					// select by user name; the options are loaded in afterSettingsInit
					// (the user table's "Todos" button sets this filter too: filterListen)
					filter: {
						type: 'select',
						options: [],
						buttonx: true,
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

