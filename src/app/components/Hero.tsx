import { motion } from "motion/react";
import { ArrowRight, Sparkles, Calendar, Music } from "lucide-react";
import companyLogo from "../../imports/image.png";

export function Hero() {
  return (
    <section id="home" className="pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-50 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 md:gap-12">
        
        {/* Summer Tides Promo Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-2xl p-1 shadow-xl"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center shrink-0 shadow-inner">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg sm:text-xl flex items-center gap-2">
                  SUMMER TIDES IS COMING! <span className="text-orange-500">🔥</span>
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">Malindi • 1st - 5th July 2026 • Live Music & Beach Vibes</p>
              </div>
            </div>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold rounded-lg shadow-md whitespace-nowrap flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Early
            </motion.a>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 bg-sky-100 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6"
            >
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span className="text-xs sm:text-sm font-semibold text-sky-700 uppercase tracking-wider">Your Journey Begins Here</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                Explore Kenya
              </span>
              <br />
              <span className="text-gray-800">With Confidence</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-lg">
              Professional transfer services and unforgettable tour experiences across Kenya. 
              Your comfort, safety, and lifetime memories are our top priorities.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.a
                href="#packages"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-sky-200 hover:shadow-xl transition-all"
              >
                View Safari Packages
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white border-2 border-gray-200 text-gray-700 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:border-sky-300 hover:bg-sky-50 transition-all text-center"
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mt-8 md:mt-0 flex justify-center"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 3, 0, -3, 0]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative z-10 w-full max-w-[280px] sm:max-w-sm md:max-w-md"
            >
              <img
                src={companyLogo}
                alt="Ephream Tours Business Card"
                className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white"
              />
              
              {/* Decorative Floating Elements */}
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-xl">🌟</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase">Rating</p>
                  <p className="text-sm font-bold text-gray-800">5.0 Top Rated</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-purple-400 rounded-full blur-[80px] -z-10"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
