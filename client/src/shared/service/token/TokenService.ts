const TOKEN_STORAGE_NAME = 'desafionGloboToken';

export class TokenService {
	
	isLogged() {
		return !!this.getToken();
	}
	
	setToken(token: string) {
		localStorage.setItem(TOKEN_STORAGE_NAME, token);
	}
	
	getToken() {
		return localStorage.getItem(TOKEN_STORAGE_NAME);
	}
	
	removeToken() {
		localStorage.removeItem(TOKEN_STORAGE_NAME);
	}
}
