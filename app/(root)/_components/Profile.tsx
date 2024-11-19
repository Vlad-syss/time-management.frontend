'use client'

import { useUser } from '@/api'
import { BASE_URL } from '@/components/consts'
import { MiniProfileModal } from '@/components/modals/MiniProfleModal'
import { ProfileErrorSkeleton, ProfileSkeleton } from '@/components/skeletons'
import { Button } from '@/components/ui/button'
import { useMiniProfileModal } from '@/hooks'
import cn from 'classnames'
import { ChevronsUpDownIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { toast } from 'react-hot-toast'

export const Profile = ({
	isCollapsed,
	isMobile,
}: {
	isCollapsed: boolean
	isMobile: boolean | undefined
}) => {
	const { data, isPending, error, isError } = useUser()
	const ref = useRef<HTMLButtonElement>(null)
	const { closeModal, isOpen, openModal } = useMiniProfileModal()
	const router = useRouter()

	if (isPending && data === undefined) {
		return <ProfileSkeleton />
	}
	if (isError) {
		toast.error(`Failed to get user: ${error.message}`)
		return <ProfileErrorSkeleton />
	}

	return (
		<>
			<div
				className={cn(
					'group/item flex items-center gap-[10px] cursor-pointer border-b-2 border-background hover:border-red-700 transition-colors dark:hover:border-stone-50',
					isCollapsed && 'justify-center',
					!isMobile && 'pb-2'
				)}
			>
				<div onClick={() => router.push('/profile')}>
					{data?.avatarUrl && (
						<img
							src={`${BASE_URL}${data.avatarUrl}`}
							alt='profile-avatar'
							className={cn(
								'object-cover rounded-full min-w-[60px] max-w-[60px] h-[50px] md:w-[60px] md:h-[60px] border-[1px] md:border-2 border-white select-none transition-all',
								isCollapsed && ' min-w-[50px] max-w-[50px] h-[50px]'
								// isMobile && 'w-[45px] h-[45px]'
							)}
						/>
					)}
					{!data?.avatarUrl && (
						<Image
							src='/default-avatar.png'
							width={100}
							height={100}
							priority
							alt='default-avatar'
							className={cn(
								'object-fill rounded-full min-w-[60px] max-w-[60px] h-[60px] border-2 border-background select-none transition-all dark:shadow-sm dark:shadow-white',
								isCollapsed && ' min-w-[50px] max-w-[50px] h-[50px]'
							)}
						/>
						//default-avatar
					)}
				</div>
				{!isCollapsed && !isMobile && (
					<>
						<article
							className='flex-auto flex flex-col leading-[18px]'
							onClick={() => router.push('/profile')}
						>
							<h4 className='text-[16px] font-semibold tracking-widest text-[#222] dark:text-red-100'>
								{data?.name}
							</h4>
							<p className='text-sm text-gray-600 dark:text-gray-300 tracking-wider truncate w-[150px]'>
								{data?.email}
							</p>
						</article>
						<Button
							variant='outline'
							size='icon'
							className='my-auto w-7 text-[#222] dark:text-gray-300 px-1 border-0 hover:bg-accent/0 opacity-0 group-hover/item:opacity-100 transition-opacity'
							ref={ref}
							onClick={openModal}
						>
							<ChevronsUpDownIcon />
						</Button>
					</>
				)}
			</div>
			<MiniProfileModal elementRef={ref} isOpen={isOpen} onClose={closeModal} />
		</>
	)
}
