import { motion } from "framer-motion";
import {
  Code2,
  Briefcase,
  GraduationCap,
  Award,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function ModernAbout() {
  const experience = [
    {
      company: "Westminster University",
      role: "Adjunct Professor",
      period: "2024 - Present",
      location: "Salt Lake City",
      focus: "Music Department",
    },
    {
      company: "Discord",
      role: "Senior Software Engineer",
      period: "2022 - Present",
      location: "Los Angeles",
      focus: "Ads Platform & Self-Expression Tools",
    },
    {
      company: "Mothership",
      role: "Staff Software Engineer",
      period: "2021 - 2022",
      location: "Los Angeles",
      focus: "Freight Logistics Platform",
    },
    {
      company: "Bird",
      role: "Software Engineer",
      period: "2019 - 2020",
      location: "Los Angeles",
      focus: "Mobility Platform",
    },
  ];

  const skills = [
    "TypeScript",
    "Python",
    "React",
    "Node.js",
    "AWS",
    "Unity",
    "Pro Tools",
    "Ableton",
  ];

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-light mb-6 flex items-baseline justify-center">
            <Code2
              className="w-10 h-10 text-accent-tertiary mr-3"
              style={{ marginTop: "0.25rem" }}
            />
            <span className="gradient-text font-semibold">Expertise</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            I've been building software systems for over a decade while keeping
            busy as a musician. Currently working at Discord on ads and creator
            tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-8">
              <Briefcase className="w-6 h-6 text-accent-primary mr-3" />
              <h3 className="text-2xl font-semibold">Experience</h3>
            </div>

            <div className="space-y-6">
              {experience.map((job, index) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass rounded-xl p-6 hover-lift"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-semibold text-accent-primary">
                        {job.role}
                      </h4>
                      <div className="text-accent-secondary font-medium">
                        {job.company}
                      </div>
                      <div className="text-text-muted text-sm">{job.focus}</div>
                    </div>
                    <div className="text-right text-text-muted text-sm">
                      <div className="inline-block glass px-3 py-2 rounded-lg mb-2 text-accent-primary font-medium text-xs">
                        {job.period}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Education */}
            <div className="mb-12">
              <div className="flex items-center mb-8">
                <GraduationCap className="w-6 h-6 text-accent-secondary mr-3" />
                <h3 className="text-2xl font-semibold">Education</h3>
              </div>

              <div className="space-y-4">
                <div className="glass rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <Award className="w-5 h-5 text-accent-secondary mr-2" />
                    <span className="text-accent-secondary font-semibold">
                      MFA
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">CalArts</h4>
                  <div className="text-text-secondary mb-1">
                    Master of Fine Arts, Music
                  </div>
                  <div className="text-text-muted text-sm">2016-2017</div>
                </div>

                <div className="glass rounded-xl p-6">
                  <h4 className="text-lg font-semibold mb-2">
                    New England Conservatory
                  </h4>
                  <div className="text-text-secondary mb-1">
                    Graduate Studies, Jazz & Contemporary Music
                  </div>
                  <div className="text-text-muted text-sm">2015-2016</div>
                </div>

                <div className="glass rounded-xl p-6">
                  <div className="flex items-center mb-3">
                    <Award className="w-5 h-5 text-accent-secondary mr-2" />
                    <span className="text-accent-secondary font-semibold">
                      Summa Cum Laude
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">UC Berkeley</h4>
                  <div className="text-text-secondary mb-1">
                    Applied Mathematics & Music
                  </div>
                  <div className="text-text-muted text-sm">
                    Bachelor's Degree
                  </div>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <div className="flex items-center mb-8">
                <Code2 className="w-6 h-6 text-accent-tertiary mr-3" />
                <h3 className="text-2xl font-semibold">Skills</h3>
              </div>

              <div className="glass rounded-xl p-6">
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-bg-secondary text-text-secondary rounded-lg text-sm font-mono hover:text-text-primary transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16"
        >
          <div className="glass rounded-2xl p-8 text-center">
            <Award className="w-12 h-12 text-accent-secondary mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4 gradient-text">
              Recognition
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-text-secondary">
              <div>
                <div className="text-accent-primary font-semibold mb-1">
                  Patent Filed
                </div>
                <div className="text-sm">Financial platform tooling</div>
              </div>
              <div>
                <div className="text-accent-secondary font-semibold mb-1">
                  6,130+ Network
                </div>
                <div className="text-sm">LinkedIn connections</div>
              </div>
              <div>
                <div className="text-accent-tertiary font-semibold mb-1">
                  8.5k+ Followers
                </div>
                <div className="text-sm">Instagram @_battery</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
