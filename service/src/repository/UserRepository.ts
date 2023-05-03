import {User} from "../domain/User";

export interface UserRepository {
	getAllUsers(): Promise<User[]>;
	getUserByEmailAndPassword(email: string, password: string): Promise<User | undefined>;
	getUserByEmail(email: string): Promise<User | undefined>;
	createUser(user: User): Promise<void>;
	updateUser(user: User): Promise<void>;
	deleteUser(email: string): Promise<void>;
	getCountByEmail(email:string,day:number): Promise<number>;
	updateCountByEmail(email:string,day:number,count:number): Promise<void>;
}

export interface UserActionRepository{
	getUserStatu
}
