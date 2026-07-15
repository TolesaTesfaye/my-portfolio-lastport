import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaTelegram,
  FaEnvelope,
} from "react-icons/fa";

const FloatingSocials = ({ darkMode }) => {
  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/TolesaTesfaye",
      label: "GitHub",
      color: "hover:text-gray-300",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@tolinaaf",
      label: "YouTube",
      color: "hover:text-red-400",
    },
    {
      icon: FaTelegram,
      href: "https://t.me/+ap3RyRf-wvEyNTg0",
      label: "Telegram",
      color: "hover:text-blue-300",
    },
    {
      icon: FaEnvelope,
      href: "#contact",
      label: "Email",
      color: "hover:text-yellow-400",
    },
  ];

  return (
    <div
      className="hidden lg:fixed lg:flex lg:flex-col lg:items-center lg:z-40"
      style={{ left: "24px", top: "50%", transform: "translateY(-50%)" }}
    >
      {/* Vertical Line */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "80px" }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`w-px bg-gradient-to-b from-transparent via-blue-500 to-purple-600`}
      />

      {/* Social Icons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-col items-center space-y-5 my-6"
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : "_self"}
            rel={social.href.startsWith("http") ? "noopener noreferrer" : ""}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
            whileHover={{ scale: 1.3, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className={`relative group transition-all duration-300 ${
              darkMode ? "text-slate-500" : "text-slate-400"
            } ${social.color}`}
            title={social.label}
          >
            <social.icon size={20} />

            {/* Tooltip */}
            <span
              className={`absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 pointer-events-none ${
                darkMode
                  ? "bg-slate-800 text-white shadow-lg shadow-black/20"
                  : "bg-white text-slate-900 shadow-lg shadow-black/10"
              }`}
            >
              {social.label}
            </span>
          </motion.a>
        ))}
      </motion.div>

      {/* Vertical Line (bottom) */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "80px" }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className={`w-px bg-gradient-to-b from-purple-600 via-blue-500 to-transparent`}
      />
    </div>
  );
};

export default FloatingSocials;
