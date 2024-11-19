'use client'

import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import React, { useState } from 'react'

interface AccordionProps {
	title: string
	children: React.ReactNode
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<div className='bg-orange-200/80 dark:bg-slate-600/80 shadow-md rounded-lg mb-4'>
			<div
				onClick={() => setIsOpen(!isOpen)}
				className='cursor-pointer p-2 md:p-4 flex justify-between items-center'
			>
				<h3 className='text-lg font-semibold'>{title}</h3>
				<span>{isOpen ? <ArrowBigUp /> : <ArrowBigDown />}</span>
			</div>
			<div
				className={`overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
				<div className='p-2 md:p-4'>{children}</div>
			</div>
		</div>
	)
}

interface InsightsAccordionProps {
	dailyPerformance: Record<string, number>
	monthlyPerformance: Record<string, number>
}

export const InsightsAccordion: React.FC<InsightsAccordionProps> = ({
	dailyPerformance = {},
	monthlyPerformance = {},
}) => {
	return (
		<div className='grid md:grid-cols-2 items-start w-full gap-1'>
			<Accordion title='Daily Insights'>
				{Object.keys(dailyPerformance).length > 0 ? (
					<ul>
						{Object.entries(dailyPerformance).map(([day, count]) => (
							<li key={day} className='mb-2 font-semibold'>
								{day}: {count} tasks
							</li>
						))}
					</ul>
				) : (
					<p>No daily data available.</p>
				)}
			</Accordion>
			<Accordion title='Monthly Insights'>
				{Object.keys(monthlyPerformance).length > 0 ? (
					<ul>
						{Object.entries(monthlyPerformance).map(([month, count]) => (
							<li key={month} className='mb-2 font-semibold'>
								{month}: {count} tasks
							</li>
						))}
					</ul>
				) : (
					<p>No monthly data available.</p>
				)}
			</Accordion>
		</div>
	)
}
