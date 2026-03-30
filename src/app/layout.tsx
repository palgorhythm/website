import type { Metadata } from 'next'
import { Comfortaa } from 'next/font/google'
import './globals.css'

const comfortaa = Comfortaa({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-comfortaa',
})

export const metadata: Metadata = {
  title: 'Jacob Porter — Drummer, Producer & Software Engineer',
  description: 'Drummer, producer, and software engineer. TV credits include NBC New Amsterdam and Showtime Yellowjackets.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={comfortaa.variable}>
      <body>{children}</body>
    </html>
  )
}
