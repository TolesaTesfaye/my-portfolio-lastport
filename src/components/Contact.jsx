import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaTelegram,
} from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useLanguage } from "../context/LanguageContext";
import { translations as t } from "../translations";

const Contact = ({ darkMode }) => {
  const { translate } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  // Replace this with your own Formspree endpoint (or any form backend)
  const FORM_ENDPOINT = "https://formspree.io/f/xvkkkwbe";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(false);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "tolesatesfay273@gmail.com",
      link: "mailto:tolesatesfay273@gmail.com",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+251 716 000 504",
      link: "tel:+251716000504",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Haramaya University, Ethiopia",
      link: null,
    },
  ];

  const socialLinks = [
    { icon: FaGithub, href: "https://github.com", label: "GitHub" },
    { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@tolinaaf",
      label: "YouTube",
    },
    {
      icon: FaTelegram,
      href: "https://t.me/+ap3RyRf-wvEyNTg0",
      label: "Telegram",
    },
  ];

  return (
    <section
      id="contact"
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        darkMode
          ? "bg-slate-800/30"
          : "bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            {translate(t.contactTitle)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p
            className={`text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            {translate(t.contactSubtitle)}
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
              <h3 className="text-2xl font-semibold mb-6 text-gradient">
                {translate(t.contactTitle)}
              </h3>
              <p
                className={`mb-8 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
              >
                {translate(t.contactSubtitle)}
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
                    <h4
                      className={`text-sm mb-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {info.label}
                    </h4>
                    {info.link ? (
                      <a
                        href={info.link}
                        className={`hover:text-blue-400 transition-colors ${
                          darkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className={darkMode ? "text-white" : "text-gray-900"}>
                        {info.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4
                className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}
              >
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
                        ? "bg-gray-700/50"
                        : "bg-white/80 border border-gray-200/80 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <social.icon
                      className={`text-2xl transition-colors ${
                        darkMode
                          ? "text-gray-400 hover:text-blue-400"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    />
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
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white/95 border-gray-200/80 shadow-2xl"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {translate(t.contactName)}
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
                      ? "bg-gray-700/50 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder={translate(t.contactName)}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {translate(t.contactEmail)}
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
                      ? "bg-gray-700/50 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder={translate(t.contactEmail)}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {translate(t.contactMessage)}
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
                      ? "bg-gray-700/50 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  placeholder={translate(t.contactMessage)}
                />
              </div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={!submitting && { scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full px-8 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                  submitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/50"
                }`}
              >
                <HiMail />
                <span>{submitting ? "Sending..." : translate(t.contactSend)}</span>
              </motion.button>
              {submitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center text-sm font-medium ${
                    darkMode ? "text-green-400" : "text-green-600"
                  }`}
                >
                  {translate(t.contactSuccess)}
                </motion.p>
              )}
              {submitError && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center text-sm font-medium ${
                    darkMode ? "text-red-400" : "text-red-600"
                  }`}
                >
                  Failed to send message. Please try again or email directly.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
