<template>
	<div class="flex justify-center align-center">
	<NSpace>
		<NLayout>
			<NLayoutHeader>
				<Header></Header>
			</NLayoutHeader>
			<NLayoutContent content-style="padding: 24px;">
				<NCard title="">
					<NForm ref="formRef" :model="userInfo" :rules="rules">
						<NFormItem path="username" label="用户名" class="w-80">
							<NInput v-model:value="userInfo.username" @keydown.enter.prevent/>
						</NFormItem>
						<NFormItem path="password" label="密码" class="w-80">
							<NInput
								v-model:value="userInfo.password"
								type="password"
								@keydown.enter.prevent
							/>
						</NFormItem>
						<NRow :gutter="[0, 24]">
							<NCol :span="24">
								<div style="display: flex; justify-content: flex-end">
									<NButton
										:disabled="userInfo.username === null"
										round
										type="primary"
										@click="handleValidateButtonClick"
									>登录
									</NButton>
								</div>
							</NCol>
						</NRow>
					</NForm>
				</NCard>
			</NLayoutContent>
			<NLayoutFooter>footer</NLayoutFooter>
		</NLayout>

	</NSpace>
	</div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue'
import {FormInst, FormItemRule, FormRules, NButton, NCol, NForm, NFormItem, NInput, NRow, useMessage,NCard,NSpace} from 'naive-ui'
import Header from '@/components/login/Header.vue'
import {login, UserInfo} from '@/api/user'
import {router} from "@/router";


export default defineComponent({
	components: {
		NForm, NRow, NCol, NButton, NFormItem, NInput,NCard,NSpace,Header
	},
	setup() {
		const formRef = ref<FormInst | null>(null)
		const message = useMessage()
		const modelRef = ref<UserInfo>({
			username: "111111",
			password: "111111"
		})

		function checkPasswordInput(rule: FormItemRule,
																value: string): boolean {
			return !!modelRef.value.password && modelRef.value.password.length > 3
		}

		async function handleValidateButtonClick(e: MouseEvent) {
			e.preventDefault()
			formRef.value?.validate((errors) => {
				if (!errors) {
					//发起请求
					try {
						login(modelRef.value)
						message.success("登录成功,正在前往聊天室.")
						router.push("/chat")
					} catch (error: any) {
						message.error(error.message ?? 'error')
					}
				} else {
					console.log(errors)
				}
			})
		}

		const rules: FormRules = {
			username: [
				{
					required: true,
					trigger: ['input', 'blur']
				}
			],
			password: [
				{
					required: true,
					message: '密码错误',
					validator: checkPasswordInput,
					trigger: ["input", "blur"]
				}
			],
		}
		return {
			formRef,
			userInfo: modelRef,
			rules,
			handleValidateButtonClick,
		}
	}
})


</script>

<style scoped>

.login-page {
}

</style>
