'use client'
import { Button } from '@/components/ui/button'
import { useWidth } from '@/hooks'
import cn from 'classnames'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEventHandler, useState } from 'react'
import { toast } from 'react-hot-toast'

const SearchPage = () => {
	const [value, setValue] = useState('')
	const router = useRouter()
	const width = useWidth()
	const isMobile = width < 945

	const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		const sanitizedValue = value
			.replace(/[^a-zA-Z0-9\s]/g, '')
			.trim()
			.replace(/\s+/g, '-')
		if (sanitizedValue) {
			router.push(`/search/${sanitizedValue}`)
		} else {
			toast.error('Search value is empty!')
		}
	}

	return (
		<>
			<div
				className={cn('w-full min-h-full flex-auto flex justify-center', {
					'pb-0': isMobile,
				})}
			>
				<div className='max-w-[800px] w-full text-center flex flex-col gap-3 pt-5 md:pt-20'>
					<div className='text-destructive/90 dark:text-slate-100/70 transition-colors'>
						<h1 className='text-[35px] md:text-[55px] font-bold leading-[35px] md:leading-[45px]'>
							What are you looking for?
						</h1>
						<p className='text-[16px] md:text-[23px] font-medium leading-[25px] md:leading-[40px] '>
							Why fit in, when you are born to stand out!
						</p>
					</div>
					<form
						className='gap-3 md:gap-1 grid grid-cols-12 items-center max-w-[700px] md:m-auto w-full'
						onSubmit={handleSubmit}
					>
						<input
							placeholder='Search for tasks by their names, descriptions, categories...'
							className='border-0 border-b-2 border-b-destructive dark:border-b-stone-100/70 bg-transparent py-1 md:py-[9px] px-4 text-lg md:text-xl text-center md:text-left outline-none placeholder:text-destructive   placeholder:text-base md:placeholder:text-lg dark:placeholder:text-slate-300/90 font-medium dark:placeholder:text-slate-800 w-full col-span-12 md:col-span-10 transition-colors'
							value={value}
							onChange={e => setValue(e.target.value)}
						/>
						<Button
							variant='destructive'
							size='add'
							className='col-span-12 md:col-span-2 rounded-[15px] flex items-center justify-center gap-1 font-medium tracking-wider dark:bg-cyan-900/70 dark:hover:bg-cyan-800/70'
							type='submit'
						>
							Seacrh
							<Search className='w-5 h-5' />
						</Button>
					</form>
					<div className='md:w-auto md:h-auto mt-auto flex items-end justify-center overflow-hidden'>
						<Image
							src='/search-image.svg'
							width={800}
							height={400}
							alt='search-img'
							className='min-w-[600px] max-w-none md:max-w-full object-cover object-center'
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default SearchPage
