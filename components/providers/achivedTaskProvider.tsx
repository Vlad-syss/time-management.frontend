'use client'

import { useArchivedTask } from '@/hooks/useTasks'
import { Category, Task } from '@/types'
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

interface ArchivedTaskTypes {
	tasks: Task[]
	categories: Category[]
	isPending: boolean
	refetch: any
}

const ArchivedTaskContext = createContext<ArchivedTaskTypes | undefined>(
	undefined
)

export const ArchivedTaskProvider = ({ children }: { children: ReactNode }) => {
	const { data, isPending, isError, refetch } = useArchivedTask()
	const [tasks, setTasks] = useState<Task[]>([])
	const [categories, setCategories] = useState<Category[]>([])

	useEffect(() => {
		if (isError) {
			console.error('Failed to fetch archived tasks:', isError)
			setTasks([])
			setCategories([])
		}

		if (data) {
			setTasks(data)
			const allCategories = tasks.map(task => task.category)
			setCategories(allCategories)
		}
	}, [data, isPending, isError])

	return (
		<ArchivedTaskContext.Provider
			value={{
				tasks,
				categories,
				isPending,
				refetch,
			}}
		>
			{children}
		</ArchivedTaskContext.Provider>
	)
}

export const useArchivedTaskContext = (): ArchivedTaskTypes => {
	const context = useContext(ArchivedTaskContext)
	if (context === undefined) {
		throw new Error(
			'useArchivedTaskContext must be used within an ArchivedTaskProvider'
		)
	}
	return context
}
