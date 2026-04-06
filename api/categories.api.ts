import { useAxios } from '@/hooks'

export interface CategoryInfo {
	name: string
	taskCount: number
	completedCount: number
	archivedCount: number
}

export const getCategories = async (): Promise<CategoryInfo[]> => {
	try {
		return await useAxios().get('/categories')
	} catch (error) {
		console.error('Failed to get categories:', error)
		throw error
	}
}

export const renameCategory = async (
	name: string,
	newName: string
): Promise<any> => {
	try {
		return await useAxios().put(
			`/categories/${encodeURIComponent(name)}`,
			{ newName }
		)
	} catch (error) {
		console.error('Failed to rename category:', error)
		throw error
	}
}

export const deleteCategory = async (name: string): Promise<any> => {
	try {
		return await useAxios().remove(
			`/categories/${encodeURIComponent(name)}`
		)
	} catch (error) {
		console.error('Failed to delete category:', error)
		throw error
	}
}
