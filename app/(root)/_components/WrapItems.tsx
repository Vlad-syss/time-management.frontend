'use client'

import { useTaskContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { useChangeTaskModal, useConvertTime, useViewTaskModal } from '@/hooks'
import { Task } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'
import { GripVertical, SquareCheck, SquarePen, SquareX } from 'lucide-react'
import style from './root.module.scss'

interface SortableItemProps {
	task: Task
	color: string
}

export const WrapItems: React.FC<SortableItemProps> = ({ task, color }) => {
	const tastTime = useConvertTime(task.endTime)
	const { openModal } = useChangeTaskModal()
	const { openModal: openTaskModal } = useViewTaskModal()
	const { handleArchive, handleComplete } = useTaskContext()
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: task._id,
		})

	const styleSheet = {
		transform: CSS.Translate.toString(transform),
		backgroundColor: `${color}30`,
		borderColor: color,
		transition,
	}

	const handleChange = () => {
		openModal(task._id)
	}

	return (
		<div
			className={cn(
				'flex w-full py-2 rounded-md border-[3px] gap-2 pr-2',
				task.status.isArchiving && style.isArchiving
			)}
			ref={setNodeRef}
			style={styleSheet}
		>
			{!task.status.isArchiving && (
				<Button
					{...listeners}
					{...attributes}
					size='icon'
					variant='ghost'
					className='text-red-600 dark:text-red-400 hover:text-orange-800 col-start-2 hover:bg-orange-400/20 w-[22px] cursor-grab h-full'
				>
					<GripVertical />
				</Button>
			)}
			<h4 className='leading-tight flex-auto'>
				<button
					className={cn(
						'text-xl font-extrabold capitalize text-destructive dark:text-slate-200 drop-shadow-sm hover:underline hover:cursor-pointer',
						task.status.isArchiving && 'text-white'
					)}
					onClick={() => openTaskModal(task._id)}
				>
					{task.title}
				</button>
				<p
					className={cn(
						'text-sm font-medium text-stone-600 dark:text-stone-300 max-w-[650px] mb-3 leading-[18px] truncate',
						task.status.isArchiving && 'text-white'
					)}
				>
					{task.description}
				</p>
				<span
					className={cn(
						'text-xs text-slate-900/80 dark:text-foreground font-medium flex  items-center gap-1',
						task.status.isArchiving && 'text-white'
					)}
				>
					category:{' '}
					<strong
						className={cn(
							'text-red-500 dark:text-red-400 tracking-wider',
							task.status.isArchiving && 'text-red-300'
						)}
					>
						"{task.category.name}"
					</strong>
					{task.status.isArchiving ? (
						<p className='px-2 font-semibold text-[14px] tracking-widest'>
							EXPIRED
						</p>
					) : (
						<p>{tastTime}</p>
					)}
				</span>
			</h4>
			<div className='flex items-start'>
				<Button
					size='icon'
					variant='ghost'
					className='p-1 text-gray-100 hover:bg-background hover:text-gray-600/100'
					title='edit'
					onClick={() => handleChange()}
				>
					<SquarePen size={28} className='fill-gray-600/60' />
				</Button>

				<Button
					size='icon'
					variant='ghost'
					className='p-1 text-gray-100 hover:bg-background hover:text-red-600/100'
					title='archive'
					onClick={() => handleArchive(task._id)}
				>
					<SquareX size={30} className='fill-red-600/60' />
				</Button>
				{!task.status.isArchiving && (
					<Button
						size='icon'
						variant='ghost'
						className='p-1 text-gray-100 hover:bg-background hover:text-green-600/100'
						title='complete'
						onClick={() => handleComplete(task._id)}
					>
						<SquareCheck size={30} className='fill-green-600/60' />
					</Button>
				)}
			</div>
		</div>
	)
}
