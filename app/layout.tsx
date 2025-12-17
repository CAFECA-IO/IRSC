import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })
const url = process.env.NEXT_PUBLIC_APP_URL || 'https://irsc.isunfa.com'

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: 'iSunFA IRSC Analyst',
  description: 'AI-powered financing suitability analysis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
