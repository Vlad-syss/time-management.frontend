'use client'

import { WrapItems } from '@/app/(root)/_components/WrapItems'
import { useTaskContext } from '@/components/providers'
import { useCategoriesWithColors, useTheme } from '@/hooks'
import { useSearchTasks } from '@/hooks/useTasks'
import { AllTasks } from '@/types'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const ResultsPage = () => {
	const { theme } = useTheme()
	const [results, setResults] = useState<AllTasks>([])
	const pathname = usePathname()
	const segments = pathname.split('/')
	const searchValue = segments[segments.length - 1] || ''
	const { allCategories } = useTaskContext()
	const { data, isPending, isError, error } = useSearchTasks(searchValue)
	const categoriesWithColors = useCategoriesWithColors(allCategories, theme)
	console.log(theme)

	useEffect(() => {
		if (data) {
			setResults(data)
		}
	}, [data])

	if (isPending) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Error: {error?.message || 'An error occurred'}</p>
	}

	return (
		<div>
			<h1>Search Results for "{searchValue}"</h1>
			{results.length > 0 ? (
				<ul>
					{results.map(task => (
						<li key={task._id}>
							<WrapItems
								color={categoriesWithColors[task.category.name]} // Dynamically generated color for the category
								task={task}
							/>
						</li>
					))}
				</ul>
			) : (
				<p>No results found.</p>
			)}
		</div>
	)
}

export default ResultsPage
