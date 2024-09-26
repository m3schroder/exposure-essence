'use client'
import Link from 'next/link'

import { parseWithZod } from '@conform-to/zod'
import { Input } from '@/components/ui/input'
import { useFormState } from 'react-dom'
import { useForm } from '@conform-to/react'
import { addContact } from './actions'
import { contactSchema } from './schema'
import { SubmitButton } from '@/components/submit'
import { useRef } from 'react'
import { Send } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function ContactForm() {
	const [lastResult, action] = useFormState(addContact, undefined)
	const ref = useRef<HTMLFormElement>(null)
	const [form, fields] = useForm({
		// Sync the result of last submission
		lastResult,
		defaultValue: process.env.PUBLIC_API_URL?.includes('okay')
			? {
				name: 'Josh Fuchcar',
				email: 'josh@exposureessence.com',
				phone: '615-663-5650',
				message: 'Hello',
			}
			: {},

		// Reuse the validation logic on the client
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: contactSchema })
		},

		// Validate the form on blur event triggered
		shouldValidate: 'onBlur',
		shouldRevalidate: 'onInput',
	})

	return (
		<form ref={ref} id={form.id} onSubmit={form.onSubmit} action={async (formData) => {
			await action(formData)
			ref.current?.reset()
		}} noValidate>
			<div className="isolate mt-6 -space-y-px flex flex-col gap-3">
				<Input
					label="Name"
					required
					autoComplete="name"
					errors={fields.name.errors}
					placeholder='Name'
					key={fields.name.key}
					name={fields.name.name}
					defaultValue={fields.name.initialValue}
				/>
				<Input
					label="Email"
					required
					type="email"
					autoComplete='email'
					placeholder='Email'
					errors={fields.email.errors}
					key={fields.email.key}
					name={fields.email.name}
					defaultValue={fields.email.initialValue}
				/>
				<Input
					label="Phone"
					type="tel"
					autoComplete='phone'
					placeholder='Number'
					errors={fields.phone.errors}
					key={fields.phone.key}
					name={fields.phone.name}
					defaultValue={fields.phone.initialValue}
				/>
				<Select>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="How'd you hear about us?" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="website">Website</SelectItem>
							<SelectItem value="team member">Team Member</SelectItem>
							<SelectItem value="networking event">Networking Event</SelectItem>
							<SelectItem value="google">Google</SelectItem>
							<SelectItem value="business card">Business Card</SelectItem>
							<SelectItem value="referral">Referral</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Textarea
					required
					rows={5}
					placeholder='Message'
					errors={fields.message.errors}
					key={fields.message.key}
					name={fields.message.name}
					defaultValue={fields.message.initialValue}
				/>
			</div>
			<SubmitButton className='mt-3 w-full flex  text-md justify-center min-w-32'>
				<span className='mr-3'>Send</span>
				<Send className='stroke-secondary' size='16' />
			</SubmitButton>
		</form>
	)
}
