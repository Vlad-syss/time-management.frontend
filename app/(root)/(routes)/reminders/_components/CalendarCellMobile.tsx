'use client'

import { Button } from '@/components/ui/button'
import { Reminder } from '@/types'
import cn from 'classnames'
import { Plus } from 'lucide-react'
import { FC } from 'react'
import { CalendarItem } from './CalendarItem'

interface CalendarCellMobileProps {
	day: Date
	today: Date
	reminders: Reminder[]
	setShowPopup: (value: boolean) => void
	setTimeData: (value: string) => void
	deleteReminder: (id: string) => void
	updateReminder: (id: string, data: any) => void
	currentMonth: Date
}

export const CalendarCellMobile: FC<CalendarCellMobileProps> = ({
	day,
	today,
	reminders,
	setShowPopup,
	setTimeData,
	deleteReminder,
	updateReminder,
	currentMonth,
}) => {
	const isToday = day.toDateString() === today.toDateString()
	const handleCreate = () => {
		const nextDay = new Date(day)
		nextDay.setDate(day.getDate() + 1)
		const formattedDate = nextDay.toISOString().slice(0, 16)
		setShowPopup(true)
		setTimeData(formattedDate)
	}

	return (
		<div
			className={cn(
				'flex flex-col group relative items-start p-2 min-h-[80px] transition-transform duration-150',
				{
					'bg-orange-200 dark:bg-gray-800': isToday,
					'bg-orange-100 dark:bg-slate-700 hover:bg-orange-200 dark:hover:bg-slate-800':
						!isToday && day.getMonth() === currentMonth.getMonth(),
					'bg-gray-200 dark:bg-gray-700 text-gray-500':
						day.getMonth() !== currentMonth.getMonth(),
				}
			)}
		>
			<span className='text-sm font-medium mb-1'>{day.getDate()}</span>
			{reminders.map(reminder => (
				<CalendarItem
					key={reminder._id}
					reminder={reminder}
					deleteReminder={deleteReminder}
					updateReminder={updateReminder}
				/>
			))}
			<Button
				size='icon'
				variant='ghost'
				className='group-hover:opacity-100 md:opacity-0 dark:hover:bg-gray-600 dark:hover:text-white absolute top-1 right-1 w-5 h-5'
				onClick={handleCreate}
			>
				<Plus />
			</Button>
		</div>
	)
}
