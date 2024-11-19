import { useReminderContext } from '@/components/providers'
import { Checkbox } from 'rsuite'

interface ReminderGroupsProps {
	theme: 'light' | 'dark'
}

export const ReminderGroups: React.FC<ReminderGroupsProps> = ({ theme }) => {
	const { activeGroups, groupReminders } = useReminderContext()

	return (
		<ul className='flex flex-col'>
			<li>
				<Checkbox
					color={theme === 'light' ? 'orange' : 'blue'}
					className='select-none'
					checked={activeGroups.todays}
					onChange={() => groupReminders('todays')}
				>
					<span className='font-medium'>today reminders</span>
				</Checkbox>
			</li>
			<li>
				<Checkbox
					color={theme === 'light' ? 'orange' : 'blue'}
					className='select-none'
					checked={activeGroups.tommorows}
					onChange={() => groupReminders('tommorows')}
				>
					<span className='font-medium'>tomorrow reminders</span>
				</Checkbox>
			</li>
			<li>
				<Checkbox
					color={theme === 'light' ? 'orange' : 'blue'}
					className='select-none'
					checked={activeGroups.nextWeek}
					onChange={() => groupReminders('nextWeek')}
				>
					<span className='font-medium'>next week reminders</span>
				</Checkbox>
			</li>
		</ul>
	)
}
