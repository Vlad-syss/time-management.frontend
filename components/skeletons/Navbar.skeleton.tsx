import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const NavbarSkeleton = () => {
	return (
		<SkeletonTheme baseColor='#fde183' highlightColor='#fff4dd'>
			<div className='flex gap-2'>
				<Skeleton width={100} height={30} />
				<Skeleton width={100} height={30} />
			</div>
		</SkeletonTheme>
	)
}
export const ButtonSkeleton = ({
	width,
	height,
}: {
	width: number
	height: number
}) => {
	return (
		<SkeletonTheme baseColor='#fde183' highlightColor='#fff4dd'>
			<Skeleton width={width} height={height} />
		</SkeletonTheme>
	)
}
