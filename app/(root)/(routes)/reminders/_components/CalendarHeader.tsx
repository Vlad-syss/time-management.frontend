import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export const CalendarHeader: React.FC<{
	month: string
	year: number
	onPreviousMonth: () => void
	onNextMonth: () => void
}> = ({ month, year, onPreviousMonth, onNextMonth }) => (
	<article className='border-b-2 md:border-0 flex items-center justify-between'>
		<h4 className='md:text-lg font-bold'>
			{month} / {year}
		</h4>
		<div className='flex items-center gap-[2px] h-7 md:h-10 bg-slate-100'>
			<Button
				onClick={onPreviousMonth}
				className=' h-7 md:h-10 rounded-none dark:bg-slate-700 dark:hover:bg-slate-800'
				variant='secondary'
			>
				<ArrowLeft className=' w-5 md:w-6' />
			</Button>
			<Button
				onClick={onNextMonth}
				className=' h-7 md:h-10 rounded-none dark:bg-slate-700 dark:hover:bg-slate-800'
				variant='secondary'
			>
				<ArrowRight className=' w-5 md:w-6' />
			</Button>
		</div>
	</article>
)
