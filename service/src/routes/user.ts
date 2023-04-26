import { Request, Response, Router } from 'express';
import { Database,User } from '../db/db';
import {getSysdate} from '../utils/common'
import EmailService from "../utils/EmailService";

export class UserManager {
	private router: Router;
	private db: Database;

	constructor() {
		this.router = Router();
		this.db = new Database('user.db');
		this.initRoutes();
	}

	private initRoutes(): void {
		this.router.post('/all', (req: Request, res: Response) => {
			this.getAllUsers(req, res);
		});
		this.router.post('/login', (req: Request, res: Response) => {
			this.getUserByName(req, res);
		});
		this.router.post('/new', (req: Request, res: Response) => {
			//console.log(req)
			this.createUser(req, res);
		});
		this.router.post('/update/:id', (req: Request, res: Response) => {
			this.updateUser(req, res);
		});
	}

	private async getAllUsers(req: Request, res: Response): Promise<void> {
		try {
			const rows: any[] = await this.db.getAllUsers();
			res.json(rows);
		} catch (err) {
			console.error(err);
			res.status(500).send('Internal server error');
		}
	}

	private async getUserByName(req: Request, res: Response): Promise<void> {
		try {
			const data = req.body as User;
			const row: User = await this.db.getUserByName(data.email);
			if (row) {
				res.json({
					data:row,
					message: "登录成功",
					status: "Success"
				});
			} else {
				res.send({ status: 'Fail', message: "用户不存在", data: null })
			}
		} catch (err) {
			res.send({ status: 'Fail', message: err.message, data: null })
		}
	}

	private async createUser(req: Request, res: Response): Promise<void> {
		const { email, password,repw,emailCode } = req.body;
		if(EmailService.checkEmailCode(email,emailCode)==false){
			res.json({
				data:"",
				message: "验证码错误或超时",
				status: "Fail"
			});
			return
		}

		try {
			const user = {
				email:email,
				password:password,
				last_login_time : getSysdate(),
				vaild: 'true'
			}
			const result: any = await this.db.createUser(user);
			res.json({
				data:"",
				message: "注册成功",
				status: "Success"
			});
		} catch (err) {
			console.error(err);
			res.send({ status: 'Fail', message: err.message, data: null })
		}
	}

	private async updateUser(req: Request, res: Response): Promise<void> {
		const { name, email, password } = req.body;
		try {
			await this.db.updateUser(req.params.id, name, email, password);
			res.sendStatus(204);
		} catch (err) {
			console.error(err);
			res.status(500).send('Internal server error');
		}
	}

	public getRouter(): Router {
		return this.router;
	}
}
