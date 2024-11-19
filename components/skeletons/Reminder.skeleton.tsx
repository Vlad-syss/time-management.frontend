import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const ReminderPageSkeleton: React.FC = () => {
	return (
		<SkeletonTheme baseColor='#fde183' highlightColor='#fff4dd'>
			<div className='grid grid-cols-7 gap-1'>
				{Array.from({ length: 30 }).map((_, idx) => (
					<div key={idx} className='p-1 border rounded shadow-sm'>
						<Skeleton height={20} width={30} className='mb-1' />
						<Skeleton height={15} count={2} />
					</div>
				))}
			</div>
		</SkeletonTheme>
	)
}
