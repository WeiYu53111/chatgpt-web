<template>
	<div class="view">
		<NLayout class="h-full py-8" has-sider>
			<NLayoutSider
				:collapsed="collapsed"
				:collapsed-width="64"
				:width="240"
				bordered
				class="h-full"
				collapse-mode="width"
				show-trigger
				@collapse="collapsed = true"
				@expand="collapsed = false"
			>
					<NMenu v-model:value="activeKey"
						:collapsed="collapsed"
						:collapsed-icon-size="22"
						:collapsed-width="64"
						:options="menuOptions"
						class="h-full"
						@update:value="handleUpdateValue"
					/>
			</NLayoutSider>
			<NLayout>
				<div class="px-8">
					<router-view></router-view>
				</div>
<!--				<UserList ></UserList>-->
			</NLayout>
		</NLayout>
	</div>
</template>

<script lang="ts">
import UserList from "@/views/user/UserList.vue";
import { defineComponent, h, ref, Component } from 'vue'
import {
	NIcon,
	NLayoutSider,
	NLayout,
	NSpace,
	NMenu,
} from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
	Body as UserIcon,
} from '@vicons/ionicons5'
//import {useRouter} from "vue-router";
import {router} from "@/router";

function renderIcon (icon: Component) {
	return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
	{
		label: '用户今日访问情况',
		key: 'userinfo',
		icon: renderIcon(UserIcon)
	},
	{

		label: '用户历史访问情况',
		key: 'user_history',
		icon: renderIcon(UserIcon)
	}


]

export default defineComponent({
	components: {
		NLayoutSider,
		NLayout,
		NSpace,
		NMenu,
		UserList
	},
	setup () {
		return {
			activeKey: ref<string | null>(null),
			collapsed: ref(false),
			menuOptions,
			handleUpdateValue (key: string, item: MenuOption) {

				//this.$router.push("/admin/"+key);
				console.log(key)
				if(key === "userinfo"){
					console.log("展示用户今日访问情况")
					router.push("/admin/user_now")
				}else{
					console.log("展示用户历史访问情况")
					router.push("/admin/user_his")

				}


			}
		}
	}
})
</script>


<style scoped>
.view {
	height: 100vh;
	width: 100%;
	padding: 0 10px;
}

</style>
