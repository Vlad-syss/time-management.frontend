interface TableProps<T> {
	data: T[]
	columns: {
		label: string
		render: (item: T, index: number) => React.ReactNode
	}[]
}

export const Table = <T,>({ data, columns }: TableProps<T>) => (
	<div className='overflow-x-auto bg-gray-50 dark:bg-[#1A1A24] rounded-lg shadow-md'>
		<table className='min-w-full divide-y divide-gray-200 dark:divide-white/[0.08] dark:divide-white/[0.08]'>
			<thead className='bg-indigo-500 dark:bg-[#1A1A24]'>
				<tr>
					{columns.map((col, index) => (
						<th
							key={index}
							className='py-3 px-6 text-xs font-medium tracking-wide text-left text-gray-100 uppercase'
						>
							{col.label}
						</th>
					))}
				</tr>
			</thead>
			<tbody className='divide-y divide-gray-200 dark:divide-white/[0.08] dark:divide-white/[0.08]'>
				{data.map((item, rowIndex) => (
					<tr
						key={rowIndex}
						className={`hover:bg-indigo-500/80 dark:hover:bg-slate-800 cursor-pointer transition ${
							rowIndex % 2 === 0
								? 'bg-gray-50 dark:bg-white/10'
								: 'bg-gray-100 dark:bg-[#1A1A24]'
						}`}
					>
						{columns.map((col, colIndex) => (
							<td
								key={colIndex}
								className='py-4 px-6 text-sm font-medium text-gray-700 dark:text-slate-100'
							>
								{col.render(item, rowIndex)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</div>
)
