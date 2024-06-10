'use client'

import { useEffect, useState } from 'react'

export const useWidth = () => {
	const [width, setWidth] = useState<number>(1000)

	useEffect(() => {
		// This will run only on the client side
		const updateWidth = () => {
			setWidth(window.document.documentElement.clientWidth)
		}

		updateWidth() // Update width initially

		window.addEventListener('resize', updateWidth)

		// Cleanup the event listener on component unmount
		return () => {
			window.removeEventListener('resize', updateWidth)
		}
	}, [])

	return width
}
