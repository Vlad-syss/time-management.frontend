'use client'

import { useUser } from '@/api'
import { useUpdateUser, useUploadAvatar } from '@/api/user.api'
import { User, UserChange } from '@/types'
import { ReactNode, createContext, useContext } from 'react'

interface UserTypes {
	handleUpdate: (data: UserChange) => Promise<void>
	handleUpload: (file: File) => Promise<void>
	userData: User | undefined
	isError: boolean
	error: any
	isPending: boolean
}

const UserContext = createContext<UserTypes | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const { data: userData, refetch, isError, error, isPending } = useUser()

	const refetchUser = async () => {
		await refetch()
	}

	const { mutateAsync: updateUser } = useUpdateUser(refetchUser)
	const { mutateAsync: uploadAvatar } = useUploadAvatar(refetchUser)

	const handleUpdate = async (data: UserChange) => {
		try {
			await updateUser(data)
		} catch (error) {
			console.error('Failed to update user:', error)
		}
	}

	const handleUpload = async (file: File) => {
		try {
			const formData = new FormData()

			formData.append('avatar', file)
			await uploadAvatar(formData)
		} catch (error) {
			console.error('Failed to upload avatar:', error)
		}
	}

	return (
		<UserContext.Provider
			value={{
				userData,
				handleUpdate,
				error,
				isError,
				isPending,
				handleUpload,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export const useUserContext = (): UserTypes => {
	const context = useContext(UserContext)
	if (context === undefined) {
		throw new Error('useUserContext must be used within a UserProvider')
	}
	return context
}
