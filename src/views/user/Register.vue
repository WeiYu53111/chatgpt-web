<template>

	<div style="margin: 0 auto;width: 30%">
		<NForm ref="formRef" :model="model" :rules="rules">
			<NFormItem path="age" label="用户名">
				<NInput v-model:value="model.username" @keydown.enter.prevent/>
			</NFormItem>
			<NFormItem path="password" label="密码">
				<NInput
					v-model:value="model.password"
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
			>
				<NInput
					v-model:value="model.reenteredPassword"
					:disabled="!model.password"
					type="password"
					@keydown.enter.prevent
				/>
			</NFormItem>
			<NRow :gutter="[0, 24]">
				<NCol :span="24">
					<div style="display: flex; justify-content: flex-end">
						<NButton
							:disabled="model.username === null"
							round
							type="primary"
							@click="handleValidateButtonClick"
						>
							提交
						</NButton>
					</div>
				</NCol>
			</NRow>
		</NForm>


		<pre>{{ JSON.stringify(model, null, 2) }}
</pre>

	</div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue'
import {post} from "@/utils/request";
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
	useMessage
} from 'naive-ui'


interface ModelType {
	username: string | null
	password: string | null
	reenteredPassword: string | null
}


export default defineComponent({
	components: {
		NForm, NRow, NCol, NButton, NFormItem, NInput
	},
	setup() {
		const formRef = ref<FormInst | null>(null)
		const rPasswordFormItemRef = ref<FormItemInst | null>(null)
		const message = useMessage()
		const modelRef = ref<ModelType>({
			username: null,
			password: null,
			reenteredPassword: null
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

		function validatePasswordSame(rule: FormItemRule, value: string): boolean {
			return value === modelRef.value.password
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
			model: modelRef,
			rules,
			handlePasswordInput() {
				if (modelRef.value.reenteredPassword) {
					rPasswordFormItemRef.value?.validate({trigger: 'password-input'})
				}
			},
			handleValidateButtonClick(e: MouseEvent) {
				e.preventDefault()
				formRef.value?.validate((errors) => {
					if (!errors) {
						//发起请求
						post<T>({
							url: '/user/new',
							data: modelRef.value,
						})
					} else {
						console.log(errors)
						message.error('验证失败')
					}
				})
			}
		}
	}
})
</script>

