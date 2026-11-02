import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaBriefcase,
  FaLaptopCode,
  FaRocket,
  FaCalendarAlt,
  FaBook,
  FaBookReader,
} from "react-icons/fa";
import { HiCode } from "react-icons/hi";
import { useLanguage } from "../context/LanguageContext";
import { translations as t } from "../translations";
import { usePortfolioData } from "../context/PortfolioDataContext";
import { assetUrl } from "../lib/api";

const Journey = ({ darkMode }) => {
  const { translate } = useLanguage();
  const { data } = usePortfolioData();
  const staticMilestones = [
    {
      year: "2024 - Present",
      title: translate(t.journeyCurrent),
      description: translate(t.journeyCurrentDesc),
      icon: FaLaptopCode,
      color: "from-blue-500 to-purple-600",
      type: "work",
    },
    {
      year: "2024",
      title: "Develop SuccessBridge learning platform ",
      description:
        "i develop the learning platform called successbridge for students who learn highschool (9-12 ) and for university students that platfrom is give the reource to students , quiz and also give all learning material  ",
      icon: FaBookReader,
      color: "from-white-500 to-orange-600",
      type: "work",
    },
    {
      year: "2024",
      title: translate(t.journeyYoutube),
      description: translate(t.journeyYoutubeDesc),
      icon: FaBriefcase,
      color: "from-yellow-500 to-orange-600",
      type: "work",
    },
    {
      year: "2023 - 2024",
      title: translate(t.journeyTraining),
      description: translate(t.journeyTrainingDesc),
      icon: HiCode,
      color: "from-purple-500 to-pink-600",
      type: "education",
    },

    {
      year: "2022 - 2023",
      title: translate(t.journeyStart),
      description: translate(t.journeyStartDesc),
      icon: FaRocket,
      color: "from-orange-500 to-red-600",
      type: "milestone",
    },

    {
      year: "2021 - 2022",
      title: "I start Freshman course  at Haramaya University ",
      description:
        "after i take grade 12 national exam i join haramaya university and start my bachelor degree by software engineering to compute the world by technplogy , then i pass many challenge during this freshman year ...",
      icon: FaGraduationCap,
      color: "from-indigo-500 to-blue-600",
      type: "education",
    },
  ];
  const milestones = data?.experience?.length || data?.education?.length
    ? [
        ...(data.experience || []).map((item) => {
          const imageUrl = item.images?.length > 0 
            ? assetUrl(item.images[0].imageKey) 
            : null;
          
          return {
            year: `${item.startDate}${item.endDate ? ` - ${item.endDate}` : " - Present"}`,
            title: `${item.position} at ${item.organization}`,
            description: item.description,
            icon: FaBriefcase,
            color: "from-blue-500 to-purple-600",
            type: "work",
            imageUrl
          };
        }),
        ...(data.education || []).map((item) => {
          const imageUrl = item.images?.length > 0 
            ? assetUrl(item.images[0].imageKey) 
            : null;
          
          return {
            year: [item.startDate, item.endDate].filter(Boolean).join(" - ") || "Education",
            title: `${item.degree} at ${item.institution}`,
            description: item.description || item.fieldOfStudy || "",
            icon: FaGraduationCap,
            color: "from-green-500 to-emerald-600",
            type: "education",
            imageUrl
          };
        }),
      ]
    : staticMilestones;

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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case "work":
        return "Work Experience";
      case "education":
        return "Education & Training";
      case "milestone":
        return "Milestone";
      default:
        return "Milestone";
    }
  };

  const getTypeBadgeColor = (type) => {
    switch (type) {
      case "work":
        return "from-blue-500 to-cyan-500";
      case "education":
        return "from-green-500 to-emerald-500";
      case "milestone":
        return "from-orange-500 to-yellow-500";
      default:
        return "from-purple-500 to-pink-500";
    }
  };

  return (
    <section
      id="journey"
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        darkMode
          ? "bg-slate-900/50"
          : "bg-gradient-to-br from-slate-50/50 via-white to-indigo-50/20"
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
            {translate(t.journeyTitle)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p
            className={`text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            {translate(t.journeySubtitle)}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-px w-0.5 h-full top-0">
            <div
              className={`w-full h-full ${
                darkMode
                  ? "bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
                  : "bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"
              }`}
              style={{ opacity: 0.6 }}
            />
          </div>

          {/* Mobile vertical line */}
          <div className="md:hidden absolute left-6 top-0 w-0.5 h-full">
            <div
              className={`w-full h-full ${
                darkMode
                  ? "bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
                  : "bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400"
              }`}
              style={{ opacity: 0.4 }}
            />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative flex items-start mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline node - Desktop */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center shadow-lg shadow-purple-500/20`}
                  >
                    <milestone.icon className="text-white text-lg" />
                  </motion.div>
                </div>

                {/* Timeline node - Mobile */}
                <div className="md:hidden absolute left-6 transform -translate-x-1/2 z-10">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${milestone.color} flex items-center justify-center shadow-lg`}
                  >
                    <milestone.icon className="text-white text-sm" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`w-full md:w-[calc(50%-3rem)] ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  } ml-16 md:ml-0`}
                >
                  <motion.div
                    whileHover={{
                      y: -5,
                      boxShadow: "0 15px 30px rgba(59, 130, 246, 0.15)",
                    }}
                    className={`backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 relative overflow-hidden group ${
                      darkMode
                        ? "bg-slate-800/50 border-slate-700 hover:border-blue-500/50"
                        : "bg-white/90 border-slate-200/80 hover:border-blue-400 shadow-xl hover:shadow-2xl"
                    }`}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative z-10">
                      {/* Year Badge */}
                      <div
                        className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 ${
                          darkMode
                            ? "bg-slate-700/50 text-blue-400"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        <FaCalendarAlt className="text-xs" />
                        <span>{milestone.year}</span>
                      </div>

                      {/* Type Badge */}
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-3 ml-2 bg-gradient-to-r ${getTypeBadgeColor(milestone.type)} text-white`}
                      >
                        {getTypeLabel(milestone.type)}
                      </div>

                      <h3
                        className={`text-xl font-semibold mb-3 ${darkMode ? "text-white" : "text-slate-900"}`}
                      >
                        {milestone.title}
                      </h3>

                      <p
                        className={`text-sm leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
                      >
                        {milestone.description}
                      </p>

                      {/* Milestone Image */}
                      {milestone.imageUrl && (
                        <div className="mt-4">
                          <img 
                            src={milestone.imageUrl} 
                            alt={milestone.title}
                            className="w-full h-32 object-cover rounded-lg"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}

                      {/* Bottom accent gradient */}
                      <div
                        className={`mt-4 w-12 h-0.5 rounded-full bg-gradient-to-r ${milestone.color}`}
                      ></div>
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for the other side on desktop */}
                <div className="hidden md:block w-[calc(50%-3rem)]"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
