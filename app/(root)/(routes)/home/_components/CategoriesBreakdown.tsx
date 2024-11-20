'use client'
import { formatTime } from '@/components/utils/formmatTime'
import { useWidth } from '@/hooks'
import { StatisticCategory } from '@/types/'
import React from 'react'

interface Props {
	categories: StatisticCategory[]
}

export const CategoriesBreakdown: React.FC<Props> = ({ categories }) => {
	const width = useWidth()
	const isMobile = width < 690
	return (
		<div className='bg-orange-200/80 dark:bg-slate-700/60 shadow-md rounded-lg  p-3 md:p-6'>
			<h3 className='text-xl md:text-2xl font-semibold mb-3 text-center md:text-left'>
				Task Categories
			</h3>
			<div className='overflow-x-auto'>
				<table className='table-auto w-full text-sm sm:text-base'>
					<thead>
						{!isMobile ? (
							<>
								<tr>
									<th className='px-2 sm:px-4 py-2 text-left'>Category</th>
									<th className='px-2 sm:px-4 py-2 text-left'>Task Count</th>
									<th className='px-2 sm:px-4 py-2 text-left'>Avg Time (ms)</th>
								</tr>
							</>
						) : (
							<>
								<tr>
									<th className='px-2 sm:px-4 py-2 text-left'>Category</th>
									<th className='flex w-full'>
										<p className='px-2 sm:px-4 py-2 text-left'>Task Count</p>
										<p className='px-2 sm:px-4 py-2 text-left'>Avg Time (ms)</p>
									</th>
								</tr>
							</>
						)}
					</thead>
					<tbody className='w-full'>
						{categories.length !== 0
							? categories.map(({ name, taskCount, averageTime }) => (
									<tr key={name} className='w-full  border-2 border-orange-500'>
										{!isMobile ? (
											<>
												<td className='border px-2 sm:px-4 py-2 border-orange-500 truncate w-40'>
													{name}
												</td>
												<td className='border px-2 sm:px-4 py-2 border-orange-500'>
													{taskCount}
												</td>
												<td className='border px-2 sm:px-4 py-2 border-orange-500'>
													{formatTime(averageTime)}
												</td>
											</>
										) : (
											<>
												<td className='border px-2 sm:px-4 py-2 border-orange-500'>
													{name}
												</td>
												<td className='flex flex-col w-full border-orange-500'>
													<p className='border-b px-2 sm:px-4 py-2 border-orange-500'>
														{taskCount}
													</p>
													<p className='border-t px-2 sm:px-4 py-2 border-orange-500'>
														{formatTime(averageTime)}
													</p>
												</td>
											</>
										)}
									</tr>
							  ))
							: Array.from({ length: 3 }).map((_, index) => (
									<tr key={index}>
										<td className='border px-2 sm:px-4 py-2 border-orange-500'>
											No categories yet
										</td>
										<td className='border px-2 sm:px-4 py-2 border-orange-500'>
											0
										</td>
										<td className='border px-2 sm:px-4 py-2 border-orange-500'>
											0
										</td>
									</tr>
							  ))}
					</tbody>
				</table>
			</div>
		</div>
	)
}
