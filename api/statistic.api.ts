import { useAxios } from '@/hooks'
import { Statistic } from '@/types'

export const getStatistic = async (): Promise<Statistic> => {
	try {
		const data = await useAxios().get('/statistic')

		return data
	} catch (error) {
		console.error('Failed to get reminders:', error)
		throw error
	}
}
