const api = {
	url: 'http://localhost:52000/vuapi',
	options: {
		mode: "cors",
		cache: "no-cache",
	},
	auth: {
		type: 'Basic',
		user: 'nruser',
		password: 'RwenE3BEx5Jl'
	},
};

const translate = {
	'Columns': 'Oszlopok',
	'all': 'összesen',
	'page': 'oldal',
	'Visible all': 'Mind látható',
	'Hidden all': 'Mind rejtett',
	'=': 'Egyenlő',
	'>': 'Nagyobb mint',
	'<': 'Kisebb mint'
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

const table = {
	title: 'E-fiók ellenőrzések',
	page: {
		current: 1,
		limit: 10,
		limits: undefined,
		pagination: 5,
	},
	header: {
		class: 'text-center bg-secondary border rounded',
		buttons: [
			{
				action: 'reload',
				title: 'Újratöltés',
				class: 'btn btn-sm btn-outline-dark m-1',
				icon: 'bi bi-arrow-clockwise',
			},
			{
				action: 'create',
				title: 'Új',
				class: 'btn btn-sm btn-warning m-1',
				icon: 'bi bi-plus-circle',
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
			fixed: true,
			idx: 1
		},
	},
	columns: [
		{
			name: '',
			click: 'select',
			index: true,
			sortable: false,
			width: '7%',
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
			width: '10%',
			filter: {
				type: 'number',
				default: 2024,
				operator: '=',
				operators: false,
				buttonx: false
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
			name: 'month',
			title: 'Hónap',
			width: '10%',
			filter: {
				type: 'number',
				default: 7,
				operator: '=',
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
			template: function (item) {

				let map = {
					0: 'Új',
					1: 'Aktív',
					9: 'Törölt'
				}

				return map[item.status];

			},
			filter: {
				type: 'select',
				options: [
					{
						value: undefined,
						label: 'Mind'
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
			}
		},
		{
			name: 'client.name',
			title: 'Ügyfél',
			input: {
				type: 'text',
				autosave: true,
				onchange: function (value, column, item) {
					console.log(value, column, item);
				}
			},
		},
		{
			name: 'states.general.repi_konyvelese.value',
			title: 'Repi könyvelése',
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

			}
		},
		{
			name: '#buttons',
			title: null,
			sortable: false,
			width: '10%',
			class: 'text-end text-nowrap',
			headerbuttons: [
				{
					action: 'resetorders',
					// title: 'Alapértelmezés',
					class: 'btn btn-sm btn-secondary bg-dark text-warning m-1',
					icon: 'bi bi-x',
				},
			],
			filterbuttons: [
				{
					action: 'resetdetails',
					xtitle: 'Mind becsuk',
					class: 'btn btn-sm btn-secondary bg-dark text-warning m-1',
					icon: 'bi bi-chevron-compact-up',
				},
				{
					action: 'resetfilters',
					// title: 'Alapértelmezés',
					class: 'btn btn-sm btn-secondary bg-dark text-warning m-1',
					icon: 'bi bi-x',
				},
			],
			rowbuttons: [
				{
					action: 'details',
					title: '',
					class: 'btn btn-sm ms-1 btn-outline-secondary text-light m-1',
					icon: 'bi bi-chevron-compact-down',
				},
				{
					action: 'edit',
					title: '',
					class: 'btn btn-sm btn-secondary m-1',
					icon: 'bi bi-pencil-square',
				},
				{
					action: 'delete',
					title: '',
					class: 'btn btn-sm btn-danger m-1',
					icon: 'bi bi-trash',
				},
				{
					action: 'save',
					title: '',
					class: 'btn btn-sm btn-primary m-1',
					icon: 'bi bi-save',
				},
			],
		},
	],
	details: {
		class: 'text-secondary',
		fields: [
			{
				name: 'client.accounting.company.name',
				label: 'Cégnév',
				input: {
					type: 'text',
					autosave: true,
				},
			},
			{
				name: 'client.accounting.company.address_formatted',
				label: 'Cím',
				input: {
					type: 'text',
					autosave: true,
				},
			},
			{
				name: 'states.recording.anyagok_bekuldve.changed',
				label: 'Anyagok beküldve',
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
				'<div class="m-1 p-2 bg-secondary text-dark d-flex align-items-center justify-content-center">',
				'<small class="me-4"><strong class="me-2">Azonosító</strong><span>' + item['_id'] + '</span></small>',
				'<small class="me-4"><strong class="me-2">Létrehozva</strong><span>' + (new Date(item['date_created_at'])).toLocaleString('hu-HU') + '</span></small>',
				'<small class="me-4"><strong class="me-2">Módosítva</strong><span>' + (new Date(item['date_updated_at'])).toLocaleString('hu-HU') + '</span></small>',
				'</div>'
			].join('');
		}
	}
};

const form = {
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

export default {
	pkey: '_id',
	api: api,
	translate: translate,
	events: {
		loadeditems: function (items) { },
		loadeditem: function (item) { },
		savingitem: function (item) { },
	},
	methods: methods,
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
	table: table,
	form: form

};

