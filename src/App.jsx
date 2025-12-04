import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-blue-50/30'
    }`}>
      {/* Amazing New Animated Background - Mesh Gradient Style */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Large flowing gradient blobs */}
          <motion.div
            animate={{
              x: [0, 200, -100, 0],
              y: [0, 150, -50, 0],
              scale: [1, 1.3, 0.8, 1],
              rotate: [0, 90, 180, 360],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-600/40 via-purple-600/40 to-pink-600/40' 
                : 'bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20'
            }`}
          />
          <motion.div
            animate={{
              x: [0, -200, 100, 0],
              y: [0, -150, 50, 0],
              scale: [1, 0.8, 1.4, 1],
              rotate: [360, 270, 180, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl ${
              darkMode 
                ? 'bg-gradient-to-r from-purple-600/40 via-pink-600/40 to-orange-600/40' 
                : 'bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-orange-400/20'
            }`}
          />
          <motion.div
            animate={{
              x: [0, 150, -150, 0],
              y: [0, -200, 200, 0],
              scale: [1, 1.2, 0.9, 1],
              rotate: [0, -90, -180, -360],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full blur-3xl ${
              darkMode 
                ? 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30' 
                : 'bg-gradient-to-r from-cyan-400/15 to-blue-400/15'
            }`}
          />
          <motion.div
            animate={{
              x: [0, -150, 150, 0],
              y: [0, 200, -200, 0],
              scale: [1, 0.9, 1.3, 1],
              rotate: [0, 45, 90, 0],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute bottom-1/2 left-0 w-[550px] h-[550px] rounded-full blur-3xl ${
              darkMode 
                ? 'bg-gradient-to-r from-indigo-600/30 via-purple-600/30 to-pink-600/30' 
                : 'bg-gradient-to-r from-indigo-400/15 via-purple-400/15 to-pink-400/15'
            }`}
          />
          
          {/* Animated grid pattern */}
          <motion.div
            animate={{
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute inset-0 ${
              darkMode ? 'opacity-10' : 'opacity-5'
            }`}
            style={{
              backgroundImage: `linear-gradient(${darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 1px),
                                linear-gradient(90deg, ${darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Floating geometric shapes */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.sin(i) * 50, 0],
                rotate: [0, 360],
                scale: [1, 1.5, 1],
                opacity: darkMode ? [0.2, 0.5, 0.2] : [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + (i % 3),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
              className={`absolute rounded-full ${
                darkMode ? 'bg-blue-400' : 'bg-blue-500'
              }`}
              style={{
                width: `${8 + (i % 4) * 4}px`,
                height: `${8 + (i % 4) * 4}px`,
                left: `${5 + (i * 8)}%`,
                top: `${10 + (i * 7)}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <Contact darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    </div>
  )
}

export default App

