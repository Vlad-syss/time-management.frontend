export const Loader = () => {
	return (
		<div className='fixed inset-0 z-50 opacity-100 lg:opacity-0 flex items-center justify-center bg-blue-950 dark:bg-gray-900/90'>
			<div className='flex flex-col items-center'>
				<div className='w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4'></div>
			</div>
		</div>
	)
}
