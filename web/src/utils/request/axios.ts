import axios from 'axios'
//import type{ AxiosResponse }  from 'axios'
import {useAuthStore, useTokenStore} from '@/store'

const service = axios.create({
  baseURL: import.meta.env.VITE_GLOB_API_URL,
})

service.interceptors.request.use(
  (config) => {
    const token = useAuthStore().token
    if (token)
      config.headers.Authorization = `Bearer ${token}`

		//添加登录token
		const loginToken = useTokenStore().token
		if(loginToken){
			config.headers.LoginToken = loginToken
		}
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  },
)
/*
service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (response.status === 200)
      return response

    throw new Error(response.status.toString())
  },
  (error) => {
    return Promise.reject(error)
  },
)*/

export default service
