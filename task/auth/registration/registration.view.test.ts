namespace $ {
	const registration = new $bss_task_auth_registration

	$mol_test( {
		'Ошибки сообщений'() {
			$mol_assert_equal( registration.required_message(), 'Заполните это поле' )
			$mol_assert_equal( registration.password_message(), 'Пароли не совпадают' )
		},

		'Пустые поля'() {
			$mol_assert_equal( registration.name_bid(), registration.surname_bid(), registration.email_bid(), registration.password_bid(), registration.password_repeat_bid(), registration.required_message() )
			$mol_assert_not( registration.registration_verified() )
		},

		'Пароли не совпадают'() {
			registration.password( '123456' )
			registration.password_repeat( '1234567' )
			$mol_assert_equal( registration.password_repeat_bid(), registration.password_message() )
		},

		'Пароли совпадают'() {
			registration.password_repeat( '123456' )
			$mol_assert_equal( registration.password_bid(), '' )
		},

		'Данные верные'() {
			registration.name( 'Михаил' )
			registration.surname( 'Иванов' )
			registration.email( 'ivanovmp@bss.ru' )
			$mol_assert_ok( registration.registration_verified() )
		}
	} )
}
