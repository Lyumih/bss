namespace $.$$ {
	export class $bss_task_auth_login extends $.$bss_task_auth_login {
		
		login( next?: any ) {
			this.$.$mol_state_local.value('user', {
				email: this.email(),
			})
		}
		
	}
}
