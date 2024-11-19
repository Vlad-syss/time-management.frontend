import AddReminderPopup from '@/components/modals/_components/AddReminderPopup'
import { Button } from '@/components/ui/button'
import { RefObject } from 'react'

interface HeaderProps {
	onTogglePopup: () => void
	showPopup: boolean
	popupPosition: { top: string; left: string }
	refButton: RefObject<HTMLButtonElement>
	messageData?: string
	timeData?: string
	isMobile: boolean
}

export const Header: React.FC<HeaderProps> = ({
	onTogglePopup,
	showPopup,
	popupPosition,
	refButton,
	messageData,
	timeData,
	isMobile,
}) => (
	<div className='flex justify-between g-2 '>
		<h4 className='text-[26px] md:text-[38px] font-bold tracking-wide'>
			Reminders!
		</h4>
		<div className='relative w-full flex justify-end'>
			<Button
				variant='outline'
				size={isMobile ? 'sm' : 'lg'}
				className='text-orange-700 hover:text-orange-100 hover:border-background col-span-full'
				onClick={onTogglePopup}
				ref={refButton}
			>
				Create new!
			</Button>
			{showPopup && (
				<AddReminderPopup
					onClose={onTogglePopup}
					top={popupPosition.top}
					right={popupPosition.left}
					width='400px'
					messageData={messageData}
					timeData={timeData}
					isMobile={isMobile}
				/>
			)}
		</div>
	</div>
)
