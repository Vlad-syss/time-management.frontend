/** @type {import('next').NextConfig} */
const nextConfig = {
	compiler: {
		styledComponents: true,
	},
	env: {
		DB_URL: process.env.DB_URL,
	},
}

export default nextConfig
