/** @type {import('next').NextConfig} */
module.exports = {
	publicRuntimeConfig: {
		name: process.env.API_URL,
		description: process.env.API_URL,
	},
	env: {
		CI: false,
		API_URL: 'http://127.0.0.1:5000/api',
		JWT_SECRET: 'atalanta2022',
		PAYPAL_CLIENT_ID:
			'AXs5w5oEi2r8q0gSNMLg5U5rQ2LoAljRl7s2nPB5YL1Z59hi70UM2oYUZHDxGeB5-gA8qnGZaY0dSXiA',
		RECAPTCHA_SITE_KEY: '6LebRP8fAAAAABONrTiKwUj2Br63we6hMkumMH6p',
		RECAPTCHA_SECRET_KEY: '6LebRP8fAAAAABWowPhiYyKOz0GeHgSnYpQytSqp',
		CLOUDINARY_CLOUD_NAME: 'dshviljjs',
		CLOUDINARY_KEY: '961159261361234',
		CLOUDINARY_SECRET: 'fJReJrwLgTgVjKvHcH16bmzN8Ms',
	},
	distDir: 'build',
	reactStrictMode: false,
	images: {
		domains: ['cdn.sanity.io', 'localhost', '127.0.0.1', 'res.cloudinary.com'],
		loader: 'default',
		unoptimized: true,
	},
};
