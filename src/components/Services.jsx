import { motion } from 'framer-motion'
import { 
  FaCode, 
  FaYoutube, 
  FaChalkboardTeacher, 
  FaImage, 
  FaVideo, 
  FaGraduationCap,
  FaLaptopCode,
  FaPalette
} from 'react-icons/fa'
import { SiAdobephotoshop, SiCanva } from 'react-icons/si'

const Services = ({ darkMode }) => {
  const services = [
    {
      title: 'Web Development',
      description: 'Full-stack web application development using MERN stack (MongoDB, Express, React, Node.js), Java with Spring Boot, and modern technologies. Creator of SuccessBridge learning platform.',
      icon: FaCode,
      features: ['MERN Stack', 'Java & Spring Boot', 'API Development', 'Responsive Design'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Content Creation',
      description: 'YouTube content creator at "Tolman Tube" channel, creating educational content and tutorials for students and developers.',
      icon: FaYoutube,
      features: ['Educational Videos', 'Tutorial Creation', 'Student Engagement', 'Tech Content'],
      color: 'from-red-500 to-pink-500'
    },
    {
      title: 'Online Teaching',
      description: 'Passionate educator teaching students through YouTube channel, providing valuable learning resources and guidance in technology.',
      icon: FaChalkboardTeacher,
      features: ['Student Mentoring', 'Tech Education', 'Learning Resources', 'Skill Development'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Photo Editing',
      description: 'Professional photo editing services using industry-standard tools like Adobe Photoshop, Canva, and other creative software.',
      icon: FaImage,
      features: ['Adobe Photoshop', 'Canva Design', 'Image Enhancement', 'Creative Design'],
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Video Editing',
      description: 'Expert video editing services using CapCut and other professional tools for creating engaging and high-quality video content.',
      icon: FaVideo,
      features: ['CapCut Editing', 'Video Production', 'Content Optimization', 'Visual Effects'],
      color: 'from-orange-500 to-yellow-500'
    },
    {
      title: 'SuccessBridge Platform',
      description: 'Developer and creator of SuccessBridge - a comprehensive learning platform built with MERN stack, providing educational resources and reading materials for students.',
      icon: FaGraduationCap,
      features: ['MERN Stack Development', 'Resource Library', 'Student Portal', 'Educational Tools'],
      color: 'from-teal-500 to-blue-500'
    }
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
    <section id="services" className={`py-20 px-4 sm:px-6 lg:px-8 ${
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
            My <span className="text-gradient">Services</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Comprehensive services from web development to content creation and education
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
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
                <motion.div
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                  className="mb-4"
                >
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4`}>
                    <service.icon className="text-2xl text-white" />
                  </div>
                </motion.div>
                
                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  {service.title}
                </h3>
                
                <p className={`mb-4 ${darkMode ? 'text-slate-400' : 'text-slate-700'}`}>
                  {service.description}
                </p>
                
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                      <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Ready to Work Together?
          </h3>
          <p className={`text-lg mb-8 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Let's bring your ideas to life with professional development and creative services
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services