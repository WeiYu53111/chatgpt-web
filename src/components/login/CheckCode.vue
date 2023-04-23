<template>
	<div>
		<canvas ref="canvasRef" :width="width" :height="height"></canvas>
		<button @click="refresh">刷新</button>
	</div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

export default defineComponent({
	props: {
		width: {
			type: Number,
			required: true,
		},
		height: {
			type: Number,
			required: true,
		},
	},
	setup(props) {
		const canvasRef = ref<HTMLCanvasElement | null>(null);
		// 初始化验证码
		let captchaText = generateRandomString(4);


		// 生成随机字符串
		function generateRandomString(length: number): string {
			const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
			let str = '';
			for (let i = 0; i < length; i++) {
				str += chars.charAt(Math.floor(Math.random() * chars.length));
			}
			return str;
		}

		// 生成验证码图片
		function generateCaptchaImage(ctx: CanvasRenderingContext2D, text: string) {
			const fontSize = Math.min(props.width, props.height) / 2;

			// 绘制背景
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, props.width, props.height);

			// 绘制验证码
			ctx.font = `${fontSize}px Arial`;
			ctx.fillStyle = '#000000';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(text, props.width / 2, props.height / 2);
		}

		// 刷新验证码
		function refresh() {
			const canvas = canvasRef.value;
			if (canvas) {
				const ctx = canvas.getContext('2d');
				if (ctx) {
					captchaText = generateRandomString(4);
					generateCaptchaImage(ctx, captchaText);
				}
			}
		}


		function getCaptchaText() {
			return captchaText
		}

		function onMounted() {
			const canvas = canvasRef.value;
			if (canvas) {
				const ctx = canvas.getContext('2d');
				if (ctx) {
					generateCaptchaImage(ctx, captchaText);
				}
			}
		}

		return {
			canvasRef,
			refresh,
			onMounted,
			getCaptchaText,
		};
	},
	mounted() {
		this.onMounted();
	},
});
</script>


<!--

使用示例
<template>
	<div>
		<captcha :width="80" :height="80" ref="captchaRef"></captcha>
		<button @click="verify">验证</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Captcha from '@/components/login/CheckCode.vue';

export default defineComponent({
	components: {
		Captcha,
	},
	setup() {
		const captchaRef = ref<typeof Captcha | null>(null);

		// 验证验证码
		function verify() {
			const captcha = captchaRef.value;
			if (captcha) {
				// TODO: 做验证逻辑
				console.log('验证码为：', captcha.getCaptchaText());
			}
		}

		return {
			captchaRef,
			verify,
		};
	},
});
</script>


-->
