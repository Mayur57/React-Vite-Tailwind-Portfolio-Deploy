import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ProjectModal({ project, onClose, onLockScroll }) {
  const [touchY, setTouchY] = useState(0);

  useEffect(() => {
    if (!onLockScroll) return;

    // Lock styles
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.width = '100%';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = "hidden";
    document.body.classList.add("modal-open");

    // Add touch scroll prevention
    const preventTouchScroll = (e) => {
      if (Math.abs(e.touches[0].clientY - touchY) > 10) {
        e.preventDefault();
      }
    };

    window.addEventListener('touchstart', (e) => {
      setTouchY(e.touches[0].clientY);
    });

    window.addEventListener('touchmove', preventTouchScroll, { passive: false });

    return () => {
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.body.style.position = '';
      document.body.style.width = '';
      window.removeEventListener('touchstart', () => {});
      window.removeEventListener('touchmove', preventTouchScroll);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [onLockScroll])

  return (
    <div
  onClick={onClose}
  className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm ${
    project ? "modal-visible" : "modal-hidden"
  }`}
>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative bg-gray-900 rounded-xl shadow-2xl flex flex-col w-full max-w-lg mx-4 max-h-[80vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-0 right-0 z-10 p-4 ml-auto text-gray-400 hover:text-white transition-colors"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto custom-scrollbar px-6 pb-8 h-full">
          {/* Image Container */}
          <div className="relative aspect-video w-full mb-6">
            <div className="w-full h-full mx-auto transition-all duration-300">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-white mb-4">
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-gray-300 text-base mb-4">
            {project.description}
          </p>

          {/* Details */}
          <p className="text-gray-400 text-sm leading-relaxed">
            {project.details}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
