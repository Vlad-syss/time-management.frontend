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
							backgroundColor: 'rgba(100, 0, 0, 0)',
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
							borderRadius: '5px',
							width: '250px',
							height: '170px',
							transform: 'translate(-50%,0)',
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
						className='bg-orange-200 p-1 py-2 md:p-2 md:mx-2 dark:text-white dark:bg-slate-600 rounded-lg'
					>
						<div className='grid grid-cols-1 grid-rows-2 items-start font-medium text-sm'>
							<Link
								href='/profile'
								className='flex items-center gap-2 p-1 hover:bg-transparent/20'
							>
								<User className='w-5 h-5' />
								View Profile
							</Link>
							<Link
								href='profile?tabs=change'
								className='flex items-center gap-2 p-1 border-t-2 border-white hover:bg-transparent/20'
							>
								<Pen className='w-4 h-4' /> Change Profile
							</Link>
						</div>
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	)
}
