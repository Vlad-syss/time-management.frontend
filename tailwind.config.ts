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
				border: '#E5E7EB',
				input: '#E5E7EB',
				ring: '#6366F1',
				background: '#FAFBFC',
				foreground: '#111827',
				surface: {
					DEFAULT: '#FFFFFF',
					dark: '#1A1A24',
				},
				primary: {
					DEFAULT: '#6366F1',
					hover: '#4F46E5',
					light: '#818CF8',
					foreground: '#FFFFFF',
				},
				secondary: {
					DEFAULT: '#F3F4F6',
					foreground: '#374151',
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF',
				},
				muted: {
					DEFAULT: '#F3F4F6',
					foreground: '#6B7280',
				},
				accent: {
					DEFAULT: '#8B5CF6',
					foreground: '#FFFFFF',
				},
				success: {
					DEFAULT: '#10B981',
					foreground: '#FFFFFF',
				},
				warning: {
					DEFAULT: '#F59E0B',
					foreground: '#FFFFFF',
				},
				popover: {
					DEFAULT: '#FFFFFF',
					foreground: '#111827',
				},
				card: {
					DEFAULT: '#FFFFFF',
					foreground: '#111827',
				},
			},
			borderRadius: {
				xl: '0.75rem',
				'2xl': '1rem',
			},
			boxShadow: {
				glass: '0 0 0 1px rgba(255,255,255,0.05)',
				soft: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
				card: '0 2px 8px rgba(0,0,0,0.06), 0 0 1px rgba(0,0,0,0.1)',
				elevated: '0 4px 16px rgba(0,0,0,0.1), 0 0 1px rgba(0,0,0,0.1)',
				glow: '0 0 20px rgba(99,102,241,0.15)',
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
				shimmer: {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' },
				},
				fadeIn: {
					from: { opacity: '0', transform: 'translateY(4px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				shimmer: 'shimmer 2s infinite linear',
				fadeIn: 'fadeIn 0.3s ease-out',
			},
			gridTemplateColumns: {
				open: '280px 1fr',
				collapsed: '72px 1fr',
			},
			gridTemplateRows: {
				mode: '1fr 40px 40px',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}

export default config
