'use client'

import { Statistic } from '@/types'
import { ChevronDown } from 'lucide-react'
import React, { useState } from 'react'

interface AccordionProps {
	title: string
	children: React.ReactNode
	defaultOpen?: boolean
}

const Accordion: React.FC<AccordionProps> = ({
	title,
	children,
	defaultOpen = false,
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen)

	return (
		<div className='glass-surface overflow-hidden'>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className='w-full p-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors'
			>
				<h3 className='text-sm font-semibold text-gray-900 dark:text-white'>
					{title}
				</h3>
				<ChevronDown
					className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>
			<div
				className={`overflow-hidden transition-all duration-300 ease-in-out ${
					isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
				<div className='px-4 pb-4'>{children}</div>
			</div>
		</div>
	)
}

interface InsightsAccordionProps {
	data: Statistic
}

export const InsightsAccordion: React.FC<InsightsAccordionProps> = ({
	data,
}) => {
	const {
		dailyPerformance = {},
		monthlyPerformance = {},
		bestDay,
		currentStreak,
		longestStreak,
		weeklyCompleted,
		completionRate,
		completedOnTime,
		allCompleted,
		allArchived,
	} = data

	const insights: string[] = []

	if (bestDay) insights.push(`Most productive on ${bestDay}s`)
	if (currentStreak > 0) {
		insights.push(
			`${currentStreak}-day streak${
				currentStreak === longestStreak && currentStreak > 1
					? ' — your best!'
					: ''
			}`
		)
	}
	if (longestStreak > currentStreak)
		insights.push(`Record streak: ${longestStreak} days`)
	if (weeklyCompleted > 0)
		insights.push(`${weeklyCompleted} tasks this week`)
	if (completionRate > 0) insights.push(`${completionRate}% completion rate`)
	if (allCompleted > 0 && completedOnTime > 0) {
		const onTimeRate = Math.round((completedOnTime / allCompleted) * 100)
		insights.push(`${onTimeRate}% finished on time`)
	}
	if (allArchived > 0) insights.push(`${allArchived} tasks archived`)

	return (
		<div className='grid md:grid-cols-2 items-start gap-3'>
			<Accordion title='Insights' defaultOpen={true}>
				{insights.length > 0 ? (
					<ul className='space-y-2'>
						{insights.map((insight, i) => (
							<li
								key={i}
								className='text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2'
							>
								<span className='w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0' />
								{insight}
							</li>
						))}
					</ul>
				) : (
					<p className='text-sm text-gray-400'>
						Complete tasks to see insights
					</p>
				)}
			</Accordion>
			<div className='flex flex-col gap-3'>
				<Accordion title='Daily Breakdown'>
					{Object.keys(dailyPerformance).length > 0 ? (
						<ul className='space-y-1.5'>
							{Object.entries(dailyPerformance).map(([day, count]) => (
								<li
									key={day}
									className='flex justify-between text-sm'
								>
									<span className='text-gray-600 dark:text-gray-400'>
										{day}
									</span>
									<span className='font-medium text-gray-900 dark:text-white'>
										{count}
									</span>
								</li>
							))}
						</ul>
					) : (
						<p className='text-sm text-gray-400'>No data yet</p>
					)}
				</Accordion>
				<Accordion title='Monthly Breakdown'>
					{Object.keys(monthlyPerformance).length > 0 ? (
						<ul className='space-y-1.5'>
							{Object.entries(monthlyPerformance).map(([month, count]) => (
								<li
									key={month}
									className='flex justify-between text-sm'
								>
									<span className='text-gray-600 dark:text-gray-400'>
										{month}
									</span>
									<span className='font-medium text-gray-900 dark:text-white'>
										{count}
									</span>
								</li>
							))}
						</ul>
					) : (
						<p className='text-sm text-gray-400'>No data yet</p>
					)}
				</Accordion>
			</div>
		</div>
	)
}
