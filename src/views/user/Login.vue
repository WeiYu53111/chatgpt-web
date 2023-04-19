<template>
	<div class="login-page">
		<n-form :model="formData" :rules="rules" v-bind="formAttrs">
			<n-form-item label="用户名" label-for="username">
				<n-input id="username" v-model="formData.username" placeholder="请输入用户名" clearable />
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
			<div class="btn-area">
				<n-button type="primary" @click="submitForm">登录</n-button>
				<router-link to="/register">
					<n-button>注册</n-button>
				</router-link>

			</div>

		</n-form>
	</div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { NButton, NForm, NFormItem, NInput } from 'naive-ui';

export default {
	name: 'Login',

	components: {
		NButton,
		NForm,
		NFormItem,
		NInput,
	},

	setup() {
		const formData = ref({
			username: '',
			password: '',
		});

		const rules = {
			username: [{ required: true, message: '用户名不能为空' }],
			password: [{ required: true, message: '密码不能为空' }],
		};

		const formAttrs = {
			ref: 'form',
			labelPosition: 'top',
		};

		const submitForm = async () => {
			const form = document.getElementById('login-form');
			await form.validate(async (valid) => {
				if (valid) {
					try {
						await axios.post('http://localhost:3002/user/login', formData.value);
						// 跳转到首页或其他页面
					} catch (error) {
						console.log(error);
					}
				} else {
					console.log('表单验证失败');
				}
			});
		};

		return { formData, rules, formAttrs, submitForm };
	},
};
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
