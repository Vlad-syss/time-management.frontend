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
}

export const WrapItems: React.FC<SortableItemProps> = ({
	task,
	color,
	searchPage,
}) => {
	const { isOpen, openModal: openDeleteModal, closeModal } = useConfirmModal()
	const { openModal: openEditModal } = useChangeTaskModal()
	const { openModal: openViewModal } = useViewTaskModal()
	const { handleArchive, handleComplete, handleDelete } = useTaskContext()
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

	const onConfirmDelete = () => {
		closeModal()
		handleDelete(task._id)
	}

	return (
		<>
			<div
				ref={setNodeRef}
				className={cn(
					'flex w-full py-2 rounded-md border-[3px] gap-2 pr-2 relative overflow-hidden',
					task.status.isArchiving || isTaskArchived ? style.isArchiving : '',
					isTaskCompleted && style.completed,
					searchPage && 'pl-2'
				)}
				style={styleSheet}
			>
				{!isArchivingOrCompleted && !searchPage && (
					<Button
						{...listeners}
						{...attributes}
						size='icon'
						variant='ghost'
						className='text-red-600 dark:text-red-400 hover:text-orange-800 hover:bg-orange-400/20 cursor-grab w-[22px] h-full'
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
					handleArchive={handleArchive}
					handleComplete={handleComplete}
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
	<h4 className='flex-auto leading-tight'>
		<button
			className={cn(
				'text-xl font-extrabold capitalize text-destructive dark:text-slate-200 drop-shadow-sm hover:underline cursor-pointer',
				task.status.isArchiving || task.status.archived ? 'text-white' : '',
				task.status.completed && 'text-white'
			)}
			onClick={() => openViewModal(task._id)}
		>
			{task.title}
		</button>
		<p
			className={cn(
				'text-sm font-medium text-stone-600 dark:text-stone-300 max-w-[650px] mb-3 leading-[18px] truncate',
				task.status.isArchiving || task.status.archived ? 'text-white' : '',
				task.status.completed && 'text-white'
			)}
		>
			{task.description}
		</p>
		<span
			className={cn(
				'text-xs text-slate-900/80 dark:text-foreground font-medium flex items-center gap-1',
				task.status.isArchiving || task.status.archived ? 'text-white' : '',
				task.status.completed && 'text-white'
			)}
		>
			category:{' '}
			<strong
				className={cn(
					'text-red-500 dark:text-red-400 tracking-wider',
					task.status.isArchiving || task.status.archived ? 'text-red-300' : ''
				)}
			>
				{' '}
				"{task.category.name}"
			</strong>
			{!task.status.completed && !task.status.archived ? (
				task.status.isArchiving ? (
					<p className='px-2 font-semibold text-[14px] tracking-widest'>
						EXPIRED
					</p>
				) : (
					<p>{formattedTime}</p>
				)
			) : task.status.completed ? (
				<p className='px-2 font-semibold text-[14px] tracking-widest'>
					Completed successfully
				</p>
			) : (
				<p className='px-2 font-semibold text-[14px] tracking-widest'>
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
}

const TaskActions: React.FC<TaskActionsProps> = ({
	task,
	openEditModal,
	openDeleteModal,
	handleArchive,
	handleComplete,
}) => (
	<div className='flex items-start'>
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
		className={`p-1 ${className}`}
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
