import { UserRepository } from '../repository/UserRepository';
import { UserEntity, User } from '../domain/User';
import  dbInstance  from "../infrastructure/SqliteUserRepository";
import {formatDate} from "../utils/common"

class UserService {
	constructor(private userRepository: UserRepository) {}

	public async getAllUsers(): Promise<User[]> {
		return await this.userRepository.getAllUsers();
	}

	public async getUserByEmailAndPassword(email: string, password: string): Promise<User | undefined> {
		return await this.userRepository.getUserByEmailAndPassword(email, password);
	}

	public async getUserByEmail(email: string): Promise<User | undefined> {
		return await this.userRepository.getUserByEmail(email);
	}

	public async registerUser(email: string, password: string): Promise<void> {
		const user = new UserEntity(email, password, new Date().toISOString());
		await this.userRepository.createUser(user);
	}

	public async updateUser(id: number, email: string, password: string): Promise<void> {
		const user = await this.userRepository.getUserByEmail(email);
		if (!user) {
			throw new Error(`User with email ${email} not found!`);
		}
		user.email = email;
		user.password = password;
		await this.userRepository.updateUser(user);
	}

	public async deleteUser(email: string): Promise<void> {
		await this.userRepository.deleteUser(email);
	}

	public async getQueryCountByEmail(email: string): Promise<number | undefined> {
		const day = formatDate(new Date())
		const count = await this.userRepository.getCountByEmail(email,Number.parseInt(day))
		if(count===undefined || count === null) {
			return 0
		}else{
			return count
		}
	}

	public async updateQueryCountByEmail(email:string,count:number): Promise<void>{
		const day = formatDate(new Date())
		return this.userRepository.updateCountByEmail(email,Number.parseInt(day),count)
	}


}


const instance = new UserService(dbInstance)
export default instance
