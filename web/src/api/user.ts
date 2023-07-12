import {post} from "@/utils/request";
import {rsaEncode} from "@/utils/crypto";


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

export interface Token {
	token:string
}

export interface UserData {
	email:string,
	create_time:string,
	last_login_time:string,
	usage:number
	limit:number
}

export interface UserHisData {
	squad_date:string,
	email:string,
	usage:number
}

/**
 * 登录
 * @param data
 */
export function login<T>(data:UserInfo){

	// rsa加密密码
	const encryptedStr = rsaEncode(data.password)
	// 将加密结果转换为 base64 编码格式
	const newPassword = btoa(encryptedStr.toString());
	const newData = {
		email: data.email,
		password:  newPassword,
		reenteredPassword: "",
		emailCode: data.emailCode
	}

	return post<T>({
		url: '/user/login',
		data: newData,
	})
}


export function register<T>(data:UserInfo){
	// rsa加密密码
	const encryptedStr = rsaEncode(data.password)
	// 将加密结果转换为 base64 编码格式
	const newPassword = btoa(encryptedStr.toString());
	const newData = {
		email: data.email,
		password:  newPassword,
		reenteredPassword: "",
		emailCode: data.emailCode
	}
	//发起请求
	return post<T>({
		url: '/user/new',
		data: newData,
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

export function resetPw<T>(data:UserInfo){
	// rsa加密密码
	const encryptedStr = rsaEncode(data.password)
	// 将加密结果转换为 base64 编码格式
	const encodedStr = btoa(encryptedStr.toString());

	const newData = {
		email: data.email,
		password:  encodedStr,
		reenteredPassword: "",
		emailCode: data.emailCode
	}
	//发起请求
	return post<T>({
		url: '/user/reset',
		data: newData,
	})
}

export async function verifyToken(token:string|null): Promise<boolean>{

	if(token === null){
		return false
	}
	const res = await post<Response>({
		url: '/service/verifyToken',
		data: {
			token: token
		}
	})
	return res.status === 'Success'

}

export async function getAllUserData():Promise<UserData[]> {
	const res = await post<Response>({
		url: '/stat/userdata',
		data: {
		}
	});
	const data = res.data as unknown as UserData[]
	return  Promise.resolve(data);
}

export async function getAllUserHisData():Promise<UserHisData[]> {
	const res = await post<Response>({
		url: '/stat/user_his_data',
		data: {
		}
	});
	const data = res.data as unknown as UserHisData[]
	return  Promise.resolve(data);
}


export async function getMenus(token:string):Promise<string[]|null>{
	/*const res = await post<Response>({
		url: '/user/route'
	});
	const data = res.data as unknown as UserRoute*/
	let data = [
		"admin",
		"buy"
	]
	return  Promise.resolve(data);
}
