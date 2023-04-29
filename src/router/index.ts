import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import {createRouter, createWebHistory} from 'vue-router'
//import { setupPageGuard } from './permission'
import { ChatLayout } from '@/views/chat/layout'

import {useTokenStore } from '@/store'

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
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404/index.vue'),
  },

  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500/index.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    redirect: '/404',
  },
]

export const router = createRouter({
  //history: createWebHashHistory(),
	history:createWebHistory(),
	routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

//setupPageGuard(router)

router.beforeEach((to, from, next) => {

	const store = useTokenStore()
	const token = store.token
	if (to.path === "/" || to.path==="/login"){
		if (token) { // token 存在，跳转到room
			next({name:"room"})
		} else { // token 不存在
			next();
		}

	} else if(to.matched.some((record) => record.meta.requiresAuth)) { // 判断是否需要认证

		if (token) { // token 存在，放行
			next();
		} else { // token 不存在，跳转到登录页
			next({ name: "login" });
		}
	} else { // 不需要认证，放行

		next();
	}
});


export async function setupRouter(app: App) {
  app.use(router)
  await router.isReady()
}
