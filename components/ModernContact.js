import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Instagram, Youtube, ExternalLink, Music, MapPin, Calendar } from 'lucide-react'

export default function ModernContact() {
  const contactMethods = [
    {
      title: "Work",
      description: "Software engineering, teaching, technical consulting",
      icon: <Linkedin className="w-6 h-6" />,
      action: "Connect on LinkedIn",
      href: "https://www.linkedin.com/in/palgorhythm/",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Music",
      description: "Recording, live shows, collaborations, BATTERY bookings",
      icon: <Instagram className="w-6 h-6" />,
      action: "Follow @_battery",
      href: "https://www.instagram.com/_battery/",
      color: "from-accent-primary to-accent-secondary"
    },
    {
      title: "Code",
      description: "Open source projects, creative coding, random experiments",
      icon: <Github className="w-6 h-6" />,
      action: "Check out my GitHub",
      href: "https://github.com/palgorhythm",
      color: "from-gray-600 to-gray-800"
    }
  ]

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/palgorhythm/',
      icon: <Linkedin className="w-5 h-5" />,
      description: '6,130+ connections'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/palgorhythm',
      icon: <Github className="w-5 h-5" />,
      description: 'Open source projects'
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/_battery/',
      icon: <Instagram className="w-5 h-5" />,
      description: '@_battery updates'
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/channel/UCO6KYK2RJU7ARxsLhutzeng',
      icon: <Youtube className="w-5 h-5" />,
      description: 'Music videos'
    },
    {
      name: 'Bandcamp',
      href: 'https://batterydrums.bandcamp.com/',
      icon: <Music className="w-5 h-5" />,
      description: 'BATTERY releases'
    },
    {
      name: 'Spotify',
      href: 'https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69',
      icon: <Music className="w-5 h-5" />,
      description: 'Full discography'
    }
  ]

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center mb-6">
            <Mail className="w-8 h-8 text-accent-primary mr-3" />
            <span className="text-text-muted font-mono text-sm uppercase tracking-wider">
              Get In Touch
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-light mb-6">
            Let's
            <br />
            <span className="gradient-text font-semibold">Connect</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Whether you want to collaborate on music, work on something technical, 
            or just say hi - I'd love to hear from you!
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group glass rounded-xl p-6 hover-lift relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${method.color} mb-4`}>
                  {method.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">
                  {method.description}
                </p>
                
                {/* Action */}
                <motion.a
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-accent-primary hover:text-accent-secondary transition-colors duration-300 font-medium"
                  whileHover={{ x: 5 }}
                >
                  <span>{method.action}</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-center mb-8 text-text-primary">
            Follow the Journey
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass rounded-lg p-4 text-center hover-lift group"
              >
                <div className="flex items-center justify-center mb-3 text-accent-primary group-hover:text-accent-secondary transition-colors duration-300">
                  {link.icon}
                </div>
                <div className="text-text-primary font-medium text-sm mb-1 group-hover:text-accent-primary transition-colors duration-300">
                  {link.name}
                </div>
                <div className="text-text-muted text-xs">{link.description}</div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="glass rounded-xl p-8">
            <div className="flex items-center justify-center mb-4 text-text-secondary">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Currently based in <span className="text-accent-primary font-semibold">Salt Lake City, Utah</span></span>
            </div>
            <div className="flex items-center justify-center mb-6 text-text-muted">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Available for gigs, collaborations, and interesting projects</span>
            </div>
            <div className="border-t border-border-subtle pt-6">
              <p className="text-text-muted text-sm">
                © {new Date().getFullYear()} Jacob Richards. Making music and code.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}