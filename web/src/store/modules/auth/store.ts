import { defineStore } from "pinia";
interface UserState {
	token: string|null;
	isVaild: boolean;
	keepTime: number;
}

export const useTokenStore = defineStore('tokenStore',{
	state: (): UserState => ({
		token: getToken(),
		isVaild: getVaild(),
		keepTime: getTime(),
	}),
	getters:{
		getToken(state): string | null {
			return state.token;
		},
		getIsVaild(state):boolean {
			const last = this.getKeepTime
			const now = new Date()
			if(now.getTime() > last){
				return false
			}
			return state.isVaild;
		},
		getKeepTime(state):number {
			return state.keepTime;
		},
	},
	actions: {
		updateTime():number{
			const now = new Date();
			const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);
			return tenMinutesLater.getTime()
		},
		setToken(token: string): void {
			this.token = token;
			localStorage.setItem(LOCAL_NAME, token);
			this.isVaild = true;
			localStorage.setItem(LOCAL_VAILD,`${this.isVaild}`);
			//设置存储时间为10分钟
			this.keepTime = this.updateTime();
			localStorage.setItem(LOCAL_TIME,`${this.keepTime}` );
		},
		clearToken(): void {
			this.token = null;
			localStorage.removeItem(LOCAL_NAME);
			this.keepTime = 0
			localStorage.removeItem(LOCAL_TIME);
			this.isVaild = false
			localStorage.removeItem(LOCAL_VAILD);
		},
		/**
		 * 用于判断是否已经登录
		 */
		isLogin():boolean{
			if(this.getToken && this.getIsVaild){
				return true
			}else{
				this.clearToken()
				return false
			}
		},
	},
});


const LOCAL_NAME = 'LOGIN_TOKEN'
const LOCAL_VAILD = "LOGIN_VAILD"
const LOCAL_ISCHECKED = "LOGIN_CHECKED"
const LOCAL_TIME = "LOGIN_TIME"

export function getToken() {
	const token = window.localStorage.getItem(LOCAL_NAME)
	return token?token:null
}

export function getVaild() {
	const vaild = window.localStorage.getItem(LOCAL_VAILD)
	return vaild?Boolean(vaild):false
}
export function getChecked() {
	const checked = window.localStorage.getItem(LOCAL_ISCHECKED)
	return checked?Boolean(checked):false
}
export function getTime() {
	const time = window.localStorage.getItem(LOCAL_TIME)
	return time?Number(time):0
}

