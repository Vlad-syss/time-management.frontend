'use client'

import { BASE_URL } from '@/components/consts'
import { useUserContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { useAxios } from '@/hooks'
import { User } from '@/types'
import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface ProfileFormValues {
	name: string
	email: string
	description: string
	country: string
	avatarUrl: File | null
}

interface SettingsValues {
	theme: 'light' | 'dark'
	notifications: boolean
	language: 'en' | 'uk'
	defaultView: 'kanban' | 'wrap'
	weekStartsOn: 'monday' | 'sunday'
}

export const ChangeProfile = (userData: User) => {
	const { handleUpdate, handleUpload } = useUserContext()
	const axios = useAxios()

	const { handleSubmit, register, setValue } = useForm<ProfileFormValues>({
		defaultValues: {
			name: userData?.name || '',
			email: userData?.email || '',
			description: userData?.description || '',
			country: userData?.country || '',
			avatarUrl: null,
		},
	})

	const [preview, setPreview] = useState<string | null>(
		userData?.avatarUrl ? `${BASE_URL}${userData.avatarUrl}` : null
	)

	const [settings, setSettings] = useState<SettingsValues>({
		theme: 'light',
		notifications: true,
		language: 'en',
		defaultView: 'kanban',
		weekStartsOn: 'monday',
	})

	useEffect(() => {
		const fetchSettings = async () => {
			try {
				const data = await axios.get('/settings')
				if (data) {
					setSettings({
						theme: data.theme || 'light',
						notifications: data.notifications ?? true,
						language: data.language || 'en',
						defaultView: data.defaultView || 'kanban',
						weekStartsOn: data.weekStartsOn || 'monday',
					})
				}
			} catch (err) {
				console.error('Failed to fetch settings')
			}
		}
		fetchSettings()
	}, [])

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: acceptedFiles => {
			const file = acceptedFiles[0]
			if (file) {
				setValue('avatarUrl', file)
				setPreview(URL.createObjectURL(file))
			}
		},
	})

	const onSubmitProfile = async (data: ProfileFormValues) => {
		try {
			await handleUpdate({
				name: data.name,
				email: data.email,
				description: data.description,
				country: data.country,
			})
			if (data.avatarUrl) {
				await handleUpload(data.avatarUrl)
			}
			toast.success('Profile updated!')
		} catch (error) {
			toast.error('Failed to update profile')
		}
	}

	const saveSettings = async () => {
		try {
			await axios.put('/settings', settings)
			toast.success('Settings saved!')
		} catch (error) {
			toast.error('Failed to save settings')
		}
	}

	return (
		<div className='w-full flex flex-col gap-4'>
			{/* Profile Section */}
			<div className='w-full bg-orange-100 dark:bg-gray-800 shadow rounded-md p-3 sm:p-6'>
				<h4 className='text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4'>
					Personal Information
				</h4>
				<form
					onSubmit={handleSubmit(onSubmitProfile)}
					className='space-y-4'
				>
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='md:w-1/2'>
							<label className='block text-sm text-gray-700 dark:text-gray-300 font-semibold'>
								Name
							</label>
							<input
								type='text'
								{...register('name', { required: 'Name is required' })}
								className='w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white'
							/>
						</div>
						<div className='md:w-1/2'>
							<label className='block text-sm text-gray-700 dark:text-gray-300 font-semibold'>
								Email
							</label>
							<input
								type='email'
								{...register('email', { required: 'Email is required' })}
								className='w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white'
							/>
						</div>
					</div>
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='md:w-1/2'>
							<label className='block text-sm text-gray-700 dark:text-gray-300 font-semibold'>
								Country
							</label>
							<input
								type='text'
								{...register('country')}
								className='w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white'
							/>
						</div>
						<div className='md:w-1/2'>
							<label className='block text-sm text-gray-700 dark:text-gray-300 font-semibold'>
								Description
							</label>
							<textarea
								{...register('description')}
								className='w-full mt-1 p-2 border rounded-md dark:bg-gray-700 dark:text-white resize-none h-24'
							/>
						</div>
					</div>
					<div>
						<label className='block text-sm text-gray-700 dark:text-gray-300 font-semibold'>
							Avatar
						</label>
						<div
							{...getRootProps()}
							className='mt-1 p-4 border-2 border-dashed rounded-md cursor-pointer text-center dark:bg-gray-700 dark:text-white hover:border-orange-400 transition-colors'
						>
							<input {...getInputProps()} />
							<p className='font-semibold'>
								Drag & drop an image, or click to select
							</p>
						</div>
						{preview && (
							<img
								src={preview}
								alt='Avatar Preview'
								className='mt-4 w-20 h-20 rounded-full object-cover mx-auto'
							/>
						)}
					</div>
					<Button type='submit' size='lg' className='w-full'>
						Save Profile
					</Button>
				</form>
			</div>

			{/* Preferences Section */}
			<div className='w-full bg-orange-100 dark:bg-gray-800 shadow rounded-md p-3 sm:p-6'>
				<h4 className='text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4'>
					Preferences
				</h4>
				<div className='space-y-4'>
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='md:w-1/2'>
							<label className='block text-sm text-gray-700 dark:text-gray-300 font-semibold mb-1'>
								Default Task View
							</label>
							<select
								value={settings.defaultView}
								onChange={e =>
									setSettings(s => ({
										...s,
										defaultView: e.target.value as 'kanban' | 'wrap',
									}))
								}
								className='w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white'
							>
								<option value='kanban'>Kanban Board</option>
								<option value='wrap'>List View</option>
							</select>
						</div>
						<div className='md:w-1/2'>
							<label className='block text-sm text-gray-700 dark:text-gray-300 font-semibold mb-1'>
								Language
							</label>
							<select
								value={settings.language}
								onChange={e =>
									setSettings(s => ({
										...s,
										language: e.target.value as 'en' | 'uk',
									}))
								}
								className='w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white'
							>
								<option value='en'>English</option>
								<option value='uk'>Ukrainian</option>
							</select>
						</div>
					</div>
					<div className='flex flex-col md:flex-row gap-4'>
						<div className='md:w-1/2'>
							<label className='block text-sm text-gray-700 dark:text-gray-300 font-semibold mb-1'>
								Week Starts On
							</label>
							<select
								value={settings.weekStartsOn}
								onChange={e =>
									setSettings(s => ({
										...s,
										weekStartsOn: e.target.value as 'monday' | 'sunday',
									}))
								}
								className='w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white'
							>
								<option value='monday'>Monday</option>
								<option value='sunday'>Sunday</option>
							</select>
						</div>
						<div className='md:w-1/2 flex items-center gap-3 mt-4 md:mt-0'>
							<label className='block text-sm text-gray-700 dark:text-gray-300 font-semibold'>
								Notifications
							</label>
							<button
								type='button'
								onClick={() =>
									setSettings(s => ({
										...s,
										notifications: !s.notifications,
									}))
								}
								className={`relative w-12 h-6 rounded-full transition-colors ${
									settings.notifications
										? 'bg-orange-500 dark:bg-emerald-500'
										: 'bg-gray-300 dark:bg-gray-600'
								}`}
							>
								<span
									className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
										settings.notifications ? 'translate-x-6' : ''
									}`}
								/>
							</button>
							<span className='text-sm text-gray-600 dark:text-gray-400'>
								{settings.notifications ? 'On' : 'Off'}
							</span>
						</div>
					</div>
					<Button
						type='button'
						size='lg'
						className='w-full'
						onClick={saveSettings}
					>
						Save Preferences
					</Button>
				</div>
			</div>
		</div>
	)
}
