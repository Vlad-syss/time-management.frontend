'use client'
import { Button } from '@/components/ui/button'
import { MainTitle } from '@/components/ui/mainTitle'
import { useWidth } from '@/hooks'
import cn from 'classnames'
import { CornerUpLeft } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'
import { Links } from './Links'
import { Profile } from './Profile'

interface NavbarProps {
	isCollapsed: boolean
	setIsCollapsed: Dispatch<SetStateAction<boolean>>
	isMobile?: boolean
	onBurger?: boolean
}

export const Navbar: FC<NavbarProps> = ({
	setIsCollapsed,
	isCollapsed,
	isMobile,
	// onBurger,
}) => {
	const width = useWidth()

	const onCollapsed = () => {
		setIsCollapsed(prev => !prev)
	}

	const getMaxWidth = () => {
		if (isMobile) {
			return 'max-w-full bottom-0 h-[70px] flex-row py-1 md:px-2 px-1'
		} else if (isCollapsed) {
			return 'max-w-[90px] py-5 px-3 flex-col pb-2 h-full'
		} else if (width <= 1024) {
			return 'max-w-[230px] py-5 px-3 flex-col pb-2 h-full'
		} else {
			return 'max-w-[300px] py-5 px-3 flex-col pb-2 h-full'
		}
	}

	return (
		<div
			className={cn(
				'group md:border-r-2 border-primary dark:border-gray-950 flex shadow-xl bg-foreground dark:bg-[#35374B]/80 fixed w-full transition-all duration-300 dark:text-white',
				getMaxWidth(),
				isMobile && 'z-[7] gap-2 opacity-100 dark:bg-[#35374B]/90 top-auto',
				!isMobile && 'gap-5',
				{
					// 'opacity-0 -top-full': isMobile && !onBurger,
					'h-[85px]': width <= 500,
				}
			)}
		>
			<MainTitle
				className='text-[#222] dark:text-white md:text-[28px]'
				iconSize='w-8 h-8 md:w-9 md:h-9'
				isCollapsed={isCollapsed}
				isMobile={isMobile}
			/>
			<div
				className={cn(
					'flex-auto h-full border-primary/90 dark:border-gray-950/90',
					isMobile ? 'py-0' : 'py-5 border-t-2 border-b-2'
				)}
			>
				<Links isCollapsed={isCollapsed} isMobile={isMobile} />
			</div>
			<Profile isCollapsed={isCollapsed} isMobile={isMobile} />
			{!isMobile && (
				<Button
					variant='ghost'
					size='sm'
					onClick={onCollapsed}
					className={cn(
						'absolute right-1 top-0 py-1 px-1 text-blue-950 dark:text-stone-100 hover:bg-background opacity-0 group-hover:opacity-100 transition-colors',
						isCollapsed && '-top-[3px] -right-[3px] px-[2px] py-[2px]'
					)}
				>
					<CornerUpLeft className='w-4 h-4' />
				</Button>
			)}
		</div>
	)
}
