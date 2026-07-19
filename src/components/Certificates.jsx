import { motion } from 'framer-motion'
import { FaCertificate, FaAward, FaTrophy, FaMedal, FaExternalLinkAlt, FaStar } from 'react-icons/fa'
import { SiFreecodecamp, SiSololearn, SiUdemy, SiCoursera } from 'react-icons/si'
import { useState } from 'react'
import { useLanguage } from "../context/LanguageContext";
import { translations as t } from "../translations";

const Certificates = ({ darkMode }) => {
  const { translate } = useLanguage();
  const [activeTab, setActiveTab] = useState('certificates')

  const certificates = [
    {
      title: translate(t.certFullStack),
      issuer: 'FreeCodeCamp',
      date: '2024',
      icon: SiFreecodecamp,
      color: 'from-green-500 to-emerald-500',
      link: '#',
      description: 'Comprehensive full-stack development certification covering MERN stack, APIs, and responsive design.',
    },
    {
      title: translate(t.certJava),
      issuer: 'Udemy',
      date: '2024',
      icon: SiUdemy,
      color: 'from-purple-500 to-pink-500',
      link: '#',
      description: 'In-depth Java programming course covering OOP, data structures, algorithms, and Spring Boot.',
    },
    {
      title: translate(t.certJS),
      issuer: 'FreeCodeCamp',
      date: '2023',
      icon: SiFreecodecamp,
      color: 'from-yellow-500 to-orange-500',
      link: '#',
      description: 'Mastered JavaScript fundamentals, algorithms, data structures, and problem-solving techniques.',
    },
    {
      title: translate(t.certReact),
      issuer: 'Udemy',
      date: '2024',
      icon: SiUdemy,
      color: 'from-cyan-500 to-blue-500',
      link: '#',
      description: 'Comprehensive React development including hooks, state management, and modern best practices.',
    },
    {
      title: translate(t.certPython),
      issuer: 'Sololearn',
      date: '2023',
      icon: SiSololearn,
      color: 'from-blue-500 to-indigo-500',
      link: '#',
      description: 'Data science fundamentals with Python, including pandas, numpy, and data visualization.',
    },
    {
      title: translate(t.certResponsive),
      issuer: 'FreeCodeCamp',
      date: '2023',
      icon: SiFreecodecamp,
      color: 'from-teal-500 to-green-500',
      link: '#',
      description: 'Mastered responsive design principles, CSS Grid, Flexbox, and mobile-first development.',
    },
  ]

  const achievements = [
    {
      title: 'Top Performer Award',
      description: 'Recognized as a top performer in software development projects and academic excellence.',
      icon: FaTrophy,
      color: 'from-yellow-400 to-orange-500',
    },
    {
      title: 'SuccessBridge Platform Creator',
      description: 'Developed and launched the SuccessBridge learning platform serving hundreds of students.',
      icon: FaAward,
      color: 'from-blue-400 to-purple-500',
    },
    {
      title: 'YouTube Content Creator',
      description: 'Built "Tolman Tube" channel providing educational content to thousands of students.',
      icon: FaStar,
      color: 'from-red-400 to-pink-500',
    },
    {
      title: 'Open Source Contributor',
      description: 'Active contributor to open-source projects and GitHub repositories with growing community impact.',
      icon: FaMedal,
      color: 'from-green-400 to-teal-500',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  }

  return (
    <section id="certificates" className={`py-20 px-4 sm:px-6 lg:px-8 ${
      darkMode 
        ? 'bg-slate-800/30' 
        : 'bg-gradient-to-br from-white via-slate-50/50 to-purple-50/30'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {translate(t.certTitle)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {translate(t.certSubtitle)}
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className={`inline-flex rounded-xl p-1.5 backdrop-blur-sm border ${
            darkMode 
              ? 'bg-slate-800/50 border-slate-700' 
              : 'bg-white/90 border-slate-200 shadow-lg'
          }`}>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'certificates'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : `${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`
              }`}
            >
              <FaCertificate />
              <span>{translate(t.certTabCert)}</span>
            </button>
            <button
              onClick={() => setActiveTab('achievements')}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'achievements'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : `${darkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-blue-600'}`
              }`}
            >
              <FaAward />
              <span>{translate(t.certTabAchieve)}</span>
            </button>
          </div>
        </div>

        {/* Certificates Grid */}
        {activeTab === 'certificates' && (
          <motion.div
            key="certificates"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)"
                }}
                className={`backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 relative overflow-hidden group ${
                  darkMode 
                    ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50' 
                    : 'bg-white/90 border-slate-200/80 hover:border-blue-400 shadow-xl hover:shadow-2xl'
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      className={`w-14 h-14 rounded-lg bg-gradient-to-r ${cert.color} flex items-center justify-center`}
                    >
                      <cert.icon className="text-2xl text-white" />
                    </motion.div>
                    
                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                      darkMode 
                        ? 'bg-slate-700/50 text-slate-300' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {cert.date}
                    </span>
                  </div>

                  <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                    {cert.title}
                  </h3>
                  
                  <p className={`text-sm font-medium mb-3 ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {cert.issuer}
                  </p>

                  <p className={`text-sm mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                    {cert.description}
                  </p>

                  <motion.a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, x: 5 }}
                    className={`inline-flex items-center space-x-2 text-sm font-medium transition-colors ${
                      darkMode 
                        ? 'text-blue-400 hover:text-blue-300' 
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                  >
                    <span>{translate(t.certView)}</span>
                    <FaExternalLinkAlt className="text-xs" />
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Achievements Grid */}
        {activeTab === 'achievements' && (
          <motion.div
            key="achievements"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)"
                }}
                className={`backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 relative overflow-hidden group ${
                  darkMode 
                    ? 'bg-slate-800/50 border-slate-700 hover:border-blue-500/50' 
                    : 'bg-white/90 border-slate-200/80 hover:border-blue-400 shadow-xl hover:shadow-2xl'
                }`}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <div className="relative z-10 flex items-start space-x-5">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${achievement.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <achievement.icon className="text-2xl text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      {achievement.description}
                    </p>
                    
                    {/* Decorative accent */}
                    <div className={`mt-3 w-16 h-1 rounded-full bg-gradient-to-r ${achievement.color}`}></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Certificates