'use client'
import { formatTime } from '@/components/utils/formmatTime'
import { StatisticCategory } from '@/types/'
import React from 'react'

interface Props {
	categories: StatisticCategory[]
}

export const CategoriesBreakdown: React.FC<Props> = ({ categories }) => {
	return (
		<div className='glass-surface p-4 md:p-6'>
			<h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
				Categories
			</h3>
			<div className='overflow-x-auto'>
				<table className='w-full text-sm'>
					<thead>
						<tr className='border-b border-gray-100 dark:border-white/5'>
							<th className='text-left py-2.5 px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
								Category
							</th>
							<th className='text-left py-2.5 px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
								Tasks
							</th>
							<th className='text-left py-2.5 px-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
								Avg Time
							</th>
						</tr>
					</thead>
					<tbody>
						{categories.length > 0
							? categories.map(({ name, taskCount, averageTime }) => (
									<tr
										key={name}
										className='border-b border-gray-50 dark:border-white/[0.03] hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors'
									>
										<td className='py-2.5 px-3 font-medium text-gray-900 dark:text-gray-100'>
											{name}
										</td>
										<td className='py-2.5 px-3 text-gray-600 dark:text-gray-400'>
											{taskCount}
										</td>
										<td className='py-2.5 px-3 text-gray-600 dark:text-gray-400'>
											{formatTime(averageTime)}
										</td>
									</tr>
							  ))
							: (
								<tr>
									<td
										colSpan={3}
										className='py-8 text-center text-gray-400 dark:text-gray-500'
									>
										No categories yet
									</td>
								</tr>
							)}
					</tbody>
				</table>
			</div>
		</div>
	)
}
