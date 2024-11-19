import { Button } from '@/components/ui/button'
import { ChangeReminder, Reminder } from '@/types'
import { format } from 'date-fns'
import { Check, Pen, Trash } from 'lucide-react'
import { useState } from 'react'

export const CalendarItem: React.FC<{
	reminder: Reminder
	deleteReminder: (id: string) => void
	updateReminder: (id: string, data: ChangeReminder) => void
}> = ({ reminder, deleteReminder, updateReminder }) => {
	const [isEditable, setIsEditable] = useState(false)
	const [editedMessage, setEditedMessage] = useState(reminder.message)
	const [editedTime, setEditedTime] = useState(new Date(reminder.time))

	const handleUpdate = () => {
		updateReminder(reminder._id, { message: editedMessage, time: editedTime })
		setIsEditable(false)
	}

	return (
		<div className='flex flex-col text-xs mt-1'>
			{isEditable ? (
				<input
					type='datetime-local'
					value={new Date(editedTime).toISOString().slice(0, -1)}
					onChange={e => setEditedTime(new Date(e.target.value))}
					className='w-full text-xs text-gray-500 dark:text-gray-300 bg-transparent focus:outline-none'
				/>
			) : (
				<span className='font-semibold text-orange-700 dark:text-gray-400'>
					{format(new Date(reminder.time), 'HH:mm')}
				</span>
			)}
			{isEditable ? (
				<input
					type='text'
					value={editedMessage}
					onChange={e => setEditedMessage(e.target.value)}
					className='w-full text-sm font-semibold text-gray-800 dark:text-white bg-transparent focus:outline-none'
				/>
			) : (
				<span className='font-medium text-gray-700 dark:text-gray-300'>
					{reminder.message}
				</span>
			)}
			{!isEditable && (
				<>
					<Button
						size='icon'
						variant='ghost'
						className='group-hover:opacity-100 md:opacity-0 dark:hover:bg-red-600 dark:hover:text-white absolute top-1 right-6 w-5 h-5 p-[2px] text-red-500 hover:text-white'
						onClick={() => deleteReminder(reminder._id)}
					>
						<Trash />
					</Button>
					<Button
						size='icon'
						variant='ghost'
						className='group-hover:opacity-100 md:opacity-0 dark:hover:bg-gray-600 dark:hover:text-white absolute top-1 right-11 w-5 h-5 p-[2px] text-gray-500 hover:text-white'
						onClick={() => setIsEditable(true)}
					>
						<Pen />
					</Button>
				</>
			)}
			{isEditable && (
				<>
					<Button
						size='icon'
						variant='ghost'
						className='dark:bg-green-600 dark:text-white absolute bottom-1 right-1 w-4 h-4 p-[2px]'
						onClick={handleUpdate}
					>
						<Check />
					</Button>
				</>
			)}
		</div>
	)
}
