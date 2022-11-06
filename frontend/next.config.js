/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: false,
	images: {
		domains: ['cdn.sanity.io', 'localhost', '127.0.0.1'],
		loader: 'default',
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://api.example.com/:path*',
			},
		];
	},
};
