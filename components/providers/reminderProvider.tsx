'use client'

import {
	useCreateReminder,
	useDeleteReminder,
	useGetReminderById,
	useGetReminders,
	useUpdateReminder,
} from '@/hooks/useReminders'
import { ChangeReminder, Reminder } from '@/types'
import { ReactNode, createContext, useContext } from 'react'

interface ReminderTypes {
	reminderData: Reminder[] | undefined
	isError: boolean
	error: any
	isPending: boolean
	count: number
	createReminder: (data: ChangeReminder) => void
	updateReminder: (id: string, data: ChangeReminder) => void
	deleteReminder: (id: string) => void
	getReminderById: (id: string) => Promise<Reminder | undefined>
	refetchReminder: () => Promise<void>
}

const ReminderContext = createContext<ReminderTypes | undefined>(undefined)

export const ReminderProvider = ({ children }: { children: ReactNode }) => {
	const {
		data: reminderData,
		refetch,
		isError,
		error,
		isPending,
	} = useGetReminders()

	const refetchReminder = async () => {
		await refetch()
	}

	const { mutate: createReminder } = useCreateReminder(refetchReminder)
	const { mutate: updateReminder } = useUpdateReminder(refetchReminder)
	const { mutate: deleteReminder } = useDeleteReminder(refetchReminder)

	const getReminderById = async (id: string): Promise<Reminder | undefined> => {
		const result = await useGetReminderById(id)
		return result.data
	}

	const count = reminderData ? reminderData.length : 0

	return (
		<ReminderContext.Provider
			value={{
				reminderData,
				error,
				isError,
				isPending,
				count,
				createReminder: data => createReminder(data),
				updateReminder: (id, data) => updateReminder({ id, data }),
				deleteReminder: id => deleteReminder(id),
				getReminderById,
				refetchReminder,
			}}
		>
			{children}
		</ReminderContext.Provider>
	)
}

export const useReminderContext = (): ReminderTypes => {
	const context = useContext(ReminderContext)
	if (context === undefined) {
		throw new Error('useReminderContext must be used within a ReminderProvider')
	}
	return context
}
