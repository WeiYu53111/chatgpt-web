import { Request, Response, Router } from 'express';
import { Database } from '../db/db';
export class User {
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
		this.router.post('/query/:id', (req: Request, res: Response) => {
			this.getUserById(req, res);
		});
		this.router.post('/new', (req: Request, res: Response) => {
			console.log(req)
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

	private async getUserById(req: Request, res: Response): Promise<void> {
		try {
			const row: any = await this.db.getUserById(req.params.id);
			if (row) {
				res.json(row);
			} else {
				res.status(404).send('User not found');
			}
		} catch (err) {
			console.error(err);
			res.status(500).send('Internal server error');
		}
	}

	private async createUser(req: Request, res: Response): Promise<void> {
		const { name, email, password } = req.body;
		try {
			const result: any = await this.db.createUser(name, email, password);
			res.json({ id: result.lastID });
		} catch (err) {
			console.error(err);
			res.status(500).send('Internal server error');
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
