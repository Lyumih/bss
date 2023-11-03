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
			if( next ) return this.data_update( next )
			const data_local = this.$.$mol_state_local.value<$bss_task_deck_model_Deck[]>( this.data_key() )
			if( data_local ) return data_local
			const data_fetched = this.data_fetch()
			return this.data_update( data_fetched || [] )
		}

		data_key(): string {
			return 'deck'
		}

		data_update( next: $bss_task_deck_model_Deck[] ) {
			return this.$.$mol_state_local.value( this.data_key(), next ) as $bss_task_deck_model_Deck[]
		}

		@$mol_mem
		data_fetch() {
			const url = 'https://raw.githubusercontent.com/Lyumih/bss/master/back/api/v1/task/task.json'
			return this.$.$mol_fetch.json( url ) as $bss_task_deck_model_Deck[] || []
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
			const new_deck = this.data().map( block => block.id === block_id ? {
				...block, tasks: block.tasks.map( task => task.id === task_id ? {
					...task, name: target_block_id
				} : task )
			} : block )
			this.data( new_deck )
		}

		move_task( block_id: string, task_id: string, target_block_id: string ) {
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
