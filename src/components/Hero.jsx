import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { FaYoutube, FaTelegram } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { translations as t } from "../translations";

const Hero = ({ darkMode }) => {
  const { translate } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-16 ${
        darkMode
          ? ""
          : "bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30"
      }`}
    >
      {/* Additional Hero Section Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Grid Pattern */}
        <div
          className={`absolute inset-0 ${darkMode ? "opacity-10" : "opacity-5"}`}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(${darkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.15)"} 1px, transparent 1px),
                              linear-gradient(90deg, ${darkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.15)"} 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        {/* Floating Particles - Reduced count and movement */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.sin(i) * 25, 0],
              opacity: darkMode ? [0.1, 0.3, 0.1] : [0.05, 0.15, 0.05],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            className={`absolute w-2 h-2 rounded-full ${
              darkMode ? "bg-blue-400" : "bg-blue-500/40"
            }`}
            style={{
              left: `${15 + i * 20}%`,
              top: `${25 + i * 15}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Text Content */}
          <div className="text-center lg:text-left flex-1">
            <motion.div variants={itemVariants} className="mb-8">
              <motion.h1 className="text-5xl md:text-7xl font-bold mb-6">
                <motion.span
                  className="text-gradient inline-block"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  {translate(t.heroName)}
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className={`text-xl md:text-2xl mb-4 ${darkMode ? "text-slate-300" : "text-slate-700"}`}
            >
              {translate(t.heroTitle)}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className={`text-lg md:text-xl mb-8 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
            >
              {translate(t.heroUniversity)}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className={`text-lg max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700"}`}
            >
              {translate(t.heroDescription)}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8"
            >
              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.05,
                  boxShadow: darkMode
                    ? "0 10px 30px rgba(59, 130, 246, 0.5)"
                    : "0 10px 30px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 relative overflow-hidden group ${
                  darkMode
                    ? "hover:shadow-purple-500/50"
                    : "hover:shadow-blue-500/40 text-white"
                }`}
              >
                <span className="relative z-10">
                  {translate(t.heroGetInTouch)}
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05, borderColor: "rgb(59, 130, 246)" }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 border-2 border-blue-500 rounded-lg font-semibold transition-all duration-300 ${
                  darkMode
                    ? "hover:bg-blue-500/10"
                    : "hover:bg-blue-50 text-blue-600 shadow-md hover:shadow-lg"
                }`}
              >
                {translate(t.heroViewWork)}
              </motion.a>
              <motion.a
                href="/Tolesa_Tesfaye_CV.html"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, borderColor: "rgb(168, 85, 247)" }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 border-2 border-purple-500 rounded-lg font-semibold transition-all duration-300 ${
                  darkMode
                    ? "hover:bg-purple-500/10 text-purple-400"
                    : "hover:bg-purple-50 text-purple-600 shadow-md hover:shadow-lg"
                }`}
              >
                {translate(t.heroDownloadCV) || "Download CV"}
              </motion.a>
            </motion.div>

            {/* Social Media Links */}
            <div className="flex justify-center lg:justify-start space-x-6">
              {[
                {
                  icon: FaGithub,
                  href: "https://github.com",
                  color: "hover:text-gray-300",
                  label: "GitHub",
                },
                {
                  icon: FaLinkedin,
                  href: "https://linkedin.com",
                  color: "hover:text-blue-400",
                  label: "LinkedIn",
                },
                {
                  icon: FaYoutube,
                  href: "https://www.youtube.com/@tolinaaf",
                  color: "hover:text-red-500",
                  label: "YouTube",
                },
                {
                  icon: FaTelegram,
                  href: "https://t.me/+ap3RyRf-wvEyNTg0",
                  color: "hover:text-blue-300",
                  label: "Telegram",
                },
                {
                  icon: FaEnvelope,
                  href: "#contact",
                  color: "hover:text-red-400",
                  label: "Email",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    social.href.startsWith("http") ? "noopener noreferrer" : ""
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-3xl transition-all duration-300 ${social.color} relative group ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                  title={social.label}
                >
                  <social.icon />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right Side - Profile Image */}
          <motion.div
            variants={imageVariants}
            className="flex-1 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glowing Ring Animation - Slower rotation */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl"
              >
                <div className="w-full h-full rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-15 blur-xl"></div>
              </motion.div>

              {/* Profile Image Container */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-80 md:w-96 aspect-[3/4] rounded-2xl overflow-hidden border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden bg-gray-800">
                  <img
                    src="/Tolli.jpg"
                    alt={translate(t.heroName)}
                    className="w-full h-full object-contain bg-gray-800"
                    onError={(e) => {
                      if (e.target.src.includes("Tolli.jpg")) {
                        e.target.src = "/tolman.jpg";
                      } else {
                        e.target.style.display = "none";
                        e.target.parentElement.style.background =
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                      }
                    }}
                  />
                </div>
              </motion.div>

              {/* Floating Elements - Reduced movement */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/15 rounded-full blur-xl"
              ></motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500/15 rounded-full blur-xl"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
