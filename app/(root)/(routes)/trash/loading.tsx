import { Loader } from 'lucide-react'

export default function Loading() {
	return (
		<div className='flex items-center justify-center absolute z-[100] dark:text-white text-gray-400 p-2 dark:bg-[#1A1A24] bg-indigo-500 left-1 top-1'>
			<Loader className='w-7 h-7 animate-spin' />
		</div>
	)
}
