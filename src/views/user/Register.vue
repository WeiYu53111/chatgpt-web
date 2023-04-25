<template>
	<div class="flex flex-col justify-center items-center h-full">
		<NSpace>
			<NLayout>
				<NLayoutHeader>
					<!--				<Header></Header>-->
				</NLayoutHeader>
				<NLayoutContent content-style="padding: 24px;">
					<NSpace vertical>
						<div>
							<NCard style="border: 0px;">
								<template #cover>
									<img src="/public/pwa-192x192.png" class="logo">
								</template>
							</NCard>
						</div>
						<RegisterForm></RegisterForm>
					</NSpace>
				</NLayoutContent>
				<NLayoutFooter></NLayoutFooter>
			</NLayout>
		</NSpace>
	</div>
</template>

<script setup lang="ts">
import RegisterForm from "@/components/login/RegisterForm.vue";
import {NCard,NSpace,NLayout,NLayoutFooter,NLayoutContent,NLayoutHeader} from 'naive-ui'

</script>
<style>
.logo {
	max-width: 200px; max-height: 200px;border-radius: 50%; overflow: hidden; object-fit: contain;
	position: relative;
	left: 50%;
	transform: translate(-50%,0);
}

</style>
