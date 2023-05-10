import { Request, Response } from 'express';
import Database from '../db/db';
import {getSysdate} from '../utils/common';
import EmailService from "../services/EmailService";
import {AuthService} from "../services/AuthService"
import userSevice from "../services/UserService"
import {User} from "../domain/User";

export class UserController {


	constructor() {

	}

	public async getAllUsers(req: Request, res: Response): Promise<void> {
		try {
			const rows: any[] = await Database.getAllUsers();
			res.json(rows);
		} catch (err) {
			console.error(err);
			res.status(500).send('Internal server error');
		}
	}

	public async getUserByName(req: Request, res: Response): Promise<void> {
		try {
			const data = req.body as User;
			const row: User =  await userSevice.getUserByEmailAndPassword(data.email,data.password);
			let toekn = await AuthService.generateToken({
				email: data.email
			})
			const resData = {
				data: { token : toekn},
				message: "登录成功",
				status: "Success"
			}
			if (toekn) {
				res.json(resData);
			} else {
				res.send({ status: 'Fail', message: "用户不存在", data: null })
			}
		} catch (err) {
			res.send({ status: 'Fail', message: err.message, data: null })
		}
	}

	public async createUser(req: Request, res: Response): Promise<void> {
		const { email, password, repw, emailCode } = req.body;
		if (!EmailService.checkEmailCode(email, emailCode)) {
			res.json({
				data: "",
				message: "验证码错误或超时",
				status: "Fail"
			});
			return
		}

		try {
			const user = {
				email: email,
				password: password,
				last_login_time: getSysdate(),
				vaild: 'true'
			}
			const result: any = await Database.createUser(user);
			res.json({
				data: "",
				message: "注册成功",
				status: "Success"
			});
		} catch (err) {
			console.error(err);
			res.send({ status: 'Fail', message: err.message, data: null })
		}
	}

	public async updateUser(req: Request, res: Response): Promise<void> {
		const { name, email, password } = req.body;
		try {
			await Database.updateUser(req.params.id, name, email, password);
			res.sendStatus(204);
		} catch (err) {
			console.error(err);
			res.status(500).send('Internal server error');
		}
	}
}
