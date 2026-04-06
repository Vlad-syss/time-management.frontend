import { useAxios } from '@/hooks'
import { ChangeReminder, Reminder } from '@/types'

export const getReminders = async (): Promise<Reminder[]> => {
	try {
		const data = await useAxios().get('/reminders')

		return data
	} catch (error) {
		console.error('Failed to get reminders:', error)
		throw error
	}
}

export const createReminder = async (data: any) => {
	try {
		return await useAxios().post('/reminders', data)
	} catch (error) {
		console.error('Failed to create reminder:', error)
		throw error
	}
}

export const updateReminder = async (id: string, data: ChangeReminder) => {
	try {
		return await useAxios().put(`/reminders/${id}`, data)
	} catch (error) {
		console.error('Failed to update reminder:', error)
		throw error
	}
}

export const deleteReminder = async (id: string) => {
	try {
		return await useAxios().remove(`/reminders/${id}`)
	} catch (error) {
		console.error('Failed to delete reminder:', error)
		throw error
	}
}

export const getReminderById = async (id: string) => {
	try {
		return await useAxios().get(`/reminders/${id}`)
	} catch (error) {
		console.error('Failed to to get reminder:', error)
		throw error
	}
}

export const markReminderRead = async (id: string) => {
	try {
		return await useAxios().patch(`/reminders/${id}/read`)
	} catch (error) {
		console.error('Failed to mark reminder as read:', error)
		throw error
	}
}

export const markAllRemindersRead = async () => {
	try {
		return await useAxios().patch('/reminders/read-all')
	} catch (error) {
		console.error('Failed to mark all reminders as read:', error)
		throw error
	}
}

export const getUnreadReminderCount = async (): Promise<{ count: number }> => {
	try {
		return await useAxios().get('/reminders/unread-count')
	} catch (error) {
		console.error('Failed to get unread count:', error)
		throw error
	}
}
