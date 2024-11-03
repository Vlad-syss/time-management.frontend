import { ReminderItem } from '@/app/(root)/_components/ReminderItem'
import { ChangeReminder, Reminder } from '@/types'
import { Scrollbars } from 'react-custom-scrollbars-2'

interface ReminderListProps {
	isPending: boolean
	isError: boolean
	reminderData: Reminder[] | undefined
	deleteReminder: (id: string) => void
	updateReminder: (id: string, data: ChangeReminder) => void
	isMobile: boolean
}

const ReminderList = ({
	isPending,
	isError,
	reminderData,
	deleteReminder,
	updateReminder,
	isMobile,
}: ReminderListProps) => {
	if (isPending) {
		return (
			<div className='flex justify-center items-center h-full py-4 pr-3'>
				<div className='loader border-t-4 border-orange-400 border-solid rounded-full w-8 h-8 animate-spin'></div>
				<p className='ml-2 text-gray-600 dark:text-gray-300'>
					Loading reminders...
				</p>
			</div>
		)
	}

	if (isError) {
		return (
			<p className='text-red-600 dark:text-red-400 mt-4 pr-3'>
				Error loading reminders.
			</p>
		)
	}

	if (!reminderData || reminderData.length === 0) {
		return (
			<p className='text-gray-500 dark:text-gray-400 mt-4 pr-3'>
				No reminders found.
			</p>
		)
	}

	return (
		<Scrollbars
			style={{
				height: isMobile ? '90%' : '400px',
				width: '100%',
				marginBottom: '10px',
			}}
		>
			<div className='w-full mt-2 space-y-3 pr-3'>
				{reminderData.map(reminder => (
					<ReminderItem
						key={reminder._id}
						reminder={reminder}
						deleteReminder={deleteReminder}
						updateReminder={updateReminder}
					/>
				))}
			</div>
		</Scrollbars>
	)
}

export default ReminderList
