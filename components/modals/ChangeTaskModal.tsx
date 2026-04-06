'use client'

import { useChangeTaskModal, useWidth } from '@/hooks'
import { useGetTaskById } from '@/hooks/useTasks'
import isBefore from 'date-fns/isBefore'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Modal from 'react-modal'
import Switch from 'react-switch'
import { DatePicker } from 'rsuite'
import { useTaskContext } from '../providers'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

interface CreateTaskModalProps {
	isOpen: boolean
	onClose: () => void
}

type FormValues = {
	title: string
	description: string
	category: { name: string }
	startTime: Date
	endTime: Date
}

export const ChangeTaskModal: FC<CreateTaskModalProps> = ({
	isOpen,
	onClose,
}) => {
	const width = useWidth()
	const isMobile = width < 945
	const searchParams = useSearchParams()
	const taskId = searchParams.get('id') || ''
	const { data } = useGetTaskById(taskId)
	const { updateQueryParam } = useChangeTaskModal()
	const { handleUpdate } = useTaskContext()
	const [enabled, setEnabled] = useState(true)
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			title: data?.title || '',
			description: data?.description || '',
			category: { name: data?.category?.name || '' },
			startTime: data?.startTime ? new Date(data.startTime) : new Date(),
			endTime: data?.endTime
				? new Date(data.endTime)
				: new Date(new Date().getTime() + 60 * 60 * 24 * 1000),
		},
		mode: 'onChange',
	})

	useEffect(() => {
		if (data) {
			setValue('title', data.title || '')
			setValue('description', data.description || '')
			setValue('category', { name: data.category?.name || '' })
			setValue('startTime', data.startTime ? new Date(data.startTime) : new Date())
			setValue('endTime', data.endTime ? new Date(data.endTime) : new Date(new Date().getTime() + 60 * 60 * 24 * 1000))
		}
	}, [data, setValue])

	const onSubmit = async (data: FormValues) => {
		await handleUpdate(taskId, data)
		onClose()
	}

	const toggleStartTime = () => setEnabled(prev => !prev)

	const handleInputChange = (id: keyof FormValues, value: any) => {
		setValue(id, value)
		updateQueryParam(id, value)
	}

	if (!isOpen) return null

	return (
		<AnimatePresence>
			{isOpen && (
				<Modal
					isOpen={isOpen}
					onRequestClose={onClose}
					contentLabel='ChangeTask Modal'
					ariaHideApp={false}
					style={{
						overlay: {
							backgroundColor: 'rgba(0,0,0,0.5)',
							display: 'flex',
							justifyContent: 'center',
							zIndex: isMobile ? 7 : 6,
							backdropFilter: 'blur(4px)',
							height: '100%',
							overflow: 'auto',
						},
						content: {
							position: 'relative',
							inset: 'auto',
							padding: '0',
							border: 'none',
							background: 'none',
							borderRadius: '12px',
							width: '100%',
							maxWidth: '700px',
							overflow: 'auto',
							margin: '0 auto',
							overscrollBehavior: 'contain',
							height: width < 1000 ? '100vh' : 'auto',
						},
					}}
				>
					<motion.div
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.15 }}
						className='p-4 md:p-6 lg:mx-2 lg:mt-10 relative bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-white/[0.08] rounded-xl text-gray-900 dark:text-gray-100 h-full min-h-[650px] lg:h-auto'
					>
						<div className='mb-4'>
							<h1 className='text-xl font-bold text-gray-900 dark:text-white'>
								Edit Task
							</h1>
							<p className='text-sm text-gray-500 dark:text-gray-400 mt-0.5'>
								Update your task details
							</p>
						</div>

						<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
							<div className='grid sm:grid-cols-2 gap-4 pb-4 border-b border-gray-200 dark:border-white/[0.08]'>
								<div className='sm:col-span-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
									<Switch
										onChange={toggleStartTime}
										checked={!enabled}
										offColor='#D1D5DB'
										onColor='#6366F1'
										width={40}
										height={20}
										uncheckedIcon={<></>}
										checkedIcon={<></>}
										checkedHandleIcon={<Check className='ml-[1px] pt-[3px]' size={14} />}
										uncheckedHandleIcon={<X className='ml-[1px] pt-[3px]' size={14} />}
									/>
									<span>Enable custom start time</span>
								</div>
								<label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
									Start Time
									<Controller
										name='startTime'
										control={control}
										disabled={enabled}
										render={({ field }) => (
											<DatePicker {...field} limitStartYear={2024} size={width >= 640 ? 'lg' : 'sm'} oneTap block shouldDisableDate={date => isBefore(date, new Date())} />
										)}
									/>
								</label>
								<label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
									End Time
									<Controller
										name='endTime'
										control={control}
										render={({ field }) => (
											<DatePicker {...field} limitEndYear={2100} size={width >= 640 ? 'lg' : 'sm'} oneTap block shouldDisableDate={date => isBefore(date, new Date())} />
										)}
									/>
								</label>
							</div>

							<label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
								Title
								<Controller
									name='title'
									control={control}
									rules={{ required: 'Title is required' }}
									render={({ field }) => (
										<Input {...field} placeholder='Task title...' className='mt-1' onChange={e => handleInputChange('title', e.target.value)} />
									)}
								/>
								{errors.title && <span className='text-red-500 text-xs mt-1'>{errors.title.message}</span>}
							</label>

							<label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
								Category
								<Controller
									name='category'
									control={control}
									rules={{ required: 'Category is required' }}
									render={({ field }) => (
										<Input {...field} value={field.value.name} placeholder='e.g. Work, Personal...' className='mt-1' onChange={e => handleInputChange('category', { name: e.target.value })} />
									)}
								/>
								{errors.category && <span className='text-red-500 text-xs mt-1'>{errors.category.message}</span>}
							</label>

							<label className='text-sm font-medium text-gray-700 dark:text-gray-300'>
								Description
								<Controller
									name='description'
									control={control}
									rules={{ required: 'Description is required' }}
									render={({ field }) => (
										<Textarea {...field} placeholder='What needs to be done...' className='mt-1' onChange={e => handleInputChange('description', e.target.value)} />
									)}
								/>
								{errors.description && <span className='text-red-500 text-xs mt-1'>{errors.description.message}</span>}
							</label>

							<Button className='w-full mt-2' type='submit'>
								Save Changes
							</Button>
						</form>

						<Button className='absolute right-3 top-3' variant='ghost' size='icon' onClick={onClose}>
							<X className='w-5 h-5 text-gray-400' />
						</Button>
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	)
}
