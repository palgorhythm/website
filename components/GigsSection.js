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
      
      // Get Google service account credentials from environment
      const clientEmail = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL
      const privateKey = (process.env.NEXT_PUBLIC_GOOGLE_PRIVATE_KEY || process.env.GOOGLE_PRIVATE_KEY)?.replace(/\\n/g, '\n')
      const calendarId = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID || process.env.GOOGLE_CALENDAR_ID
      
      if (!clientEmail || !privateKey || !calendarId) {
        setGigs(getMockGigs())
        return
      }

      // Create JWT token for service account authentication
      const now = Math.floor(Date.now() / 1000)
      const header = {
        alg: 'RS256',
        typ: 'JWT'
      }
      
      const payload = {
        iss: clientEmail,
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now
      }

      // Simple JWT creation (in production, use a proper JWT library)
      const token = await createJWT(header, payload, privateKey)
      
      // Get access token
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`
      })
      
      if (!tokenResponse.ok) {
        throw new Error('Failed to get access token')
      }
      
      const tokenData = await tokenResponse.json()
      const accessToken = tokenData.access_token
      
      // Fetch calendar events (both past and future)
      const sixMonthsAgo = new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString()
      const sixMonthsFromNow = new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString()
      
      const calendarResponse = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?` +
        `timeMin=${sixMonthsAgo}&timeMax=${sixMonthsFromNow}&singleEvents=true&orderBy=startTime&q=GIG:`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      )
      
      if (!calendarResponse.ok) {
        throw new Error('Failed to fetch calendar events')
      }
      
      const calendarData = await calendarResponse.json()
      const events = calendarData.items?.map(event => {
        const originalTitle = event.summary || 'GIG: Untitled'
        
        // Parse title and location from "GIG: BAND @ LOCATION" format
        let displayTitle = originalTitle
        let parsedLocation = ''
        
        if (originalTitle.includes('@')) {
          const parts = originalTitle.split('@')
          displayTitle = parts[0].trim() // Everything before @ (including "GIG: BAND")
          if (parts.length > 1) {
            parsedLocation = parts[1].trim() // Everything after @
          }
        }
        
        // Use parsed location from title, fallback to Google Calendar location field, or empty
        const finalLocation = parsedLocation || event.location || ''
        
        return {
          id: event.id,
          title: displayTitle, // Will be "GIG: BAND" (no @)
          startDate: event.start.dateTime || event.start.date,
          endDate: event.end?.dateTime || event.end?.date,
          date: event.start.dateTime || event.start.date, // Keep for compatibility
          location: finalLocation,
          description: event.description || '',
          status: 'confirmed'
        }
      }) || []
      
      setGigs(events)
      
    } catch (err) {
      setGigs(getMockGigs())
    } finally {
      setLoading(false)
    }
  }

  // Simple JWT creation for browser (not cryptographically secure for production)
  const createJWT = async (header, payload, privateKey) => {
    const encoder = new TextEncoder()
    
    // Base64url encode header and payload
    const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    
    const message = `${encodedHeader}.${encodedPayload}`
    
    // Import private key
    const keyData = privateKey.replace(/-----BEGIN PRIVATE KEY-----/, '').replace(/-----END PRIVATE KEY-----/, '').replace(/\n/g, '')
    const keyBuffer = Uint8Array.from(atob(keyData), c => c.charCodeAt(0))
    
    const cryptoKey = await window.crypto.subtle.importKey(
      'pkcs8',
      keyBuffer,
      {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256'
      },
      false,
      ['sign']
    )
    
    // Sign the message
    const signature = await window.crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      cryptoKey,
      encoder.encode(message)
    )
    
    // Base64url encode signature
    const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
      .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
    
    return `${message}.${encodedSignature}`
  }

  const getMockGigs = () => {
    // Temporary mock data for debugging
    const now = new Date()
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    
    return [
      {
        id: 'debug-1',
        title: 'GIG: Debug Show @ Test Venue',
        startDate: nextWeek.toISOString(),
        endDate: new Date(nextWeek.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
        date: nextWeek.toISOString(),
        location: 'Debug Venue, Salt Lake City',
        description: 'This is mock data - check console for Google Calendar API errors',
        status: 'confirmed'
      }
    ]
  }

  const formatDate = (date) => {
    const formatted = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
    
    // Remove comma after weekday: "Thu, Jan 23 2025" -> "Thu Jan 23 2025"
    return formatted.replace(/,/g, '')
  }

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(date)
  }

  const formatTimeRange = (startDate, endDate) => {
    if (!startDate) return ''
    
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : null
    
    if (!end) {
      return formatTime(start)
    }
    
    // If same day, show time range
    if (start.toDateString() === end.toDateString()) {
      return `${formatTime(start)} - ${formatTime(end)}`
    }
    
    // If different days, show full date-time range
    return `${formatTime(start)} - ${formatTime(end)}`
  }

  const isUpcoming = (date) => new Date(date) > new Date()
  const upcomingGigs = gigs.filter(gig => isUpcoming(gig.date))
  const pastGigs = gigs.filter(gig => !isUpcoming(gig.date)).reverse()

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
          <div className="flex items-center justify-center mb-6">
            <Calendar className="w-8 h-8 text-accent-primary mr-3" />
            <span className="text-text-muted font-mono text-sm uppercase tracking-wider">
              Live Shows
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Upcoming
            <br />
            <span className="gradient-text font-semibold">Shows</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Catch me live - jazz, electronic sets, and everything in between.
          </p>
        </motion.div>

        {/* Upcoming Shows */}
        {upcomingGigs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <Calendar className="w-6 h-6 text-accent-primary mr-3" />
              <h3 className="text-2xl font-semibold text-text-primary">Upcoming</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingGigs.map((gig, index) => (
                <motion.div
                  key={gig.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group glass rounded-xl p-6 hover-lift transition-all duration-300"
                >
                  <div className="bg-accent-primary text-black rounded-lg p-4 mb-4 inline-block min-w-[80px]">
                    <div className="text-center">
                      <div className="text-xs font-medium">
                        {formatDate(new Date(gig.date)).split(' ')[0]}
                      </div>
                      <div className="text-lg font-bold">
                        {formatDate(new Date(gig.date)).split(' ')[1]}
                      </div>
                      <div className="text-xs font-medium">
                        {formatDate(new Date(gig.date)).split(' ')[2]}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-300">
                    {gig.title.replace('GIG: ', '')}
                  </h4>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-text-secondary">
                      <Clock className="w-4 h-4 mr-2 text-accent-secondary" />
                      <span className="text-sm">{formatTimeRange(gig.startDate, gig.endDate)}</span>
                    </div>
                    
                    {gig.location && (
                      <div className="flex items-start text-text-secondary">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 text-accent-secondary" />
                        <span className="text-sm">{gig.location}</span>
                      </div>
                    )}
                  </div>
                  
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="glass rounded-xl p-8">
              <Calendar className="w-16 h-16 text-accent-secondary mx-auto mb-4 opacity-50" />
              <h3 className="text-2xl font-semibold text-text-primary mb-4">No Shows Scheduled</h3>
              <p className="text-text-secondary mb-6">
                Stay tuned for announcements about future performances!
              </p>
              <motion.a
                href="#contact"
                className="inline-flex items-center space-x-2 bg-accent-primary hover:bg-accent-secondary text-black px-6 py-3 rounded-full font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Book a Show</span>
              </motion.a>
            </div>
          </motion.div>
        )}

        {/* Recent Shows */}
        {pastGigs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-8">
              <Music2 className="w-6 h-6 text-accent-secondary mr-3" />
              <h3 className="text-2xl font-semibold text-text-primary">Recent Shows</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastGigs.slice(0, 6).map((gig, index) => (
                <motion.div
                  key={gig.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group glass rounded-xl p-6 hover-lift transition-all duration-300 opacity-75"
                >
                  <div className="bg-accent-tertiary text-white rounded-lg p-4 mb-4 inline-block min-w-[80px]">
                    <div className="text-center">
                      <div className="text-xs font-medium">
                        {formatDate(new Date(gig.date)).split(' ')[0]}
                      </div>
                      <div className="text-lg font-bold">
                        {formatDate(new Date(gig.date)).split(' ')[1]}
                      </div>
                      <div className="text-xs font-medium">
                        {formatDate(new Date(gig.date)).split(' ')[2]}
                      </div>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-text-secondary mb-2 group-hover:text-accent-secondary transition-colors duration-300">
                    {gig.title.replace('GIG: ', '')}
                  </h4>
                  
                  {gig.location && (
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start text-text-muted">
                        <MapPin className="w-4 h-4 mr-2 mt-0.5 text-accent-tertiary" />
                        <span className="text-sm">{gig.location}</span>
                      </div>
                    </div>
                  )}
                  
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}