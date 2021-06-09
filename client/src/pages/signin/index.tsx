import { Button, TextField } from "@material-ui/core";
import React from "react";
import { SigninService } from "../../shared/service/signin/SigninService";
import "./styles.css";
import { SigninInterface } from "../../shared/service/signin/SigninInterface";
import { ButtonGroup } from "../../shared/components/btn-group/ButtonGroup";
import { Validator, ValidatorErrorInterface } from "../../shared/helpers/Validator";
import { FormGroup } from "../../shared/helpers/FormGroup";

const signinService = new SigninService();

interface SigninErrorsInterface {
	email: ValidatorErrorInterface | null;
	password: ValidatorErrorInterface | null;
}

export class SigninPage extends FormGroup<SigninInterface, SigninErrorsInterface> {
	
	constructor(props: any) {
		super(
			props, {
				email: '',
				password: ''
			}, new Validator({
				email: [
					{validator: 'required', errorMessage: 'Informe seu email.'},
					{validator: 'email', errorMessage: 'E-mail inválido.'}
				],
				password: [{validator: 'required', errorMessage: 'Informe uma senha.'}]
			})
		);
	}
	
	render() {
		return (
			<section className="container">
				<form id="formLogin" onSubmit={event => {
					event.preventDefault();
					event.stopPropagation();
					signinService.login(this.getRawValue());
				}} noValidate autoComplete="off">
					<h1> Bem-Vindo!</h1>
					<small>Informe abaixo seus dados de acesso</small>
					
					<TextField id="email" type="email" label="E-mail" variant="outlined" margin="dense" fullWidth required
					           onChange={this.handle('email')}
					           error={this.errors()?.email?.error}
					           helperText={this.errors()?.email?.errorMessage ?? 'Ex.: seunome@teste.com.br'}/>
					
					<TextField id="password" type="password" label="Senha" variant="outlined" margin="dense" fullWidth required
					           onChange={this.handle('password')}
					           error={this.errors()?.password?.error}
					           helperText={this.errors()?.password?.errorMessage}/>
					
					<ButtonGroup direction="right">
						<Button size="small" disableElevation type="submit" variant="contained" color="primary"
						        disabled={this.invalid}>Entrar</Button>
					</ButtonGroup>
				</form>
			</section>
		);
	}
}
