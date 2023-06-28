<template>
	<div class="mb-6">
		<NTag size="large"> 用户历史访问情况 </NTag>
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
import {NButton,NSpace,NDataTable} from "naive-ui";
import {getAllUserHisData, UserHisData} from "@/api/user"
const columns = [
	{
		title: '日期',
		key: 'squad_date',
		/*defaultSortOrder: 'ascend',
		sorter: 'default'*/
	},
	{
		title: '账号',
		key: 'email',
		//defaultSortOrder: 'ascend',
		/*defaultSortOrder: 'ascend',
		sorter: 'default'*/
	},
	{
		title: '提问次数',
		key: 'usage',
		/*defaultSortOrder: 'ascend',
		sorter: 'default'*/
	}
]

export default defineComponent({
	components:{
		NButton,NSpace,NDataTable
	},
	setup () {
		const tableRef = ref(null)
		const tmpdata : UserHisData[]  = []
		const tableData = ref(tmpdata);
		async function initData(){
			const originData = await getAllUserHisData();
			for (let i = 0; i < originData.length; i++) {
				const one = originData[i]
				tableData.value.push({
					squad_date: one.squad_date,
					email: one.email,
					usage: one.usage,
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
