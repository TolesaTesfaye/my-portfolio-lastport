import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  FaCertificate,
  FaTrophy,
  FaAward,
  FaMedal,
  FaGraduationCap,
  FaCode,
  FaExternalLinkAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { translations as t } from "../translations";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { assetUrl } from "../lib/api";

const Certificates = ({ darkMode }) => {
  const { translate } = useLanguage();
  const { data } = usePortfolioData();
  const [activeTab, setActiveTab] = useState("certificates");
  const [selectedCert, setSelectedCert] = useState(null);

  const staticCertificates = [
    {
      title: translate(t.certFullStack),
      issuer: "Udemy",
      year: "2024",
      icon: FaCode,
      color: "from-blue-500 to-purple-600",
      description:
        "Comprehensive full-stack web development course covering MERN stack, REST APIs, authentication, and deployment.",
      skills: ["React", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "AWS AI Practitioner Challenge",
      issuer: "AWS",
      year: "2026",
      icon: FaCertificate,
      image: "/AWS%20AI%20practitioner%20challenge.jpg",
      color: "from-orange-500 to-amber-600",
      description:
        "Certificate recognizing completion of the AWS AI Practitioner Challenge.",
      skills: ["AWS", "Artificial Intelligence", "Cloud"],
    },
    {
      title: "Leadership Excellence Award",
      issuer: "Leadership Excellence Award",
      year: "2026",
      icon: FaAward,
      image: "/leadership%20excelence%20award.jpg",
      color: "from-purple-500 to-pink-600",
      description:
        "Recognition for demonstrating leadership excellence and a strong commitment to achievement.",
      skills: ["Leadership", "Excellence", "Achievement"],
    },
  ];
  const certificates = Array.isArray(data?.certificates)
    ? data.certificates.map((certificate) => {
        // Use images array from certificate_images table
        let certImages = [];
        if (certificate.images && certificate.images.length > 0) {
          certImages = certificate.images.map(img => assetUrl(img.imageKey));
        } else if (certificate.fileKey) {
          // Fallback to single fileKey if no gallery images
          certImages = [assetUrl(certificate.fileKey)];
        }
        
        return {
          ...certificate,
          issuer: certificate.issuer,
          year: certificate.issueDate || "",
          image: certImages.length > 0 ? certImages[0] : undefined, // Use first image for display
          images: certImages, // Store all images for potential carousel
          skills: [],
          icon: FaCertificate,
          color: "from-blue-500 to-purple-600"
        };
      })
    : staticCertificates;

  const achievements = [
    {
      title: "SuccessBridge Platform Creator",
      description:
        "Developed and launched SuccessBridge, a comprehensive student management platform connecting students, teachers, and parents.",
      icon: FaAward,
      color: "from-blue-500 to-purple-600",
      year: "2024",
    },
    {
      title: "YouTube Content Creator",
      description:
        'Founded "Tolman Tube" YouTube channel, creating educational content and tutorials for students and developers.',
      icon: FaTrophy,
      color: "from-red-500 to-pink-600",
      year: "2023",
    },
    {
      title: "1K Subscribers Milestone",
      description:
        "Reached 1,000 subscribers on YouTube, marking a significant milestone in content creation journey.",
      icon: FaMedal,
      color: "from-yellow-400 to-orange-500",
      year: "2024",
    },
    {
      title: "Software Engineering Student",
      description:
        "Pursuing Bachelor's degree in Software Engineering at Haramaya University, maintaining strong academic performance.",
      icon: FaGraduationCap,
      color: "from-green-400 to-emerald-600",
      year: "2021 - Present",
    },
    {
      title: "Team Project Leadership",
      description:
        "Led the EAGLES TEAM project, demonstrating teamwork, leadership, and collaborative development skills.",
      icon: FaCheckCircle,
      color: "from-cyan-400 to-blue-600",
      year: "2024",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      id="certificates"
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        darkMode
          ? ""
          : "bg-gradient-to-br from-slate-50/50 via-white to-purple-50/20"
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
            {translate(t.certTitle)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p
            className={`text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            {translate(t.certSubtitle)}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div
            className={`inline-flex rounded-full p-1 backdrop-blur-sm border ${
              darkMode
                ? "bg-gray-800/50 border-gray-700"
                : "bg-white/80 border-gray-200"
            }`}
          >
            <button
              onClick={() => setActiveTab("certificates")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "certificates"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <FaCertificate />
              <span>{translate(t.certTabCert)}</span>
            </button>
            <button
              onClick={() => setActiveTab("achievements")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === "achievements"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <FaTrophy />
              <span>{translate(t.certTabAchieve)}</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "certificates" ? (
            <motion.div
              key="certificates"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {certificates.map((cert, index) => {
                const Icon = cert.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)",
                    }}
                    className={`group relative backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-800/50 border-gray-700 hover:border-blue-500/50"
                        : "bg-white/95 border-gray-200/80 hover:border-blue-400 shadow-xl hover:shadow-2xl"
                    }`}
                  >
                    {/* Card Header with gradient */}
                    <div
                      className={`relative h-32 bg-gradient-to-br ${cert.color} flex items-center justify-center`}
                    >
                      {cert.image ? (
                        <img
                          src={cert.image}
                          alt={`${cert.title} certificate`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Icon className="text-6xl text-white/90 drop-shadow-lg" />
                      )}
                      <span className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                        {cert.year}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3
                        className={`text-lg font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                      >
                        {cert.title}
                      </h3>
                      <p
                        className={`text-sm mb-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {cert.issuer}
                      </p>
                      <p
                        className={`text-sm mb-4 line-clamp-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                      >
                        {cert.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cert.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className={`text-xs px-2 py-1 rounded ${
                              darkMode
                                ? "bg-gray-700/50 text-gray-300"
                                : "bg-gray-200 text-gray-700"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* View Certificate Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCert(cert)}
                        className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                          darkMode
                            ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        <span>{translate(t.certView)}</span>
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              key="achievements"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)",
                    }}
                    className={`group relative backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 ${
                      darkMode
                        ? "bg-gray-800/50 border-gray-700 hover:border-blue-500/50"
                        : "bg-white/95 border-gray-200/80 hover:border-blue-400 shadow-xl hover:shadow-2xl"
                    }`}
                  >
                    <div className="p-6 flex items-start space-x-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center`}
                      >
                        <Icon className="text-2xl text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3
                            className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}
                          >
                            {achievement.title}
                          </h3>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              darkMode
                                ? "bg-gray-700/50 text-gray-300"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {achievement.year}
                          </span>
                        </div>
                        <p
                          className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                        >
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-lg rounded-2xl overflow-hidden border ${
                darkMode
                  ? "bg-gray-900 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              {selectedCert.image ? (
                <img
                  src={selectedCert.image}
                  alt={`${selectedCert.title} certificate`}
                  className="max-h-[28rem] w-full object-contain bg-gray-100"
                />
              ) : (
                <div
                  className={`h-40 bg-gradient-to-br ${selectedCert.color} flex items-center justify-center`}
                >
                  <selectedCert.icon className="text-8xl text-white/90 drop-shadow-lg" />
                </div>
              )}
              <div className="p-6">
                <h3
                  className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {selectedCert.title}
                </h3>
                <p
                  className={`text-sm mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  {selectedCert.issuer} • {selectedCert.year}
                </p>
                <p
                  className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  {selectedCert.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedCert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className={`text-xs px-3 py-1 rounded-full ${
                        darkMode
                          ? "bg-gray-700/50 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    darkMode
                      ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
