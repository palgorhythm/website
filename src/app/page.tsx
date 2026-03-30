export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f23] text-white font-[family-name:var(--font-comfortaa)]">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md border-b border-white/10" style={{background: 'rgba(15,15,35,0.9)'}}>
        <a href="#top" className="text-xl font-bold gradient-text">Jacob Porter</a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#music" className="text-[#e0e0ff] hover:text-[#ff6b9d] transition-colors text-sm">Music</a>
          <a href="#about" className="text-[#e0e0ff] hover:text-[#ff6b9d] transition-colors text-sm">Expertise</a>
          <a href="#contact" className="text-[#e0e0ff] hover:text-[#ff6b9d] transition-colors text-sm">Contact</a>
          <a href="https://batterydrums.bandcamp.com/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-full text-sm font-semibold text-white transition-all" style={{background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)'}}>BATTERY</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
        <div className="mb-8 relative">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden mx-auto border-4 border-[#ff6b9d]/30 shadow-[0_0_60px_rgba(255,107,157,0.2)]">
            <img src="/inEurope.jpeg" alt="Jacob Porter" className="w-full h-full object-cover" />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 gradient-text">Jacob Porter</h1>
        <p className="text-xl md:text-2xl text-[#e0e0ff] mb-4">Drummer, producer, and software engineer.</p>
        <div className="flex items-center gap-3 mb-6 text-[#b0b0d0] text-sm">
          <span>NBC — New Amsterdam</span>
          <span className="text-[#ff6b9d]">·</span>
          <span>SHOWTIME — Yellowjackets</span>
        </div>
        <div className="flex items-center gap-4 mb-10 text-[#4ecdc4] font-semibold">
          <span>101+ Songs Recorded</span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="#music" className="px-8 py-3 rounded-full font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_8px_25px_rgba(255,107,157,0.4)]" style={{background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)'}}>
            Explore My Music
          </a>
          <a href="https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-full font-semibold text-white border border-white/20 hover:border-[#ff6b9d] hover:bg-white/5 transition-all">
            101 Track Discography
          </a>
        </div>
      </section>

      {/* MUSIC */}
      <section id="music" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">Music</h2>
        <p className="text-center text-[#b0b0d0] mb-6 max-w-2xl mx-auto">Over a decade of professional work across genres, from jazz performance to television production and electronic composition.</p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: '101+', label: 'Songs Recorded' },
            { value: '4', label: 'TV & Film Credits' },
            { value: '5', label: 'Major Tours' },
            { value: '10+', label: 'Years Active' },
          ].map(({ value, label }) => (
            <div key={label} className="glass rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-[#b0b0d0] text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Music cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-8">
            <div className="text-[#ff6b9d] text-xs font-semibold uppercase tracking-widest mb-2">Jazz &amp; Contemporary Music</div>
            <h3 className="text-2xl font-bold text-white mb-3">Artist Collaborations</h3>
            <p className="text-[#b0b0d0] leading-relaxed">Performances with established artists including Oliver Tree, SPELLLING, David Binney, Steve Lehman, Myra Melford, Drew Gress, and Tia Fuller. Works span jazz, electronic, pop, and experimental music.</p>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="text-[#4ecdc4] text-xs font-semibold uppercase tracking-widest mb-2">Solo Electronic Project</div>
            <h3 className="text-2xl font-bold text-white mb-3">BATTERY</h3>
            <p className="text-[#b0b0d0] leading-relaxed mb-4">Drums and electronics combining jazz, electronic music, and West African percussion. Features improvised drum &amp; bass, 8-bit jazz standards, and complex polyrhythms.</p>
            <a href="https://batterydrums.bandcamp.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#4ecdc4] hover:text-[#ff6b9d] transition-colors font-semibold text-sm">
              Explore Project →
            </a>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="text-[#ffd93d] text-xs font-semibold uppercase tracking-widest mb-2">NBC, Showtime &amp; HBO Max</div>
            <h3 className="text-2xl font-bold text-white mb-3">TV &amp; Film</h3>
            <p className="text-[#b0b0d0] leading-relaxed">Drum performances for Emmy-nominated series and productions including New Amsterdam, Yellowjackets, Zoey&apos;s Extraordinary Christmas, and Harley Quinn.</p>
          </div>

          <div className="glass rounded-2xl p-8">
            <div className="text-[#c7a8ff] text-xs font-semibold uppercase tracking-widest mb-2">National &amp; International</div>
            <h3 className="text-2xl font-bold text-white mb-3">Tours</h3>
            <ul className="text-[#b0b0d0] space-y-2">
              {[
                ['Angelica Garcia US tour', '2021'],
                ['Oliver Tree US tour', '2018'],
                ['Standards US tour', '2018'],
                ['Sélébéyone EU tour', '2017'],
                ['BATTERY US tour', '2016'],
              ].map(([name, year]) => (
                <li key={name} className="flex justify-between">
                  <span>{name}</span>
                  <span className="text-[#c7a8ff]">{year}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Discography */}
        <div className="mt-8 glass rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-3">Discography</h3>
          <p className="text-[#b0b0d0] mb-6">From electronic experiments to jazz collaborations, all 101+ tracks are available on Spotify.</p>
          <a href="https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-all hover:scale-105" style={{background: 'linear-gradient(135deg, #ff6b9d, #4ecdc4)'}}>
            Discography →
          </a>
        </div>
      </section>

      {/* EXPERTISE */}
      <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">Expertise</h2>
        <p className="text-center text-[#b0b0d0] mb-16 max-w-2xl mx-auto">I&apos;ve been building software systems for over a decade while keeping busy as a musician. Currently working at Discord on ads and creator tools.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Experience */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-bold text-[#ff6b9d] mb-6">Experience</h3>
            <div className="space-y-6">
              {[
                { role: 'Adjunct Professor', org: 'Westminster University', focus: 'Music Department', dates: '2024–Present', color: '#c7a8ff' },
                { role: 'Senior Software Engineer', org: 'Discord', focus: 'Ads Platform & Self-Expression Tools', dates: '2022–Present', color: '#4ecdc4' },
                { role: 'Staff Software Engineer', org: 'Mothership', focus: 'Freight Logistics Platform', dates: '2021–2022', color: '#ff6b9d' },
                { role: 'Software Engineer', org: 'Bird', focus: 'Mobility Platform', dates: '2019–2020', color: '#ffd93d' },
              ].map(({ role, org, focus, dates, color }) => (
                <div key={org} className="border-l-2 pl-4" style={{borderColor: color}}>
                  <div className="font-semibold text-white">{role}</div>
                  <div className="text-sm font-semibold" style={{color}}>{org}</div>
                  <div className="text-[#b0b0d0] text-sm">{focus}</div>
                  <div className="text-[#b0b0d0] text-xs mt-1">{dates}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-bold text-[#4ecdc4] mb-6">Education</h3>
            <div className="space-y-6">
              {[
                { degree: 'MFA', institution: 'CalArts', field: 'Music', dates: '2016–2017', color: '#ff6b9d' },
                { degree: 'Graduate Studies', institution: 'New England Conservatory', field: 'Jazz & Contemporary Music', dates: '2015–2016', color: '#4ecdc4' },
                { degree: "Bachelor's", institution: 'UC Berkeley', field: 'Applied Mathematics & Music', dates: 'Summa Cum Laude', color: '#ffd93d' },
              ].map(({ degree, institution, field, dates, color }) => (
                <div key={institution} className="border-l-2 pl-4" style={{borderColor: color}}>
                  <div className="font-semibold text-white">{degree}</div>
                  <div className="text-sm font-semibold" style={{color}}>{institution}</div>
                  <div className="text-[#b0b0d0] text-sm">{field}</div>
                  <div className="text-[#b0b0d0] text-xs mt-1">{dates}</div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <h3 className="text-xl font-bold text-[#ffd93d] mt-8 mb-4">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {['TypeScript', 'Python', 'React', 'Node.js', 'AWS', 'Unity', 'Pro Tools', 'Ableton'].map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full text-sm border border-white/10 text-[#e0e0ff]" style={{background: 'rgba(255,255,255,0.05)'}}>
                  {skill}
                </span>
              ))}
            </div>

            {/* Recognition */}
            <h3 className="text-xl font-bold text-[#c7a8ff] mt-8 mb-4">Recognition</h3>
            <ul className="space-y-2 text-[#b0b0d0] text-sm">
              <li>Patent Filed — Financial platform tooling</li>
              <li>6,130+ LinkedIn connections</li>
              <li>8.5k+ Instagram followers (@_battery)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 gradient-text">Contact</h2>
        <p className="text-center text-[#b0b0d0] mb-16 max-w-2xl mx-auto">Whether you want to collaborate on music, work on something technical, or just say hi — I&apos;d love to hear from you!</p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Email', desc: 'Direct contact for all inquiries and collaborations', href: 'mailto:jacob.richards33@gmail.com', linkText: 'Send me an email', color: '#ff6b9d' },
            { label: 'Music', desc: 'Recording, live shows, collaborations, BATTERY bookings', href: 'https://www.instagram.com/_battery/', linkText: 'Follow @_battery', color: '#4ecdc4' },
            { label: 'Work', desc: 'Software engineering, teaching, technical consulting', href: 'https://www.linkedin.com/in/palgorhythm/', linkText: 'Connect on LinkedIn', color: '#ffd93d' },
          ].map(({ label, desc, href, linkText, color }) => (
            <div key={label} className="glass rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-3" style={{color}}>{label}</h3>
              <p className="text-[#b0b0d0] text-sm mb-6 leading-relaxed">{desc}</p>
              <a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" className="font-semibold text-sm transition-colors hover:opacity-80" style={{color}}>
                {linkText} →
              </a>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="glass rounded-2xl p-8">
          <h3 className="text-xl font-bold text-center text-white mb-8">Find Me Online</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { label: 'LinkedIn', sub: '6,130+ connections', href: 'https://www.linkedin.com/in/palgorhythm/', color: '#4ecdc4' },
              { label: 'GitHub', sub: 'Open source projects', href: 'https://github.com/palgorhythm', color: '#c7a8ff' },
              { label: 'Instagram', sub: '@_battery updates', href: 'https://www.instagram.com/_battery/', color: '#ff6b9d' },
              { label: 'YouTube', sub: 'Music videos', href: 'https://www.youtube.com/channel/UCO6KYK2RJU7ARxsLhutzeng', color: '#ffd93d' },
              { label: 'Bandcamp', sub: 'BATTERY releases', href: 'https://batterydrums.bandcamp.com/', color: '#a8e6cf' },
              { label: 'Spotify', sub: 'Full discography', href: 'https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69', color: '#ff8fab' },
            ].map(({ label, sub, href, color }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-[#ff6b9d]/50 transition-all hover:bg-white/5">
                <div>
                  <div className="font-semibold text-white text-sm">{label}</div>
                  <div className="text-xs" style={{color}}>{sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 text-center border-t border-white/10">
        <p className="text-[#b0b0d0] mb-2">Available for gigs, collaborations, and interesting projects</p>
        <p className="text-[#b0b0d0] text-sm">© {new Date().getFullYear()} Jacob Porter. Making music and code.</p>
        <p className="text-[#b0b0d0] text-sm mt-1">jacob.richards33@gmail.com</p>
        <a href="#top" className="inline-block mt-6 text-[#ff6b9d] hover:text-[#4ecdc4] transition-colors text-sm">Back to Top ↑</a>
      </footer>
    </div>
  )
}
