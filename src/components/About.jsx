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
    { 
      icon: FaGraduationCap, 
      number: '4th Year', 
      label: 'Student',
      description: 'Pursuing Bachelor\'s in Software Engineering at Haramaya University'
    },
    { 
      icon: FaCode, 
      number: '10+', 
      label: 'Skills',
      description: 'Full-stack development with modern frameworks and technologies'
    },
    { 
      icon: FaRocket, 
      number: 'Multiple', 
      label: 'Projects',
      description: 'Building cutting-edge solutions with AI and mobile technologies'
    },
  ]

  return (
    <section id="about" className={`py-20 px-4 sm:px-6 lg:px-8 ${
      darkMode 
        ? '' 
        : 'bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30'
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

        {/* Statistics Section - Card Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)"
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
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"
              />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="text-4xl text-blue-400 mb-4" />
                </motion.div>
                <div className="text-2xl font-bold text-gradient mb-2">{stat.number}</div>
                <h4 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {stat.label}
                </h4>
                <p className={darkMode ? 'text-slate-400' : 'text-slate-700'}>
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Text Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h3 className={`text-3xl font-semibold mb-8 text-center ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Hello, I'm <span className="text-gradient">Tolesa Tesfaye</span>
          </h3>
          
          <div className="space-y-6 text-center">
            <p className={`text-xl leading-relaxed font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
              I'm a passionate 4th-year Software Engineering student at Haramaya University, 
              dedicated to creating innovative and efficient software solutions.
            </p>
            
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              My journey in software development has been fueled by curiosity and a drive to solve 
              real-world problems through technology. With hands-on experience in full-stack development, 
              I specialize in building modern web applications using React, Node.js, and various databases.
            </p>
            
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              As a content creator, I run the <span className="text-gradient font-semibold">"Tolman Tube"</span> YouTube channel 
              where I teach students and share educational content about technology and programming. 
              I'm passionate about helping others learn and grow in their tech journey.
            </p>
            
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              I'm the developer of <span className="text-gradient font-semibold">SuccessBridge</span> - 
              an amazing learning platform that provides educational resources and reading materials for students. 
              Additionally, I offer professional services in <span className="text-gradient font-semibold">photo editing</span> using 
              Adobe Photoshop and Canva, and <span className="text-gradient font-semibold">video editing</span> using CapCut and other tools.
            </p>
            
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              I'm particularly interested in <span className="text-gradient font-semibold">AI integration</span>, 
              <span className="text-gradient font-semibold"> mobile app development</span>, and 
              <span className="text-gradient font-semibold"> creating scalable backend systems</span>.
            </p>
            
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
              Beyond coding, I enjoy learning new technologies, contributing to open-source projects, 
              and continuously improving my skills to stay at the forefront of software engineering.
            </p>
          </div>
        </motion.div>

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
                y: -8, 
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)"
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
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"
              />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
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

