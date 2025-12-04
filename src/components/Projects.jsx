import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useState } from 'react'

const Projects = ({ darkMode }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
      image: '🛒',
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'Web Development',
    },
    {
      title: 'AI-Powered Chat Application',
      description: 'Real-time chat application with AI integration for smart responses. Built with React, Socket.io, and OpenAI API.',
      technologies: ['React', 'Node.js', 'Socket.io', 'AI/ML', 'MongoDB'],
      image: '🤖',
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'AI Integration',
    },
    {
      title: 'Mobile Task Manager',
      description: 'Cross-platform mobile application for task management with offline support and cloud synchronization.',
      technologies: ['React Native', 'Node.js', 'MySQL', 'REST API'],
      image: '📱',
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'Mobile App',
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with real-time data visualization and insights.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Tailwind CSS'],
      image: '📊',
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'Web Development',
    },
    {
      title: 'Learning Management System',
      description: 'Comprehensive LMS platform for online education with video streaming, quizzes, and progress tracking.',
      technologies: ['React', 'Node.js', 'MySQL', 'Express', 'Video Streaming'],
      image: '🎓',
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'Web Development',
    },
    {
      title: 'Weather Forecast App',
      description: 'Beautiful weather application with location-based forecasts, interactive maps, and detailed analytics.',
      technologies: ['React', 'API Integration', 'Tailwind CSS', 'Chart.js'],
      image: '🌤️',
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'Web Development',
    },
    {
      title: 'Student Success App',
      description: 'Comprehensive student management application for tracking academic progress, assignments, grades, and performance analytics. Features include dashboard, grade tracking, assignment management, and progress reports.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
      image: '🎓',
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'Web Development',
    },
  ]

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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    },
  }

  return (
    <section id="projects" className={`py-20 px-4 sm:px-6 lg:px-8 ${
      darkMode 
        ? '' 
        : 'bg-gradient-to-br from-gray-50/50 via-white to-purple-50/20'
    }`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            My <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            A collection of projects showcasing my skills and experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              whileHover={{ 
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)"
              }}
              className={`group relative backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/50 border-gray-700 hover:border-blue-500/50' 
                  : 'bg-white/95 border-gray-200/80 hover:border-blue-400 shadow-xl hover:shadow-2xl'
              }`}
            >
              {/* Project Image/Icon */}
              <motion.div 
                className="h-48 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center text-6xl relative overflow-hidden"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"
                />
                <span className="relative z-10 text-7xl">{project.image}</span>
              </motion.div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-blue-400 font-semibold">{project.category}</span>
                </div>
                <h3 className={`text-xl font-semibold mb-3 group-hover:text-gradient transition-colors ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {project.title}
                </h3>
                <p className={`mb-4 line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`text-xs px-2 py-1 rounded ${
                        darkMode 
                          ? 'bg-gray-700/50 text-gray-300' 
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex items-center space-x-2 transition-colors ${
                      darkMode 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <FaGithub />
                    <span className="text-sm">Code</span>
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex items-center space-x-2 transition-colors ${
                      darkMode 
                        ? 'text-gray-400 hover:text-white' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    <FaExternalLinkAlt />
                    <span className="text-sm">Live Demo</span>
                  </motion.a>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

