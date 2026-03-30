import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['100', '400', '700'],
  variable: '--font-noto-sans-jp',
})

export const metadata: Metadata = {
  title: {
    default: 'jacob porter',
    template: '%s | jacob porter',
  },
  description: "jacob porter's personal website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={notoSansJP.variable}>
      <body className="min-h-screen bg-[#264653] font-[family-name:var(--font-noto-sans-jp)]">
        <div className="min-h-screen flex flex-col p-4">
          <header className="bg-[#264653] text-[#e9c46a] py-3 px-4 mb-4">
            <a href="/" className="text-[#e9c46a] no-underline font-light text-lg hover:opacity-80">
              jacob porter
            </a>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="text-[#e9c46a] mt-4 text-sm">
            © {new Date().getFullYear()}, jacob porter
          </footer>
        </div>
      </body>
    </html>
  )
}
