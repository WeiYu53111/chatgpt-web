<template>
	<NButton circle class="px-4" quaternary type="success">
		<template #icon>
			<NIcon :component="LogOut" :depth="1" class="cursor-pointer" size="25" @click="exit"></NIcon>
		</template>
	</NButton>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {NButton, NIcon, NPageHeader} from "naive-ui";
import {useTokenStore} from "../../../../store";
import {LogOut} from "@vicons/ionicons5";
import {router} from "../../../../router";

export default defineComponent({
	components:{
		NPageHeader,NIcon,NButton
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

<style scoped>

</style>
