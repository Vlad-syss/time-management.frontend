'use client'

import { BASE_URL } from '@/components/consts'
import { useAdminContext } from '@/components/providers'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { useState } from 'react'
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from 'recharts'
import { Pagination } from './_components/Pagination'
import { StatsSection } from './_components/StatsSection'
import { Table } from './_components/Table'

export default function AdminPanelPage() {
	const { tasks, users, isLoading, error, userStats } = useAdminContext()
	const [currentPage, setCurrentPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	const itemsPerPage = 8

	if (isLoading) return <div>Loading...</div>
	if (error) return <div>Error loading data: {error}</div>

	const taskStats = {
		totalTasks: tasks?.length || 0,
		completedTasks: tasks?.filter(task => task.status.completed).length || 0,
		pendingTasks:
			tasks?.filter(task => !task.status.completed && !task.status.archived)
				.length || 0,
		failedTasks:
			tasks?.filter(task => !task.status.completed && task.status.archived)
				.length || 0,
	}

	const totalPages = Math.ceil(tasks.length / itemsPerPage)
	const currentTasks = tasks
		?.filter(task =>
			task.title.toLowerCase().includes(searchQuery.toLowerCase())
		)
		.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

	const handleNextPage = () =>
		setCurrentPage(prev => Math.min(prev + 1, totalPages))
	const handlePreviousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))

	const pieData = [
		{ name: 'Completed', value: taskStats.completedTasks, color: '#4caf50' },
		{ name: 'Pending', value: taskStats.pendingTasks, color: '#2196f3' },
		{ name: 'Failed', value: taskStats.failedTasks, color: '#f44336' },
	]

	return (
		<div className='flex flex-col gap-6 p-6  min-h-screen'>
			<h4 className='pt-8 text-[30px] md:text-[38px] font-bold tracking-wide'>
				Admin Panel
			</h4>

			<StatsSection
				title='User Stats:'
				stats={[
					{ label: 'Total Users', value: userStats.totalUsers, icon: '👨‍👨‍👦‍👦' },
					{
						label: 'Active Users (Last 30 Days)',
						value: userStats.activeUsers,
						icon: '🏃‍♀️',
					},
					{
						label: 'New Users (Last 7 Days)',
						value: userStats.newUsers,
						icon: '👶',
					},
				]}
			/>

			<div className='grid grid-cols-1 lg:grid-cols-3  gap-4 items-start'>
				<StatsSection
					title='Task Stats:'
					stats={[
						{ label: 'Total ', value: taskStats.totalTasks, icon: '📊' },
						{
							label: 'Completed',
							value: taskStats.completedTasks,
							icon: '✅',
						},
						{ label: 'Failed ', value: taskStats.failedTasks, icon: '⛔' },
						{
							label: 'Pending ',
							value: taskStats.pendingTasks,
							icon: '⏳',
						},
					]}
				/>

				<div className='bg-orange-100 dark:bg-slate-600 rounded-lg shadow p-4'>
					<h5 className='font-bold text-lg mb-2'>Task Status Distribution</h5>
					<ResponsiveContainer width='100%' height={250}>
						<PieChart>
							<Pie
								data={pieData}
								dataKey='value'
								nameKey='name'
								innerRadius={40}
								outerRadius={70}
								paddingAngle={3}
							>
								{pieData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip />
							<Legend />
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div>
				<div className='flex justify-between items-center mb-4'>
					<h5 className='font-bold text-lg'>Tasks</h5>
					<Input
						type='text'
						placeholder='Search tasks...'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className='border w-min bg-orange-400/20 font-medium placeholder:font-bold rounded px-3 py-1'
					/>
				</div>
				<Table
					data={currentTasks}
					columns={[
						{ label: '№', render: (_, index) => index + 1 + '.' },
						{
							label: 'Assigned to',
							render: task => {
								const user = users?.find(u => u._id === task.userId)
								return (
									<div className='flex items-center gap-2'>
										<Image
											src={
												user?.avatarUrl
													? `${BASE_URL}${user.avatarUrl}`
													: '/default-avatar.png'
											}
											width={45}
											height={45}
											alt='profile-avatar'
											className='rounded-full border-2'
										/>
										<p className='text-base'>{user ? user.name : 'Unknown'}</p>
									</div>
								)
							},
						},
						{
							label: 'Deadline',
							render: task => (
								<span>{new Date(task.endTime).toLocaleDateString()}</span>
							),
						},
						{ label: 'Task', render: task => <span>{task.title}</span> },
						{
							label: 'Status',
							render: task => (
								<span
									className={`py-1 px-3 rounded-full font-semibold ${
										task.status.completed
											? 'bg-green-600 text-white'
											: task.status.archived
											? 'bg-orange-600 text-white'
											: 'bg-blue-600 text-white'
									}`}
								>
									{task.status.completed
										? 'Completed'
										: task.status.archived
										? 'Failed'
										: 'In Progress'}
								</span>
							),
						},
					]}
				/>

				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					onNext={handleNextPage}
					onPrevious={handlePreviousPage}
				/>
			</div>
		</div>
	)
}
