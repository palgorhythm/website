'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play, Pause, SkipBack, SkipForward, ExternalLink,
  Music, Music2, Headphones, Tv, Globe, Menu, X, ArrowDown,
  Mail, Calendar,
  Briefcase, GraduationCap, Award, Code2, MapPin, Clock, ChevronRight,
  Link, AtSign, Video, GitBranch, Disc
} from 'lucide-react'

// ─── Particle Canvas ────────────────────────────────────────────────────────

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const particles = useRef<Particle[]>([])
  const animRef = useRef<number>(0)

  const COLORS = ['#ff9fb2', '#96f2da', '#a8e6cf', '#ffe566', '#ffd6a5', '#c8b8ff']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Init particles
    particles.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2.5 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.3,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(15,15,35,0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const ps = particles.current
      const mx = mouse.current.x
      const my = mouse.current.y

      for (const p of ps) {
        // mouse attraction
        const dx = mx - p.x
        const dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          p.vx += (dx / dist) * 0.03
          p.vy += (dy / dist) * 0.03
        }

        // speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 2) { p.vx *= 2 / speed; p.vy *= 2 / speed }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        // draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.alpha
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // connection lines
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x
          const dy = ps[i].y - ps[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            const alpha = (1 - d / 100) * 0.15
            const grad = ctx.createLinearGradient(ps[i].x, ps[i].y, ps[j].x, ps[j].y)
            grad.addColorStop(0, ps[i].color)
            grad.addColorStop(1, ps[j].color)
            ctx.beginPath()
            ctx.moveTo(ps[i].x, ps[i].y)
            ctx.lineTo(ps[j].x, ps[j].y)
            ctx.strokeStyle = grad
            ctx.globalAlpha = alpha
            ctx.lineWidth = 1
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
    />
  )
}

// ─── Music Player ────────────────────────────────────────────────────────────

const TRACKS = [
  { title: 'Dial Up', ytId: 'ab7NSlilCjY' },
  { title: 'fish beat', ytId: '6NepMDywEVQ' },
  { title: 'GBA startup', ytId: 'Cilry5yHBeI' },
  { title: 'saturn', ytId: '1V-4hy1ySyk' },
  { title: 'Big Blues', ytId: '0Iu---0yzso' },
  { title: 'green mother', ytId: 'Bws0xrQndeo' },
  { title: 'roseparade', ytId: '7EMVzXaNrE8' },
  { title: 'LAZER', ytId: 'yFFJ5nqSV38' },
  { title: 'A view through the window', ytId: 'czrDzvjRqG8' },
  { title: 'Fabrica', ytId: 'Nh80wN7ep0M' },
  { title: 'Do u have Wifi', ytId: 'QNWXW5aPstU' },
]

