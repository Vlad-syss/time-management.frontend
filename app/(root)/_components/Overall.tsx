'use client'

export const Overall = () => {
	return (
		<div className='w-full flex flex-col gap-3'>
			<h2 className='text-[30px] font-bold tracking-wide'>Overall:</h2>
			<div className='grid grid-cols-4 w-full border-[4px] rounded-lg border-yellow-200'>
				<article className='px-10 py-5 text-center flex flex-col gap-2 border-r-[4px] border-yellow-200 bg-yellow-200/60'>
					<h4 className='text-[23px] font-extrabold uppercase tracking-wider text-gray-800 drop-shadow-sm'>
						All time:
					</h4>
					<span className='text-white text-[35px] font-bold tracking-[2px] drop-shadow-lg'>
						1000
					</span>
				</article>
				<article className='px-10 py-5 text-center flex flex-col gap-2 border-r-[4px] border-yellow-200 bg-yellow-200/60'>
					<h4 className='text-[23px] font-extrabold uppercase tracking-wider text-gray-800 drop-shadow-sm'>
						Completed:
					</h4>
					<span className='text-white text-[35px] font-bold tracking-[2px] drop-shadow-lg'>
						891
					</span>
				</article>
				<article className='px-10 py-5 text-center flex flex-col gap-2 border-r-[4px] border-yellow-200 bg-yellow-200/60'>
					<h4 className='text-[23px] font-extrabold uppercase tracking-wider text-gray-800 drop-shadow-sm'>
						In progress:
					</h4>
					<span className='text-white text-[35px] font-bold tracking-[2px] drop-shadow-lg'>
						12
					</span>
				</article>
				<article className='px-10 py-5 text-center flex flex-col gap-2 border-r-[4px] border-yellow-200 bg-yellow-200/60 last:border-r-0'>
					<h4 className='text-[23px] font-extrabold uppercase tracking-wider text-gray-800 drop-shadow-sm'>
						Rescheduled:
					</h4>
					<span className='text-white text-[35px] font-bold tracking-[2px] drop-shadow-lg'>
						8
					</span>
				</article>
			</div>
		</div>
	)
}
