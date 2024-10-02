'use client'

import { useUser } from '@/api'
import { Button } from '@/components/ui/button'
import cn from 'classnames'
import { ChevronsUpDownIcon, LoaderPinwheel } from 'lucide-react'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

const BASE_URL = process.env.DB_URL?.replace('/api', '')

export const Profile = ({
	isCollapsed,
	isMobile,
}: {
	isCollapsed: boolean
	isMobile: boolean | undefined
}) => {
	const { data, isPending, error, isError } = useUser()

	if (isPending && data == undefined) {
		return <LoaderPinwheel className='animate-spin w-10 h-10 my-3 mx-auto' />
	}
	if (isError) {
		toast.error(`Failed to get user: ${error.message}`)
		return <p>Something go wrong</p>
	}

	return (
		<div
			className={cn(
				'group/item flex items-center gap-[10px] cursor-pointer border-b-2 border-background hover:border-red-700 transition-colors dark:hover:border-stone-50',
				isCollapsed && 'justify-center',
				!isMobile && 'pb-2'
			)}
		>
			<div>
				{data?.avatarUrl && (
					<Image
						src={`${BASE_URL}${data.avatarUrl}`}
						width={100}
						height={100}
						priority
						alt='profile-avatar'
						className={cn(
							'object-cover rounded-full w-[60px] h-[60px] border-2 border-white select-none transition-all',
							isCollapsed && ' w-[50px] h-[50px]',
							isMobile && 'w-[45px] h-[45px]'
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
							'object-fill rounded-full w-[60px] h-[60px] border-2 border-background select-none transition-all dark:shadow-sm dark:shadow-white',
							isCollapsed && ' w-[50px] h-[50px]'
						)}
					/>
					//default-avatar
				)}
			</div>
			{!isCollapsed && !isMobile && (
				<>
					<article className='flex-auto flex flex-col leading-[18px]'>
						<h4 className='text-[16px] font-semibold tracking-widest text-[#222] dark:text-red-100'>
							{data?.name}
						</h4>
						<p className='text-sm text-gray-600 dark:text-gray-300 tracking-wider'>
							{data?.email}
						</p>
					</article>
					<Button
						variant='outline'
						size='icon'
						className='my-auto w-7 text-[#222] dark:text-gray-300 px-1 border-0 hover:bg-accent/0 opacity-0 group-hover/item:opacity-100 transition-opacity'
					>
						<ChevronsUpDownIcon />
					</Button>
				</>
			)}
		</div>
	)
}
