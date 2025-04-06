import {
	AuthProvider,
	TanstackClientProvider,
	ThemeProvider,
	ToastProvider,
} from '@/components/providers'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import 'react-loading-skeleton/dist/skeleton.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin-ext'] })

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1.0,
	maximumScale: 1.0,
	userScalable: false,
}
export const metadata: Metadata = {
	title: 'Take-Time',
	description: 'The best to figure out your time!',
	icons: {
		icon: [
			{
				media: '(prefers-color-scheme: light)',
				url: '/favicon.svg',
			},
			{
				media: '(prefers-color-scheme: dark)',
				url: '/favicon-dark.svg',
			},
		],
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={montserrat.className}>
				<AuthProvider>
					<ThemeProvider>
						<ToastProvider>
							<TanstackClientProvider>
								{children}
								<SpeedInsights />
							</TanstackClientProvider>
						</ToastProvider>
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
