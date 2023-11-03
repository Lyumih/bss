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

		edit_task( block_id: string, task_id: string, target_block_id: string ) {
			if( block_id === target_block_id ) return

			const task = this.data().find( block => block.id === block_id )?.tasks.find( task => task.id === task_id )

			if( task ) {

				const new_deck = this.data().map( block => {
					if( block.id === block_id ) {
						return {
							...block, tasks: block.tasks.filter( task => task.id !== task_id )
						}
					} else if( block.id === target_block_id ) {
						return {
							...block, tasks: [ ...block.tasks, task ]
						}
					} else {
						return block
					}
				} )

				this.data( new_deck )
			}
		}

	}
}
