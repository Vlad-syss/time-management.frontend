'use client'

import { useTheme } from '@/hooks'
import React, { createContext, useContext, useEffect } from 'react'

interface ThemeContextType {
	theme: 'light' | 'dark'
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { theme, toggleTheme } = useTheme()
	// const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>(theme)

	useEffect(() => {
		// setCurrentTheme(theme)
		if (theme === 'dark') {
			document.documentElement.classList.add('dark')
			document.documentElement.classList.remove('light')
		} else {
			document.documentElement.classList.remove('dark')
			document.documentElement.classList.add('light')
		}
	}, [theme])

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useThemeContext = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error('useThemeContext must be used within a ThemeProvider')
	}
	return context
}
