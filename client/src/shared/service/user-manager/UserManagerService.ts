import { UserInterface } from "./user.interface";
import { ApiDesafio } from "../../helpers/ApiDesafio";

export class UserManagerService {
	
	public getAll() {
		return ApiDesafio.create().get<UserInterface[]>('user');
	}
	
	public getById(id: number) {
		return ApiDesafio.create().get<UserInterface>(`user/${id}`);
	}
	
	public save(user: UserInterface, id?: number) {
		if (id) {
			return ApiDesafio.create().put(`user/${id}`, user);
		}
		
		return ApiDesafio.create().post('user', user);
	}
	
	public delete(id: number) {
		return ApiDesafio.create().delete(`user/${id}`);
	}
}
