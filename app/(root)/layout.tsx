// components/HomeLayout.tsx
'use client'
import {
	ArchivedTaskProvider,
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
		if (width <= 945) return 'ml-[0]'
		if (width <= 1024) return isCollapsed ? 'ml-[90px]' : 'ml-[230px]'
		return isCollapsed ? 'ml-[90px]' : 'ml-[300px]'
	}

	return (
		<div className='relative min-h-screen bg-foreground/85 overflow-hidden overflow-y-auto dark:bg-[#394955]/80 dark:text-white'>
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
							<Board />
							<div className='max-w-[1200px] mx-auto w-full flex-auto flex flex-col min-h-full px-[5px] sm:px-[10px]'>
								<ArchivedTaskProvider>{children}</ArchivedTaskProvider>
							</div>
						</TaskProvider>
					</UserProvider>
				</main>
			</div>
		</div>
	)
}

export default HomeLayout
