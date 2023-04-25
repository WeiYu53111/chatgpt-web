<template>
	<NCard>
		<NForm ref="formRef" :model="registerInfo" :rules="rules">
			<NFormItem path="email" label="邮箱"  class="w-80">
				<NInput v-model:value="registerInfo.email" @keydown.enter.prevent/>
			</NFormItem>
			<NFormItem path="password" label="密码"  class="w-80">
				<NInput
					v-model:value="registerInfo.password"
					type="password"
					@input="handlePasswordInput"
					@keydown.enter.prevent
				/>
			</NFormItem>
			<NFormItem
				ref="rPasswordFormItemRef"
				first
				path="reenteredPassword"
				label="重复密码"
				class="w-80"
			>
				<NInput
					v-model:value="registerInfo.reenteredPassword"
					:disabled="!registerInfo.password"
					type="password"
					@keydown.enter.prevent
				/>
			</NFormItem>
			<NFormItem path="emailCode" label="验证码"  class="w-80">
				<div class="flex  justify-start justify-between">
					<NInput
						v-model:value="registerInfo.emailCode"
						@keydown.enter.prevent
						class="w-60"
					/>
					<NButton
						@click="isValidEmail"
						@keydown.enter.prevent
					>发送验证码</NButton>
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

<script  lang="ts">


import {defineComponent, ref} from 'vue'
import {post} from "@/utils/request";
import {login, register, UserInfo} from '@/api/user'
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
		NForm, NRow, NCol, NButton, NFormItem, NInput,NCard
	},
	setup() {
		const formRef = ref<FormInst | null>(null)
		const rPasswordFormItemRef = ref<FormItemInst | null>(null)
		const message = useMessage()
		const modelRef = ref<UserInfo>({
			email: null,
			password: null,
			reenteredPassword: null,
			emailCode: null
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

		function isValidEmail(email: string): boolean {
			// 定义邮箱格式的正则表达式
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

			// 使用正则表达式测试邮箱地址，并返回结果
			return emailRegex.test(email);
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
			emailCode: [
				{
					required: true,
					trigger: ['input', 'blur']
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
			rules,
			isValidEmail,
			handlePasswordInput() {
				if (modelRef.value.reenteredPassword) {
					rPasswordFormItemRef.value?.validate({trigger: 'password-input'})
				}
			},
			handleValidateButtonClick(e: MouseEvent) {
				e.preventDefault()
				formRef.value?.validate((errors) => {
					try {
						register(modelRef.value)
						message.success("注册成功,正在前往登录")
						router.push("/login")
					} catch (error: any) {
						message.error(error.message ?? 'error')
					}
				})
			}
		}
	}
})


</script>

<style scoped>

</style>
