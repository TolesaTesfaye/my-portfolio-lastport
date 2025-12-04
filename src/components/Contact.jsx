import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaYoutube, FaTelegram } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

const Contact = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! I will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'tolesa.tesfaye@example.com',
      link: 'mailto:tolesa.tesfaye@example.com',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      value: '+251 XXX XXX XXX',
      link: 'tel:+251XXXXXXXXX',
    },
    {
      icon: FaMapMarkerAlt,
      label: 'Location',
      value: 'Haramaya University, Ethiopia',
      link: null,
    },
  ]

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaYoutube, href: 'https://www.youtube.com/@tolinaaf', label: 'YouTube' },
    { icon: FaTelegram, href: 'https://t.me/+ap3RyRf-wvEyNTg0', label: 'Telegram' },
  ]

  return (
    <section id="contact" className={`py-20 px-4 sm:px-6 lg:px-8 ${
      darkMode 
        ? 'bg-gray-800/30' 
        : 'bg-gradient-to-br from-gray-50/50 via-white to-blue-50/30'
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
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Have a project in mind? Let's work together to bring it to life!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gradient">Let's Connect</h3>
              <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I'm always open to discussing new projects, creative ideas, or opportunities 
                to be part of your visions. Feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="p-3 bg-blue-500/20 rounded-lg">
                    <info.icon className="text-blue-400 text-xl" />
                  </div>
                  <div>
                    <h4 className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {info.label}
                    </h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        className={`hover:text-blue-400 transition-colors ${
                          darkMode ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className={darkMode ? 'text-white' : 'text-gray-900'}>{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Follow Me
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 rounded-lg hover:bg-blue-500/20 transition-colors ${
                      darkMode 
                        ? 'bg-gray-700/50' 
                        : 'bg-white/80 border border-gray-200/80 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <social.icon className={`text-2xl transition-colors ${
                      darkMode 
                        ? 'text-gray-400 hover:text-blue-400' 
                        : 'text-gray-600 hover:text-blue-600'
                    }`} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`backdrop-blur-sm rounded-xl p-8 border ${
              darkMode 
                ? 'bg-gray-800/50 border-gray-700' 
                : 'bg-white/95 border-gray-200/80 shadow-2xl'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${
                    darkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${
                    darkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none ${
                    darkMode 
                      ? 'bg-gray-700/50 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <HiMail />
                <span>Send Message</span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

