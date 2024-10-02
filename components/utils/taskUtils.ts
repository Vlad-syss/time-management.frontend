import { toast } from 'react-hot-toast'

export const handleSuccess = async (
	message: string,
	refetchFn: () => Promise<void>
) => {
	toast.success(message)
	await refetchFn()
}

export const handleError = (error: any, message: string) => {
	toast.error(message)
	console.error(message, error)
}
