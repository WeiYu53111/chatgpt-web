<template>
	<NCard title="" class="shadow-md">
		<NSpace vertical>
			<div class="pb-3 font-medium flex justify-between  items-center">
				<span class="text-2xl mr-auto">登录</span>
				<!--				<NButton class="ml-2 self-center">账号登录</NButton>-->
				<NButton class="ml-2 self-center" @click="toRegister">注册</NButton>
			</div>
			<NForm ref="formRef" :model="userInfo" :rules="rules">
				<NFormItem path="email" label="邮箱" class="w-96">
					<NInput v-model:value="userInfo.email" @keydown.enter.prevent/>
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
						<div style="display: flex; : space-between; align-items: center;">
							<div style="flex-grow: 1;">
								<NButton text style="margin-left: 5px" @click="toFindPassword">
									忘记密码
								</NButton>
							</div>
							<NButton
								class="shadow-md hover:shadow-lg"
								:disabled="userInfo.email === null"
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
	useMessage,
	NCard,
	NSpace
} from 'naive-ui'
import {login, UserInfo,Response,Token} from '@/api/user'
import {router} from "@/router";
import {isSuccess} from "@/utils/functions";
import {useTokenStore} from '@/store'


export default defineComponent({
	components: {
		NForm, NRow, NCol, NButton, NFormItem, NInput, NCard, NSpace
	},
	setup() {

		const formRef = ref<FormInst | null>(null)
		const message = useMessage()
		const modelRef = ref<UserInfo>({
			email: "",
			password: "",
			reenteredPassword: "",
			emailCode:""
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
					login<Response>(modelRef.value).then(
						(res) => {
							if (isSuccess(res)) {
								const data = res.data as unknown as Token
								const store = useTokenStore()
								store.setToken(data.token)
								message.success("登录成功,正在前往聊天室.")
								router.push("/room")
							} else {
								message.error(`登录失败: ${res.message ?? 'error'}`)
							}
						},
						(errors=> {
							message.error(`登录失败: ${errors.message ?? 'error'}`)
						})
					).catch((error) => {
						message.error(error.message ?? 'error')
					})
				}
			})
		}

		function toFindPassword() {
			router.push("/findPw")
		}

		function toRegister() {
			router.push("/register")
		}

		const rules: FormRules = {
			email: [
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
			toRegister,
			toFindPassword
		}
	}
})
</script>

<style scoped>

</style>
