'use client'
import { ChangeTaskModal } from '@/components/modals/ChangeTaskModal'
import { CreateTaskModal } from '@/components/modals/CreateTaskModal'
import { ViewTaskModal } from '@/components/modals/ViewTaskModal'
import { Button } from '@/components/ui/button'
import { useChangeTaskModal, useViewTaskModal } from '@/hooks'
import { useCreateTaskModal } from '@/hooks/useCreateTaskModal'
import { Search } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FormEventHandler, useState } from 'react'

const SearchPage = () => {
	const { closeModal, isOpen, openModal } = useCreateTaskModal()
	const { closeModal: closeTaskModal, isOpen: isOpenTaskModal } =
		useViewTaskModal()
	const { closeModal: closeUpdModal, isOpen: isUpdOpen } = useChangeTaskModal()
	const [value, setValue] = useState('')
	const router = useRouter()

	const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
		const sanitizedValue = value.replace(/[^a-zA-Z0-9\s]/g, '').trim()
		if (sanitizedValue) {
			router.push(`/search/${sanitizedValue}`) // Redirect with sanitized value
		}
	}

	return (
		<>
			<div className='w-full min-h-full flex-auto flex justify-center'>
				<div className='max-w-[750px] w-full text-center flex flex-col gap-3 pt-20'>
					<h1 className='text-[50px] font-bold'>What are you looking for?</h1>
					<form
						className='gap-1 grid grid-cols-12 items-center w-full'
						onSubmit={handleSubmit}
					>
						<input
							placeholder='Search for tasks by their names, descriptions, categories...'
							className='border-0 border-b-2 bg-transparent py-[9px] px-4 text-xl outline-none placeholder:text-orange-600 font-medium dark:placeholder:text-slate-800 w-full col-span-11'
							value={value}
							onChange={e => setValue(e.target.value)}
						/>
						<Button
							variant='add'
							size='add'
							className='w-15 h-15 rounded-[10px]'
							type='submit'
						>
							<Search />
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
			<CreateTaskModal isOpen={isOpen} onClose={closeModal} />
			<ChangeTaskModal isOpen={isUpdOpen} onClose={closeUpdModal} />
			<ViewTaskModal isOpen={isOpenTaskModal} onClose={closeTaskModal} />
		</>
	)
}

export default SearchPage
