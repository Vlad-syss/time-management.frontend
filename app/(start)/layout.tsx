import cn from 'classnames'
import Image from 'next/image'
import { Footer } from './_components/Footer'
import { Navbar } from './_components/Navbar'
import style from './_components/style.module.scss'

const StartLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className={cn(
				'flex flex-auto h-full flex-col overflow-hidden overflow-y-auto relative z-[1]',
				style.block
			)}
		>
			<Navbar />
			<main className='h-full px-4 flex flex-col w-full mx-auto max-w-[1400px] pt-[80px] relative md:pt-[150px]'>
				{children}
			</main>
			<Footer />
			<Image
				src='/start1.png'
				alt='image'
				className='absolute bottom-0 object-cover opacity-80 left-[1%] select-none lg:block hidden drop-shadow-2xl'
				width={360}
				height={500}
			/>
		</div>
	)
}

export default StartLayout