function MusicPlayer() {
  const [expanded, setExpanded] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [trackIdx, setTrackIdx] = useState(0)

  const track = TRACKS[trackIdx]

  const prev = () => setTrackIdx(i => (i - 1 + TRACKS.length) % TRACKS.length)
  const next = () => setTrackIdx(i => (i + 1) % TRACKS.length)

  return (
    <motion.div
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
      style={{
        position: 'fixed', bottom: 24, right: 24,
        zIndex: 200, width: expanded ? 340 : 260,
        transition: 'width 0.3s',
      }}
      className="glass-strong rounded-2xl p-4 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Music2 size={16} style={{ color: '#ff6b9d' }} />
          <span style={{ fontSize: 12, fontWeight: 700, color: '#ff9fb2', letterSpacing: '0.05em' }}>battery</span>
        </div>
        <button onClick={() => setExpanded(e => !e)} style={{ color: '#55556a', padding: 4 }}>
          {expanded ? <ChevronRight size={14} /> : <Music size={14} />}
        </button>
      </div>

      {/* Track info */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700, color: '#fff', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {track.title}
        </div>
        <div style={{ fontSize: 11, color: '#55556a' }}>Track {trackIdx + 1} of {TRACKS.length}</div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: expanded ? 12 : 0 }}>
        <button onClick={prev} style={{ color: '#55556a' }}><SkipBack size={18} /></button>
        <button
          onClick={() => setPlaying(p => !p)}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          }}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button onClick={next} style={{ color: '#55556a' }}><SkipForward size={18} /></button>
        <a
          href={`https://youtube.com/watch?v=${track.ytId}`}
          target="_blank" rel="noopener noreferrer"
          style={{ color: '#55556a', marginLeft: 4 }}
        >
          <ExternalLink size={14} />
        </a>
      </div>

      {/* YouTube embed when expanded + playing */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 180, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden', borderRadius: 12, marginTop: 8 }}
          >
            <iframe
              width="100%"
              height="180"
              src={`https://www.youtube.com/embed/${track.ytId}?autoplay=${playing ? 1 : 0}`}
              title={track.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: 12 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Track list */}
      {expanded && (
        <div style={{ marginTop: 12, maxHeight: 140, overflowY: 'auto' }}>
          {TRACKS.map((t, i) => (
            <button
              key={t.ytId}
              onClick={() => { setTrackIdx(i); setPlaying(true) }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '6px 8px', borderRadius: 8, fontSize: 12,
                color: i === trackIdx ? '#ff6b9d' : '#b0b0d0',
                background: i === trackIdx ? 'rgba(255,107,157,0.1)' : 'transparent',
                fontWeight: i === trackIdx ? 700 : 400,
              }}
            >
              {t.title}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}

// ─── Gigs Section ────────────────────────────────────────────────────────────

interface GigEvent {
  id: string
  title: string
  date: string
  location?: string | null
  description?: string | null
}

function GigsSection() {
  const [upcoming, setUpcoming] = useState<GigEvent[]>([])
  const [past, setPast] = useState<GigEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/gigs.json')
      .then(r => r.json())
      .then((all: GigEvent[]) => {
        const now = new Date()
        setUpcoming(all.filter(g => new Date(g.date) >= now))
        setPast(all.filter(g => new Date(g.date) < now).reverse())
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load calendar')
        setLoading(false)
      })
  }, [])

  const formatDate = (ev: GigEvent) => {
    if (!ev.date) return ''
    return new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const GigCard = ({ ev }: { ev: GigEvent }) => (
    <div className="glass rounded-xl p-5 flex-shrink-0" style={{ width: 260 }}>
      <div style={{ fontSize: 11, color: '#ff6b9d', fontWeight: 600, letterSpacing: '0.06em', marginBottom: 6 }}>
        {formatDate(ev)}
      </div>
      <div style={{ fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 4, lineHeight: 1.3 }}>
        {ev.title}
      </div>
      {ev.location && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#55556a', fontSize: 12 }}>
          <MapPin size={11} />
          {ev.location}
        </div>
      )}
    </div>
  )

  return (
    <motion.section
      id="gigs"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ padding: '80px 0', position: 'relative', zIndex: 1 }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>shows & gigs</h2>
          <p style={{ color: '#55556a', fontSize: 15 }}>Live performances, tours, and appearances</p>
        </div>

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: 40 }}>
            <div className="loading-dot" /><div className="loading-dot" /><div className="loading-dot" />
          </div>
        )}

        {error && (
          <div className="glass rounded-2xl" style={{ padding: 32, textAlign: 'center', color: '#55556a' }}>
            <Calendar size={32} style={{ margin: '0 auto 12px', color: '#ff6b9d', display: 'block' }} />
            <p>No upcoming shows listed. Check Instagram <a href="https://www.instagram.com/_battery/" target="_blank" rel="noopener noreferrer" style={{ color: '#ff6b9d' }}>@_battery</a> for updates.</p>
          </div>
        )}

        {!loading && !error && upcoming.length === 0 && past.length === 0 && (
          <div className="glass rounded-2xl" style={{ padding: 32, textAlign: 'center', color: '#55556a' }}>
            <Calendar size={32} style={{ margin: '0 auto 12px', color: '#ff6b9d', display: 'block' }} />
            <p>No shows found. Check back soon!</p>
          </div>
        )}

        {!loading && !error && upcoming.length > 0 && (
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ color: '#4ecdc4', fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Upcoming</h3>
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 12 }}>
              {upcoming.map(ev => <GigCard key={ev.id} ev={ev} />)}
            </div>
          </div>
        )}

        {!loading && !error && past.length > 0 && (
          <div>
            <h3 style={{ color: '#444460', fontWeight: 600, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Past</h3>
            <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 12 }}>
              {past.map(ev => <GigCard key={ev.id} ev={ev} />)}
            </div>
          </div>
        )}
      </div>
    </motion.section>
  )
}

// ─── Home ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '#music', label: 'Music' },
  { href: '#gigs', label: 'Gigs' },
  { href: '#about', label: 'Expertise' },
  { href: '#contact', label: 'Contact' },
]

