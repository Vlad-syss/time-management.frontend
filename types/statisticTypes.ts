export interface StatisticCategory {
	name: string
	taskCount: number
	averageTime: number
}

export interface Statistic {
	_id: string
	userId: string
	allArchived: number
	allCompleted: number
	averageTime: number
	bestDay: string
	categories: StatisticCategory[]
	completedLate: number
	completedOnTime: number
	dailyPerformance: Record<string, number>
	monthlyPerformance: Record<string, number>
	longestTaskTime: number
	rescheduledTasks: number
	createdAt: string
	updatedAt: string
	__v: number
}
