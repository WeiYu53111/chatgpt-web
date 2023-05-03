import { Router } from 'express';
import { UserController } from '../controllers/UserController';


//TODO 待替换掉这个类,应该直接
export class UserRoute {
	private router: Router;
	private userController: UserController;

	constructor() {
		this.router = Router();
		this.userController = new UserController();
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
