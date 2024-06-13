import { useAxios } from '@/hooks'
import { User } from '@/types'
import { useQuery } from '@tanstack/react-query'

const getUser = async (): Promise<User> => {
	const data = await useAxios().get('/users/personal-cabinet')

	return data
}

export const useUser = () => {
	const query = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})

	return query
}
