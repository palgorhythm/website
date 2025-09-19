import { motion } from 'framer-motion'
import { Code, Briefcase, GraduationCap, Award } from 'lucide-react'

export default function AboutSection() {
  const experience = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'Discord',
      period: 'Sep 2022 - Present',
      location: 'Los Angeles, CA',
      description: 'Scaling ads business and building self-expression tools for millions of users'
    },
    {
      id: 2,
      title: 'Staff Software Engineer',
      company: 'Mothership',
      period: 'Jan 2021 - Jul 2022',
      location: 'Los Angeles, CA',
      description: 'Led engineering teams and executed full-stack projects in freight logistics'
    },
    {
      id: 3,
      title: 'Software Engineer',
      company: 'Bird',
      period: 'Sep 2019 - Apr 2020',
      location: 'Los Angeles, CA',
      description: 'Built core features for millions of users including speed control and coupons'
    }
  ]

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-transparent to-dark-purple/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-neon-yellow via-neon-pink to-neon-cyan bg-clip-text text-transparent text-glow">
              ABOUT ME
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-6">
              I'm a software engineer and professional drummer who bridges the worlds of technology and music. 
              With over 10 years of experience in both fields, I create innovative solutions and compelling soundscapes.
            </p>
            <p className="text-lg text-gray-400">
              From scaling Discord's ads platform to performing on Emmy-nominated TV shows, 
              I bring the same creative problem-solving approach to every project.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-8">
              <Briefcase className="w-8 h-8 text-neon-cyan mr-4" />
              <h3 className="text-3xl font-bold text-white">PROFESSIONAL EXPERIENCE</h3>
            </div>
            
            <div className="space-y-8">
              {experience.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="glass rounded-lg p-6 hover:scale-102 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors duration-300">
                        {job.title}
                      </h4>
                      <div className="text-neon-pink font-semibold">{job.company}</div>
                    </div>
                    <div className="text-right text-sm text-gray-400">
                      <div>{job.period}</div>
                      <div>{job.location}</div>
                    </div>
                  </div>
                  <p className="text-gray-300">{job.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-6">
              <GraduationCap className="w-8 h-8 text-neon-yellow mr-4" />
              <h3 className="text-3xl font-bold text-white">EDUCATION</h3>
            </div>
            
            <div className="glass rounded-lg p-6">
              <div className="flex items-center mb-2">
                <Award className="w-5 h-5 text-neon-yellow mr-2" />
                <span className="text-neon-yellow font-semibold">Summa Cum Laude</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-1">
                University of California, Berkeley
              </h4>
              <div className="text-gray-300 mb-2">
                Double Major: Applied Mathematics & Music
              </div>
              <div className="text-neon-cyan font-mono">GPA: 3.96/4.0</div>
            </div>

            <div className="mt-8">
              <div className="flex items-center mb-6">
                <Code className="w-8 h-8 text-neon-green mr-4" />
                <h3 className="text-3xl font-bold text-white">SKILLS</h3>
              </div>
              
              <div className="glass rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-gray-300">
                  <div>TypeScript</div>
                  <div>JavaScript</div>
                  <div>Python</div>
                  <div>React</div>
                  <div>Node.js</div>
                  <div>SQL</div>
                  <div>AWS</div>
                  <div>GCP</div>
                  <div>Unity</div>
                  <div>Pro Tools</div>
                  <div>Max/MSP</div>
                  <div>Ableton Live</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass rounded-2xl p-8 bg-gradient-to-br from-neon-cyan/10 to-neon-pink/10">
            <Award className="w-12 h-12 text-neon-yellow mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">INNOVATION & RECOGNITION</h3>
            <p className="text-gray-300 text-lg">
              Filed patent for financial platform tooling at Discord • 
              Triplebyte Certified Front End Engineer • 
              6,130+ LinkedIn connections in tech and music communities
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}