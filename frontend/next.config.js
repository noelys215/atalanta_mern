/** @type {import('next').NextConfig} */
module.exports = {
	distDir: 'build',
	reactStrictMode: false,
	images: {
		domains: ['cdn.sanity.io', 'localhost', '127.0.0.1', 'res.cloudinary.com'],
		loader: 'default',
	},
};
