'use client'

import { HomePageSkeleton } from '@/components/skeletons'
import { useWidth } from '@/hooks'
import { useGetStatistic } from '@/hooks/useStatistic'
import cn from 'classnames'
import { CategoriesBreakdown } from './_components/CategoriesBreakdown'
import { InsightsAccordion } from './_components/InsightsAccordion'
import { OverallSummary } from './_components/OverallSummary'
import { PerformanceCharts } from './_components/PerformanceCharts'

const HomePage = () => {
	const { data, isLoading, error } = useGetStatistic()
	const width = useWidth()
	const isMobile = width < 795

	if (isLoading) return <HomePageSkeleton />
	if (error) return <div>Error loading statistics!</div>

	if (!data) return <p>No data</p>

	/**
	 * admin features
	 */

	return (
		<div
			className={cn('py-3 flex flex-col gap-3', {
				'pb-24 sm:pb-20': isMobile,
				'pb-20': width < 945,
			})}
		>
			<h1 className='text-[28px] md:text-[38px] font-bold tracking-wide'>
				Overall Summary:
			</h1>
			<OverallSummary data={data} />
			<PerformanceCharts
				dailyPerformance={data.dailyPerformance}
				monthlyPerformance={data.monthlyPerformance}
			/>
			<CategoriesBreakdown categories={data.categories} />
			<InsightsAccordion
				dailyPerformance={data.dailyPerformance}
				monthlyPerformance={data.monthlyPerformance}
			/>
		</div>
	)
}

export default HomePage
