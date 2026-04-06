import { Footer } from './_components/Footer'
import { Navbar } from './_components/Navbar'

const StartLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-auto h-full flex-col overflow-hidden overflow-y-auto relative bg-[#FAFBFC] dark:bg-[#0F0F14] transition-colors'>
			<div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-indigo-500/10 dark:to-purple-500/10 pointer-events-none' />
			<div className='absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none' />
			<div className='absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-[100px] pointer-events-none' />
			<Navbar />
			<main className='h-full px-4 flex flex-col w-full mx-auto max-w-[1200px] pt-[80px] relative md:pt-[140px] transition-colors z-10'>
				{children}
			</main>
			<Footer />
		</div>
	)
}

export default StartLayout
