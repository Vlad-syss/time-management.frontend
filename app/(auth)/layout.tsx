import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-[#FAFBFC] dark:bg-[#0F0F14] relative'>
			<div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 pointer-events-none' />
			<Link
				href='/'
				className='absolute left-4 top-4 z-10 flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors'
			>
				<ArrowLeft className='w-4 h-4' />
				Back
			</Link>
			<main className='w-full max-w-[440px] relative z-10'>{children}</main>
		</div>
	)
}

export default AuthLayout
