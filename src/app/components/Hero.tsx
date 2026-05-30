import { motion } from "motion/react";
import { Train, Plane, Camera, Hotel, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router";

import heroBg from "../../imports/gallery-14.jpg"; // Using the Van or a nice coastal shot

const quickServices = [
  { id: "sgr", icon: Train, label: "SGR Transfer", color: "text-orange-400" },
  { id: "airport", icon: Plane, label: "Airport VIP", color: "text-sky-400" },
  { id: "safari", icon: Camera, label: "Safaris", color: "text-amber-400" },
  { id: "hotel", icon: Hotel, label: "Shuttles", color: "text-emerald-400" },
];

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden pt-24 pb-16">
      
      {/* Immersive Full-Screen Background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      />
      
      {/* Cinematic Dark Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900/90 via-gray-900/60 to-gray-900/90 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        
        {/* VIP Event Banner (Restyled for dark theme) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12"
        >
          <Link to="/contact" className="inline-flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-colors group">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-200">
              <strong className="text-white">Summer Tides Event:</strong> July 1st - 5th
            </span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </Link>
        </motion.div>

        {/* High-End Typography */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]"
        >
          Discerning Travel.<br />
          <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Impeccable Service.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Executive transfers from SGR, premium airport meet & greets, and curated luxury safaris across the Kenyan Coast.
        </motion.p>

        {/* Quick-Scan Service Bar (Mobile Optimized) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-4xl mx-auto"
        >
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Service Select</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {quickServices.map((service, idx) => (
              <Link 
                key={service.id}
                to="/services"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 p-4 sm:p-5 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all hover:-translate-y-1 hover:shadow-xl group"
              >
                <service.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${service.color} transform group-hover:scale-110 transition-transform`} />
                <span className="text-white font-semibold text-sm sm:text-base">{service.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Main Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <Link 
            to="/packages" 
            className="px-8 py-4 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-full transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sky-900/50"
          >
            <Calendar className="w-5 h-5" />
            Book a Safari
          </Link>
          <Link 
            to="/contact" 
            className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold rounded-full transition-colors flex items-center justify-center"
          >
            Request Custom Quote
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
