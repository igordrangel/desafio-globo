import { SigninInterface } from "./SigninInterface";
import { Observable } from "rxjs";
import { AxiosError } from "axios";
import { ApiDesafio } from "../../helpers/ApiDesafio";

interface SigninResponseInterface {
	auth: boolean;
	message: string;
	token?: string;
}

export class SigninService {
	
	public login(credentials: SigninInterface) {
		return new Observable<SigninResponseInterface>(observe => {
			ApiDesafio.create()
			          .post('auth', credentials)
			          .then(response => observe.next(response.data))
			          .catch((responseError: AxiosError) => observe.error(responseError.response?.data));
		});
	}
}
