'use client'

import { ConfirmModal } from '@/components/modals/ConfirmModal'
import { useAuthContext, useThemeContext } from '@/components/providers'
import { NavbarSkeleton } from '@/components/skeletons'
import { Button } from '@/components/ui/button'
import { MainTitle } from '@/components/ui/mainTitle'
import { useConfirmModal, useWidth } from '@/hooks'
import { RouteLink } from '@/types'
import { ArrowRight, LogIn, LogOut, Moon, Sun } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment, useMemo } from 'react'
import { toast } from 'react-hot-toast'

const routes: RouteLink[] = [
	{
		name: 'Login',
		href: '/login',
		icon: <LogIn className='w-4 h-4' />,
	},
	{
		name: 'Get started',
		href: '/home',
		isHome: true,
		icon: <ArrowRight className='w-4 h-4' />,
	},
]

export const Navbar: React.FC = () => {
	const { isOpen, openModal, closeModal } = useConfirmModal()
	const { theme, toggleTheme } = useThemeContext()
	const router = useRouter()
	const width = useWidth()
	const { isAuthenticated, isLoading, logout } = useAuthContext()

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (!isAuthenticated && !isLoading) {
			e.preventDefault()
			openModal()
		}
	}

	const handleModalConfirm = () => {
		closeModal()
		router.push('/register')
	}

	const handleLogout = () => {
		logout()
		toast.success('Successfully logged out!')
		router.push('/')
	}

	const getLink = (route: RouteLink) => {
		if (route.isHome) {
			return (
				<Link
					href={isAuthenticated && !isLoading ? route.href : '/register'}
					key={route.name}
					onClick={handleLinkClick}
				>
					{!isLoading && (
						<Button size={width <= 768 ? 'sm' : 'default'} className='gap-2'>
							{isAuthenticated ? 'Dashboard' : 'Get started'}
							{route.icon}
						</Button>
					)}
					{isLoading && <NavbarSkeleton />}
				</Link>
			)
		}

		return !isAuthenticated && !isLoading ? (
			<Link
				href={route.href}
				className='flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors px-3 py-2'
				key={route.name}
			>
				{route.icon}
				{route.name}
			</Link>
		) : !isLoading ? (
			<button
				onClick={handleLogout}
				className='flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors px-3 py-2'
				key={route.name}
			>
				<LogOut className='w-4 h-4' />
				Logout
			</button>
		) : null
	}

	const renderedRoutes = useMemo(
		() =>
			routes.map(route => (
				<Fragment key={route.name}>{getLink(route)}</Fragment>
			)),
		[isAuthenticated, isLoading, width, isOpen, handleLinkClick]
	)

	return (
		<>
			<header className='px-4 py-3 w-full fixed z-50 bg-white/70 dark:bg-[#0F0F14]/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/[0.06]'>
				<div className='flex w-full justify-between items-center mx-auto max-w-[1200px]'>
					<MainTitle />
					<div className='flex items-center gap-1'>
						{renderedRoutes}
						<Button
							variant='ghost'
							size='icon'
							className='w-9 h-9 ml-1'
							onClick={toggleTheme}
						>
							{theme === 'dark' ? (
								<Sun className='w-[18px] h-[18px] text-yellow-400' />
							) : (
								<Moon className='w-[18px] h-[18px] text-gray-500' />
							)}
						</Button>
					</div>
				</div>
			</header>
			<ConfirmModal
				isOpen={isOpen}
				onClose={closeModal}
				onConfirm={handleModalConfirm}
				message="You don't have an account yet, would you like to register?"
			/>
		</>
	)
}
