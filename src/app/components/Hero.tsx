import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import companyLogo from "../../imports/image.png";

export function Hero() {
  return (
    <section id="home" className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-sky-100 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6"
          >
            <Sparkles className="w-4 h-4 text-sky-600" />
            <span className="text-xs sm:text-sm text-sky-700">Your Journey Begins Here</span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              Explore Kenya
            </span>
            <br />
            <span className="text-gray-800">With Confidence</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
            Professional transfer services and unforgettable tour experiences across Kenya.
            Your comfort and safety are our top priorities.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <motion.a
              href="#packages"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-sky-500 to-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              View Packages
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-sky-600 text-sky-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-sky-50 transition-colors text-center"
            >
              Contact Us
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-8 md:mt-0"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <img
              src={companyLogo}
              alt="Ephream Tours Business Card"
              className="w-full max-w-sm sm:max-w-md mx-auto rounded-xl sm:rounded-2xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-600 rounded-xl sm:rounded-2xl blur-3xl -z-10"
          />
        </motion.div>
      </div>
    </section>
  );
}
