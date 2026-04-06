import { cva, type VariantProps } from 'class-variance-authority'
import cn from 'classnames'
import * as React from 'react'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
	{
		variants: {
			variant: {
				default:
					'bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-sm',
				destructive:
					'bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500',
				outline:
					'border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300',
				secondary:
					'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/15',
				ghost:
					'hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300',
				link: 'text-indigo-500 dark:text-indigo-400 underline-offset-4 hover:underline',
				add: 'border border-dashed border-gray-300 dark:border-white/15 text-gray-500 dark:text-gray-400 hover:border-indigo-400 hover:text-indigo-500 dark:hover:border-indigo-400 dark:hover:text-indigo-400 bg-transparent',
			},
			size: {
				default: 'h-10 px-4 py-2 rounded-lg text-sm',
				sm: 'h-8 rounded-lg px-3 text-xs',
				lg: 'h-11 rounded-lg px-6 text-base',
				icon: 'h-9 w-9 rounded-lg',
				add: 'py-3 rounded-lg',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size }), className)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
