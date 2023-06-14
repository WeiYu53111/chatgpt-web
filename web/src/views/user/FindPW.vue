<template>
	<div class="flex flex-col justify-center items-center h-full">
		<NSpace>
			<NLayout>
				<NLayoutHeader>
					<!--				<Header></Header>-->
				</NLayoutHeader>
				<NLayoutContent content-style="padding: 24px;">
					<NSpace vertical>
						<FindPwForm></FindPwForm>
					</NSpace>
				</NLayoutContent>
				<NLayoutFooter></NLayoutFooter>
			</NLayout>
		</NSpace>
	</div>
</template>

<script setup lang="ts">
import FindPwForm from "@/components/login/FindPwForm.vue";
import {NSpace,NLayout,NLayoutFooter,NLayoutContent,NLayoutHeader} from 'naive-ui'

</script>
<style>

</style>
