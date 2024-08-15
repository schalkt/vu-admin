import { readonly } from "vue";

const api = {
	url: 'http://localhost:52000/vuapi/efiok/checks',
	options: {
		mode: "cors",
		cache: "no-cache",
	},
	auth: {
		type: 'Basic',
		user: 'nruser',
		password: 'RwenE3BEx5Jl'
	},
	input: {
		item: 'item',
		items: 'items',
		total: 'count'
	},
	output: {
		item: 'item',
		flatten: true,
		fields: [
			'_id',
			'year',
			'month',
			'status',
			'client.name',
			'client.taxform',
			'client.description',
			'states.general.repi_konyvelese.value',
			'states.recording.anyagok_bekuldve.changed',
			'images'
		]
	}
};

const translate = {
	hu: {
		'Reload': 'Frissítés {var1}',
	}
};

const methods = {
	convertDateIn: function (value, item) {

		if (value && typeof value === 'number') {

			let date = new Date(value * 1000);

			const formattedDate = date.toLocaleDateString('hu-HU', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			}).replace(/\./g, '-').replace(/\s+/g, '').substring(0, 10);

			const formattedTime = date.toLocaleTimeString('hu-HU', {
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false
			});

			return `${formattedDate} ${formattedTime}`;
		} else {
			return null;
		}
	},
	convertDateOut: function (value, item) {
		return Math.round((new Date(value)).getTime() / 1000);
	}
};

const exports = {
	default: {
		type: 'csv',
		fields: [{
			name: 'year',
			title: 'Év'
		},
		{
			name: 'month',
			title: 'Hónap'
		},
		{
			name: 'status',
			title: 'Státusz',
			template: (value) => value === 1 ? 'new' : value === 2 ? 'active' : 'unknown'
		},
		{
			name: 'client.name',
			title: 'Ügyfél'
		},
		{
			name: 'client.accounting.company.name',
			title: 'Könyvelő cég'
		},
		{
			name: 'client.taxform',
			title: 'Adózási forma'
		},
		{
			name: 'sum.overall.ready',
			title: 'Kész'
		}
		]
	}
}

