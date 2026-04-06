import { formatTime } from '@/components/utils/formmatTime'
import { Statistic } from '@/types'
import React from 'react'

interface Props {
	data: Statistic
}

const Card: React.FC<{
	title: string
	value: string | number
	icon: React.ReactNode
}> = ({ title, value, icon }) => (
	<div className='glass-surface p-4 hover:shadow-card transition-shadow'>
		<div className='flex items-center gap-3'>
			<div className='w-10 h-10 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center shrink-0'>
				{icon}
			</div>
			<div className='min-w-0'>
				<p className='text-xs text-gray-500 dark:text-gray-400 truncate'>
					{title}
				</p>
				<p className='text-lg font-bold text-gray-900 dark:text-white truncate'>
					{value}
				</p>
			</div>
		</div>
	</div>
)

const ProgressRing: React.FC<{
	value: number
	label: string
	color: string
}> = ({ value, label, color }) => {
	const radius = 32
	const circumference = 2 * Math.PI * radius
	const offset = circumference - (value / 100) * circumference

	return (
		<div className='glass-surface p-4 flex flex-col items-center justify-center hover:shadow-card transition-shadow'>
			<svg width='80' height='80'>
				<circle
					cx='40'
					cy='40'
					r={radius}
					stroke='currentColor'
					strokeWidth='6'
					fill='none'
					className='text-gray-100 dark:text-white/5'
				/>
				<circle
					cx='40'
					cy='40'
					r={radius}
					strokeWidth='6'
					fill='none'
					stroke={color}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap='round'
					transform='rotate(-90 40 40)'
					style={{ transition: 'stroke-dashoffset 0.6s ease' }}
				/>
				<text
					x='40'
					y='40'
					textAnchor='middle'
					dominantBaseline='central'
					className='fill-gray-900 dark:fill-white text-sm font-bold'
				>
					{value}%
				</text>
			</svg>
			<p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>{label}</p>
		</div>
	)
}

export const OverallSummary: React.FC<Props> = ({ data }) => (
	<div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
		<ProgressRing
			value={data.productivityScore || 0}
			label='Productivity'
			color='#6366F1'
		/>
		<Card
			title='Current Streak'
			value={`${data.currentStreak || 0} day${data.currentStreak !== 1 ? 's' : ''}`}
			icon={<span className='text-xl'>🔥</span>}
		/>
		<ProgressRing
			value={data.completionRate || 0}
			label='Completion Rate'
			color='#10B981'
		/>
		<Card
			title='Tasks Completed'
			value={data.allCompleted}
			icon={<span className='text-xl'>✅</span>}
		/>
		<Card
			title='This Week'
			value={data.weeklyCompleted || 0}
			icon={<span className='text-xl'>📅</span>}
		/>
		<Card
			title='This Month'
			value={data.monthlyCompleted || 0}
			icon={<span className='text-xl'>📆</span>}
		/>
		<Card
			title='Best Day'
			value={data.bestDay || 'N/A'}
			icon={<span className='text-xl'>⭐</span>}
		/>
		<Card
			title='Avg Time'
			value={formatTime(data.averageTime)}
			icon={<span className='text-xl'>⏱️</span>}
		/>
	</div>
)
