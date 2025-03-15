import { useState, useEffect } from "react";  
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion"; //  Import Framer Motion
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Gmail icon
import Moon from "../components/moon";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);  
  const [isDesktop, setIsDesktop] = useState(false); // Track if it's a desktop
  const [isMobile, setIsMobile] = useState(false); // Add isMobile state

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Desktop breakpoint (1024px+)
      setIsMobile(window.innerWidth <= 768); // Mobile condition
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 🔹 Force scroll to top when Home.jsx loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.3 } },
  };

  return (
<div 
className="snap-section relative flex flex-col justify-center items-center min-h-screen w-full bg-black overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y"
>

      {/* Background Image with Blur */}
      <div 
        className="min-h-screen absolute inset-0 bg-cover bg-center filter overflow-auto "
        style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url('/images/homebg.jpg')" }}
      ></div>

      {/* Subtle Name Placement */}
      <p className="absolute bottom-5 right-5 text-white text-xl font-bold tracking-wide px-4 py-2">
        ©Harsh Bhoi
      </p>

      {/* 🟢 3D Moon in the Background */}
      <Canvas className="absolute top-[3%] md:top-0 left-0 w-full h-full z-20 overflow-visible"
        style={{
          width: isMobile ? "390px" : "100%", 
          height: isMobile ? "280px" : "100vh"
        }}>
        <Moon />
      </Canvas>

      {/* 🟢 Menu Button */}
      <button 
        onClick={() => setMenuOpen(true)}  
        className="absolute top-5 right-5 text-white text-xl px-4 py-2 bg-gray-900/70 hover:bg-gray-800 rounded-md z-50"
      >
        Menu
      </button>

      {/* 🟢 Animated Fullscreen Black Background on Click */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="fixed inset-0 bg-black flex items-center z-40"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            {/* ❌ Close Button */}
            <button 
              onClick={() => setMenuOpen(false)} 
              className="absolute top-5 left-5 text-white text-2xl font-bold z-50"
            >
              ✕
            </button>

            {/* 🟢 Vertical Menu Links with Hover Effect */}
            <motion.nav 
              className="ml-10 space-y-6 text-white text-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
            >
              {["Home", "About", "Projects", "Best Reads", "Contact"].map((link, index) => (
                <a 
                  key={index}
                  href={`#${link.toLowerCase().replace(" ", "-")}`}
                  onClick={handleLinkClick}
                  className="block transition-all duration-300 ease-in-out hover:scale-150 hover:text-blue-400 hover:translate-x-4"
                >
                  {link}
                </a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🟢 Text Overlay - iPhone Lock Screen Effect */}
      <div className="absolute text-white text-6xl md:text-7xl font-bold text-center 
        top-[10%] md:top-[3.2%] z-10 mix-blend-difference flex flex-col">
        <span className="text-5xl md:text-7xl mt-1">Hey, I'm Harsh!</span>
        <span className="text-6xl md:text-7xl">Welcome to my Universe.</span>
      </div>

      {/* 🟢 Dynamic Island with Social Icons */}
      <div className="absolute bottom-5 left-5 bg-gray-900/80 backdrop-blur-md px-6 py-3 rounded-full flex items-center space-x-4 shadow-lg z-50">
        <a href="https://www.linkedin.com/in/harsh-bhoi-b07b22246" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} className="text-white text-2xl hover:text-blue-500 transition duration-300" />
        </a>
        <a href="https://github.com/HarshBhoi36" target="_blank">
          <FontAwesomeIcon icon={faGithub} className="text-white text-2xl hover:text-gray-400 transition duration-300" />
        </a>
        <a href="mailto:harshbhoi3@gmail.com">
          <FontAwesomeIcon icon={faEnvelope} className="text-white text-2xl hover:text-red-500 transition duration-300" />
        </a>
      </div>
    </div>
  );
}