const STATS = [
  { value: '101+', label: 'songs recorded', color: '#ff9fb2', dark: '#1a0008' },
  { value: '4', label: 'tv & film credits', color: '#96f2da', dark: '#001a12' },
  { value: '5', label: 'major tours', color: '#ffe566', dark: '#1a1600' },
  { value: '10+', label: 'years active', color: '#c8b8ff', dark: '#0e0018' },
]

const MUSIC_CARDS = [
  {
    accent: '#ff9fb2',
    tag: 'jazz & contemporary music',
    title: 'artist collaborations',
    body: 'Performances with Oliver Tree, SPELLLING, David Binney, Steve Lehman, Myra Melford, Drew Gress, and Tia Fuller across jazz, electronic, pop, and experimental music.',
    icon: <Music2 size={20} />,
  },
  {
    accent: '#96f2da',
    tag: 'solo electronic project',
    title: 'battery',
    body: 'Drums and electronics combining jazz, electronic music, and West African percussion. Features improvised drum & bass, 8-bit jazz standards, and complex polyrhythms.',
    link: { href: 'https://batterydrums.bandcamp.com/', label: 'Explore Project' },
    icon: <Headphones size={20} />,
  },
  {
    accent: '#ffe566',
    tag: 'nbc, showtime & hbo max',
    title: 'tv & film',
    body: "Drum performances for Emmy-nominated productions including New Amsterdam, Yellowjackets, Zoey's Extraordinary Christmas, and Harley Quinn.",
    icon: <Tv size={20} />,
  },
  {
    accent: '#c8b8ff',
    tag: 'national & international',
    title: 'tours',
    tours: [
      { name: 'Button Masher US + Canada', year: '2023', href: 'https://buttonmashermusic.com/' },
      { name: 'Angelica Garcia US', year: '2021', href: 'https://www.setlist.fm/setlists/angelica-garcia-43c11f63.html' },
      { name: 'Oliver Tree US', year: '2018', href: 'https://www.setlist.fm/stats/average-setlist/oliver-tree-2bcfc89e.html?tour=6bdcdef6' },
      { name: 'Standards US', year: '2018', href: '' },
      { name: 'Sélébéyone EU', year: '2017', href: 'https://stevelehman.bandcamp.com/album/s-l-b-yone' },
      { name: 'BATTERY US', year: '2016', href: 'https://batterydrums.bandcamp.com/' },
    ],
    icon: <Globe size={20} />,
  },
]

const EXPERIENCE = [
  { role: 'adjunct professor', org: 'Westminster University', focus: 'music department', dates: '2024–present', color: '#c8b8ff' },
  { role: 'senior software engineer', org: 'Discord', focus: 'ads platform & self-expression tools', dates: '2022–present', color: '#96f2da' },
  { role: 'staff software engineer', org: 'Mothership', focus: 'freight logistics platform', dates: '2021–2022', color: '#ff9fb2' },
  { role: 'software engineer', org: 'Bird', focus: 'mobility platform', dates: '2019–2020', color: '#ffe566' },
]

const EDUCATION = [
  { degree: 'mfa', institution: 'CalArts', field: 'music', dates: '2016–2017', color: '#ff9fb2' },
  { degree: 'graduate studies', institution: 'New England Conservatory', field: 'jazz & contemporary music', dates: '2015–2016', color: '#96f2da' },
  { degree: "bachelor's", institution: 'UC Berkeley', field: 'applied mathematics & music', dates: 'summa cum laude', color: '#ffe566' },
]

const SKILLS = [
  { name: 'TypeScript', color: '#96f2da', dark: '#001a12' },
  { name: 'Python', color: '#ffe566', dark: '#1a1600' },
  { name: 'React', color: '#ff9fb2', dark: '#1a0008' },
  { name: 'Node.js', color: '#c8b8ff', dark: '#0e0018' },
  { name: 'AWS', color: '#ffd6a5', dark: '#1a0e00' },
  { name: 'Unity', color: '#a8e6cf', dark: '#001a0e' },
  { name: 'Pro Tools', color: '#ff9fb2', dark: '#1a0008' },
  { name: 'Ableton', color: '#96f2da', dark: '#001a12' },
]

