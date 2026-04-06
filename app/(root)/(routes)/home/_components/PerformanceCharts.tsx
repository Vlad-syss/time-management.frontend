'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks'
import React, { useState } from 'react'
import {
	Bar,
	BarChart,
	Cell,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

const CHART_COLORS = ['#6366F1', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4']

interface PerformanceChartsProps {
	dailyPerformance: Record<string, number>
	monthlyPerformance: Record<string, number>
}

export const PerformanceCharts: React.FC<PerformanceChartsProps> = ({
	dailyPerformance,
	monthlyPerformance,
}) => {
	const [viewMode, setViewMode] = useState<'pie' | 'bar'>('bar')
	const { theme } = useTheme()

	const dailyData =
		Object.keys(dailyPerformance).length > 0
			? Object.entries(dailyPerformance).map(([day, count]) => ({
					name: day.slice(0, 3),
					value: count,
			  }))
			: [{ name: 'Mon', value: 0 }, { name: 'Tue', value: 0 }]

	const monthlyData =
		Object.keys(monthlyPerformance).length > 0
			? Object.entries(monthlyPerformance).map(([month, count]) => ({
					name: month.split(' ')[0].slice(0, 3),
					value: count,
			  }))
			: [{ name: 'Jan', value: 0 }, { name: 'Feb', value: 0 }]

	const textColor = theme === 'light' ? '#6B7280' : '#9CA3AF'
	const gridColor = theme === 'light' ? '#F3F4F6' : 'rgba(255,255,255,0.05)'

	const renderPieChart = (data: any[]) => (
		<ResponsiveContainer width='100%' height={250}>
			<PieChart>
				<Pie
					data={data}
					cx='50%'
					cy='50%'
					outerRadius={80}
					innerRadius={40}
					fill='#6366F1'
					dataKey='value'
					label={({ name, value }) => `${name}: ${value}`}
					labelLine={false}
				>
					{data.map((_, index) => (
						<Cell
							key={`cell-${index}`}
							fill={CHART_COLORS[index % CHART_COLORS.length]}
						/>
					))}
				</Pie>
				<Tooltip
					contentStyle={{
						backgroundColor: theme === 'light' ? '#fff' : '#1A1A24',
						border: theme === 'light' ? '1px solid #E5E7EB' : '1px solid rgba(255,255,255,0.1)',
						borderRadius: '8px',
						fontSize: '13px',
					}}
				/>
			</PieChart>
		</ResponsiveContainer>
	)

	const renderBarChart = (data: any[]) => (
		<ResponsiveContainer width='100%' height={250}>
			<BarChart data={data} barCategoryGap='20%'>
				<XAxis
					dataKey='name'
					tick={{ fill: textColor, fontSize: 12 }}
					axisLine={{ stroke: gridColor }}
					tickLine={false}
				/>
				<YAxis
					tick={{ fill: textColor, fontSize: 12 }}
					axisLine={false}
					tickLine={false}
				/>
				<Tooltip
					contentStyle={{
						backgroundColor: theme === 'light' ? '#fff' : '#1A1A24',
						border: theme === 'light' ? '1px solid #E5E7EB' : '1px solid rgba(255,255,255,0.1)',
						borderRadius: '8px',
						fontSize: '13px',
					}}
				/>
				<Bar dataKey='value' radius={[6, 6, 0, 0]}>
					{data.map((_, index) => (
						<Cell
							key={`cell-${index}`}
							fill={CHART_COLORS[index % CHART_COLORS.length]}
						/>
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	)

	return (
		<div className='glass-surface p-4 md:p-6'>
			<div className='flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2'>
				<h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
					Performance
				</h2>
				<div className='flex gap-1 bg-gray-100 dark:bg-white/5 rounded-lg p-1'>
					<button
						className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
							viewMode === 'bar'
								? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm'
								: 'text-gray-500 dark:text-gray-400'
						}`}
						onClick={() => setViewMode('bar')}
					>
						Bar
					</button>
					<button
						className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
							viewMode === 'pie'
								? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white shadow-sm'
								: 'text-gray-500 dark:text-gray-400'
						}`}
						onClick={() => setViewMode('pie')}
					>
						Pie
					</button>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
				<div>
					<h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 text-center'>
						Daily
					</h3>
					{viewMode === 'pie'
						? renderPieChart(dailyData)
						: renderBarChart(dailyData)}
				</div>
				<div>
					<h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 text-center'>
						Monthly
					</h3>
					{viewMode === 'pie'
						? renderPieChart(monthlyData)
						: renderBarChart(monthlyData)}
				</div>
			</div>
		</div>
	)
}
