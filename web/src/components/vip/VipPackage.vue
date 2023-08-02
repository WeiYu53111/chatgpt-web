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
