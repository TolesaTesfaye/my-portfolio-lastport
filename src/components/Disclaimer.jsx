import { motion } from 'framer-motion'
import { useEffect } from 'react'

const Disclaimer = ({ darkMode }) => {
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
            <span className="text-gradient">Disclaimer</span>
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
              General Information
            </h2>
            <p>
              The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, Tolesa Tesfaye excludes all representations, warranties, obligations, and liabilities arising out of or in connection with this website and its contents.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Professional Services Disclaimer
            </h2>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-blue-50'}`}>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Web Development Services
              </h3>
              <p>
                While I strive to provide high-quality web development services using MERN stack, Java Spring Boot, and other modern technologies, I cannot guarantee that all software will be error-free or meet all specific requirements. All development work is subject to testing and client approval.
              </p>
            </div>

            <div className={`p-4 rounded-lg mt-4 ${darkMode ? 'bg-slate-800' : 'bg-green-50'}`}>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Educational Content
              </h3>
              <p>
                The educational content provided through my "Tolman Tube" YouTube channel and other platforms is for informational purposes only. While I aim to provide accurate and up-to-date information, technology evolves rapidly, and some content may become outdated.
              </p>
            </div>

            <div className={`p-4 rounded-lg mt-4 ${darkMode ? 'bg-slate-800' : 'bg-purple-50'}`}>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Creative Services
              </h3>
              <p>
                Photo and video editing services are provided based on client specifications. Final results may vary based on source material quality and project requirements. Revisions are subject to agreed-upon terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              External Links Disclaimer
            </h2>
            <p>
              This website contains links to external websites including GitHub repositories, YouTube channels, and other platforms. I have no control over the content of these external sites and cannot be held responsible for their content, privacy policies, or practices.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>GitHub repositories may contain experimental or educational code</li>
              <li>YouTube content reflects my personal opinions and experiences</li>
              <li>Third-party links are provided for convenience only</li>
              <li>External sites may have different terms of service and privacy policies</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Technical Accuracy
            </h2>
            <p>
              While I strive to ensure that all technical information, code examples, and tutorials are accurate and functional, I cannot guarantee:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Compatibility with all systems and environments</li>
              <li>Freedom from bugs or errors in code examples</li>
              <li>Suitability for production use without modification</li>
              <li>Continued functionality as technologies evolve</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Limitation of Liability
            </h2>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900/20 border border-red-500/30' : 'bg-red-50 border border-red-200'}`}>
              <p className={`${darkMode ? 'text-red-200' : 'text-red-800'}`}>
                <strong>Important:</strong> In no event shall Tolesa Tesfaye be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of this website or services, even if advised of the possibility of such damages.
              </p>
            </div>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Project Portfolios
            </h2>
            <p>
              The projects showcased in my portfolio, including SuccessBridge, Task Management System, and others, are demonstrations of my technical capabilities. They may be:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Educational or demonstration projects</li>
              <li>Work-in-progress or experimental implementations</li>
              <li>Simplified versions of larger systems</li>
              <li>Subject to ongoing development and changes</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Changes to This Disclaimer
            </h2>
            <p>
              I reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting on this website. Your continued use of the website after any changes constitutes acceptance of the new disclaimer.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Contact Information
            </h2>
            <p>
              If you have any questions about this disclaimer or need clarification on any services, please contact me:
            </p>
            <div className={`p-4 rounded-lg mt-4 ${darkMode ? 'bg-slate-800' : 'bg-blue-50'}`}>
              <p><strong>Email:</strong> tolesatesfay273@gmail.com</p>
              <p><strong>Phone:</strong> +251 716 000 504</p>
              <p><strong>Website:</strong> <a href="#contact" className="text-blue-600 hover:underline">Contact Form</a></p>
              <p><strong>YouTube:</strong> <a href="https://www.youtube.com/@tolinaaf" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Tolman Tube Channel</a></p>
              <p><strong>GitHub:</strong> <a href="https://github.com/TolesaTesfaye" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub Profile</a></p>
            </div>
          </section>

          <section>
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-blue-900/20 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-blue-200' : 'text-blue-900'}`}>
                Professional Commitment
              </h3>
              <p className={`${darkMode ? 'text-blue-100' : 'text-blue-800'}`}>
                Despite this disclaimer, I am committed to providing professional, high-quality services and maintaining ethical standards in all my work. I strive for excellence in web development, education, and creative services while being transparent about limitations and expectations.
              </p>
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

export default Disclaimer