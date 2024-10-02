'use client'
import cn from 'classnames'
import { LayoutTemplate } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

interface mainTitleProps {
	className?: string
	iconSize?: string
	isCollapsed?: boolean
	isMobile?: boolean
}

export const MainTitle: FC<mainTitleProps> = ({
	className,
	iconSize,
	isCollapsed,
	isMobile,
}) => {
	return (
		<Link
			href='/'
			className={cn(
				'flex gap-1 items-center font-bold text-[18px] md:text-2xl',
				className,
				isCollapsed && 'justify-center'
			)}
		>
			<LayoutTemplate className={cn('', iconSize)} />
			{!isCollapsed && !isMobile && (
				<p>
					Take
					<span className='text-orange-500 dark:text-orange-400'>Time</span>
				</p>
			)}
		</Link>
	)
}
