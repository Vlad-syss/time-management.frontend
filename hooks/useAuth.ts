import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'

interface DecodedToken {
	exp: number
	[key: string]: any
}

export const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const logout = () => {
		localStorage.removeItem('jwtToken')
		setIsAuthenticated(false)
	}

	useEffect(() => {
		const token = localStorage.getItem('jwtToken')

		if (token) {
			try {
				const decodedToken: DecodedToken = jwtDecode(token)
				if (decodedToken.exp * 1000 > Date.now()) {
					setIsAuthenticated(true)
				} else {
					localStorage.removeItem('jwtToken')
				}
			} catch (error) {
				console.error('Invalid token', error)
				localStorage.removeItem('jwtToken')
			}
		}

		setIsLoading(false)
	}, [setIsAuthenticated, logout])

	return { isAuthenticated, isLoading, logout }
}
