import { SigninInterface } from "./SigninInterface";
import { Observable } from "rxjs";

interface SigninResponseInterface {
	auth: boolean;
	message: string;
	token?: string;
}

export class SigninService {
	
	public login(credentials: SigninInterface) {
		return new Observable<SigninResponseInterface>(observe => {
			console.log(credentials);
			setTimeout(() => {
				observe.next({
					auth: true,
					message: 'Usuário autenticado com sucesso',
					token: 'testeLogin'
				});
				observe.complete();
			}, 2000);
		});
	}
}
