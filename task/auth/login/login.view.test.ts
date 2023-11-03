namespace $ {
	const login = new $bss_task_auth_login

	$mol_test( {
		'Сообщения об ошибка'() {
			$mol_assert_equal( login.required_message(), 'Заполните это поле' )
			$mol_assert_equal( login.login_error_messae(), 'Неверный логин или пароль' )
		},

		'Данные верные'() {
			login.email( 'ivanovmp@bss.ru' )
			login.password( '123456' )
			$mol_assert_ok( login.login_verified() )
			$mol_assert_equal( login.email_bid(), '' )
			$mol_assert_equal( login.password_bid(), '' )
		},

		'Пустые данные'() {
			login.email( '' )
			login.password( '' )
			console.log( login.password(), login.password_bid() )
			$mol_assert_equal( login.email_bid(), 'Заполните это поле' )
			$mol_assert_equal( login.password_bid(), 'Заполните это поле' )
			$mol_assert_not( login.login_verified() )
		},
	} )
}
