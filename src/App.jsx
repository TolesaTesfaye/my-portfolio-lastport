import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfService from "./components/TermsOfService";
import CookiePolicy from "./components/CookiePolicy";
import Disclaimer from "./components/Disclaimer";
import Certificates from "./components/Certificates";
import Journey from "./components/Journey";
import FloatingSocials from "./components/FloatingSocials";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle URL-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (
        hash &&
        [
          "privacy-policy",
          "terms-of-service",
          "cookie-policy",
          "disclaimer",
        ].includes(hash)
      ) {
        setCurrentPage(hash);
        // Scroll to top for legal pages
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);
      } else {
        setCurrentPage("home");
        // Handle section navigation on home page
        if (hash && hash.startsWith("#") === false) {
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 100);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Function to navigate to section
  const navigateToSection = (sectionId) => {
    if (currentPage !== "home") {
      setCurrentPage("home");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case "privacy-policy":
        return <PrivacyPolicy darkMode={darkMode} />;
      case "terms-of-service":
        return <TermsOfService darkMode={darkMode} />;
      case "cookie-policy":
        return <CookiePolicy darkMode={darkMode} />;
      case "disclaimer":
        return <Disclaimer darkMode={darkMode} />;
      default:
        return (
          <>
            <Hero darkMode={darkMode} />
            <About darkMode={darkMode} />
            <Services darkMode={darkMode} />
            <Skills darkMode={darkMode} />
            <Projects darkMode={darkMode} />
            <Certificates darkMode={darkMode} />
            <Journey darkMode={darkMode} />
            <Contact darkMode={darkMode} />
          </>
        );
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800"
          : "bg-gradient-to-br from-slate-50 via-white to-blue-50"
      }`}
    >
      {/* Amazing New Animated Background - Mesh Gradient Style */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* Large flowing gradient blobs - Reduced animation */}
          <motion.div
            animate={{
              x: [0, 100, -50, 0],
              y: [0, 75, -25, 0],
              scale: [1, 1.1, 0.9, 1],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute top-0 left-0 w-[600px] h-[600px] rounded-full blur-3xl ${
              darkMode
                ? "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"
                : "bg-gradient-to-r from-blue-400/25 via-purple-400/25 to-pink-400/25"
            }`}
          />
          <motion.div
            animate={{
              x: [0, -100, 50, 0],
              y: [0, -75, 25, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 45,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl ${
              darkMode
                ? "bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20"
                : "bg-gradient-to-r from-purple-400/25 via-pink-400/25 to-orange-400/25"
            }`}
          />

          {/* Animated grid pattern - Reduced opacity changes */}
          <motion.div
            animate={{
              opacity: [0.03, 0.08, 0.03],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute inset-0 ${
              darkMode ? "opacity-5" : "opacity-3"
            }`}
            style={{
              backgroundImage: `linear-gradient(${darkMode ? "rgba(59, 130, 246, 0.05)" : "rgba(59, 130, 246, 0.1)"} 1px, transparent 1px),
                                linear-gradient(90deg, ${darkMode ? "rgba(59, 130, 246, 0.05)" : "rgba(59, 130, 246, 0.1)"} 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Floating geometric shapes - Reduced count and movement */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.sin(i) * 25, 0],
                scale: [1, 1.2, 1],
                opacity: darkMode ? [0.1, 0.3, 0.1] : [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 6 + (i % 3),
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
              className={`absolute rounded-full ${
                darkMode ? "bg-blue-400" : "bg-blue-500"
              }`}
              style={{
                width: `${6 + (i % 3) * 3}px`,
                height: `${6 + (i % 3) * 3}px`,
                left: `${10 + i * 12}%`,
                top: `${15 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          navigateToSection={navigateToSection}
        />
        <FloatingSocials darkMode={darkMode} />
        {renderPage()}
        <Footer
          darkMode={darkMode}
          navigateToSection={navigateToSection}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default App;
