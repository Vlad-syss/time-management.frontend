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
					'group/item flex items-center gap-3 cursor-pointer rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors',
					isCollapsed && 'justify-center p-1',
					!isMobile && 'border-t border-gray-100 dark:border-white/[0.06] pt-3'
				)}
			>
				<div onClick={() => router.push('/profile')}>
					{data?.avatarUrl ? (
						<img
							src={`${BASE_URL}${data.avatarUrl}`}
							alt='profile-avatar'
							className={cn(
								'object-cover rounded-full border-2 border-gray-200 dark:border-white/10 select-none transition-all',
								isCollapsed
									? 'w-9 h-9'
									: 'w-9 h-9 md:w-10 md:h-10'
							)}
						/>
					) : (
						<Image
							src='/default-avatar.png'
							width={40}
							height={40}
							priority
							alt='default-avatar'
							className={cn(
								'object-cover rounded-full border-2 border-gray-200 dark:border-white/10 select-none transition-all',
								isCollapsed ? 'w-9 h-9' : 'w-9 h-9 md:w-10 md:h-10'
							)}
						/>
					)}
				</div>
				{!isCollapsed && !isMobile && (
					<>
						<div
							className='flex-auto flex flex-col min-w-0'
							onClick={() => router.push('/profile')}
						>
							<h4 className='text-sm font-semibold text-gray-900 dark:text-gray-100 truncate'>
								{data?.name}
							</h4>
							<p className='text-xs text-gray-500 dark:text-gray-400 truncate'>
								{data?.email}
							</p>
						</div>
						<Button
							variant='ghost'
							size='icon'
							className='w-6 h-6 opacity-0 group-hover/item:opacity-100 transition-opacity'
							ref={ref}
							onClick={openModal}
						>
							<ChevronsUpDownIcon className='w-4 h-4 text-gray-400' />
						</Button>
					</>
				)}
			</div>
			<MiniProfileModal elementRef={ref} isOpen={isOpen} onClose={closeModal} />
		</>
	)
}
