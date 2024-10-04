import { fetchTheme, updateTheme } from '@/api'
import { useEffect, useState } from 'react'
import { useAuth } from './'

export const useTheme = () => {
	const { isAuthenticated } = useAuth()
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		const loadTheme = async () => {
			if (isAuthenticated) {
				try {
					const userTheme = await fetchTheme()
					setTheme(userTheme)
				} catch (error) {
					console.error('Failed to load theme:', error)
				}
			} else {
				setTheme('light')
			}
		}
		loadTheme()
	}, [isAuthenticated])

	const toggleTheme = async () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		if (isAuthenticated) {
			try {
				await updateTheme(newTheme)
			} catch (error) {
				console.error('Failed to update theme:', error)
				setTheme(theme)
			}
		}
	}

	return { theme, toggleTheme }
}
