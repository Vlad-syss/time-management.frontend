'use client'

import { useAdminTasks, useAdminUsers } from '@/hooks'
import { Task, User } from '@/types'
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

interface AdminContextType {
	tasks: Task[]
	users: User[]
	isLoading: boolean
	error: string | null
	userStats: {
		totalUsers: number
		activeUsers: number
		newUsers: number
	}
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export const AdminProvider = ({ children }: { children: ReactNode }) => {
	const [tasks, setTasks] = useState<Task[]>([])
	const [users, setUsers] = useState<User[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const totalUsers = users.length
	const activeUsers = users.filter(user => {
		const lastLogin = new Date(user.updatedAt)
		const thirtyDaysAgo = new Date()
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
		return lastLogin > thirtyDaysAgo
	}).length

	const newUsers = users.filter(user => {
		const registrationDate = new Date(user.createdAt)
		const sevenDaysAgo = new Date()
		sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
		return registrationDate > sevenDaysAgo
	}).length

	const userStats = {
		totalUsers,
		activeUsers,
		newUsers,
	}

	const {
		data: tasksData,
		isError: isErrorTasks,
		error: errorTasks,
		isPending: isTasksPending,
	} = useAdminTasks()
	const {
		data: usersData,
		isError: isErrorUsers,
		error: errorUsers,
		isPending: isUsersPending,
	} = useAdminUsers()

	useEffect(() => {
		if (tasksData?.data?.tasks) {
			setTasks(tasksData.data.tasks)
		}
		if (usersData) {
			setUsers(usersData)
		}
	}, [tasksData, usersData])

	useEffect(() => {
		setIsLoading(isTasksPending || isUsersPending)
		if (isErrorTasks || isErrorUsers) {
			setError(
				`Tasks error: ${errorTasks?.message || 'Unknown'}, Users error: ${
					errorUsers?.message || 'Unknown'
				}`
			)
		} else {
			setError(null)
		}
	}, [
		isTasksPending,
		isUsersPending,
		isErrorTasks,
		isErrorUsers,
		errorTasks,
		errorUsers,
	])

	return (
		<AdminContext.Provider
			value={{ tasks, users, isLoading, error, userStats }}
		>
			{children}
		</AdminContext.Provider>
	)
}

export const useAdminContext = (): AdminContextType => {
	const context = useContext(AdminContext)
	if (!context) {
		throw new Error('useAdminContext must be used within an AdminProvider')
	}
	return context
}
