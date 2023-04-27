import { Request, Response, Router } from 'express';
import EmailService from "../services/EmailService";

function generateVerificationCode(): string {
	const digits = "0123456789";
	let code = "";
	for (let i = 0; i < 6; i++) {
		code += digits[Math.floor(Math.random() * 10)];
	}
	return code;
}

export class PubRoute {
	private router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	private initRoutes(): void {
		this.router.post("/sendEmailCode", async (req, res) => {
			const { email } = req.body;
			const code = generateVerificationCode();
			try {
				await EmailService.sendVerificationCode(email, code);
				res.json({
					data: "",
					message: "验证码已发送",
					status: "Success"
				});
			} catch (error) {
				res.send({ status: 'Fail', message: error.message, data: null })
			}
		});
	}

	public getRouter(): Router {
		return this.router;
	}
}
