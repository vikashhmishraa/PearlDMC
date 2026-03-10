import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AdminProvider } from '@/contexts/admin-context'
import { AgentProvider } from '@/contexts/agent-auth-context'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'PearlDMC | Global Destination Management Company',
  description: 'Your trusted B2B travel partner in the Philippines. PearlDMC offers premium destination management services, FIT tours, MICE solutions, and bespoke travel experiences across the Philippine islands.',
  keywords: 'DMC Philippines, B2B travel, destination management company, Philippines tours, MICE, travel agent partner',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <AdminProvider>
          <AgentProvider>
            {children}
          </AgentProvider>
        </AdminProvider>
        <Analytics />
      </body>
    </html>
  )
}
