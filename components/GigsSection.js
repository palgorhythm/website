import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Clock, Music2 } from 'lucide-react'

export default function GigsSection() {
  const [gigs, setGigs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGigs()
  }, [])

  const fetchGigs = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/gigs')
      if (!response.ok) throw new Error('Failed to fetch gigs')
      const data = await response.json()
      setGigs(data)
    } catch (err) {
      // Fallback to mock data
      setGigs(getMockGigs())
    } finally {
      setLoading(false)
    }
  }

  const getMockGigs = () => {
    const now = new Date()
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    
    return [
      {
        id: 'mock-1',
        title: 'GIG: Jazz Night at The Blue Note',
        date: nextWeek,
        location: 'The Blue Note, NYC',
        description: 'Performing with David Binney Quartet',
        status: 'confirmed'
      },
      {
        id: 'mock-2',
        title: 'GIG: BATTERY Live Electronic Set',
        date: nextMonth,
        location: 'Resident, Los Angeles',
        description: 'Solo electronic performance',
        status: 'confirmed'
      }
    ]
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date)
  }

  const isUpcoming = (date) => new Date(date) > new Date()
  const upcomingGigs = gigs.filter(gig => isUpcoming(gig.date))

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="glass rounded-xl p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-700 rounded mb-4 mx-auto w-64"></div>
              <div className="h-4 bg-gray-700 rounded mb-8 mx-auto w-96"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 bg-gray-700 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="gigs" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-pink via-neon-yellow to-neon-green bg-clip-text text-transparent text-glow">
              LIVE SHOWS & GIGS
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Catch me live performing jazz, electronic music, and everything in between. 
            From intimate venues to major productions.
          </p>
        </motion.div>

        {upcomingGigs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <Calendar className="w-8 h-8 text-neon-green mr-4" />
              <h3 className="text-3xl font-bold text-white">UPCOMING SHOWS</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingGigs.map((gig, index) => (
                <motion.div
                  key={gig.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group glass rounded-xl p-6 hover:scale-105 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="bg-gradient-to-br from-neon-cyan to-neon-pink rounded-lg p-3 mb-4 inline-block">
                    <div className="text-center text-black">
                      <div className="text-lg font-bold">
                        {formatDate(new Date(gig.date)).split(' ')[1]}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300">
                    {gig.title.replace('GIG: ', '')}
                  </h4>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-4 h-4 mr-2 text-neon-yellow" />
                      <span className="text-sm">{formatTime(new Date(gig.date))}</span>
                    </div>
                    
                    <div className="flex items-start text-gray-300">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 text-neon-pink" />
                      <span className="text-sm">{gig.location}</span>
                    </div>
                  </div>
                  
                  {gig.description && (
                    <p className="text-gray-400 text-sm">{gig.description}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="glass rounded-xl p-8">
              <Calendar className="w-16 h-16 text-neon-cyan mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-bold text-white mb-4">NO UPCOMING SHOWS</h3>
              <p className="text-gray-300 mb-6">
                Stay tuned for announcements about future performances!
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-neon-cyan to-neon-pink px-6 py-3 rounded-full font-semibold text-black hover:scale-105 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Book Me for a Show</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}