import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaCode,
  FaFolderOpen,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaCogs,
  FaCertificate,
  FaRoad,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { HiCode } from "react-icons/hi";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import { translations as t } from "../translations";

const Navbar = ({
  darkMode,
  setDarkMode,
  currentPage,
  setCurrentPage,
  navigateToSection,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { translate } = useLanguage();

  const navItems = [
    {
      name: translate(t.navHome),
      href: "#home",
      icon: FaHome,
      sectionId: "home",
    },
    {
      name: translate(t.navAbout),
      href: "#about",
      icon: FaUser,
      sectionId: "about",
    },
    {
      name: translate(t.navServices),
      href: "#services",
      icon: FaCogs,
      sectionId: "services",
    },
    {
      name: translate(t.navSkills),
      href: "#skills",
      icon: FaCode,
      sectionId: "skills",
    },
    {
      name: translate(t.navProjects),
      href: "#projects",
      icon: FaFolderOpen,
      sectionId: "projects",
    },
    {
      name: translate(t.navCertificates),
      href: "#certificates",
      icon: FaCertificate,
      sectionId: "certificates",
    },
    {
      name: translate(t.navJourney),
      href: "#journey",
      icon: FaRoad,
      sectionId: "journey",
    },
    {
      name: translate(t.navContact),
      href: "#contact",
      icon: FaEnvelope,
      sectionId: "contact",
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? "bg-slate-900/95 backdrop-blur-md shadow-xl border-b border-slate-700/50"
            : "bg-white/95 backdrop-blur-md shadow-xl border-b border-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-3"
          >
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              className="relative"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg border-2 ${
                  darkMode
                    ? "bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400/50 text-white"
                    : "bg-gradient-to-br from-blue-500 to-purple-600 border-blue-400/50 text-white shadow-lg"
                }`}
              >
                TT
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 opacity-20 blur-md -z-10"></div>
            </motion.div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => navigateToSection(item.sectionId)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                className={`transition-colors duration-200 relative group flex items-center space-x-2 ${
                  darkMode
                    ? "text-slate-300 hover:text-white"
                    : "text-slate-700 hover:text-blue-600"
                }`}
              >
                <item.icon className="text-sm" />
                <span className="text-nowrap">{item.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </motion.button>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher darkMode={darkMode} />

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg transition-colors ${
                darkMode
                  ? "bg-slate-800/50 hover:bg-slate-700"
                  : "bg-slate-200/50 hover:bg-slate-300"
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <FaSun className="text-yellow-400 text-xl" />
              ) : (
                <FaMoon className="text-blue-600 text-xl" />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              onClick={() => setDarkMode(!darkMode)}
              whileTap={{ scale: 0.9 }}
              className={darkMode ? "text-white" : "text-gray-900"}
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.button>
            <LanguageSwitcher darkMode={darkMode} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={darkMode ? "text-white" : "text-gray-900"}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={`md:hidden backdrop-blur-md ${
            darkMode ? "bg-slate-900/95" : "bg-white/95"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setIsOpen(false);
                  navigateToSection(item.sectionId);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors w-full text-left ${
                  darkMode
                    ? "text-slate-300 hover:text-white hover:bg-slate-800"
                    : "text-slate-700 hover:text-blue-600 hover:bg-slate-100"
                }`}
              >
                <item.icon />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
