'use client'

import { useAuth } from '@/hooks'
import { ReactNode, createContext, useContext } from 'react'

interface AuthContextType {
	isAuthenticated: boolean
	isLoading: boolean
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const auth = useAuth()

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: auth.isAuthenticated,
				logout: auth.logout,
				isLoading: auth.isLoading,
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
