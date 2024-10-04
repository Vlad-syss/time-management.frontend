import { Category } from '@/types'
import randomColor from 'randomcolor'
import { useEffect, useState } from 'react'

export interface CategoriesWithColors {
	[key: string]: string
}

export const useCategoriesWithColors = (
	categories: Category[],
	theme: 'light' | 'dark'
) => {
	const [categoriesWithColors, setCategoriesWithColors] =
		useState<CategoriesWithColors>({})

	useEffect(() => {
		const newCategoriesWithColors: CategoriesWithColors = {}

		categories.forEach((category: Category) => {
			newCategoriesWithColors[category.name] = randomColor({
				hue: theme === 'light' ? 'orange' : 'orange',
				format: 'hex',
				luminosity: theme === 'light' ? 'bright' : 'dark',
			})
		})

		setCategoriesWithColors(newCategoriesWithColors)
	}, [categories, theme])

	return categoriesWithColors
}
