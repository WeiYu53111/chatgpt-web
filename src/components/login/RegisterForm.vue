<template>
	<NCard title="" class="shadow-md">
		<div class="p-3 font-medium flex justify-between  items-center">
			<span class="text-xl mr-auto">注册</span>
			<!--				<NButton class="ml-2 self-center">账号登录</NButton>-->
			<NButton class="ml-2 self-center" @click="toLogin">登录</NButton>
		</div>
		<NForm ref="formRef" :model="registerInfo" :rules="rules">
			<NFormItem path="email" label="邮箱" class="w-96">
				<NInput v-model:value="registerInfo.email" @keydown.enter.prevent/>
			</NFormItem>
			<NFormItem path="password" label="密码" class="w-96">
				<NInput
					v-model:value="registerInfo.password"
					type="password"
					@input="handlePasswordInput"
					@keydown.enter.prevent
					:input-props="{ autocomplete: 'on' }"
				/>
			</NFormItem>
			<NFormItem
				ref="rPasswordFormItemRef"
				first
				path="reenteredPassword"
				label="重复密码"
				class="w-96"
			>
				<NInput
					v-model:value="registerInfo.reenteredPassword"
					:disabled="!registerInfo.password"
					type="password"
					@keydown.enter.prevent
					:input-props="{ autocomplete: 'on' }"
				/>
			</NFormItem>
			<NFormItem path="emailCode" label="验证码" class="w-96">
				<div class="flex justify-between">
					<NInput
						v-model:value="registerInfo.emailCode"
						@keydown.enter.prevent
						class="w-60"
						:input-props="{ autocomplete: 'on' }"
					/>
					<NButton
						@click="sendCode"
						@keydown.enter.prevent
						:disabled="buttonDisabled"
					>发送验证码
					</NButton>
				</div>
			</NFormItem>
			<NRow :gutter="[0, 24]">
				<NCol :span="24">
					<div style="display: flex; justify-content: flex-end">
						<NButton
							:disabled="registerInfo.email === null"
							@click="handleValidateButtonClick"
						>
							注册
						</NButton>
					</div>
				</NCol>
			</NRow>
		</NForm>
	</NCard>
</template>

<script lang="ts">


import {defineComponent, ref} from 'vue'
import {isValidEmail, isSuccess} from '@/utils/functions'
import {login, register, Response, sendEmailCode, UserInfo} from '@/api/user'
import {
	FormInst,
	FormItemInst,
	FormItemRule,
	FormRules,
	NButton,
	NCol,
	NForm,
	NFormItem,
	NInput,
	NRow,
	NCard,
	useMessage
} from 'naive-ui'
import {router} from "@/router";


export default defineComponent({
	components: {
		NForm, NRow, NCol, NButton, NFormItem, NInput, NCard
	},
	setup() {
		const formRef = ref<FormInst | null>(null)
		const rPasswordFormItemRef = ref<FormItemInst | null>(null)
		const message = useMessage()
	  let buttonDisabled = ref(false)
		const modelRef = ref<UserInfo>({
			email: "531115357@qq.com",
			password: "123456",
			reenteredPassword: "123456",
			emailCode: ""
		})

		function validatePasswordStartWith(
			rule: FormItemRule,
			value: string
		): boolean {
			return (
				!!modelRef.value.password &&
				modelRef.value.password.startsWith(value) &&
				modelRef.value.password.length >= value.length
			)
		}

		function toLogin() {
			router.push("/login")
		}

		function sendCode(email: string): void {
			// 定义邮箱格式的正则表达式
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			// 使用正则表达式测试邮箱地址，并返回结果
			if (emailRegex.test(modelRef.value.email)) {

				sendEmailCode<Response>(modelRef.value.email).then(
					(res) => {
						if (isSuccess(res)) {
							message.success(res.message ?? "发送验证码成功")
							buttonDisabled.value = true; // 禁用按钮
							setTimeout(function() {
								buttonDisabled.value = false; // 30秒后解除禁用
							}, 30000);
						} else {
							message.error(`发送验证码失败: ${res.message ?? 'error'}`)
						}
					}
				).catch((error) => {
					message.error(error.message ?? 'error')
				});


				try {

				} catch (error: any) {

				}
			} else {
				message.error("邮箱格式不正确!")
			}

		}


		function validatePasswordSame(rule: FormItemRule, value: string): boolean {
			return value === modelRef.value.password
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
					message: '请输入密码'
				}
			],
			reenteredPassword: [
				{
					required: true,
					message: '请再次输入密码',
					trigger: ['input', 'blur']
				},
				{
					validator: validatePasswordStartWith,
					message: '两次密码输入不一致',
					trigger: 'input'
				},
				{
					validator: validatePasswordSame,
					message: '两次密码输入不一致',
					trigger: ['blur', 'password-input']
				}
			]
		}
		return {
			formRef,
			rPasswordFormItemRef,
			registerInfo: modelRef,
			buttonDisabled,
			rules,
			toLogin,
			sendCode,
			handlePasswordInput() {
				if (modelRef.value.reenteredPassword) {
					rPasswordFormItemRef.value?.validate({trigger: 'password-input'})
				}
			},
			handleValidateButtonClick(e: MouseEvent) {
				e.preventDefault()
				formRef.value?.validate((errors) => {
					if (errors) return;
					try {
						register(modelRef.value)
							.then(
								(res) => {
									if (isSuccess(res)) {
										message.success("注册成功,正在前往登录")
										router.push("/login")
									} else {
										message.error(`注册失败: ${res.message ?? 'error'}`)
									}
								}
							).catch((error) => {
							message.error(error.message ?? 'error')
						})
					} catch (error: any) {
						console.log(error)
					}
				})
			}
		}
	}
})


</script>

<style scoped>

</style>
