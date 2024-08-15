export default {
	pkey: 'id',
	api: {
		url: 'http://supercms.vi/szerk/api/post',
		options: {
			mode: "cors",
			cache: "no-cache"
		},
		auth: {
			type: 'Basic',
			user: 'editor',
			password: 'editor'
		},
		input: {
			item: 'item',
			items: 'items'
		}
	},
	relations: {
		user: {
			entity: 'user',
			local: 'user_id',
			foreign: 'id',
			type: '1-8',
		}
	},
	table: {
		pagination: {
			hidden: true,
		},
		header: {
			title: 'ioi',
			_hidden: true,
		},
		columns: [
			{
				name: 'id',
				// filter: {
				// 	type: 'number',
				// 	operator: '='
				// }
			},
			{
				name: 'user_id',
				title: 'Felhasználó',
				sortable: false,
				relation: {
					entity: 'user',
					columns: ['id', 'email', 'images'],
				},
				template: function (user_id, item) {

					if (!item['user.email']) {
						return;
					}

					let img;

					if (item['user.images'] && item['user.images'][0]) {
						img = '<img class="rounded me-2" height="24" src="http://supercms.vi/' + item['user.images'][0].types.tiny.url + '" alt="' + item['user.email'] + '" />';
					}

					return img;
				},
			},
			{
				name: 'status',
				// width: '15%',
				// filter: {
				// 	type: 'select',
				// 	options: [
				// 		{
				// 			value: undefined,
				// 			label: 'All'
				// 		},
				// 		{
				// 			value: 0,
				// 			label: 'New'
				// 		},
				// 		{
				// 			value: 1,
				// 			label: 'Active'
				// 		},
				// 		{
				// 			value: 9,
				// 			label: 'Deleted'
				// 		}
				// 	]
				// },
				// input: {
				// 	type: 'select',
				// 	options: [
				// 		{
				// 			value: 0,
				// 			label: 'New'
				// 		},
				// 		{
				// 			value: 1,
				// 			label: 'Active'
				// 		},
				// 		{
				// 			value: 9,
				// 			label: 'Deleted'
				// 		}
				// 	],
				// 	autosave: true,
				// }

			},
			{
				name: 'language',
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
				// filter: {
				// 	type: 'text'
				// }
			}, {
				header: {
					buttons: [
						{
							action: 'resetorders',
						},
					],
				},
				// filter: {
				// 	buttons: [
				// 		{
				// 			action: 'resetfilters',
				// 		},
				// 	],
				// },
				buttons: [
					// {
					// 	action: 'edit',
					// 	icon: null,
					// 	title: 'Edit',
					// },
					// {
					// 	action: 'delete',
					// 	title: '',
					// 	class: 'btn btn-sm btn-danger m-1',
					// 	icon: 'bi bi-trash',
					// }
				],
			}
		]
	},
	_form: {
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

