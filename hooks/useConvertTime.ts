import { useEffect, useState } from 'react'

export const useConvertTime = (timestamp: string) => {
	const [convertedTime, setConvertedTime] = useState('')

	useEffect(() => {
		const calculateConvert = () => {
			const now: any = new Date()
			const targetDate: any = new Date(timestamp)
			const difference = targetDate - now

			if (difference < 0) {
				setConvertedTime('Time passed')
				return
			}

			const diffInMinutes = Math.floor(difference / (1000 * 60))
			const diffInHours = Math.floor(difference / (1000 * 60 * 60))
			const diffInDays = Math.floor(difference / (1000 * 60 * 60 * 24))
			const diffInMonths = Math.floor(difference / (1000 * 60 * 60 * 24 * 30))
			const diffInYears = Math.floor(difference / (1000 * 60 * 60 * 24 * 365))

			if (diffInDays < 1) {
				setConvertedTime(`${diffInHours}h and ${diffInMinutes % 60}m left`)
			} else if (diffInMonths < 1) {
				setConvertedTime(`${diffInDays}d left`)
			} else if (diffInYears < 1) {
				setConvertedTime(`${diffInMonths}mon left`)
			} else {
				setConvertedTime(`${diffInYears}y left`)
			}
		}

		calculateConvert()
		const interval = setInterval(calculateConvert, 60000)

		return () => clearInterval(interval)
	}, [timestamp])

	return convertedTime
}
