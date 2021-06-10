import jwt from 'jwt-decode';

import { BehaviorSubject } from "rxjs";
import { TokenFactory } from "./TokenFactory";

export class TokenService {
	private token$ = new BehaviorSubject<string>('');
	private intervalToken: any;
	
	constructor() {
		this.verifySession();
	}
	
	public setToken(token: string) {
		if (TokenFactory.hasToken()) { this.token$.next(token); }
		TokenFactory.setToken(token);
	}
	
	public getToken(): BehaviorSubject<string> {
		return this.token$;
	}
	
	public getDecodedToken<T>(): T|null {
		return (TokenFactory.hasToken() ? jwt(TokenFactory.getToken()) : null);
	}
	
	public removeToken() {
		TokenFactory.removeToken();
	}
	
	private verifySession() {
		TokenFactory.init();
		this.token$.next(TokenFactory.getToken());
		this.intervalToken = setInterval(() => {
			if (!TokenFactory.hasToken() && this.token$.getValue()) {
				this.token$.next('');
			} else if (TokenFactory.hasToken() && !this.token$.getValue()) {
				this.token$.next(TokenFactory.getToken());
			}
		}, 300);
	}
}
