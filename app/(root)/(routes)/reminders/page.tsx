'use client'

import { useWidth } from '@/hooks'
import cn from 'classnames'

const RemindersPage = () => {
	const width = useWidth()
	const isMobile = width < 945
	/**
	 * WHAT TO DO:
	 * Додай сортування за часом або алфавітом, щоб користувач міг швидко знайти потрібне нагадування.
	 * Можна додати прості фільтри, наприклад, для відображення лише майбутніх або лише завершених нагадувань.
	 * Додай інпут для пошуку за текстом у назві чи описі нагадування, щоб користувач міг легко знаходити конкретні записи.
	 * Групування по датах: Можна групувати нагадування за днями, наприклад, “Сьогодні”, “Завтра”, “Цього тижня”, без потреби змінювати бекенд. Це дозволить швидко переглядати нагадування на поточний період(можна попробувати реалізувати це в вигляді просотого календаря де дні з нагадуваннями були б позначенні).
	 * Відображення завершених нагадувань: Можна показувати завершені нагадування на окремій вкладці чи в списку, щоб користувач бачив, що вже зроблено, і міг повернутись до архіву.
	 */

	return (
		<div
			className={cn('py-3 flex flex-col gap-3', {
				'pb-24 sm:pb-20': isMobile,
			})}
		>
			<h4 className='text-[30px] md:text-[38px] font-bold tracking-wide'>
				Reminders!
			</h4>
		</div>
	)
}

export default RemindersPage
