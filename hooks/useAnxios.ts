import axios from 'axios'

const DB_URL = process.env.DB_URL

export const axiosInstance = axios.create({
	baseURL: DB_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: true,
})

axiosInstance.interceptors.request.use(
	config => {
		if (typeof window !== 'undefined') {
			const token = localStorage.getItem('jwtToken')
			if (token) {
				config.headers.Authorization = `Bearer ${token}`
			}
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export const useAxios = () => {
	const get = async (url: string) => {
		const response = await axiosInstance.get(url)
		return response.data
	}

	const post = async (url: string, data?: any) => {
		const response = await axiosInstance.post(url, data)
		return response.data
	}

	const put = async (url: string, data: any) => {
		const response = await axiosInstance.put(url, data)
		return response.data
	}

	const remove = async (url: string) => {
		const response = await axiosInstance.delete(url)
		return response.data
	}

	const upload = async (url: string, data?: any) => {
		const response = await axiosInstance.post(url, data, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	}

	return {
		get,
		post,
		put,
		remove,
		upload,
	}
}
