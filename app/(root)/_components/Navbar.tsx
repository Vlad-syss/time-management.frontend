'use client'
import { Button } from '@/components/ui/button'
import { MainTitle } from '@/components/ui/mainTitle'
import { useWidth } from '@/hooks'
import cn from 'classnames'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'
import { Links } from './Links'
import { MobileLinks } from './MobileLinks'
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
}) => {
	const width = useWidth()
	const isChange = width < 500

	const onCollapsed = () => {
		setIsCollapsed(prev => !prev)
	}

	const getMaxWidth = () => {
		if (isMobile) {
			return 'max-w-full bottom-0 h-[64px] flex-row py-2 px-3'
		} else if (isCollapsed) {
			return 'max-w-[72px] py-4 px-2 flex-col pb-3 h-full'
		} else if (width <= 1024) {
			return 'max-w-[240px] py-4 px-3 flex-col pb-3 h-full'
		} else {
			return 'max-w-[280px] py-4 px-4 flex-col pb-3 h-full'
		}
	}

	return (
		<nav
			className={cn(
				'group flex bg-white dark:bg-[#13131B] border-r border-gray-200 dark:border-white/[0.06] fixed w-full transition-all duration-300',
				getMaxWidth(),
				isMobile &&
					'z-[7] gap-2 border-r-0 border-t border-gray-200 dark:border-white/[0.06] top-auto',
				!isMobile && 'gap-4'
			)}
		>
			<MainTitle
				className='text-gray-900 dark:text-white'
				isCollapsed={isCollapsed}
				isMobile={isMobile}
			/>
			<div
				className={cn(
					'flex-auto h-full',
					isMobile ? 'py-0' : 'py-3',
					isChange && 'flex'
				)}
			>
				{!isChange ? (
					<Links isCollapsed={isCollapsed} isMobile={isMobile} />
				) : (
					<MobileLinks />
				)}
			</div>
			<Profile isCollapsed={isCollapsed} isMobile={isMobile} />
			{!isMobile && (
				<Button
					variant='ghost'
					size='icon'
					onClick={onCollapsed}
					className='absolute -right-3 top-6 w-6 h-6 rounded-full bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-white/10 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-gray-50 dark:hover:bg-white/10'
				>
					{isCollapsed ? (
						<PanelLeftOpen className='w-3.5 h-3.5 text-gray-500' />
					) : (
						<PanelLeftClose className='w-3.5 h-3.5 text-gray-500' />
					)}
				</Button>
			)}
		</nav>
	)
}
