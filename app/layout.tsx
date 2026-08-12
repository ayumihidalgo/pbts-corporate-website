import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pbts.com.ph'),
  title: {
    default: 'PBTS Technology | Industrial Electronics Repair & Automation Engineering Philippines',
    template: '%s | PBTS Technology',
  },
  description:
    'Pro Board Technology Services Corporation (PBTS) delivers industrial electronics repair, PCB solutions, automation engineering, fabrication, construction, and technical services trusted by leading manufacturers since 2006.',
  keywords: [
    'Industrial Electronics Repair Philippines',
    'PCB Repair Philippines',
    'Automation Engineering Philippines',
    'Industrial Engineering Services',
    'Machine Rehabilitation',
    'System Integration',
    'Industrial Construction',
    'Engineering Company Philippines',
    'Manufacturing Solutions',
    'Industrial Automation',
  ],
  authors: [{ name: 'PBTS Technology' }],
  openGraph: {
    type: 'website',
    title: 'PBTS Technology | Engineering Innovation That Powers Modern Manufacturing',
    description:
      'Industrial Electronics Repair, Automation Engineering, PCB Solutions, Fabrication & Technical Services trusted by leading manufacturers since 2006.',
    siteName: 'PBTS Technology',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#13203b',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
