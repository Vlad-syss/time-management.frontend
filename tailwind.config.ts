import type { Config } from 'tailwindcss'

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: '#EC9704', // PeachPuff
				input: 'rgb(234, 88, 12 )', // Bisque
				ring: '#FFDEAD', // NavajoWhite
				background: 'transparent', // PeachPuff
				foreground: '#FFB07A', // LightSalmon
				primary: {
					DEFAULT: '#f97a48', // LightSalmon
					foreground: '#FFFFFF',
				},
				secondary: {
					DEFAULT: '#FF7F50', // Coral
					foreground: '#FFFFFF',
				},
				destructive: {
					DEFAULT: '#FF3347', // Tomato
					foreground: '#FFFFFF',
				},
				muted: {
					DEFAULT: '#845EC2', // PeachPuff
					foreground: '#FFFFFF',
				},
				accent: {
					DEFAULT: 'rgba(255, 128, 0,0.7)', // PeachPuff
					foreground: '#000000',
				},
				popover: {
					DEFAULT: '#FFA07A', // LightSalmon
					foreground: '#000000',
				},
				card: {
					DEFAULT: '#FFFAF0', // FloralWhite
					foreground: '#000000',
				},
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			gridTemplateColumns: {
				open: '300px 1fr',
				collapsed: '80px 1fr',
			},
			gridTemplateRows: {
				mode: '1fr 40px 40px',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}

export default config
