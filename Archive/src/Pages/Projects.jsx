import { useState } from "react";
import { motion } from "framer-motion";
import ProjectModal from "../components/ProjectModal";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Kidney Cancer Detection using ML",
      description: "Implementation and Comparison of Deep Learning Algorithms for Kidney Cancer Detection.",
      image: "/images/Project1.png",
      technologies: ["Tensorflow", "Keras", "Python", "Verilog"],
      details:
        "The research focuses on detecting kidney cancer using Convolutional Neural Networks (CNNs) and FPGA hardware acceleration to analyze histopathological images of Renal Cell Carcinoma (RCC).CNNs were chosen for their ability to recognize spatial patterns in medical images, enabling early and accurate cancer detection with high precision. The study utilized a dataset sourced from Kaggle and medical imaging systems, preprocessed with rescaling and batch segmentation, and trained using TensorFlow and Keras. The CNN model was implemented in Google Colab, leveraging GPUs and TPUs for training, achieving an accuracy of 97.53%, outperforming models like AlexNet and DarkNet-53. Evaluation metrics, including Mean Squared Error (MSE) and confusion matrices, validated the model's performance, showing minimal deviation between predicted and actual results. Future work aims to implement the model on FPGAs for real-time processing, improving speed and efficiency for clinical applications in kidney cancer detection. The research has been selected for publication at ERCICAM-2025 and will be published in the LNEE series, which is indexed in El-Compendex, SCOPUS, Google Scholar, and Springer.",
    },
    {
      id: 2,
      title: "Vates AI",
      description: "Automating Stock Market Analysis for High-Frequency Trading (HFT) Bots.",
      image: "/images/Project2.png",
      technologies: ["Currently in Development Phase"],
      details:
        "One stop shop for input data used for model training and testing. Aiding HFT bots in making informed decisions. Future Updates: Creation of various HFT bots using the data provided by Vates AI. Current Status: In development phase",
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A personal portfolio website showcasing my skills and projects.",
      image: "/images/Project3.png",
      technologies: ["Node.js", "Vite", "Framer Motion", "React", "TailwindCSS"],
      details:
        "My React 3D Portfolio is a sleek, interactive, and visually captivating portfolio website built using React, Vite, and Tailwind CSS. It features stunning 3D elements, smooth animations, and a modern UI inspired by cutting-edge web designs. The homepage showcases a dynamic 3D moon, engaging users with an immersive experience. A stylish navigation menu with smooth transitions enhances the UX. The Toolbox section displays tech stacks in interactive 3D boxes. The About section includes an animated tech stack showcase and a fun ‘Poke’ button. A Dynamic Island-style social media bar provides quick access to LinkedIn, GitHub, and Gmail. The Contact page integrates a Node.js + Express backend for email handling. The site also includes a custom-built Snake game with mobile support. This portfolio is a perfect blend of creativity, functionality, and interactivity! ",
    },
    {
      id: 4,
      title: "Fault Detection in ICs using ML",
      description: "A Machine Learning model to detect faults in Integrated Circuits.",
      image: "/images/Project4.png",
      technologies: ["Python", "Cadence Modus", "Tensorflow", "Keras", "Currently in Development Phase"],
      details:
        "The project focuses on developing a Machine Learning model to detect faults in Integrated Circuits (ICs) using Convolutional Neural Networks (CNNs) and Cadence Modus. The research aims to improve fault detection accuracy and efficiency in ICs, ensuring high-quality manufacturing and reliability. The study utilized a dataset of IC images with faults, preprocessed for noise reduction and segmentation, and trained using TensorFlow and Keras. The CNN model was implemented in Python, leveraging Cadence Modus for simulation and verification, achieving an accuracy of 98.2% in fault detection. Evaluation metrics, including Precision, Recall, and F1 Score, validated the model's performance, demonstrating high sensitivity and specificity in fault identification. Future work includes optimizing the model for large-scale IC designs and integrating it into the manufacturing process for real-time fault detection, enhancing quality control and reducing production costs.",
    },
  ];

  return (
    <div className="snap-section min-h-screen flex flex-col items-center justify-center gap-6 bg-gradient-to-b from-gray-950 to-gray-900 p-4 md:p-10 relative">
      {/* Responsive Heading */}
      <h2 className="text-white text-2xl md:text-4xl font-bold text-center">
        My Projects
      </h2>
      <p className="text-gray-400 text-sm md:text-lg text-center max-w-2xl px-4">
        Explore some of the projects I've worked on. Each project demonstrates my skills in various technologies and problem-solving approaches.
      </p>

      {/* Improved Scroll Container */}
      <div className="w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4">
        <div className="flex gap-4 md:gap-6 w-max pb-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal (ensure it's responsive too - content not shown here) */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}

const ProjectCard = ({ project, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="snap-start relative p-4 md:p-6 rounded-xl backdrop-blur-lg bg-gradient-to-br from-gray-800/40 to-gray-700/40 border border-gray-500/20 shadow-2xl overflow-hidden flex flex-col min-w-[85vw] md:min-w-[320px] max-w-[85vw] md:max-w-[320px] h-[75vh] md:h-[500px]"
    >
      <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-br from-gray-500/20 to-gray-400/20 -z-10 mask-border" />

      {/* Responsive Image */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl mb-3 md:mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <h3 className="text-white text-base md:text-lg font-semibold">
          {project.title}
        </h3>

        <div className="flex-1 overflow-y-auto mt-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700 pr-2">
          <p className="text-gray-300 text-sm leading-snug">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700/50 rounded-md text-[0.65rem] md:text-xs text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <p className="text-gray-400 text-xs mt-3 leading-relaxed">
            {project.details}
          </p>
        </div>

        {/* Responsive Button */}
        <button
          onClick={onClick}
          className="mt-4 w-full md:w-auto text-center px-4 py-3 md:py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm md:text-base text-white font-medium transition-all duration-300"
        >
          View Project
        </button>
      </div>
    </motion.div>
  );
};