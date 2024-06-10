'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter()
	useEffect(() => {
		const token = localStorage.getItem('jwtToken')
		if (!token) {
			router.push('/')
		}
	}, [])
	return (
		<div>
			<main className='h-full'>{children}</main>
		</div>
	)
}

export default HomeLayout
