import { MoveLeft } from 'lucide-react'
import Link from 'next/link'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		/**
		 * TODO:
		 *
		 */
		<div className='h-full flex flex-col items-center md:py-5 md:px-4 bg-orange-600/70'>
			<Link
				href='/'
				className='absolute left-2 top-2 z-10 md:relative md:mr-[450px] mb-[10px] flex items-center gap-[6px] font-medium hover:underline underline-offset-4'
			>
				<MoveLeft className='w-5 h-5' />
				Home
			</Link>
			<main className='w-full md:max-w-[550px] h-full'>{children}</main>
		</div>
	)
}

export default AuthLayout
