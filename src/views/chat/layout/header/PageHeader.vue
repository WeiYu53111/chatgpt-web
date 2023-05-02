<template>
	<div class="p-1">
		<NPageHeader subtitle="让你的效率up up up!">
			<template #title>
				<span>机比替</span>
			</template>
<!--			<template #avatar>
				<NAvatar
					src="/src/assets/ikun.png"
				/>
			</template>-->

				<template #extra>
					<NButton circle class="px-4" quaternary type="success">
						<template #icon>
							<NIcon :component="LogOut" :depth="1" class="cursor-pointer" size="25" @click="exit">退出</NIcon>
						</template>
					</NButton>
				</template>


		</NPageHeader>
	</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage,NAvatar,NPageHeader,NIcon,NButton  } from 'naive-ui'
import {useBasicLayout} from "@/hooks/useBasicLayout";
const { isMobile } = useBasicLayout()
import { LogOut } from '@vicons/ionicons5'
import { useTokenStore } from '@/store'
import {router} from "@/router";




export default defineComponent({
	components:{
		NAvatar,NPageHeader,NIcon,NButton
	},
	setup () {
		const store = useTokenStore()
		return {
			LogOut,
			exit() {
				store.clearToken()
				router.push("/login")
			}
		}
	}
})
</script>

<style>



</style>
