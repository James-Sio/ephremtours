import { motion } from "motion/react";
import { Link } from "react-router";
import { CheckCircle2, ShieldCheck, ThermometerSnowflake, Users } from "lucide-react";

import fleet1 from "../../imports/gallery-22.jpg"; 
import fleet2 from "../../imports/gallery-14.jpg"; 

export function SignatureFleet() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
          >
            Our Signature <span className="text-sky-600">Fleet</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto font-light"
          >
            Executive vehicles designed for absolute comfort. Climate control, premium interiors, and highly trained private chauffeurs.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={fleet2} alt="Executive Van" className="w-full aspect-[4/3] sm:aspect-video object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Executive Vans</h3>
                  <p className="text-gray-200">Spacious seating for 7-14 passengers with ample luggage room.</p>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-sky-600 text-white p-6 rounded-2xl shadow-xl hidden sm:block">
              <ShieldCheck className="w-10 h-10 mb-2" />
              <div className="font-bold text-lg">GPS Tracked</div>
              <div className="text-sky-200 text-sm">For your safety</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
                  <ThermometerSnowflake className="w-6 h-6 text-sky-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Advanced Climate Control</h4>
                  <p className="text-gray-600">Beat the coastal heat. Every vehicle features powerful, dual-zone air conditioning ensuring a cool ride from SGR to your resort.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Private Chauffeurs</h4>
                  <p className="text-gray-600">Our drivers are immaculately presented, deeply knowledgeable about local routes, and trained in defensive driving.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Immaculate Cleanliness</h4>
                  <p className="text-gray-600">Vehicles are detailed daily. We pride ourselves on providing a spotless, fresh environment for every single transfer.</p>
                </div>
              </div>
            </div>

            <Link
              to="/car-hire"
              className="touch-target inline-flex items-center justify-center gap-2 mt-4 px-8 py-4 bg-[#003B73] hover:bg-[#002a52] text-white font-bold rounded-full transition-colors"
            >
              Hire a car with driver
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
