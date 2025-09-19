import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, ExternalLink, Music, Headphones, Disc, Radio } from 'lucide-react'

export default function ModernMusic() {
  const [activeProject, setActiveProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: "BATTERY",
      subtitle: "Solo Electronic Project",
      description: "Drums and electronics combining jazz, electronic music, and West African percussion. Features improvised drum & bass, 8-bit jazz standards, and complex polyrhythms.",
      year: "2019 - Present",
      type: "Solo Project",
      link: "https://batterydrums.bandcamp.com/",
      color: "from-accent-primary to-accent-secondary",
      icon: <Disc className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Television",
      subtitle: "NBC & Showtime",
      description: "Drum performances for Emmy-nominated series including New Amsterdam and Yellowjackets.",
      year: "2020 - Present",
      type: "TV Scoring",
      color: "from-accent-secondary to-accent-tertiary",
      icon: <Radio className="w-6 h-6" />
    },
    {
      id: 3,
      title: "Tours",
      subtitle: "National & International",
      description: (
        <ul className="text-sm space-y-1">
          <li>• Angelica Garcia 2021 US tour</li>
          <li>• Standards 2018 US tour</li>
          <li>• Sélébéyone 2017</li>
          <li>• BATTERY 2016 US tour</li>
        </ul>
      ),
      year: "2016 - Present",
      type: "Live Performance",
      color: "from-accent-tertiary to-accent-primary",
      icon: <Music className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Jazz Collaborations",
      subtitle: "Contemporary & Experimental",
      description: "Performances with established artists including Myra Melford, Drew Gress, David Binney, and Tia Fuller. Work spans modern jazz to experimental compositions.",
      year: "2015 - Present",
      type: "Live Performance",
      color: "from-accent-secondary to-accent-tertiary",
      icon: <Music className="w-6 h-6" />
    }
  ]

  const stats = [
    { label: "Professional Tracks", value: "101+" },
    { label: "TV Productions", value: "2" },
    { label: "Live Collaborations", value: "25+" },
    { label: "Years Active", value: "10+" }
  ]

  return (
    <section id="music" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center mb-6">
            <Headphones className="w-8 h-8 text-accent-primary mr-3" />
            <span className="text-text-muted font-mono text-sm uppercase tracking-wider">
              Musical Work
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Creative
            <br />
            <span className="gradient-text font-semibold">Expression</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Over a decade of professional work across genres, from jazz performance 
            to television production and electronic composition.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center glass rounded-xl p-6"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-text-secondary text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group glass rounded-2xl p-6 hover-lift cursor-pointer relative overflow-hidden"
              onHoverStart={() => setActiveProject(project.id)}
              onHoverEnd={() => setActiveProject(null)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Project Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${project.color} mb-4`}>
                  {project.icon}
                </div>

                {/* Project Meta */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    {project.type}
                  </span>
                  <span className="text-text-muted text-xs font-mono">
                    {project.year}
                  </span>
                </div>

                {/* Project Info */}
                <h3 className="text-2xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="text-accent-secondary text-sm mb-3 font-medium">
                  {project.subtitle}
                </div>
                <div className="text-text-secondary text-sm leading-relaxed mb-6">
                  {typeof project.description === 'string' ? (
                    <p>{project.description}</p>
                  ) : (
                    project.description
                  )}
                </div>

                {/* Action */}
                {project.link && (
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-accent-primary hover:text-accent-secondary transition-colors duration-300 text-sm font-medium"
                    whileHover={{ x: 5 }}
                  >
                    <span>Explore Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spotify Discography CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-3xl font-semibold mb-4 gradient-text">
              Complete Discography
            </h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Experience the full range of my musical journey. From electronic experiments 
              to jazz collaborations, all 101+ tracks are available on Spotify.
            </p>
            <motion.a
              href="https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              <span>Listen on Spotify</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}