import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

const HeroSection = () => {
  const handleDownload = () => {
    fetch("/resume.pdf").then((res) => {
      res.blob().then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "resume.pdf"; // force download
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      });
    });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-violet-800 to-black flex flex-col-reverse xl:flex-row items-center justify-between px-6 md:px-12 lg:px-24 overflow-hidden">
      
      {/* Left Section (Text) */}
      <div className="z-50 text-center xl:text-left max-w-xl relative">
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 40, damping: 25, delay: 1.3, duration: 1.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold z-10 mb-6 leading-tight"
        >
          Turning Ideas into Reality
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 40, damping: 25, delay: 1.8, duration: 1.5 }}
          className="text-base md:text-xl lg:text-2xl text-purple-200 max-w-2xl mx-auto xl:mx-0 mb-6"
        >
          I'm a passionate developer specializing in creating fast, reliable,
          and user-friendly web applications.
          <br />
          Let's build something amazing together!
        </motion.p>

        {/* Resume Download Button with animation */}
        <motion.button
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 40, damping: 25, delay: 2.3, duration: 1.5 }}
          onClick={handleDownload}
          className="relative z-50 mt-6 px-6 py-3 bg-violet-600 text-white font-semibold rounded-lg shadow-lg hover:bg-violet-500 transition-colors duration-300"
        >
          Download Resume
        </motion.button>
      </div>

      {/* Right Section (Robot) */}
      <motion.div 
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 40, damping: 25, delay: 1.3, duration: 1.5 }}
          className="w-full xl:w-full flex justify-end items-center relative">
        <div className="relative w-full h-[60vh] xl:h-[700px] max-w-[750px] pointer-events-none">
          <Spline
            scene="https://prod.spline.design/ZThikyO-k2UfQHVi/scene.splinecode"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
