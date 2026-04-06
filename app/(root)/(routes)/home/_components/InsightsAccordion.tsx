'use client'

import { Statistic } from '@/types'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
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

	if (bestDay) {
		insights.push(`You are most productive on ${bestDay}s.`)
	}
	if (currentStreak > 0) {
		insights.push(
			`You're on a ${currentStreak}-day streak${
				currentStreak === longestStreak && currentStreak > 1
					? ' — your best ever!'
					: '!'
			}`
		)
	}
	if (longestStreak > currentStreak) {
		insights.push(
			`Your longest streak was ${longestStreak} days. Keep going!`
		)
	}
	if (weeklyCompleted > 0) {
		insights.push(`You completed ${weeklyCompleted} tasks this week.`)
	}
	if (completionRate > 0) {
		insights.push(`${completionRate}% of your active tasks are completed.`)
	}
	if (allCompleted > 0 && completedOnTime > 0) {
		const onTimeRate = Math.round((completedOnTime / allCompleted) * 100)
		insights.push(`${onTimeRate}% of completed tasks were finished on time.`)
	}
	if (allArchived > 0) {
		insights.push(
			`${allArchived} task${allArchived !== 1 ? 's have' : ' has'} expired and been archived.`
		)
	}

	return (
		<div className='grid md:grid-cols-2 items-start w-full gap-1'>
			<Accordion title='Key Insights' defaultOpen={true}>
				{insights.length > 0 ? (
					<ul className='space-y-2'>
						{insights.map((insight, i) => (
							<li
								key={i}
								className='font-medium text-sm md:text-base flex items-start gap-2'
							>
								<span className='text-orange-500 dark:text-emerald-400 mt-0.5'>
									{'\u2022'}
								</span>
								{insight}
							</li>
						))}
					</ul>
				) : (
					<p className='text-slate-500'>
						Complete some tasks to see insights!
					</p>
				)}
			</Accordion>
			<div>
				<Accordion title='Daily Breakdown'>
					{Object.keys(dailyPerformance).length > 0 ? (
						<ul className='space-y-1'>
							{Object.entries(dailyPerformance).map(([day, count]) => (
								<li
									key={day}
									className='flex justify-between font-medium text-sm md:text-base'
								>
									<span>{day}</span>
									<span className='font-bold'>
										{count} task{count !== 1 ? 's' : ''}
									</span>
								</li>
							))}
						</ul>
					) : (
						<p className='text-slate-500'>No daily data available.</p>
					)}
				</Accordion>
				<Accordion title='Monthly Breakdown'>
					{Object.keys(monthlyPerformance).length > 0 ? (
						<ul className='space-y-1'>
							{Object.entries(monthlyPerformance).map(([month, count]) => (
								<li
									key={month}
									className='flex justify-between font-medium text-sm md:text-base'
								>
									<span>{month}</span>
									<span className='font-bold'>
										{count} task{count !== 1 ? 's' : ''}
									</span>
								</li>
							))}
						</ul>
					) : (
						<p className='text-slate-500'>No monthly data available.</p>
					)}
				</Accordion>
			</div>
		</div>
	)
}
