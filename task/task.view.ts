namespace $.$$ {
	export class $bss_task extends $.$bss_task {
		body(): readonly any[] {
			const user = this.$.$mol_state_local.value( 'user' )
			return [ user ? this.Deck() : this.Auth() ]
		}

		logout( next?: any ) {
			this.$.$mol_state_local.value( 'user', null )
		}
		tools(): readonly any[] {
			const user = this.$.$mol_state_local.value( 'user' )
			return user ? [ this.Email(), this.Logout() ] : []
		}

		email(): string {
			return this.$.$mol_state_local.value<{ email: string }>( 'user' )?.email ?? ''
		}
	}
}
