import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGlobe } from "react-icons/fa";
import { useLanguage, LANGUAGES } from "../context/LanguageContext";

const LanguageSwitcher = ({ darkMode }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang =
    LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-all duration-300 ${
          darkMode
            ? "bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white"
            : "bg-slate-200/70 hover:bg-slate-300 text-slate-700 hover:text-slate-900"
        }`}
        aria-label="Switch language"
      >
        <FaGlobe className="text-sm" />
        <span className="text-sm font-medium">{currentLang.nativeName}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute right-0 mt-2 w-48 rounded-xl shadow-2xl overflow-hidden z-50 ${
              darkMode
                ? "bg-slate-800 border border-slate-700"
                : "bg-white border border-slate-200"
            }`}
          >
            {LANGUAGES.map((lang, index) => (
              <motion.button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center space-x-3 px-4 py-3 transition-all duration-200 ${
                  language === lang.code
                    ? darkMode
                      ? "bg-blue-500/20 text-blue-400 border-l-2 border-blue-500"
                      : "bg-blue-50 text-blue-600 border-l-2 border-blue-500"
                    : darkMode
                      ? "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                } ${index === 0 ? "" : index === LANGUAGES.length - 1 ? "" : ""}`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="text-left flex-1">
                  <p className="text-sm font-semibold">{lang.nativeName}</p>
                  <p
                    className={`text-xs ${darkMode ? "text-slate-500" : "text-slate-400"}`}
                  >
                    {lang.name}
                  </p>
                </div>
                {language === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-2 h-2 rounded-full ${
                      darkMode ? "bg-blue-400" : "bg-blue-500"
                    }`}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close on click outside */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default LanguageSwitcher;
