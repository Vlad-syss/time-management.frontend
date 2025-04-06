import { StatsBlock } from './StatsBlock'

interface StatsSectionProps {
	title: string
	stats: { label: string; value: number | string; icon: string }[]
}

export const StatsSection: React.FC<StatsSectionProps> = ({ title, stats }) => (
	<div className='mb-4 col-span-2'>
		<h4 className='text-2xl font-bold text-orange-900 dark:text-slate-100 '>
			{title}
		</h4>
		<div className='text-sm font-semibold space-y-1 grid grid-col-0 sm:grid-cols-2 md:grid-cols-3 gap-2 w-full'>
			{stats.map((stat, index) => (
				<StatsBlock {...stat} key={index} />
			))}
		</div>
	</div>
)
