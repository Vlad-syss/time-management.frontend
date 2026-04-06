export { getAdminTasks, getAdminUser } from './admin.api'
export {
	deleteCategory,
	getCategories,
	renameCategory,
} from './categories.api'
export { useLogin } from './login.api'
export { useRegister } from './registration.api'
export {
	createReminder,
	deleteReminder,
	getReminderById,
	getReminders,
	getUnreadReminderCount,
	markAllRemindersRead,
	markReminderRead,
	updateReminder,
} from './reminder.api'
export {
	createTask,
	deleteTask,
	getArchivedTasks,
	getTaskById,
	getTasks,
	searchTasks,
	toggleArchiveTask,
	toggleCompleteTask,
	updateTaskById,
} from './tasks.api'
export { fetchTheme, updateTheme } from './theme.api'
export {
	updateUser,
	uploadAvatar,
	useUpdateUser,
	useUploadAvatar,
	useUser,
} from './user.api'
