import { motion } from 'framer-motion'
import { useEffect } from 'react'

const CookiePolicy = ({ darkMode }) => {
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
            Cookie <span className="text-gradient">Policy</span>
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
              What Are Cookies?
            </h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              How We Use Cookies
            </h2>
            <p>
              This website uses cookies to enhance your browsing experience and provide personalized content. We use cookies for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong>Preference Cookies:</strong> Remember your settings like dark/light mode</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
              <li><strong>Performance Cookies:</strong> Improve website speed and functionality</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Types of Cookies We Use
            </h2>
            
            <div className="space-y-6">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-blue-50'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Strictly Necessary Cookies
                </h3>
                <p>
                  These cookies are essential for the website to function and cannot be switched off. They are usually set in response to actions made by you such as setting your privacy preferences or filling in forms.
                </p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-green-50'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Functional Cookies
                </h3>
                <p>
                  These cookies enable enhanced functionality and personalization, such as remembering your theme preference (dark/light mode) and language settings.
                </p>
              </div>

              <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800' : 'bg-purple-50'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Analytics Cookies
                </h3>
                <p>
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve the website experience.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Third-Party Cookies
            </h2>
            <p>
              Some cookies on our website are set by third-party services that appear on our pages. These may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Google Analytics:</strong> For website traffic analysis</li>
              <li><strong>YouTube:</strong> For embedded video content</li>
              <li><strong>GitHub:</strong> For repository integration</li>
              <li><strong>Social Media Platforms:</strong> For social sharing functionality</li>
            </ul>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Managing Cookies
            </h2>
            <p>
              You can control and manage cookies in various ways:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Browser Settings:</strong> Most browsers allow you to refuse or accept cookies</li>
              <li><strong>Delete Cookies:</strong> You can delete cookies that have already been set</li>
              <li><strong>Block Cookies:</strong> You can prevent cookies from being set in the future</li>
              <li><strong>Third-Party Tools:</strong> Use privacy tools to manage tracking</li>
            </ul>
            
            <div className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-yellow-900/20 border border-yellow-500/30' : 'bg-yellow-50 border border-yellow-200'}`}>
              <p className={`text-sm ${darkMode ? 'text-yellow-200' : 'text-yellow-800'}`}>
                <strong>Note:</strong> Disabling cookies may affect the functionality of this website and limit your user experience.
              </p>
            </div>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Cookie Consent
            </h2>
            <p>
              By continuing to use this website, you consent to our use of cookies as described in this policy. We may update this Cookie Policy from time to time to reflect changes in technology or legal requirements.
            </p>
          </section>

          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Contact Us
            </h2>
            <p>
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className={`p-4 rounded-lg mt-4 ${darkMode ? 'bg-slate-800' : 'bg-blue-50'}`}>
              <p><strong>Email:</strong> tolesatesfay273@gmail.com</p>
              <p><strong>Phone:</strong> +251 716 000 504</p>
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

export default CookiePolicy