'use client'

import { useState } from 'react'

interface ModalState {
	isOpen: boolean
	openModal: () => void
	closeModal: () => void
}

export const useCategoryModal = (): ModalState => {
	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => {
		setIsOpen(true)
	}

	const closeModal = () => {
		setIsOpen(false)
	}

	return {
		isOpen,
		openModal,
		closeModal,
	}
}
