namespace $ {
	export type $bss_task_deck_model_Deck = {
		id: string
		name: string
		tasks: $bss_task_deck_model_Task[]
	}

	export type $bss_task_deck_model_Task = {
		id: string
		name: string
	}
}

namespace $.$$ {

	export class $bss_task_deck_model extends $.$mol_object {

		@$mol_mem
		data( next?: $bss_task_deck_model_Deck[] ): $bss_task_deck_model_Deck[] {
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

		generate_id(): string {
			return crypto.randomUUID()
		}

		add_block( name: string ) {
			this.data( [ ...this.data(), {
				id: this.generate_id(),
				name,
				tasks: []
			} ] )
		}
		remove_block( block_id: string ) {
			this.data( this.data().filter( block => block.id !== block_id ) )
		}


		add_task( id: string, value: string ) {
			const new_deck = this.data().map( block => block.id === id ? {
				...block, tasks: [ ...block.tasks, {
					id: this.generate_id(),
					name: value
				} ]
			} : block )
			this.data( new_deck )
		}

		remove_task( block_id: string, task_id: string ) {
			const new_deck = this.data().map( block => block.id === block_id ? {
				...block, tasks: block.tasks.filter( task => task.id !== task_id )
			} : block )
			this.data( new_deck )
		}

		edit_task( block_id: string, task_id: string, value: string ) {
			const new_deck = this.data().map( block => block.id === block_id ? {
				...block, tasks: block.tasks.map( task => task.id === task_id ? {
					...task, name: value
				} : task )
			} : block )
			this.data( new_deck )
		}

	}
}
