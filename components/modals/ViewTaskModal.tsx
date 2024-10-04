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
	const isMobile = width < 945
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
							maxWidth: '650px',
							width: '100%',
						},
					}}
				>
					<motion.div
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.15 }}
						className='bg-orange-200 p-2 py-2 md:p-3 md:mt-10 w-full dark:text-white dark:bg-slate-600 relative rounded-md border-2 dark:border-slate-300 border-red-400'
					>
						{!data && isPending ? (
							<p>Loading...</p>
						) : (
							<>
								<div className='flex flex-col gap-2 items-start'>
									<p className='text-[12px] tracking-wider dark:text-stone-300 leading-[10px] text-red-500 font-medium'>
										Info about task
									</p>
									<h1 className='uppercase font-bold text-[40px] leading-7 w-full dark:text-purple-300 text-orange-500'>
										{title}
									</h1>
									<p className='font-bold flex flex-col gap-1 pb-3 border-b-2 dark:border-purple-300 border-orange-500 dark:text-green-300 w-full'>
										FULL DESCRIPTION:
										<span className='font-medium dark:text-green-400 text-sm'>
											{description}
										</span>
									</p>
									<div className='grid grid-rows-2 grid-cols-2 whitespace-nowrap gap-x-5 border-x-2 px-2 dark:border-white border-black border-dashed gap-y-2 justify-center mt-3 w-full dark:text-teal-500'>
										<p className='font-bold flex gap-2 justify-end'>
											CATEGORY:
											<span className='font-medium tracking-wider dark:text-teal-300'>
												{category?.name}
											</span>
										</p>
										<p className='font-bold flex gap-2'>
											STATUS:
											<span className='font-medium tracking-wider dark:text-teal-300'>
												{getStatus()}
											</span>
										</p>
										<p className='font-bold flex gap-2 justify-end'>
											CREATED AT:
											<span className='font-medium tracking-wider dark:text-teal-300'>
												{formatteTime(startTime)}
											</span>
										</p>
										<p className='font-bold flex gap-2'>
											END TIME:
											<span className='font-medium tracking-wider dark:text-teal-300'>
												{formatteTime(endTime)}
											</span>
										</p>
									</div>
								</div>
								<Button
									onClick={onClose}
									size='icon'
									variant='ghost'
									className='text-orange-800 dark:text-white dark:hover:bg-slate-500/70 w-5 h-5 hover:text-white absolute right-1 top-1'
								>
									<X />
								</Button>
								{!status?.archived && !status?.completed ? (
									<div className='grid grid-cols-3 mt-8 gap-1 items-center'>
										<Button
											onClick={() => handleArch(data?._id || '')}
											variant='link'
											className='text-red-100 dark:text-red-100 bg-red-400 border-2 hover:no-underline border-red-500 hover:bg-red-500'
										>
											Archive
										</Button>
										<Button
											onClick={() => handleChange(data?._id || '')}
											variant='add'
											className='text-gray-50 dark:text-gray-100 dark:hover:text-gray-600 bg-gray-500/70 border-2 hover:no-underline border-gray-300 hover:bg-gray-300 hover:text-gray-600'
										>
											Change
										</Button>
										<Button
											onClick={() => handleComp(data?._id || '')}
											variant='add'
											className='text-green-50 dark:text-green-100 bg-green-500/70 border-2 hover:no-underline border-green-500 hover:bg-green-500'
										>
											Complete
										</Button>
									</div>
								) : (
									<div className='grid grid-cols-1 mt-8 gap-1 items-center'>
										<Button
											onClick={() => handleDelete(taskId)}
											variant='add'
											className='text-red-50 dark:text-red-100 bg-red-500/70 border-2 hover:no-underline border-red-500 hover:bg-red-500'
										>
											Permanent Delete
										</Button>
										<p className='text-xs leading-3 font-medium text-gray-600 dark:text-white'>
											make sure thats you really want to delete task.
										</p>
									</div>
								)}
							</>
						)}
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	)
}
