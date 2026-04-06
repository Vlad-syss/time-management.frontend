'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
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
							backgroundColor: 'rgba(0,0,0,0.5)',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							zIndex: '1000',
							backdropFilter: 'blur(4px)',
						},
						content: {
							position: 'relative',
							inset: 'auto',
							padding: '0',
							border: 'none',
							background: 'none',
							borderRadius: '12px',
							maxWidth: '440px',
							width: '100%',
							margin: '0 16px',
						},
					}}
				>
					<motion.div
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.15 }}
						className='bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-white/[0.08] rounded-xl p-6'
					>
						<div className='flex gap-4 items-start mb-6'>
							<div className='w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0'>
								<AlertTriangle className='w-5 h-5 text-amber-600 dark:text-amber-400' />
							</div>
							<div>
								<p className='font-medium text-gray-900 dark:text-white'>
									{message}
								</p>
								<p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
									This action may not be reversible.
								</p>
							</div>
						</div>
						<div className='flex items-center justify-end gap-2'>
							<Button onClick={onClose} variant='outline' size='sm'>
								Cancel
							</Button>
							<Button size='sm' onClick={onConfirm}>
								Confirm
							</Button>
						</div>
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	)
}
