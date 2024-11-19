'use client'
import { useReminderContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import cn from 'classnames'

export const Filters: React.FC = () => {
	const { filterReminders, activeFilters } = useReminderContext()

	return (
		<div className='flex items-center space-x-1 md:pr-2 md:border-r-2 border-orange-500 dark:border-slate-100'>
			<span className='font-semibold mr-2'>Filters:</span>
			<Button
				variant='secondary'
				className={cn(
					'px-4 py-1 text-sm font-medium border-2 border-orange-500 dark:border-slate-400 ',
					{
						'dark:bg-slate-400/20 bg-orange-500/20  hover:bg-orange-500/50  dark:hover:bg-slate-400/50':
							!activeFilters.ongoing,
						'bg-orange-500 dark:bg-slate-400': activeFilters.ongoing,
					}
				)}
				onClick={() => filterReminders('ongoing')}
			>
				On goings
			</Button>
			<Button
				variant='secondary'
				className={cn(
					'px-4 py-1 text-sm font-medium border-2 border-orange-500 dark:border-slate-400',
					{
						'bg-orange-500 dark:bg-slate-400': activeFilters.expired,
						'dark:bg-slate-400/20 bg-orange-500/20 hover:bg-orange-500/50 dark:hover:bg-slate-400/50':
							!activeFilters.expired,
					}
				)}
				onClick={() => filterReminders('expired')}
			>
				Expireds
			</Button>
		</div>
	)
}
