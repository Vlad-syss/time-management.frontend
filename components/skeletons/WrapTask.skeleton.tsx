import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const WrapTaskSkeleton = () => {
	return (
		<SkeletonTheme baseColor='#f7a850' highlightColor='#fde79b'>
			<p>
				<Skeleton count={3} height={90} className='mb-2' />
				<Skeleton count={1} height={50} className='mt-1' />
			</p>
		</SkeletonTheme>
	)
}
