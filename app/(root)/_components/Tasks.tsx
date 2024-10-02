'use client'

import { useTaskContext, useThemeContext } from '@/components/providers'
import { useCategoriesWithColors } from '@/hooks'
import { SelectedTypes } from '@/types'
import { FC } from 'react'
import { CustomProvider } from 'rsuite'
import { KanbanBoard } from './KanbanBoard'
import { WrapBoard } from './WrapBoard'

export const Tasks: FC<SelectedTypes> = ({ kanban, wrap }) => {
	const { theme } = useThemeContext()
	const { categories, isPending, tasks } = useTaskContext()
	const categoriesWithColors = useCategoriesWithColors(categories, theme)

	return (
		<>
			<CustomProvider theme={theme}>
				{kanban && (
					<KanbanBoard
						allCategories={categories}
						categoriesWithColors={categoriesWithColors}
						isPending={isPending}
						tasks={tasks}
					/>
				)}
				{wrap && (
					<WrapBoard
						allCategories={categories}
						tasks={tasks}
						categoriesWithColors={categoriesWithColors}
						isPending={isPending}
					/>
				)}
			</CustomProvider>
		</>
	)
}
