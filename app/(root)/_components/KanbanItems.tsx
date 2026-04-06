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

	if (diff <= 0) return { label: 'Overdue', className: 'text-red-600 dark:text-red-400 font-bold' }
	if (hoursLeft <= 6) return { label: 'Due soon', className: 'text-amber-600 dark:text-amber-400 font-semibold' }
	if (hoursLeft <= 24) return { label: 'Today', className: 'text-yellow-600 dark:text-yellow-400' }
	return { label: '', className: 'text-slate-600 dark:text-blue-200' }
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
		borderColor: color,
		opacity: isDragging ? 0.4 : 1,
	}

	const deadline = useMemo(
		() => getDeadlineStatus(task.endTime),
		[task.endTime]
	)

	const startDate = new Date(task.startTime)
	const formattedStartTime = `${startDate.getDate()}-${startDate.getMonth() + 1}-${startDate.getFullYear()}`

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn(
				'flex flex-col w-full py-2 border-y-2 border-x-0 gap-2 min-h-[90px] relative group cursor-grab active:cursor-grabbing',
				{
					'opacity-75 bg-red-500/80 text-stone-100': task.status.isArchiving,
					'bg-transparent/10 hover:bg-white/20 dark:hover:bg-white/5':
						!task.status.isArchiving,
				}
			)}
		>
			<article className='flex flex-col justify-between h-full px-2'>
				<div className='flex items-start justify-between gap-1'>
					<button
						onClick={() => openTaskModal(task._id)}
						className='font-semibold text-[18px] text-left dark:text-blue-100 hover:underline cursor-pointer leading-tight'
					>
						{task.title}
					</button>
					{deadline.label && (
						<span
							className={cn(
								'text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap',
								deadline.className
							)}
						>
							{deadline.label}
						</span>
					)}
				</div>

				{task.description && (
					<p className='text-xs text-stone-600 dark:text-blue-200 italic truncate mt-1 max-w-[200px]'>
						{task.description}
					</p>
				)}

				<div className='text-xs text-stone-700 dark:text-blue-200 flex flex-col gap-0.5 mt-1'>
					<span className='flex items-center gap-1'>
						<Clock
							className={cn('w-3 h-3 text-slate-500', {
								'text-stone-100': task.status.isArchiving,
							})}
						/>
						<span className='font-medium'>{formattedStartTime}</span>
						<span className='mx-0.5'>-</span>
						<span className={cn('font-medium', deadline.className)}>
							{endTime}
						</span>
					</span>
				</div>
			</article>

			{/* Action buttons - visible on hover */}
			<div className='absolute right-1 top-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 dark:bg-slate-800/80 rounded p-0.5'>
				<Button
					className='w-6 h-6 hover:text-white hover:bg-transparent hover:scale-110 transition-transform'
					size='icon'
					title='edit'
					variant='ghost'
					onClick={(e) => {
						e.stopPropagation()
						openModal(task._id)
					}}
				>
					<SquarePen size={18} className='fill-gray-600/60' />
				</Button>
				<Button
					className='w-6 h-6 hover:text-white hover:bg-transparent hover:scale-110 transition-transform'
					size='icon'
					variant='ghost'
					title='archive'
					onClick={(e) => {
						e.stopPropagation()
						handleArchive(task._id)
					}}
				>
					<SquareX size={18} className='fill-red-600/60' />
				</Button>
				{!task.status.isArchiving && (
					<Button
						className='w-6 h-6 hover:text-white hover:bg-transparent hover:scale-110 transition-transform'
						size='icon'
						variant='ghost'
						title='complete'
						onClick={(e) => {
							e.stopPropagation()
							handleComplete(task._id)
						}}
					>
						<SquareCheck size={18} className='fill-green-600/60' />
					</Button>
				)}
			</div>
		</div>
	)
}
