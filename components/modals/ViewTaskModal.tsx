'use client'

import { useChangeTaskModal, useWidth } from '@/hooks'
import { useGetTaskById } from '@/hooks/useTasks'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import Modal from 'react-modal'
import { useTaskContext } from '../providers'
import { Button } from '../ui/button'

interface ConfirmModalProps {
	isOpen: boolean
	onClose: () => void
}

export const ViewTaskModal: React.FC<ConfirmModalProps> = ({
	isOpen,
	onClose,
}) => {
	const width = useWidth()
	const isMobile = width < 640 // Adapt for screens smaller than 640px (mobile)
	const searchParams = useSearchParams()
	const taskId = searchParams.get('taskId') || ''
	const { data, isPending } = useGetTaskById(taskId)
	const { handleComplete, handleArchive, handleDelete } = useTaskContext()
	const { openModal } = useChangeTaskModal()
	const {
		title,
		description,
		category,
		status,
		startTime: start,
		endTime: end,
	} = data || {}

	const startTime = new Date(start || '')
	const endTime = new Date(end || '')

	const getStatus = () => {
		if (status?.isArchiving && !status?.archived) return 'isArchiving'
		if (status?.completed) return 'completed'
		if (!status?.completed && !status?.archived) return 'on progress'
		return 'archived'
	}

	const formatteTime = (time: Date) =>
		`${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`

	const handleChange = (id: string, category?: string) => {
		openModal(id, category)
	}

	const handleArch = (id: string) => {
		handleArchive(id)
		onClose()
	}

	const handleComp = (id: string) => {
		handleComplete(id)
		onClose()
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<Modal
					isOpen={isOpen}
					onRequestClose={onClose}
					contentLabel='Task Modal'
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
							maxWidth: isMobile ? '100%' : '650px', // Full screen for mobile
							width: '100%',
							maxHeight: isMobile ? '90vh' : 'auto', // Modal height for mobile
							overflowY: isMobile ? 'scroll' : 'visible', // Scroll on mobile
						},
					}}
				>
					<motion.div
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.15 }}
						className={`bg-orange-200 p-4 md:p-6 dark:text-white dark:bg-slate-600 relative rounded-md border-2 dark:border-slate-300 border-red-400 ${
							isMobile ? 'p-2' : ''
						}`}
					>
						<Button
							onClick={onClose}
							size='icon'
							variant='ghost'
							className='absolute right-2 top-2 text-red-500 dark:text-white'
						>
							<X />
						</Button>
						{!data && isPending ? (
							<p>Loading...</p>
						) : (
							<div
								className={`flex flex-col gap-4 items-start ${
									isMobile ? 'text-sm' : 'text-base'
								}`}
							>
								<h1
									className={`font-bold dark:text-purple-300 text-orange-500 ${
										isMobile ? 'text-2xl' : 'text-4xl'
									}`}
								>
									{title}
								</h1>

								<div className='flex flex-col gap-2 w-full'>
									<p
										className={`font-bold border-b pb-2 dark:border-purple-300 border-orange-500 ${
											isMobile ? 'text-sm' : ''
										}`}
									>
										Description:
										<span className='block font-medium dark:text-green-400 text-sm'>
											{description}
										</span>
									</p>

									<div
										className={`grid ${
											isMobile ? 'grid-cols-1 gap-y-2' : 'grid-cols-2'
										} w-full`}
									>
										<div className='font-bold'>
											Category:
											<span className='font-medium dark:text-teal-300'>
												{' '}
												{category?.name}
											</span>
										</div>
										<div className='font-bold'>
											Status:
											<span className='font-medium dark:text-teal-300'>
												{' '}
												{getStatus()}
											</span>
										</div>
										<div className='font-bold'>
											Created at:
											<span className='font-medium dark:text-teal-300'>
												{' '}
												{formatteTime(startTime)}
											</span>
										</div>
										<div className='font-bold'>
											End time:
											<span className='font-medium dark:text-teal-300'>
												{' '}
												{formatteTime(endTime)}
											</span>
										</div>
									</div>
								</div>

								{!status?.archived && !status?.completed ? (
									<div
										className={`grid w-full ${
											isMobile ? 'grid-cols-1' : 'grid-cols-3'
										} gap-2 mt-3`}
									>
										<Button
											onClick={() => handleArch(data?._id || '')}
											variant='link'
											className={`w-full ${
												isMobile ? 'py-2' : ''
											} text-red-50 bg-red-400 hover:bg-red-500`}
										>
											Archive
										</Button>
										<Button
											onClick={() => handleChange(data?._id || '')}
											variant='add'
											className={`w-full ${
												isMobile ? 'py-2' : ''
											} text-gray-50 bg-gray-500/70 hover:bg-gray-300`}
										>
											Change
										</Button>
										<Button
											onClick={() => handleComp(data?._id || '')}
											variant='add'
											className={`w-full ${
												isMobile ? 'py-2' : ''
											} text-green-50 bg-green-500 hover:bg-green-600`}
										>
											Complete
										</Button>
									</div>
								) : (
									<div className='mt-6'>
										<Button
											onClick={() => handleDelete(taskId)}
											variant='add'
											className={`w-full text-red-50 bg-red-500 hover:bg-red-600 ${
												isMobile ? 'py-2' : ''
											}`}
										>
											Permanent Delete
										</Button>
										<p className='text-xs mt-1 text-gray-600 dark:text-white'>
											Make sure you really want to delete the task.
										</p>
									</div>
								)}
							</div>
						)}
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	)
}
