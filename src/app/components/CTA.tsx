import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Star } from "lucide-react";

import bgImage from "../../imports/gallery-23.jpg";

export function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-500/20 text-yellow-400 mb-8"
        >
          <Star className="w-8 h-8 fill-current" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
        >
          Unlock <span className="text-yellow-400">Exclusive</span> Rates
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Subscribe to our VIP network for priority bookings, complimentary upgrades, and private access to our curated coastal experiences.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link 
            to="/contact" 
            className="w-full sm:w-auto px-8 py-4 bg-yellow-500 text-gray-900 font-bold rounded-full hover:bg-yellow-400 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2"
          >
            Join the VIP List
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            to="/services" 
            className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 hover:scale-105 active:scale-95 transition-all backdrop-blur-md border border-white/20"
          >
            View Our Fleet
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
