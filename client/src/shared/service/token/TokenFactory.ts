const TOKEN_STORAGE_NAME = 'desafioGloboToken';

export class TokenFactory {
	
	private static token: string;
	
	public static init() {
		if (!!localStorage.getItem(TOKEN_STORAGE_NAME)) {
			TokenFactory.setToken(localStorage.getItem(TOKEN_STORAGE_NAME) ?? '');
		}
	}
	
	public static setToken(token: string) {
		localStorage.setItem(TOKEN_STORAGE_NAME, token);
		this.token = token;
	}
	
	public static getToken() {
		return this.token;
	}
	
	public static removeToken() {
		localStorage.removeItem(TOKEN_STORAGE_NAME);
		this.token = '';
	}
	
	public static hasToken() {
		return !!this.token && !!localStorage.getItem(TOKEN_STORAGE_NAME);
	}
	
	public static logout() {
		this.removeToken();
	}
}
