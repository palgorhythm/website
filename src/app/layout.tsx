import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jacob Porter — Drummer, Producer & Software Engineer',
  description: 'Drummer, producer, and software engineer. TV credits include NBC New Amsterdam and Showtime Yellowjackets.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
