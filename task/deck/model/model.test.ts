namespace $ {

	let block: $bss_task_deck_model_Deck = {
		id: 'block54a-076c-470e-b9ae-4b1dcaf8f02b',
		name: 'В ожидании',
		tasks: [],
	}

	const task: $bss_task_deck_model_Task = {
		id: 'taskf511-c316-4316-a034-a4c4ab494075',
		name: 'Создать сайт по макету',
	}

	const model = new $$.$bss_task_deck_model
	model.data( [] )

	$mol_test( {
		'empty'() {
			$mol_assert_like( [], [] )
		},

		'add deck'() {
			model.generate_id = () => block.id
			model.add_block( block.name )
			$mol_assert_like( model.data(), [ block ] )
		},

		'add task'() {
			model.generate_id = () => task.id
			model.add_task( block.id, task.name )
			block.tasks.push( task )
			$mol_assert_like( model.data(), [ block ] )
		},

		'remove task'() {
			model.remove_task( block.id, task.id )
			block.tasks = []
			$mol_assert_like( model.data(), [ block ] )
		},

		'remove deck'() {
			model.remove_block( block.id )
			$mol_assert_like( model.data(), [] )
		}
	} )
}
