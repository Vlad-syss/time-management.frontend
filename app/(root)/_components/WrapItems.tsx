'use client'

import { ConfirmModal } from '@/components/modals/ConfirmModal'
import { useTaskContext } from '@/components/providers'
import { Button } from '@/components/ui/button'
import {
	useChangeTaskModal,
	useConfirmModal,
	useConvertTime,
	useViewTaskModal,
} from '@/hooks'
import { Task } from '@/types'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import cn from 'classnames'
import {
	ArchiveRestore,
	GripVertical,
	SquareCheck,
	SquarePen,
	SquareX,
	Trash,
} from 'lucide-react'
import style from './root.module.scss'

interface SortableItemProps {
	task: Task
	color: string
	searchPage?: boolean
	refetchSearch?: any
	trashPage?: boolean
}

export const WrapItems: React.FC<SortableItemProps> = ({
	task,
	color,
	searchPage,
	refetchSearch,
	trashPage,
}) => {
	const { isOpen, openModal: openDeleteModal, closeModal } = useConfirmModal()
	const { openModal: openEditModal } = useChangeTaskModal()
	const { openModal: openViewModal } = useViewTaskModal()
	const { handleArchive, handleComplete, handleDelete, handleUpdate } =
		useTaskContext()
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: task._id })
	const formattedTime = useConvertTime(task.endTime)

	const styleSheet: React.CSSProperties = {
		transform: CSS.Translate.toString(transform),
		backgroundColor: `${color}30`,
		borderColor: color,
		transition,
	}

	const isArchivingOrCompleted =
		task.status.isArchiving || task.status.completed
	const isTaskArchived = task.status.archived
	const isTaskCompleted = task.status.completed

	const onConfirmDelete = async () => {
		closeModal()
		await handleDelete(task._id)
		await refetchSearch()
		await refetchSearch()
	}

	const onHandleComplete = async (id: string) => {
		await handleComplete(id)
		await refetchSearch()
		await refetchSearch()
	}
	const onHandleArchive = async (id: string) => {
		await handleArchive(id)
		if (trashPage) {
			const tomorrow = new Date()
			tomorrow.setDate(tomorrow.getDate() + 1)

			handleUpdate(id, {
				startTime: new Date(),
				endTime: tomorrow,
			})
		}
		await refetchSearch()
		await refetchSearch()
	}

	return (
		<>
			<div
				ref={setNodeRef}
				className={cn(
					'flex w-full py-1 md:py-2 rounded-md border-[3px] gap-1 md:gap-2 pr-1 md:pr-2 relative overflow-hidden',
					task.status.isArchiving || isTaskArchived ? style.isArchiving : '',
					isTaskCompleted && style.completed,
					searchPage && 'pr-1 pl-1 md:pl-2'
				)}
				style={styleSheet}
			>
				{!isArchivingOrCompleted && !searchPage && !trashPage && (
					<Button
						{...listeners}
						{...attributes}
						size='icon'
						variant='ghost'
						className='text-red-600 dark:text-red-400 hover:text-orange-800 hover:bg-orange-400/20 cursor-grab md:w-[22px] w-[18px] h-full'
					>
						<GripVertical />
					</Button>
				)}
				<TaskDetails
					task={task}
					openViewModal={openViewModal}
					formattedTime={formattedTime}
				/>
				<TaskActions
					task={task}
					openEditModal={openEditModal}
					openDeleteModal={openDeleteModal}
					handleArchive={searchPage ? onHandleArchive : handleArchive}
					handleComplete={searchPage ? onHandleComplete : handleComplete}
					trashPage={trashPage}
					toggleArchive={onHandleArchive}
				/>

				{task.status.archived || task.status.completed ? (
					<div className='w-3' />
				) : (
					''
				)}
				<TaskStatusBadge status={task.status} />
			</div>

			<ConfirmModal
				isOpen={isOpen}
				onClose={closeModal}
				onConfirm={onConfirmDelete}
				message='That’s a permanent delete and cannot be undone. Are you sure?'
			/>
		</>
	)
}

interface TaskDetailsProps {
	task: Task
	openViewModal: (id: string) => void
	formattedTime: string
}

