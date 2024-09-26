"use client"
import Image from 'next/image'
import { Masonry } from "react-plock";
import { Image as MyImage } from '@/lib/types';

export default function Tiles({ images }: { images: MyImage[] }) {
	return (
		<Masonry
			items={images}
			config={{
				columns: [1, 2, 3],
				gap: [10, 10, 10],
				media: [50, 50, 50],
			}}
			render={(image, idx) => (
				<Context>

					<div className='w-full h-full relative' key={idx}>
						<FadeIn>

							<Image
								draggable={false}
								className='rounded-sm'
								key={idx}
								placeholder='blur'
								width={image.width}
								height={image.height}
								blurDataURL={blur(image.name)}
								src={image.name}
								alt="Picture of the author"
							/>
						</FadeIn>
					</div>
				</Context>
			)}
		/>
	)
}


import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuShortcut,
	ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { blur } from '@/lib/utils';
import { FadeIn } from '@/components/FadeIn';

function Context({ children, key }: any) {
	return (


		<ContextMenu key={key}>
			<ContextMenuTrigger className="w-full h-full">
				{children}
			</ContextMenuTrigger>
			<ContextMenuContent className="w-64">
				<ContextMenuItem inset>
					View Hi-Res
				</ContextMenuItem>
				<ContextMenuItem inset>
					Share
				</ContextMenuItem>
				<ContextMenuItem inset>
					Request
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}