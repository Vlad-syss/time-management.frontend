import { useReminderContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { AlarmClockCheck } from 'lucide-react'
import { useState } from 'react'

interface AddReminderPopupProps {
	onClose: () => void
}

const AddReminderPopup = ({ onClose }: AddReminderPopupProps) => {
	const { createReminder } = useReminderContext()
	const [message, setMessage] = useState('')
	const [time, setTime] = useState('')

	const handleAddReminder = () => {
		if (message && time) {
			createReminder({ message, time: new Date(time) })
			setMessage('')
			setTime('')
			onClose()
		}
	}

	return (
		<div className='absolute top-[-240px] md:top-[-170px] right-0 bg-white dark:bg-slate-700 border rounded-lg shadow-lg p-3 px-2 z-10 w-full'>
			<h4 className='text-lg font-medium mb-2'>Create Reminder</h4>
			<div className='grid grid-cols-12 grid-rows-3 md:grid-rows-2 gap-x-1'>
				<input
					type='text'
					placeholder='Message'
					value={message}
					onChange={e => setMessage(e.target.value)}
					className='w-full mb-2 p-2 border rounded dark:bg-slate-600 col-span-12 md:col-span-11'
				/>
				<input
					type='datetime-local'
					value={time}
					onChange={e => setTime(e.target.value)}
					className='w-full p-2 border rounded dark:bg-slate-600 col-span-12 md:col-span-11 col-start-1 row-start-2'
				/>
				<Button
					size='add'
					className='md:row-span-2 md:col-start-12 col-span-12  mt-2 md:mt-0 md:row-start-1'
					onClick={handleAddReminder}
				>
					<AlarmClockCheck />
				</Button>
			</div>
		</div>
	)
}

export default AddReminderPopup
