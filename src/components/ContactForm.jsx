import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

const ContactForm = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 200, damping: 30, duration: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-300">Get in Touch</h1>
              <button onClick={onClose}>
                <FiX className="w-5 h-5 text-gray-300 font-extrabold" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-300 font-medium mb-1">Name</label>
                <input type="text" id="name" placeholder="Your Name" className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"/>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-gray-300 font-medium mb-1">Email</label>
                <input type="email" id="email" placeholder="Your Email" className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"/>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-gray-300 font-medium mb-1">Message</label>
                <textarea rows="4" id="message" placeholder="How can I help you?" className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700"/>
              </div>
              <motion.button type="submit" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 hover:from-violet-700 hover:to-purple-700 shadow-md hover:shadow-lg hover:shadow-violet-600/50 rounded-lg transition-all duration-300">
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
