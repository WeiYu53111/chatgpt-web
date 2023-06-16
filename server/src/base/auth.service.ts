import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as jsonwebtoken from 'jsonwebtoken';
import { AppConfigService } from '../config/app-config.service';
import NodeRSA from 'node-rsa';
const secret = 'Qwe123!@#';
const encoding = 'utf-8';
export interface Payload {
  email: string;
}

@Injectable()
export class AuthService {
  key: any = null;

  constructor(private readonly appConfigService: AppConfigService) {
    const pri_key = this.appConfigService.getPrivateKey();
    this.key = new NodeRSA(pri_key, 'pkcs1-private-pem', {
      encryptionScheme: 'pkcs1',
    });
  }

  async generateToken(payload: Payload): Promise<string> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign(
        payload,
        secret,
        { expiresIn: '12h' },
        (error, token) => {
          if (error) {
            reject(error);
          } else {
            resolve(token);
          }
        },
      );
    });
  }

  async verifyToken(token: string): Promise<Payload> {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, secret, (error, decoded) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded as Payload);
        }
      });
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  rsaDecode(content: string): string {
    //const decoder = new TextDecoder(encoding); // 创建解码器
    // 解密得到字节数组
    //const plaintext = decoder.decode(decryptedData); // 将字节数组按指定编码转换为字符串
    return this.key.decrypt(content, 'utf8');
  }
}
