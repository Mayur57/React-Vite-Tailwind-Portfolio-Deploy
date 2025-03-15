import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import axios from "axios"; // ✅ Import Axios



// Technology logos (replace these with actual image paths or icons)
const technologies = [
    { name: "HTML", logo: "html-logo.png" },
    { name: "CSS", logo: "css-logo.png" },
    { name: "C++", logo: "cpp-logo.png" },
    { name: "Python3", logo: "python-logo.png" },
    { name: "Java", logo: "java-logo.png" },
    { name: "JavaScript", logo: "js-logo.png" },
    { name: "MongoDB", logo: "mongodb-logo.png" },
    { name: "Express.js", logo: "express-logo.png" },
    { name: "React.js", logo: "react-logo.png" },
    { name: "Node.js", logo: "node-logo.png" },
    { name: "Three.js", logo: "threejs-logo.png" },
    { name: "Framer", logo: "framer-logo.png" },
    { name: "Tailwind CSS", logo: "tailwind-logo.png" },
    { name: "Vercel", logo: "vercel-logo.png" },
    { name: "GitHub", logo: "github-logo.png" },
    { name: "ChatGPT", logo: "chatgpt-logo.png" },
    { name: "VSCode", logo: "VSCode-logo.png" },
    { name: "Ollama", logo: "Ollama-logo.png" },
    { name: "Jupyter", logo: "Jupyter-logo.png" },
    { name: "Anaconda", logo: "Anaconda-logo.png" },
];

export default function About() {
    const [isToolboxOpen, setIsToolboxOpen] = useState(false);
    const [pokeStatus, setPokeStatus] = useState(""); // ✅ State for poke button feedback

    // Detect when the About section is in view
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.3,
    });

    // ✅ Function to send a poke notification const BACKEND_URL = "https://react-vite-tailwind-portfolio-deploy-hdgx.vercel.app"; 2:30 7 march
    
    const BACKEND_URL = "https://react-vite-tailwind-portfolio.vercel.app/";


