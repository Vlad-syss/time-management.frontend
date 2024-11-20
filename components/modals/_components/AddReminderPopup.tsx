import { useReminderContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { useWidth } from '@/hooks'
import cn from 'classnames'
import { AlarmClockCheck, X } from 'lucide-react'
import { useState } from 'react'

interface AddReminderPopupProps {
	onClose: () => void
	top?: string
	right?: string
	width?: string
	messageData?: string
	timeData?: string
	isMobile?: boolean
}

const AddReminderPopup = ({
	onClose,
	top = '-240px',
	right = '0',
	width = '100%',
	messageData,
	timeData,
	isMobile,
}: AddReminderPopupProps) => {
	const { createReminder } = useReminderContext()
	const widthScreen = useWidth()
	const isSmall = widthScreen < 768 && isMobile
	const isVerySmall = widthScreen < 500 && isMobile
	const [message, setMessage] = useState(messageData || '')
	const [time, setTime] = useState(timeData || '')

	const handleAddReminder = () => {
		if (message && time) {
			createReminder({ message, time: new Date(time) })
			setMessage('')
			setTime('')
			onClose()
		}
	}

	return (
		<div
			className={cn(
				' bg-orange-300 dark:bg-slate-700 border border-orange-600 dark:border-slate-200 shadow-lg p-3 px-2 z-10',
				{
					'-mx-2 w-full  fixed': isMobile,
					'rounded-lg absolute': !isMobile,
				}
			)}
			style={{
				top,
				right: !isMobile ? right : '7px',
				width: isVerySmall
					? '100%'
					: isSmall
					? '100%'
					: !isMobile
					? width
					: '100%',
			}}
		>
			<h4 className='text-lg font-medium mb-2'>Create Reminder</h4>
			<div className='grid grid-cols-12 grid-rows-3 md:grid-rows-2 gap-x-1'>
				<input
					type='text'
					placeholder='Message'
					value={message}
					onChange={e => setMessage(e.target.value)}
					className='w-full mb-2 p-2 border rounded bg-orange-300 border-orange-600 dark:border-slate-200  dark:bg-slate-600 col-span-12 md:col-span-11'
				/>
				<input
					type='datetime-local'
					value={time}
					onChange={e => setTime(e.target.value)}
					className='w-full p-2 border rounded bg-orange-300 border-orange-600 dark:border-slate-200  dark:bg-slate-600 col-span-12 md:col-span-11 col-start-1 row-start-2'
				/>
				<Button
					size='add'
					className='md:row-span-2 md:col-start-12 col-span-12 mt-2 md:mt-0 md:row-start-1'
					onClick={handleAddReminder}
				>
					<AlarmClockCheck />
				</Button>
			</div>
			<Button
				className='absolute top-1 right-1 w-5 h-5 dark:hover:text-white dark:hover:bg-slate-500'
				variant='ghost'
				size='icon'
				onClick={onClose}
			>
				<X />
			</Button>
		</div>
	)
}

export default AddReminderPopup
