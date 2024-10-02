import cn from 'classnames'
import * as React from 'react'

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, placeholder, ...props }, ref) => {
		return (
			<textarea
				className={cn(
					'flex h-40 w-full rounded-md border-[2px] border-orange-600 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-800/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-medium resize-none dark:bg-slate-400 dark:border-slate-900',
					className
				)}
				placeholder={placeholder}
				ref={ref}
				{...props}
			/>
		)
	}
)
Textarea.displayName = 'Input'

export { Textarea }
