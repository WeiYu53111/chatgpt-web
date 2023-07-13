<template>
	<div class="mb-6">
		<NTag size="large"> 用户今日访问情况 </NTag>
	</div>
	<NSpace :size="12" vertical>
		<NDataTable
			ref="table"
			:columns="columns"
			:data="tableData"
			:pagination="pagination"
		/>
	</NSpace>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {NButton,NTag,NSpace,NDataTable} from "naive-ui";
import {getAllUserData, UserData} from "@/api/user"
const columns = [
	{
		title: '账号',
		key: 'email',
		//defaultSortOrder: 'ascend',
		/*defaultSortOrder: 'ascend',
		sorter: 'default'*/
	},
	{
		title: '注册时间',
		key: 'create_time',
		/*defaultSortOrder: 'ascend',
		sorter: 'default'*/
	},
	{
		title: '最后登录时间',
		key: 'last_login_time',
		/*defaultSortOrder: 'ascend',
		sorter: 'default'*/
	},
	{
		title: '今日已提问次数',
		key: 'usage',
		/*defaultSortOrder: 'ascend',
		sorter: 'default'*/
	},
	{
		title: '可用额度',
		key: 'limit',
		/*defaultSortOrder: 'ascend',
		sorter: 'default'*/
	},
]

export default defineComponent({
	components:{
		NButton,NSpace,NDataTable,NTag
	},
	setup () {
		const tableRef = ref(null)
		const tmpdata : UserData[]  = []
		const tableData = ref(tmpdata);
		async function initData(){
			const originData = await getAllUserData();
			for (let i = 0; i < originData.length; i++) {
				const one = originData[i]
				tableData.value.push({
					email: one.email,
					create_time: one.create_time,
					last_login_time : one.last_login_time,
					usage: one.usage,
					limit: one.limit
				})
			}
		}
		initData()

		return {
			table: tableRef,
			tableData,
			columns,
			pagination: { pageSize: 10 }
		}
	}
})
</script>
