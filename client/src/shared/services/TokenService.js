const TOKEN_STORAGE_NAME = 'desafionGloboToken';

export default class TokenService {

    isLogged() {
        return !!this.getToken();
    }

    setToken(token) {
        localStorage.setItem(TOKEN_STORAGE_NAME, token);
    }

    getToken() {
        return localStorage.getItem(TOKEN_STORAGE_NAME);
    }

    removeToken() {
        localStorage.removeItem(TOKEN_STORAGE_NAME);
    }
}
