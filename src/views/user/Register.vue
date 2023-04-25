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
							<NCard style="border: 0px; width: 300px;height: 400px; background-color: white;">
<!--								<template #cover>
									<img src="/public/pwa-192x192.png" class="logo">
								</template>-->
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

