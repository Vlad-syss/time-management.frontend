import { useAxios } from '@/hooks'

export const updateTheme = async (theme: 'light' | 'dark'): Promise<void> => {
	try {
		await useAxios().put('/settings', { theme })
	} catch (error) {
		console.error('Failed to update theme:', error)
		throw error
	}
}

export const fetchTheme = async (): Promise<'light' | 'dark'> => {
	try {
		const response = await useAxios().get('/settings')
		return response.theme
	} catch (error) {
		console.error('Failed to fetch theme:', error)
		throw error
	}
}
