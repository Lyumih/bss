namespace $.$$ {
	export class $bss_task_auth extends $.$bss_task_auth {
		
		rows(): readonly any[] {

			const page = $mol_state_arg.value( 'page' )
			console.log(page)
			return [page === 'registration' ? this.Registration() : this.Login()]
		}
		
	}
}
