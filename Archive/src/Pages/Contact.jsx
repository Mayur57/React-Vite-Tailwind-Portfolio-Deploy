import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import axios from "axios";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [visitor, setVisitor] = useState(null);


//const BACKEND_URL = "https://react-vite-tailwind-portfolio-deploy-hdgx.vercel.app"; 7march 2:30pm
const BACKEND_URL = "https://react-vite-tailwind-portfolio-deploy-hdgx-7pgzz9nno.vercel.app/api";


useEffect(() => {
    const fetchVisitorData = async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/last-visitor`);
            if (response.data.city !== "Unknown") {
                setVisitor(response.data);
            } else {
                setVisitor(null);
            }
        } catch (error) {
            console.error("Error fetching visitor data:", error);
        }
    };

    fetchVisitorData();
}, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
        await axios.post(`${BACKEND_URL}/send`, formData);
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
    } catch (error) {
        console.error("Error sending message:", error);
        setStatus("Failed to send message. Try again.");
    }
};
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { triggerOnce: false, margin: "-100px" });
  return (
    <motion.div
    ref={sectionRef}
    initial="hidden"
    animate={isInView ? "visible" : "hidden"}
    variants={fadeInUp}
      className=" snap-section min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800"
    >
      {/* Contact Form Box */}
      <motion.div
        variants={fadeInUp}
        className="w-full max-w-xl bg-gray-900/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 transition-all duration-300 hover:shadow-2xl border border-blue-800/30"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
        >
          Get in Touch!
        </motion.h2>

        <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-3">
            <motion.input
              variants={fadeInUp}
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-5 py-3 border-0 rounded-xl bg-gray-800/90 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-100"
            />

            <motion.input
              variants={fadeInUp}
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 border-0 rounded-xl bg-gray-800/90 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-100"
            />

            <motion.textarea
              variants={fadeInUp}
              name="message"
              placeholder="Your message"
              required
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full px-5 py-3 border-0 rounded-xl bg-gray-800/90 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-100"
            ></motion.textarea>
          </div>

          <motion.button
            variants={fadeInUp}
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
          >
            <span className="group-hover:text-blue-200 transition-colors">Send Message</span>
          </motion.button>
        </motion.form>

        {status && (
          <motion.p
            variants={fadeInUp}
            className={`mt-5 text-center text-sm font-medium ${
              status.includes("success") ? "text-green-500" : status.includes("Failed") ? "text-red-400" : "text-yellow-500"
            }`}
          >
            {status}
          </motion.p>
        )}
      </motion.div>

      {/* Last Visitor Section */}
      <motion.div
        variants={fadeInUp}
        className="mt-8 w-full max-w-xl bg-gray-900/90 backdrop-blur-lg rounded-3xl shadow-lg p-5 border border-blue-700/30 text-center"
      >
        <h3 className="text-lg font-semibold text-gray-300">🌍 Last Visitor's Location</h3>
        {visitor ? (
          <p className="text-md mt-2 text-blue-400">
            {visitor.city}, {visitor.country} 🌎 <br />
            <span className="text-gray-400 text-xs">Visited on: {new Date(visitor.timestamp).toLocaleString()}</span>
          </p>
        ) : (
          <p className="text-gray-500 text-xs">Fetching location...</p>
        )}
      </motion.div>

      {/* Social Icons Section */}
      <motion.div
        variants={fadeInUp}
        className="mt-6 flex space-x-6"
      >
        
      {[
          { href: "https://github.com/HarshBhoi36", icon: <FaGithub /> },
          { href: "https://www.linkedin.com/in/harsh-bhoi-b07b22246", icon: <FaLinkedin /> },
          { href: "mailto:harshbhoi3@gmail.com", icon: <FaEnvelope /> }
        ].map((link, index) => (
          <motion.a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="text-gray-400 hover:text-white transition text-2xl"
          >
            {link.icon}
          </motion.a>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.footer
        variants={fadeInUp}
        className="w-full mt-12 py-3 text-center border-t border-gray-700 text-gray-400 text-xs"
      >
        2025 © <a href="https://harshbhoi.dev" className="hover:text-gray-200 transition">harshbhoi.dev</a>
      </motion.footer>
    </motion.div>
  );
};

export default ContactForm;
