import { Button } from '@/components/ui/button'

interface PaginationProps {
	currentPage: number
	totalPages: number
	onNext: () => void
	onPrevious: () => void
}

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onNext,
	onPrevious,
}) => (
	<div className='flex justify-between items-center mt-4'>
		<Button
			variant='secondary'
			className='disabled:opacity-50 dark:bg-[#1A1A24] hover:dark:bg-[#1A1A24]'
			onClick={onPrevious}
			disabled={currentPage === 1}
		>
			Previous
		</Button>
		<span className='font-bold'>
			Page {currentPage} of {totalPages}
		</span>
		<Button
			variant='secondary'
			className='disabled:opacity-50 dark:bg-[#1A1A24] hover:dark:bg-[#1A1A24]'
			onClick={onNext}
			disabled={currentPage === totalPages}
		>
			Next
		</Button>
	</div>
)
