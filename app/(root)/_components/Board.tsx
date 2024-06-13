'use client'

import { Button } from '@/components/ui/button'
import { Bell } from 'lucide-react'
import { memo } from 'react'

export const Board = memo(function Board() {
	return (
		<div className='w-full bg-foreground'>
			<div className=' max-w-[1200px] mx-auto py-4 px-2'>
				<Button size='icon'>
					<Bell />
				</Button>
			</div>
		</div>
	)
})
