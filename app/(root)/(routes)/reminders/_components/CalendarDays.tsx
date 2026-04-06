export const CalendarDays: React.FC<{
	daysOfWeek: string[]
	isMobile: boolean
}> = ({ daysOfWeek, isMobile }) => (
	<div className='grid grid-rows-7 md:grid-rows-1 md:grid-cols-7 gap-[1px] text-center bg-indigo-600 dark:bg-[#0F0F14]'>
		{daysOfWeek.map(day => (
			<div
				key={day}
				className='text-gray-700 flex items-center justify-center md:block dark:text-gray-300 font-semibold text-sm p-2 bg-gray-50 dark:bg-[#1A1A24] dark:bg-white/10'
			>
				{isMobile ? day[0] : day}
			</div>
		))}
	</div>
)
