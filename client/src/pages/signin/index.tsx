import { TextField } from "@material-ui/core";
import React from "react";
import { SigninService } from "../../shared/service/signin/SigninService";
import "./styles.css";
import { SigninInterface } from "../../shared/service/signin/SigninInterface";
import { ButtonGroup } from "../../shared/components/btn-group/ButtonGroup";
import { Validator, ValidatorErrorInterface } from "../../shared/helpers/Validator";
import { FormGroup } from "../../shared/helpers/FormGroup";
import { ButtonSubmit } from "../../shared/components/btn-submit/ButtonSubmit";
import { TokenService } from "../../shared/service/token/TokenService";

const signinService = new SigninService();

interface SigninErrorsInterface {
	email: ValidatorErrorInterface | null;
	password: ValidatorErrorInterface | null;
}

export class SigninPage extends FormGroup<SigninInterface, SigninErrorsInterface, any> {
	
	constructor(props: any) {
		super(props, new Validator({
			email: [
				{validator: 'required', errorMessage: 'Informe seu email.'},
				{validator: 'email', errorMessage: 'E-mail inválido.'}
			],
			password: [{validator: 'required', errorMessage: 'Informe uma senha.'}]
		}));
		this.btnLabel = 'Entrar';
		this.initForm({
			email: '',
			password: ''
		});
	}
	
	private signIn() {
		this.setLoader(true, false, 'Autenticando...');
		signinService.login(this.getRawValue()).subscribe({
			next: response => {
				if (response.auth) {
					this.setLoader(false, response.auth, 'Usuário autenticado com sucesso!');
					setTimeout(() => {
						const tokenService = new TokenService();
						tokenService.setToken(response.token ?? '');
					}, 2000);
				} else {
					this.setLoader(false, false, 'Tentar Novamente');
				}
			},
			error: responseError => {
				this.setLoader(false, false, "Tentar Novamente");
			}
		});
	}
	
	render() {
		
		return (
			<section className="container">
				<form id="formLogin" onSubmit={event => {
					event.preventDefault();
					event.stopPropagation();
					this.signIn();
				}} noValidate autoComplete="off">
					<h1> Bem-Vindo!</h1>
					<small>Informe abaixo seus dados de acesso</small>
					
					<TextField id="email" type="email" label="E-mail" variant="outlined" margin="dense" fullWidth required
					           onChange={this.handle('email')}
					           error={this.errors()?.email?.error}
					           autoFocus
					           helperText={this.errors()?.email?.errorMessage ?? 'Ex.: seunome@teste.com.br'}/>
					
					<TextField id="password" type="password" label="Senha" variant="outlined" margin="dense" fullWidth required
					           onChange={this.handle('password')}
					           error={this.errors()?.password?.error}
					           helperText={this.errors()?.password?.errorMessage}/>
					
					<ButtonGroup direction="right">
						<ButtonSubmit btnLabel={this.btnLabel} loading={this.loading} success={this.success}
						              disabled={this.invalid}/>
					</ButtonGroup>
				</form>
			</section>
		);
	}
}
