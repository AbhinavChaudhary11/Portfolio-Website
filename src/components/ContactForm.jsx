import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useState } from "react";

const ContactForm = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState(""); // "", "success", "error"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/mzzaqjjk", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();

        // Close modal after 2s
        setTimeout(() => {
          setStatus("");
          onClose();
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="contact-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            key="contact-inner"
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 30 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 30,
              duration: 0.8,
            }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                       w-full h-full sm:h-auto sm:max-w-md sm:max-h-[90vh] 
                       p-4 sm:p-6 relative overflow-y-auto"
          >
            {/* ✅ Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-300">Get in Touch</h1>
              <button onClick={onClose}>
                <FiX className="w-5 h-5 text-gray-300 font-extrabold" />
              </button>
            </div>

            {/* ✅ Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm text-gray-300 font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-violet-500 focus:border-violet-500 
                             bg-gray-700"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm text-gray-300 font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-violet-500 focus:border-violet-500 
                             bg-gray-700"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm text-gray-300 font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  rows="4"
                  id="message"
                  name="message"
                  required
                  placeholder="How can I help you?"
                  className="w-full px-4 py-2 border border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-violet-500 focus:border-violet-500 
                             bg-gray-700"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 
                           hover:from-violet-700 hover:to-purple-700 
                           shadow-md hover:shadow-lg hover:shadow-violet-600/50 
                           rounded-lg transition-all duration-300"
              >
                Send Message
              </motion.button>
            </form>

            {/* ✅ Popup INSIDE the modal */}
            {status === "success" && (
              <motion.div
                key="success-popup"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg text-center z-[200]"
              >
                ✅ Message Sent!
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                key="error-popup"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                           bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg text-center z-[200]"
              >
                ❌ Something went wrong.
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactForm;
