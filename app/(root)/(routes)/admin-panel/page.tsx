'use client'

import { useWidth } from '@/hooks'
import cn from 'classnames'

const AdminPanelPage = () => {
	const width = useWidth()
	const isMobile = width < 945

	/**
	 * admin features
	 *
	 */
	return (
		<>
			<div
				className={cn('py-3 flex flex-col gap-3', {
					'pb-24 sm:pb-20': isMobile,
				})}
			>
				<h4 className='text-[30px] md:text-[38px] font-bold tracking-wide'>
					Admin-panel!
				</h4>
			</div>
		</>
	)
}

export default AdminPanelPage
