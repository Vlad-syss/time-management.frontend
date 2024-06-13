'use client'

import { useAuthContext } from '@/components/providers'
import cn from 'classnames'
import { Home, ListTodo, LogOut, Settings, Trash } from 'lucide-react'
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
		route: '/tasks',
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

export const Links = ({ isCollapsed }: { isCollapsed: boolean }) => {
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
		<ul className='flex flex-col gap-2 h-full'>
			{navlinks.map(link => (
				<li
					className='last:mt-auto text-[19px] font-semibold'
					key={link.name}
					title={link.name}
				>
					<Link
						href={link.route}
						onClick={link.name === 'Logout' ? handleLogout : () => {}}
						className={cn(
							'flex items-center gap-2 p-3 hover:bg-primary/25 transition-colors rounded-lg overflow-hidden relative',
							style.link,
							link.name === 'Logout' && style.logout,
							link.route === currentRoute && style.active,
							isCollapsed && 'justify-center'
						)}
					>
						{link.icon}
						{!isCollapsed && link.name}
					</Link>
				</li>
			))}
		</ul>
	)
}
