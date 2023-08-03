import {defineStore} from 'pinia'
import { ref} from 'vue'
import {getMenus} from "@/api/user";
import {RouteInfo} from "@/router";
export const useMenuStore =
	defineStore('MenuStore', () => {
		const isOpen = ref(false)
		const addFlag = ref(false)
		function change(flag: boolean) {
			isOpen.value = flag
			//console.log(isOpen.value)
		}

		async function getMenu(token:string|null):Promise<RouteInfo[]|null> {
			if(!token){
				return null
			}
			return await getMenus(token)
		}

		function add(){
			addFlag.value = true;
		}

		return {change, isOpen,getMenu,add,addFlag}
	})

