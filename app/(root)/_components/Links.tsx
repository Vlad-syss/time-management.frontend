'use client'

import { useAuthContext } from '@/components/providers'
import cn from 'classnames'
import {
	Clock,
	Home,
	ListTodo,
	LogOut,
	Search,
	Settings,
	Trash,
} from 'lucide-react'
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
		name: 'Search',
		icon: <Search className='w-7 h-7' />,
		route: '/search',
	},
	{
		name: 'Settings',
		icon: <Settings className='w-7 h-7' />,
		route: '/settings' || '/settings/:value',
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
				'flex gap-1 h-full',
				isMobile ? 'flex-row items-center' : 'flex-col'
			)}
		>
			{navlinks.map(link => {
				const isActive =
					link.name === 'Search'
						? currentRoute.startsWith('/search')
						: link.route === currentRoute
				return (
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
							onClick={link.name === 'Logout' ? handleLogout : undefined}
							className={cn(
								'flex items-center gap-2 p-3 text-red-500 dark:text-red-200 hover:bg-primary/25 dark:hover:bg-slate-400/25 transition-colors rounded-lg overflow-hidden relative',
								style.link,
								{
									[`${style.logout} dark:text-white`]: link.name === 'Logout',
									[style.active]: link.route === currentRoute || isActive,
									'justify-center': isCollapsed,
									'mt-0': link.name === 'Logout' && isMobile,
								}
							)}
						>
							{link.icon}
							{!isCollapsed && !isMobile && link.name}
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
