'use client'

import { useAuthContext } from '@/components/providers'
import cn from 'classnames'
import { Clock, Home, ListTodo, LogOut, Settings, Trash } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { MouseEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import style from './root.module.scss'

const navlinks = [
	{
		name: 'Home',
		icon: <Home className='w-7 h-7' />,
		route: '/home',
	},
	{
		name: 'Tasks',
		icon: <ListTodo className='w-7 h-7' />,
		route: '/tasks',
	},
	{
		name: 'Trash',
		icon: <Trash className='w-7 h-7' />,
		route: '/trash',
	},
	{
		name: 'Reminders',
		icon: <Clock className='w-7 h-7' />,
		route: '/reminders',
	},
	{
		name: 'Settings',
		icon: <Settings className='w-7 h-7' />,
		route: '/settings',
	},
	{
		name: 'Logout',
		icon: <LogOut className='w-7 h-7' />,
		route: '',
	},
]

export const Links = ({
	isCollapsed,
	isMobile,
}: {
	isCollapsed: boolean
	isMobile?: boolean
}) => {
	const router = useRouter()
	const pathname = usePathname()
	const { logout } = useAuthContext()
	const [currentRoute, setCurrentRoute] = useState<string>('')

	const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		logout()
		toast.success('Successfully logged out!')
		router.push('/')
	}

	useEffect(() => {
		setCurrentRoute(pathname)
	}, [pathname])

	return (
		<ul
			className={cn(
				'flex gap-2 h-full',
				isMobile ? 'flex-row items-center' : 'flex-col'
			)}
		>
			{navlinks.map(link => (
				<li
					className={cn(
						'text-[19px] font-semibold',
						isMobile && 'last:ml-auto',
						!isMobile && 'last:mt-auto'
					)}
					key={link.name}
					title={link.name}
				>
					<Link
						href={link.route}
						onClick={link.name === 'Logout' ? handleLogout : () => {}}
						className={cn(
							'flex items-center gap-2 p-3 text-red-500 dark:text-red-200 hover:bg-primary/25 dark:hover:bg-slate-400/25 transition-colors rounded-lg overflow-hidden relative',
							style.link,
							link.name === 'Logout' && `${style.logout} dark:text-white`,
							link.route === currentRoute && style.active,
							isCollapsed && 'justify-center',
							link.name === 'Logout' && isMobile && 'mt-0'
						)}
					>
						{link.icon}
						{!isCollapsed && !isMobile && link.name}
					</Link>
				</li>
			))}
		</ul>
	)
}
