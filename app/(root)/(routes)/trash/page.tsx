'use client'

import { ViewTaskModal } from '@/components/modals/ViewTaskModal'
import { useArchivedTaskContext } from '@/components/providers'
import { WrapTaskSkeleton } from '@/components/skeletons'
import {
	useCategoriesWithColors,
	useTheme,
	useViewTaskModal,
	useWidth,
} from '@/hooks'
import cn from 'classnames'
import { Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { WrapItems } from '../../_components/WrapItems'
import { Banner } from './_components/Banner'

const TrashPage = () => {
	const { theme } = useTheme()
	const { closeModal: closeTaskModal, isOpen: isOpenTaskModal } =
		useViewTaskModal()
	const { categories, isPending, tasks, refetch } = useArchivedTaskContext()
	const categoriesWithColors = useCategoriesWithColors(categories, theme)
	const width = useWidth()
	const isMobile = width < 945

	useEffect(() => {
		refetch()
	}, [])

	if (isPending) {
		return <WrapTaskSkeleton />
	}
	return (
		<>
			<Banner />
			<div
				className={cn('py-6 flex flex-col gap-3', {
					'pb-24 sm:pb-20': isMobile,
				})}
			>
				<h4 className='text-[30px] md:text-[38px] font-bold tracking-wide'>
					Trash Can!
				</h4>
				{tasks.length > 0 ? (
					<ul className='grid gap-2'>
						{tasks.map(task => (
							<li key={task._id}>
								<WrapItems
									color={categoriesWithColors[task.category.name]}
									task={task}
									refetchSearch={refetch}
									trashPage
								/>
							</li>
						))}
					</ul>
				) : (
					<p className='text-[30px] flex flex-col items-center justify-center font-extrabold drop-shadow-lg py-10 gap-2'>
						Trash is empty!
						<Trash2 className='w-20 h-20' />
					</p>
				)}
			</div>
			<ViewTaskModal isOpen={isOpenTaskModal} onClose={closeTaskModal} />
		</>
	)
}

export default TrashPage
