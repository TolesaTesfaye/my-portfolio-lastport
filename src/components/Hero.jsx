import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { FaYoutube, FaTelegram } from 'react-icons/fa'

const Hero = ({ darkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.8
      }
    },
  }

  return (
    <section id="home" className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-16 ${
      darkMode ? '' : 'bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20'
    }`}>
      {/* Additional Hero Section Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid Pattern */}
        <div className={`absolute inset-0 ${darkMode ? 'opacity-10' : 'opacity-5'}`}>
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(${darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)'} 1px, transparent 1px),
                              linear-gradient(90deg, ${darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.15)'} 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}></div>
        </div>
        
        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              opacity: darkMode ? [0.2, 0.6, 0.2] : [0.1, 0.3, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
            className={`absolute w-3 h-3 rounded-full ${
              darkMode ? 'bg-blue-400' : 'bg-blue-500/40'
            }`}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left flex-1">
            <motion.div variants={itemVariants} className="mb-8">
              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                <motion.span 
                  className="text-gradient inline-block"
                  animate={{ 
                    backgroundPosition: ['0%', '100%', '0%']
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  Tolesa Tesfaye
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className={`text-xl md:text-2xl mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              4th Year Software Engineering Student
            </motion.p>

            <motion.p
              variants={itemVariants}
              className={`text-lg md:text-xl mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Haramaya University
            </motion.p>

            <motion.p
              variants={itemVariants}
              className={`text-lg max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              Passionate Full-Stack Developer specializing in React, Node.js, and modern web technologies.
              Building innovative solutions with AI integration and mobile applications.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05, boxShadow: darkMode ? "0 10px 30px rgba(59, 130, 246, 0.5)" : "0 10px 30px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 relative overflow-hidden group ${
                  darkMode 
                    ? 'hover:shadow-purple-500/50' 
                    : 'hover:shadow-blue-500/40 text-white'
                }`}
              >
                <span className="relative z-10">Get In Touch</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, borderColor: "rgb(59, 130, 246)" }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 border-2 border-blue-500 rounded-lg font-semibold transition-all duration-300 ${
                  darkMode 
                    ? 'hover:bg-blue-500/10' 
                    : 'hover:bg-blue-50 text-blue-600 shadow-md hover:shadow-lg'
                }`}
              >
                View My Work
              </motion.a>
            </motion.div>

            {/* Social Media Links - No button animation */}
            <div className="flex justify-center lg:justify-start space-x-6">
              {[
                { icon: FaGithub, href: 'https://github.com', color: 'hover:text-gray-300', label: 'GitHub' },
                { icon: FaLinkedin, href: 'https://linkedin.com', color: 'hover:text-blue-400', label: 'LinkedIn' },
                { icon: FaYoutube, href: 'https://www.youtube.com/@tolinaaf', color: 'hover:text-red-500', label: 'YouTube' },
                { icon: FaTelegram, href: 'https://t.me/+ap3RyRf-wvEyNTg0', color: 'hover:text-blue-300', label: 'Telegram' },
                { icon: FaEnvelope, href: '#contact', color: 'hover:text-red-400', label: 'Email' },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : '_self'}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : ''}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.3, y: -8, rotate: [0, -10, 10, 0] }}
                  whileTap={{ scale: 0.9 }}
                  className={`text-3xl transition-all duration-300 ${social.color} relative group ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                  title={social.label}
                >
                  <social.icon />
                  <motion.span
                    className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 whitespace-nowrap ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}
                    initial={{ y: -5, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                  >
                    {social.label}
                  </motion.span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side - Profile Image */}
          <motion.div
            variants={imageVariants}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glowing Ring Animation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl"></div>
              </motion.div>
              
              {/* Profile Image Container */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
                className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-800">
                  {/* Your profile image */}
                  <img 
                    src="/port2/tolman.jpg" 
                    alt="Tolesa Tesfaye"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Try alternative image
                      if (e.target.src.includes('tolman.jpg')) {
                        e.target.src = '/port2/Tolli.jpg'
                      } else {
                        // Fallback to gradient if image not found
                        e.target.style.display = 'none'
                        e.target.parentElement.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      }
                    }}
                  />
                  {/* Fallback gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <span className="text-6xl font-bold text-white opacity-50">TT</span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
              ></motion.div>
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero

