import { defineStore } from "pinia";

interface UserState {
	token?: string;
}

export const useTokenStore = defineStore('tokenStore',{
	state: (): UserState => ({
		token: getToken(),
	}),
	actions: {
		setToken(token: string): void {
			this.token = token;
			localStorage.setItem(LOCAL_NAME, token);
		},
		clearToken(): void {
			this.token = undefined;
			localStorage.removeItem(LOCAL_NAME);
		},
	},
});


const LOCAL_NAME = 'LOGIN_TOKEN'

export function getToken() {
	const token = window.localStorage.getItem(LOCAL_NAME)
	return token?token:""
}


