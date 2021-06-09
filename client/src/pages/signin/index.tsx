import { FormControl, InputLabel, OutlinedInput, TextField } from "@material-ui/core";
import React from "react";
import { SigninService } from "../../shared/service/signin/SigninService";
import { Container } from "./styles";
import { SigninInterface } from "../../shared/service/signin/SigninInterface";

const signinService = new SigninService();

export const SigninPage: React.FC = () => {
	const [values, setValues] = React.useState<SigninInterface>({
		email: '',
		password: ''
	});
	
	const handleChange = (prop: keyof SigninInterface) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: event.target.value });
	};
	
	return (
		<Container>
			<section className="container">
				<form id="formLogin" onSubmit={event => {
					event.preventDefault();
					event.stopPropagation();
					signinService.login(values);
				}} noValidate autoComplete="off">
					<h1> Bem-Vindo!</h1>
					<small>Informe abaixo seus dados de acesso</small>
					<FormControl fullWidth variant="outlined">
						<InputLabel>E-mail</InputLabel>
						<OutlinedInput
							type="email"
							placeholder="Ex.: seunome@teste.com.br"
							required
							onChange={handleChange('email')}/>
					</FormControl>
					
					<FormControl fullWidth variant="outlined">
						<InputLabel>Senha</InputLabel>
						<OutlinedInput
							type="password"
							placeholder="Informe sua senha"
							required
							onChange={handleChange('password')}/>
					</FormControl>
					
					<div className="btn-group right">
						<button className="btn primary" type="submit">Entrar</button>
					</div>
				</form>
			</section>
		</Container>
	);
}
