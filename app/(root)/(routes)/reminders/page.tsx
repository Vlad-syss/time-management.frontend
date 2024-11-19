'use client'

import { useReminderContext } from '@/components/providers'
import { ReminderPageSkeleton } from '@/components/skeletons'
import { useTheme, useWidth } from '@/hooks'
import cn from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { Calendar } from './_components/Calendar'
import { Filters } from './_components/Filters'
import { Header } from './_components/Header'
import { ReminderGroups } from './_components/ReminderGroups'
import { SearchInput } from './_components/SearchInput'
import { Sorting } from './_components/Sorting'

interface PopupPosition {
	top: string
	left: string
}

const RemindersPage: React.FC = () => {
	const width = useWidth()
	const {
		reminderData,
		isPending,
		isError,
		error,
		deleteReminder,
		updateReminder,
		filteredReminders,
		searchReminders,
		searchQuery,
		setSearchQuery,
	} = useReminderContext()
	const [showPopup, setShowPopup] = useState<boolean>(false)
	const [timeData, setTimeData] = useState('')
	const { theme } = useTheme()
	const refButton = useRef<HTMLButtonElement | null>(null)
	const isMobile = width < 945
	const [popupPosition, setPopupPosition] = useState<PopupPosition>({
		top: '0px',
		left: '0px',
	})

	const handleSend = () => {
		searchReminders(searchQuery)
	}

	useEffect(() => {
		if (showPopup && refButton.current) {
			const buttonRect = refButton.current.getBoundingClientRect()
			setPopupPosition({
				top: `${buttonRect.top + window.scrollY - 30}px`,
				left: '0px',
			})
		}
	}, [showPopup])

	if (isError) {
		return <p>Error: {error?.message || 'An error occurred'}</p>
	}

	return (
		<div
			className={cn('py-3 flex flex-col gap-3', {
				'pb-24 sm:pb-20': isMobile,
			})}
		>
			<Header
				onTogglePopup={() => setShowPopup(!showPopup)}
				showPopup={showPopup}
				popupPosition={popupPosition}
				refButton={refButton}
				timeData={timeData}
				isMobile={isMobile}
			/>
			<div className='grid gap-2 xl:grid-cols-[1fr_210px]'>
				<div className='flex flex-col gap-2'>
					<SearchInput
						handleSend={handleSend}
						searchQuery={searchQuery}
						setSearchQuery={setSearchQuery}
					/>
					<div className='flex flex-col md:flex-row gap-2 space-y-2 md:space-y-0'>
						<Filters />
						<Sorting />
					</div>
				</div>
				<ReminderGroups theme={theme} />
			</div>
			<div>
				{isPending ? (
					<ReminderPageSkeleton />
				) : (
					<Calendar
						reminders={filteredReminders || []}
						deleteReminder={deleteReminder}
						updateReminder={updateReminder}
						setShowPopup={setShowPopup}
						setTimeData={setTimeData}
					/>
				)}
			</div>
		</div>
	)
}

export default RemindersPage
