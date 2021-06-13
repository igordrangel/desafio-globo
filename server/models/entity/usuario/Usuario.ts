export type UsuarioPerfilType = 'ADMINITRADOR'|'FUNCTIONARIO';

export class Usuario {
	id?: number;
	email: string;
	perfil: UsuarioPerfilType;
	password: string;
}
