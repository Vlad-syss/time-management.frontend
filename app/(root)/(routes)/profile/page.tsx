'use client'

import { BASE_URL } from '@/components/consts'
import { useUserContext } from '@/components/providers'
import { ProfilePageSkeleton } from '@/components/skeletons'
import { Button } from '@/components/ui/button'
import { useWidth } from '@/hooks'
import cn from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeProfile } from './_components/ChangeProfile'
import { ViewProfile } from './_components/ViewProfile'

const ProfilePage = () => {
	const { userData, error, isError, isPending } = useUserContext()
	const params = useSearchParams()
	const isImage = !!userData?.avatarUrl
	const router = useRouter()
	const width = useWidth()
	const isMobile = width < 945

	const activeTab = params.get('tabs') || 'profile'

	const handleTabChange = (tab: string) => {
		router.push(`/profile?tabs=${tab}`)
	}

	if (isPending || userData === undefined) {
		return <ProfilePageSkeleton />
	}

	if (isError) {
		return <p>{error.message}</p>
	}

	return (
		<>
			<div
				className={cn(
					' py-1 md:py-5 md:px-6 flex flex-col gap-3 md:gap-6 items-center',
					{
						'pb-24 sm:pb-20': isMobile,
					}
				)}
			>
				<div className='w-full flex flex-col items-center bg-orange-400/60 dark:bg-gray-700/60 shadow-lg rounded-lg p-6 gap-4'>
					<div className='flex flex-col items-center'>
						{isImage ? (
							<div className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden shadow-lg'>
								<img
									src={`${BASE_URL}${userData.avatarUrl}`}
									alt='avatar'
									className='object-cover w-full h-full'
								/>
							</div>
						) : (
							<div className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center'>
								<p className='text-red-600 font-bold'>No Avatar</p>
							</div>
						)}

						<h2 className='text-2xl md:text-3xl text-orange-800 dark:text-white font-bold mt-4'>
							{userData?.name}
						</h2>
						<p className='text-[13px] md:text-sm text-gray-700 dark:text-gray-400'>
							{userData?.country}
						</p>

						<span className='mt-2 px-4 py-1 text-sm font-semibold text-white bg-orange-600 dark:bg-slate-900 rounded-full'>
							{userData?.role}
						</span>
					</div>

					<div className='w-full flex justify-center gap-2'>
						<Button
							variant='add'
							size='lg'
							className={cn('rounded-l-lg font-medium px-6 py-2 border-none', {
								'bg-orange-500 hover:bg-orange-500 dark:bg-slate-900 text-white':
									activeTab === 'profile',
								'bg-orange-200 hover:bg-orange-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200':
									activeTab !== 'profile',
							})}
							onClick={() => handleTabChange('profile')}
						>
							Profile
						</Button>
						<Button
							variant='add'
							size='lg'
							className={cn('rounded-l-lg font-medium px-6 py-2 border-none', {
								'bg-orange-500 hover:bg-orange-500 dark:bg-slate-900 text-white':
									activeTab === 'change',
								'bg-orange-200 hover:bg-orange-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200':
									activeTab !== 'change',
							})}
							onClick={() => handleTabChange('change')}
						>
							Change
						</Button>
					</div>
				</div>
				{activeTab === 'profile' && <ViewProfile {...userData} />}
				{activeTab === 'change' && <ChangeProfile {...userData} />}
			</div>
		</>
	)
}

export default ProfilePage