const SOCIALS = [
  { label: 'linkedin', sub: '6,130+ connections', href: 'https://www.linkedin.com/in/palgorhythm/', color: '#96f2da', Icon: Link },
  { label: 'github', sub: 'open source projects', href: 'https://github.com/palgorhythm', color: '#c8b8ff', Icon: GitBranch },
  { label: 'instagram', sub: '@_battery', href: 'https://www.instagram.com/_battery/', color: '#ff9fb2', Icon: AtSign },
  { label: 'youtube', sub: 'music videos', href: 'https://www.youtube.com/channel/UCO6KYK2RJU7ARxsLhutzeng', color: '#ffe566', Icon: Video },
  { label: 'bandcamp', sub: 'battery releases', href: 'https://batterydrums.bandcamp.com/', color: '#a8e6cf', Icon: Music },
  { label: 'spotify', sub: 'full discography', href: 'https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69', color: '#ffd6a5', Icon: Disc },
]

const CONTACT_CARDS = [
  { label: 'email', desc: 'direct contact for all inquiries and collaborations', href: 'mailto:jacob.porter@example.com', linkText: 'send me an email', color: '#ff9fb2', Icon: Mail },
  { label: 'music', desc: 'recording, live shows, collaborations, battery bookings', href: 'https://www.instagram.com/_battery/', linkText: 'follow @_battery', color: '#96f2da', Icon: AtSign },
  { label: 'work', desc: 'software engineering, teaching, technical consulting', href: 'https://www.linkedin.com/in/palgorhythm/', linkText: 'connect on linkedin', color: '#ffe566', Icon: Link },
  { label: 'press', desc: 'media inquiries, interviews, and collaboration requests', href: 'mailto:jacob.porter@example.com', linkText: 'get in touch', color: '#c8b8ff', Icon: Globe },
]

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY)
      setShowTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg = scrollY > 40
    ? 'rgba(10,10,26,0.97)'
    : 'rgba(10,10,26,0.5)'

  return (
    <div style={{ minHeight: '100vh', background: '#080810', overflowX: 'hidden' }}>
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Noise overlay */}
      <svg
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100, pointerEvents: 'none', opacity: 0.015 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Music player */}
      <MusicPlayer />

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              position: 'fixed', bottom: 24, left: 24, zIndex: 200,
              width: 44, height: 44, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', boxShadow: '0 4px 16px rgba(255,107,157,0.4)',
            }}
          >
            <ArrowDown size={18} style={{ transform: 'rotate(180deg)' }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* NAV */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 150,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 32px',
          background: navBg,
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          transition: 'background 0.3s',
        }}
      >
        <a href="#top" style={{ fontSize: 16, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em' }}>
          jacob porter
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="hidden md:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                color: '#e0e0ff', fontSize: 14, fontWeight: 500,
                position: 'relative', padding: '4px 0',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget.querySelector('.nav-underline') as HTMLElement
                if (el) el.style.width = '100%'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget.querySelector('.nav-underline') as HTMLElement
                if (el) el.style.width = '0%'
              }}
            >
              {label}
              <span
                className="nav-underline"
                style={{
                  position: 'absolute', bottom: 0, left: 0,
                  height: 2, width: '0%', background: '#ff6b9d',
                  transition: 'width 0.3s', borderRadius: 1,
                }}
              />
            </a>
          ))}
          <a
            href="https://batterydrums.bandcamp.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 18px', borderRadius: 6, fontSize: 12, fontWeight: 700,
              color: '#1a0008', background: '#ff9fb2',
              letterSpacing: '0.01em',
            }}
          >
            battery
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(o => !o)}
          style={{ color: '#e0e0ff', display: 'flex' }}
          className="md:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, zIndex: 140,
              background: 'rgba(10,10,26,0.98)', backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
            }}
          >
            <div style={{ padding: '16px 32px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {NAV_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  style={{ color: '#e0e0ff', fontSize: 16, fontWeight: 600 }}
                >
                  {label}
                </a>
              ))}
              <a
                href="https://batterydrums.bandcamp.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block', padding: '10px 20px', borderRadius: 6,
                  fontSize: 13, fontWeight: 700, color: '#1a0008',
                  background: '#ff9fb2',
                  letterSpacing: '0.01em',
                  textAlign: 'center',
                }}
              >
                battery
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="top" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, type: 'spring' }}
          style={{ marginBottom: 32 }}
        >
          <div style={{
            width: 200, height: 200, borderRadius: '50%', overflow: 'hidden', margin: '0 auto',
            border: '4px solid rgba(255,107,157,0.3)',
            boxShadow: '0 0 60px rgba(255,107,157,0.25), 0 0 120px rgba(78,205,196,0.1)',
          }}>
            <img src="/inEurope.jpeg" alt="Jacob Porter" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 style={{ fontSize: 'clamp(3rem,10vw,7rem)', fontWeight: 700, lineHeight: 1.0, margin: '0 0 16px', letterSpacing: '-0.035em' }}>
            <span style={{ color: '#fff' }}>jacob </span>
            <span style={{ color: '#ff9fb2' }}>porter</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          style={{ fontSize: 'clamp(0.85rem,2vw,1.05rem)', color: '#666680', letterSpacing: '0.08em', marginBottom: 32, textTransform: 'uppercase', fontWeight: 500 }}
        >
          Drummer · Producer · Software Engineer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', marginBottom: 48 }}
        >
          <a
            href="#music"
            className="btn-primary"
            style={{ padding: '13px 28px', borderRadius: 8, fontSize: 14, display: 'inline-block' }}
          >
            explore my music
          </a>
          <a
            href="https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ padding: '13px 28px', borderRadius: 8, fontSize: 14, display: 'inline-block' }}
          >
            101 track discography
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#55556a' }}
        >
          <span style={{ fontSize: 11, letterSpacing: '0.2em' }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={20} style={{ color: '#ff6b9d' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* MUSIC */}
      <motion.section
        id="music"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ padding: '80px 24px', maxWidth: 1152, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>music</h2>
          <p style={{ color: '#55556a', maxWidth: 560, margin: '0 auto', fontSize: 15 }}>
            Over a decade of professional work across genres — jazz, electronic, TV & film, and live performance.
          </p>
        </motion.div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16, marginBottom: 48 }}>
          {STATS.map(({ value, label, color, dark }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl"
              style={{ padding: '22px 24px', textAlign: 'center', background: color }}
            >
              <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1, color: dark, marginBottom: 5 }}>{value}</div>
              <div style={{ color: dark, fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', opacity: 0.7 }}>{label}</div>
            </motion.div>
          ))}
        </div>

        {/* Music cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {MUSIC_CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl hover-lift"
              style={{ padding: 28, borderLeft: `3px solid ${card.accent}` }}
            >
              <div style={{ fontSize: 10, color: card.accent, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>{card.tag}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{card.title}</h3>
              {card.body && <p style={{ color: '#55556a', lineHeight: 1.7, fontSize: 14 }}>{card.body}</p>}
              {card.tours && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {card.tours.map(({ name, year, href }) => (
                    <li key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
                      {href ? (
                        <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#ccc', display: 'flex', alignItems: 'center', gap: 5 }}>
                          {name} <ExternalLink size={11} style={{ opacity: 0.5 }} />
                        </a>
                      ) : (
                        <span style={{ color: '#ccc' }}>{name}</span>
                      )}
                      <span style={{ color: card.accent, fontSize: 12, fontWeight: 600 }}>{year}</span>
                    </li>
                  ))}
                </ul>
              )}
              {card.link && (
                <a
                  href={card.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: card.accent, fontWeight: 700, fontSize: 13, marginTop: 12 }}
                >
                  {card.link.label} <ExternalLink size={13} />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Discography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl"
          style={{ padding: 40, textAlign: 'center', marginTop: 32 }}
        >
          <Music size={32} style={{ color: '#ff6b9d', margin: '0 auto 12px', display: 'block' }} />
          <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>complete discography</h3>
          <p style={{ color: '#55556a', marginBottom: 24 }}>From electronic experiments to jazz collaborations — all 101+ tracks on Spotify.</p>
          <a
            href="https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 28px', borderRadius: 8, fontSize: 14 }}
          >
            open discography <ExternalLink size={15} />
          </a>
        </motion.div>
      </motion.section>

      {/* GIGS */}
      <GigsSection />

      {/* EXPERTISE */}
      <motion.section
        id="about"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ padding: '80px 24px', maxWidth: 1152, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>expertise</h2>
          <p style={{ color: '#55556a', maxWidth: 560, margin: '0 auto', fontSize: 15 }}>
            Building software systems for over a decade while maintaining an active career as a musician. Currently at Discord on ads and creator tools.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl"
            style={{ padding: 32 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <span style={{ display: 'inline-block', width: 4, height: 20, background: '#ff9fb2', borderRadius: 2 }} />
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.02em', margin: 0 }}>experience</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {EXPERIENCE.map(({ role, org, focus, dates, color }) => (
                <div key={org} style={{ borderLeft: `2px solid ${color}`, paddingLeft: 16 }}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{role}</div>
                  <div style={{ fontWeight: 700, color, fontSize: 13 }}>{org}</div>
                  <div style={{ color: '#55556a', fontSize: 13 }}>{focus}</div>
                  <div style={{ color: '#55556a', fontSize: 11, marginTop: 2 }}>{dates}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education + Skills + Recognition */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl"
            style={{ padding: 32 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <span style={{ display: 'inline-block', width: 4, height: 20, background: '#96f2da', borderRadius: 2 }} />
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.02em', margin: 0 }}>education</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
              {EDUCATION.map(({ degree, institution, field, dates, color }) => (
                <div key={institution} style={{ borderLeft: `2px solid ${color}`, paddingLeft: 16 }}>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 15 }}>{degree}</div>
                  <div style={{ fontWeight: 700, color, fontSize: 13 }}>{institution}</div>
                  <div style={{ color: '#55556a', fontSize: 13 }}>{field}</div>
                  <div style={{ color: '#55556a', fontSize: 11, marginTop: 2 }}>{dates}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ display: 'inline-block', width: 4, height: 20, background: '#ffe566', borderRadius: 2 }} />
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.02em', margin: 0 }}>technical skills</h3>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
              {SKILLS.map(({ name, color, dark }) => (
                <span
                  key={name}
                  style={{
                    padding: '5px 12px', borderRadius: 4, fontSize: 12,
                    fontWeight: 600, background: color, color: dark,
                  }}
                >
                  {name}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ display: 'inline-block', width: 4, height: 20, background: '#c8b8ff', borderRadius: 2 }} />
              <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff', letterSpacing: '0.02em', margin: 0 }}>recognition</h3>
            </div>
            <ul style={{ color: '#55556a', fontSize: 13, lineHeight: 2 }}>
              <li>Patent Filed — Financial platform tooling</li>
              <li>6,130+ LinkedIn connections</li>
              <li>8.5k+ Instagram followers (@_battery)</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ padding: '80px 24px', maxWidth: 1152, margin: '0 auto', position: 'relative', zIndex: 1 }}
      >
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, color: '#fff', margin: '0 0 12px' }}>contact</h2>
          <p style={{ color: '#55556a', maxWidth: 560, margin: '0 auto', fontSize: 15 }}>
            Whether you want to collaborate on music, work on something technical, or just say hi — I&#39;d love to hear from you!
          </p>
        </motion.div>

        {/* Contact cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 32 }}>
          {CONTACT_CARDS.map(({ label, desc, href, linkText, color, Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl hover-lift"
              style={{ padding: 28, textAlign: 'center' }}
            >
              <Icon size={28} style={{ color, margin: '0 auto 12px', display: 'block' }} />
              <h3 style={{ fontSize: 18, fontWeight: 700, color, marginBottom: 8 }}>{label}</h3>
              <p style={{ color: '#55556a', fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>{desc}</p>
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                style={{ fontWeight: 700, fontSize: 13, color, display: 'inline-flex', alignItems: 'center', gap: 4 }}
              >
                {linkText} <ChevronRight size={13} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl"
          style={{ padding: 32 }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', textAlign: 'center', marginBottom: 24 }}>find me online</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            {SOCIALS.map(({ label, sub, href, color, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px', borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = color
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'
                }}
              >
                <Icon size={18} style={{ color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff', fontSize: 13 }}>{label}</div>
                  <div style={{ fontSize: 11, color }}>{sub}</div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Footer card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl"
          style={{ padding: 32, textAlign: 'center', marginTop: 32 }}
        >
          <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: '#ff9fb2' }}>jacob porter</p>
          <p style={{ color: '#444458', fontSize: 13, marginBottom: 4 }}>available for gigs, collaborations, and interesting projects</p>
          <p style={{ color: '#444458', fontSize: 12 }}>© {new Date().getFullYear()} jacob porter</p>
          <a
            href="#top"
            style={{ display: 'inline-block', marginTop: 16, color: '#96f2da', fontSize: 13, fontWeight: 500 }}
          >
            back to top ↑
          </a>
        </motion.div>
      </motion.section>
    </div>
  )
}
