import { motion } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useState } from 'react'

const Projects = ({ darkMode }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const projects = [
    {
      title: 'SuccessBridge',
      description: 'Comprehensive student management platform connecting students, teachers, and parents. Features academic progress tracking, grade management, assignment submission, and real-time communication tools.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'Tailwind CSS'],
      image: '🌉',
      github: 'https://github.com/TolesaTesfaye/SuccessBridge',
      demo: 'https://demo.com',
      category: 'Web Development',
    },
    {
      title: 'Task Management System',
      description: 'Modern task management application with drag-and-drop functionality, team collaboration, deadline tracking, and productivity analytics. Built for efficient project management.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
      image: '✅',
      github: 'https://github.com/TolesaTesfaye/Task-Managemant-System',
      demo: 'https://demo.com',
      category: 'Web Development',
    },
    {
      title: 'Personal Portfolio',
      description: 'Modern, responsive portfolio website showcasing my projects and skills. Features dark/light mode, smooth animations, and interactive components built with React and Framer Motion.',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite', 'Vercel'],
      image: '💼',
      github: 'https://github.com/TolesaTesfaye/my-portfolio-lastport',
      demo: 'https://my-portfolio-lastport.vercel.app/',
      category: 'Web Development',
    },
    {
      title: 'EAGLES TEAM Project',
      description: 'Collaborative team project showcasing teamwork and development skills. Built with modern web technologies and best practices for scalable applications.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Team Collaboration'],
      image: '🦅',
      github: 'https://github.com/TolesaTesfaye/EAGLES-TEAM-',
      demo: 'https://demo.com',
      category: 'Team Project',
    },
    {
      title: 'Database Management System',
      description: 'Comprehensive database management system with advanced querying, data visualization, backup automation, and performance monitoring. Supports multiple database engines.',
      technologies: ['Node.js', 'MySQL', 'MongoDB', 'PostgreSQL', 'Chart.js', 'Express'],
      image: '🗄️',
      github: 'https://github.com/TolesaTesfaye/database',
      demo: 'https://demo.com',
      category: 'Database',
    },
    {
      title: 'Tolesa Repository',
      description: 'Personal development repository containing various coding projects, experiments, and learning materials. Showcases continuous learning and skill development.',
      technologies: ['JavaScript', 'React', 'Node.js', 'Various Technologies'],
      image: '📚',
      github: 'https://github.com/TolesaTesfaye/Tolesa-repo',
      demo: 'https://demo.com',
      category: 'Learning & Development',
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
        : 'bg-gradient-to-br from-slate-50/50 via-white to-purple-50/20'
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
            My <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
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
                y: -5,
                scale: 1.01,
                boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)"
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
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 30, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15"
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

