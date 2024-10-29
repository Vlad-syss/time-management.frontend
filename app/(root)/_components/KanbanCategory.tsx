'use client'

import { Button } from '@/components/ui/button'
import { useCreateTaskModal } from '@/hooks/useCreateTaskModal'
import { Task } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'
import { GripVertical, Plus } from 'lucide-react'
import { FC } from 'react'
import { KanbanItems } from './KanbanItems'
import styles from './root.module.scss'

interface KanbanCategoryProps {
	category: string
	tasks: Task[]
	color: string
}

export const KanbanCategory: FC<KanbanCategoryProps> = ({
	category,
	tasks,
	color,
}) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: category,
		})
	const { openModal } = useCreateTaskModal()

	const style = {
		transform: CSS.Transform.toString(transform),
		borderColor: color,
		transition,
		backgroundColor: `${color}30`,
	}

	return (
		<div
			ref={setNodeRef}
			className='flex flex-col w-full py-1 md:py-2 pb-0 rounded-md border-[3px] gap-1 md:gap-2 relative drop-shadow-xl'
			style={style}
		>
			<h3
				className='text-center font-semibold text-lg md:text-xl pb-2 px-2 border-b-2'
				style={{ borderBottomColor: color }}
			>
				Category:{' '}
				<span className='font-bold tracking-widest drop-shadow-sm text-red-700 dark:text-green-400'>
					"{category}"
				</span>
			</h3>
			<Button
				{...listeners}
				{...attributes}
				size='icon'
				variant='ghost'
				className='text-red-600 dark:text-green-400 dark:hover:text-green-200 dark:hover:bg-white/10 hover:text-orange-800 hover:bg-orange-400/20 cursor-grab absolute right-0 top-1 p-0 w-5 h-5'
			>
				<GripVertical />
			</Button>
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
				<Plus className='text-slate-700 ' />
			</Button>
		</div>
	)
}
