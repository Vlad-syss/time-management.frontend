export interface User {
	_id: string
	name: string
	email: string
	avatarUrl: string
	passwordHash: string
	role: string
	country: string
	description: string
	updatedAt: string
	createdAt: string
}

export interface UserChange {
	name: string
	email: string
	country: string
	description: string
}

export interface RegisterRequestBody {
	name: string
	email: string
	password: string
	avatarUrl?: string
}

export interface LoginRequestBody {
	email: string
	password: string
}

export interface RegisterResponse {
	_id: string
	name: string
	email: string
	avatarUrl?: string
	token: string
}
