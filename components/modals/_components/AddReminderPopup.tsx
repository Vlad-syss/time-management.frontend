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
				'bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-white/[0.08] shadow-elevated p-3 px-3 z-10 rounded-xl',
				{
					'-mx-2 w-full fixed': isMobile,
					'absolute': !isMobile,
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
			<h4 className='text-sm font-semibold text-gray-900 dark:text-white mb-2'>
				New Reminder
			</h4>
			<div className='grid grid-cols-12 grid-rows-3 md:grid-rows-2 gap-x-1 gap-y-2'>
				<input
					type='text'
					placeholder='Message'
					value={message}
					onChange={e => setMessage(e.target.value)}
					className='w-full p-2 border border-gray-200 dark:border-white/[0.08] rounded-lg bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 col-span-12 md:col-span-11 focus:outline-none focus:ring-2 focus:ring-indigo-500/50'
				/>
				<input
					type='datetime-local'
					value={time}
					onChange={e => setTime(e.target.value)}
					className='w-full p-2 border border-gray-200 dark:border-white/[0.08] rounded-lg bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-gray-100 col-span-12 md:col-span-11 col-start-1 row-start-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/50'
				/>
				<Button
					size='add'
					className='md:row-span-2 md:col-start-12 col-span-12 mt-1 md:mt-0 md:row-start-1'
					onClick={handleAddReminder}
				>
					<AlarmClockCheck className='w-4 h-4' />
				</Button>
			</div>
			<Button
				className='absolute top-2 right-2 w-6 h-6'
				variant='ghost'
				size='icon'
				onClick={onClose}
			>
				<X className='w-4 h-4 text-gray-400' />
			</Button>
		</div>
	)
}

export default AddReminderPopup
