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
	const { isPending, isError, reminderData, deleteReminder, updateReminder } =
		useReminderContext()
	const width = useWidth()
	const isMobile = width <= 768
	const [showPopup, setShowPopup] = useState(false)

	return (
		<AnimatePresence>
			{isOpen && (
				<Modal
					isOpen={isOpen}
					onRequestClose={onClose}
					contentLabel='Confirmation Modal'
					ariaHideApp={false}
					style={{
						overlay: {
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							zIndex: '1000',
							overflowY: 'auto',
						},
						content: {
							position: 'absolute',
							padding: '0',
							border: 'none',
							background: 'none',
							borderRadius: isMobile ? '0px' : '5px',
							width: isMobile ? '100%' : '450px',
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
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='relative bg-orange-300 h-full p-2 pr-0 shadow-xl dark:text-white dark:bg-slate-700 rounded-lg flex flex-col items-left md'
					>
						<Button
							variant='ghost'
							size='icon'
							onClick={onClose}
							className='absolute right-1 z-10 top-1 w-7 h-7 p-0 hover:bg-red-500 hover:text-white dark:hover:bg-slate-600'
						>
							<X className='w-5 h-5' />
						</Button>
						<h2 className='mb-1 uppercase text-xl md:text-lg drop-shadow-xl text-orange-700 dark:text-slate-300 font-bold tracking-widest'>
							Reminders:
						</h2>
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
								className='flex w-full text-lg py-6 items-center gap-2 font-medium'
								onClick={() => setShowPopup(!showPopup)}
							>
								Add new
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
