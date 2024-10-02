'use client'

import { BoardsProps } from '@/types'
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
	horizontalListSortingStrategy,
	sortableKeyboardCoordinates,
} from '@dnd-kit/sortable'
import { LoaderPinwheel } from 'lucide-react'
import { FC, useEffect, useState } from 'react'
import { AddTasks } from './AddTasks'
import { KanbanCategory } from './KanbanCategory'

const LOCAL_STORAGE_CATEGORY_ORDER_KEY = 'categoriesOrder'

export const KanbanBoard: FC<BoardsProps> = ({
	categoriesWithColors,
	isPending,
	tasks,
	allCategories,
}) => {
	const [allUniqueCategories, setAllUniqueCategories] = useState<string[]>([])

	useEffect(() => {
		if (allCategories) {
			const uniqueCategories = allCategories
				.map(category => category.name)
				.filter((value, index, array) => array.indexOf(value) === index)

			localStorage.setItem(
				LOCAL_STORAGE_CATEGORY_ORDER_KEY,
				JSON.stringify(uniqueCategories)
			)
			const savedCategoriesOrder = localStorage.getItem(
				LOCAL_STORAGE_CATEGORY_ORDER_KEY
			)
			if (savedCategoriesOrder) {
				const savedOrder = JSON.parse(savedCategoriesOrder) as string[]
				setAllUniqueCategories(savedOrder)
			} else {
				setAllUniqueCategories(uniqueCategories)
			}
		}
	}, [categoriesWithColors, allCategories])

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const handleDragEnd = (event: any) => {
		const { active, over } = event

		if (active.id !== over.id) {
			setAllUniqueCategories(categories => {
				const oldIndex = categories.indexOf(active.id)
				const newIndex = categories.indexOf(over.id)
				const newCategories = arrayMove(categories, oldIndex, newIndex)
				localStorage.setItem(
					LOCAL_STORAGE_CATEGORY_ORDER_KEY,
					JSON.stringify(newCategories)
				)
				return newCategories
			})
		}
	}

	if (isPending) {
		return <LoaderPinwheel className='animate-spin w-10 h-10 my-3 mx-auto' />
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={allUniqueCategories}
				strategy={horizontalListSortingStrategy}
			>
				<div className='grid grid-cols-3 gap-3 gap-y-4 items-start'>
					{tasks ? (
						<>
							{allUniqueCategories.map(category => (
								<KanbanCategory
									key={category}
									category={category}
									tasks={tasks.filter(task => task.category.name === category)}
									color={categoriesWithColors[category]}
								/>
							))}
							<AddTasks kanban />
						</>
					) : (
						<p>No tasks yet!</p>
					)}
				</div>
			</SortableContext>
		</DndContext>
	)
}
