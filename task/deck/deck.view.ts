namespace $.$$ {
	export class $bss_task_deck extends $.$bss_task_deck {

		block_data() {
			return this.$.$bss_task_data()
		}

		block_list(): readonly $mol_view[] {
			return this.block_data().map( block => this.Block( block.id ) )
		}

		get_block( id: string ) {
			return this.block_data().find( block => block.id === id )
		}

		block_status( id: string ): string {
			return this.get_block( id )?.name ?? 'Имя не задано'
		}

		task_list( id: string ): readonly $mol_view[] {
			return this.get_block( id )?.tasks?.map( task => this.Task( `${id}__${task.id}` ) ) || []
		}

		get_task( id: string ) {
			const [ block_id, task_id ] = id.split( '__' )
			console.log('block_id', task_id)
			return this.get_block( block_id )?.tasks?.find( task => task.id === task_id )
		}

		task_name( id: any ): string {
			console.log(id)
			return this.get_task( id )?.name ?? 'Задача не задана'
		}
	}
}
