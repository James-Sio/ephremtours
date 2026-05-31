import { motion } from "motion/react";
import { Train, Plane, Hotel, MapPin, Camera, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const services = [
  { id: "sgr", title: "SGR Transfers", icon: Train, color: "from-orange-400 to-red-500", shadow: "shadow-orange-500/20" },
  { id: "airport", title: "VIP Airport", icon: Plane, color: "from-sky-400 to-blue-500", shadow: "shadow-sky-500/20" },
  { id: "hotel", title: "Hotel Shuttles", icon: Hotel, color: "from-green-400 to-emerald-500", shadow: "shadow-green-500/20" },
  { id: "city", title: "City Tours", icon: MapPin, color: "from-purple-400 to-pink-500", shadow: "shadow-purple-500/20" },
  { id: "safari", title: "Safaris", icon: Camera, color: "from-amber-400 to-orange-500", shadow: "shadow-amber-500/20" },
  { id: "group", title: "Corporate", icon: Users, color: "from-indigo-400 to-blue-600", shadow: "shadow-indigo-500/20" }
];

export function CoreServicesHome() {
  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
            >
              Our Core <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Expertise</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg"
            >
              From seamless SGR transfers to luxurious coastal safaris, we provide impeccable service tailored to the discerning traveler.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <Link to="/services" className="inline-flex items-center gap-2 text-sky-400 hover:text-white font-semibold transition-colors group">
              Explore All Services
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link 
                to="/services" 
                className="group block h-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl text-center"
              >
                <div className={`w-12 h-12 mx-auto bg-gradient-to-br ${service.color} ${service.shadow} rounded-xl flex items-center justify-center shadow-lg mb-4 transform transition-transform group-hover:rotate-12`}>
                  <service.icon className="w-6 h-6 text-white drop-shadow-md" />
                </div>
                <h3 className="text-white font-semibold text-sm sm:text-base">{service.title}</h3>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
