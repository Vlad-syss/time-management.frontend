'use client'

import { CategoryModal } from '@/components/modals/CategoryModal'
import { Button } from '@/components/ui/button'
import { useCategoryModal } from '@/hooks/useCategoryModal'
import { useCreateTaskModal } from '@/hooks/useCreateTaskModal'
import cn from 'classnames'
import { Plus } from 'lucide-react'
import { FC } from 'react'

interface AddTasksProps {
	wrap?: boolean
	kanban?: boolean
}

export const AddTasks: FC<AddTasksProps> = ({ kanban, wrap }) => {
	const { openModal: openTaskModal } = useCreateTaskModal()
	const {
		openModal: openCategoryModal,
		closeModal: closeCategoryModal,
		isOpen: isCategoryModalOpen,
	} = useCategoryModal()

	const handleConfirm = (category: string) => {
		console.log('Category:', category)
		closeCategoryModal()
		openTaskModal(category)
	}

	return (
		<>
			<div
				className={cn(
					'flex flex-col items-center justify-center w-full rounded-md border-[3px] gap-2 relative drop-shadow-xl border-gray-100 bg-gray-100/20 dark:bg-slate-600/20 dark:border-gray-300',
					kanban && 'min-h-[181px] py-2',
					wrap && 'py-0'
				)}
			>
				{kanban && (
					<>
						<Button
							variant='add'
							size='add'
							className='w-36 dark:bg-slate-500 dark:hover:bg-slate-500/70'
							onClick={openCategoryModal}
						>
							<Plus className='text-slate-600 dark:text-white w-7 h-7' />
						</Button>
						<span className='text-sm text-slate-600 dark:text-white font-semibold'>
							Add new category?
						</span>
					</>
				)}
				{wrap && (
					<Button
						variant='ghost'
						size='add'
						className='flex items-center gap-1 w-full text-sm text-slate-600 font-semibold dark:text-white hover:dark:bg-slate-400'
						onClick={() => openTaskModal()}
					>
						<Plus className='text-slate-600 w-7 h-7 dark:text-white' />
						Add new Task?
					</Button>
				)}
			</div>
			<CategoryModal
				isOpen={isCategoryModalOpen}
				onClose={closeCategoryModal}
				onConfirm={handleConfirm}
			/>
		</>
	)
}
