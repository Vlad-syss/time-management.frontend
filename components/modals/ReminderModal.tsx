'use client'

import { useWidth } from '@/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useState } from 'react'
import Modal from 'react-modal'
import { useReminderContext } from '../providers'
import { Button } from '../ui/button'
import AddReminderPopup from './_components/AddReminderPopup'
import ReminderList from './_components/ReminderList'

interface ReminderModalProps {
	isOpen: boolean
	onClose: () => void
}

export const ReminderModal = ({ isOpen, onClose }: ReminderModalProps) => {
	const {
		isPending,
		isError,
		reminderData,
		deleteReminder,
		updateReminder,
		markAllRead,
		count,
	} = useReminderContext()
	const width = useWidth()
	const isMobile = width <= 768
	const [showPopup, setShowPopup] = useState(false)

	return (
		<AnimatePresence>
			{isOpen && (
				<Modal
					isOpen={isOpen}
					onRequestClose={onClose}
					contentLabel='Reminder Modal'
					ariaHideApp={false}
					style={{
						overlay: {
							backgroundColor: 'rgba(0,0,0,0.5)',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							zIndex: '1000',
							overflowY: 'auto',
							backdropFilter: 'blur(4px)',
						},
						content: {
							position: 'absolute',
							padding: '0',
							border: 'none',
							background: 'none',
							borderRadius: isMobile ? '0px' : '12px',
							width: isMobile ? '100%' : '420px',
							height: isMobile ? '100%' : '500px',
							top: isMobile ? '0' : '20px',
							right: isMobile ? '0' : '10px',
							left: 'auto',
							bottom: 'auto',
							overflowY: 'auto',
						},
					}}
				>
					<motion.div
						initial={{ scale: 0.95, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.95, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='relative bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-white/[0.08] h-full p-4 pr-2 rounded-xl flex flex-col'
					>
						<Button
							variant='ghost'
							size='icon'
							onClick={onClose}
							className='absolute right-2 z-10 top-2 w-7 h-7'
						>
							<X className='w-4 h-4 text-gray-400' />
						</Button>

						<div className='flex items-center justify-between pr-8 mb-3'>
							<h2 className='text-lg font-bold text-gray-900 dark:text-white'>
								Reminders
							</h2>
							{count > 0 && (
								<Button
									variant='ghost'
									size='sm'
									onClick={markAllRead}
									className='text-xs text-indigo-500 dark:text-indigo-400'
								>
									Mark all read
								</Button>
							)}
						</div>

						<ReminderList
							isPending={isPending}
							isError={isError}
							reminderData={reminderData}
							deleteReminder={deleteReminder}
							updateReminder={updateReminder}
							isMobile={isMobile}
						/>

						<div className='relative mt-auto mr-2'>
							<Button
								className='flex w-full items-center gap-2'
								onClick={() => setShowPopup(!showPopup)}
							>
								Add reminder
							</Button>
							{showPopup && (
								<AddReminderPopup
									onClose={() => setShowPopup(false)}
									top={!isMobile ? '-170px' : '-240px'}
								/>
							)}
						</div>
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	)
}
