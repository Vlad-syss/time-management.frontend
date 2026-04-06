import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const ProfilePageSkeleton = () => {
	return (
		<SkeletonTheme baseColor='#E5E7EB' highlightColor='#F3F4F6'>
			<span className='p-5'>
				<Skeleton height={350} className='mb-3' />
				<Skeleton height={170} />
			</span>
		</SkeletonTheme>
	)
}
