'use client'

import { useTaskContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { useChangeTaskModal, useConvertTime, useViewTaskModal } from '@/hooks'
import { Task } from '@/types'
import cn from 'classnames'
import { Clock, SquareCheck, SquarePen, SquareX } from 'lucide-react'
import { FC } from 'react'

interface KanbanItemProps {
	task: Task
	color: string
}

export const KanbanItems: FC<KanbanItemProps> = ({ task, color }) => {
	const endTime = useConvertTime(task.endTime)
	const startTime = new Date(task.startTime)
	const formmatedStartTime =
		startTime.getDay() +
		'-' +
		(startTime.getMonth() + 1) +
		'-' +
		startTime.getFullYear()
	const { openModal } = useChangeTaskModal()
	const { openModal: openTaskModal } = useViewTaskModal()
	const { handleArchive, handleComplete } = useTaskContext()
	/**
	 * TODO:
	 * Delete task when time run out,
	 * Contex for deleting expired
	 * Modal create
	 * page for task (id)
	 * better mobile menu
	 */
	return (
		<div
			className={cn(
				'flex flex-col w-full py-2 border-y-2 border-x-0 gap-2 min-h-[100px] relative',
				{
					'opacity-75 bg-red-500/80 text-stone-100': task.status.isArchiving,
					'bg-transparent/20': !task.status.isArchiving,
				}
			)}
			style={{ borderColor: color }}
		>
			<article className='flex flex-col justify-between h-full px-2'>
				<button
					onClick={() => openTaskModal(task._id)}
					className='font-semibold text-[20px] text-left dark:text-blue-100 hover:underline cursor-pointer'
				>
					{task.title}
				</button>
				<div className='text-xs text-stone-800 dark:text-blue-200 italic flex flex-col gap-1'>
					<p className='truncate text-ellipsis overflow-hidden w-[150px]'>
						<span className='font-bold mr-1 not-italic'>Description:</span>
						{task.description}
					</p>
					<span className='flex items-center gap-2'>
						<span className='font-bold not-italic flex items-center gap-1'>
							<Clock
								className={cn('text-red-600 w-4 h-4', {
									'text-stone-100': task.status.archived,
								})}
							/>
							Started on:
						</span>{' '}
						<span className='tracking-widest font-medium'>
							{formmatedStartTime}
						</span>
					</span>
					<span className='flex items-center gap-2'>
						<span className='font-bold not-italic flex items-center gap-1'>
							<Clock
								className={cn('text-red-600 w-4 h-4', {
									'text-stone-100': task.status.archived,
								})}
							/>
							End on:
						</span>{' '}
						<span className='tracking-widest font-medium'>{endTime}</span>
					</span>
				</div>
			</article>

			<Button
				className='absolute right-1 bottom-1 w-5 h-5 hover:text-white hover:bg-transparent hover:scale-110 transition-transform'
				size='icon'
				title='update'
				variant='ghost'
				onClick={() => openModal(task._id)}
			>
				<SquarePen size={28} className='fill-gray-600/60' />
			</Button>
			<Button
				className='absolute right-1 top-1 w-6 h-6 hover:text-white hover:bg-transparent hover:scale-110 transition-transform'
				size='icon'
				variant='ghost'
				title='archive'
				onClick={() => handleArchive(task._id)}
			>
				<SquareX size={30} className='fill-red-600/60' />
			</Button>
			{!task.status.isArchiving && (
				<Button
					className='absolute right-7 top-1 w-6 h-6 hover:text-white hover:bg-transparent hover:scale-110 transition-transform'
					size='icon'
					variant='ghost'
					title='complete'
					onClick={() => handleComplete(task._id)}
				>
					<SquareCheck size={30} className='fill-green-600/60' />
				</Button>
			)}
		</div>
	)
}
