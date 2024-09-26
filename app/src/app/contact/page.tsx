import { type Metadata } from 'next'

import { ContactForm } from './contact-form'
import { FadeIn } from '@/components/FadeIn'
import { Video } from '@/components/video'


export const metadata: Metadata = {
	title: 'Contact Us',
	description: 'Let’s work together. We can’t wait to hear from you.',
}

export default function Contact() {
	return (
		<>
			<Video className='opacity-10' />
			<div className="mx-auto w-full md:max-w-3xl mt-12 lg:mt-20 p-8 md:p-20 rounded-md">
				<h3 className='text-3xl'>Hello 👋🏼</h3>
				<p>If you’re interested in learning more or booking a session, just fill out this short form below!</p>
				<FadeIn>
					<ContactForm />
					<p className='mt-5 mb-12'>We'll be in touch shortly!</p>
				</FadeIn>

				{/* <FadeIn>
					<h4 className='mb-5'>You can also email us directly at</h4>
					<div className='gap-2 flex flex-row flex-wrap'>
						{['joshua@exposureessence.com', 'emily@exposureessence.com', 'chase@exposureessence.com', 'rachel@exposureessence.com'].map(email => (

							<a href={`mailto:${email}`}>
								<Button variant={'ghost'}>
									{email}
								</Button>
							</a>
						))}
					</div>
				</FadeIn> */}
			</div >
		</>
	)
}
