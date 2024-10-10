'use client'

import { LOCAL_STORAGE_KEY } from '@/components/consts'
import { WrapTaskSkeleton } from '@/components/skeletons'
import { BoardsProps, Task } from '@/types'
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { FC, useEffect, useState } from 'react'
import { AddTasks } from './AddTasks'
import { WrapItems } from './WrapItems'

export const WrapBoard: FC<BoardsProps> = ({
	categoriesWithColors,
	isPending,
	tasks,
}) => {
	const [taskIds, setTaskIds] = useState<string[]>([])

	useEffect(() => {
		if (tasks) {
			const savedOrder = localStorage.getItem(LOCAL_STORAGE_KEY)
			if (savedOrder) {
				const savedTaskIds = JSON.parse(savedOrder) as string[]
				const orderedTaskIds = savedTaskIds.filter(id =>
					tasks.some(task => task._id === id)
				)

				const newTaskIds = tasks
					.map(task => task._id)
					.filter(id => !orderedTaskIds.includes(id))

				setTaskIds([...orderedTaskIds, ...newTaskIds])
			} else {
				setTaskIds(tasks.map(task => task._id))
			}
		}
	}, [tasks])

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	function handleDragEnd(event: any) {
		const { active, over } = event

		if (active.id !== over.id) {
			setTaskIds((ids: string[]) => {
				const oldIndex = ids.indexOf(active.id)
				const newIndex = ids.indexOf(over.id)
				const newTasks = arrayMove(ids, oldIndex, newIndex)
				localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks))
				return newTasks
			})
		}
	}

	if (isPending) {
		return <WrapTaskSkeleton />
	}

	const orderedTasks = taskIds
		.map(id => tasks?.find(task => task._id === id))
		.filter(task => task !== undefined) as Task[]

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext items={taskIds}>
				<div className='flex flex-col gap-2'>
					{orderedTasks.map(task => (
						<WrapItems
							key={task._id}
							task={task}
							color={categoriesWithColors[task.category.name]}
						/>
					))}
					<AddTasks wrap />
				</div>
			</SortableContext>
		</DndContext>
	)
}
