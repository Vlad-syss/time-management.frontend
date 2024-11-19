export const LOCAL_STORAGE_KEY = 'tasksOrder'
export const LOCAL_STORAGE_CATEGORY_ORDER_KEY = 'categoriesOrder'
export const BASE_URL = process.env.DB_URL
	? process.env.DB_URL?.replace('/api/', '')
	: 'http://localhost:5000'

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]
