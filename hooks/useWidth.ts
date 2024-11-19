'use client'

import { useEffect, useState } from 'react'

export const useWidth = () => {
	const [width, setWidth] = useState<number>(1000)

	useEffect(() => {
		const updateWidth = () => {
			setWidth(window.document.documentElement.clientWidth)
		}

		updateWidth()

		window.addEventListener('resize', updateWidth)

		return () => {
			window.removeEventListener('resize', updateWidth)
		}
	}, [])

	return width
}
