import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const ProfileSkeleton = () => {
	return (
		<SkeletonTheme baseColor='#fde183' highlightColor='#fff4dd'>
			<p className='flex relative gap-2 items-center'>
				<Skeleton circle width={50} height={50} inline />
				<span className='block w-full'>
					<Skeleton count={2} height={30} />
				</span>
			</p>
		</SkeletonTheme>
	)
}

export const ProfileErrorSkeleton = () => {
	return (
		<SkeletonTheme baseColor='#fde183'>
			<Skeleton circle width={30} height={30} className='inline-flex' />
			<p>
				<Skeleton count={2} height={30} />
			</p>
		</SkeletonTheme>
	)
}
