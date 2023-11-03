namespace $ {

	const blocks: $bss_task_deck_model_Deck[] = []

	const block: $bss_task_deck_model_Deck = {
		id: 'block14a-076c-470e-b9ae-4b1dcaf8f02b',
		name: 'В ожидании',
		tasks: [],
	}

	const block_second: $bss_task_deck_model_Deck = {
		id: 'block2sec-c316-4316-a034-a4c4ab494075',
		name: 'В процессе',
		tasks: [],
	}

	const task: $bss_task_deck_model_Task = {
		id: 'taskf511-c316-4316-a034-a4c4ab494075',
		name: 'Создать сайт по макету',
	}

	const model = new $$.$bss_task_deck_model
	model.data_key = () => 'deck-test'
	model.data( [] )

	$mol_test( {
		'Пустые карточки'() {
			$mol_assert_like( [], blocks )
		},

		'Добавить карточку'() {
			model.generate_id = () => block.id
			model.add_block( block.name )
			blocks.push( block )
			$mol_assert_like( model.data(), blocks )
		},

		'Добавить задачу'() {
			model.generate_id = () => task.id
			model.add_task( block.id, task.name )
			blocks[ 0 ].tasks.push( task )
			$mol_assert_like( model.data(), blocks )
		},

		'Добавить вторую карточку'() {
			model.generate_id = () => block_second.id
			model.add_block( block_second.name )
			blocks.push( block_second )
			$mol_assert_like( model.data(), blocks )
		},

		'Переместить задачу'() {
			model.edit_task( block.id, task.id, block_second.id )
			blocks[ 0 ].tasks = []
			blocks[ 1 ].tasks.push( task )
			$mol_assert_like( model.data(), blocks )
		},

		'Удалить задачу'() {
			model.remove_task( block.id, task.id )
			blocks[ 1 ].tasks = []
			$mol_assert_like( model.data(), blocks )
		},

		'Удалить карточку'() {
			model.remove_block( block.id )
			blocks.splice( 0, 1 )
			$mol_assert_like( model.data(), blocks )
		}
	} )
}
