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
	const isMobile = width < 640
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
		if (status?.isArchiving && !status?.archived) return 'Expiring'
		if (status?.completed) return 'Completed'
		if (!status?.completed && !status?.archived) return 'In Progress'
		return 'Archived'
	}

	const getStatusClass = () => {
		if (status?.completed) return 'status-completed'
		if (status?.archived || status?.isArchiving) return 'status-archived'
		return 'status-active'
	}

	const formatteTime = (time: Date) =>
		`${time.getDate()}-${time.getMonth() + 1}-${time.getFullYear()}`

	const handleChange = (id: string) => {
		openModal(id)
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
							maxWidth: isMobile ? '100%' : '550px',
							width: '100%',
							margin: '0 16px',
							maxHeight: isMobile ? '90vh' : 'auto',
							overflowY: isMobile ? 'scroll' : 'visible',
						},
					}}
				>
					<motion.div
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.15 }}
						className='bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-white/[0.08] rounded-xl p-5 md:p-6 relative'
					>
						<Button
							onClick={onClose}
							size='icon'
							variant='ghost'
							className='absolute right-3 top-3'
						>
							<X className='w-5 h-5 text-gray-400' />
						</Button>

						{!data && isPending ? (
							<p className='text-gray-400'>Loading...</p>
						) : (
							<div className='flex flex-col gap-4'>
								<div className='flex items-start justify-between gap-4 pr-8'>
									<h1 className='text-xl font-bold text-gray-900 dark:text-white'>
										{title}
									</h1>
									<span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${getStatusClass()}`}>
										{getStatus()}
									</span>
								</div>

								{description && (
									<div className='border-b border-gray-100 dark:border-white/5 pb-3'>
										<p className='text-xs font-medium text-gray-500 dark:text-gray-400 mb-1'>
											Description
										</p>
										<p className='text-sm text-gray-700 dark:text-gray-300'>
											{description}
										</p>
									</div>
								)}

								<div className='grid grid-cols-2 gap-3 text-sm'>
									<div>
										<p className='text-xs font-medium text-gray-500 dark:text-gray-400'>
											Category
										</p>
										<p className='font-medium text-gray-900 dark:text-white'>
											{category?.name}
										</p>
									</div>
									<div>
										<p className='text-xs font-medium text-gray-500 dark:text-gray-400'>
											Status
										</p>
										<p className='font-medium text-gray-900 dark:text-white'>
											{getStatus()}
										</p>
									</div>
									<div>
										<p className='text-xs font-medium text-gray-500 dark:text-gray-400'>
											Start
										</p>
										<p className='font-medium text-gray-900 dark:text-white'>
											{formatteTime(startTime)}
										</p>
									</div>
									<div>
										<p className='text-xs font-medium text-gray-500 dark:text-gray-400'>
											Deadline
										</p>
										<p className='font-medium text-gray-900 dark:text-white'>
											{formatteTime(endTime)}
										</p>
									</div>
								</div>

								{!status?.archived && !status?.completed ? (
									<div className='grid grid-cols-3 gap-2 mt-2'>
										<Button
											onClick={() => handleArch(data?._id || '')}
											variant='destructive'
											size='sm'
										>
											Archive
										</Button>
										<Button
											onClick={() => handleChange(data?._id || '')}
											variant='outline'
											size='sm'
										>
											Edit
										</Button>
										<Button
											onClick={() => handleComp(data?._id || '')}
											size='sm'
										>
											Complete
										</Button>
									</div>
								) : (
									<div className='mt-2'>
										<Button
											onClick={() => handleDelete(taskId)}
											variant='destructive'
											className='w-full'
											size='sm'
										>
											Permanently Delete
										</Button>
										<p className='text-xs mt-1 text-gray-500 dark:text-gray-400'>
											This cannot be undone.
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
