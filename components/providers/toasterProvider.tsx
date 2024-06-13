import { CircleCheckBig, CircleX } from 'lucide-react'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export const ToastProvider = ({ children }: { children: ReactNode }) => {
	return (
		<>
			{children}
			<Toaster
				position='top-right'
				toastOptions={{
					className: '',
					duration: 4000,
					style: {
						background: 'rgb(234 118 22)',
						color: '#fff',
						padding: '5px 20px',
						fontWeight: '500',
					},
					error: {
						icon: <CircleX color='red' />,
					},
					icon: <CircleCheckBig color='rgb(64 244 52)' />,
				}}
			/>
		</>
	)
}
