'use client'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEventHandler, useState } from 'react'
import { toast } from 'react-hot-toast'

const SearchPage = () => {
	const [value, setValue] = useState('')
	const router = useRouter()

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
			<div className='w-full min-h-full flex-auto flex justify-center'>
				<div className='max-w-[800px] w-full text-center flex flex-col gap-3 pt-20'>
					<div className='text-destructive/90 dark:text-slate-100/70 transition-colors'>
						<h1 className='text-[55px] font-bold leading-[45px]'>
							What are you looking for?
						</h1>
						<p className='text-[23px] font-medium leading-[40px] '>
							Why fit in, when you are born to stand out!
						</p>
					</div>
					<form
						className='gap-1 grid grid-cols-12 items-center max-w-[700px] m-auto w-full'
						onSubmit={handleSubmit}
					>
						<input
							placeholder='Search for tasks by their names, descriptions, categories...'
							className='border-0 border-b-2 border-b-destructive dark:border-b-stone-100/70 bg-transparent py-[9px] px-4 text-xl outline-none placeholder:text-destructive placeholder:text-lg dark:placeholder:text-slate-300/90 font-medium dark:placeholder:text-slate-800 w-full col-span-10 transition-colors'
							value={value}
							onChange={e => setValue(e.target.value)}
						/>
						<Button
							variant='destructive'
							size='add'
							className='col-span-2 rounded-[15px] flex items-center justify-center gap-1 font-medium tracking-wider dark:bg-cyan-900/70 dark:hover:bg-cyan-800/70'
							type='submit'
						>
							Seacrh
							<Search className='w-5 h-5' />
						</Button>
					</form>
					<div className='mt-auto flex items-end justify-center'>
						<Image
							src='/search-image.svg'
							width={800}
							height={400}
							alt='search-img'
							className='bg-cover object-bottom object-cover'
						/>
					</div>
				</div>
			</div>
		</>
	)
}

export default SearchPage
