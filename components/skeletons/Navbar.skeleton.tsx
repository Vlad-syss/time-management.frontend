import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const NavbarSkeleton = () => {
	return (
		<SkeletonTheme baseColor='#E5E7EB' highlightColor='#F3F4F6'>
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
		<SkeletonTheme baseColor='#E5E7EB' highlightColor='#F3F4F6'>
			<Skeleton width={width} height={height} />
		</SkeletonTheme>
	)
}
