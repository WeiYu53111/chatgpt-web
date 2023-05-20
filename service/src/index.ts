import express from 'express'
import {UserRoute} from './routes/UserRoute';
import {PubRoute} from './routes/PubRoute';
import {ChatRoute} from "./routes/ChatRoute";

import {Request, Response, NextFunction} from 'express';
import {AuthService} from "./services/AuthService";
import {CustomRequest} from "./middleware/auth";
import log4js from 'log4js';
//import userSevice from "./services/UserService"

//const cors = require('cors')
const app = express()
const user = new UserRoute();
const pub = new PubRoute()
const chatpgt = new ChatRoute()
//const router = express.Router()

const logger = log4js.getLogger('app');
log4js.configure({
	appenders: {
		file: { type: 'file', filename: 'logs/app.log' },
		console: { type: 'console' }
	},
	categories: { default: { appenders: ['file', 'console'], level: 'info' } }
});

// 将 logger 对象挂载到 app.locals 上
app.locals.logger = logger;

app.get('/api/logger/level/:level/:pwd', (req: Request, res: Response) => {
	const { level,pwd } = req.params;

	if(pwd == "Qwe123"){
		// 获取 logger 对象并更新日志级别
		const logger = req.app.locals.logger as log4js.Logger;
		logger.level = level;
		res.send(`Logger level has been set to ${level}`);
	}
});

//app.use(cors())
app.use(express.static('public'))
app.use(express.json())

app.all('*', (_, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'authorization, Content-Type')
	res.header('Access-Control-Allow-Methods', '*')
	next()
})
// 拦截器中间件函数
const interceptor = (req: Request, res: Response, next: NextFunction) => {
	// 在这里编写您的逻辑，例如检查请求头或身份验证等
	const params = req.params;
	const query = req.query;
	const body = req.body;
	const path = req.path;

	const logger = req.app.locals.logger
	logger.debug({
		header: req.headers,
		params: params,
		query: query,
		body: body,
		path: path
	})
		//console.log()
	// 如果需要终止请求并返回响应，可以像下面这样：
	// return res.status(401).send('Unauthorized');
	// 否则，调用next()继续传递请求
	next();
}





const tokenInterceptor= (req: CustomRequest, res: Response, next: NextFunction) => {

	const publicPaths = ["/user/login", "/user/new", "/service/verifyToken","/service/sendEmailCode"];
	if (!publicPaths.some((path) => req.path.startsWith(path))) {
		const loginToken = req.header('LoginToken')
		if (!loginToken)
			throw new Error('Error: 无访问权限 | No access rights')
		AuthService.verifyToken(loginToken).then(
			res => {
				req.userInfo = {email : res.email}
				//console.log("user:" + res.email + " 通过token验证")
				next()
			}
		).catch(
			error => {
				//console.log("有用户token验证失败")
				res.send({status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null})
			}
		)
	}else{
		next()
	}
}

//debug用
app.use(interceptor)

// 开发模式的时候, vite会重写URL, 这里用不上
// 部署在nginx的时候 nginx会重写URL, 这里用不上
// 部署在docker的时候,就需要express重写URL
app.use('/api/*', (req, res) => {
	const newPath = req.originalUrl.replace(/^\/api\//, '/');
	res.redirect(newPath);
});

// 注册所有需要验证令牌的路由
app.use(tokenInterceptor);


//app.use('', router)
app.use('/', chatpgt.getRouter())
//app.use('/api', router)
app.use('/user', user.getRouter());
app.use('/service', pub.getRouter())
app.set('trust proxy', 1)

app.listen(3002, () => globalThis.console.log('Server is running on port 3002'))
