'use client'

import { WrapItems } from '@/app/(root)/_components/WrapItems'
import { ChangeTaskModal } from '@/components/modals/ChangeTaskModal'
import { ViewTaskModal } from '@/components/modals/ViewTaskModal'
import { useTaskContext } from '@/components/providers'
import { ResultPageSkeleton } from '@/components/skeletons'
import { Button } from '@/components/ui/button'
import {
	useCategoriesWithColors,
	useChangeTaskModal,
	useTheme,
	useViewTaskModal,
	useWidth,
} from '@/hooks'
import { useSearchTasks } from '@/hooks/useTasks'
import { AllTasks } from '@/types'
import cn from 'classnames'
import { ArrowDown, Glasses } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { MouseEventHandler, useEffect, useState } from 'react'

const ResultsPage = () => {
	const { theme } = useTheme()
	const [filters, setFilters] = useState({
		date: false,
		category: false,
	})
	const { closeModal: closeTaskModal, isOpen: isOpenTaskModal } =
		useViewTaskModal()
	const { closeModal: closeUpdModal, isOpen: isUpdOpen } = useChangeTaskModal()
	const [results, setResults] = useState<AllTasks>([])
	const pathname = usePathname()
	const segments = pathname.split('/')
	const searchValue = segments[segments.length - 1]?.replace(/-/g, ' ') || ''
	const width = useWidth()
	const isMobile = width < 945

	const { allCategories } = useTaskContext()
	const { data, isPending, isError, error, refetch } =
		useSearchTasks(searchValue)
	const categoriesWithColors = useCategoriesWithColors(allCategories, theme)

	const handleOnClose = () => {
		closeUpdModal()
		refetch()
	}

	const handleFilter: MouseEventHandler<HTMLButtonElement> = e => {
		const filterName = e.currentTarget.title as keyof typeof filters

		setFilters(prevFilters => ({
			...prevFilters,
			[filterName]: !prevFilters[filterName],
		}))

		if (filterName === 'date') {
			const sortedByDate = [...results].sort((a, b) => {
				return filters.date
					? new Date(a.endTime).getTime() - new Date(b.endTime).getTime()
					: new Date(b.endTime).getTime() - new Date(a.endTime).getTime()
			})
			setResults(sortedByDate)
		} else if (filterName === 'category') {
			const sortedByCategory = [...results].sort((a, b) => {
				return filters.category
					? a.category.name.localeCompare(b.category.name)
					: b.category.name.localeCompare(a.category.name)
			})
			setResults(sortedByCategory)
		}
	}

	useEffect(() => {
		if (data) {
			setResults(data)
		}
	}, [data])

	if (isPending) {
		return <ResultPageSkeleton />
	}

	if (isError) {
		return <p>Error: {error?.message || 'An error occurred'}</p>
	}

	return (
		<>
			<div
				className={cn('py-3 flex flex-col gap-3', {
					'pb-24 sm:pb-20': isMobile,
				})}
			>
				<div className='md:flex-row flex-col flex w-full justify-between gap-2'>
					<h1 className='text-[38px] mb-0 font-bold tracking-wide md:-mb-4'>
						Search Page!
					</h1>
					<div className='grid grid-cols-2 gap-x-1'>
						{width >= 768 && (
							<p className='col-span-2 font-semibold text-lg'>sort by:</p>
						)}
						<Button
							variant='add'
							size='add'
							className={cn(
								'font-medium text-sm flex items-center justify-between px-3 gap-1 md:w-[100px] rounded-lg bg-orange-400  hover:bg-orange-500/80 text-white border-orange-400 dark:bg-slate-400 dark:border-slate-400 dark:hover:bg-slate-500/80 w-full',
								filters.date && 'dark:bg-slate-500/80 bg-orange-500/80'
							)}
							title='date'
							onClick={handleFilter}
						>
							date
							<ArrowDown
								className={cn('w-3 h-3 transition-all', {
									'-rotate-180': filters.date,
								})}
							/>
						</Button>
						<Button
							variant='add'
							size='add'
							className={cn(
								'font-medium text-sm flex items-center justify-between px-3 gap-1 w-full md:w-[100px] rounded-lg bg-orange-400  hover:bg-orange-500/80 text-white border-orange-400 dark:bg-slate-400 dark:border-slate-400 dark:hover:bg-slate-500/80',
								filters.category && 'dark:bg-slate-500/80 bg-orange-500/80'
							)}
							onClick={handleFilter}
							title='category'
						>
							category
							<ArrowDown
								className={cn('w-3 h-3 transition-all', {
									'-rotate-180': filters.category,
								})}
							/>
						</Button>
					</div>
				</div>
				<p className='font-medium text-xs'>
					Search Results for{' '}
					<span className='text-sm tracking-wider font-bold'>
						"{searchValue}"
					</span>
				</p>
				{results.length > 0 ? (
					<ul className='grid gap-2'>
						{results.map(task => (
							<li key={task._id}>
								<WrapItems
									color={categoriesWithColors[task.category.name]}
									task={task}
									searchPage
									refetchSearch={refetch}
								/>
							</li>
						))}
					</ul>
				) : (
					<p className='text-[50px] flex flex-col items-center justify-center font-extrabold drop-shadow-lg py-10 gap-2'>
						No results found!
						<Glasses className='w-20 h-20' />
					</p>
				)}
			</div>
			<ChangeTaskModal isOpen={isUpdOpen} onClose={handleOnClose} />
			<ViewTaskModal isOpen={isOpenTaskModal} onClose={closeTaskModal} />
		</>
	)
}

export default ResultsPage
