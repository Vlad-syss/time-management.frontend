import {
	createReminder,
	deleteReminder,
	getReminderById,
	getReminders,
	updateReminder,
} from '@/api'
import { handleError, handleSuccess } from '@/components/utils/taskUtils'
import { ChangeReminder } from '@/types'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetReminders = () => {
	const query = useQuery({
		queryKey: ['reminders'],
		queryFn: getReminders,
	})

	return query
}

export const useGetReminderById = (id: string) => {
	const query = useQuery({
		queryKey: ['reminders'],
		queryFn: () => getReminderById(id),
	})

	return query
}

export const useDeleteReminder = (refetchFn: () => Promise<void>) => {
	return useMutation({
		mutationFn: (id: string) => deleteReminder(id),
		onSuccess: ({ message }) => handleSuccess(message, refetchFn),
		onError: (error: any) => handleError(error, 'Failed to delete reminder'),
	})
}

export const useCreateReminder = (refetchFn: () => Promise<void>) => {
	return useMutation({
		mutationFn: createReminder,
		onSuccess: () => handleSuccess('Reminder created!', refetchFn),
		onError: (error: any) => handleError(error, 'Failed to create reminder'),
	})
}

export const useUpdateReminder = (refetchFn: () => Promise<void>) => {
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: ChangeReminder }) =>
			updateReminder(id, data),
		onSuccess: () => handleSuccess('Changed successfully', refetchFn),
		onError: (error: any) => handleError(error, 'Failed to change reminder'),
	})
}
