import { useAxios } from '@/hooks'
import { AdminTasksEntity, User } from '@/types'

export const getAdminUser = async (): Promise<User[]> => {
	const data = await useAxios().get('/admin/all-users')

	return data
}

export const getAdminTasks = async (): Promise<AdminTasksEntity> => {
	const data = await useAxios().get('/admin/all-tasks')

	return data
}
