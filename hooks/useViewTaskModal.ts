'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ModalState {
	isOpen: boolean
	taskId: string | null
	openModal: (taskId: string) => void
	closeModal: () => void
}

export const useViewTaskModal = (): ModalState => {
	const [isOpen, setIsOpen] = useState(false)
	const [taskId, setTaskId] = useState<string | null>(null)
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const taskIdFromParams = searchParams.get('taskId')
		if (taskIdFromParams) {
			setIsOpen(true)
			setTaskId(taskIdFromParams)
			document.body.classList.add('lock')
		} else {
			setIsOpen(false)
			setTaskId(null)
			document.body.classList.remove('lock')
		}
	}, [searchParams])

	const openModal = (taskId: string) => {
		const currentParams = new URLSearchParams(searchParams.toString())
		currentParams.set('taskId', taskId)
		router.push(`${window.location.pathname}?${currentParams.toString()}`)
	}

	const closeModal = () => {
		const currentParams = new URLSearchParams(searchParams.toString())
		currentParams.delete('taskId')
		router.push(`${window.location.pathname}?${currentParams.toString()}`)
	}

	return {
		isOpen,
		taskId,
		openModal,
		closeModal,
	}
}
