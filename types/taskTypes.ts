import { CategoriesWithColors } from '@/hooks/useCategoryWithColor'

export interface Category {
	_id: string
	name: string
	createdAt: string
	updatedAt: string
	__v: number
}

export interface Status {
	completed: boolean
	archived: boolean
	isArchiving: boolean
	_id: string
	createdAt: string
	updatedAt: string
	__v: number
}

export interface Task {
	_id: string
	title: string
	description: string
	userId: string
	startTime: string
	endTime: string
	category: Category
	status: Status
	createdAt: string
	updatedAt: string
	__v: number
}

export interface AllTasks extends Array<Task> {}

export interface SelectedTypes {
	kanban: boolean
	wrap: boolean
}

export interface createData {
	category: string
	title: string
	description: string
	startTime: Date
	endTime: Date
}
export interface data {
	category: { name: string }
	title: string
	description: string
	startTime: Date
	endTime: Date
}
export type changeData = Partial<data>
export interface BoardsProps {
	isPending: boolean
	tasks: AllTasks | undefined
	categoriesWithColors: CategoriesWithColors
	allCategories: Category[]
}
