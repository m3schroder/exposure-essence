'use server'

import { parseWithZod } from '@conform-to/zod'

import { ContactForm, contactSchema } from './schema'
import api from '@/lib/api'

export async function save(data: ContactForm) {
	const res = await api('/contact', {
		method: 'POST',
		body: JSON.stringify(data)
	})
}
export async function mail(data: ContactForm) {
	let body = JSON.stringify({
		from: 'noreply@strukt.io',
		fromName: 'Strukt',
		to: [data.email],
		subject: "New Contact",
		html: JSON.stringify(data, null, 5)
	})
	const res = await api('/mail', {
		method: 'POST',
		body: body
	})
}
export async function addContact(prevState: unknown, formData: FormData) {
	const submission = parseWithZod(formData, {
		schema: contactSchema,
	})
	if (submission.status !== 'success') {
		return submission.reply()
	}
	await mail(submission.value)
	await save(submission.value)

}
