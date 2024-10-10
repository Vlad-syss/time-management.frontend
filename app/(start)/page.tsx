'use client'

import { ConfirmModal } from '@/components/modals/ConfirmModal'
import { useAuthContext } from '@/components/providers'
import { ButtonSkeleton } from '@/components/skeletons'
import { Button } from '@/components/ui/button'
import { useConfirmModal, useWidth } from '@/hooks'
import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import style from './_components/style.module.scss'

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

	return (
		<>
			<main className='md:text-center text-start h-full flex md:items-center flex-col gap-3 relative z-10 '>
				<h1 className='font-semibold text-2xl md:text-4xl leading-8 md:leading-10 relative z-10'>
					Hello, it's a project called "Take
					<span className='text-orange-600 dark:text-orange-400'>Time</span>"
					{width <= 768 ? ' ' : <br />}
					here to assist you with your time management!
				</h1>
				<p className='text-[15px] md:text-[19px] text-emerald-800 dark:text-emerald-200 transition-colors font-medium drop-shadow-lg tracking-[1px] relative z-10'>
					Supercharge your day with our time management app. Plan, track,
					achieve.
				</p>
				{isLoading && <ButtonSkeleton width={130} height={50} />}
				{!isAuthenticated && !isLoading && (
					<Link href='/register' onClick={handleLinkClick}>
						<Button
							size={width <= 768 ? 'sm' : 'lg'}
							variant='default'
							className={cn(
								'mt-3 relative z-10 w-full md:w-auto dark:bg-[#222222]/80',
								style.get
							)}
						>
							Start Road Now!
						</Button>
					</Link>
				)}
				{isAuthenticated && !isLoading && (
					<Link href='/home'>
						<Button
							size={width <= 768 ? 'sm' : 'lg'}
							variant='default'
							className='mt-3 relative z-10 w-full md:w-auto hover:dark:bg-[#222222]/60 dark:bg-[#222222]/80'
						>
							Enter Now!
						</Button>
					</Link>
				)}
				<Image
					src='/start.png'
					alt='image'
					className=' top-[10%] object-cover opacity-90 right-[83%] select-none mx-auto md:w-[330px] md:mx-0 text-center lg:w-[450px] w-[360px]'
					width={width <= 1024 ? 450 : width <= 768 ? 330 : 360}
					height={300}
				/>
			</main>
			<ConfirmModal
				isOpen={isOpen}
				onClose={closeModal}
				onConfirm={handleModalConfirm}
				message="You don't have an account yet, would you like to register?"
			/>
		</>
	)
}
