import { google } from 'googleapis'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    // Check if Google Calendar credentials are available
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\\\n/g, '\\n')
    const calendarId = process.env.GOOGLE_CALENDAR_ID

    if (!clientEmail || !privateKey || !calendarId) {
      // Return mock data if credentials aren't configured
      console.log('Google Calendar credentials not configured, using mock data')
      return res.status(200).json(getMockGigs())
    }

    // Initialize Google Calendar API
    const auth = new google.auth.JWT(
      clientEmail,
      null,
      privateKey,
      ['https://www.googleapis.com/auth/calendar.readonly']
    )

    const calendar = google.calendar({ version: 'v3', auth })

    // Calculate date range (6 months back to 1 year forward)
    const now = new Date()
    const sixMonthsAgo = new Date()
    sixMonthsAgo.setMonth(now.getMonth() - 6)
    const oneYearFromNow = new Date()
    oneYearFromNow.setFullYear(now.getFullYear() + 1)

    // Fetch calendar events
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: sixMonthsAgo.toISOString(),
      timeMax: oneYearFromNow.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      q: 'GIG:', // Search for events containing "GIG:"
    })

    const events = response.data.items || []

    // Transform calendar events to gig format
    const gigs = events.map(event => {
      const startDate = event.start.dateTime 
        ? new Date(event.start.dateTime)
        : new Date(event.start.date + 'T00:00:00')

      return {
        id: event.id,
        title: event.summary || 'Untitled Gig',
        date: startDate,
        location: event.location || 'TBD',
        description: event.description || '',
        ticketLink: extractTicketLink(event.description || ''),
        status: determineStatus(event.summary, event.description),
        calendarLink: event.htmlLink
      }
    })

    res.status(200).json(gigs)
  } catch (error) {
    console.error('Error fetching calendar events:', error)
    // Return mock data on error
    res.status(200).json(getMockGigs())
  }
}

function extractTicketLink(description) {
  // Look for URLs in the description that might be ticket links
  const urlRegex = /https?:\/\/(www\.)?(eventbrite|ticketmaster|bandsintown|facebook|songkick|dice)[^\s]+/gi
  const match = description.match(urlRegex)
  return match ? match[0] : null
}

function determineStatus(title, description) {
  const titleLower = (title || '').toLowerCase()
  const descriptionLower = (description || '').toLowerCase()
  
  if (titleLower.includes('private') || descriptionLower.includes('private') || 
      titleLower.includes('session') || titleLower.includes('rehearsal')) {
    return 'private'
  }
  
  if (titleLower.includes('confirmed') || descriptionLower.includes('confirmed')) {
    return 'confirmed'
  }
  
  if (titleLower.includes('tentative') || descriptionLower.includes('tentative')) {
    return 'tentative'
  }
  
  return 'confirmed' // Default to confirmed
}

function getMockGigs() {
  // Mock data for when Google Calendar isn't configured
  const now = new Date()
  const tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)
  
  const nextWeek = new Date(now)
  nextWeek.setDate(now.getDate() + 7)
  
  const nextMonth = new Date(now)
  nextMonth.setMonth(now.getMonth() + 1)
  
  const lastWeek = new Date(now)
  lastWeek.setDate(now.getDate() - 7)
  
  return [
    {
      id: 'mock-1',
      title: 'GIG: Jazz Night at The Blue Note',
      date: nextWeek,
      location: 'The Blue Note, NYC',
      description: 'Performing with David Binney Quartet - an evening of contemporary jazz',
      ticketLink: null,
      status: 'confirmed'
    },
    {
      id: 'mock-2',
      title: 'GIG: BATTERY Live Electronic Set',
      date: nextMonth,
      location: 'Resident, Los Angeles',
      description: 'Solo electronic performance featuring live drum triggers and Max/MSP programming',
      ticketLink: null,
      status: 'confirmed'
    },
    {
      id: 'mock-3',
      title: 'GIG: Studio Session - New Album',
      date: tomorrow,
      location: 'Private Studio, Oakland',
      description: 'Recording session for upcoming collaborative album',
      ticketLink: null,
      status: 'private'
    },
    {
      id: 'mock-4',
      title: 'GIG: Standards Quartet - The Village Vanguard',
      date: lastWeek,
      location: 'The Village Vanguard, NYC',
      description: 'Three-night residency with the Standards quartet',
      ticketLink: null,
      status: 'confirmed'
    }
  ]
}