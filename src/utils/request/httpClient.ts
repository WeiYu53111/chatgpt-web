import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ResponseData<T = any> {
	code: number;
	message: string;
	data: T;
}

interface ErrorResponse {
	message: string;
}

interface RequestOptions extends AxiosRequestConfig {}

export default class ApiClient {
	private instance: AxiosInstance;

	constructor(baseURL: string, headers?: Record<string, string>) {
		this.instance = axios.create({
			baseURL,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				...headers,
			},
		});
		this.instance.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem('token');
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);
		this.instance.interceptors.response.use(
			(response: AxiosResponse<ResponseData>) => {
				if (response.data.code === 0) {
					return response.data.data;
				} else {
					throw new Error(response.data.message);
				}
			},
			(error) => {
				console.error(error);
				const response = error.response as AxiosResponse<ErrorResponse>;
				throw new Error(response?.data?.message || '请求失败，请稍后再试！');
			}
		);
	}

	async request<T>(options: RequestOptions): Promise<T> {
		try {
			const response = await this.instance(options);
			return response as T;
		} catch (error) {
			throw new Error(error?.message || '请求失败，请稍后再试！');
		}
	}

	async get<T>(url: string, params?: Record<string, any>): Promise<T> {
		const options: RequestOptions = { url, method: 'get', params };
		return this.request(options);
	}

	async post<T>(url: string, data?: Record<string, any>): Promise<T> {
		const options: RequestOptions = { url, method: 'post', data };
		return this.request(options);
	}

	async put<T>(url: string, data?: Record<string, any>): Promise<T> {
		const options: RequestOptions = { url, method: 'put', data };
		return this.request(options);
	}

	async delete<T>(url: string, params?: Record<string, any>): Promise<T> {
		const options: RequestOptions = { url, method: 'delete', params };
		return this.request(options);
	}
}
