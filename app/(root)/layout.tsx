'use client'
import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Board } from './_components/Board'
import { Navbar } from './_components/Navbar'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
	const router = useRouter()
	useEffect(() => {
		const token = localStorage.getItem('jwtToken')
		if (!token) {
			router.push('/')
		}
	}, [])
	return (
		<div
			className={cn(
				'grid transition-all bg-foreground/85 h-full text-destructive',
				isCollapsed ? 'grid-cols-collapsed' : 'grid-cols-open'
			)}
		>
			<Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
			<main className='h-full flex flex-col w-full'>
				<Board />
				<div className='max-w-[1200px] mx-auto w-full'>{children}</div>
			</main>
		</div>
	)
}

export default HomeLayout
