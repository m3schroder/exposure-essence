import clsx from "clsx"

export function Video(props: any) {
	return (
		<div className='absolute w-[100vw] h-[100vw] left-0 top-0'>
			<video className={clsx(props.className, 'w-full h-full object-cover fixed -z-10 top-0  filter bg-black')} loop controls={false} preload='yes' autoPlay playsInline muted>
				<div className='w-full h-full top-0 left-0 absolute bg-black' />
				<source className='bg-black' src="/excess-hero.mp4" type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
	)
}