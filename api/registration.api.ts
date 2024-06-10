import { useAxios } from '@/hooks'
import { RegisterRequestBody, RegisterResponse } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

const registerUser = async (
	userData: RegisterRequestBody
): Promise<RegisterResponse> => {
	const data = await useAxios().post('users/register', userData)

	return data
}

export const useRegister = () => {
	const mutation = useMutation({
		mutationFn: registerUser,
		onError: (error: any) => {
			const errorResponse = error?.response?.data

			if (Array.isArray(errorResponse)) {
				toast.error(errorResponse[0]?.msg || 'An unknown error occurred')
			} else {
				toast.error(errorResponse?.message || 'An unknown error occurred')
			}
		},
		onSuccess: data => {
			toast.success('Registration successful!')
		},
	})

	return mutation
}
