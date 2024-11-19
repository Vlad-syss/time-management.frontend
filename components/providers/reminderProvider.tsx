'use client'

import {
	useCreateReminder,
	useDeleteReminder,
	useGetReminderById,
	useGetReminders,
	useUpdateReminder,
} from '@/hooks/useReminders'
import { ChangeReminder, Reminder } from '@/types'
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

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
	filteredReminders: Reminder[] | undefined
	searchReminders: (query: string) => void
	filterReminders: (type: 'ongoing' | 'expired') => void
	sortReminders: (type: 'alphabetical' | 'time') => void
	activeFilters: { ongoing: boolean; expired: boolean }
	searchQuery: string
	setSearchQuery: Dispatch<SetStateAction<string>>
	activeSorts: { alphabetical: boolean; time: boolean }
	activeGroups: { todays: boolean; tommorows: boolean; nextWeek: boolean }
	groupReminders: (type: 'todays' | 'tommorows' | 'nextWeek') => void
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

	const [filteredReminders, setFilteredReminders] = useState<Reminder[]>([])
	const [searchQuery, setSearchQuery] = useState('')
	const [activeFilters, setActiveFilters] = useState({
		ongoing: true,
		expired: true,
	})
	const [activeSorts, setActiveSorts] = useState({
		alphabetical: false,
		time: false,
	})

	const [activeGroups, setActiveGroups] = useState({
		todays: false,
		tommorows: false,
		nextWeek: false,
	})

	useEffect(() => {
		if (reminderData) {
			setFilteredReminders(reminderData)
		}
	}, [reminderData])

	const searchReminders = (query: string) => {
		setSearchQuery(query)
		if (query) {
			const filtered =
				reminderData?.filter(reminder =>
					reminder.message.toLowerCase().includes(query.toLowerCase())
				) || []
			setFilteredReminders(filtered)
		} else {
			setFilteredReminders(reminderData || [])
		}
	}

	const filterReminders = (type: 'ongoing' | 'expired') => {
		const now = Date.now()
		const updatedFilters = { ...activeFilters, [type]: !activeFilters[type] }
		setActiveFilters(updatedFilters)

		let baseData = reminderData || []
		if (searchQuery) {
			baseData = baseData.filter(reminder =>
				reminder.message.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}

		const isOngoingActive = updatedFilters.ongoing
		const isExpiredActive = updatedFilters.expired

		const filtered = baseData.filter(reminder => {
			const isExpired = new Date(reminder.time).getTime() <= now
			return (isOngoingActive && !isExpired) || (isExpiredActive && isExpired)
		})

		setFilteredReminders(filtered)
	}

	const sortReminders = (type: 'alphabetical' | 'time') => {
		setActiveSorts(prevSorts => {
			const newSorts = { ...prevSorts, [type]: !prevSorts[type] }
			const sorted = [...filteredReminders]

			if (type === 'alphabetical') {
				sorted.sort((a, b) =>
					newSorts.alphabetical
						? a.message.localeCompare(b.message)
						: b.message.localeCompare(a.message)
				)
			} else if (type === 'time') {
				sorted.sort((a, b) =>
					newSorts.time
						? new Date(a.time).getTime() - new Date(b.time).getTime()
						: new Date(b.time).getTime() - new Date(a.time).getTime()
				)
			}

			setFilteredReminders(sorted)
			return newSorts
		})
	}

	const groupReminders = (type: 'todays' | 'tommorows' | 'nextWeek') => {
		const updatedGroups = { ...activeGroups, [type]: !activeGroups[type] }
		setActiveGroups(updatedGroups)

		let baseData = reminderData || []

		if (searchQuery) {
			baseData = baseData.filter(reminder =>
				reminder.message.toLowerCase().includes(searchQuery.toLowerCase())
			)
		}

		const startOfToday = new Date().setHours(0, 0, 0, 0)
		const endOfToday = new Date().setHours(23, 59, 59, 999)
		const startOfTomorrow = new Date(
			new Date().setDate(new Date().getDate() + 1)
		).setHours(0, 0, 0, 0)
		const endOfTomorrow = new Date(
			new Date().setDate(new Date().getDate() + 1)
		).setHours(23, 59, 59, 999)
		const startOfNextWeek = new Date(
			new Date().setDate(new Date().getDate() - new Date().getDay() + 7)
		).setHours(0, 0, 0, 0)

		const filtered = baseData.filter(reminder => {
			const reminderTime = new Date(reminder.time).getTime()

			const isToday =
				updatedGroups.todays &&
				reminderTime >= startOfToday &&
				reminderTime <= endOfToday
			const isTomorrow =
				updatedGroups.tommorows &&
				reminderTime >= startOfTomorrow &&
				reminderTime <= endOfTomorrow
			const isNextWeek =
				updatedGroups.nextWeek && reminderTime >= startOfNextWeek

			if (
				!updatedGroups.todays &&
				!updatedGroups.tommorows &&
				!updatedGroups.nextWeek
			) {
				return true
			}

			return isToday || isTomorrow || isNextWeek
		})

		setFilteredReminders(filtered)
	}

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
				filteredReminders,
				searchReminders,
				filterReminders,
				sortReminders,
				activeFilters,
				searchQuery,
				setSearchQuery,
				activeSorts,
				activeGroups,
				groupReminders,
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
