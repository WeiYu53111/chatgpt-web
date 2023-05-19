import express from 'express'
import {UserRoute} from './routes/UserRoute';
import {PubRoute} from './routes/PubRoute';
import {ChatRoute} from "./routes/ChatRoute";

import {Request, Response, NextFunction} from 'express';
import {AuthService} from "./services/AuthService";
import {CustomRequest} from "./middleware/auth";

import userSevice from "./services/UserService"

//const cors = require('cors')
const app = express()
const user = new UserRoute();
const pub = new PubRoute()
const chatpgt = new ChatRoute()
const router = express.Router()

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
	if (req.path.startsWith("/user")) {
		const params = req.params;
		const query = req.query;
		const body = req.body;
		const path = req.path;
		console.log({
			header: req.headers,
			params: params,
			query: query,
			body: body,
			path: path
		})
	}
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

//測試用
//app.use(interceptor)
// 注册所有需要验证令牌的路由
app.use(tokenInterceptor);


app.use('', router)
app.use('/', chatpgt.getRouter())
app.use('/api', router)
app.use('/user', user.getRouter());
app.use('/service', pub.getRouter())
app.set('trust proxy', 1)

app.listen(3002, () => globalThis.console.log('Server is running on port 3002'))
