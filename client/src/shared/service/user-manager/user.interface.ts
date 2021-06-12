export interface UserInterface {
	id?: number;
	email: string;
	perfil: 'ADMINISTRADOR'|'FUNCIONARIO';
	password: string;
}
