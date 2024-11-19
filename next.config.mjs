/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
	env: {
		DB_URL: process.env.DB_URL,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '4444',
				pathname: '/uploads/**',
			},
		],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	distDir: 'build',
}

export default nextConfig
