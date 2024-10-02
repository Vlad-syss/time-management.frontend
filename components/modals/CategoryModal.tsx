'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface CategoryModalProps {
	isOpen: boolean
	onClose: () => void
	onConfirm: (category: string) => void
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
}) => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<{ category: string }>()

	const onSubmit = ({ category }: { category: string }) => {
		onConfirm(category)
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<Modal
					isOpen={isOpen}
					onRequestClose={onClose}
					contentLabel='Category Modal'
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
							width: '100%',
						},
					}}
				>
					<motion.form
						initial={{ y: -10, opacity: 0 }}
						animate={{
							y: 0,
							opacity: 1,
						}}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.15 }}
						className='bg-orange-200 p-2 py-3 md:p-5 md:mx-2 md:mt-10 dark:text-white dark:bg-slate-600'
						onSubmit={handleSubmit(onSubmit)}
					>
						<label
							htmlFor='category'
							className='grid gap-2 font-semibold text-[22px] items-center mb-6'
						>
							Type Category:
							<Input
								id='category'
								{...register('category', { required: true })}
								placeholder='Here is your category (low, important, etc.)'
							/>
							{errors.category && (
								<span className='text-sm text-red-600 '>
									Field is required!
								</span>
							)}
						</label>
						<div className='flex w-full gap-2 tracking-[1px]'>
							<Button
								onClick={onClose}
								size='sm'
								variant='outline'
								type='button'
								className='text-orange-800 w-full hover:text-white'
							>
								Close
							</Button>
							<Button size='sm' type='submit' className='w-full'>
								Move on
							</Button>
						</div>
					</motion.form>
				</Modal>
			)}
		</AnimatePresence>
	)
}
