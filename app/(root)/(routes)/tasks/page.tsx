'use client'

import { ChangeTaskModal } from '@/components/modals/ChangeTaskModal'
import { CreateTaskModal } from '@/components/modals/CreateTaskModal'
import { ViewTaskModal } from '@/components/modals/ViewTaskModal'
import { Button } from '@/components/ui/button'
import { useChangeTaskModal, useViewTaskModal, useWidth } from '@/hooks'
import { useCreateTaskModal } from '@/hooks/useCreateTaskModal'
import { SelectedTypes } from '@/types'
import cn from 'classnames'
import { SquareKanban, WrapText } from 'lucide-react'
import { useState } from 'react'
import { Tasks } from '../../_components/Tasks'

const TasksPage = () => {
	const { closeModal, isOpen, openModal } = useCreateTaskModal()
	const { closeModal: closeTaskModal, isOpen: isOpenTaskModal } =
		useViewTaskModal()
	const { closeModal: closeUpdModal, isOpen: isUpdOpen } = useChangeTaskModal()
	const width = useWidth()
	const isMobile = width < 945

	const [selected, setSelected] = useState<SelectedTypes>({
		kanban: false,
		wrap: true,
	})

	const handleKanban = () => {
		setSelected({ kanban: true, wrap: false })
	}

	const handleWrap = () => {
		setSelected({ kanban: false, wrap: true })
	}

	return (
		<>
			<div
				className={cn('py-3 flex flex-col gap-3', {
					'pb-24 sm:pb-20': isMobile,
				})}
			>
				<div className='flex justify-between w-full items-start gap-3 pb-3 border-b-[3px] border-destructive/50 dark:border-slate-300/50'>
					<h4 className='text-[30px] md:text-[38px] font-bold tracking-wide'>
						Tasks!
					</h4>
					<div className='grid gap-2 grid-rows-2 grid-cols-3'>
						<Button
							variant='outline'
							size='lg'
							className='text-orange-700 hover:text-orange-100 hover:border-background col-span-full'
							onClick={() => openModal()}
						>
							Create new!
						</Button>
						<Button
							size='icon'
							variant='ghost'
							onClick={handleKanban}
							className={cn(
								'text-red-600 rounded-xl hover:text-orange-200 col-start-2 dark:text-stone-300 dark:hover:bg-slate-600',
								selected.kanban && 'text-orange-200 bg-accent dark:bg-slate-600'
							)}
						>
							<SquareKanban />
						</Button>
						<Button
							size='icon'
							variant='ghost'
							onClick={handleWrap}
							className={cn(
								'text-red-600 rounded-xl hover:text-orange-200 dark:text-stone-300 dark:hover:bg-slate-600',
								selected.wrap && 'text-orange-200 bg-accent dark:bg-slate-600'
							)}
						>
							<WrapText />
						</Button>
					</div>
				</div>
				<Tasks {...selected} />
			</div>
			<CreateTaskModal isOpen={isOpen} onClose={closeModal} />
			<ChangeTaskModal isOpen={isUpdOpen} onClose={closeUpdModal} />
			<ViewTaskModal isOpen={isOpenTaskModal} onClose={closeTaskModal} />
		</>
	)
}

export default TasksPage
