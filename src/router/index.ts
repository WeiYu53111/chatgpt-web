import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import {createRouter, createWebHistory} from 'vue-router'
//import { setupPageGuard } from './permission'
import { ChatLayout } from '@/views/chat/layout'

import { useTokenStore } from '@/store'

const routes: RouteRecordRaw[] = [

	{
		path: '/',
		name: 'Root',
		redirect: { name: 'login' },
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/user/Login.vue'),
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('@/views/user/Register.vue'),
	},
	/*{
		path: '/chat/:uuid?',
		name: 'Chat',
		meta: { requiresAuth: true },
		component: () => import('@/views/chat/index.vue'),
	},*/
	{
    path: '/room',
    name: 'room',
    component: ChatLayout,
		meta: { requiresAuth: true },// 添加元信息，表示该页面需要认证
    redirect: '/chat',
    children: [
      {
        path: '/chat/:uuid?',
        name: 'Chat',
				meta: { requiresAuth: true },// 添加元信息，表示该页面需要认证
        component: () => import('@/views/chat/index.vue'),
      },
    ],
  },
	{
		path: '/admin',
		name: 'admin',
		meta: { skipCheck: true },
		component: () => import('@/views/admin.vue'),
	},


  {
    path: '/404',
    name: '404',
		meta: { skipCheck: true },
    component: () => import('@/views/exception/404/index.vue'),
  },

  {
    path: '/500',
    name: '500',
		meta: { skipCheck: true },
    component: () => import('@/views/exception/500/index.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
		meta: { skipCheck: true },
    redirect: '/404',
  },
]

export const router = createRouter({
  //history: createWebHashHistory(),
	history:createWebHistory(),
	routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

//setupMyPageGuard(router)

router.beforeEach(async(to, from, next) => {
	if(to.meta.skipCheck === true){
		next()
	}else{
		try {
			const store = useTokenStore()
			if(store.isLogin()){
				const originPath =to.path
				if(originPath === "/login" || originPath === "/register"){
					next({name:"room"})
				}else{
					next()
				}
			}else{
				const originPath = to.path
				if(originPath === "/login" || originPath === "/register"){
					next()
				}else{
					next({name:"login"})
				}
			}
		}catch (error) {
			console.error(error);
			next({ name: '500' });
		}
	}
})


export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()


}
