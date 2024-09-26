import api from '@/lib/api'
import Tiles from './tiles';
import { Image } from '@/lib/types';

export default async function Home() {
	const getImages = async () => await api('/media/gallery/public?folder=weddingsengagements/sm', {
		headers: {
			"Cache-Control": 'no-store'
		}
	}).then(r => r.data)


	const items: Image[] = await getImages()

	return (
		<div className='p-2'>
			<Tiles images={items.slice(0, 10)} />
		</div>
	);
}



