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

interface VerificationCode {
	code: string;
	expiresAt: Date;
}


class EmailService {
	private transporter: nodemailer.Transporter;
	private status = new Map<string, VerificationCode>();

	constructor() {

		this.transporter = nodemailer.createTransport({
			host: process.env.EMAIL_SERVER,
			port: 25,
			secure: false, // 使用TLS加密
			auth: {
				user: process.env.EMAIL_USER, // 请替换成您自己的电子邮件地址
				pass: process.env.EMAIL_PASSWORD, // 请替换成您自己的电子邮件密码或应用程序密码（如果使用的是Google帐户）
			},
		});
	}

	/**
	 * 发送验证码
	 * @param to    目标邮箱地址
	 * @param code  验证码
	 */
	async sendVerificationCode(to: string, code: string): Promise<void> {
		this.transporter.sendMail({
			from: `<${process.env.EMAIL_USER}>`,
			to: to,
			subject: "机必替验证码",
			text: `您的验证码为：${code},有效期为10分钟.(*^_^*)`,
		}).then(
			() => {
				const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 设置验证码过期时间为当前时间+10分钟
				this.status.set(to, {code, expiresAt}); // 存储验证码和过期时间信息
				console.log(this.status)
			});
	}


	/**
	 * 验证码校验
	 * @param to  	目标邮箱地址
	 * @param code  验证码
	 */
	public checkEmailCode(to: string, code: string): boolean {
		const codeInfo = this.status.get(to)
		if (!codeInfo) {
			return false
		}

		const nowDate = new Date(Date.now());
		if (nowDate <= codeInfo.expiresAt) {
			//清除验证码
			this.status.delete(to)
			return true
		}
		return false
	}

}


// 创建单例实例
const instance = new EmailService();

// 导出单例实例
export default instance;

