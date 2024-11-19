'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks'
import React, { useState } from 'react'
import {
	Bar,
	BarChart,
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const LIGHT_MODE_COLORS = ['#5e4b8d', '#63956b', '#bf8f00', '#bf5d2d']
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042']

const EXAMPLE_DAILY_DATA = [
	{ name: 'Monday', value: 100 },
	{ name: 'Tuesday', value: 1 },
]

const EXAMPLE_MONTHLY_DATA = [
	{ name: 'January', value: 20 },
	{ name: 'February', value: 5 },
]

interface PerformanceChartsProps {
	dailyPerformance: Record<string, number>
	monthlyPerformance: Record<string, number>
}

export const PerformanceCharts: React.FC<PerformanceChartsProps> = ({
	dailyPerformance,
	monthlyPerformance,
}) => {
	const [viewMode, setViewMode] = useState<'pie' | 'bar'>('pie')
	const { theme } = useTheme()

	const dailyData =
		Object.keys(dailyPerformance).length > 0
			? Object.entries(dailyPerformance).map(([day, count]) => ({
					name: day,
					value: count,
			  }))
			: EXAMPLE_DAILY_DATA

	const monthlyData =
		Object.keys(monthlyPerformance).length > 0
			? Object.entries(monthlyPerformance).map(([month, count]) => ({
					name: month,
					value: count,
			  }))
			: EXAMPLE_MONTHLY_DATA

	const renderPieChart = (data: any[]) => (
		<ResponsiveContainer width='100%' height={300}>
			<PieChart>
				<Pie
					data={data}
					cx='50%'
					cy='50%'
					outerRadius={100}
					fill='#8884d8'
					dataKey='value'
					label
				>
					{data.map((entry, index) => (
						<Cell
							key={`cell-${index}`}
							fill={
								theme === 'light'
									? LIGHT_MODE_COLORS[index % LIGHT_MODE_COLORS.length]
									: COLORS[index % COLORS.length]
							}
						/>
					))}
				</Pie>
			</PieChart>
		</ResponsiveContainer>
	)

	const renderBarChart = (data: any[]) => (
		<ResponsiveContainer width='100%' height={400}>
			<BarChart data={data}>
				<XAxis dataKey='name' />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey='value' fill={theme === 'light' ? '#5e4b8d' : '#a7ffe0'} />
			</BarChart>
		</ResponsiveContainer>
	)

	return (
		<div className='bg-amber-300 dark:bg-slate-700/80 shadow-md rounded-lg p-3 md:p-6'>
			<div className='flex flex-col md:flex-row justify-between md:items-center mb-2 md:mb-4 gap-y-2'>
				<h2 className='text-xl font-bold'>Performance Charts</h2>
				<div className='space-x-2 flex w-full md:w-auto'>
					<Button
						variant='add'
						className={`px-4 py-2 rounded border-none font-semibold w-full md:w-auto ${
							viewMode === 'pie'
								? 'bg-orange-400 hover:bg-orange-400 dark:bg-slate-800 text-white'
								: 'bg-slate-200 hover:bg-slate-300 dark:bg-gray-400 dark:hover:bg-gray-500'
						}`}
						onClick={() => setViewMode('pie')}
					>
						Pie Chart
					</Button>
					<Button
						variant='add'
						className={`px-4 py-2 rounded border-none w-full md:w-auto font-semibold ${
							viewMode === 'bar'
								? 'bg-orange-400 hover:bg-orange-400 dark:bg-slate-800 text-white'
								: 'bg-slate-200 hover:bg-slate-300 dark:bg-gray-400 dark:hover:bg-gray-500'
						}`}
						onClick={() => setViewMode('bar')}
					>
						Bar Chart
					</Button>
				</div>
			</div>
			<div className='flex flex-col md:flex-row'>
				<div className='flex flex-col md:w-1/2'>
					<h3 className='text-base text-center font-semibold mt-2 md:mt-6'>
						Daily Performance
					</h3>

					{viewMode === 'pie'
						? renderPieChart(dailyData)
						: renderBarChart(dailyData)}
				</div>
				<div className='flex flex-col md:w-1/2'>
					<h3 className='text-base text-center font-semibold mt-2 md:mt-6'>
						Monthly Performance
					</h3>
					{viewMode === 'pie'
						? renderPieChart(monthlyData)
						: renderBarChart(monthlyData)}
				</div>
			</div>
		</div>
	)
}