const TaskDetails: React.FC<TaskDetailsProps> = ({
	task,
	openViewModal,
	formattedTime,
}) => (
	<h4 className='flex flex-col flex-auto leading-tight'>
		<button
			className={cn(
				'text-xl text-left font-extrabold capitalize text-destructive dark:text-slate-200 drop-shadow-sm hover:underline cursor-pointer',
				task.status.isArchiving || task.status.archived ? 'text-white' : '',
				task.status.completed && 'text-white'
			)}
			onClick={() => openViewModal(task._id)}
		>
			{task.title}
		</button>
		<p
			className={cn(
				'text-xs md:text-sm font-medium text-stone-600 dark:text-stone-300 max-w-[150px] sm:max-w-[300px]: lg:max-w-[600px] mb-3 leading-[18px] truncate',
				task.status.isArchiving || task.status.archived ? 'text-white' : '',
				task.status.completed && 'text-white'
			)}
		>
			{task.description}
		</p>
		<span
			className={cn(
				'text-xs text-slate-900/80 dark:text-foreground font-medium grid grid-cols-2 mt-auto md:flex items-center gap-1',
				task.status.isArchiving || task.status.archived ? 'text-white' : '',
				task.status.completed && 'text-white'
			)}
		>
			<span className='col-span-2'>
				category:{' '}
				<strong
					className={cn(
						'text-red-500 dark:text-red-400 tracking-wider',
						task.status.isArchiving || task.status.archived
							? 'text-red-300'
							: ''
					)}
				>
					{' '}
					"{task.category.name}"
				</strong>
			</span>
			{!task.status.completed && !task.status.archived ? (
				task.status.isArchiving ? (
					<p className='col-span-2 md:px-2 font-semibold text-[14px] tracking-widest'>
						EXPIRED
					</p>
				) : (
					<p className='col-span-2 '>{formattedTime}</p>
				)
			) : task.status.completed ? (
				<p className='col-span-2 md:px-2 font-semibold text-[14px] tracking-widest'>
					Completed successfully
				</p>
			) : (
				<p className='col-span-2 md:px-2 font-semibold text-[14px] tracking-widest'>
					Unfortunately failed
				</p>
			)}
		</span>
	</h4>
)

interface TaskActionsProps {
	task: Task
	openEditModal: (id: string) => void
	openDeleteModal: () => void
	handleArchive: (id: string) => void
	handleComplete: (id: string) => void
	trashPage?: boolean
	toggleArchive: (id: string) => void
}

const TaskActions: React.FC<TaskActionsProps> = ({
	task,
	openEditModal,
	openDeleteModal,
	handleArchive,
	handleComplete,
	trashPage,
	toggleArchive,
}) => (
	<div className='flex-col md:flex-row flex items-start'>
		{!task.status.completed && !task.status.archived && (
			<>
				<TaskActionButton
					title='edit'
					onClick={() => openEditModal(task._id)}
					icon={<SquarePen size={28} className='fill-gray-600/60' />}
					className='text-gray-100 hover:text-gray-600/100 hover:bg-background'
				/>
				<TaskActionButton
					title='archive'
					onClick={() => handleArchive(task._id)}
					icon={<SquareX size={30} className='fill-red-600/60' />}
					className='text-gray-100 hover:text-red-600/100 hover:bg-background'
				/>
				{!task.status.isArchiving && !task.status.completed && (
					<TaskActionButton
						title='complete'
						onClick={() => handleComplete(task._id)}
						icon={<SquareCheck size={30} className='fill-green-600/60' />}
						className='text-gray-100 hover:text-green-600/100 hover:bg-background'
					/>
				)}
			</>
		)}
		{task.status.archived || task.status.completed ? (
			<TaskActionButton
				title='permanent delete!'
				onClick={openDeleteModal}
				icon={<Trash size={28} className='fill-red-400/30' />}
				className='text-red-600 hover:text-red-800/100 hover:bg-background'
			/>
		) : (
			''
		)}
		{task.status.archived && trashPage ? (
			<TaskActionButton
				title='refound'
				onClick={() => toggleArchive(task._id)}
				icon={<ArchiveRestore size={28} className='fill-slate-400/30' />}
				className='text-slate-600 hover:text-slate-800/100 hover:bg-background'
			/>
		) : (
			''
		)}
	</div>
)

interface TaskActionButtonProps {
	title: string
	onClick: () => void
	icon: React.ReactNode
	className: string
}

const TaskActionButton: React.FC<TaskActionButtonProps> = ({
	title,
	onClick,
	icon,
	className,
}) => (
	<Button
		size='icon'
		variant='ghost'
		className={`md:p-1 ${className}`}
		title={title}
		onClick={onClick}
	>
		{icon}
	</Button>
)

interface TaskStatusBadgeProps {
	status: Task['status']
}

const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ status }) => {
	const badgeText = status.completed
		? 'Completed'
		: status.archived
		? 'Fooled'
		: ''
	const badgeClass = status.completed
		? 'bg-emerald-500'
		: status.archived
		? 'bg-red-500'
		: ''

	return (
		badgeText && (
			<div
				className={`h-full w-4 text-xs flex items-center justify-center text-white absolute right-0 top-0 px-3 ${badgeClass} font-semibold tracking-wider`}
				style={{ writingMode: 'vertical-lr', textOrientation: 'mixed' }}
			>
				{badgeText}
			</div>
		)
	)
}
