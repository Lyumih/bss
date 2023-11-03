namespace $.$$ {
	export class $bss_task_auth_login extends $.$bss_task_auth_login {

		email_bid(): string {
			return this.email().endsWith( '@bss.ru' ) ? '' : this.required_message()
		}

		password_bid(): string {
			return this.password().length >= 6 ? '' : this.required_message()
		}

		login_verified( next?: any ): boolean {
			return this.email_bid() === '' && this.password_bid() === ''
		}

		login( next?: any ) {
			const users_local = this.$.$mol_state_local.value<{ email: string, password: string }[]>( 'users' ) || []
			const users = this.login_fetch().concat( users_local )
			if( users && users.find( user => user.email === this.email() && user.password === this.$.$mol_base64_encode( this.password() ) ) ) {
				this.$.$mol_state_local.value( 'user', {
					email: this.email(),
				} )
			} else {
				this.$.$mol_fail( 'Неверный логин или пароль' )
			}
		}

		login_fetch() {
			const url = 'https://raw.githubusercontent.com/Lyumih/bss/master/back/api/v1/user/user.json'
			return this.$.$mol_fetch.json( url ) as { email: string, password: string }[]
		}
	}
}
