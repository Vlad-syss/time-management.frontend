'use client'
import cn from 'classnames'
import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import style from './style.module.scss'

export const Footer = () => {
	return (
		<div
			className={
				'fixed bottom-0 w-full py-3 pt-2 px-4 z-50 text-white md:py-4 md:pt-5'
			}
		>
			<div className='flex flex-col gap-2 items-end mx-auto max-w-[1400px]'>
				<div className='flex gap-3 md:gap-6 items-center'>
					<Link
						target='_blank'
						href='https://github.com/vlad-syss'
						className='drop-shadow-xl flex items-center justify-center rounded-full p-2 transition-colors bg-slate-900/90 hover:bg-slate-900/100'
					>
						<Github size={22} />
					</Link>
					<Link
						href='https://linkedin.com/in/vlad-bashak-077155289'
						target='_blank'
						className='drop-shadow-xl flex items-center justify-center rounded-full p-2 transition-colors bg-blue-600/90 hover:bg-blue-600/100'
					>
						<Linkedin size={22} />
					</Link>
					<Link
						target='_blank'
						href='mailto:vladbashak80@gmail.com'
						className='drop-shadow-xl flex items-center justify-center rounded-full p-2 transition-colors bg-red-500/90 hover:bg-red-500/100'
					>
						<Mail size={22} />
					</Link>
				</div>
				<p
					className={cn(
						'font-bold tracking-[1px] text-[14px] md:text-[16px] text-black underline-offset-4 underline',
						style.copyright
					)}
				>
					&copy;Copyright, made by Vladislav Bashak
				</p>
			</div>
		</div>
	)
}
