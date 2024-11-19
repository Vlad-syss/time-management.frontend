import { months } from '@/components/consts'
import { useReminderContext } from '@/components/providers'
import { useWidth } from '@/hooks'
import { ChangeReminder, Reminder } from '@/types'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { CalendarCell } from './CalendarCell'
import { CalendarCellMobile } from './CalendarCellMobile'
import { CalendarDays } from './CalendarDays'
import { CalendarHeader } from './CalendarHeader'

interface CalendarProps {
	reminders: Reminder[]
	deleteReminder: (id: string) => void
	updateReminder: (id: string, data: ChangeReminder) => void
	setShowPopup: Dispatch<SetStateAction<boolean>>
	setTimeData: Dispatch<SetStateAction<string>>
}

export const Calendar: React.FC<CalendarProps> = ({
	reminders,
	deleteReminder,
	updateReminder,
	setShowPopup,
	setTimeData,
}) => {
	const { activeSorts } = useReminderContext()
	const width = useWidth()
	const isMobile = width < 768

	const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
	const [currentMonth, setCurrentMonth] = useState(new Date())

	const month = months[currentMonth.getMonth()]
	const year = currentMonth.getFullYear()
	const today = new Date()

	// Weekly navigation
	const startOfWeek = new Date(
		currentMonth.setDate(currentMonth.getDate() - currentMonth.getDay())
	)
	const weekDays = Array.from(
		{ length: 7 },
		(_, i) => new Date(startOfWeek.getTime() + i * 86400000)
	)

	// Monthly calendar days
	const daysInMonth = new Date(year, currentMonth.getMonth() + 1, 0).getDate()
	const firstDayOfMonth = new Date(year, currentMonth.getMonth(), 1).getDay()
	const lastDayOfMonth = new Date(
		year,
		currentMonth.getMonth(),
		daysInMonth
	).getDay()
	const prevMonthDays = Array.from(
		{ length: firstDayOfMonth },
		(_, i) =>
			new Date(year, currentMonth.getMonth(), -(firstDayOfMonth - 1) + i)
	)
	const currentMonthDays = Array.from(
		{ length: daysInMonth },
		(_, i) => new Date(year, currentMonth.getMonth(), i + 1)
	)
	const nextMonthDays = Array.from(
		{ length: 6 - lastDayOfMonth },
		(_, i) => new Date(year, currentMonth.getMonth() + 1, i + 1)
	)
	const calendarDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]

	const daysWithReminders = Array.from(
		new Set(reminders.map(reminder => new Date(reminder.time).toDateString()))
	).map(dateString => new Date(dateString))

	const displayDays = isMobile
		? weekDays
		: activeSorts.alphabetical || activeSorts.time
		? daysWithReminders
		: calendarDays

	// Navigation handlers
	const handlePrevious = () =>
		setCurrentMonth(
			new Date(
				currentMonth.setDate(currentMonth.getDate() - (isMobile ? 7 : 30))
			)
		)
	const handleNext = () =>
		setCurrentMonth(
			new Date(
				currentMonth.setDate(currentMonth.getDate() + (isMobile ? 7 : 30))
			)
		)

	return (
		<div className='py-2'>
			<CalendarHeader
				month={month}
				year={year}
				onPreviousMonth={handlePrevious}
				onNextMonth={handleNext}
			/>
			<div className={isMobile ? 'grid grid-cols-[30px_1fr]' : ''}>
				{!(activeSorts.alphabetical || activeSorts.time) && (
					<CalendarDays daysOfWeek={daysOfWeek} isMobile={isMobile} />
				)}
				<div
					className={
						isMobile
							? 'flex flex-col items-stretch gap-[2px] bg-orange-400 dark:bg-gray-800'
							: 'grid grid-cols-7 gap-[1px] bg-orange-400 dark:bg-gray-800'
					}
				>
					{displayDays.map((day, index) => {
						const dayReminders = reminders.filter(
							reminder =>
								new Date(reminder.time).toDateString() === day.toDateString()
						)
						return isMobile ? (
							<CalendarCellMobile
								key={index}
								day={day}
								today={today}
								reminders={dayReminders}
								setShowPopup={setShowPopup}
								setTimeData={setTimeData}
								deleteReminder={deleteReminder}
								updateReminder={updateReminder}
								currentMonth={currentMonth}
							/>
						) : (
							<CalendarCell
								key={index}
								day={day}
								today={today}
								reminders={dayReminders}
								currentMonth={currentMonth}
								setShowPopup={setShowPopup}
								setTimeData={setTimeData}
								deleteReminder={deleteReminder}
								updateReminder={updateReminder}
							/>
						)
					})}
				</div>
			</div>
		</div>
	)
}
