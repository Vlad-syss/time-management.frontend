'use client'

import { AdminProvider } from '@/components/providers'
import { useWidth } from '@/hooks'
import cn from 'classnames'
import { Banner } from './_components/Banner'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
	const width = useWidth()
	const isMobile = width < 945
	return (
		<div
			className={cn('flex flex-col pb-5 gap-3', {
				'pb-24 sm:pb-20': isMobile,
			})}
		>
			<Banner />
			<AdminProvider>{children}</AdminProvider>
		</div>
	)
}

export default AdminLayout
