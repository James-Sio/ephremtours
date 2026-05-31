import { motion } from "motion/react";
import { Shield, Clock, Heart, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Licensed drivers and insured vehicles"
  },
  {
    icon: Clock,
    title: "Always On Time",
    description: "Punctual service guaranteed"
  },
  {
    icon: Heart,
    title: "Customer First",
    description: "Your comfort is our priority"
  },
  {
    icon: TrendingUp,
    title: "Best Value",
    description: "Competitive pricing, premium service"
  }
];

export function Features() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-sky-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-sky-600" />
              </motion.div>
              <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
