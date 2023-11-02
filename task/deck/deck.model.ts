namespace $ {
	export type $bss_task_deck_model_Deck = {
		id: string
		name: string
		tasks:
		{
			id: string
			name: string
		}[]
	}
}

namespace $.$$ {

	export class $bss_task_deck_model extends $.$mol_object {

		@$mol_mem
		data( next?: $bss_task_deck_model_Deck[] ): $bss_task_deck_model_Deck[] {
			console.log( next )
			return next ? next : [
				{
					id: '1',
					name: 'В ожидании',
					tasks: [
						{
							id: '1_1',
							name: 'Создать сайт по макету',
						},
						{
							id: '1_2',
							name: 'Разработать дизайн геля для бритья'
						}
					]
				},
				{
					id: '2',
					name: 'В процессе',
					tasks: [
						{
							id: '2_1',
							name: 'Разместить сайт на сервере',
						}
					]
				},
				{
					id: '3',
					name: 'Готовые',
					tasks: []
				}
			]
		}

		add_task( id: any, value: string ) {
			const new_deck = this.data().map( block => block.id === id ? {
				...block, tasks: [ ...block.tasks, {
					id: crypto.randomUUID(),
					name: value
				} ]
			} : block )
			this.data( new_deck )
		}

		add_block(name: string) {
			this.data([ ...this.data(), {
				id: crypto.randomUUID(),
				name,
				tasks: []
			}])
		}
	}
}
