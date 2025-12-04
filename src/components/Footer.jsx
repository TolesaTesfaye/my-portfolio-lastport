import { motion } from 'framer-motion'
import { FaHeart } from 'react-icons/fa'

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`py-8 px-4 sm:px-6 lg:px-8 border-t ${
      darkMode ? 'border-gray-800' : 'border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className={`text-center md:text-left ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <p>
              © {currentYear} Tolesa Tesfaye. All rights reserved.
            </p>
          </div>
          <div className={`flex items-center space-x-2 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <span>Made with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaHeart className="text-red-500" />
            </motion.span>
            <span>using React & Tailwind CSS</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer

