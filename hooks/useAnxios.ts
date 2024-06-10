// axiosInstance.ts
import axios from 'axios'

const DB_URL = process.env.DB_URL

export const axiosInstance = axios.create({
	baseURL: DB_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const useAxios = () => {
	const get = async (url: string) => {
		const response = await axiosInstance.get(url)
		return response.data
	}

	const post = async (url: string, data: any) => {
		const response = await axiosInstance.post(url, data)
		return response.data
	}

	return {
		get,
		post,
	}
}
