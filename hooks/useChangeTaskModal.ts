'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ChangeTaskModalState {
	isOpen: boolean
	taskId: string | null
	openModal: (id: string, category?: string) => void
	closeModal: () => void
	updateQueryParam: (key: string, value: string) => void
}

export const useChangeTaskModal = (): ChangeTaskModalState => {
	const [isOpen, setIsOpen] = useState(false)
	const [taskId, setTaskId] = useState<string | null>(null)
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const modalType = searchParams.get('modal')
		const id = searchParams.get('id')

		if (modalType === 'change-task' && id) {
			setIsOpen(true)
			setTaskId(id)
			document.body.classList.add('lock')
		} else {
			setIsOpen(false)
			setTaskId(null)
			document.body.classList.remove('lock')
		}
	}, [searchParams])

	const openModal = (id: string, category?: string) => {
		const currentParams = new URLSearchParams(searchParams.toString())
		currentParams.set('modal', 'change-task')
		currentParams.set('id', id)
		currentParams.delete('taskId')
		if (category) currentParams.set('category', category)
		router.push(`${window.location.pathname}?${currentParams.toString()}`)
	}

	const closeModal = () => {
		const currentParams = new URLSearchParams(searchParams.toString())
		currentParams.delete('modal')
		currentParams.delete('id')
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
		taskId,
		openModal,
		closeModal,
		updateQueryParam,
	}
}
