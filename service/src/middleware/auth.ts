import { isNotEmptyString } from '../utils/is'
import { AuthService } from "../services/AuthService";

const auth = async (req, res, next) => {
  /*const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
  if (isNotEmptyString(AUTH_SECRET_KEY)) {
    try {
      const Authorization = req.header('Authorization')
      if (!Authorization || Authorization.replace('Bearer ', '').trim() !== AUTH_SECRET_KEY.trim())
        throw new Error('Error: 无访问权限 | No access rights')
      next()
    }
    catch (error) {
      res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
    }
  }
  else {
    next()
  }*/
	//修改逻辑为 ,检查token的合法性

	//todo 后续添加普通用户限制逻辑
	/*try {
		const loginToken = req.header('LoginToken')
		if (!loginToken)
			throw new Error('Error: 无访问权限 | No access rights')
		const obj =  await AuthService.verifyToken(loginToken)
		console.log("user:"+obj.email +" 通过token验证")
		next()
	}
	catch (error) {
		console.log("有用户token验证失败")
		res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
	}*/
	next()

}

export { auth }
