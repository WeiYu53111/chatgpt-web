import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

const secret = 'Qwe123!@#';

interface Payload {
	email: string;
}


export class AuthService {
	public static generateToken(payload: Payload): Promise<string> {
		return new Promise((resolve, reject) => {
			jwt.sign(payload, secret, { expiresIn: '12h' }, (error, token) => {
				if (error) {
					reject(error);
				} else {
					resolve(token);
				}
			});
		});
	}

	public static verifyToken(token: string): Promise<Payload> {
		return new Promise((resolve, reject) => {
			jwt.verify(token, secret, (error, decoded) => {
				if (error) {
					reject(error);
				} else {
					resolve(decoded);
				}
			});
		});
	}

	public static async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	}

	public static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
		return await bcrypt.compare(password, hashedPassword);
	}
}

