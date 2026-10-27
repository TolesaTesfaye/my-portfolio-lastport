import { motion } from 'framer-motion'
import { useEffect } from 'react'

const TermsOfService = ({ darkMode }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  return (
    <div className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800' 
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`space-y-8 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}
        >
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using this portfolio website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Use License
            </h2>
            <p>
              Permission is granted to temporarily download one copy of the materials on Tolesa Tesfaye's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Services Offered
            </h2>
            <p>
              Through this website, I offer various professional services including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Web development and programming services</li>
              <li>Educational content and tutoring</li>
              <li>Photo and video editing services</li>
              <li>Consultation and technical support</li>
            </ul>
            <p className="mt-4">
              All services are provided on a professional basis with clear communication of scope, timeline, and deliverables.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Intellectual Property
            </h2>
            <p>
              All content, projects, and materials displayed on this website are the intellectual property of Tolesa Tesfaye unless otherwise stated. This includes but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Source code and software projects</li>
              <li>Educational content and tutorials</li>
              <li>Design work and creative assets</li>
              <li>Written content and documentation</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Disclaimer
            </h2>
            <p>
              The materials on this website are provided on an 'as is' basis. Tolesa Tesfaye makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Limitations
            </h2>
            <p>
              In no event shall Tolesa Tesfaye or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on this website, even if Tolesa Tesfaye or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Service, please contact me:
            </p>
            <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg mt-4">
              <p><strong>Email:</strong> tolesatesfay273@gmail.com</p>
              <p><strong>Phone:</strong> +251 975 863 448</p>
              <p><strong>Website:</strong> <a href="#contact" className="text-blue-600 hover:underline">Contact Form</a></p>
              <p><strong>YouTube:</strong> <a href="https://www.youtube.com/@tolinaaf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Tolman Tube</a></p>
            </div>
          </section>

          <section>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                Navigation
              </h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => window.location.hash = ''}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Back to Home
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`px-4 py-2 rounded-lg border transition-all duration-300 ${
                    darkMode 
                      ? 'border-slate-600 text-slate-300 hover:bg-slate-800' 
                      : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Back to Top
                </button>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsOfService