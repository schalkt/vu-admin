import VuAdmin from "./src/components/VuAdmin.vue";

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
			entity: 'user',
			params: {
				limit: 0,
				select: ['id', 'firstName', 'lastName'],
				entity: (params) => {
					// console.log(params);
					return params.column.relation.entity;
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
	columns: columns,
};

let form = {
	groups: [
		{
			fields: [

				{
					type: 'select',
					name: 'userId',
					label: 'User',
					relation: {
						entity: 'user',
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

export default {

	pkey: 'id',
	debug: true,
	api: api,
	language: 'en',
	table: table,
	form: form,
	relations: {
		user: {
			entity: 'user',
			local: 'userId',
			foreign: 'id',
			type: '1-8',
		}
	},

};

