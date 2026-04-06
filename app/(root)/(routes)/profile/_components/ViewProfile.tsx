'use client'

import { useGetStatistic } from '@/hooks/useStatistic'
import { User } from '@/types'

export const ViewProfile = (data: User) => {
	const { data: stats } = useGetStatistic()

	return (
		<div className='w-full flex flex-col gap-4'>
			<div className='w-full bg-orange-100 dark:bg-gray-800 shadow-lg rounded-lg p-3 sm:p-6'>
				<h4 className='text-lg sm:text-xl font-bold mb-4'>
					Profile Information
				</h4>
				<ul className='space-y-3'>
					<li className='flex flex-col sm:flex-row justify-between'>
						<span className='font-semibold'>Email:</span>
						<span>{data.email}</span>
					</li>
					<li className='flex flex-col sm:flex-row justify-between'>
						<span className='font-semibold'>Joined:</span>
						<span>{new Date(data.createdAt).toLocaleDateString()}</span>
					</li>
					<li className='flex flex-col sm:flex-row justify-between'>
						<span className='font-semibold'>Last Updated:</span>
						<span>{new Date(data.updatedAt).toLocaleDateString()}</span>
					</li>
					<li className='flex flex-col sm:flex-row justify-between'>
						<span className='font-semibold'>Description:</span>
						<span>{data.description || 'No description available.'}</span>
					</li>
				</ul>
			</div>

			{stats && (
				<div className='w-full bg-orange-100 dark:bg-gray-800 shadow-lg rounded-lg p-3 sm:p-6'>
					<h4 className='text-lg sm:text-xl font-bold mb-4'>
						Activity Overview
					</h4>
					<div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
						<StatCard
							label='Completed'
							value={stats.allCompleted}
							icon='✅'
						/>
						<StatCard
							label='Streak'
							value={`${stats.currentStreak || 0}d`}
							icon='🔥'
						/>
						<StatCard
							label='Score'
							value={`${stats.productivityScore || 0}%`}
							icon='💪'
						/>
						<StatCard
							label='On Time'
							value={`${stats.completedOnTime || 0}`}
							icon='⏰'
						/>
					</div>
				</div>
			)}
		</div>
	)
}

const StatCard = ({
	label,
	value,
	icon,
}: {
	label: string
	value: string | number
	icon: string
}) => (
	<div className='bg-orange-200/60 dark:bg-slate-700/60 rounded-lg p-3 text-center'>
		<div className='text-xl mb-1'>{icon}</div>
		<p className='text-lg font-bold'>{value}</p>
		<p className='text-xs text-slate-600 dark:text-slate-400'>{label}</p>
	</div>
)