const table = {
	title: 'E-fiók ellenőrzések',
	class: 'table-hover table-responsive table-sm',
	api: {
		url: 'http://localhost:52000/vuapi/efiok/checks',
	},
	pagination: {
		limit: 10,
		limits: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
	},
	exports: exports,
	control: {
		class: 'text-center border rounded mt-2',
		buttons: [
			{
				action: 'columns',
				title: 'Oszlopok',
				class: 'btn btn-sm btn-outline-dark m-1',
				icon: 'bi bi-table',
			},
			{
				action: 'reload',
				title: 'Reload',
				class: 'btn btn-sm btn-outline-dark m-1',
				icon: 'bi bi-arrow-clockwise',
			},
			{
				action: 'create',
				title: 'Új',
				class: 'btn btn-sm btn-warning m-1',
				icon: 'bi bi-plus-circle',
			},
			{
				action: function (item, data) {
					alert('Hi');
					// console.log(item, data);
				},
				title: 'Send',
				class: 'btn btn-sm btn-dark m-1',
				icon: 'bi bi-envelope',
			},
			{
				title: 'Export',
				class: 'btn btn-sm btn-primary m-1',
				icon: 'bi bi-download',
				dropdowns: [{
					action: 'export',
					params: {
						export: true,
						type: 'default',
					},
					title: 'Export',
					class: 'btn btn-sm btn-primary m-1',
					icon: 'bi bi-download',
				}]
			}
		]
	},
	order: {
		'year': {
			dir: 'DESC',
			fixed: true,
			idx: 0
		},
		'month': {
			dir: 'DESC',
			fixed: false,
			idx: 1
		},
		'states.recording.anyagok_bekuldve.changed': {
			dir: 'DESC',
			fixed: false,
			idx: 2
		}
	},
	columns: [
		{
			name: '',
			click: 'select',
			index: true,
			sortable: false,
			_width: '7%',
			title: '#',
			class: 'text-nowrap',
		},
		{
			name: '_id',
			click: 'select',
			hidden: true,
			class: 'cursor-pointer',
			title: 'ID',
			filter: {
				type: 'number',
				operator: '='
			}
		},
		{
			name: 'year',
			title: 'Év',
			width: '7%',
			filter: {
				type: 'number',
				// class: 'd-flex align-items-center justify-content-center',								
				min: 1990,
				max: 2030,
				default_value: 2024,
				default_operator: '=',
				operators: false,
				_buttonx: true,
				fixed: true,
				// operators: [{
				// 	label: '=',
				// 	value: '='
				// },
				// {
				// 	label: '>',
				// 	value: '>'
				// },
				// {
				// 	label: '<',
				// 	value: '<'
				// }]
			},
		},
		{
			name: 'month',
			title: 'Hónap',
			width: '12%',
			filter: {
				type: 'number',
				min: 1,
				max: 12,
				default_operator: '>=',
				default_value: 7,
				operators: true,
				buttonx: false,
				// operators: [{
				// 	label: '=',
				// 	value: '='
				// },
				// {
				// 	label: '>',
				// 	value: '>'
				// },
				// {
				// 	label: '<',
				// 	value: '<'
				// }]
			}
		},
		{
			name: 'status',
			title: 'Státusz',
			width: '8%',
			template: function (status) {

				let map = {
					0: '<span class="badge bg-warning text-dark">Új</span>',
					1: '<span class="badge bg-success text-light">Aktív</span>',
					9: '<span class="badge bg-danger text-light">Törölt</span>',
				}

				return map[status];

			},
			filter: {
				type: 'select',
				options: [
					{
						value: undefined,
						label: 'All'
					},
					{
						value: 0,
						label: 'New'
					},
					{
						value: 1,
						label: 'Active'
					},
					{
						value: 9,
						label: 'Deleted'
					}
				]
			}
		},
		{
			name: 'client.taxform',
			title: 'Adózás',
			filter: {
				type: 'text',
				default_operator: '%'
			},
			input: {
				type: 'text',
				autosave: true,
				onchange: function (value, column, item) {
					// console.log(value, column, item);
				}
			},
			bulk: {
				enabled: true,
			}
		},
		{
			name: 'client.name',
			title: 'Ügyfél',
			filter: {
				type: 'text',
				default_value: 'sch',
				default_operator: '%'
			},
			input: {
				type: 'text',
				autosave: true,
				onchange: function (value, column, item) {
					// console.log(value, column, item);
				}
			},
			bulk: {
				enabled: true,
			}
		},
		{
			name: 'states.general.repi_konyvelese.value',
			title: 'Repi könyvelése',
			filter: {
				type: 'select',
				options: [
					{
						label: 'Mind',
						value: undefined,
					},
					{
						label: 'Nincs megadva',
						value: null
					},
					{
						label: 'Szükséges',
						value: 0.1,
					},
					{
						label: 'Nem szükséges',
						value: 1.1,
					},
					{
						label: 'Kész van',
						value: 1.0,
					}
				],
			},
			input: {
				type: 'select',
				options: [
					{
						label: '',
						value: null
					},
					{
						label: 'Szükséges',
						value: 0.1,
					},
					{
						label: 'Nem szükséges',
						value: 1.1,
					},
					{
						label: 'Kész van',
						value: 1.0,
					}
				],
				autosave: true,
				onchange: function (value, column, item) {
					console.log(value, column, item);
				}
			},
			bulk: {
				enabled: true,
			}
		},
		{
			name: 'states.recording.anyagok_bekuldve.changed',
			title: 'Anyagok beküldve',
			filter: {
				type: 'datetime-local',
				operator: '>',
				_default: '2024-07-12 00:00:00',
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
				type: 'datetime-local',
				autosave: true,
				onchange: function (value, column, item) {
					console.log(value, column, item);
				}
			},
			bulk: {
				enabled: true,
			},
		},
		{
			name: '#buttons',
			title: 'Gombok',
			header: {
				title: null,
				class: 'text-end text-nowrap',
				buttons: [
					{
						action: 'resetorders',
						class: 'btn btn-sm btn-secondary bg-dark text-warning m-1',
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
						action: 'resetdetails',
						class: 'btn btn-sm btn-secondary bg-dark text-warning m-1',
					},
					{
						action: 'resetfilters',
						class: 'btn btn-sm btn-secondary bg-dark text-warning m-1',
					},
				],
			},
			buttons: [
				{
					action: 'details',
				},
				{
					action: 'edit',
				},
				{
					action: 'delete',
				},
				{
					action: 'save',
				},
			],
			bulkbuttons: [
				{
					action: 'delete',
				},
				{
					action: 'save',
				},
			],
		},
	],
	details: {
		class: 'text-secondary',
		fields: [
			{
				name: 'client.accounting.company.name',
				class: 'col-md-3',
				label: 'Könyvelő',
				input: {
					type: 'text',
					autosave: true,
				},
			},
			{
				name: 'client.accounting.company.address_formatted',
				label: 'Cím',
				class: 'col-md-3',
				input: {
					type: 'text',
					autosave: true,
				},
			},
			{
				name: 'states.recording.anyagok_bekuldve.changed',
				label: 'Anyagok beküldve',
				class: 'col-md-3',
				input: {
					type: 'datetime-local',
					autosave: true,
					onchange: function (value, column, item) {
						console.log(value, column, item);
					},
				},
			},
			{
				name: 'states.recording.vevo.changed',
				label: 'Vevő változott',
				class: 'col-md-3',
				input: {
					type: 'datetime-local',
					autosave: true,
					onchange: function (value, column, item) {
						console.log(value, column, item);
					},
				},
			},
			{
				name: 'status',
				label: 'Státusz',
				class: 'col-md-3',
				input: {
					type: 'select',
					autosave: true,
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
			},
		],
		raw: function (item) {
			return [
				'<div class="my-1 p-2 bg-secondary text-dark d-flex align-items-center justify-content-center">',
				'<small class="me-4"><strong class="me-2">Azonosító</strong><span>' + item['_id'] + '</span></small>',
				'<small class="me-4"><strong class="me-2">Létrehozva</strong><span>' + (new Date(item['date_created_at'])).toLocaleString('hu-HU') + '</span></small>',
				'<small class="me-4"><strong class="me-2">Módosítva</strong><span>' + (new Date(item['date_updated_at'])).toLocaleString('hu-HU') + '</span></small>',
				'</div>'
			].join('');
		}
	}
};

const form = {
	title: function (item) {

		return [
			(item['client.name'] ? item['client.name'] : null),
			(item.year ? ('<small class="fw-lighter fs-6 mx-3">' + item.year + '-' + item.month + '</small>') : null),
			(item._id ? ('<small class="text-muted fs-6 fw-normal">( <span class="text-info">' + item['_id'] + '</span> )</small>') : null)
		].join(' . ');
	},
	default: {
		year: 2024,
		month: 7
	},
	groups: [
		{
			title: 'Alapadtok',
			class: 'col-md-6',
			fields: [
				{
					type: 'select',
					name: 'status',
					label: 'Státusz',
					options: [
						{
							value: undefined,
							label: ''
						},
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
					type: 'number',
					class: 'bg-black',
					readonly: true,
					name: 'year',
					label: 'Év',
					required: true,
				},
				{
					type: 'text',
					name: 'client.name',
					label: 'Ügyfél',
					required: true,
				},
				{
					type: 'image',
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
					name: 'client.description',
					label: function (params) {
						return params.item['client.name'] + ' leírása';
					}
				},
			]
		},
		{
			title: 'Részletes adatok',
			class: 'col-md-6',
			fields: [
				{
					type: 'select',
					name: 'status',
					label: 'Státusz',
					options: [
						{
							value: undefined,
							label: ''
						},
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
					type: 'text',
					name: 'client.name',
					label: 'Ügyfél',
					required: true,
				},
				{
					type: 'image',
					name: 'images',
					label: 'Képek',
					required: false,
					params: {
						limit: 2,
						text: 'Click here to upload',
						accept: ["image/png", "image/jpeg", "image/webp"],
						thumbnail: 'small',
						download: 'large',
						editor: false,
						presets: {
							large: {
								width: 960,
								height: 540,
								convert: "image/webp",
								quality: 0.8
							},
							small: {
								width: 300,
								height: 150,
								convert: "image/webp",
								quality: 0.7
							},
							tiny: {
								width: 150,
								height: 90,
								convert: "image/webp",
								quality: 0.6
							},
						},
					}
				},
				{
					type: 'html',
					name: 'client.description',
					label: 'Ügyfél leírása'
				},
			]
		}
	]
}

export default {
	pkey: '_id',
	class: 'p-3 rounded',
	theme: 'dark',
	debug: true,
	api: api,
	translate: translate,
	methods: methods,
	table: table,
	form: form,
	events: {
		beforeItemsLoad: function (urlParams) { },

		afterItemsLoad: function (items) { },
		afterItemLoad: function (item) { },

		beforeItemSave: function (item, urlParams) { },
		afterItemSave: function (item) { },

		beforeBulkSave: function (bulkitem) { },
		afterBulkSave: function (bulkitem) { },
	},
	converts: {
		in: [{
			method: 'convertDateIn',
			fields: [
				'states.recording.anyagok_bekuldve.changed',
				'states.recording.vevo.changed',
				'states.recording.szallito.changed'
			]
		}],
		out: [{
			method: 'convertDateOut',
			fields: [
				'states.recording.anyagok_bekuldve.changed',
				'states.recording.vevo.changed',
				'states.recording.szallito.changed'
			]
		}],
	},
};

