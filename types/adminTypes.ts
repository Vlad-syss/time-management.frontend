import { Task } from '.'

export interface AdminTasksStats {
	totalTasks: number
	completedTasks: number
	pendingTasks: number
}

export interface AdminTasksData {
	stats: AdminTasksStats
	tasks: Task[]
}

export interface AdminTasksEntity {
	success: boolean
	data: AdminTasksData
}
