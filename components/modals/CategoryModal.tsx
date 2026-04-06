'use client'

import {
	CategoryInfo,
	deleteCategory,
	getCategories,
	renameCategory,
} from '@/api/categories.api'
import { AnimatePresence, motion } from 'framer-motion'
import { Pencil, Trash2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
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
		reset,
	} = useForm<{ category: string }>()
	const [categories, setCategories] = useState<CategoryInfo[]>([])
	const [editingName, setEditingName] = useState<string | null>(null)
	const [newName, setNewName] = useState('')
	const [showManage, setShowManage] = useState(false)

	useEffect(() => {
		if (isOpen) {
			loadCategories()
		}
	}, [isOpen])

	const loadCategories = async () => {
		try {
			const data = await getCategories()
			setCategories(data)
		} catch {
			// Categories might be empty for new users
		}
	}

	const onSubmit = ({ category }: { category: string }) => {
		onConfirm(category)
		reset()
	}

	const handleRename = async (oldName: string) => {
		if (!newName.trim() || newName === oldName) {
			setEditingName(null)
			return
		}
		try {
			await renameCategory(oldName, newName.trim())
			toast.success(`Category renamed to "${newName.trim()}"`)
			setEditingName(null)
			setNewName('')
			loadCategories()
		} catch {
			toast.error('Failed to rename category')
		}
	}

	const handleDelete = async (name: string) => {
		try {
			await deleteCategory(name)
			toast.success(`Category "${name}" deleted`)
			loadCategories()
		} catch {
			toast.error('Failed to delete category')
		}
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
							backgroundColor: 'rgba(0,0,0,0.5)',
							display: 'flex',
							justifyContent: 'center',
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
							maxWidth: '600px',
							width: '100%',
						},
					}}
				>
					<motion.div
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.15 }}
						className='bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-white/[0.08] rounded-xl p-4 md:p-6 md:mx-2 md:mt-10 text-gray-900 dark:text-gray-100'
					>
						{!showManage ? (
							<form onSubmit={handleSubmit(onSubmit)}>
								<label
									htmlFor='category'
									className='grid gap-2 font-semibold text-[22px] items-center mb-4'
								>
									New Category:
									<Input
										id='category'
										{...register('category', { required: true })}
										placeholder='e.g. Work, Personal, Urgent...'
									/>
									{errors.category && (
										<span className='text-sm text-red-600'>
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
										className='w-full'
									>
										Close
									</Button>
									<Button size='sm' type='submit' className='w-full'>
										Create
									</Button>
								</div>
								{categories.length > 0 && (
									<Button
										variant='ghost'
										type='button'
										className='w-full mt-2 text-sm'
										onClick={() => setShowManage(true)}
									>
										Manage existing categories ({categories.length})
									</Button>
								)}
							</form>
						) : (
							<div>
								<div className='flex items-center justify-between mb-3'>
									<h3 className='font-semibold text-lg'>
										Manage Categories
									</h3>
									<Button
										variant='ghost'
										size='icon'
										className='w-6 h-6'
										onClick={() => setShowManage(false)}
									>
										<X size={16} />
									</Button>
								</div>
								<div className='space-y-2 max-h-[300px] overflow-y-auto'>
									{categories.map(cat => (
										<div
											key={cat.name}
											className='flex items-center justify-between bg-gray-50 dark:bg-white/5 rounded p-2'
										>
											{editingName === cat.name ? (
												<div className='flex items-center gap-2 flex-1'>
													<input
														className='flex-1 p-1 rounded border dark:bg-white/5 dark:text-gray-100 text-sm'
														value={newName}
														onChange={e => setNewName(e.target.value)}
														onKeyDown={e => {
															if (e.key === 'Enter') handleRename(cat.name)
															if (e.key === 'Escape') setEditingName(null)
														}}
														autoFocus
													/>
													<Button
														size='sm'
														onClick={() => handleRename(cat.name)}
														className='text-xs h-7'
													>
														Save
													</Button>
												</div>
											) : (
												<>
													<div>
														<span className='font-medium'>{cat.name}</span>
														<span className='text-xs text-slate-500 dark:text-slate-400 ml-2'>
															{cat.taskCount} task
															{cat.taskCount !== 1 ? 's' : ''}
														</span>
													</div>
													<div className='flex gap-1'>
														<Button
															variant='ghost'
															size='icon'
															className='w-7 h-7 hover:bg-gray-100 dark:hover:bg-white/10'
															onClick={() => {
																setEditingName(cat.name)
																setNewName(cat.name)
															}}
														>
															<Pencil size={14} />
														</Button>
														{cat.name !== 'Default' && (
															<Button
																variant='ghost'
																size='icon'
																className='w-7 h-7 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30'
																onClick={() => handleDelete(cat.name)}
															>
																<Trash2 size={14} />
															</Button>
														)}
													</div>
												</>
											)}
										</div>
									))}
								</div>
								<Button
									variant='outline'
									className='w-full mt-3 text-gray-900 dark:text-white hover:text-white'
									onClick={() => setShowManage(false)}
								>
									Back to create
								</Button>
							</div>
						)}
					</motion.div>
				</Modal>
			)}
		</AnimatePresence>
	)
}
