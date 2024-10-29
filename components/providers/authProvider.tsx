'use client'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import {
	ReactNode,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'

interface DecodedToken {
	exp: number
	[key: string]: any
}

interface AuthContextType {
	isAuthenticated: boolean
	isLoading: boolean
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()

	const logout = () => {
		localStorage.removeItem('jwtToken')
		setIsAuthenticated(false)
		router.push('/')
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
	}, [])

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				isLoading,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuthContext must be used within an AuthProvider')
	}
	return context
}
