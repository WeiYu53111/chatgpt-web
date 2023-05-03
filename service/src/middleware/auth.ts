import { isNotEmptyString } from '../utils/is'
import { AuthService } from "../services/AuthService";
import {Request} from "express";

export interface CustomRequest extends Request {
	userInfo: {
		email: string
	}
}

const auth = async (req: CustomRequest, res, next) => {
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
		const email = req.userInfo.email

		next()
	}
	catch (error) {
		res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
	}*/
	next()
}

export { auth }
