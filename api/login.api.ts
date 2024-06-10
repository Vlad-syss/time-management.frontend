import { useAxios } from '@/hooks'
import { LoginRequestBody, RegisterResponse } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

const loginUser = async (
	userData: LoginRequestBody
): Promise<RegisterResponse> => {
	const data = await useAxios().post('users/login', userData)

	return data
}

export const useLogin = () => {
	const mutation = useMutation({
		mutationFn: loginUser,
		onError: (error: any) => {
			const errorResponse = error?.response?.data

			if (Array.isArray(errorResponse)) {
				toast.error(errorResponse[0]?.msg || 'An unknown error occurred')
			} else {
				toast.error(errorResponse?.message || 'An unknown error occurred')
			}
		},
		onSuccess: data => {
			toast.success('Login successful!')
		},
	})

	return mutation
}
