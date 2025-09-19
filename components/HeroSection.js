import { motion } from 'framer-motion'
import { Play, Headphones, Sparkles } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="w-48 h-48 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan via-neon-pink to-neon-yellow rounded-full animate-pulse-slow" />
            <div className="absolute inset-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-6xl font-mono text-white">
                JR
              </div>
            </div>
            <motion.div
              className="absolute -top-4 -right-4 text-neon-yellow"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="bg-gradient-to-r from-neon-cyan via-neon-pink to-neon-yellow bg-clip-text text-transparent text-glow">
              JACOB RICHARDS
            </span>
          </h1>
          <motion.div
            className="text-2xl md:text-3xl text-gray-300 font-light mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Professional Drummer & Electronic Music Producer
          </motion.div>
          <motion.div
            className="text-lg text-neon-cyan font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            aka BATTERY // software @ Discord
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-8"
        >
          <div className="glass rounded-2xl p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <Headphones className="w-6 h-6 text-neon-pink mr-2" />
              <span className="text-neon-pink font-semibold">FEATURED ON</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-neon-cyan">NBC</div>
                <div className="text-sm">New Amsterdam</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-neon-pink">SHOWTIME</div>
                <div className="text-sm">Yellowjackets</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xl font-bold text-neon-yellow">101+ TRACKS</div>
                <div className="text-sm">Professional Sessions</div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#music"
            className="group bg-gradient-to-r from-neon-cyan to-neon-pink px-8 py-4 rounded-full font-semibold text-black hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5 group-hover:animate-pulse" />
            <span>LISTEN TO MY MUSIC</span>
          </motion.a>
          
          <motion.a
            href="https://batterydrums.bandcamp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group glass border-2 border-neon-yellow px-8 py-4 rounded-full font-semibold text-neon-yellow hover:bg-neon-yellow hover:text-black transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
            <span>BATTERY PROJECT</span>
          </motion.a>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-neon-cyan rounded-full flex justify-center">
            <div className="w-1 h-3 bg-neon-cyan rounded-full mt-2 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}