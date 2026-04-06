'use client'

import { useTheme, useWidth } from '@/hooks'
import { CheckCircle2, XCircle } from 'lucide-react'
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
					duration: 3000,
					style: {
						background: theme === 'light' ? '#FFFFFF' : '#1A1A24',
						color: theme === 'light' ? '#111827' : '#F9FAFB',
						padding: isMobile ? '8px 12px' : '10px 16px',
						fontWeight: '500',
						fontSize: isMobile ? '13px' : '14px',
						borderRadius: '12px',
						border:
							theme === 'light'
								? '1px solid #E5E7EB'
								: '1px solid rgba(255,255,255,0.08)',
						boxShadow:
							theme === 'light'
								? '0 4px 16px rgba(0,0,0,0.08)'
								: '0 4px 16px rgba(0,0,0,0.4)',
					},
					error: {
						icon: <XCircle className='w-5 h-5 text-red-500' />,
					},
					icon: <CheckCircle2 className='w-5 h-5 text-emerald-500' />,
				}}
			/>
		</>
	)
}
