'use client'
import cn from 'classnames'
import { Timer } from 'lucide-react'
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
				'flex gap-2 items-center font-bold text-lg md:text-xl font-[family-name:var(--font-montserrat)]',
				className,
				isCollapsed && 'justify-center'
			)}
		>
			<Timer
				className={cn(
					'text-indigo-500 dark:text-indigo-400',
					iconSize || 'w-6 h-6'
				)}
			/>
			{!isCollapsed && !isMobile && (
				<span className='text-gray-900 dark:text-white'>
					Take
					<span className='text-indigo-500 dark:text-indigo-400'>Time</span>
				</span>
			)}
		</Link>
	)
}
