import {
	Clock,
	Home,
	ListTodo,
	LogOut,
	Search,
	Settings,
	Trash,
} from 'lucide-react'

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
export const navlinks = [
	{
		name: 'Home',
		icon: <Home className='w-6 h-6 md:w-7 md:h-7 dark:text-slate-200' />,
		route: '/home',
	},
	{
		name: 'Tasks',
		icon: <ListTodo className='w-6 h-6 md:w-7 md:h-7 dark:text-slate-200' />,
		route: '/tasks',
	},
	{
		name: 'Trash',
		icon: <Trash className='w-6 h-6 md:w-7 md:h-7 dark:text-slate-200' />,
		route: '/trash',
	},
	{
		name: 'Reminders',
		icon: <Clock className='w-6 h-6 md:w-7 md:h-7 dark:text-slate-200' />,
		route: '/reminders',
	},
	{
		name: 'Search',
		icon: <Search className='w-6 h-6 md:w-7 md:h-7 dark:text-slate-200' />,
		route: '/search',
	},
	{
		name: 'Admin Panel',
		icon: <Settings className='w-6 h-6 md:w-7 md:h-7 dark:text-slate-200' />,
		route: '/admin-panel',
	},
	{
		name: 'Logout',
		icon: <LogOut className='w-6 h-6 md:w-7 md:h-7' />,
		route: '',
	},
]
