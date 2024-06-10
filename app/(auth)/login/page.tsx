'use client'

import { useLogin } from '@/api'
import { Button } from '@/components/ui/button'
import { KeyRound, LoaderPinwheel, Mail, ScanFace } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '../_components/FormInput'

interface InputsLogin {
	password: string
	email: string
}

const LoginPage = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<InputsLogin>({ mode: 'onChange' })
	const { data: userData, isPending, mutate } = useLogin()
	const router = useRouter()

	const onSubmit: SubmitHandler<InputsLogin> = async data => {
		try {
			await mutate(data, {
				onSuccess: data => {
					localStorage.setItem('jwtToken', data.token)
					router.push('/home')
				},
			})
		} catch (error) {
			console.log('Login error:', error)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('jwtToken')
		if (token) {
			router.push('/')
		}
	}, [])

	return (
		<form
			action=''
			onSubmit={handleSubmit(onSubmit)}
			className='p-5 bg-orange-300/70 drop-shadow-xl text-orange-700 rounded-[10px] min-w-[550px]'
		>
			<div className='flex items-center justify-between py-6 pb-8 px-3'>
				<article>
					<p className='font-bold text-[24px] tracking-wide'>Client Login</p>
					<span className='text-orange-900/80 text-sm font-medium '>
						Enter your account details to login
					</span>
				</article>
				<ScanFace className='w-10 h-10' />
			</div>
			<div className='flex flex-col gap-2'>
				<FormInput
					id='email'
					type='email'
					label={<Mail className='w-8 h-8 mr-2 cursor-pointer' />}
					placeholder='Enter your account email'
					{...register('email', { required: 'Email is required' })}
				/>
				{errors.email && (
					<span className='text-red-600 text-xs'>{errors.email.message}</span>
				)}
				<FormInput
					id='password'
					type='password'
					label={<KeyRound className='w-8 h-8 mr-2 cursor-pointer' />}
					placeholder='Enter your account password'
					{...register('password', { required: 'Password is required' })}
				/>
				{errors.password && (
					<span className='text-red-600 text-xs'>
						{errors.password.message}
					</span>
				)}
				<Button size='lg' className='rounded-[10px] mt-4'>
					{isPending && <LoaderPinwheel className='animate-spin' />}
					{!isPending && 'Login'}
				</Button>
				<p className='text-slate-800/80 font-medium pt-3'>
					New here?{' '}
					<Link href='/register' className='font-bold hover:underline'>
						Create a new account →
					</Link>
				</p>
			</div>
		</form>
	)
}

export default LoginPage
