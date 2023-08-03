import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import {createRouter, createWebHistory} from 'vue-router'
import { ChatLayout } from '@/views/chat/layout'

import {useMenuStore, useTokenStore} from '@/store'

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

	{
		path: '/findPw',
		name: 'findPw',
		meta: { skipCheck: true },
		component: () => import('@/views/user/FindPW.vue'),
	},
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

]

const dynamicsRoutes: Map<string,RouteRecordRaw> =  new Map<string, RouteRecordRaw>();
dynamicsRoutes.set("admin",{
	path: '/admin',
	name: 'admin',
	meta: { requiresAuth: true },// 添加元信息，表示该页面需要认证
	component: () => import('@/views/admin.vue'),
	children: [
		{
			path: '/admin/user_now',
			alias: "",
			name: 'now',
			component: () => import('@/views/user/UserList.vue'),
		},
		{
			path: '/admin/user_his',
			name: 'his',
			component: () => import('@/views/user/UserHisList.vue'),
		},
	],
});
dynamicsRoutes.set("buy",{
	path: '/buy',
	name: 'buy',
	meta: { skipCheck: true },
	component: () => import('@/views/buy/vip.vue'),
});



export interface RouteInfo {
	path:string
	icon:string
	routeName:string
	menuName:string
}

export const menus:RouteInfo[] = [];

function dynamicAddRoutes(routeInfos:RouteInfo[]) {
	for (const routeInfo of routeInfos)  {
		const record = dynamicsRoutes.get(routeInfo.routeName)
		if(record){
			router.addRoute(record)
			menus.push(routeInfo)
		}
	}
	router.addRoute({
		path: '/:pathMatch(.*)*',
		name: 'notFound',
		meta: { skipCheck: true },
		redirect: '/404',
	})
}

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
				const menuStore = useMenuStore()
				// 没有添加路由
				if(!menuStore.addFlag){
					const menus = await menuStore.getMenu(store.token)
					if(menus){
						dynamicAddRoutes(menus)
						menuStore.add()
						next({path:to.path,replace:true})
					}
				}else{
					const originPath =to.path
					if(originPath === "/login" || originPath === "/register"){
						next({name:"room"})
					}else{
						next()
					}
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
