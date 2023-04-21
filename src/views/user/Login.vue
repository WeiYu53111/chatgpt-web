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
<!--		<pre>{{ JSON.stringify(model, null, 2) }}
		</pre>-->
		<router-link to="/room">chat room </router-link>

	</div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue'
//import {post} from "@/utils/request";
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


interface ModelType {
	username: string | null
	password: string | null
}


export default defineComponent({
	components: {
		NForm, NRow, NCol, NButton, NFormItem, NInput
	},
	setup() {
		const formRef = ref<FormInst | null>(null)
		const message = useMessage()
		const modelRef = ref<ModelType>({
			username: null,
			password: null
		})
		function checkPasswordInput(rule: FormItemRule,
																 value: string):boolean {
			return !!modelRef.value.password && modelRef.value.password.length > 3
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
					message: '请输入密码',
					validator: checkPasswordInput,
					trigger: ["input","blur"]
				}
			],
		}
		return {
			formRef,
			model: modelRef,
			rules,
			handleValidateButtonClick(e: MouseEvent) {
				e.preventDefault()
				formRef.value?.validate((errors) => {
					if (!errors) {
						message.success('验证成功')
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

<style scoped>
.login-page {
	max-width: 400px;
	margin: 0 auto;
	padding: 32px;
}


.btn-area {
	display: flex;
	justify-content: space-between;
}
</style>
