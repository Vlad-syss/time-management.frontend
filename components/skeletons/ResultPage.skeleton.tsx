import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const ResultPageSkeleton = () => {
	return (
		<SkeletonTheme baseColor='#fde183' highlightColor='#fff4dd'>
			<div className='flex flex-col gap-5'>
				<p className='grid grid-cols-7 grid-rows-2 gap-x-4 gap-y-2 mt-3 w-full'>
					<span className='col-span-5 row-span-2'>
						<Skeleton height={40} />
					</span>
					<span className='col-span-2 col-start-6'>
						<Skeleton height={40} />
					</span>
					<span className='col-start-6 row-start-2'>
						<Skeleton height={40} />
					</span>
					<span className='col-start-7 row-start-2'>
						<Skeleton height={40} />
					</span>
				</p>
				<Skeleton height={100} count={5} className='mb-2' />
			</div>
		</SkeletonTheme>
	)
}
