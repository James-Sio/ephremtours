import { motion } from "motion/react";
import { Train, Plane, Camera, Hotel, Calendar } from "lucide-react";
import { Link } from "react-router";
import companyLogo from "../../imports/image.png";

const quickServices = [
  { id: "sgr", icon: Train, label: "SGR Transfer", color: "text-orange-600", bg: "bg-orange-100" },
  { id: "airport", icon: Plane, label: "Airport VIP", color: "text-sky-600", bg: "bg-sky-100" },
  { id: "safari", icon: Camera, label: "Safaris", color: "text-amber-600", bg: "bg-amber-100" },
  { id: "hotel", icon: Hotel, label: "Shuttles", color: "text-emerald-600", bg: "bg-emerald-100" },
];

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden pt-24 pb-16 bg-white">
      
      {/* Ultra-Clean Subtle Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-50 rounded-full blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] opacity-70 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Typography & Quick Scan */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* High-End Typography */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1]"
            >
              Discerning Travel.<br />
              <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Impeccable Service.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-gray-600 mb-10 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Executive transfers from SGR, premium airport meet & greets, and curated luxury safaris across the Kenyan Coast.
            </motion.p>

            {/* Quick-Scan Service Bar (Mobile Optimized for White Bg) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full mb-10"
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Service Select</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {quickServices.map((service) => (
                  <Link 
                    key={service.id}
                    to="/services"
                    className="bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-sky-100 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all hover:-translate-y-1 group"
                  >
                    <div className={`w-10 h-10 ${service.bg} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform`}>
                      <service.icon className={`w-5 h-5 ${service.color}`} />
                    </div>
                    <span className="text-gray-800 font-semibold text-xs sm:text-sm">{service.label}</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Main Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto max-w-md sm:max-w-none"
            >
              <Link 
                to="/packages" 
                className="px-8 py-4 bg-[#003B73] hover:bg-[#002a52] text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
              >
                <Calendar className="w-5 h-5" />
                Book a Safari
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-white border border-[#F9A03F] hover:bg-[#F9A03F] hover:text-white text-[#F9A03F] font-bold rounded-full transition-colors flex items-center justify-center shadow-sm"
              >
                Request Custom Quote
              </Link>
            </motion.div>
          </div>

          {/* Right Column: Bouncing Flyer */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex justify-center mt-12 lg:mt-0"
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
              className="relative z-10 w-full max-w-[280px] sm:max-w-sm"
            >
              <img
                src={companyLogo}
                alt="Ephream Tours Business Card"
                className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white"
              />
              
              <motion.div 
                animate={{ y: [0, 10, 0] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white p-3 sm:p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-2 sm:gap-3"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-lg sm:text-xl">🌟</span>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-[#003B73] font-medium uppercase">Rating</p>
                  <p className="text-xs sm:text-sm font-bold text-[#F9A03F]">5.0 Top Rated</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Glowing background behind flyer */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-tr from-[#003B73] to-[#F9A03F] rounded-full blur-[80px] -z-10 opacity-40"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
