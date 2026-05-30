import { motion } from "motion/react";
import { Award, Users, Clock, Shield } from "lucide-react";

const stats = [
  { icon: Award, label: "Years of Excellence", value: "10+" },
  { icon: Users, label: "Happy Customers", value: "5000+" },
  { icon: Clock, label: "24/7 Availability", value: "Always" },
  { icon: Shield, label: "Safety Rating", value: "100%" }
];

export function About() {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sky-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Why Choose <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Ephream Tours</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
              With over a decade of experience in the Kenyan tourism and transportation industry,
              we pride ourselves on delivering exceptional service that exceeds expectations.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Our professional team ensures your journey is comfortable, safe, and memorable.
              Whether you need a quick airport transfer or a comprehensive tour package,
              we've got you covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 order-1 md:order-2">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg text-center"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                  className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg mb-2 sm:mb-3"
                >
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </motion.div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
