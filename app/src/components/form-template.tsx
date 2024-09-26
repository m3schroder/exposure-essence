'use client'
import { Button } from '@/components/ui/button'
import { FadeIn } from '@/components/FadeIn'
import { parseWithZod } from '@conform-to/zod'
import { Input } from '@/components/ui/input'

import { useForm } from '@conform-to/react'
import { useFormState } from 'react-dom'

let act = {}
let schema = {}

export function ContactForm() {
  const [lastResult, action] = useFormState(act as any, undefined)
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,
    defaultValue: process.env.PUBLIC_API_URL?.includes('localhost')
      ? {
        name: 'Matt',
        email: 'matt@strukt.io',
        company: 'Strukt',
        phone: '615-663-5650',
        message: 'Hi',
      }
      : {},

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: schema as any })
    },

    // Validate the form on blur event triggered
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  })

  return (
    <FadeIn className="lg:order-last">
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Work inquiries
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <Input
            label="Name"
            autoComplete="name"
            errors={fields.name.errors}
            key={fields.name.key}
            name={fields.name.name}
            defaultValue={fields.name.initialValue as any}
          />
          <Input
            label="Email"
            type="email"
            errors={fields.email.errors}
            key={fields.email.key}
            name={fields.email.name}
            defaultValue={fields.email.initialValue as any}
          />
          <Input
            label="Company"
            errors={fields.company.errors}
            key={fields.company.key}
            name={fields.company.name}
            defaultValue={fields.company.initialValue as any}
          />
          <Input
            label="Phone"
            type="tel"
            errors={fields.phone.errors}
            key={fields.phone.key}
            name={fields.phone.name}
            defaultValue={fields.phone.initialValue as any}
          />
          <Input
            label="Message"
            errors={fields.message.errors}
            key={fields.message.key}
            name={fields.message.name}
            defaultValue={fields.message.initialValue as any}
          />
        </div>
        <Button type="submit" className="mt-10">
          Let’s work together
        </Button>
      </form>
    </FadeIn>
  )
}
