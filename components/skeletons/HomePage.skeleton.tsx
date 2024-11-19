import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const HomePageSkeleton = () => {
	return (
		<SkeletonTheme baseColor='#fde183' highlightColor='#fff4dd'>
			<p className='p-5'>
				<Skeleton height={50} width={200} className='mb-3 mx-3' />
				<span>
					<Skeleton
						height={130}
						width='22.5%'
						count={5}
						inline
						className='mb-3 mx-3'
					/>
				</span>
				<Skeleton height={300} />
			</p>
		</SkeletonTheme>
	)
}
