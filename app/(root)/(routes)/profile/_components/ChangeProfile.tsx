import { BASE_URL } from '@/components/consts'
import { useUserContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import { User } from '@/types'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'

interface ProfileFormValues {
	name: string
	email: string
	description: string
	country: string
	avatarUrl: File | null
}

export const ChangeProfile = (userData: User) => {
	const { handleUpdate, handleUpload } = useUserContext()

	const { control, handleSubmit, register, setValue } =
		useForm<ProfileFormValues>({
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

	const { getRootProps, getInputProps } = useDropzone({
		onDrop: acceptedFiles => {
			const file = acceptedFiles[0]

			if (file) {
				setValue('avatarUrl', file)
				setPreview(URL.createObjectURL(file))
			}
		},
	})

	const onSubmit = async (data: ProfileFormValues) => {
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
		} catch (error) {
			console.error('Error updating profile:', error)
		}
	}

	return (
		<div className='w-full bg-orange-100 dark:bg-gray-800 shadow rounded-md p-3 sm:p-6  mx-auto'>
			<h4 className='text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4'>
				Edit Profile
			</h4>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
						className='mt-1 p-4 border-2 border-dashed rounded-md cursor-pointer text-center dark:bg-gray-700 dark:text-white'
					>
						<input {...getInputProps()} />
						<p className=' font-semibold'>
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

				<Button type='submit' size='lg' className='w-full mt-4'>
					Save Changes
				</Button>
			</form>
		</div>
	)
}
