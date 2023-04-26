import {post} from "@/utils/request";


export interface Response {
	status: string
	data: any
	message: string
}


export interface UserInfo {
	email: string
	password: string
	reenteredPassword: string
	emailCode: string
}

/**
 * 登录
 * @param data
 */
export function login<T>(data:UserInfo){
	return post<T>({
		url: '/user/login',
		data: data,
	})
}


export function register<T>(data:UserInfo){
	//发起请求
	post<T>({
		url: '/user/new',
		data: data,
	})
}

export function sendEmailCode<T>(email: string) {
	//发起请求
	return post<T>({
		url: '/service/sendEmailCode',
		data: {
			email: email
		},
	})
}
