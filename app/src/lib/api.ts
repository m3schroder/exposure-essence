export default async function api<T = any>(
	route: string | URL | globalThis.Request,
	init?: RequestInit,
): Promise<{ data: T, error?: Error }> {
	let url = (process.env.PUBLIC_API_URL ?? '') + route

	const response = await fetch(url, {
		...init,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			...init?.headers
		}
	})



	const isJson = response.headers
		.get('content-type')
		?.includes('application/json')
	const isText = response.headers.get('content-type')?.includes('plain/text')
	let data = null
	if (isJson) data = await response.json()
	if (isText) data = await response.text()

	console.log(`${new Date().toLocaleDateString()} | ${url} | ${response.statusText}`)

	if (response.ok)
		return {
			data,
			error: undefined
		}
	else {
		return {
			data,
			error: new Error("Error getting data")
		}
	}
}
