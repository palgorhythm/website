import { google } from 'googleapis'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const { GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_CALENDAR_ID } = process.env

if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY || !GOOGLE_CALENDAR_ID) {
  console.log('⚠️  Google Calendar env vars not set — writing empty gigs.json')
  writeFileSync(join(__dirname, '../public/gigs.json'), JSON.stringify([]))
  process.exit(0)
}

const privateKey = GOOGLE_PRIVATE_KEY
  .replace(/^["']|["']$/g, '')   // strip surrounding quotes if any
  .replace(/\\n/g, '\n')          // convert escaped newlines
  .trim()

const auth = new google.auth.JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
})

const calendar = google.calendar({ version: 'v3', auth })

try {
  // Fetch a wide window: 1 year back, 2 years forward
  const timeMin = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
  const timeMax = new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000).toISOString()

  const res = await calendar.events.list({
    calendarId: GOOGLE_CALENDAR_ID,
    timeMin,
    timeMax,
    maxResults: 200,
    singleEvents: true,
    orderBy: 'startTime',
  })

  const allItems = res.data.items ?? []
  console.log(`API returned ${allItems.length} total events:`)
  allItems.forEach(e => console.log(`  [${e.start?.dateTime ?? e.start?.date}] ${e.summary}`))

  const events = allItems
    .filter(e => e.summary?.startsWith('GIG:'))
    .map(e => ({
      id: e.id,
      title: e.summary.replace(/^GIG:\s*/, ''),
      date: e.start?.dateTime ?? e.start?.date ?? '',
      location: e.location ?? null,
      description: e.description ?? null,
    }))

  writeFileSync(join(__dirname, '../public/gigs.json'), JSON.stringify(events, null, 2))
  console.log(`✅ Fetched ${events.length} gigs → public/gigs.json`)
} catch (err) {
  console.error('❌ Failed to fetch gigs:', err.message)
  writeFileSync(join(__dirname, '../public/gigs.json'), JSON.stringify([]))
  process.exit(0) // don't fail the build
}
