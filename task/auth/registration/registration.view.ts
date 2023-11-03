namespace $.$$ {
	export class $bss_task_auth_registration extends $.$bss_task_auth_registration {

		name_bid(): string {
			return this.name().length >= 2 ? '' : this.required_message()
		}
		surname_bid(): string {
			return this.surname().length >= 2 ? '' : this.required_message()
		}

		email_bid(): string {
			return this.email().endsWith( '@bss.ru' ) ? '' : this.required_message()
		}
		password_bid(): string {
			return this.password().length >= 6 ? '' : this.required_message()
		}
		password_repeat_bid(): string {
			if( this.password_repeat().length < 6 ) return this.required_message()
			else if( this.password() !== this.password_repeat() ) return this.password_message()
			return ''
		}
		registration_verified( next?: any ): boolean {
			return this.name_bid() === '' && this.surname_bid() === '' && this.email_bid() === '' && this.password_bid() === '' && this.password_repeat_bid() === '' && this.position_bid() === ''
		}

		registration() {
			const new_user = {
				name: this.name(),
				surname: this.surname(),
				email: this.email(),
				password: $mol_base64_encode( this.password() ),
				position: this.position(),
			}
			const users = this.$.$mol_state_local.value<typeof new_user[]>( 'users' )
			if( users?.find( user => user.email === new_user.email ) ) return
			this.$.$mol_state_local.value( 'users', users ? [ ...users, new_user ] : [ new_user ] )
			this.$.$mol_state_local.value( 'user', new_user )
		}

	}
}
