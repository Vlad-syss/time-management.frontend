'use client'

import { Input } from '@/components/ui/input'
import { FormInputProps } from '@/types'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
	({ placeholder, label, type = 'text', id, ...rest }, ref) => {
		const [showPassword, setShowPassword] = useState(false)

		const setShow = () => {
			setShowPassword(prev => !prev)
		}

		return (
			<div className='relative flex items-center'>
				<label htmlFor={id}>{label}</label>
				{type === 'password' ? (
					<Input
						id={id}
						placeholder={placeholder}
						className='pr-10 shadow-md drop-shadow'
						autoComplete='off'
						type={showPassword ? 'text' : type}
						{...rest}
						ref={ref}
					/>
				) : (
					<Input
						id={id}
						placeholder={placeholder}
						className='pr-10 shadow-md drop-shadow'
						autoComplete='off'
						type={type}
						{...rest}
						ref={ref}
					/>
				)}
				{type === 'password' && !showPassword && (
					<Eye
						className='absolute top-2/4 right-3 -translate-y-1/2 cursor-pointer'
						onClick={setShow}
					/>
				)}
				{type === 'password' && showPassword && (
					<EyeOff
						className='absolute top-2/4 right-3 -translate-y-1/2 cursor-pointer'
						onClick={setShow}
					/>
				)}
			</div>
		)
	}
)
