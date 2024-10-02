import {
	createTask,
	getTaskById,
	getTasks,
	searchTasks,
	toggleArchiveTask,
	toggleCompleteTask,
	updateTaskById,
} from '@/api'
import { handleError, handleSuccess } from '@/components/utils/taskUtils'
import { AllTasks, Task } from '@/types'
import { changeData } from '@/types/taskTypes'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetTasks = () => {
	const query = useQuery<AllTasks>({
		queryKey: ['tasks'],
		queryFn: getTasks,
	})

	return query
}
export const useGetTaskById = (id: string) => {
	const query = useQuery<Task>({
		queryKey: ['task'],
		queryFn: () => getTaskById(id),
		enabled: !!id,
	})
	return query
}

export const useSearchTasks = (value: string) => {
	const query = useQuery<AllTasks>({
		queryKey: ['searchTask'],
		queryFn: () => searchTasks(value),
	})
	return query
}

export const useArchiveTasks = (refetchFn: () => Promise<void>) => {
	return useMutation({
		mutationFn: toggleArchiveTask,
		onSuccess: () => handleSuccess('Archived successfully', refetchFn),
		onError: (error: any) => handleError(error, 'Failed to archive task'),
	})
}

export const useUpdateTask = (refetchFn: () => Promise<void>) => {
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: changeData }) =>
			updateTaskById(id, data),
		onSuccess: () => handleSuccess('Changed successfully', refetchFn),
		onError: (error: any) => handleError(error, 'Failed to change task'),
	})
}

export const useCompleteTasks = (refetchFn: () => Promise<void>) => {
	return useMutation({
		mutationFn: toggleCompleteTask,
		onSuccess: () => handleSuccess('Completed successfully', refetchFn),
		onError: (error: any) => handleError(error, 'Failed to complete task'),
	})
}

export const useCategory = () => {
	const { data, isPending, error } = useGetTasks()

	const allCategories = data?.map(task => task.category) || []

	return { allCategories, isPending, error }
}

export const useCreateTask = (refetchFn: () => Promise<void>) => {
	return useMutation({
		mutationFn: createTask,
		onSuccess: () => handleSuccess('Created successfully', refetchFn),
		onError: (error: any) => handleError(error, 'Failed to create task'),
	})
}
