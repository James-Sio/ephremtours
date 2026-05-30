import { motion } from "motion/react";
import { Plane, Train, Hotel, Camera } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Airport Transfer",
    description: "Reliable & on time transfers to and from all major airports in Kenya.",
    color: "from-sky-400 to-blue-500"
  },
  {
    icon: Train,
    title: "SGR Transfer",
    description: "Comfortable & safe transit between SGR terminuses and your destination.",
    color: "from-orange-400 to-red-500"
  },
  {
    icon: Hotel,
    title: "Hotels Transfer",
    description: "Stay relaxed with direct, comfortable transport to and from top coastal resorts.",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: Camera,
    title: "City Tour",
    description: "Explore & enjoy the best sights, attractions, and cultural spots in Malindi, Watamu, and Kilifi.",
    color: "from-purple-400 to-pink-500"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Our <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Comprehensive transportation solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-gray-50 to-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${service.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4`}
              >
                <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </motion.div>

              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800">{service.title}</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
