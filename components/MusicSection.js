import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, ExternalLink, Music, Headphones, Radio, Disc3 } from 'lucide-react'

export default function MusicSection({ isPlaying, setIsPlaying }) {
  const [activeTrack, setActiveTrack] = useState(null)

  const featuredWork = [
    {
      id: 1,
      title: 'NBC New Amsterdam',
      description: 'Original drum performances for hit medical drama series',
      type: 'TV Score',
      icon: <Radio className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 2,
      title: 'Showtime Yellowjackets',
      description: 'Percussion work for Emmy-nominated thriller series',
      type: 'TV Score',
      icon: <Disc3 className="w-6 h-6" />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 3,
      title: 'BATTERY',
      description: 'Electronic music project using complex drum triggers and software',
      type: 'Electronic/Experimental',
      icon: <Music className="w-6 h-6" />,
      color: 'from-neon-cyan to-neon-pink',
      link: 'https://batterydrums.bandcamp.com/'
    }
  ]

  const collaborations = [
    { name: 'Steve Lehman', style: 'Jazz/Contemporary' },
    { name: 'Myra Melford', style: 'Avant-garde Jazz' },
    { name: 'Drew Gress', style: 'Modern Jazz' },
    { name: 'David Binney', style: 'Contemporary Jazz' },
    { name: 'Oliver Tree', style: 'Alternative/Electronic' },
    { name: 'SPELLLING', style: 'Art Pop/Electronic' },
    { name: 'Logan Kane', style: 'Indie/Alternative' },
    { name: 'Standards', style: 'Jazz Fusion' }
  ]

  const playTrack = (trackId) => {
    setActiveTrack(trackId)
    setIsPlaying(true)
    setTimeout(() => {
      setIsPlaying(false)
      setActiveTrack(null)
    }, 3000)
  }

  return (
    <section id="music" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-cyan bg-clip-text text-transparent text-glow">
              MUSICAL WORK
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Over 10 years of professional drumming across genres, from jazz fusion to electronic music,
            with featured work on major television productions and acclaimed records.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {featuredWork.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group glass rounded-xl p-6 hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${work.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${work.color}`}>
                    {work.icon}
                  </div>
                  <span className="text-sm text-gray-400 font-mono">{work.type}</span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{work.title}</h3>
                <p className="text-gray-300 mb-4">{work.description}</p>
                
                <div className="flex items-center justify-between">
                  <motion.button
                    onClick={() => playTrack(work.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      activeTrack === work.id && isPlaying
                        ? 'bg-neon-cyan text-black'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeTrack === work.id && isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                    <span className="text-sm font-medium">Preview</span>
                  </motion.button>
                  
                  {work.link && (
                    <motion.a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-cyan hover:text-neon-pink transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl p-8 mb-16 text-center music-visualizer"
        >
          <div className="flex items-center justify-center mb-6">
            <Headphones className="w-8 h-8 text-neon-green mr-4" />
            <h3 className="text-3xl font-bold text-neon-green">COMPLETE DISCOGRAPHY</h3>
          </div>
          <p className="text-gray-300 mb-6 text-lg">
            101 tracks spanning jazz, electronic, indie, and experimental music
          </p>
          <motion.a
            href="https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-neon-green px-8 py-4 rounded-full font-semibold text-black hover:scale-105 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Music className="w-6 h-6" />
            <span>LISTEN ON SPOTIFY</span>
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">FEATURED COLLABORATIONS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {collaborations.map((artist, index) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-lg p-4 hover:scale-105 transition-all duration-300 group"
              >
                <div className="text-white font-semibold group-hover:text-neon-cyan transition-colors duration-300">
                  {artist.name}
                </div>
                <div className="text-sm text-gray-400 mt-1">{artist.style}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}