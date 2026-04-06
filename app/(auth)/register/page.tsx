'use client'

import { useRegister } from '@/api'
import { Button } from '@/components/ui/button'
import { CircleUser, KeyRound, Loader2, Mail } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '../_components/FormInput'

interface InputsRegister {
	name: string
	password: string
	email: string
}

const RegisterPage = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<InputsRegister>({ mode: 'onChange' })
	const { mutate, isPending, data: userData } = useRegister()
	const router = useRouter()

	const onSubmit: SubmitHandler<InputsRegister> = async data => {
		try {
			await mutate(data, {
				onSuccess: data => {
					localStorage.setItem('jwtToken', data.token)
					router.push('/home')
				},
			})
		} catch (error: any) {
			console.error('Registration error:', error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('jwtToken')
		if (token) {
			router.push('/')
		}
	}, [])

	return (
		<div className='glass-surface p-6 md:p-8'>
			<div className='mb-6'>
				<h1 className='text-2xl font-bold text-gray-900 dark:text-white font-[family-name:var(--font-montserrat)]'>
					Create account
				</h1>
				<p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
					Sign up to get started with TakeTime
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
				<div>
					<FormInput
						id='name'
						label={<CircleUser className='w-4 h-4 text-gray-400' />}
						placeholder='Full name'
						{...register('name', { required: 'Name is required' })}
					/>
					{errors.name && (
						<span className='text-red-500 text-xs mt-1 block'>
							{errors.name.message}
						</span>
					)}
				</div>
				<div>
					<FormInput
						id='email'
						type='email'
						label={<Mail className='w-4 h-4 text-gray-400' />}
						placeholder='Email address'
						{...register('email', { required: 'Email is required' })}
					/>
					{errors.email && (
						<span className='text-red-500 text-xs mt-1 block'>
							{errors.email.message}
						</span>
					)}
				</div>
				<div>
					<FormInput
						id='password'
						type='password'
						label={<KeyRound className='w-4 h-4 text-gray-400' />}
						placeholder='Password (min 5 characters)'
						{...register('password', { required: 'Password is required' })}
					/>
					{errors.password && (
						<span className='text-red-500 text-xs mt-1 block'>
							{errors.password.message}
						</span>
					)}
				</div>
				<Button size='lg' className='w-full mt-2' type='submit'>
					{isPending && <Loader2 className='w-4 h-4 animate-spin mr-2' />}
					{!isPending && 'Create account'}
				</Button>
			</form>

			<p className='text-sm text-gray-500 dark:text-gray-400 mt-6 text-center'>
				Already have an account?{' '}
				<Link
					href='/login'
					className='font-semibold text-indigo-500 dark:text-indigo-400 hover:underline'
				>
					Sign in
				</Link>
			</p>
		</div>
	)
}

export default RegisterPage
