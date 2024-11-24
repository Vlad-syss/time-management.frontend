'use client'

import { useChangeTaskModal, useWidth } from '@/hooks'
import { useGetTaskById } from '@/hooks/useTasks'
import cn from 'classnames'
import isBefore from 'date-fns/isBefore'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Worm, X } from 'lucide-react'
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
	const isMobile = width < 945 ? true : false
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
			category: {
				name: data?.category?.name || '',
			},
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
			setValue(
				'startTime',
				data.startTime ? new Date(data.startTime) : new Date()
			)
			setValue(
				'endTime',
				data.endTime
					? new Date(data.endTime)
					: new Date(new Date().getTime() + 60 * 60 * 24 * 1000)
			)
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
							backgroundColor: 'rgba(100, 0, 0, 0.45)',
							display: 'flex',
							justifyContent: 'center',
							zIndex: width <= 945 ? 7 : 6,
							backdropFilter: 'blur(2px)',
							height: '100%',
							overflow: 'auto',
						},
						content: {
							position: 'relative',
							inset: 'auto',
							padding: '0',
							border: 'none',
							background: 'none',
							borderRadius: '5px',
							width: '100%',
							maxWidth: '900px',
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
						className={cn(
							'p-2 py-3 md:p-5 lg:mx-2 lg:mt-10 relative bg-orange-200 text-black dark:bg-slate-600 dark:text-white h-full min-h-max  lg:h-auto'
						)}
					>
						<div className='flex flex-col gap-1 w-full'>
							<div className='grid gap-2 pb-3 border-b-2 border-yellow-400'>
								<h1 className='flex items-center gap-2 text-[22px] sm:text-[28px] tracking-wider font-bold'>
									<Worm className='w-8 h-8 sm:w-12 sm:h-12 text-pink-500' />
									Change Task!
								</h1>
								<p className='font-semibold flex items-center gap-[5px] px-2 text-xs sm:text-sm'>
									{width >= 640 ? (
										<span className='tracking-[5px] text-slate-500 dark:text-slate-300'>
											////
										</span>
									) : (
										''
									)}
									"Master Your Minutes: Streamline Your Schedule for Success"
									{width >= 640 ? (
										<span className='tracking-[5px] text-slate-500 dark:text-slate-300'>
											////
										</span>
									) : (
										''
									)}
								</p>
							</div>
						</div>
						<form
							className='py-2 sm:py-3 flex flex-col gap-2'
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className='grid sm:grid-cols-2 w-full gap-x-3 pb-2 border-b-2 border-yellow-200'>
								<span className='sm:col-span-2 flex items-center gap-2 text-xs sm:text-sm tracking-wide text-gray-700 font-semibold italic dark:text-gray-300 mb-1 sm:mb-0'>
									<Switch
										onChange={toggleStartTime}
										checked={!enabled}
										offColor='#84868a'
										onColor='#91db7d'
										width={45}
										height={22}
										uncheckedIcon={<></>}
										checkedIcon={<></>}
										checkedHandleIcon={
											<Check className='ml-[2px] pt-[5px]' size={16} />
										}
										uncheckedHandleIcon={
											<X className='ml-[2px] pt-[5px]' size={16} />
										}
									/>
									: enable to change start time of task for future goals!
								</span>
								<label
									htmlFor='timeStart'
									className='sm:text-center font-bold sm:text-lg'
								>
									Start Time:
									<Controller
										name='startTime'
										control={control}
										disabled={enabled}
										render={({ field }) => (
											<DatePicker
												{...field}
												limitStartYear={2024}
												size={width >= 640 ? 'lg' : 'sm'}
												oneTap
												block
												shouldDisableDate={date => isBefore(date, new Date())}
											/>
										)}
									/>
								</label>
								<label
									htmlFor='timeEnd'
									className='sm:text-center font-bold sm:text-lg'
								>
									End Time:
									<Controller
										name='endTime'
										control={control}
										render={({ field }) => (
											<DatePicker
												{...field}
												limitEndYear={1000}
												size={width >= 640 ? 'lg' : 'sm'}
												oneTap
												className='z-[100]'
												style={{
													zIndex: '1000 ',
												}}
												block
												shouldDisableDate={date => isBefore(date, new Date())}
											/>
										)}
									/>
								</label>
							</div>
							<label
								htmlFor='title'
								className='grid gap-1 tracking-wider sm:text-lg font-bold'
							>
								Title:
								<Controller
									name='title'
									control={control}
									rules={{ required: 'Title is required' }}
									render={({ field }) => (
										<Input
											{...field}
											placeholder='Here is your title...'
											className='font-semibold bg-orange-300/70'
											style={
												width <= 640
													? {
															height: '33px',
															fontSize: '13px',
													  }
													: {}
											}
											onChange={e => handleInputChange('title', e.target.value)}
										/>
									)}
								/>
								{errors.title && (
									<span className='text-red-500 dark:text-red-300 text-[10px] leading-[10px]'>
										{errors.title.message}
									</span>
								)}
							</label>
							<label
								htmlFor='category'
								className='grid gap-1 tracking-wider sm:text-lg font-bold'
							>
								Category:
								<Controller
									name='category'
									control={control}
									rules={{ required: 'Category is required' }}
									render={({ field }) => (
										<Input
											{...field}
											value={field.value.name}
											className='font-semibold bg-orange-300/70'
											placeholder='Here is your category...'
											style={
												width <= 640
													? {
															height: '33px',
															fontSize: '13px',
													  }
													: {}
											}
											onChange={e =>
												handleInputChange('category', { name: e.target.value })
											}
										/>
									)}
								/>
								{errors.category && (
									<span className='text-red-500 dark:text-red-300 text-[10px] leading-[10px]'>
										{errors.category.message}
									</span>
								)}
							</label>
							<label
								htmlFor='description'
								className='grid gap-1 tracking-wider sm:text-lg font-bold'
							>
								Description:
								<Controller
									name='description'
									control={control}
									rules={{ required: 'Description is required' }}
									render={({ field }) => (
										<Textarea
											{...field}
											placeholder='Here is your description...'
											className='font-semibold bg-orange-300/70'
											style={
												width <= 640
													? {
															height: '133px',
															fontSize: '13px',
													  }
													: {}
											}
											onChange={e =>
												handleInputChange('description', e.target.value)
											}
										/>
									)}
								/>
								{errors.description && (
									<span className='text-red-500 dark:text-red-300 text-[10px] leading-[10px]'>
										{errors.description.message}
									</span>
								)}
							</label>
							<Button className='w-full mt-auto' type='submit'>
								Change Task
							</Button>
						</form>
						<Button
							className='absolute -right-1 top-1 sm:right-1 hover:text-white'
							variant='ghost'
							size='sm'
							onClick={onClose}
						>
							<X className='w-6 h-6' />
						</Button>
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	)
}
