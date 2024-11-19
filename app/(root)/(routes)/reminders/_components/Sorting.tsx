'use client'

import { useReminderContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import cn from 'classnames'
import { ArrowUp01, ArrowUpAZ } from 'lucide-react'
import { useState } from 'react'

export const Sorting: React.FC = () => {
	const { sortReminders } = useReminderContext()
	const [isAZAscending, setIsAZAscending] = useState(false)
	const [isTimeAscending, setIsTimeAscending] = useState(false)

	const handleSortAlphabetical = () => {
		setIsAZAscending(!isAZAscending)
		sortReminders('alphabetical')
	}

	const handleSortTime = () => {
		setIsTimeAscending(!isTimeAscending)
		sortReminders('time')
	}

	return (
		<div className='flex items-center space-x-1'>
			<span className='font-semibold mr-2'>Sorts:</span>

			<Button
				onClick={handleSortAlphabetical}
				variant='secondary'
				className={cn(
					'flex items-center text-sm font-medium space-x-2 px-4 py-1 border-2 border-orange-500 dark:border-slate-400',
					{
						'dark:bg-slate-400/20 bg-orange-500/20  hover:bg-orange-500/50  dark:hover:bg-slate-400/50':
							!isAZAscending,
						'bg-orange-500 dark:bg-slate-400': isAZAscending,
					}
				)}
			>
				<span>By A-Z</span>
				<ArrowUpAZ
					className={cn('w-4 h-4 transform transition-transform duration-300', {
						'rotate-180': isAZAscending,
						'rotate-0': !isAZAscending,
					})}
				/>
			</Button>

			<Button
				onClick={handleSortTime}
				variant='secondary'
				className={cn(
					'flex items-center text-sm font-medium space-x-2 px-4 py-1 border-2 border-orange-500 dark:border-slate-400',
					{
						'dark:bg-slate-400/20 bg-orange-500/20  hover:bg-orange-500/50  dark:hover:bg-slate-400/50':
							!isTimeAscending,
						'bg-orange-500 dark:bg-slate-400': isTimeAscending,
					}
				)}
			>
				<span>By Time</span>
				<ArrowUp01
					className={cn('w-4 h-4 transform transition-transform duration-300', {
						'rotate-180': isTimeAscending,
						'rotate-0': !isTimeAscending,
					})}
				/>
			</Button>
		</div>
	)
}
