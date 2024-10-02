'use client'

import { useThemeContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
// import cn from 'classnames'
import { Bell, Moon, Search, Sun } from 'lucide-react'
import { FC, memo } from 'react'
import Switch from 'react-switch'
// import style from './root.module.scss'

interface BoardProps {
	// onBurger: boolean
	// setOnBurger: Dispatch<SetStateAction<boolean>>
	// isMobile: boolean
}

export const Board: FC<BoardProps> = memo(function Board(
	{
		// isMobile,
		// onBurger,
		// setOnBurger,
	}
) {
	const { theme, toggleTheme } = useThemeContext()

	// const onClickBurger = () => {
	// 	setOnBurger(prev => !prev)
	// 	if (onBurger) {
	// 		document.body.classList.remove('lock')
	// 	} else {
	// 		document.body.classList.add('lock')
	// 	}
	// }

	return (
		<div className=' relative z-[5] w-full bg-foreground dark:bg-[#35374B]/80'>
			<div className='flex items-center gap-3 justify-between max-w-[1200px] mx-auto py-4 px-2'>
				<div className='flex items-center flex-auto'>
					{/* {isMobile && (
						<p
							className={cn(style.burger, onBurger && style.active)}
							onClick={onClickBurger}
						>
							<span />
						</p>
					)} */}
					<Button
						size='icon'
						className='rounded-r-none rounded-l-md border-2 dark:bg-slate-500 border-orange-600 dark:border-slate-900'
					>
						<Search size={20} />
					</Button>
					<Input
						placeholder='Search all tasks by name, category...'
						className='max-w-[550px] rounded-l-none dark:border-slate-200 dark:placeholder:text-stone-900'
					/>
				</div>
				<div className='ml-auto flex items-center gap-3'>
					<Button size='icon' className='relative'>
						<Bell size={20} />
						<span className='absolute min-w-[18px] p-[1px] pt-[2px] text-[10px] flex items-center justify-center -right-[6px] -top-[6px] rounded-full bg-slate-100 text-black font-bold'>
							0
						</span>
					</Button>
					<div className='flex items-center gap-1 px-2 justify-between min-w-[130px] py-[6px] rounded-sm bg-primary text-yellow-50 dark:text-blue-950 font-semibold dark:bg-slate-500'>
						<Switch
							onChange={toggleTheme}
							checked={theme === 'dark' ? true : false}
							className='text-orange-500 dark:text-blue-600 '
							offColor='#FFEB00'
							onColor='#23423'
							width={57}
							uncheckedIcon={<></>}
							checkedIcon={<></>}
							checkedHandleIcon={
								<Moon className='ml-[2px] pt-[3px]' size={22} />
							}
							uncheckedHandleIcon={
								<Sun className='ml-[2px] pt-[3px]' size={22} />
							}
						/>
						{theme}
					</div>
				</div>
			</div>
		</div>
	)
})
