'use client'

import { ConfirmModal } from '@/components/modals/ConfirmModal'
import { useAuthContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { useConfirmModal, useWidth } from '@/hooks'
import { RouteLink } from '@/types'
import cn from 'classnames'
import {
	ChevronRight,
	LayoutTemplate,
	LoaderPinwheel,
	LogIn,
	LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Fragment, useMemo } from 'react'
import { toast } from 'react-hot-toast'
import style from './style.module.scss'

const routes: RouteLink[] = [
	{
		name: 'Login',
		href: '/login',
		icon: <LogIn className='w-4 h-4 md:w-5 md:h-5' />,
	},
	{
		name: 'Get started',
		href: '/home',
		isHome: true,
		icon: <ChevronRight className='w-4 h-4 md:w-5 md:h-5' />,
	},
]

export const Navbar: React.FC = () => {
	const { isOpen, openModal, closeModal } = useConfirmModal()
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
		toast.success('Successfully unloggined!')
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
					<Button
						variant='default'
						size={width <= 768 ? 'sm' : 'lg'}
						className={cn(
							'hover:text-white flex items-center gap-2',
							style.get
						)}
					>
						{isAuthenticated && !isLoading && 'Enter now!'}
						{!isAuthenticated && !isLoading && 'Get started!'}
						{isLoading && <LoaderPinwheel className='animate-spin' />}
						{route.icon}
					</Button>
				</Link>
			)
		}

		return !isAuthenticated && !isLoading ? (
			<Link
				href={route.href}
				className={cn(
					'font-medium text-base md:text-lg px-2 flex items-center gap-1',
					style.link
				)}
				key={route.name}
			>
				{route.name}
				{route.icon}
			</Link>
		) : !isLoading ? (
			<Link
				href=''
				onClick={handleLogout}
				className={cn(
					'font-medium text-base md:text-lg px-2 flex items-center gap-1',
					style.link
				)}
				key={route.name}
			>
				Logout
				<LogOut className='w-4 h-4 md:w-5 md:h-5' />
			</Link>
		) : (
			''
		)
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
			<div className='px-2 py-3 border-b-2 border-slate-900/40 w-full fixed z-50 l-0 t-0 backdrop-blur-sm shadow-lg md:py-7 md:px-4'>
				<div className='flex w-full justify-between items-center mx-auto max-w-[1400px]'>
					<Link
						href='/'
						className='flex gap-1 items-center font-bold text-[18px] md:text-2xl'
					>
						<LayoutTemplate className='w-5 h-5 md:w-7 md:h-7' />
						<p>
							Take<span className='text-orange-600'>Time</span>
						</p>
					</Link>
					<ul className='flex items-center gap-2 md:gap-8'>{renderedRoutes}</ul>
				</div>
			</div>
			<ConfirmModal
				isOpen={isOpen}
				onClose={closeModal}
				onConfirm={handleModalConfirm}
				message="You don't have an account yet, would you like to register?"
			/>
		</>
	)
}

export default Navbar
