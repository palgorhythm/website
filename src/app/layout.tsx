import type { Metadata } from 'next'
import { Instrument_Sans } from 'next/font/google'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-instrument-sans',
})

export const metadata: Metadata = {
  title: 'jacob porter — drummer, producer & software engineer',
  description: 'drummer, producer, and software engineer. tv credits include nbc new amsterdam and showtime yellowjackets.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body>{children}</body>
    </html>
  )
}
