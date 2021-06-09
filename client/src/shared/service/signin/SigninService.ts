import { TokenService } from "../token/TokenService";
import { SigninInterface } from "./SigninInterface";

export class SigninService {
	
	public login(credentials: SigninInterface) {
		const tokenService = new TokenService();
		console.log(credentials);
		tokenService.setToken("testeLogin");
	}
}
