'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import clsx from 'clsx'

export function SubmitButton({ children, className }: any) {
	const { pending } = useFormStatus()

	return (
		<Button className={clsx(className)} type="submit" disabled={pending}>
			{pending ? <Loader2 className='!animate-spin' /> : children}
		</Button>
	)
}
