import { motion } from "framer-motion";
import { FaGraduationCap, FaCode, FaRocket } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { translations as t } from "../translations";

const About = ({ darkMode }) => {
  const { translate } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const stats = [
    {
      icon: FaGraduationCap,
      number: translate(t.aboutStudent),
      description: translate(t.aboutStudentDesc),
    },
    {
      icon: FaCode,
      number: translate(t.aboutProjects),
      description: translate(t.aboutProjectsDesc),
    },
    {
      icon: FaRocket,
      number: translate(t.aboutExperience),
      description: translate(t.aboutExperienceDesc),
    },
  ];

  return (
    <section
      id="about"
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        darkMode
          ? ""
          : "bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30"
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {translate(t.aboutTitle)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </motion.div>

        {/* Statistics Section - Card Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)",
              }}
              className={`backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 relative overflow-hidden group ${
                darkMode
                  ? "bg-gray-800/50 border-gray-700 hover:border-blue-500/50"
                  : "bg-white/90 border-gray-200/80 hover:border-blue-400 shadow-xl hover:shadow-2xl"
              }`}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"
              />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <stat.icon className="text-4xl text-blue-400 mb-4" />
                </motion.div>
                <div className="text-2xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <p className={darkMode ? "text-slate-400" : "text-slate-700"}>
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Text Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <h3
            className={`text-3xl font-semibold mb-8 text-center ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            {translate(t.aboutHello)}{" "}
            <span className="text-gradient">{translate(t.aboutName)}</span>
          </h3>

          <div className="space-y-6 text-center">
            <p
              className={`text-xl leading-relaxed font-medium ${darkMode ? "text-slate-200" : "text-slate-800"}`}
            >
              {translate(t.aboutDesc1)}
            </p>

            <p
              className={`text-lg leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700"}`}
            >
              {translate(t.aboutDesc2)}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: translate(t.aboutStudent),
              description: translate(t.aboutStudentDesc),
              icon: FaGraduationCap,
            },
            {
              title: translate(t.skillsFrontend),
              description: translate(t.aboutProjectsDesc),
              icon: FaCode,
            },
            {
              title: translate(t.skillsSpecializations),
              description: translate(t.aboutExperienceDesc),
              icon: FaRocket,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)",
              }}
              className={`backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 relative overflow-hidden group ${
                darkMode
                  ? "bg-gray-800/50 border-gray-700 hover:border-blue-500/50"
                  : "bg-white/90 border-gray-200/80 hover:border-blue-400 shadow-xl hover:shadow-2xl"
              }`}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl"
              />
              <div className="relative z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <item.icon className="text-4xl text-blue-400 mb-4" />
                </motion.div>
                <h4
                  className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}
                >
                  {item.title}
                </h4>
                <p className={darkMode ? "text-gray-400" : "text-gray-700"}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
