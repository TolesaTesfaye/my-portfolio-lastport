import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaHome, FaUser, FaCode, FaFolderOpen, FaEnvelope, FaMoon, FaSun } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { HiCode } from 'react-icons/hi'

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home', icon: FaHome },
    { name: 'About', href: '#about', icon: FaUser },
    { name: 'Skills', href: '#skills', icon: FaCode },
    { name: 'Projects', href: '#projects', icon: FaFolderOpen },
    { name: 'Contact', href: '#contact', icon: FaEnvelope },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? darkMode 
            ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-white/98 backdrop-blur-md shadow-xl border-b border-gray-200/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative text-2xl font-bold text-gradient flex items-center"
          >
            {/* Small Logo Behind Name */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
              className="absolute -left-12 opacity-20"
            >
              <HiCode className="text-4xl text-blue-400" />
            </motion.div>
            <span className="relative z-10">Tolesa Tesfaye</span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className={`transition-colors duration-200 relative group flex items-center space-x-2 ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                <item.icon className="text-sm" />
                <span>{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            ))}
            
            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-800/50 hover:bg-gray-700' 
                  : 'bg-gray-200/50 hover:bg-gray-300'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 text-xl" />
              ) : (
                <FaMoon className="text-blue-600 text-xl" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              whileTap={{ scale: 0.9 }}
              className={darkMode ? 'text-white' : 'text-gray-900'}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={darkMode ? 'text-white' : 'text-gray-900'}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden backdrop-blur-md ${
            darkMode ? 'bg-gray-900/95' : 'bg-white/95'
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  darkMode 
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                <item.icon />
                <span>{item.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar

