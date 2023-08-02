<style scoped>
.vip-set {
	position: relative;
	width: 300px;
	height: 400px;
}

.vip-set-info {
	position: absolute;
	top: 20px;
	left: 10px;
	right: 10px;
	bottom: 20px;
	border-radius: 6px;
	box-shadow: 1px 2px 2px rgb(0, 0, 0, 0.3), 0 -1px 2px rgb(0, 0, 0, 0.3);
}

.set_info_name {
	position: absolute;
	top: 25px;
	left: 15px;
	font-size: 15px;
	font-weight: bold;
	color: black;
	border-radius: 5px;
}

.price_box {
	position: absolute;
	top: 75px;
	left: 15px;
	text-align: left;
}

.set_info_price {
	position: relative;
	top: 1px;
	left: -1px;
	font-size: 30px;
	font-weight: bold;
	color: black;
}


.buy {
	position: absolute;
	bottom: 20px;
	height: 38px;
	background: #4f46e5;
	left: 15px;
	right: 15px;
	border-radius: 10px;
}

.divider {
	position: absolute;
	width: 250px;
	left: 15px;
	right: 15px;
	top: 110px;
}


.set_info_content {
	position: absolute;
	top: 150px;
	left: 15px;
}

.li_icon {
	display: inline-block;
	width: 20px;
	height: 24px;
}

.li_text {
	margin-left: 15px;
	font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
	font-size: 11px;
	text-align: left;
	color: #999999;
	line-height: 25px;
}

</style>

<template>
<!--	<div class="vip-set second-set">
		<div class="vip-set-info">
			<span class="set_info_name">{{ data.name }}</span>
			<div class="price_box">
				<span class="set_info_price">{{ data.price }}</span>
			</div>
			<NDivider class="divider"/>
			<div class="set_info_content">
				<ol>
					<li v-for="(feature, index) in data.features" :key="index">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#4f46e5" aria-hidden="true"
								 class="li_icon">
							<path fill-rule="evenodd"
										d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
										clip-rule="evenodd"></path>
						</svg>
						<span class="li_text">{{ feature.text }}</span>
					</li>
				</ol>
			</div>
			<button class="buy">购买</button>
		</div>
	</div>-->
	<div>
		<div class="flex items-center justify-between gap-x-4">
			<h3 id="tier-starter" class="text-lg font-semibold leading-8">
				Starter
			</h3>
			<p
				class="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600"
			>
				✨ Free trial
			</p>
		</div>
		<p class="mt-6 flex items-baseline gap-x-1">
			<span class="text-5xl font-bold tracking-tight">${{ data.price }}</span>
			<span
				class="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-400"
			>/month</span
			>
		</p>
		<ul
			role="list"
			class="mt-8 space-y-3 text-sm leading-6 text-slate-700 dark:text-slate-400"
		>
			<li class="flex gap-x-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-5 flex-none text-blue-600"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
					<path d="M9 12l2 2l4 -4"></path>
				</svg>
				7-day free trial
			</li>
			<li class="flex gap-x-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-5 flex-none text-blue-600"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
					<path d="M9 12l2 2l4 -4"></path>
				</svg>
				1,000 tokens per month
			</li>
			<li class="flex gap-x-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-5 flex-none text-blue-600"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
					<path d="M9 12l2 2l4 -4"></path>
				</svg>
				1 chatbot
			</li>
			<li class="flex gap-x-3">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-5 flex-none text-blue-600"
					viewBox="0 0 24 24"
					stroke-width="2"
					stroke="currentColor"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
					<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
					<path d="M9 12l2 2l4 -4"></path>
				</svg>
				20 stored chats
			</li>
		</ul>
	</div>
	<a
		href=""
		aria-describedby="tier-starter"
		class="mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 text-blue-600 ring-1 ring-inset ring-blue-600 hover:bg-blue-600 hover:text-blue-50"
	>Buy plan</a
	>
</template>

<script setup lang="ts">

import {NDivider} from 'naive-ui';

interface VipPackage {
	name: string;
	price: string;
	features: { text: string }[];
}

interface Props {
	data: VipPackage;
}

const props = defineProps<Props>();
const data = props.data;
</script>
