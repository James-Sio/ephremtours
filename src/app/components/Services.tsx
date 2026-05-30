import { motion } from "motion/react";
import { Plane, Train, Hotel, Camera, MapPin, Users } from "lucide-react";

const services = [
  {
    icon: Train,
    title: "SGR Transfers",
    description: "Comfortable transit from Mombasa Terminus. Kilifi (KES 1,000), Watamu (KES 1,300), Malindi (KES 1,200).",
    color: "from-orange-400 to-red-500",
    shadow: "shadow-orange-500/20"
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "Reliable, on-time arrivals and departures at all major coastal airports. Stress-free pick-ups.",
    color: "from-sky-400 to-blue-500",
    shadow: "shadow-sky-500/20"
  },
  {
    icon: Hotel,
    title: "Hotel Transfers",
    description: "Stay relaxed with direct, premium transport to and from top luxury resorts on the coast.",
    color: "from-green-400 to-emerald-500",
    shadow: "shadow-green-500/20"
  },
  {
    icon: MapPin,
    title: "City Tours",
    description: "Explore the best sights, attractions, and cultural spots in Mombasa, Malindi, Watamu, and Kilifi.",
    color: "from-purple-400 to-pink-500",
    shadow: "shadow-purple-500/20"
  },
  {
    icon: Camera,
    title: "Safari & Excursions",
    description: "Thrilling game drives in Maasai Mara, Tsavo, and Amboseli with professional guides.",
    color: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/20"
  },
  {
    icon: Users,
    title: "Group & Corporate",
    description: "Travel together, memories forever! Reliable group and corporate event transportation.",
    color: "from-indigo-400 to-blue-600",
    shadow: "shadow-indigo-500/20"
  }
];

export function Services() {
  return (
    <section id="services" className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden min-h-screen">
      
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[30%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-sky-900/40 to-indigo-900/40 blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[30%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-purple-900/40 to-fuchsia-900/40 blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
            <Plane className="w-4 h-4 text-sky-400" />
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">Premium Services</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white tracking-tight">
            What We <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">Offer</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4 font-light">
            Comprehensive transportation and top-tier touring solutions tailored for your absolute comfort.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative h-full"
            >
              {/* Glassmorphism Card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl blur-[1px] -z-10 transition-all duration-300 group-hover:from-white/20 group-hover:to-white/10" />
              
              <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl transition-all duration-300 group-hover:border-white/20 overflow-hidden relative">
                
                {/* Decorative glowing orb on hover */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.color} rounded-full blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />

                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} ${service.shadow} rounded-2xl flex items-center justify-center mb-6 shadow-lg relative z-10`}
                >
                  <service.icon className="w-8 h-8 text-white drop-shadow-md" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed font-light relative z-10">{service.description}</p>
                
                {/* Interactive underline */}
                <div className="w-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full mt-6 transition-all duration-500 group-hover:w-1/2" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
