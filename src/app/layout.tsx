import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import { QueryProvider } from '@/providers/QueryProvider'
import './globals.css'
import { Navbar } from '@/components/Navbar/Navbar'
import SmoothScroll from '@/components/SmoothScroll'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CineScope — Discover Movies',
    template: '%s | CineScope',
  },
  description: 'Browse, search and explore thousands of movies powered by TMDB.',
  openGraph: {
    title: 'CineScope — Discover Movies',
    description: 'Browse, search and explore thousands of movies.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${dmSans.variable}`}>
      <body>
        <QueryProvider>
          <SmoothScroll>
            <Navbar />
            <main style={{ paddingTop: '80px' }}>
              {children}
            </main>
          </SmoothScroll>
        </QueryProvider>
      </body>
    </html>
  )
}