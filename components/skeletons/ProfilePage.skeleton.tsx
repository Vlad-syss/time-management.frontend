import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const ProfilePageSkeleton = () => {
	return (
		<SkeletonTheme baseColor='#fde183' highlightColor='#fff4dd'>
			<span className='p-5'>
				<Skeleton height={350} className='mb-3' />
				<Skeleton height={170} />
			</span>
		</SkeletonTheme>
	)
}
