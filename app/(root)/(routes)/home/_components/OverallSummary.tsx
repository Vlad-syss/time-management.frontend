import { formatTime } from '@/components/utils/formmatTime'
import { Statistic } from '@/types'
import React from 'react'

interface Props {
	data: Statistic
}

const Card: React.FC<{
	title: string
	value: string | number
	icon: string
	accent?: string
}> = ({ title, value, icon, accent }) => (
	<div
		className={`${
			accent || 'bg-orange-200/60 dark:bg-slate-700/60'
		} shadow-md rounded-lg p-3 md:p-4 text-center`}
	>
		<div className='text-2xl md:text-4xl mb-1 md:mb-2'>{icon}</div>
		<h3 className='text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-300'>
			{title}
		</h3>
		<p className='text-lg md:text-2xl font-bold'>{value}</p>
	</div>
)

const ProgressRing: React.FC<{ value: number; label: string }> = ({
	value,
	label,
}) => {
	const radius = 40
	const circumference = 2 * Math.PI * radius
	const offset = circumference - (value / 100) * circumference

	return (
		<div className='bg-orange-200/60 dark:bg-slate-700/60 shadow-md rounded-lg p-3 md:p-4 flex flex-col items-center justify-center'>
			<svg width='100' height='100' className='mb-1'>
				<circle
					cx='50'
					cy='50'
					r={radius}
					stroke='currentColor'
					strokeWidth='8'
					fill='none'
					className='text-orange-100 dark:text-slate-600'
				/>
				<circle
					cx='50'
					cy='50'
					r={radius}
					stroke='currentColor'
					strokeWidth='8'
					fill='none'
					className='text-orange-500 dark:text-emerald-400'
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap='round'
					transform='rotate(-90 50 50)'
					style={{ transition: 'stroke-dashoffset 0.6s ease' }}
				/>
				<text
					x='50'
					y='50'
					textAnchor='middle'
					dominantBaseline='central'
					className='fill-current text-lg font-bold'
				>
					{value}%
				</text>
			</svg>
			<h3 className='text-xs md:text-sm font-semibold text-slate-600 dark:text-slate-300'>
				{label}
			</h3>
		</div>
	)
}

export const OverallSummary: React.FC<Props> = ({ data }) => (
	<div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4'>
		<ProgressRing value={data.productivityScore || 0} label='Productivity' />
		<Card
			title='Current Streak'
			value={`${data.currentStreak || 0} day${data.currentStreak !== 1 ? 's' : ''}`}
			icon='🔥'
			accent='bg-amber-200/60 dark:bg-slate-700/60'
		/>
		<ProgressRing
			value={data.completionRate || 0}
			label='Completion Rate'
		/>
		<Card title='Tasks Completed' value={data.allCompleted} icon='✅' />
		<Card title='This Week' value={data.weeklyCompleted || 0} icon='📅' />
		<Card title='This Month' value={data.monthlyCompleted || 0} icon='📆' />
		<Card title='Best Day' value={data.bestDay || 'N/A'} icon='⭐' />
		<Card
			title='Avg Time'
			value={formatTime(data.averageTime)}
			icon='⏱️'
		/>
	</div>
)
