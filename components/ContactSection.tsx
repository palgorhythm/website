import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Youtube,
  ExternalLink,
  Music,
} from "lucide-react";

export default function ContactSection() {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/palgorhythm/",
      icon: <Linkedin className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600",
      description: "6,130+ connections",
    },
    {
      name: "GitHub",
      href: "https://github.com/palgorhythm",
      icon: <Github className="w-6 h-6" />,
      color: "from-gray-600 to-gray-800",
      description: "Open source projects",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/_battery/",
      icon: <Instagram className="w-6 h-6" />,
      color: "from-pink-500 to-purple-600",
      description: "Music & life updates",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/channel/UCO6KYK2RJU7ARxsLhutzeng",
      icon: <Youtube className="w-6 h-6" />,
      color: "from-red-500 to-red-600",
      description: "Music videos",
    },
    {
      name: "Bandcamp",
      href: "https://batterydrums.bandcamp.com/",
      icon: <Music className="w-6 h-6" />,
      color: "from-teal-400 to-teal-600",
      description: "BATTERY project",
    },
    {
      name: "Spotify",
      href: "https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69",
      icon: <Music className="w-6 h-6" />,
      color: "from-green-400 to-green-600",
      description: "101 track discography",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-green via-neon-cyan to-neon-pink bg-clip-text text-transparent text-glow">
              CONNECT
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Whether you're interested in collaborating on music, discussing
            technology, or exploring new opportunities, I would love to hear
            from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass rounded-lg p-4 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
              />

              <div className="relative z-10">
                <div
                  className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${link.color} mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  {link.icon}
                </div>
                <div className="text-white font-semibold group-hover:text-neon-cyan transition-colors duration-300">
                  {link.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {link.description}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center glass rounded-xl p-8"
        >
          <div className="text-gray-300 mb-4">
            Currently based in{" "}
            <span className="text-neon-cyan font-semibold">
              Los Angeles, CA
            </span>
          </div>
          <div className="text-gray-400 text-sm">
            Available for software engineering roles, music collaborations, and
            creative projects
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Jacob Richards. Building the future
              through code and music.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
