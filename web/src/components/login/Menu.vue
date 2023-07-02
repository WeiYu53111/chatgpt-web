<script setup lang="ts">

import {router} from "@/router";
import { useTheme } from '@/hooks/useTheme'
import {NIcon} from "naive-ui";
import {BatteryCharging, Home} from "@vicons/ionicons5";
const { theme, themeOverrides } = useTheme()

function goto(path:string) {
	router.push(path)
}

</script>

<template>
<div class="menu">
	<div class="menu-body" :class="[theme ? 'el-body-dark' : 'el-body-white']">
		<div class="option-box">
			<div class="menu-option" @click="goto('admin')">
				<div class="menu-icon">
					<NIcon :component="Home" :depth="1" class="cursor-pointer" size="45" @click="goto('vip')"></NIcon>
				</div>
				<span class="menu-name">个人中心</span>
			</div>
			<div class="menu-option" @click="goto('admin')">
				<div class="menu-icon">
					<NIcon :component="BatteryCharging" :depth="1" class="cursor-pointer" size="45" @click="goto('vip')"></NIcon>
				</div>
				<span class="menu-name">冲冲冲</span>
			</div>
			<div class="menu-option" @click="goto('admin')">
				<div class="menu-icon">
					<NIcon :component="BatteryCharging" :depth="1" class="cursor-pointer" size="45" @click="goto('vip')"></NIcon>
				</div>
				<span class="menu-name">冲冲冲</span>
			</div>
<!--			<div class="menu-option"></div>
			<div class="menu-option"></div>-->
		</div>
	</div>
	<div class="menu-tail" :class="[theme ? 'el-tail-dark' : 'el-tail-white']"></div>
</div>


</template>

<style scoped>

.menu {
	position: relative;
	background: #fafafa;

}
/*
bg-[#F4F6F8]   dark:bg-[#1E1E20]*/

.el-body-white {
	background:  #F4F6F8;
	box-shadow: 2px 2px 1px  rgba(0, 0, 0, 0.3), -2px -2px 1px  rgba(0, 0, 0, 0.3);
}

.el-body-dark {
	background: #1E1E20;
	box-shadow: 2px 2px 4px  rgba(255, 255, 255, 0.25), -2px -2px 4px  rgba(255, 255, 255, 0.25);
}

.el-tail-white {
	background:  #F4F6F8;
	box-shadow: 2px 2px 2px  rgba(0, 0, 0,4), -2px -2px 2px  rgba(0, 0, 0, 4);
}

.el-tail-dark {
	background: #1E1E20;
	box-shadow: 2px 2px 2px  rgba(255, 255, 255, 0.4), -2px -2px 2px  rgba(255, 255, 255, 0.4);
}



.menu-body {

	position: absolute;
	top: 0px;
	//width: 300px;
	min-width: 300px;
	height: 90px;
	z-index: 2;
	border-radius: 8px;
}

.menu-tail {
	position: absolute;
	top: 79px;
	left: 13px;
	width: 20px;
	height: 20px;
	clip-path: polygon(100% 0%, 0% 100%, 100% 100%);
	transform: rotate(45deg);
	z-index: 3;
}

.option-box {
	height: 80px;
	align-items: center;
	z-index: 5;
	position: relative;
	display: flex;
	flex-flow: row;
	//justify-content: space-evenly;
}

.menu-option {
	position: relative;
	cursor: pointer;
	height: 60px;
	width: 45px;
	margin: 0 10px;

}

.menu-icon {
	height: 45px;
	width: 45px;
	position: absolute;
	top: 0;
}

.menu-name {
	width: 45px;
	height: 15px;
	position: absolute;
	bottom: 0;
	font-weight: 50;
	font-size: 5px;
	text-align: center;
	line-height: 15px;
}



</style>
