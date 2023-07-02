import {defineStore} from 'pinia'
import { ref} from 'vue'
export const useMenuStore =
	defineStore('MenuStore', () => {
		const isOpen = ref(false)
		function change(flag: boolean) {
			isOpen.value = flag
			//console.log(isOpen.value)
		}

		return {change, isOpen}
	})
