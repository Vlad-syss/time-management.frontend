import { useUser } from '@/api'
import { navlinks } from '@/components/consts'
import { useAuthContext } from '@/components/providers'
import cn from 'classnames'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const MobileLinks = () => {
	const [isExpanded, setIsExpanded] = useState(false)
	const router = useRouter()
	const pathname = usePathname()
	const { logout } = useAuthContext()
	const { data } = useUser()

	const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		logout()
		toast.success('Successfully logged out!')
		router.push('/')
	}

	const visibleLinks = navlinks
		.filter(link => link.name !== 'Logout')
		.slice(0, 3)
	const hiddenLinks = navlinks.filter(
		link => !visibleLinks.includes(link) && link.name !== 'Logout'
	)
	const logoutLink = navlinks.find(link => link.name === 'Logout')

	return (
		<div className='flex items-center justify-between w-full gap-1'>
			<div className='flex items-center flex-row gap-1'>
				{visibleLinks.map(link => {
					const isActive =
						link.name === 'Search'
							? pathname.startsWith('/search')
							: link.route === pathname
					const isAdmin = link.name === 'Admin Panel' && data?.role === 'ADMIN'

					if (link.name === 'Admin Panel' && !isAdmin) return null

					return (
						<Link
							key={link.name}
							href={link.route}
							className={cn(
								'p-2 rounded-lg transition-all duration-200',
								isActive
									? 'bg-indigo-50 text-indigo-500 dark:bg-indigo-500/15 dark:text-indigo-400'
									: 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5'
							)}
						>
							{link.icon}
						</Link>
					)
				})}

				{hiddenLinks.length > 0 && (
					<div className='relative'>
						<button
							onClick={() => setIsExpanded(!isExpanded)}
							className='p-2 text-gray-500 dark:text-gray-400'
						>
							<Ellipsis className='w-5 h-5' />
						</button>

						<div
							className={cn(
								'absolute right-0 w-48 bg-white dark:bg-[#1A1A24] border border-gray-200 dark:border-white/10 rounded-xl shadow-elevated z-10 transition-all',
								{
									'opacity-0 -top-48 invisible': !isExpanded,
									'opacity-100 -top-44 visible': isExpanded,
								}
							)}
						>
							<ul className='flex flex-col p-1.5 gap-0.5'>
								{hiddenLinks.map(link => {
									const isActive =
										link.name === 'Search'
											? pathname.startsWith('/search')
											: link.route === pathname
									const isAdmin =
										link.name === 'Admin Panel' && data?.role === 'ADMIN'

									if (link.name === 'Admin Panel' && !isAdmin) return null

									return (
										<li key={link.name}>
											<Link
												href={link.route}
												onClick={() => setIsExpanded(false)}
												className={cn(
													'flex items-center gap-2 text-sm py-2 px-3 rounded-lg transition-colors font-medium',
													isActive
														? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400'
														: 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
												)}
											>
												{link.icon}
												{link.name}
											</Link>
										</li>
									)
								})}
							</ul>
						</div>
					</div>
				)}
			</div>

			{logoutLink && (
				<Link
					href={logoutLink.route}
					onClick={handleLogout}
					className='ml-auto p-2 rounded-lg text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors'
				>
					{logoutLink.icon}
				</Link>
			)}
		</div>
	)
}
