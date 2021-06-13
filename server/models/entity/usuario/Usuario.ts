export type UsuarioPerfilType = 'ADMINISTRADOR'|'FUNCIONARIO';

export class Usuario {
	id?: number;
	email: string;
	perfil: UsuarioPerfilType;
	password: string;
}
