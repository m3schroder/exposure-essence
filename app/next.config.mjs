/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				hostname: "*",
			},
		],
	},
}

export default async function config() {
	return nextConfig
}
