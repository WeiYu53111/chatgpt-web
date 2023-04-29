import { Router } from 'express';
import { Database } from '../db/db';
import { UserController } from '../controllers/UserController';

export class UserRoute {
	private router: Router;
	private db: Database;
	private userController: UserController;

	constructor() {
		this.router = Router();
		this.db = new Database('user.db');
		this.userController = new UserController(this.db);
		this.initRoutes();
	}

	private initRoutes(): void {
		this.router.post('/all', this.userController.getAllUsers.bind(this.userController));
		this.router.post('/login', this.userController.getUserByName.bind(this.userController));
		this.router.post('/new', this.userController.createUser.bind(this.userController));
		this.router.post('/update/:id', this.userController.updateUser.bind(this.userController));
		this.router.post('/update/:id', this.userController.updateUser.bind(this.userController));
	}

	public getRouter(): Router {
		return this.router;
	}
}
