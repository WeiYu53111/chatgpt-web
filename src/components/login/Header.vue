<template>
	<NPageHeader subtitle="机必替">
		<template #title>
			<a
				href="https://anyway.fm/"
				style="text-decoration: none; color: inherit"
			>Anyway.FM</a>
		</template>
		<template #avatar>
			<NAvatar
				src="https://cdnimg103.lizhi.fm/user/2017/02/04/2583325032200238082_160x160.jpg"
			/>
		</template>
		<template #extra>
			<NSpace>
				<NButton>催更</NButton>
				<NDropdown :options="options" placement="bottom-start">
					<NButton :bordered="false" style="padding: 0 4px">
						···
					</NButton>
				</NDropdown>
			</NSpace>
		</template>
	</NPageHeader>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import { NPageHeader,NSpace,NButton,NDropdown,NAvatar } from 'naive-ui'

export default defineComponent({
	name: "Header",
	components: {
		NPageHeader,NSpace,NButton,NDropdown,NAvatar
	},
	setup () {
		const message = useMessage()
		return {
			handleBack () {
				message.info('[onBack]')
			},
			options: [
				{
					label: '催更',
					key: '1'
				},
				{
					label: '催更',
					key: '2'
				},
				{
					label: '催更',
					key: '3'
				}
			]
		}
	}
})
</script>
