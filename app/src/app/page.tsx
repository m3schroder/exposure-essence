'use client'
import { Button } from '@/components/ui/button'
import * as Icon from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Video } from '@/components/video'

export default function Home() {
	return (
		<>
			<Hero />
		</>

	)
}

const navigation = [
	{ name: 'Meet the Team', href: '#' },
	{ name: 'Our Work', href: '#' },
	{ name: 'Services', href: '#' },
]


function Hero() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	return (
		<div className='w-[100vw] h-[100vh]' >
			<Video className='opacity-40' />
			{/* <Icon.ArrowBigDown className='hidden sm:block absolute bottom-10 w-full mx-auto stroke-white' size={50} /> */}
			<div className="relative overflow-hidden">
				<div className="mx-auto md:max-w-none max-w-3xl py-[24vh] sm:py-[30vh]">
					<div className="mb-8 sm:flex w-fit mx-auto sm:justify-center">
						<div className="relative rounded-full hidden sm:block  px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20">
							Looking for your photos?{' '}
							<a href="#" className="font-semibold text-white">
								<span className="absolute inset-0" aria-hidden="true" />
								<span aria-hidden="true">&rarr;</span>
							</a>
						</div>
					</div>
					<div className="px-8 text-center">
						<h1 className="text-primary font-bold tracking-tight ">
							Expose Your Essence
						</h1>
						<h4 className="text-primary  leading-8">
							Authentic Moments, Genuine Impact
						</h4>
						<div className="mt-12 sm:mt-10 sm:mx-none mx-auto flex-col w-44 sm:flex-row flex items-center justify-center gap-6">
							<Link href='contact' className='w-full' >
								<Button size={'lg'} className='w-44'>
									Say Hey
								</Button>
							</Link>
							<Link href={"portfolio"} className='w-full'>
								<Button size="lg" className='w-44'>
									View gallery <span aria-hidden="true" className='ml-2'>→</span>
								</Button>
							</Link>
						</div>
					</div>
				</div>

			</div>
		</div>
	)
}