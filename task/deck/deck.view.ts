namespace $.$$ {
	export class $bss_task_deck extends $.$bss_task_deck {

		@$mol_mem
		model() {
			const model = new this.$.$bss_task_deck_model
			return model
		}

		block_list(): readonly $mol_view[] {
			return [ ...this.model().data().map( block => this.Block( block.id ) ) || [], this.New_block() ]
		}

		get_block( id: string ) {
			return this.model().data().find( block => block.id === id )
		}

		block_status( id: string ): string {
			return this.get_block( id )?.name ?? 'Имя не задано'
		}

		add_block() {
			if( this.new_block ) this.model().add_block( this.new_block() )
		}

		remove_block( next?: any ) {
			this.model().remove_block( next )
		}

		task_list( id: string ): readonly $mol_view[] {
			return this.get_block( id )?.tasks?.map( task => this.Task( `${ id }__${ task.id }` ) ) || []
		}

		get_task( id: string ) {
			const [ block_id, task_id ] = id.split( '__' )
			return this.get_block( block_id )?.tasks?.find( task => task.id === task_id )
		}

		task_name( id: string ): string {
			return this.get_task( id )?.name ?? 'Задача не задана'
		}

		add_task( id: string, value: string ) {
			this.model().add_task( id, value )
		}

		remove_task( id: string ) {
			const [ block_id, task_id ] = id.split( '__' )
			this.model().remove_task( block_id, task_id )
		}

		edit_task( id: string, next: string ) {
			const [ block_id, task_id ] = id.split( '__' )
			this.model().edit_task( block_id, task_id, next )
		}
	}

	export class $bss_task_deck_block extends $.$bss_task_deck_block {

		add_new() {
			if( this.name() ) {
				this.add( this.name() )
				this.name( '' )
			}
		}
	}

	export class $bss_task_deck_task extends $.$bss_task_deck_task {

		edit_task() {
			if( this.edit_task_name() ) {
				this.edit( this.edit_task_name() )
				this.edit_task_name( '' )
				this.edit_checked( false )
			}
		}

		content(): readonly any[] {
			return [ this.edit_checked() ? this.Task_edit() : this.Task() ]
		}
	}

}
