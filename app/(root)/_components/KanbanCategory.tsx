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
import styles from './root.module.scss'

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
		useSortable({
			id: category,
		})
	const { setNodeRef: setDropRef } = useDroppable({ id: category })
	const { openModal } = useCreateTaskModal()

	const style = {
		transform: CSS.Transform.toString(transform),
		borderColor: color,
		transition,
		backgroundColor: `${color}30`,
	}

	return (
		<div
			ref={(node) => {
				setNodeRef(node)
				setDropRef(node)
			}}
			className='flex flex-col w-full py-1 md:py-2 pb-0 rounded-md border-[3px] gap-1 md:gap-2 relative drop-shadow-xl'
			style={style}
		>
			<div
				className='flex items-center justify-between px-2 pb-2 border-b-2'
				style={{ borderBottomColor: color }}
			>
				<button
					onClick={onToggleCollapse}
					className='flex items-center gap-1 hover:opacity-70 transition-opacity'
				>
					{isCollapsed ? (
						<ChevronRight size={18} />
					) : (
						<ChevronDown size={18} />
					)}
					<h3 className='font-semibold text-base md:text-lg'>
						<span className='font-bold tracking-widest drop-shadow-sm text-red-700 dark:text-green-400'>
							{category}
						</span>
					</h3>
				</button>
				<div className='flex items-center gap-1'>
					<span
						className='text-xs font-bold px-2 py-0.5 rounded-full'
						style={{ backgroundColor: `${color}80`, color: '#fff' }}
					>
						{taskCount}
					</span>
					<Button
						{...listeners}
						{...attributes}
						size='icon'
						variant='ghost'
						className='text-red-600 dark:text-green-400 dark:hover:text-green-200 dark:hover:bg-white/10 hover:text-orange-800 hover:bg-orange-400/20 cursor-grab p-0 w-5 h-5'
					>
						<GripVertical />
					</Button>
				</div>
			</div>

			{!isCollapsed && (
				<>
					{tasks.map(task => (
						<KanbanItems key={task._id} task={task} color={color} />
					))}
					<Button
						size='sm'
						style={{ borderColor: color, background: `${color}60` }}
						title='add task'
						className={cn('border-y-[4px] ', styles.addTask)}
						onClick={() => openModal(category)}
					>
						<Plus className='text-slate-700' />
					</Button>
				</>
			)}

			{isCollapsed && (
				<div className='px-2 py-1 text-xs text-slate-500 dark:text-slate-400 italic'>
					{taskCount} task{taskCount !== 1 ? 's' : ''} hidden
				</div>
			)}
		</div>
	)
}
