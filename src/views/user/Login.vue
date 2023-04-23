<template>
	<div class="login-page">
		<NForm ref="formRef" :model="userInfo" :rules="rules">
			<NFormItem path="age" label="用户名">
				<NInput v-model:value="userInfo.username" @keydown.enter.prevent/>
			</NFormItem>
			<NFormItem path="password" label="密码">
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

	</div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue'
import {
	FormInst,
	FormItemRule,
	FormRules,
	NButton,
	NCol,
	NForm,
	NFormItem,
	NInput,
	NRow,
	useMessage
} from 'naive-ui'

import {login, UserInfo} from '@/api/user'
import {router} from "@/router";


export default defineComponent({
	components: {
		NForm, NRow, NCol, NButton, NFormItem, NInput
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
	display: flex;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
	border: 1px solid black;
}

</style>
