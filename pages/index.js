import { useState, useEffect } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import { Play, Pause, Music, Code, ExternalLink, MapPin, Calendar, Award } from 'lucide-react'
import HeroSection from '../components/HeroSection'
import MusicSection from '../components/MusicSection'
import GigsSection from '../components/GigsSection'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import Navigation from '../components/Navigation'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(null)

  return (
    <>
      <Head>
        <title>Jacob Richards - Musician & Software Engineer</title>
        <meta name="description" content="Professional drummer and software engineer. Featured on NBC New Amsterdam, Showtime Yellowjackets. Creator of BATTERY electronic music project." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen text-white relative overflow-x-hidden">
        <Navigation />
        
        {/* Floating particles background */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-neon-cyan rounded-full opacity-30"
              animate={{
                y: [-20, -100],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: '100%',
              }}
            />
          ))}
        </div>

        <main>
          <HeroSection />
          <MusicSection isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          <GigsSection />
          <AboutSection />
          <ContactSection />
        </main>

        {/* Audio visualizer overlay */}
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-yellow opacity-20" />
      </div>
    </>
  )
}