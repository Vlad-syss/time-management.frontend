export interface Reminder {
	_id: string
	userId: string
	message: string
	time: Date
	updatedAt: string
	createdAt: string
}

export interface ChangeReminder {
	message: string
	time: Date
}
