'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { BellRing } from 'lucide-react'
import React from 'react'
import Modal from 'react-modal'
import { Button } from '../ui/button'

interface ConfirmModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: () => void
	message: string
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	message,
}) => {
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
							backgroundColor: 'rgba(100, 0, 0, 0.45)',
							display: 'flex',
							justifyContent: 'center',
							zIndex: '1000',
							backdropFilter: 'blur(2px)',
						},
						content: {
							position: 'relative',
							inset: 'auto',
							padding: '0',
							border: 'none',
							background: 'none',
							borderRadius: '5px',
							maxWidth: '600px',
						},
					}}
				>
					<motion.div
						initial={{ y: -10, opacity: 0 }}
						animate={{
							y: 0,
							opacity: 1,
						}}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.15 }}
						className='bg-orange-200 p-2 py-3 md:p-5 md:mx-2 md:mt-10'
					>
						<div className='flex gap-2 items-start mb-12'>
							<span className='flex items-center justify-center p-3 md:p-4 mx-4 rounded-full bg-blue-500/30'>
								<BellRing className='w-6 h-6 md:w-9 md:h-9' />
							</span>
							<div className='flex flex-col gap-1'>
								<p className='font-semibold md:text-[18px] text-[16px] leading-[1.4rem]'>
									{message}
								</p>
								<span className=' text-xs md:text-sm text-gray-900/80'>
									All the data stayed in security so dont worry about it ;)
								</span>
							</div>
						</div>
						<div className='flex items-center justify-end gap-2 tracking-[1px]'>
							<Button
								onClick={onClose}
								size='sm'
								variant='outline'
								className='text-orange-800 hover:text-white'
							>
								Close
							</Button>
							<Button
								size='sm'
								onClick={onConfirm}
								style={{ marginRight: '10px' }}
							>
								Move on
							</Button>
						</div>
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	)
}
