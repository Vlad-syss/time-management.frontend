'use client'
import { Button } from '@/components/ui/button'
import { MainTitle } from '@/components/ui/mainTitle'
import cn from 'classnames'
import { CornerUpLeft } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'
import { Links } from './Links'
import { Profile } from './Profile'

interface NavbarProps {
	isCollapsed: boolean
	setIsCollapsed: Dispatch<SetStateAction<boolean>>
}

export const Navbar: FC<NavbarProps> = ({ setIsCollapsed, isCollapsed }) => {
	const onCollapsed = () => {
		setIsCollapsed(prev => !prev)
	}

	return (
		<div className='h-full group transition-colors border-r-2 border-primary flex flex-col gap-5 shadow-xl bg-foreground relative py-5 px-3 pb-2'>
			<MainTitle
				className='text-[#222] md:text-[28px]'
				iconSize='md:w-9 md:h-9'
				isCollapsed={isCollapsed}
			/>
			<div className='flex-auto h-full py-5 border-t-2 border-b-2 border-primary/90'>
				<Links isCollapsed={isCollapsed} />
			</div>
			<Profile isCollapsed={isCollapsed} />
			<Button
				variant='ghost'
				size='sm'
				onClick={onCollapsed}
				className={cn(
					'absolute right-1 top-0 py-1 px-1 text-blue-950 hover:bg-background opacity-0 group-hover:opacity-100 transition-colors',
					isCollapsed && '-top-[3px] -right-[3px]'
				)}
			>
				<CornerUpLeft className='w-4 h-4' />
			</Button>
		</div>
	)
}
