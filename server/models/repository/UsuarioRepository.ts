import * as jwt from "jsonwebtoken";

import { AuthenticationInterface } from "../../interfaces/authentication.interface";
import { TokenInterface } from "../../interfaces/token.interface";
import { RepositoryBase } from "./RepositoryBase";
import { Usuario } from "../entity/usuario/Usuario";
import { TOKEN_SECRET } from "../../middleware/authorization";
import { NotFoundError } from "../errors/not-found.error";
import { AlreadyExistError } from "../errors/already-exist.error";

export class UsuarioRepository extends RepositoryBase<Usuario> {
	
	constructor() {
		super('usuarios');
	}
	
	public async save(user: Usuario, id?: number) {
		return super.save(
			user,
			id,
			async () => new Promise<boolean>(async (resolve, reject) => {
				const userByEmail = await this.getOne({email: user.email});
				let exist = !!userByEmail;
				if (id) {
					exist = exist ? (userByEmail?.id !== id) : exist;
				}
				
				if (id) {
					await this.getById(id).then(() => resolve(true)).catch(e => reject(e));
				} else {
					if (exist) {
						reject(new AlreadyExistError("Atenção, usuário já existente!"));
					} else {
						resolve(true);
					}
				}
			})
		);
	}
	
	public autenticar(auth: AuthenticationInterface): Promise<TokenInterface> {
		try {
			return this.getOne({
				email: auth.email,
				password: auth.password
			}).then(usuario => {
				if (usuario) {
					const token = jwt.sign({
						id: usuario.id,
						email: usuario.email,
						perfil: usuario.perfil
					}, TOKEN_SECRET, {
						expiresIn: 86400
					});
					
					return {auth: true, token: token} as TokenInterface;
				}
			}).catch(e => {
				throw e;
			});
		} catch (e) {
			throw e;
		}
	}
}
