namespace $.$$ {
	export class $bss_task_deck extends $.$bss_task_deck {

		@ $mol_mem
		model() {
			const model = new this.$.$bss_task_deck_model
			return model
		}

		block_list(): readonly $mol_view[] {
			return [...this.model().data().map( block => this.Block( block.id ) ) || [], this.Add_block()]
		}

		get_block( id: string ) {
			return this.model().data().find( block => block.id === id )
		}

		block_status( id: string ): string {
			return this.get_block( id )?.name ?? 'Имя не задано'
		}

		task_list( id: string ): readonly $mol_view[] {
			return this.get_block( id )?.tasks?.map( task => this.Task( `${id}__${task.id}` ) ) || []
		}

		get_task( id: string ) {
			const [ block_id, task_id ] = id.split( '__' )
			return this.get_block( block_id )?.tasks?.find( task => task.id === task_id )
		}

		task_name( id: any ): string {
			return this.get_task( id )?.name ?? 'Задача не задана'
		}

		add_task(id:string, value: string) {
			console.log(id, value)
			this.model().add_task(id, value)
		}

		add_block(value: string) {
			this.model().add_block(value)
		}
	}

	export class $bss_task_deck_block extends $.$bss_task_deck_block {

		add_new() {
			if (this.name()) {
				this.add(this.name())
				this.name('')
			}
		}
	}
}
