import type { Router } from 'vue-router'
import { useAuthStoreWithout } from '@/store/modules/auth'


export function setupPageGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStoreWithout()
    if (!authStore.session) {
      try {
        const data = await authStore.getSession()
        if (String(data.auth) === 'false' && authStore.token)
          authStore.removeToken()
        if (to.path === '/500')
          next({ name: 'Root' })
        else
          next()
      }
      catch (error) {
        if (to.path !== '/500')
          next({ name: '500' })
        else
          next()
      }
    }
    else {
      next()
    }
  })
}
/*
export function setupMyPageGuard(router: Router) {
	router.beforeEach(async (to, from, next) => {
		const authStore = useTokenStore()
		if (authStore.token) {
			try {
				const data = await authStore.getSession()
				if (String(data.auth) === 'false' && authStore.token)
					authStore.removeToken()
				if (to.path === '/500')
					next({ name: 'Root' })
				else
					next()
			}
			catch (error) {
				if (to.path !== '/500')
					next({ name: '500' })
				else
					next()
			}
		}
		else {
			next({name:"login"})
		}
	})
}*/
