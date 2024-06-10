import React, {
	CSSProperties,
	ChangeEvent,
	HTMLInputTypeAttribute,
} from 'react'

export interface RouteLink {
	name: string
	href: string
	icon: JSX.Element
	isHome?: boolean
}

export interface FormInputProps {
	placeholder?: string
	type?: HTMLInputTypeAttribute
	className?: string
	id: string
	label?: React.ReactNode
	name?: string
	onBlur?: (event: ChangeEvent<HTMLInputElement>) => void
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	style?: CSSProperties
}
