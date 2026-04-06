import { AnimatePresence, motion } from 'framer-motion'
import { Pen, User } from 'lucide-react'
import Link from 'next/link'
import { FC, MutableRefObject, useEffect, useState } from 'react'
import Modal from 'react-modal'

interface MiniProfileModalProps {
	isOpen: boolean
	onClose: () => void
	elementRef: MutableRefObject<HTMLButtonElement | null>
}

export const MiniProfileModal: FC<MiniProfileModalProps> = ({
	elementRef,
	isOpen,
	onClose,
}) => {
	const [coords, setCoords] = useState({ top: 0, left: 0, width: 0, height: 0 })

	useEffect(() => {
		if (elementRef.current) {
			const rect = elementRef.current.getBoundingClientRect()
			setCoords({
				top: rect.top,
				left: rect.left,
				width: rect.width,
				height: rect.height,
			})
		}
	}, [elementRef, isOpen])

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
							backgroundColor: 'transparent',
							display: 'flex',
							justifyContent: 'center',
							zIndex: '1000',
						},
						content: {
							position: 'absolute',
							top: `${coords.top / 1.05}px`,
							left: `${coords.left * 1.63}px`,
							padding: '0',
							border: 'none',
							background: 'none',
							borderRadius: '12px',
							width: '220px',
							height: '140px',
							transform: 'translate(-50%,0)',
						},
					}}
				>
					<motion.div
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.15 }}
						className='bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-white/[0.08] rounded-xl p-1.5 shadow-elevated'
					>
						<div className='flex flex-col'>
							<Link
								href='/profile'
								onClick={onClose}
								className='flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors'
							>
								<User className='w-4 h-4' />
								View Profile
							</Link>
							<Link
								href='profile?tabs=change'
								onClick={onClose}
								className='flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-t border-gray-100 dark:border-white/[0.06]'
							>
								<Pen className='w-4 h-4' />
								Edit Profile
							</Link>
						</div>
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	)
}
