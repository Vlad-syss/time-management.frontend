import { FC } from 'react'

interface StatsBlockProps {
	label: string
	value: number | string
	icon: string
}
export const StatsBlock: FC<StatsBlockProps> = ({ icon, label, value }) => {
	return (
		<div className='flex flex-col gap-3 items-center justify-center py-3 px-2 bg-orange-200 dark:bg-slate-700 shadow-lg rounded-md '>
			<h4 className='font-bold text-lg'>
				{label}: {value}
			</h4>
			<span className='text-[35px] py-5'>{icon}</span>
		</div>
	)
}
