import { useUser } from '@/api'
import { navlinks } from '@/components/consts'
import { useAuthContext } from '@/components/providers'
import { User } from '@/types'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { MouseEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

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
	const [user, setUser] = useState<User>()
	const { data } = useUser()

	const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		logout()
		toast.success('Successfully logged out!')
		router.push('/')
	}

	useEffect(() => {
		setCurrentRoute(pathname)
	}, [pathname])

	useEffect(() => {
		if (data) {
			setUser(data)
		}
	}, [data])

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
				const isAdmin = link.name === 'Admin Panel' && user?.role === 'ADMIN'

				if (link.name === 'Admin Panel' && !isAdmin) return null

				const isLogout = link.name === 'Logout'

				return (
					<li
						key={link.name}
						className={cn(
							'text-sm font-medium',
							link.name === 'Admin Panel' && !isMobile && 'mt-auto',
							link.name === 'Admin Panel' && isMobile && 'ml-auto',
							isLogout && user?.role !== 'ADMIN' && !isMobile && 'mt-auto',
							isLogout && user?.role !== 'ADMIN' && isMobile && 'ml-auto',
							isLogout && isAdmin && isMobile && 'ml-0',
							isLogout && isAdmin && !isMobile && 'mt-0'
						)}
						title={link.name}
					>
						<Link
							href={link.route}
							onClick={isLogout ? handleLogout : undefined}
							className={cn(
								'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative',
								{
									'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400 font-semibold':
										isActive,
									'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200':
										!isActive && !isLogout,
									'text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10':
										isLogout,
									'justify-center': isCollapsed,
									'border border-indigo-200 dark:border-indigo-500/30 bg-indigo-50/50 dark:bg-indigo-500/10':
										isAdmin && !isLogout,
								}
							)}
						>
							<span className={cn(isActive && 'text-indigo-500 dark:text-indigo-400')}>
								{link.icon}
							</span>
							{!isCollapsed && !isMobile && (
								<span className='truncate'>{link.name}</span>
							)}
						</Link>
					</li>
				)
			})}
		</ul>
	)
}
