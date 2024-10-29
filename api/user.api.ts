import { handleError, handleSuccess } from '@/components/utils/taskUtils'
import { useAxios } from '@/hooks'
import { User, UserChange } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'

const getUser = async (): Promise<User> => {
	const data = await useAxios().get('/users/personal-cabinet')

	return data
}

export const updateUser = async (data: UserChange): Promise<User> => {
	try {
		const response = await useAxios().put(`/users/update-user`, data)
		return response.data
	} catch (error) {
		console.error('Failed to update user:', error)
		throw error
	}
}

export const uploadAvatar = async (
	file: File
): Promise<{ message: string; avatarUrl: string }> => {
	console.log(file)
	try {
		const response = await useAxios().upload('/users/upload/avatar', file)
		return response.data
	} catch (error) {
		console.error('Failed to upload avatar:', error)
		throw error
	}
}

export const useUser = () => {
	const query = useQuery({
		queryKey: ['user'],
		queryFn: getUser,
	})

	return query
}

export const useUpdateUser = (refetchFn: () => Promise<void>) => {
	return useMutation({
		mutationFn: (data: UserChange) => updateUser(data),
		mutationKey: ['user'],
		onSuccess: async () => {
			handleSuccess('Changed successfully', refetchFn)
		},
		onError: (error: any) => {
			handleError(error, 'Failed to change user')
		},
	})
}

export const useUploadAvatar = (refetchFn: () => Promise<void>) => {
	return useMutation({
		mutationFn: (file: any) => uploadAvatar(file),
		mutationKey: ['user'],
		onSuccess: async () => {
			handleSuccess('Changed avatar successfully', refetchFn)
		},
		onError: (error: any) => {
			handleError(error, 'Failed to change avatar')
		},
	})
}
