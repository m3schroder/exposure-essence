import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	errors: string[] | undefined
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, errors, ...props }, ref) => {
		return (
			<div className='w-full relative'>
				<textarea
					className={cn(
						"flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
						className
					)}
					ref={ref}
					{...props}
				/>

				{errors && <span className='text-xs text-destructive animate-in'>{errors.join(',').toLowerCase()}</span>}
			</div>
		)
	}
)
Textarea.displayName = "Textarea"

export { Textarea }
