<template>
	<NCard title="" class="shadow-md">
		<NSpace vertical>
			<div class="p-3 font-medium flex justify-between  items-center">
				<span class="text-xl mr-auto" >登录</span>
<!--				<NButton class="ml-2 self-center">账号登录</NButton>-->
				<NButton class="ml-2 self-center" @click="toRegister">注册</NButton>
			</div>
		<NForm ref="formRef" :model="userInfo" :rules="rules">
			<NFormItem path="email" label="邮箱" class="w-96">
				<NInput v-model:value="userInfo.username" @keydown.enter.prevent/>
			</NFormItem>
			<NFormItem path="password" label="密码" class="w-96">
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
							class="shadow-md hover:shadow-lg"
							:disabled="userInfo.username === null"
							@click="handleValidateButtonClick"
						>登录
						</NButton>
					</div>
				</NCol>
			</NRow>
		</NForm>
		</NSpace>
	</NCard>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue'
import {FormInst, FormItemRule, FormRules, NButton, NCol, NForm, NFormItem, NInput, NRow, useMessage,NCard,NSpace} from 'naive-ui'
import {login, UserInfo} from '@/api/user'
import {router} from "@/router";


export default defineComponent({
	components: {
		NForm, NRow, NCol, NButton, NFormItem, NInput,NCard,NSpace
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

		function toRegister(){
			router.push("/register")
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
			toRegister
		}
	}
})

</script>

<style scoped>

</style>
