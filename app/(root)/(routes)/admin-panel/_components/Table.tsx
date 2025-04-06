interface TableProps<T> {
	data: T[]
	columns: {
		label: string
		render: (item: T, index: number) => React.ReactNode
	}[]
}

export const Table = <T,>({ data, columns }: TableProps<T>) => (
	<div className='overflow-x-auto bg-orange-200 dark:bg-slate-600 rounded-lg shadow-md'>
		<table className='min-w-full divide-y divide-orange-400 dark:divide-slate-200'>
			<thead className='bg-orange-500 dark:bg-slate-700'>
				<tr>
					{columns.map((col, index) => (
						<th
							key={index}
							className='py-3 px-6 text-xs font-medium tracking-wide text-left text-orange-100 uppercase'
						>
							{col.label}
						</th>
					))}
				</tr>
			</thead>
			<tbody className='divide-y divide-orange-400 dark:divide-slate-200'>
				{data.map((item, rowIndex) => (
					<tr
						key={rowIndex}
						className={`hover:bg-orange-400/90 dark:hover:bg-slate-800 cursor-pointer transition ${
							rowIndex % 2 === 0
								? 'bg-orange-200 dark:bg-slate-500'
								: 'bg-orange-300 dark:bg-slate-700'
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
