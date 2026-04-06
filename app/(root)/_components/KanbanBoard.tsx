'use client'

import { useTaskContext } from '@/components/providers'
import { BoardsProps } from '@/types'
import {
	DndContext,
	DragOverEvent,
	DragOverlay,
	KeyboardSensor,
	PointerSensor,
	closestCorners,
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
const LOCAL_STORAGE_COLLAPSED_KEY = 'collapsedCategories'

export const KanbanBoard: FC<BoardsProps> = ({
	categoriesWithColors,
	isPending,
	tasks,
	allCategories,
}) => {
	const [allUniqueCategories, setAllUniqueCategories] = useState<string[]>([])
	const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
		new Set()
	)
	const [activeTaskId, setActiveTaskId] = useState<string | null>(null)
	const { handleUpdate } = useTaskContext()

	useEffect(() => {
		if (allCategories) {
			const uniqueCategories = allCategories
				.map(category => category.name)
				.filter((value, index, array) => array.indexOf(value) === index)

			const savedOrder = localStorage.getItem(LOCAL_STORAGE_CATEGORY_ORDER_KEY)
			if (savedOrder) {
				const parsed = JSON.parse(savedOrder) as string[]
				const merged = [
					...parsed.filter(c => uniqueCategories.includes(c)),
					...uniqueCategories.filter(c => !parsed.includes(c)),
				]
				setAllUniqueCategories(merged)
			} else {
				setAllUniqueCategories(uniqueCategories)
			}

			const savedCollapsed = localStorage.getItem(LOCAL_STORAGE_COLLAPSED_KEY)
			if (savedCollapsed) {
				setCollapsedCategories(new Set(JSON.parse(savedCollapsed)))
			}
		}
	}, [allCategories])

	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const toggleCollapse = (category: string) => {
		setCollapsedCategories(prev => {
			const next = new Set(prev)
			if (next.has(category)) {
				next.delete(category)
			} else {
				next.add(category)
			}
			localStorage.setItem(
				LOCAL_STORAGE_COLLAPSED_KEY,
				JSON.stringify(Array.from(next))
			)
			return next
		})
	}

	const handleDragStart = (event: any) => {
		const { active } = event
		if (!allUniqueCategories.includes(active.id)) {
			setActiveTaskId(active.id)
		}
	}

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event
		if (!over || !tasks) return

		const activeId = active.id as string
		const overId = over.id as string

		// Check if dragging a task (not a category)
		const isActiveTask = !allUniqueCategories.includes(activeId)
		if (!isActiveTask) return

		// Find what category the "over" element belongs to
		let targetCategory: string | null = null

		if (allUniqueCategories.includes(overId)) {
			// Dropped directly on a category column
			targetCategory = overId
		} else {
			// Dropped on another task — find its category
			const overTask = tasks.find(t => t._id === overId)
			if (overTask) {
				targetCategory = overTask.category.name
			}
		}

		if (!targetCategory) return

		const activeTask = tasks.find(t => t._id === activeId)
		if (!activeTask || activeTask.category.name === targetCategory) return

		// Move task to new category via API
		handleUpdate(activeId, { category: { name: targetCategory } })
		setActiveTaskId(null)
	}

	const handleDragEnd = (event: any) => {
		const { active, over } = event
		setActiveTaskId(null)

		if (!over || active.id === over.id) return

		const isActiveCategory = allUniqueCategories.includes(active.id)
		const isOverCategory = allUniqueCategories.includes(over.id)

		if (isActiveCategory && isOverCategory) {
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
			collisionDetection={closestCorners}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
		>
			<SortableContext
				items={allUniqueCategories}
				strategy={horizontalListSortingStrategy}
			>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 gap-y-4 items-start'>
					{tasks ? (
						<>
							{allUniqueCategories.map(category => {
								const categoryTasks = tasks.filter(
									task => task.category.name === category
								)
								return (
									<KanbanCategory
										key={category}
										category={category}
										tasks={categoryTasks}
										color={categoriesWithColors[category]}
										isCollapsed={collapsedCategories.has(category)}
										onToggleCollapse={() => toggleCollapse(category)}
										taskCount={categoryTasks.length}
									/>
								)
							})}
							<AddTasks kanban />
						</>
					) : (
						<p>No tasks yet!</p>
					)}
				</div>
			</SortableContext>
			<DragOverlay>
				{activeTaskId && tasks ? (
					<div className='bg-white dark:bg-slate-700 rounded-md shadow-lg p-3 opacity-80 border-2 border-orange-400'>
						<p className='font-semibold'>
							{tasks.find(t => t._id === activeTaskId)?.title}
						</p>
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	)
}
