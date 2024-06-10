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
							paddingTop: '40px',
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
						className='bg-orange-200 p-5 mx-2'
					>
						<div className='flex gap-2 items-start mb-12'>
							<span className='flex items-center justify-center p-4 mx-4 rounded-full bg-blue-500/30'>
								<BellRing size={35} />
							</span>
							<div className='flex flex-col gap-1'>
								<p className='font-semibold text-[18px] leading-[1.4rem]'>
									{message}
								</p>
								<span className=' text-sm text-gray-900/80'>
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
