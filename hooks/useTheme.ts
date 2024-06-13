import { fetchTheme, updateTheme } from '@/api'
import { useEffect, useState } from 'react'
import { useAuth } from './'

export const useTheme = () => {
	const { isAuthenticated } = useAuth()
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		if (isAuthenticated) {
			const loadTheme = async () => {
				try {
					const theme = await fetchTheme()
					setTheme(theme)
				} catch (error) {
					console.error('Failed to load theme:', error)
				}
			}
			loadTheme()
		}
	}, [isAuthenticated])

	const toggleTheme = async () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		if (isAuthenticated) {
			try {
				await updateTheme(newTheme)
			} catch (error) {
				console.error('Failed to update theme:', error)
			}
		}
	}

	return { theme, toggleTheme }
}
