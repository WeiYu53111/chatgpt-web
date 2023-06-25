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


		<div class="flex justify-center items-center h-full flex-row flex-wrap">
			<VipPackage v-for="(data, index) in vipPackages" :key="index" :data="data" />
		</div>
</template>

<style scoped>
</style>
