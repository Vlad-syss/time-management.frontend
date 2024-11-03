import { Button } from '@/components/ui/button'
import { ChangeReminder, Reminder } from '@/types'
import cn from 'classnames'
import { motion } from 'framer-motion'
import { CheckCircle2, Pen, Trash } from 'lucide-react'
import { FC, useEffect, useState } from 'react'

interface ReminderItemProps {
	reminder: Reminder
	deleteReminder: (id: string) => void
	updateReminder: (id: string, data: ChangeReminder) => void
}

export const ReminderItem: FC<ReminderItemProps> = ({
	reminder,
	deleteReminder,
	updateReminder,
}) => {
	const [isEditiable, setIsEditialbe] = useState(false)
	const [isExpired, setIsExpired] = useState(false)
	const [editedMessage, setEditedMessage] = useState(reminder.message)
	const [editedTime, setEditedTime] = useState(new Date(reminder.time))

	useEffect(() => {
		const now = new Date()
		setIsExpired(new Date(reminder.time) < now)
	}, [reminder.time])

	const handleUpdate = () => {
		updateReminder(reminder._id, {
			message: editedMessage,
			time: editedTime,
		})
		setIsEditialbe(false)
	}

	return (
		<motion.div
			initial={{ y: 20, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			className={`p-2 rounded-md shadow-md text-left ${
				isExpired ? 'bg-red-500' : 'bg-orange-400 dark:bg-slate-600'
			}`}
		>
			{isEditiable ? (
				<input
					type='text'
					value={editedMessage}
					onChange={e => setEditedMessage(e.target.value)}
					className='w-full text-xl md:text-lg font-semibold text-gray-800 dark:text-white bg-transparent focus:outline-none'
				/>
			) : (
				<h3 className='text-xl md:text-lg font-semibold text-gray-800 dark:text-white'>
					{reminder.message}
				</h3>
			)}
			{isEditiable ? (
				<input
					type='datetime-local'
					value={new Date(editedTime).toISOString().slice(0, -1)}
					onChange={e => setEditedTime(new Date(e.target.value))}
					className='w-full text-base md:text-sm text-gray-500 dark:text-gray-300 bg-transparent focus:outline-none mt-1 mb-3'
				/>
			) : (
				<p className=' text-base md:text-sm text-gray-500 dark:text-gray-300 mt-1 mb-5'>
					{!isExpired ? (
						<span className='font-medium text-orange-100 dark:text-slate-300'>
							Date&time: {new Date(reminder.time).toLocaleString()}
						</span>
					) : (
						<span className='uppercase text-red-700 tracking-wide font-bold'>
							Expired
						</span>
					)}
				</p>
			)}
			<div className='flex flex-col sm:flex-row items-center gap-1'>
				<Button
					variant='add'
					size='icon'
					className={cn(
						'w-full py-1 h-7 bg-red-500 border-none hover:bg-red-600 rounded-md',
						{
							'bg-red-700 hover:bg-red-800': isExpired,
						}
					)}
					onClick={() => deleteReminder(reminder._id)}
				>
					<Trash className='w-4 h-4' />
				</Button>
				{!isExpired && !isEditiable && (
					<Button
						variant='add'
						size='icon'
						className='w-full py-1 h-7 bg-gray-400 border-none hover:bg-gray-300 rounded-md'
						onClick={() => setIsEditialbe(true)}
					>
						<Pen className='w-4 h-4' />
					</Button>
				)}
				{isEditiable && (
					<Button
						variant='add'
						size='icon'
						className='w-full py-1 h-7 bg-green-400 border-none hover:bg-green-300 rounded-md'
						onClick={handleUpdate}
					>
						<CheckCircle2 className='w-4 h-4' />
					</Button>
				)}
			</div>
		</motion.div>
	)
}
