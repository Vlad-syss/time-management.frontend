'use client'
import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
	return (
		<footer className='w-full py-6 px-4 mt-auto relative z-10'>
			<div className='flex flex-col md:flex-row gap-4 items-center justify-between mx-auto max-w-[1200px]'>
				<p className='text-sm text-gray-500 dark:text-gray-500'>
					&copy; {new Date().getFullYear()} TakeTime. Built by Vladislav Bashak
				</p>
				<div className='flex gap-2'>
					<Link
						target='_blank'
						href='https://github.com/vlad-syss'
						className='w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors'
					>
						<Github size={18} />
					</Link>
					<Link
						href='https://linkedin.com/in/vlad-bashak-077155289'
						target='_blank'
						className='w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors'
					>
						<Linkedin size={18} />
					</Link>
					<Link
						target='_blank'
						href='mailto:vladbashak80@gmail.com'
						className='w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors'
					>
						<Mail size={18} />
					</Link>
				</div>
			</div>
		</footer>
	)
}
