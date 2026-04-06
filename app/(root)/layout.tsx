// components/HomeLayout.tsx
'use client'
import {
	ArchivedTaskProvider,
	ReminderProvider,
	TaskProvider,
	UserProvider,
	useAuthContext,
} from '@/components/providers'
import { useWidth } from '@/hooks'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Board } from './_components/Board'
import { Loader } from './_components/Loader'
import { Navbar } from './_components/Navbar'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
	const [onBurger, setOnBurger] = useState<boolean>(false)
	const width = useWidth()
	const router = useRouter()
	const { isLoading, isAuthenticated } = useAuthContext()

	useEffect(() => {
		const token = localStorage.getItem('jwtToken')
		if (!token) {
			router.push('/')
		}
	}, [router])

	const getMarginLeft = () => {
		if (width <= 945) return 'ml-0'
		if (width <= 1024) return isCollapsed ? 'ml-[72px]' : 'ml-[240px]'
		return isCollapsed ? 'ml-[72px]' : 'ml-[280px]'
	}

	return (
		<div className='relative min-h-screen bg-[#FAFBFC] dark:bg-[#0F0F14] overflow-hidden overflow-y-auto text-gray-900 dark:text-gray-100'>
			<Navbar
				isCollapsed={isCollapsed}
				setIsCollapsed={setIsCollapsed}
				isMobile={width < 945}
				onBurger={onBurger}
			/>

			{isLoading && <Loader />}

			<div className={cn('transition-all duration-300', getMarginLeft())}>
				<main className='min-h-screen flex-auto flex flex-col w-full relative'>
					<UserProvider>
						<TaskProvider>
							<ReminderProvider>
								<Board />
								<div className='max-w-[1200px] mx-auto w-full flex-auto flex flex-col min-h-full px-3 sm:px-4 lg:px-6'>
									<ArchivedTaskProvider>{children}</ArchivedTaskProvider>
								</div>
							</ReminderProvider>
						</TaskProvider>
					</UserProvider>
				</main>
			</div>
		</div>
	)
}

export default HomeLayout
