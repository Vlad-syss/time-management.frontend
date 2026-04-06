'use client'

import { useTaskContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { useChangeTaskModal, useConvertTime, useViewTaskModal } from '@/hooks'
import { Task } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'
import { Clock, SquareCheck, SquarePen, SquareX } from 'lucide-react'
import { FC, useMemo } from 'react'

interface KanbanItemProps {
	task: Task
	color: string
}

const getDeadlineStatus = (endTime: string) => {
	const now = new Date().getTime()
	const end = new Date(endTime).getTime()
	const diff = end - now
	const hoursLeft = diff / (1000 * 60 * 60)

	if (diff <= 0) return { label: 'Overdue', className: 'text-red-500 bg-red-50 dark:bg-red-500/10' }
	if (hoursLeft <= 6) return { label: 'Soon', className: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10' }
	if (hoursLeft <= 24) return { label: 'Today', className: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' }
	return { label: '', className: '' }
}

export const KanbanItems: FC<KanbanItemProps> = ({ task, color }) => {
	const endTime = useConvertTime(task.endTime)
	const { openModal } = useChangeTaskModal()
	const { openModal: openTaskModal } = useViewTaskModal()
	const { handleArchive, handleComplete } = useTaskContext()

	const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
		useSortable({ id: task._id })

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
		opacity: isDragging ? 0.4 : 1,
	}

	const deadline = useMemo(
		() => getDeadlineStatus(task.endTime),
		[task.endTime]
	)

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn(
				'flex flex-col px-3 py-2.5 border-b border-gray-50 dark:border-white/[0.03] relative group cursor-grab active:cursor-grabbing hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors',
				{
					'bg-red-50/50 dark:bg-red-500/5': task.status.isArchiving,
				}
			)}
		>
			<div className='flex items-start justify-between gap-2'>
				<div className='flex items-start gap-2 min-w-0'>
					<div
						className='w-1 h-8 rounded-full shrink-0 mt-0.5'
						style={{ backgroundColor: color }}
					/>
					<div className='min-w-0'>
						<button
							onClick={() => openTaskModal(task._id)}
							className='text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-indigo-500 dark:hover:text-indigo-400 text-left leading-tight cursor-pointer truncate block max-w-[180px]'
						>
							{task.title}
						</button>
						{task.description && (
							<p className='text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5 max-w-[160px]'>
								{task.description}
							</p>
						)}
					</div>
				</div>

				{deadline.label && (
					<span
						className={cn(
							'text-[10px] font-medium px-1.5 py-0.5 rounded shrink-0',
							deadline.className
						)}
					>
						{deadline.label}
					</span>
				)}
			</div>

			<div className='flex items-center gap-1 mt-1.5 ml-3'>
				<Clock className='w-3 h-3 text-gray-300 dark:text-gray-600' />
				<span className='text-[11px] text-gray-400 dark:text-gray-500'>
					{endTime}
				</span>
			</div>

			{/* Hover actions */}
			<div className='absolute right-2 top-2 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity'>
				<Button
					variant='ghost'
					size='icon'
					className='w-6 h-6'
					title='edit'
					onClick={(e) => { e.stopPropagation(); openModal(task._id) }}
				>
					<SquarePen className='w-3.5 h-3.5 text-gray-400' />
				</Button>
				<Button
					variant='ghost'
					size='icon'
					className='w-6 h-6'
					title='archive'
					onClick={(e) => { e.stopPropagation(); handleArchive(task._id) }}
				>
					<SquareX className='w-3.5 h-3.5 text-red-400' />
				</Button>
				{!task.status.isArchiving && (
					<Button
						variant='ghost'
						size='icon'
						className='w-6 h-6'
						title='complete'
						onClick={(e) => { e.stopPropagation(); handleComplete(task._id) }}
					>
						<SquareCheck className='w-3.5 h-3.5 text-emerald-500' />
					</Button>
				)}
			</div>
		</div>
	)
}
