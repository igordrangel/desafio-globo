import { FormGroup } from "../../../shared/helpers/FormGroup";
import { UserInterface } from "../../../shared/service/user-manager/user.interface";
import { Validator } from "../../../shared/helpers/Validator";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	InputLabel, MenuItem,
	Select,
	TextField
} from "@material-ui/core";
import React from "react";
import { ButtonSubmit } from "../../../shared/components/btn-submit/ButtonSubmit";

interface DialogUserPropsInterface {
	userEdit: UserInterface | null;
	open: boolean;
	handle: (open: boolean) => void;
	sendData: (user: UserInterface) => Promise<void>;
}

export class DialogUser extends FormGroup<UserInterface, any, DialogUserPropsInterface> {
	private opened = false;
	
	constructor(props: DialogUserPropsInterface) {
		super(props, new Validator({
			email: [
				{validator: 'required', errorMessage: 'Informe seu email.'},
				{validator: 'email', errorMessage: 'E-mail inválido.'}
			],
			perfil: [{validator: 'required', errorMessage: 'Informe um perfil.'}],
			password: [{validator: 'required', errorMessage: 'Informe uma senha.'}]
		}));
		this.btnLabel = "Salvar";
	}
	
	render() {
		if (this.props.open && this.props.open !== this.opened) {
			this.initForm(this.props.userEdit ?? {
				email: '',
				perfil: 'FUNCIONARIO',
				password: ''
			});
			this.opened = true;
		} else if (!this.props.open) {
			this.opened = false;
		}
		
		return (
			<Dialog open={this.props.open} onClose={() => this.props.handle(false)}
			        aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">{this.props.userEdit ? 'Editar' : 'Novo'} Usuário</DialogTitle>
				<form onSubmit={(event) => {
					event.preventDefault();
					event.stopPropagation();
					this.props
					    .sendData(this.getRawValue())
					    .then(() => {
						    this.props.handle(false);
						    this.reset("Salvar");
					    })
					    .catch(() => this.setLoader(false, false, 'Tentar Novamente'));
				}}>
					<DialogContent>
						<TextField id="email" type="email" label="E-mail" variant="outlined" margin="dense" fullWidth required
						           value={this.values.email}
						           onChange={this.handle('email')}
						           error={this.errors()?.email?.error}
						           autoFocus
						           helperText={this.errors()?.email?.errorMessage ?? 'Ex.: seunome@teste.com.br'}/>
						
						<FormControl className="form-control" fullWidth variant="outlined" margin="dense" error={this.errors()?.perfil?.error}>
							<InputLabel>Perfil</InputLabel>
							<Select label="Perfil" required
							        value={this.values.perfil}
							        onChange={this.handle('perfil')}>
								<MenuItem value="ADMINISTRADOR">ADMINISTRADOR</MenuItem>
								<MenuItem value="FUNCIONARIO">FUNCIONARIO</MenuItem>
							</Select>
							<FormHelperText>{this.errors()?.password?.errorMessage}</FormHelperText>
						</FormControl>
						
						<TextField id="password" type="password" label="Senha" variant="outlined" margin="dense" fullWidth required
						           value={this.values.password}
						           onChange={this.handle('password')}
						           error={this.errors()?.password?.error}
						           helperText={this.errors()?.password?.errorMessage}/>
					</DialogContent>
					<DialogActions>
						<Button onClick={() => this.props.handle(false)} color="primary">
							Cancelar
						</Button>
						<ButtonSubmit btnLabel={this.btnLabel} loading={this.loading} success={this.success} disabled={this.invalid}/>
					</DialogActions>
				</form>
			</Dialog>
		);
	}
}
