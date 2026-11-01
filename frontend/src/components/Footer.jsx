import { motion } from "framer-motion";
import {
  FaHeart,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaTelegram,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { translations as t } from "../translations";
import { usePortfolioData } from "../context/PortfolioDataContext";

const iconForPlatform = (platform) => {
  const value = platform.toLowerCase();
  if (value.includes("github")) return FaGithub;
  if (value.includes("linkedin")) return FaLinkedin;
  if (value.includes("youtube")) return FaYoutube;
  if (value.includes("telegram")) return FaTelegram;
  if (value.includes("email")) return FaEnvelope;
  return FaLink;
};

const Footer = ({ darkMode, navigateToSection, currentPage }) => {
  const { translate } = useLanguage();
  const { data } = usePortfolioData();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: translate(t.navAbout), sectionId: "about" },
      { name: translate(t.navServices), sectionId: "services" },
      { name: translate(t.navSkills), sectionId: "skills" },
      { name: translate(t.navProjects), sectionId: "projects" },
      { name: translate(t.navCertificates), sectionId: "certificates" },
      { name: translate(t.navJourney), sectionId: "journey" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#privacy-policy" },
      { name: "Terms of Service", href: "#terms-of-service" },
      { name: "Cookie Policy", href: "#cookie-policy" },
      { name: "Disclaimer", href: "#disclaimer" },
    ],
    resources: [
      {
        name: "SuccessBridge Platform",
        href: "https://github.com/TolesaTesfaye/SuccessBridge",
      },
      {
        name: "Tolman Tube Channel",
        href: "https://www.youtube.com/@tolinaaf",
      },
      { name: "GitHub Portfolio", href: "https://github.com/TolesaTesfaye" },
      {
        name: "Learning Resources",
        href: "https://github.com/TolesaTesfaye/Tolesa-repo",
      },
      {
        name: "Download CV / Resume",
        href: "/Tolesa Tesfaye - Software Engineer CV.pdf",
      },
    ],
    contact: [
      { name: "Email", href: "mailto:tolesatesfay273@gmail.com" },
      { name: "Phone", href: "tel:+251975863448" },
      { name: "Telegram", href: "https://t.me/+ap3RyRf-wvEyNTg0" },
      { name: "Location", sectionId: "contact" },
    ],
  };

  const staticSocialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/TolesaTesfaye",
      label: "GitHub",
    },
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
    { icon: FaEnvelope, href: "#contact", label: "Email" },
  ];
  const socialLinks = data?.socialLinks?.length
    ? data.socialLinks.map((link) => ({
        icon: iconForPlatform(link.platform),
        href: link.url,
        label: link.platform,
      }))
    : staticSocialLinks;

  return (
    <footer
      className={`py-12 px-4 sm:px-6 lg:px-8 border-t ${
        darkMode
          ? "border-slate-800 bg-slate-900/50"
          : "border-slate-200 bg-slate-50/50"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              Tolesa Tesfaye
            </h3>
            <p
              className={`mb-4 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
            >
              {translate(t.footerAbout)}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : "_self"}
                  rel={
                    social.href.startsWith("http") ? "noopener noreferrer" : ""
                  }
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`transition-colors ${
                    darkMode
                      ? "text-slate-400 hover:text-white"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                  title={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4
              className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              {translate(t.footerCompany)}
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigateToSection(link.sectionId)}
                    className={`transition-colors hover:text-blue-500 text-left ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4
              className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              {translate(t.footerResources)}
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : "_self"}
                    rel={
                      link.href.startsWith("http") ? "noopener noreferrer" : ""
                    }
                    className={`transition-colors hover:text-blue-500 ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4
              className={`text-lg font-semibold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
            >
              {translate(t.footerContact)}
            </h4>
            <ul className="space-y-2">
              {footerLinks.contact.map((link, index) => (
                <li key={index}>
                  {link.href ? (
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : "_self"}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
                      className={`transition-colors hover:text-blue-500 text-left ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <button
                      onClick={() => navigateToSection(link.sectionId)}
                      className={`transition-colors hover:text-blue-500 text-left ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {link.name}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Legal Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`py-6 border-t ${darkMode ? "border-slate-800" : "border-slate-200"}`}
        >
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={(e) => {
                  // Small delay to ensure hash change is processed first
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }, 50);
                }}
                className={`text-sm transition-colors hover:text-blue-500 ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div
            className={`text-center md:text-left ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            <p>
              &copy; {currentYear} Tolesa Tesfaye. {translate(t.footerRights)}
            </p>
            <p className="text-sm mt-1">{translate(t.footerTagline)}</p>
          </div>
          <div
            className={`flex items-center space-x-2 ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            <span>{translate(t.footerMadeWith)}</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaHeart className="text-red-500" />
            </motion.span>
            <span>React & Tailwind CSS</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
