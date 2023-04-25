import * as dotenv from 'dotenv'
import nodemailer from 'nodemailer';

dotenv.config()

interface MailOptions {
	from: string;
	to: string;
	subject: string;
	text?: string;
	html?: string;
}

class EmailService {
	private transporter: nodemailer.Transporter;

	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.EMAIL_SERVER,
			port: 465,
			secure: true, // 使用TLS加密
			auth: {
				user: process.env.EMAIL_USER, // 请替换成您自己的电子邮件地址
				pass: process.env.EMAIL_PASSWORD, // 请替换成您自己的电子邮件密码或应用程序密码（如果使用的是Google帐户）
			},
		});
	}

	async sendVerificationCode(to: string, code: string): Promise<void> {
		await this.transporter.sendMail({
			from: `SENDER_NAME <${process.env.EMAIL_SENDER}>`,
			to: to,
			subject: "机必替验证码",
			text: `您的验证码为：${code}`,
		});
	}



}

export default new EmailService();

