import { useUser } from '@/api'
import { navlinks } from '@/components/consts'
import { useAuthContext } from '@/components/providers'
import cn from 'classnames'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { MouseEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import style from './root.module.scss'

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

	return (
		<ul
			className={cn(
				'flex gap-2 md:gap-1 h-full',
				isMobile ? 'flex-row items-center' : 'flex-col',
				style.links
			)}
		>
			{navlinks.map(link => {
				const isActive =
					link.name === 'Search'
						? currentRoute.startsWith('/search')
						: link.route === currentRoute
				const isAdmin = link.name === 'Admin Panel' && data?.role === 'ADMIN'

				if (link.name === 'Admin Panel' && !isAdmin) return null

				return (
					<li
						key={link.name}
						className={cn(
							'text-[19px] font-semibold',
							isMobile && ' last:flex-nowrap',
							style.linked,
							link.name === 'Logout' && style.logout,
							link.name === 'Admin Panel' && 'md:mt-auto',
							link.name === 'Admin Panel' && isMobile && 'ml-auto'
						)}
						title={link.name}
					>
						<Link
							href={link.route}
							onClick={link.name === 'Logout' ? handleLogout : undefined}
							className={cn(
								'flex items-center gap-2 p-2 md:p-3 transition-colors rounded-lg overflow-hidden relative',
								style.link,
								{
									[style.logout]: link.name === 'Logout',
									[style.active]: link.route === currentRoute || isActive, // Corrected here
									'bg-[#f97a4840] text-red-600 dark:text-slate-200 dark:bg-slate-400/25':
										link.route === currentRoute || isActive,
									'text-red-500 dark:text-slate-300 hover:bg-primary/25 dark:hover:bg-slate-400/25':
										link.route !== currentRoute && !isActive,
									'justify-center': isCollapsed,
									'mt-0': link.name === 'Logout' && isMobile,
									'border-2 border-orange-500 md:mt-auto bg-orange-500/30 dark:border-slate-300 dark:bg-slate-300/30':
										isAdmin,
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
