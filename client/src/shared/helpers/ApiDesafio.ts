import axios from "axios";
import { TokenFactory } from "../service/token/TokenFactory";

export class ApiDesafio {
	
	public static create() {
		TokenFactory.init();
		return axios.create({
			baseURL: 'http://localhost:9000',
			headers: TokenFactory.hasToken() ? {
				Authorization: `Bearer ${TokenFactory.getToken()}`
			} : null
		});
	}
}
