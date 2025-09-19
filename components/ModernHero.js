import { motion } from 'framer-motion'
import { ArrowDown, Play, ExternalLink } from 'lucide-react'

export default function ModernHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-8">

          <h1 className="text-6xl md:text-8xl font-light mb-6 tracking-tight">
            Jacob
            <br />
            <span className="gradient-text font-semibold">Richards</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Drummer, producer, and software engineer. 
            I perform and record with artists including Oliver Tree, SPELLLING, David Binney, and Steve Lehman. 
            My work spans{' '}
            <span className="text-accent-secondary">jazz</span>,{' '}
            <span className="text-accent-tertiary">electronic music</span>, and world percussion.
          </div>
        </motion.div>

        {/* Featured Credits */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="glass rounded-2xl p-6 max-w-3xl mx-auto">
            <div className="text-sm text-text-muted mb-4 font-mono uppercase tracking-wider">
              Featured On
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-primary mb-1">NBC</div>
                <div className="text-text-secondary text-sm">New Amsterdam</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-secondary mb-1">SHOWTIME</div>
                <div className="text-text-secondary text-sm">Yellowjackets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-tertiary mb-1">101+</div>
                <div className="text-text-secondary text-sm">Songs Recorded</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#music"
            className="btn-primary group flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-5 h-5" />
            <span>Explore My Music</span>
          </motion.a>
          
          <motion.a
            href="https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary group flex items-center space-x-3 px-8 py-4 rounded-xl font-medium"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>101 Track Discography</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="flex flex-col items-center text-text-muted hover:text-text-secondary transition-colors duration-300 cursor-pointer"
            onClick={() => document.querySelector('#music')?.scrollIntoView({ behavior: 'smooth' })}
            whileHover={{ y: -2 }}
          >
            <div className="text-sm font-mono mb-2">Scroll</div>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}