import { motion } from 'framer-motion'
import { FaGraduationCap, FaCode, FaRocket } from 'react-icons/fa'

const About = ({ darkMode }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const stats = [
    { icon: FaGraduationCap, number: '4th Year', label: 'Student' },
    { icon: FaCode, number: '10+', label: 'Skills' },
    { icon: FaRocket, number: 'Multiple', label: 'Projects' },
  ]

  return (
    <section id="about" className={`py-20 px-4 sm:px-6 lg:px-8 ${
      darkMode 
        ? '' 
        : 'bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className={`text-3xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Hello, I'm Tolesa Tesfaye
            </h3>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              I'm a passionate 4th-year Software Engineering student at Haramaya University, 
              dedicated to creating innovative and efficient software solutions. My journey 
              in software development has been fueled by curiosity and a drive to solve 
              real-world problems through technology.
            </p>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              With hands-on experience in full-stack development, I specialize in building 
              modern web applications using React, Node.js, and various databases. I'm 
              particularly interested in AI integration, mobile app development, and creating 
              scalable backend systems.
            </p>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Beyond coding, I enjoy learning new technologies, contributing to open-source 
              projects, and continuously improving my skills to stay at the forefront of 
              software engineering.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className={`relative rounded-2xl p-8 backdrop-blur-sm border ${
              darkMode 
                ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-gray-700' 
                : 'bg-gradient-to-br from-blue-100/40 to-purple-100/40 border-gray-200/80 shadow-xl'
            }`}>
              <div className="grid grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="text-4xl text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gradient">{stat.number}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
            {[
            {
              title: 'Education',
              description: 'Pursuing Bachelor\'s in Software Engineering at Haramaya University',
              icon: FaGraduationCap,
            },
            {
              title: 'Development',
              description: 'Full-stack development with modern frameworks and technologies',
              icon: FaCode,
            },
            {
              title: 'Innovation',
              description: 'Building cutting-edge solutions with AI and mobile technologies',
              icon: FaRocket,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                scale: 1.05,
                rotate: [0, -2, 2, 0],
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              className={`backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 relative overflow-hidden group ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50' 
                  : 'bg-white/90 border-gray-200/80 hover:border-blue-400 shadow-xl hover:shadow-2xl'
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
              />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="text-4xl text-blue-400 mb-4" />
                </motion.div>
                <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.title}
                </h4>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About

