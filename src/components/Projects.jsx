import { motion, AnimatePresence } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations as t } from "../translations";

const Projects = ({ darkMode }) => {
  const { translate } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeImage, setActiveImage] = useState({});
  const [failedImages, setFailedImages] = useState(() => new Set());

  const projects = [
    {
      title: translate(t.projectSuccessBridge),
      description:
        "Comprehensive student management platform connecting students, teachers, and parents. Features academic progress tracking, grade management, assignment submission, and real-time communication tools.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "TypeScript",
        "Tailwind CSS",
      ],
      images: [
        "/successbridge1.png",
        "/successbridge3 (1).png",
        "/successbridge3 (2).png",
      ],
      github: "https://github.com/TolesaTesfaye/SuccessBridge",
      demo: "https://success-bridge-ten.vercel.app/",
      linkLabel: t.projectsProjectUrl,
      category: "Web Development",
    },
    {
      title: translate(t.projectGBAAB),
      description:
        "Association project developed for GBAAB, providing digital solutions and online presence for the organization. Features membership management, event announcements, and community engagement tools.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      images: ["/gbaab1.png", "/gbaab2.png", "/gbaab3.png"],
      github: "https://github.com/TolesaTesfaye/GBAAB",
      demo: "https://gamataa-barattoota-ada-aa-bargaa.vercel.app/",
      linkLabel: t.projectsProjectUrl,
      category: "Web Development",
    },
    {
      title: translate(t.projectTaskMgmt),
      description:
        "Modern task management application with drag-and-drop functionality, team collaboration, deadline tracking, and productivity analytics. Built for efficient project management.",
      technologies: [
        "React",
        "Node.js",
        "MongoDB",
        "Socket.io",
        "Tailwind CSS",
      ],
      images: [
        "/task1.png",
        "/task2.png",
        "/task3.png",
      ],
      github: "https://github.com/TolesaTesfaye/Task-Managemant-System",
      demo: "https://github.com/TolesaTesfaye/Task-Managemant-System",
      category: "Web Development",
    },
    {
      title: translate(t.projectRecruitment),
      description:
        "Comprehensive recruitment management system streamlining the hiring process. Features applicant tracking, interview scheduling, candidate evaluation, resume parsing, and automated communication.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Redux",
        "Tailwind CSS",
      ],
      images: [
        "/recuritment1.png",
        "/recuritment2.png",
        "/recuritemtnt3.png",
      ],
      github: "https://github.com/TolesaTesfaye/recruitment-management",
      demo: "https://github.com/TolesaTesfaye/recruitment-management",
      category: "Web Development",
    },
    {
      title: translate(t.projectPortfolio),
      description:
        "Modern, responsive portfolio website showcasing my projects and skills. Features dark/light mode, smooth animations, and interactive components built with React and Framer Motion.",
      technologies: [
        "React",
        "Tailwind CSS",
        "Framer Motion",
        "Vite",
        "Vercel",
      ],
      images: [
        "/portifolio1 (1).png",
        "/portifolio1 (2).png",
        "/portifolio1 (3).png",
      ],
      github: "https://github.com/TolesaTesfaye/my-portfolio-lastport",
      demo: "https://my-portfolio-lastport.vercel.app/",
      linkLabel: t.projectsProjectUrl,
      category: "Web Development",
    },
    {
      title: translate(t.projectTelegramBot),
      description:
        "Telegram bot for the SuccessBridge learning platform that provides students with instant access to learning materials, quizzes, and study resources through chat commands. Built with Node.js and the Telegram Bot API.",
      technologies: [
        "Node.js",
        "Telegram Bot API",
        "MongoDB",
        "JavaScript",
        "dotenv",
      ],
      images: [
        "/botperview3 (1).png",
        "/botperview3 (2).png",
        "/botperview3 (3).png",
      ],
      github: "https://github.com/TolesaTesfaye/SuccessBridge",
      demo: "https://t.me/successbridgebot",
      linkLabel: t.projectsProjectUrl,
      category: "Bot Development",
    },
  ];

  // Initialize active image index for each project
  useEffect(() => {
    const initial = {};
    projects.forEach((_, index) => {
      initial[index] = 0;
    });
    setActiveImage(initial);
  }, []);

  // Auto-slide for hovered project
  useEffect(() => {
    if (hoveredIndex === null) return;

    const interval = setInterval(() => {
      setActiveImage((prev) => ({
        ...prev,
        [hoveredIndex]: ((prev[hoveredIndex] || 0) + 1) % 3,
      }));
    }, 2500);

    return () => clearInterval(interval);
  }, [hoveredIndex]);

  const nextImage = (projectIndex) => {
    setActiveImage((prev) => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % 3,
    }));
  };

  const prevImage = (projectIndex) => {
    setActiveImage((prev) => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) - 1 + 3) % 3,
    }));
  };

  const goToImage = (projectIndex, imageIndex) => {
    setActiveImage((prev) => ({
      ...prev,
      [projectIndex]: imageIndex,
    }));
  };

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
    hidden: { opacity: 0, y: 50, scale: 0.9 },
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
      id="projects"
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
            {translate(t.projectsTitle)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p
            className={`text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            {translate(t.projectsSubtitle)}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => {
            const currentImage = activeImage[index] || 0;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{
                  y: -5,
                  scale: 1.01,
                  boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)",
                }}
                className={`group relative backdrop-blur-sm rounded-xl overflow-hidden border transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800/50 border-gray-700 hover:border-blue-500/50"
                    : "bg-white/95 border-gray-200/80 hover:border-blue-400 shadow-xl hover:shadow-2xl"
                }`}
              >
                {/* Image Carousel */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                  <AnimatePresence mode="wait">
                    {failedImages.has(`${index}-${currentImage}`) ? (
                      <motion.div
                        key={`placeholder-${currentImage}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20"
                      >
                        <span className="text-6xl opacity-50">...</span>
                      </motion.div>
                    ) : (
                      <motion.img
                        key={currentImage}
                        src={project.images[currentImage]}
                        alt={`${project.title} preview ${currentImage + 1}`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={() => {
                          // Track failed image so React renders a placeholder instead
                          setFailedImages((prev) => {
                            const next = new Set(prev);
                            next.add(`${index}-${currentImage}`);
                            return next;
                          });
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Gradient overlay at bottom for readability */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none`}
                  />

                  {/* Navigation Arrows - show on hover */}
                  {hoveredIndex === index && (
                    <>
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage(index);
                        }}
                        className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full z-20 transition-all ${
                          darkMode
                            ? "bg-black/60 text-white hover:bg-black/80"
                            : "bg-white/80 text-gray-800 hover:bg-white"
                        }`}
                      >
                        <FaChevronLeft className="text-sm" />
                      </motion.button>
                      <motion.button
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(index);
                        }}
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full z-20 transition-all ${
                          darkMode
                            ? "bg-black/60 text-white hover:bg-black/80"
                            : "bg-white/80 text-gray-800 hover:bg-white"
                        }`}
                      >
                        <FaChevronRight className="text-sm" />
                      </motion.button>
                    </>
                  )}

                  {/* Dots Indicator */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20">
                    {[0, 1, 2].map((dotIndex) => (
                      <button
                        key={dotIndex}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToImage(index, dotIndex);
                        }}
                        className="transition-all duration-300 focus:outline-none"
                      >
                        {currentImage === dotIndex ? (
                          <FaCircle
                            className={`text-[8px] ${
                              darkMode ? "text-white" : "text-white"
                            } drop-shadow-lg`}
                          />
                        ) : (
                          <FaCircle
                            className={`text-[6px] ${
                              darkMode ? "text-white/50" : "text-white/60"
                            } drop-shadow-lg hover:opacity-80`}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 z-20 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
                    {project.category}
                  </span>

                  {/* Image Counter */}
                  <span
                    className={`absolute top-3 right-3 z-20 text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm ${
                      darkMode
                        ? "bg-black/50 text-white"
                        : "bg-white/70 text-gray-800"
                    }`}
                  >
                    {currentImage + 1}/3
                  </span>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3
                    className={`text-xl font-semibold mb-3 group-hover:text-gradient transition-colors ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <p
                    className={`mb-4 line-clamp-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}
                  >
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`text-xs px-2 py-1 rounded ${
                          darkMode
                            ? "bg-gray-700/50 text-gray-300"
                            : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center space-x-2 transition-colors ${
                        darkMode
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      <FaExternalLinkAlt />
                      <span className="text-sm">
                        {translate(project.linkLabel || t.projectsLiveDemo)}
                      </span>
                    </motion.a>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 pointer-events-none"
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
