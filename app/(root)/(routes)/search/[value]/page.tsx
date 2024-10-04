'use client'

import { WrapItems } from '@/app/(root)/_components/WrapItems'
import { ChangeTaskModal } from '@/components/modals/ChangeTaskModal'
import { ViewTaskModal } from '@/components/modals/ViewTaskModal'
import { useTaskContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import {
	useCategoriesWithColors,
	useChangeTaskModal,
	useTheme,
	useViewTaskModal,
} from '@/hooks'
import { useSearchTasks } from '@/hooks/useTasks'
import { AllTasks } from '@/types'
import { ArrowDown, Glasses } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const ResultsPage = () => {
	const { closeModal: closeTaskModal, isOpen: isOpenTaskModal } =
		useViewTaskModal()
	const { closeModal: closeUpdModal, isOpen: isUpdOpen } = useChangeTaskModal()
	const { theme } = useTheme()
	const [results, setResults] = useState<AllTasks>([])
	const pathname = usePathname()
	const segments = pathname.split('/')
	const searchValue = segments[segments.length - 1]?.replace(/-/g, ' ') || ''

	const { allCategories } = useTaskContext()
	const { data, isPending, isError, error, refetch } =
		useSearchTasks(searchValue)
	const categoriesWithColors = useCategoriesWithColors(allCategories, theme)

	const handleOnClose = () => {
		closeUpdModal()
		refetch()
	}

	useEffect(() => {
		if (data) {
			setResults(data)
		}
	}, [data])

	if (isPending) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Error: {error?.message || 'An error occurred'}</p>
	}

	return (
		<>
			<div className='py-3 flex flex-col gap-3'>
				<div className='flex w-full justify-between gap-2'>
					<h1 className='text-[38px] font-bold tracking-wide -mb-4'>
						Search Page!
					</h1>
					<div className='grid grid-cols-2 gap-x-1'>
						<p className='col-span-2 font-semibold text-lg'>sort by:</p>
						<Button
							variant='add'
							size='add'
							className='font-medium text-sm flex items-center justify-between px-3 gap-1 w-[100px] rounded-lg bg-orange-400  hover:bg-orange-500/80 text-white border-orange-400 dark:bg-slate-400 dark:border-slate-400 dark:hover:bg-slate-500/80'
						>
							date
							<ArrowDown className='w-3 h-3' />
						</Button>
						<Button
							variant='add'
							size='add'
							className='font-medium text-sm flex items-center justify-between px-2 w-[100px] rounded-lg bg-orange-400  hover:bg-orange-500/80 text-white border-orange-400 dark:bg-slate-400 dark:border-slate-400 dark:hover:bg-slate-500/80'
						>
							category
							<ArrowDown className='w-3 h-3' />
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
								/>
							</li>
						))}
					</ul>
				) : (
					<p className='text-[50px] flex flex-col items-center justify-center py-10 gap-2'>
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
