import { motion } from 'framer-motion'
import { useEffect } from 'react'

const PrivacyPolicy = ({ darkMode }) => {
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
            Privacy <span className="text-gradient">Policy</span>
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
          className={`prose prose-lg max-w-none ${
            darkMode ? 'prose-invert' : 'prose-slate'
          }`}
        >
          <div className={`space-y-8 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            <section>
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Information We Collect
              </h2>
              <p>
                When you visit my portfolio website or contact me through the contact form, I may collect certain information including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and email address (when you contact me)</li>
                <li>Browser information and IP address</li>
                <li>Pages visited and time spent on the site</li>
                <li>Device information for responsive design optimization</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                How We Use Your Information
              </h2>
              <p>
                The information collected is used to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries and messages</li>
                <li>Improve the website experience and functionality</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Provide technical support when needed</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Data Protection
              </h2>
              <p>
                I am committed to protecting your personal information. Your data is:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Never sold or shared with third parties without consent</li>
                <li>Stored securely using industry-standard practices</li>
                <li>Only accessed by authorized personnel</li>
                <li>Retained only as long as necessary</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Cookies and Analytics
              </h2>
              <p>
                This website may use cookies and analytics tools to improve user experience. These help us understand how visitors interact with the site and identify areas for improvement.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Your Rights
              </h2>
              <p>
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of communications</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Contact Information
              </h2>
              <p>
                If you have any questions about this Privacy Policy or your data, please contact me at:
              </p>
              <div className="bg-blue-50 dark:bg-slate-800 p-4 rounded-lg mt-4">
                <p><strong>Email:</strong> tolesatesfay273@gmail.com</p>
                <p><strong>Phone:</strong> +251 716 000 504</p>
                <p><strong>Website:</strong> <a href="#contact" className="text-blue-600 hover:underline">Contact Form</a></p>
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
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PrivacyPolicy