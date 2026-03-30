import type { Metadata } from 'next'
import Image from 'next/image'
import profilePic from '../../public/me-in-the-flowers.png'

export const metadata: Metadata = {
  title: 'Home',
}

export default function Home() {
  return (
    <div className="bg-[#264653] rounded-lg p-5 mt-4 flex items-center gap-4">
      <div className="min-w-[20vw] max-w-[300px] flex-shrink-0">
        <Image
          src={profilePic}
          alt="Jacob Porter"
          className="rounded-lg w-full h-auto"
          priority
        />
      </div>
      <div className="flex flex-col justify-center mx-4 text-[#e9c46a]">
        <h1 className="text-2xl font-bold mb-3">🐥 hi 🐥</h1>
        <p className="mb-4 leading-relaxed">
          i&apos;m a software engineer and professional musician.
          <br />
          i&apos;ve played and toured all over the world playing with great people, like Steve
          Lehman, Myra Melford, Drew Gress, David Binney, and Oliver Tree.
          <br />
          i like to combine my love of music and code to build things, like{' '}
          <a
            href="https://batterydrums.bandcamp.com/"
            className="text-[#2a9d8f] hover:text-[#e9c46a] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            BATTERY
          </a>
          .{' '}
          <br />
          i&apos;m currently a senior software engineer at{' '}
          <a
            href="https://mothership.com"
            className="text-[#2a9d8f] hover:text-[#e9c46a] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            mothership
          </a>
          , where i work on logistics optimization.
        </p>
        <nav className="flex flex-col gap-2">
          <a
            href="https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=3IfQywgjSCyOWKFYHvxojQ"
            className="text-[#2a9d8f] hover:text-[#e9c46a] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            spotify discography
          </a>
          <a
            href="https://github.com/palgorhythm"
            className="text-[#2a9d8f] hover:text-[#e9c46a] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          <a
            href="https://linkedin.com/in/palgorhythm"
            className="text-[#2a9d8f] hover:text-[#e9c46a] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
          <a
            href="https://www.youtube.com/channel/UCO6KYK2RJU7ARxsLhutzeng"
            className="text-[#2a9d8f] hover:text-[#e9c46a] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            youtube
          </a>
          <a
            href="https://www.tiktok.com/@__battery"
            className="text-[#2a9d8f] hover:text-[#e9c46a] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            tiktok
          </a>
        </nav>
      </div>
    </div>
  )
}
