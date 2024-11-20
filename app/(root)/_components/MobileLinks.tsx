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
		<div className='flex items-center justify-between w-full gap-2'>
			<div className='flex items-center flex-row gap-2'>
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
								'text-sm font-medium p-2 rounded-lg transition-colors text-red-600',
								isActive
									? 'bg-primary/25 dark:bg-slate-100/10 text-red-600 dark:text-white'
									: 'text-gray-700 dark:text-gray-300 hover:bg-primary/25 dark:hover:dark:bg-slate-100/10'
							)}
						>
							{link.icon}
						</Link>
					)
				})}

				{hiddenLinks.length > 0 && (
					<div className='relative'>
						<Link
							href={''}
							onClick={() => setIsExpanded(!isExpanded)}
							className='py-2 w-5 h-5 text-red-600 dark:text-gray-300'
						>
							<Ellipsis />
						</Link>

						<div
							className={cn(
								'absolute right-0  w-44 bg-orange-400  dark:bg-gray-800 rounded-lg shadow-md z-10 transition-all',
								{
									'opacity-0 top-[-190px] invisible': !isExpanded,
									'opacity-100 top-[-178px] visible': isExpanded,
								}
							)}
						>
							<ul className='flex flex-col gap-2 p-2'>
								{hiddenLinks.map(link => {
									const isActive =
										link.name === 'Search'
											? pathname.startsWith('/search')
											: link.route === pathname
									const isAdmin =
										link.name === 'Admin Panel' && data?.role === 'ADMIN'

									if (link.name === 'Admin Panel' && !isAdmin) return null

									return (
										<li
											key={link.name}
											className='border-t-2 last:border-b-2 last:pb-2'
										>
											<Link
												href={link.route}
												className={cn(
													'flex gap-1 text-sm mt-2 py-1 rounded-lg text-white transition-colors font-semibold tracking-wider px-1',
													isActive
														? 'bg-red-500/25 dark:bg-slate-500/35 text-white dark:text-white'
														: 'text-gray-700 dark:text-gray-300 hover:bg-primary/25'
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

			{/* Logout Link */}
			{logoutLink && (
				<Link
					href={logoutLink.route}
					onClick={handleLogout}
					className='ml-auto text-sm font-medium p-2 rounded-lg text-red-600 dark:text-slate-900 hover:bg-red-200 dark:hover:bg-slate-900/20 transition-colors'
				>
					{logoutLink.icon}
				</Link>
			)}
		</div>
	)
}