const handlePoke = async () => {
    setPokeStatus("Poking...");

    try {
        await axios.post(`${BACKEND_URL}/poke`);
        setPokeStatus("Poke sent successfully!");
    } catch (error) {
        console.error("Poke Error:", error);
        setPokeStatus("Failed to send poke.");
    }
};
    
    return (
        <div
            ref={ref} // Attach ref to About section
            className="snap-section min-h-screen sm:h-screen flex flex-col justify-start items-center bg-black text-white relative space-y-4 sm:space-y-8 py-4 sm:py-8 overflow-auto sm:overflow-scroll"
            style={{
                background: "radial-gradient(circle, rgba(10, 10, 10, 0.7) 0%, rgba(0, 0, 0, 1) 80%)",
            }}
        >
            {/* About Me Heading */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="text-3xl sm:text-4xl md:text-5xl font-weight-200 mt-2 sm:mt-4"
            >
                About Me
            </motion.h1>
            {/* Image and Poke Button Container */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-start text-center sm:text-left w-full sm:w-auto pb-4 sm:pb-8">
            {/* Image Section (Slides in from left)                     className="w-40 h-40 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-110 mr-30"
*/}
                <motion.img
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    src="/images/harsh.jpg"
                    alt="About Me"
                    className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-110 sm:mr-6"

                />
               
 {/* Poke Button Section (Slides in from right) */}
 {/* Poke Button Section (3D Greyscale Effect)   className="relative px-6 py-5 rounded-xl backdrop-blur-lg bg-gradient-to-br from-gray-600 via-gray-800 to-gray-900 border border-gray-500/30 shadow-2xl ml-6 overflow-hidden ring-1 ring-white/10"
*/}
<motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
  transition={{ duration: 0.5, delay: 0.3 }}
  className="relative px-4 sm:px-6 py-3 sm:py-5 rounded-xl backdrop-blur-lg bg-gradient-to-br from-gray-600 via-gray-800 to-gray-900 border border-gray-500/30 shadow-2xl mt-4 sm:mt-0 sm:ml-6"

>
  {/* 3D-like border overlay */}
  <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br from-gray-400/20 to-gray-700/20 -z-10 mask-border" />

  <p className="mb-3 text-sm font-medium bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
    Tap to say "Hey I'm Here"
  </p>

  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={handlePoke}
    className="w-full bg-gradient-to-br from-gray-500 to-gray-700 hover:from-gray-400 hover:to-gray-600 text-gray-200 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
  >
    Poke
  </motion.button>

  {/* Status message with animation */}
  <motion.div
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="mt-2 text-sm"
  >
    <span className={pokeStatus.includes("success") ? "text-green-400" : "text-red-400"}>
      {pokeStatus}
    </span>
  </motion.div>
</motion.div>

            </div>
            {/* Description Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center px-4 sm:px-8 max-w-2xl mt-2 sm:mt-0"
            >{/*remove smmt0 if not responsive on mobile*/}
                <p
                    className="text-base md:text-lg lg:text-xl font-light mb-4"
                    style={{
                        background: "linear-gradient(to top right, #85c1ff, white)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    I'm a software developer passionate about building meaningful projects with modern web technologies.
                </p>
                <p
                    className="text-base md:text-lg lg:text-xl font-light mb-4"
                    style={{
                        background: "linear-gradient(to top right, #85c1ff, white)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                >
                    I love tackling challenging problems and creating user-friendly applications.
                </p>
                <p
                    className="text-base md:text-lg lg:text-xl font-light mb-4"
                    style={{
                        background: "linear-gradient(to top right, #85c1ff, white)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    I am currently pursuing a Bachelor of Technology in Electronics and Communication Engineering (2021-2025) at SRM Institute of Science and Technology, Chennai.
                </p>
            </motion.div>
            {/* Semi-Rectangle Toolbox Section (Fixed at Bottom, Slides Up)                 className="absolute bottom-0 left-0 w-full bg-gray-900 text-white px-6 py-4 rounded-t-3xl flex justify-between items-center shadow-lg"
*/}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-full bg-gray-900 text-white px-4 sm:px-6 py-4 rounded-t-3xl flex justify-between items-center shadow-lg mt-auto sm:absolute sm:bottom-0 sm:left-0">
                {/* Toolbox Heading */}
                <div>
                    <h2 className="text-2xl font-bold">My Toolbox</h2>
                    <p className="text-gray-400 text-sm">Get to know my technical expertise</p>
                </div>
                {/* Arrow Button to Open Toolbox Page */}
                <button
                    className="text-white text-2xl hover:text-blue-400 transition-all duration-300"
                    onClick={() => setIsToolboxOpen(true)}
                >
                    →
                </button>
            </motion.div>
            {/* Fullscreen Overlay for Toolbox Page */}
            
            {isToolboxOpen && (
    <motion.div
        className="fixed inset-0 flex flex-col justify-center items-center bg-black bg-opacity-90 p-4 z-50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
    >
        {/* Toolbox Container */}
        <div 
            className="w-[80vw] h-[80vh] bg-gray-900 text-white rounded-xl p-4 sm:p-6 shadow-xl flex flex-col "
            style={{
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain"
            }}
        >
            {/* Heading */}
            <h2 className="text-xl sm:text-3xl font-semibold text-center mb-4">
                Tools I Use on a Daily Basis✨
            </h2>

            {/* Scrollable Grid Container */}
            <div className="flex-1 overflow-y-auto flex justify-center">
                <div className="grid grid-cols-3 gap-2 sm:gap-4 w-fit mx-auto p-1">
                    {technologies.map((tech, index) => (
                        <div
                            key={index}
                            className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-800 rounded-lg flex flex-col justify-center items-center text-gray-400 hover:text-white hover:shadow-lg transition-all duration-300"
                        >
                            <motion.div
                                className="flex flex-col items-center justify-center w-full h-full px-1"
                                whileHover={{ translateY: -5 }}
                            >
                                <img
                                    src={`/images/${tech.logo}`}
                                    alt={tech.name}
                                    className="w-8 h-8 sm:w-10 sm:h-10 mb-1"
                                />
                                <span className="text-[11px] sm:text-[13px] font-normal text-center leading-tight">
                                    {tech.name}
                                </span>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Close Button */}
            <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg transition-all duration-300 self-center"
                onClick={() => setIsToolboxOpen(false)}
            >
                Close
            </button>
        </div>
    </motion.div>
)}

        </div>
    );
}





