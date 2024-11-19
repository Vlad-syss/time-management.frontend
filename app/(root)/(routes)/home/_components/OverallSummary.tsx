import { formatTime } from '@/components/utils/formmatTime'
import { Statistic } from '@/types'
import React from 'react'

interface Props {
	data: Pick<
		Statistic,
		| 'allCompleted'
		| 'allArchived'
		| 'averageTime'
		| 'bestDay'
		| 'longestTaskTime'
	>
}

const Card: React.FC<{
	title: string
	value: string | number
	icon: string
}> = ({ title, value, icon }) => (
	<div className='bg-orange-200/60 dark:bg-slate-700/60 shadow-md rounded-lg p-4 text-center'>
		<div className=' text-2xl md:text-4xl mb-2'>{icon}</div>
		<h3 className='md:text-lg font-semibold'>{title}</h3>
		<p className='text-lg md:text-2xl font-bold'>{value}</p>
	</div>
)

export const OverallSummary: React.FC<Props> = ({ data }) => (
	<div className='grid grid-cols-2 gap-3 md:gap-6 md:grid-cols-4'>
		<Card title='Tasks Completed' value={data.allCompleted} icon='✅' />
		<Card title='Tasks Archived' value={data.allArchived} icon='📂' />
		<Card title='Best Day' value={data.bestDay || 'none'} icon='⭐' />
		<Card
			title='Avg Time'
			value={`${formatTime(data.averageTime)}`}
			icon='⏱️'
		/>
		<Card
			title='Longest Task'
			value={`${formatTime(data.longestTaskTime)}`}
			icon='📈'
		/>
	</div>
)
