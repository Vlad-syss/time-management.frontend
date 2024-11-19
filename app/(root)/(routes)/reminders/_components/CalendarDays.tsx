export const CalendarDays: React.FC<{
	daysOfWeek: string[]
	isMobile: boolean
}> = ({ daysOfWeek, isMobile }) => (
	<div className='grid grid-rows-7 md:grid-rows-1 md:grid-cols-7 gap-[1px] text-center bg-orange-600 dark:bg-gray-900'>
		{daysOfWeek.map(day => (
			<div
				key={day}
				className='text-gray-700 flex items-center justify-center md:block dark:text-gray-300 font-semibold text-sm p-2 bg-foreground/95 dark:bg-gray-600'
			>
				{isMobile ? day[0] : day}
			</div>
		))}
	</div>
)
