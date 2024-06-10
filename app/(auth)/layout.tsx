import { CircleCheckBig, CircleX, MoveLeft } from 'lucide-react'
import Link from 'next/link'
import { Toaster } from 'react-hot-toast'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		/**
		 * TODO:
		 * --
		 */
		<div className='h-full flex flex-col items-center py-5 px-4 bg-orange-600/70'>
			<Link
				href='/'
				className='mr-[450px] mb-[10px] flex items-center gap-[6px] font-medium hover:underline underline-offset-4'
			>
				<MoveLeft className='w-5 h-5' />
				Home
			</Link>
			<main>{children}</main>
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
		</div>
	)
}

export default AuthLayout
