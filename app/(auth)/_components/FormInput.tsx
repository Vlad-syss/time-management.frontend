'use client'

import { Input } from '@/components/ui/input'
import { FormInputProps } from '@/types'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
	({ placeholder, label, type = 'text', id, ...rest }, ref) => {
		const [showPassword, setShowPassword] = useState(false)

		return (
			<div className='relative'>
				<div className='absolute left-3 top-1/2 -translate-y-1/2 z-10'>
					{label}
				</div>
				<Input
					id={id}
					placeholder={placeholder}
					className='pl-10 pr-10'
					autoComplete='off'
					type={type === 'password' && showPassword ? 'text' : type}
					{...rest}
					ref={ref}
				/>
				{type === 'password' && (
					<button
						type='button'
						className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors'
						onClick={() => setShowPassword(prev => !prev)}
					>
						{showPassword ? (
							<EyeOff className='w-4 h-4' />
						) : (
							<Eye className='w-4 h-4' />
						)}
					</button>
				)}
			</div>
		)
	}
)
