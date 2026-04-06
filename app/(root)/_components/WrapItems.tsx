'use client'

import { ConfirmModal } from '@/components/modals/ConfirmModal'
import { useTaskContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import {
	useChangeTaskModal,
	useConfirmModal,
	useConvertTime,
	useViewTaskModal,
} from '@/hooks'
import { Task } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'
import {
	ArchiveRestore,
	GripVertical,
	SquareCheck,
	SquarePen,
	SquareX,
	Trash,
} from 'lucide-react'

interface SortableItemProps {
	task: Task
	color: string
	searchPage?: boolean
	refetchSearch?: any
	trashPage?: boolean
}

export const WrapItems: React.FC<SortableItemProps> = ({
	task,
	color,
	searchPage,
	refetchSearch,
	trashPage,
}) => {
	const { isOpen, openModal: openDeleteModal, closeModal } = useConfirmModal()
	const { openModal: openEditModal } = useChangeTaskModal()
	const { openModal: openViewModal } = useViewTaskModal()
	const { handleArchive, handleComplete, handleDelete, handleUpdate } =
		useTaskContext()
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: task._id })
	const formattedTime = useConvertTime(task.endTime)

	const styleSheet: React.CSSProperties = {
		transform: CSS.Translate.toString(transform),
		transition,
	}

	const isArchivingOrCompleted =
		task.status.isArchiving || task.status.completed
	const isTaskArchived = task.status.archived
	const isTaskCompleted = task.status.completed

	const onConfirmDelete = async () => {
		closeModal()
		await handleDelete(task._id)
		if (refetchSearch) await refetchSearch()
	}

	const onHandleComplete = async (id: string) => {
		await handleComplete(id)
		if (refetchSearch) await refetchSearch()
	}
	const onHandleArchive = async (id: string) => {
		await handleArchive(id)
		if (trashPage) {
			const tomorrow = new Date()
			tomorrow.setDate(tomorrow.getDate() + 1)
			handleUpdate(id, { startTime: new Date(), endTime: tomorrow })
		}
		if (refetchSearch) await refetchSearch()
	}

	return (
		<>
			<div
				ref={setNodeRef}
				className={cn(
					'flex w-full py-2.5 md:py-3 rounded-xl border gap-2 md:gap-3 pr-2 md:pr-3 relative overflow-hidden glass-surface hover:shadow-card transition-all group',
					isTaskArchived && 'border-red-200 dark:border-red-500/20 bg-red-50/50 dark:bg-red-500/5',
					isTaskCompleted && 'border-emerald-200 dark:border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5',
					!isTaskArchived && !isTaskCompleted && 'border-gray-200 dark:border-white/[0.08]',
					searchPage && 'pr-2 pl-2 md:pl-3'
				)}
				style={styleSheet}
			>
				{!isArchivingOrCompleted && !searchPage && !trashPage && (
					<Button
						{...listeners}
						{...attributes}
						size='icon'
						variant='ghost'
						className='text-gray-300 dark:text-gray-600 hover:text-gray-500 cursor-grab w-5 h-full rounded-none'
					>
						<GripVertical className='w-4 h-4' />
					</Button>
				)}

				{/* Color bar */}
				<div
					className='w-1 self-stretch rounded-full shrink-0'
					style={{ backgroundColor: color }}
				/>

				<div className='flex flex-col flex-auto leading-tight min-w-0'>
					<button
						className='text-sm md:text-base font-semibold text-left text-gray-900 dark:text-gray-100 hover:text-indigo-500 dark:hover:text-indigo-400 cursor-pointer truncate'
						onClick={() => openViewModal(task._id)}
					>
						{task.title}
					</button>
					<p className='text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5'>
						{task.description}
					</p>
					<div className='flex items-center gap-2 mt-1.5 text-xs text-gray-400 dark:text-gray-500'>
						<span>
							{task.category.name}
						</span>
						<span className='w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600' />
						{isTaskCompleted ? (
							<span className='text-emerald-500 font-medium'>Completed</span>
						) : isTaskArchived ? (
							<span className='text-red-500 font-medium'>Archived</span>
						) : task.status.isArchiving ? (
							<span className='text-red-400 font-medium'>Expired</span>
						) : (
							<span>{formattedTime}</span>
						)}
					</div>
				</div>

				<div className='flex items-center gap-0.5 shrink-0'>
					{!isTaskCompleted && !isTaskArchived && (
						<>
							<Button variant='ghost' size='icon' className='w-7 h-7 opacity-0 group-hover:opacity-100' title='edit' onClick={() => openEditModal(task._id)}>
								<SquarePen className='w-4 h-4 text-gray-400' />
							</Button>
							<Button variant='ghost' size='icon' className='w-7 h-7 opacity-0 group-hover:opacity-100' title='archive' onClick={() => (searchPage ? onHandleArchive : handleArchive)(task._id)}>
								<SquareX className='w-4 h-4 text-red-400' />
							</Button>
							{!task.status.isArchiving && (
								<Button variant='ghost' size='icon' className='w-7 h-7 opacity-0 group-hover:opacity-100' title='complete' onClick={() => (searchPage ? onHandleComplete : handleComplete)(task._id)}>
									<SquareCheck className='w-4 h-4 text-emerald-500' />
								</Button>
							)}
						</>
					)}
					{(isTaskArchived || isTaskCompleted) && (
						<Button variant='ghost' size='icon' className='w-7 h-7' title='delete' onClick={openDeleteModal}>
							<Trash className='w-4 h-4 text-red-400' />
						</Button>
					)}
					{isTaskArchived && trashPage && (
						<Button variant='ghost' size='icon' className='w-7 h-7' title='restore' onClick={() => onHandleArchive(task._id)}>
							<ArchiveRestore className='w-4 h-4 text-indigo-400' />
						</Button>
					)}
				</div>

				{/* Status indicator */}
				{(isTaskCompleted || isTaskArchived) && (
					<div
						className={cn(
							'absolute right-0 top-0 bottom-0 w-1',
							isTaskCompleted ? 'bg-emerald-500' : 'bg-red-500'
						)}
					/>
				)}
			</div>

			<ConfirmModal
				isOpen={isOpen}
				onClose={closeModal}
				onConfirm={onConfirmDelete}
				message='This will permanently delete the task. Continue?'
			/>
		</>
	)
}
