'use client'

import { Loader } from 'lucide-react'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

export default function Loading() {
	useEffect(() => {
		const toastId = toast.loading('', {
			style: {
				background: '#333',
				color: '#fff',
				padding: '8px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: '8px',
				boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
			},
			icon: <Loader className='w-7 h-7 animate-spin' />,
			position: 'top-left',
		})

		return () => toast.dismiss(toastId)
	}, [])

	return null
}
