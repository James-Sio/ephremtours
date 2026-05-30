import { motion } from "motion/react";
import { Plane, Train, Hotel, Camera, MapPin, Users } from "lucide-react";

const services = [
  {
    icon: Train,
    title: "SGR Transfers",
    description: "Comfortable transit from Mombasa Terminus. Kilifi (KES 1,000), Watamu (KES 1,300), Malindi (KES 1,200).",
    color: "from-orange-400 to-red-500"
  },
  {
    icon: Plane,
    title: "Airport Transfers",
    description: "Reliable, on-time arrivals and departures at all major coastal airports. Stress-free pick-ups.",
    color: "from-sky-400 to-blue-500"
  },
  {
    icon: Hotel,
    title: "Hotel Transfers",
    description: "Stay relaxed with direct, premium transport to and from top luxury resorts on the coast.",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: MapPin,
    title: "City Tours",
    description: "Explore the best sights, attractions, and cultural spots in Mombasa, Malindi, Watamu, and Kilifi.",
    color: "from-purple-400 to-pink-500"
  },
  {
    icon: Camera,
    title: "Safari & Excursions",
    description: "Thrilling game drives in Maasai Mara, Tsavo, and Amboseli with professional guides.",
    color: "from-amber-400 to-orange-500"
  },
  {
    icon: Users,
    title: "Group & Corporate",
    description: "Travel together, memories forever! Reliable group and corporate event transportation.",
    color: "from-indigo-400 to-purple-500"
  }
];

export function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-sky-50 px-3 py-1.5 rounded-full mb-3">
            <Plane className="w-4 h-4 text-sky-600" />
            <span className="text-xs sm:text-sm font-semibold text-sky-700 uppercase tracking-wider">What We Offer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Our <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Comprehensive transportation and touring solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-5`}
              >
                <service.icon className="w-8 h-8 text-white" />
              </motion.div>

              <h3 className="text-xl font-bold mb-3 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
