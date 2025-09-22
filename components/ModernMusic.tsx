import React from "react";
import { motion } from "framer-motion";
import {
  Play,
  ExternalLink,
  Music,
  Headphones,
  Disc,
  Radio,
} from "lucide-react";
import { ReactNode } from "react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string | ReactNode;
  year: string;
  type: string;
  link?: string;
  color: string;
  icon: ReactNode;
}

export default function ModernMusic(): React.JSX.Element {
  const projects: Array<Project> = [
    {
      id: 4,
      title: "Artist Collaborations",
      subtitle: "Jazz & Contemporary Music",
      description:
        "Performances with established artists including Oliver Tree, SPELLLING, David Binney, Steve Lehman, Myra Melford, Drew Gress, and Tia Fuller. Works span jazz, electronic, pop, and experimental music.",
      year: "2015 - Present",
      type: "Live Performance",
      color: "from-accent-secondary to-accent-tertiary",
      icon: <Music className="w-6 h-6" />,
    },
    {
      id: 1,
      title: "BATTERY",
      subtitle: "Solo Electronic Project",
      description:
        "Drums and electronics combining jazz, electronic music, and West African percussion. Features improvised drum & bass, 8-bit jazz standards, and complex polyrhythms.",
      year: "2019 - Present",
      type: "Solo Project",
      link: "https://batterydrums.bandcamp.com/",
      color: "from-accent-primary to-accent-secondary",
      icon: <Disc className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "TV & Film",
      subtitle: "NBC, Showtime & HBO Max",
      description:
        "Drum performances for Emmy-nominated series and productions including New Amsterdam, Yellowjackets, Zoey's Extraordinary Christmas, and Harley Quinn.",
      year: "2019 - Present",
      type: "TV & Film Scoring",
      color: "from-accent-secondary to-accent-tertiary",
      icon: <Radio className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Tours",
      subtitle: "National & International",
      description: (
        <div className="text-sm space-y-1">
          <div>• Angelica Garcia US tour, 2021</div>
          <div>• Oliver Tree US tour, 2018</div>
          <div>• Standards US tour, 2018</div>
          <div>• Sélébéyone EU tour, 2017</div>
          <div>• BATTERY US tour, 2016</div>
        </div>
      ),
      year: "2016 - Present",
      type: "Live Performance",
      color: "from-accent-tertiary to-accent-primary",
      icon: <Music className="w-6 h-6" />,
    },
  ];

  const stats = [
    { label: "Songs Recorded", value: "101+" },
    { label: "TV & Film Credits", value: "4" },
    { label: "Major Tours", value: "5" },
    { label: "Years Active", value: "10+" },
  ];

  return (
    <section id="music" className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 flex items-center justify-center">
            <Headphones className="w-10 h-10 text-accent-primary mr-3" />
            <span className="gradient-text font-semibold">Music</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed px-4">
            Over a decade of professional work across genres, from jazz
            performance to television production and electronic composition.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-12 sm:mb-16 md:mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center glass rounded-xl p-4 sm:p-6"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-text-secondary text-xs sm:text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group glass rounded-2xl p-4 sm:p-6 hover-lift cursor-pointer relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Project Icon */}
                <div
                  className={`flex items-center justify-center p-3 rounded-xl bg-gradient-to-br ${project.color} mb-4 w-fit`}
                >
                  {project.icon}
                </div>

                {/* Project Meta */}
                <div className="mb-4">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-wider">
                    {project.type}
                  </span>
                </div>

                {/* Project Info */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-text-primary mb-2 group-hover:text-accent-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="text-accent-secondary text-xs sm:text-sm mb-3 font-medium">
                  {project.subtitle}
                </div>
                <div className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
                  {typeof project.description === "string" ? (
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
                    className="inline-flex items-center space-x-2 btn-secondary text-xs sm:text-sm px-3 sm:px-4 py-2 rounded-lg w-full sm:w-auto justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
          <div className="glass rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4 gradient-text">
              Complete Discography
            </h3>
            <p className="text-sm sm:text-base text-text-secondary mb-6 leading-relaxed px-4">
              From electronic experiments to jazz collaborations, all 101+
              tracks are available on Spotify.
            </p>
            <motion.a
              href="https://open.spotify.com/playlist/0IeUXYZUUB9vz172ouSQ0p?si=7702f61a363f4a69"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-5 h-5" />
              <span className="text-sm sm:text-base">Discography</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
