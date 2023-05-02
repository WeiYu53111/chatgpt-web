<script setup lang='ts'>
//import { defineAsyncComponent, ref } from 'vue'
import { ref } from 'vue'
import { HoverButton, SvgIcon, UserAvatar } from '@/components/common'
import LogOutButton from "@/views/chat/layout/sider/LogOutButton.vue";
import {Theme} from "@/store/modules/app/helper";
import {useAppStore} from "@/store";
import { NButton } from "naive-ui";

//const Setting = defineAsyncComponent(() => import('@/components/common/Setting/index.vue'))

const show = ref(false)
const appStore = useAppStore()

const themeOptions: { label: string; key: Theme; icon: string }[] = [
	{
		label: 'Light',
		key: 'light',
		icon: 'ri:sun-foggy-line',
	},
	{
		label: 'Dark',
		key: 'dark',
		icon: 'ri:moon-foggy-line',
	},
]

</script>

<template>
  <footer class="flex items-center justify-between min-w-0 p-4 overflow-hidden border-t dark:border-neutral-800">
    <div class="flex-1 flex-shrink-0 overflow-hidden">
      <UserAvatar />
    </div>


			<template v-for="item of themeOptions" :key="item.key">
				<NButton
					:type="item.key === theme ? 'primary' : undefined"
					size="small"
					@click="appStore.setTheme(item.key)"
				>
					<template #icon>
						<SvgIcon :icon="item.icon" />
					</template>
				</NButton>
			</template>

			<LogOutButton></LogOutButton>



<!--		<HoverButton @click="show = !show" id="btnx">
      <span class="text-xl text-[#4f555e] dark:text-white">
        <SvgIcon icon="ri:settings-4-line" />
      </span>
		</HoverButton>
		<div class="menu">
			<Menu v-if="show" v-model:visible="show"></Menu>
		</div>-->

<!--    <HoverButton @click="show = true" id="btnx">
      <span class="text-xl text-[#4f555e] dark:text-white">
        <SvgIcon icon="ri:settings-4-line" />
      </span>
    </HoverButton>
		<div class="menu">
			<Menu v-if="show" v-model:visible="show"></Menu>
		</div>-->
<!--    <Setting v-if="show" v-model:visible="show" />-->
  </footer>
</template>

<style>

</style>
