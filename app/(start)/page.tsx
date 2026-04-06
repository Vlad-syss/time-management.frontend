'use client'

import { ConfirmModal } from '@/components/modals/ConfirmModal'
import { useAuthContext } from '@/components/providers'
import { ButtonSkeleton } from '@/components/skeletons'
import { Button } from '@/components/ui/button'
import { useConfirmModal, useWidth } from '@/hooks'
import { ArrowRight, CheckCircle2, Clock, Target } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
	const { closeModal, isOpen, openModal } = useConfirmModal()
	const router = useRouter()
	const { isAuthenticated, isLoading } = useAuthContext()
	const width = useWidth()

	const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		if (!isAuthenticated && !isLoading) {
			e.preventDefault()
			openModal()
		}
	}

	const handleModalConfirm = () => {
		closeModal()
		router.push('/register')
	}

	const features = [
		{
			icon: <Target className='w-5 h-5 text-indigo-500' />,
			title: 'Task Management',
			desc: 'Organize with Kanban boards and categories',
		},
		{
			icon: <Clock className='w-5 h-5 text-purple-500' />,
			title: 'Time Tracking',
			desc: 'Track deadlines and completion streaks',
		},
		{
			icon: <CheckCircle2 className='w-5 h-5 text-emerald-500' />,
			title: 'Smart Analytics',
			desc: 'Productivity scores and performance insights',
		},
	]

	return (
		<>
			<div className='md:text-center text-start flex md:items-center flex-col gap-6 relative z-10 py-8 md:py-16'>
				<div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-sm font-medium text-indigo-600 dark:text-indigo-400 mx-auto'>
					<span className='w-2 h-2 rounded-full bg-indigo-500 animate-pulse' />
					Time management, simplified
				</div>

				<h1 className='font-bold text-3xl md:text-5xl lg:text-6xl leading-tight font-[family-name:var(--font-montserrat)] text-gray-900 dark:text-white'>
					Manage your time
					<br />
					<span className='text-gradient'>like a pro</span>
				</h1>

				<p className='text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-[600px] mx-auto'>
					Plan, track, and achieve your goals with our modern time management
					platform. Stay productive, stay focused.
				</p>

				<div className='flex gap-3 justify-center mt-2'>
					{isLoading && <ButtonSkeleton width={140} height={44} />}
					{!isAuthenticated && !isLoading && (
						<Link href='/register' onClick={handleLinkClick}>
							<Button
								size='lg'
								className='gap-2 shadow-glow'
							>
								Get Started
								<ArrowRight className='w-4 h-4' />
							</Button>
						</Link>
					)}
					{isAuthenticated && !isLoading && (
						<Link href='/home'>
							<Button size='lg' className='gap-2 shadow-glow'>
								Go to Dashboard
								<ArrowRight className='w-4 h-4' />
							</Button>
						</Link>
					)}
				</div>

				<div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-[800px] mx-auto'>
					{features.map(f => (
						<div
							key={f.title}
							className='glass-card p-5 text-left hover:shadow-card transition-shadow'
						>
							<div className='w-10 h-10 rounded-lg bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-3'>
								{f.icon}
							</div>
							<h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
								{f.title}
							</h3>
							<p className='text-sm text-gray-500 dark:text-gray-400'>
								{f.desc}
							</p>
						</div>
					))}
				</div>
			</div>

			<ConfirmModal
				isOpen={isOpen}
				onClose={closeModal}
				onConfirm={handleModalConfirm}
				message="You don't have an account yet, would you like to register?"
			/>
		</>
	)
}
