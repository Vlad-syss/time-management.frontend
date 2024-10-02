'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ModalState {
	isOpen: boolean
	openModal: (category?: string) => void
	closeModal: () => void
	updateQueryParam: (key: string, value: string) => void
}

export const useCreateTaskModal = (): ModalState => {
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		if (searchParams.get('modal') === 'create-task') {
			setIsOpen(true)
			document.body.classList.add('lock')
		} else {
			setIsOpen(false)
			document.body.classList.remove('lock')
		}
	}, [searchParams])

	const openModal = (
		category?: string,
		title?: string,
		description?: string
	) => {
		const currentParams = new URLSearchParams(searchParams.toString())
		currentParams.set('modal', 'create-task')
		if (category) currentParams.set('category', category)
		if (title) currentParams.set('title', title)
		if (description) currentParams.set('description', description)
		router.push(`${window.location.pathname}?${currentParams.toString()}`)
	}

	const closeModal = () => {
		const currentParams = new URLSearchParams(searchParams.toString())
		currentParams.delete('modal')
		currentParams.delete('title')
		currentParams.delete('description')
		currentParams.delete('category')
		router.push(`${window.location.pathname}?${currentParams.toString()}`)
	}

	const updateQueryParam = (key: string, value: string) => {
		const currentParams = new URLSearchParams(searchParams.toString())
		if (value) {
			currentParams.set(key, value)
		} else {
			currentParams.delete(key)
		}
		router.replace(`${window.location.pathname}?${currentParams.toString()}`)
	}

	return {
		isOpen,
		openModal,
		closeModal,
		updateQueryParam,
	}
}
