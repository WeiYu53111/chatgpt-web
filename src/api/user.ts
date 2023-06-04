import {post} from "@/utils/request";
import { SHA256 } from 'crypto-js';

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

/**
 * 登录
 * @param data
 */
export function login<T>(data:UserInfo){

	const newData = {
		email: data.email,
		password:  SHA256(data.password).toString(),
		reenteredPassword: data.reenteredPassword,
		emailCode: data.emailCode
	}

	return post<T>({
		url: '/user/login',
		data: newData,
	})
}


export function register<T>(data:UserInfo){

	const newPassword = SHA256(data.password).toString()
	data.password = newPassword
	data.reenteredPassword = newPassword
	//发起请求
	return post<T>({
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
