import { User } from '@/types'

export const ViewProfile = (data: User) => {
	return (
		<div className='w-full bg-orange-100 dark:bg-gray-800 shadow-lg rounded-lg p-3 sm:p-6'>
			<h4 className='text-lg sm:text-xl font-bold'>Profile Information</h4>
			<ul className='mt-4 space-y-3'>
				<li className='flex flex-col sm:flex-row justify-between'>
					<span className='font-semibold'>Email:</span>
					<span>{data.email}</span>
				</li>
				<li className='flex flex-col sm:flex-row justify-between'>
					<span className='font-semibold'>Joined:</span>
					<span>{new Date(data.createdAt).toLocaleDateString()}</span>
				</li>
				<li className='flex flex-col sm:flex-row justify-between'>
					<span className='font-semibold'>Last Updated:</span>
					<span>{new Date(data.updatedAt).toLocaleDateString()}</span>
				</li>
				<li className='flex flex-col sm:flex-row justify-between'>
					<span className='font-semibold'>Description:</span>
					<span>{data.description || 'No description available.'}</span>
				</li>
			</ul>
		</div>
	)
}
