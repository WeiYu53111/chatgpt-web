import { Router } from 'express';
import { auth } from '../middleware/auth'
import { limiter } from '../middleware/limiter'
import { chatConfig, chatReplyProcess, currentModel } from '../chatgpt';
import { isNotEmptyString } from '../utils/is';
import type { RequestProps } from '../types'
import type {ChatMessage} from "chatgpt";


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
				const { prompt, options = {}, systemMessage, temperature, top_p } = req.body as RequestProps
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
			}
			catch (error) {
				res.write(JSON.stringify(error))
			}
			finally {
				res.end()
			}
		});

		this.router.post('/config', auth, async (req, res) => {
			try {
				const response = await chatConfig()
				res.send(response)
			}
			catch (error) {
				res.send(error)
			}
		});

		this.router.post('/session', async (req, res) => {
			try {
				const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
				const hasAuth = isNotEmptyString(AUTH_SECRET_KEY)
				res.send({ status: 'Success', message: '', data: { auth: hasAuth, model: currentModel() } })
			}
			catch (error) {
				res.send({ status: 'Fail', message: error.message, data: null })
			}
		});

		this.router.post('/verify', async (req, res) => {
			try {
				const { token } = req.body as { token: string }
				if (!token)
					throw new Error('Secret key is empty')

				if (process.env.AUTH_SECRET_KEY !== token)
					throw new Error('密钥无效 | Secret key is invalid')

				res.send({ status: 'Success', message: 'Verify successfully', data: null })
			}
			catch (error) {
				res.send({ status: 'Fail', message: error.message, data: null })
			}
		});
	}
}
