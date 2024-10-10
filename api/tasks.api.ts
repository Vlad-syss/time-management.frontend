import { useAxios } from '@/hooks'
import { AllTasks, Task } from '@/types'
import { changeData } from '@/types/taskTypes'

export const getTasks = async (): Promise<AllTasks> => {
	try {
		const data = await useAxios().get('/tasks')
		return data
	} catch (error) {
		console.error('Failed to fetch tasks:', error)
		throw error
	}
}

export const getTaskById = async (id: string): Promise<Task> => {
	try {
		const data = await useAxios().get(`/tasks/${id}`)
		return data
	} catch (error) {
		console.error('Failed to get task:', error)
		throw error
	}
}

export const updateTaskById = async (
	id: string,
	data: changeData
): Promise<Task> => {
	try {
		const response = await useAxios().put(`/tasks/${id}`, data)
		return response.data
	} catch (error) {
		console.error('Failed to get task:', error)
		throw error
	}
}

export const toggleArchiveTask = async (id: string) => {
	try {
		const data = await useAxios().post(`/tasks/${id}/archive`)
		return data
	} catch (error) {
		console.error('Failed to archive task:', error)
		throw error
	}
}

export const toggleCompleteTask = async (id: string) => {
	try {
		const data = await useAxios().post(`/tasks/${id}/complete`)
		return data
	} catch (error) {
		console.error('Failed to complete task:', error)
		throw error
	}
}

export const createTask = async (data: any) => {
	try {
		return await useAxios().post('/tasks', data)
	} catch (error) {
		console.error('Failed to create task:', error)
		throw error
	}
}

export const deleteTask = async (id: string) => {
	try {
		return await useAxios().remove(`/tasks/${id}`)
	} catch (error) {
		console.error('Failed to delete task:', error)
		throw error
	}
}

export const searchTasks = async (searchValue: string) => {
	try {
		return await useAxios().get(`/tasks/search?query=${searchValue}`)
	} catch (error) {
		console.error('Something went wrong:', error)
		throw error
	}
}

export const getArchivedTasks = async () => {
	try {
		return await useAxios().get(`/tasks/archived`)
	} catch (error) {
		console.error('Something went wrong:', error)
		throw error
	}
}
