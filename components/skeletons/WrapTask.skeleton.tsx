import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const WrapTaskSkeleton = () => {
	return (
		<SkeletonTheme baseColor='#E5E7EB' highlightColor='#F3F4F6'>
			<p>
				<Skeleton count={3} height={90} className='mb-2' />
				<Skeleton count={1} height={50} className='mt-1' />
			</p>
		</SkeletonTheme>
	)
}
