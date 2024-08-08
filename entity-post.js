export default {
	pkey: 'id',	
	api: {
		url: 'http://supercms.vi/szerk/api/post',
		input: {
			item: 'item',
			items: 'items'
		}
	},
	translate: {
		'First' : 'Első',
		'Prev': 'Előző',
		'Next': 'Következő',
		'Last': 'Utolsó',
		'Columns': 'Oszlopok',
		'all': 'összesen',
		'page': 'oldal',
		'Visible all': 'Mind látható',
		'Hidden all': 'Mind rejtett',
		'row': 'sor',
		'=': 'Egyenlő',
		'>': 'Nagyobb mint',
		'<': 'Kisebb mint'
	},
	table: {
		title: '',
		theme: 'light',
		header: {
			class: '',
			buttons: []
		},
		pagination: {
			limit: 2,
			limits: [2, 5, 10],
			size: 4
		},
		order: {
			'id': {
				dir: 'DESC',
				fixed: false,
				idx: 0
			},
		},
		buttons: [
			{
				action: 'edit',
				title: '',
				class: 'btn btn-sm btn-primary m-1',
				icon: 'bi bi-pencil-square',
			},
			// {
			// 	action: 'delete',
			// 	title: '',
			// 	class: 'btn btn-sm btn-danger m-1',
			// 	icon: 'bi bi-trash',
			// }
		],
		columns: [
			{
				name: 'id',
				title: 'ID',
				width: '5%',
				filter: {
					type: 'number',
					operator: '='
				}
			},
			{
				name: 'status',
				title: 'Státusz',
				width: '15%',
				xtemplate: function (status) {

					let map = {
						0: 'Új',
						1: 'Aktív',
						9: 'Törölt'
					}

					return map[status];

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
				},
				input: {
					type: 'select',
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
					],
					autosave: true,
					onchange: function (value, column, item) {
						console.log(value, column, item);
					}
	
				}

			},
			{
				name: 'language',
				title: 'Lang',
				filter: {
					type: 'select',
					options: [
						{
							value: undefined,
							label: 'Mind'
						},
						{
							'label': 'Magyar',
							'value': 'hu'
						},
						{
							'label': 'Angol',
							'value': 'en'
						}
					]
				}
			},
			{
				name: 'images',
				title: 'Képek',
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
							'<a target="_blank" href="' + baseUrl + (img.types.large.url ? img.types.large.url : img.types.large.data) + '"><img height="50" width="auto" class="" src="' + baseUrl + (img.types.tiny.url ? img.types.tiny.url : img.types.tiny.data) + '" alt="' + img.title + '" /></a>'
						);
					}

					// }

					return elements.join(' ');

				}
			},
			{
				name: 'title',
				title: 'Title',
				filter: {
					type: 'text'
				}
			}
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

};

