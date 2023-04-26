import { Request, Response, Router } from 'express';
import EmailService from "../utils/EmailService";

function generateVerificationCode(): string {
	const digits = "0123456789";
	let code = "";
	for (let i = 0; i < 6; i++) {
		code += digits[Math.floor(Math.random() * 10)];
	}
	return code;
}

interface VerificationCode {
	code: string;
	expiresAt: Date;
}

const verificationCodes = new Map<string, VerificationCode>();


export class CommonManager {
	private router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	private initRoutes(): void {
		this.router.post("/sendEmailCode", async (req, res) => {
			const { email } = req.body;
			const code = generateVerificationCode();
			const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 设置验证码过期时间为当前时间+10分钟

			try {
				await EmailService.sendVerificationCode(email, code);
				verificationCodes.set(email, {code, expiresAt}); // 存储验证码和过期时间信息
				console.log(verificationCodes)
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
