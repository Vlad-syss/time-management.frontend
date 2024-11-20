import {
	AuthProvider,
	TanstackClientProvider,
	ThemeProvider,
	ToastProvider,
} from '@/components/providers'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import 'react-loading-skeleton/dist/skeleton.css'
import 'rsuite/dist/rsuite-no-reset.min.css'
import './globals.css'

const montserrat = Montserrat({ subsets: ['latin-ext'] })

export const metadata:Metadata = {
  title: 'Take-Time',
  description: 'The best to figure out your time!',
  viewport: {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
  },
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
};

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
							<TanstackClientProvider>{children}</TanstackClientProvider>
						</ToastProvider>
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	)
}
