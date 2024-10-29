'use client'

import { useTheme, useWidth } from '@/hooks'
import { CircleCheckBig, CircleX } from 'lucide-react'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	const { theme } = useTheme()
	const width = useWidth()
	const isMobile = width < 945
	return (
		<>
			{children}
			<Toaster
				position='top-right'
				toastOptions={{
					className: '',
					duration: 4000,
					style: {
						background:
							theme === 'light' ? 'rgb(234 118 22)' : 'rgb(100,140,209)',
						color: '#fff',
						padding: !isMobile ? '5px 20px' : '3px 10px',
						fontWeight: '500',
						fontSize: isMobile ? '12px' : '14px',
					},
					error: {
						icon: <CircleX color={theme === 'light' ? 'red' : '#222'} />,
					},
					icon: (
						<CircleCheckBig
							color={theme === 'light' ? 'rgb(64 244 52)' : 'rgb(14 244 52)'}
						/>
					),
				}}
			/>
		</>
	)
}
