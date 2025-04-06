import { getAdminTasks, getAdminUser } from '@/api'
import { useQuery } from '@tanstack/react-query'

export const useAdminUsers = () => {
	const query = useQuery({
		queryKey: ['users'],
		queryFn: getAdminUser,
	})

	return query
}

export const useAdminTasks = () => {
	const query = useQuery({
		queryKey: ['allTasks'],
		queryFn: getAdminTasks,
	})

	return query
}
