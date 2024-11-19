import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

export const SearchInput: React.FC<{
	searchQuery: string
	setSearchQuery: Dispatch<SetStateAction<string>>
	handleSend: () => any
}> = ({ searchQuery, setSearchQuery, handleSend }) => {
	return (
		<div className='flex items-end'>
			<Button
				variant='add'
				size='icon'
				className='bg-transparent border-b-2 border-b-destructive dark:border-b-stone-100/70 border-l-0 border-r-0 border-t-0 rounded-none hover:bg-destructive/20 text-destructive dark:text-slate-200 dark:hover:bg-slate-200/20'
				onClick={handleSend}
			>
				<Search className='w-5 h-5' />
			</Button>
			<input
				value={searchQuery}
				onChange={e => setSearchQuery(e.target.value)}
				onKeyDown={e => {
					if (e.key === 'Enter') {
						handleSend()
					}
				}}
				placeholder='Search for reminder by name...'
				className='border-0 border-b-2 border-b-destructive dark:border-b-stone-100/70 bg-transparent py-1 px-4 pl-1 text-lg md:text-left outline-none placeholder:text-destructive placeholder:text-base dark:placeholder:text-slate-300/90 font-medium dark:placeholder:text-slate-800 w-full col-span-12 md:col-span-10 transition-colors'
			/>
		</div>
	)
}
