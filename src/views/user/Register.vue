<template>
	<div class="register-page">
		<n-form :model="formData" :rules="rules" v-bind="formAttrs" id="login-form">
			<n-form-item label="用户名" label-for="username">
				<n-input id="username" v-model="formData.username" placeholder="请输入用户名" clearable />
			</n-form-item>

			<n-form-item label="邮箱" label-for="email">
				<n-input id="email" v-model="formData.email" placeholder="请输入邮箱" clearable />
			</n-form-item>

			<n-form-item label="密码" label-for="password">
				<n-input
					id="password"
					type="password"
					v-model="formData.password"
					placeholder="请输入密码"
					clearable
				/>
			</n-form-item>

			<n-input id="msg" v-model="message" placeholder="message" clearable />

			<n-button type="primary" @click="submitForm">提交</n-button>

			<pre>{{ formData }}</pre>
			<pre>{{ message }}</pre>
		</n-form>
	</div>
</template>

<script>

import { ref } from 'vue';
import { NButton, NForm, NFormItem, NInput } from 'naive-ui';
import ApiClient from "../../utils/request/httpClient";
import {UserSpace} from "../../typings/user"

export default {
	name: 'Register',

	components: {
		NButton,
		NForm,
		NFormItem,
		NInput,
	},

	setup() {

		const message = ref(1);

		const formData = ref({
			username: '',
			email: '',
			password: '',
		});

		const apiClient = new ApiClient('http://localhost:3002');

		const rules = {
			username: [{ required: true, message: '用户名不能为空' }],
			email: [
				{ required: true, message: '邮箱不能为空' },
				{ type: 'email', message: '邮箱格式不正确' },
			],
			password: [{ required: true, message: '密码不能为空' }],
		};

		const formAttrs = {
			ref: 'form',
			labelPosition: 'top',
		};

		const submitForm = async () => {
			//const form = document.getElementById('login-form');
			//const valid = await form.validateForm();
			if (true) {
					try {
						const user = await apiClient.post<UserSpace.User>('/user/new', formData.value);
						console.log(user);
					} catch (error) {
						console.log(error);
					}
			} else {
					console.log('表单验证失败');
			}
		};

		return { formData, rules, formAttrs, submitForm,message };
	},
};
</script>

<style scoped>
.register-page {
	max-width: 400px;
	margin: 0 auto;
	padding: 32px;
}
</style>
