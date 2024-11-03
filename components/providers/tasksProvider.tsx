'use client'

import {
	useArchiveTasks,
	useCompleteTasks,
	useCreateTask,
	useDeleteTask,
	useGetTasks,
	useUpdateTask,
} from '@/hooks/useTasks'
import { AllTasks, Category, Task, createData } from '@/types'
import { changeData } from '@/types/taskTypes'
import dayjs from 'dayjs'
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

interface TaskTypes {
	tasks: Task[]
	categories: Category[]
	allCategories: Category[]
	isPending: boolean
	handleArchive: (id: string) => Promise<void>
	handleComplete: (id: string) => Promise<void>
	handleDelete: (id: string) => Promise<void>
	handleCreate: (data: createData) => Promise<void>
	handleUpdate: (id: string, data: changeData) => Promise<void>
	getFutureTasks: () => Task[]
}

const TaskContext = createContext<TaskTypes | undefined>(undefined)

export const TaskProvider = ({ children }: { children: ReactNode }) => {
	const { data: tasksData, isPending, refetch } = useGetTasks()
	const [tasks, setTasks] = useState<AllTasks>([])
	const [categories, setCategories] = useState<Category[]>([])
	const [allCategories, setAllCategories] = useState<Category[]>([])

	useEffect(() => {
		if (tasksData && Array.isArray(tasksData)) {
			const now = dayjs()
			const availableTasks: Task[] = []

			tasksData.forEach(task => {
				if (task) {
					const taskStartTime = dayjs(task.startTime)
					if (
						!task.status.archived &&
						!task.status.completed &&
						taskStartTime.isBefore(now)
					) {
						availableTasks.push(task)
					}
				}
			})

			const categories = availableTasks.map(task => task.category)
			const allCategories = tasksData.map(task => task.category)

			setTasks(availableTasks)
			setCategories(categories)
			setAllCategories(allCategories)
		}
	}, [tasksData])

	const getFutureTasks = (): Task[] => {
		const now = dayjs()
		return (tasksData || []).filter(task => {
			const taskStartTime = dayjs(task.startTime)
			return (
				taskStartTime.isAfter(now) &&
				!task.status.archived &&
				!task.status.completed
			)
		})
	}

	const refetchTasks = async () => {
		refetch()
	}

	const { mutate: archiveMutate } = useArchiveTasks(refetchTasks)
	const { mutate: completeMutate } = useCompleteTasks(refetchTasks)
	const { mutate: createMutate } = useCreateTask(refetchTasks)
	const { mutate: updateMutate } = useUpdateTask(refetchTasks)
	const { mutate: deleteMutate } = useDeleteTask(refetchTasks)

	const handleDelete = async (id: string) => {
		try {
			await deleteMutate(id)
		} catch (error) {
			console.error('Failed to delete task:', error)
		}
	}

	const handleArchive = async (id: string) => {
		try {
			await archiveMutate(id)
		} catch (error) {
			console.error('Failed to archive task:', error)
		}
	}

	const handleComplete = async (id: string) => {
		try {
			await completeMutate(id)
			refetch()
		} catch (error) {
			console.error('Failed to complete task:', error)
		}
	}

	const handleCreate = async (data: createData) => {
		try {
			const request = {
				title: data.title,
				category: {
					name: data.category,
				},
				description: data.description,
				startTime: data.startTime,
				endTime: data.endTime,
			}
			await createMutate(request)
		} catch (error) {
			console.error('Failed to create task:', error)
		}
	}

	const handleUpdate = async (id: string, data: changeData) => {
		try {
			await updateMutate({ id, data })
		} catch (error) {
			console.error('Failed to update task:', error)
		}
	}

	return (
		<TaskContext.Provider
			value={{
				tasks,
				categories,
				isPending,
				handleArchive,
				handleComplete,
				handleCreate,
				handleUpdate,
				allCategories,
				handleDelete,
				getFutureTasks,
			}}
		>
			{children}
		</TaskContext.Provider>
	)
}

export const useTaskContext = (): TaskTypes => {
	const context = useContext(TaskContext)
	if (context === undefined) {
		throw new Error('useTaskContext must be used within a TaskProvider')
	}
	return context
}
