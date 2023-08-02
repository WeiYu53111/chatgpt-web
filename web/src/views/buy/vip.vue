<script setup lang="ts">
import VipPackage from "@/components/vip/VipPackage.vue";
//import {NDivider} from 'naive-ui'

const vipPackages = [
	{
		name: '基础',
		price: '￥9.9/包月',
		features: [
			{ text: '200次' },
			{ text: '不限次数' }
		]
	},
	{
		name: '进阶',
		price: '￥49.9/包月',
		features: [
			{ text: '200次' },
			{ text: '不限次数' }
		]
	},
	{
		name: '高级',
		price: '￥99.9/包月',
		features: [
			{ text: '200次' },
			{ text: '不限次数' }
		]
	},
];


</script>

<template>
<!--		<div class="flex justify-center items-center h-full flex-row flex-wrap">
			<VipPackage v-for="(data, index) in vipPackages" :key="index" :data="data" />
		</div>-->
	<div class="bg-slate-50 py-4 dark:bg-slate-900">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mx-auto max-w-4xl text-center">
				<h2
					class="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-200 sm:text-5xl"
				>
					Pricing plans
				</h2>
			</div>
			<div
				class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-4"
			>
				<VipPackage v-for="(data, index) in vipPackages" :key="index" :data="data" />
			</div>
		</div>
	</div>
</template>

<style scoped>
</style>
