'use client'

import { Button } from '@/components/ui/button'
import { useCreateTaskModal } from '@/hooks/useCreateTaskModal'
import { Task } from '@/types'
import { useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'
import { ChevronDown, ChevronRight, GripVertical, Plus } from 'lucide-react'
import { FC } from 'react'
import { KanbanItems } from './KanbanItems'

interface KanbanCategoryProps {
	category: string
	tasks: Task[]
	color: string
	isCollapsed: boolean
	onToggleCollapse: () => void
	taskCount: number
}

export const KanbanCategory: FC<KanbanCategoryProps> = ({
	category,
	tasks,
	color,
	isCollapsed,
	onToggleCollapse,
	taskCount,
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: category })
	const { setNodeRef: setDropRef } = useDroppable({ id: category })
	const { openModal } = useCreateTaskModal()

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div
			ref={(node) => {
				setNodeRef(node)
				setDropRef(node)
			}}
			className='flex flex-col w-full rounded-xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-[#13131B] overflow-hidden'
			style={style}
		>
			<div className='flex items-center justify-between px-3 py-2.5 border-b border-gray-100 dark:border-white/[0.06]'>
				<button
					onClick={onToggleCollapse}
					className='flex items-center gap-2 hover:opacity-70 transition-opacity'
				>
					{isCollapsed ? (
						<ChevronRight className='w-4 h-4 text-gray-400' />
					) : (
						<ChevronDown className='w-4 h-4 text-gray-400' />
					)}
					<div
						className='w-2.5 h-2.5 rounded-full shrink-0'
						style={{ backgroundColor: color }}
					/>
					<h3 className='text-sm font-semibold text-gray-900 dark:text-gray-100 truncate'>
						{category}
					</h3>
				</button>
				<div className='flex items-center gap-1.5'>
					<span className='text-xs font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-white/5 px-2 py-0.5 rounded-full'>
						{taskCount}
					</span>
					<Button
						{...listeners}
						{...attributes}
						size='icon'
						variant='ghost'
						className='w-6 h-6 cursor-grab text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
					>
						<GripVertical className='w-3.5 h-3.5' />
					</Button>
				</div>
			</div>

			{!isCollapsed && (
				<div className='flex flex-col'>
					{tasks.map(task => (
						<KanbanItems key={task._id} task={task} color={color} />
					))}
					<button
						onClick={() => openModal(category)}
						className='flex items-center justify-center gap-1 py-2.5 text-xs text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors'
					>
						<Plus className='w-3.5 h-3.5' />
						Add task
					</button>
				</div>
			)}

			{isCollapsed && (
				<div className='px-3 py-2 text-xs text-gray-400 italic'>
					{taskCount} task{taskCount !== 1 ? 's' : ''}
				</div>
			)}
		</div>
	)
}
