import { motion, AnimatePresence } from "framer-motion";
import {
  FaYoutube,
  FaChalkboardTeacher,
  FaImage,
  FaVideo,
  FaChevronLeft,
  FaChevronRight,
  FaCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations as t } from "../translations";

const Services = ({ darkMode }) => {
  const { translate } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeImage, setActiveImage] = useState({});

  const services = [
    {
      title: translate(t.serviceContent),
      description: translate(t.serviceContentDesc),
      icon: FaYoutube,
      features: [
        "Educational Videos",
        "Tutorial Creation",
        "Student Engagement",
        "Tech Content",
      ],
      color: "from-red-500 to-pink-500",
      images: [
        "/content creation (1).jpg",
        "/content creation (2).jpg",
        "/tolman.jpg",
      ],
    },
    {
      title: translate(t.serviceTeaching),
      description: translate(t.serviceTeachingDesc),
      icon: FaChalkboardTeacher,
      features: [
        "Student Mentoring",
        "Tech Education",
        "Learning Resources",
        "Skill Development",
      ],
      color: "from-green-500 to-emerald-500",
      images: [
        "/olnlineteaching1.jpg",
        "/onlineteching2 (1).jpg",
        "/onlineteching2 (2).jpg",
      ],
    },
    {
      title: translate(t.servicePhoto),
      description: translate(t.servicePhotoDesc),
      icon: FaImage,
      features: [
        "Adobe Photoshop",
        "Canva Design",
        "Image Enhancement",
        "Creative Design",
      ],
      color: "from-purple-500 to-indigo-500",
      images: [
        "/graphicsedesign (1).png",
        "/graphicsedesign (2).png",
        "/graphicsedesign.jpg",
      ],
    },
    {
      title: translate(t.serviceVideo),
      description: translate(t.serviceVideoDesc),
      icon: FaVideo,
      features: [
        "CapCut Editing",
        "Video Production",
        "Content Optimization",
        "Visual Effects",
      ],
      color: "from-orange-500 to-yellow-500",
      images: ["/vedioediting (1).png", "/vedioediting (2).png", "/tolman.jpg"],
    },
  ];

  // Initialize active image index for each service
  useEffect(() => {
    const initial = {};
    services.forEach((_, index) => {
      initial[index] = 0;
    });
    setActiveImage(initial);
  }, []);

  // Auto-slide for hovered service
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

  const nextImage = (serviceIndex) => {
    setActiveImage((prev) => ({
      ...prev,
      [serviceIndex]: ((prev[serviceIndex] || 0) + 1) % 3,
    }));
  };

  const prevImage = (serviceIndex) => {
    setActiveImage((prev) => ({
      ...prev,
      [serviceIndex]: ((prev[serviceIndex] || 0) - 1 + 3) % 3,
    }));
  };

  const goToImage = (serviceIndex, imageIndex) => {
    setActiveImage((prev) => ({
      ...prev,
      [serviceIndex]: imageIndex,
    }));
  };

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

  return (
    <section
      id="services"
      className={`py-20 px-4 sm:px-6 lg:px-8 ${
        darkMode
          ? "bg-slate-800/30"
          : "bg-gradient-to-br from-white via-slate-50/50 to-purple-50/30"
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
            {translate(t.servicesTitle)}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-4"></div>
          <p
            className={`text-lg ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            {translate(t.servicesSubtitle)}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const currentImage = activeImage[index] || 0;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: "0 15px 30px rgba(59, 130, 246, 0.2)",
                }}
                className={`backdrop-blur-sm rounded-xl border transition-all duration-300 relative overflow-hidden group ${
                  darkMode
                    ? "bg-slate-800/50 border-slate-700 hover:border-blue-500/50"
                    : "bg-white/90 border-slate-200/80 hover:border-blue-400 shadow-xl hover:shadow-2xl"
                }`}
              >
                {/* Image Carousel */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-600/20">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImage}
                      src={service.images[currentImage]}
                      alt={`${service.title} preview ${currentImage + 1}`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </AnimatePresence>

                  {/* Fallback gradient overlay if no image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Service Icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-2xl opacity-90`}
                    >
                      <service.icon className="text-3xl text-white" />
                    </div>
                  </div>

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
                          <FaCircle className="text-[8px] text-white drop-shadow-lg" />
                        ) : (
                          <FaCircle className="text-[6px] text-white/50 drop-shadow-lg hover:opacity-80" />
                        )}
                      </button>
                    ))}
                  </div>

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

                {/* Service Content */}
                <div className="p-6 relative z-10">
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <h3
                      className={`text-xl font-semibold mb-3 group-hover:text-gradient transition-colors ${darkMode ? "text-white" : "text-slate-900"}`}
                    >
                      {service.title}
                    </h3>

                    <p
                      className={`mb-4 line-clamp-3 ${darkMode ? "text-slate-400" : "text-slate-700"}`}
                    >
                      {service.description}
                    </p>

                    <div className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                          <span
                            className={`text-sm ${darkMode ? "text-slate-300" : "text-slate-600"}`}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16"
        >
          <h3
            className={`text-2xl font-semibold mb-4 ${darkMode ? "text-white" : "text-slate-900"}`}
          >
            {translate(t.servicesCta)}
          </h3>
          <p
            className={`text-lg mb-8 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
          >
            {translate(t.servicesCtaDesc)}
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            {translate(t.servicesGetInTouch)}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
