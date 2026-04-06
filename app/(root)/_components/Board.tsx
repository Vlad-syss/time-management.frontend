'use client'

import { ReminderModal } from '@/components/modals/ReminderModal'
import { useReminderContext, useThemeContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useReminderModal, useWidth } from '@/hooks'
import { Bell, Moon, Search, Sun } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, FormEventHandler, memo, useState } from 'react'
import { toast } from 'react-hot-toast'

interface BoardProps {}

export const Board: FC<BoardProps> = memo(function Board() {
	const { theme, toggleTheme } = useThemeContext()
	const { openModal, closeModal, isOpen } = useReminderModal()
	const width = useWidth()
	const { count } = useReminderContext()
	const [value, setValue] = useState('')
	const router = useRouter()
	const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		const sanitizedValue = value
			.replace(/[^a-zA-Z0-9\s]/g, '')
			.trim()
			.replace(/\s+/g, '-')
		if (sanitizedValue) {
			router.push(`/search/${sanitizedValue}`)
		} else {
			toast.error('Search value is empty!')
		}
	}

	return (
		<>
			<div className='sticky top-0 z-[5] w-full bg-white/80 dark:bg-[#0F0F14]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/[0.06]'>
				<div className='flex items-center gap-3 justify-between max-w-[1200px] mx-auto py-3 px-3 sm:px-4 lg:px-6'>
					<form
						className='flex items-center flex-auto max-w-[500px]'
						onSubmit={handleSubmit}
					>
						<div className='relative w-full'>
							<Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400' />
							<Input
								placeholder='Search tasks...'
								value={value}
								onChange={e => setValue(e.target.value)}
								className='pl-10 h-9 bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10'
							/>
						</div>
					</form>
					<div className='flex items-center gap-2'>
						<Button
							variant='ghost'
							size='icon'
							className='relative w-9 h-9'
							onClick={openModal}
						>
							<Bell className='w-[18px] h-[18px] text-gray-500 dark:text-gray-400' />
							{count > 0 && (
								<span className='absolute -right-0.5 -top-0.5 min-w-[18px] h-[18px] text-[10px] flex items-center justify-center rounded-full bg-indigo-500 text-white font-bold px-1'>
									{count}
								</span>
							)}
						</Button>
						<Button
							variant='ghost'
							size='icon'
							className='w-9 h-9'
							onClick={toggleTheme}
						>
							{theme === 'dark' ? (
								<Sun className='w-[18px] h-[18px] text-yellow-400' />
							) : (
								<Moon className='w-[18px] h-[18px] text-gray-500' />
							)}
						</Button>
					</div>
				</div>
			</div>
			<ReminderModal isOpen={isOpen} onClose={closeModal} />
		</>
	)
})
