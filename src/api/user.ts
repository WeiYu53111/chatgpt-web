import {post} from "@/utils/request";


export interface UserInfo {
	username: string | null
	password: string | null
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
