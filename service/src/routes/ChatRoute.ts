import {Router} from 'express';
import {auth} from '../middleware/auth'
import {limiter} from '../middleware/limiter'
import {chatConfig, chatReplyProcess, currentModel} from '../chatgpt';
import {isNotEmptyString} from '../utils/is';
import type {RequestProps} from '../types'
import type {ChatMessage} from "chatgpt";
import userService from "../services/UserService"

//TODO 待将chatgpt交互逻辑分离到service中
export class ChatRoute {
	private router: Router;

	constructor() {
		this.router = Router();
		this.initRoutes();
	}

	public getRouter(): Router {
		return this.router;
	}

	private initRoutes(): void {
		this.router.post('/chat-process', [auth, limiter], async (req, res) => {
			res.setHeader('Content-type', 'application/octet-stream')


			try {
				const email = req.userInfo.email
				//查询用户等级
				const user =  await userService.getUserByEmail(email)
				//查询用户今日查询次数
				let count =  await userService.getQueryCountByEmail(email)
				console.log(count)
				if(user.level === 1 && count >= 10){
					await Promise.reject({
						message: "今日可提问次数已达上限,请明日再来思密达" ?? 'Failed',
						data: null,
						status: 'Failed',
					})
				}

				const {prompt, options = {}, systemMessage, temperature, top_p} = req.body as RequestProps
				let firstChunk = true
				await chatReplyProcess({
					message: prompt,
					lastContext: options,
					process: (chat: ChatMessage) => {
						res.write(firstChunk ? JSON.stringify(chat) : `\n${JSON.stringify(chat)}`)
						firstChunk = false
					},
					systemMessage,
					temperature,
					top_p,
				})
				await userService.updateQueryCountByEmail(email,count+1);
			} catch (error) {
				res.write(JSON.stringify(error))
			} finally {
				res.end()
			}
		});

		this.router.post('/config', auth, async (req, res) => {
			try {
				const response = await chatConfig()
				res.send(response)
			} catch (error) {
				res.send(error)
			}
		});

		this.router.post('/session', async (req, res) => {
			try {
				const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
				const hasAuth = isNotEmptyString(AUTH_SECRET_KEY)
				res.send({status: 'Success', message: '', data: {auth: hasAuth, model: currentModel()}})
			} catch (error) {
				res.send({status: 'Fail', message: error.message, data: null})
			}
		});

		this.router.post('/verify', async (req, res) => {
			try {
				const {token} = req.body as { token: string }
				if (!token)
					throw new Error('Secret key is empty')

				if (process.env.AUTH_SECRET_KEY !== token)
					throw new Error('密钥无效 | Secret key is invalid')

				res.send({status: 'Success', message: 'Verify successfully', data: null})
			} catch (error) {
				res.send({status: 'Fail', message: error.message, data: null})
			}
		});
	}
}
