import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string
	errors?: string[] | undefined
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, errors, label, ...props }, ref) => {
		return (
			<div className='w-full relative'>
				<input
					type={type}
					className={cn(
						'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
						className,
					)}
					ref={ref}
					{...props}
				/>
				{errors && <span className='text-xs text-destructive animate-in'>{errors.join(',').toLowerCase()}</span>}
				{props.required && <span className='absolute top-1 right-2 text-destructive'>*</span>}
			</div>
		)
	},
)
Input.displayName = 'Input'

export { Input }
