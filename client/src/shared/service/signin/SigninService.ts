import { TokenService } from "../token/TokenService";
import { SigninInterface } from "./SigninInterface";
import { Observable } from "rxjs";

interface SigninResponseInterface {
	auth: boolean;
	message: string;
}

export class SigninService {
	
	public login(credentials: SigninInterface) {
		return new Observable<SigninResponseInterface>(observe => {
			const tokenService = new TokenService();
			console.log(credentials);
			tokenService.setToken("testeLogin");
			observe.next({
				auth: true,
				message: 'Usuário autenticado com sucesso'
			});
			observe.complete();
		});
	}
}
