import { motion } from "motion/react";
import { Check, Star } from "lucide-react";
import packageFlyer from "../../imports/image-1.png";

const packages = [
  {
    name: "SGR to Kilifi",
    price: "1,000",
    features: [
      "One-Way SGR Transfer",
      "Professional & Safe Driver",
      "Clean, Air-Conditioned Vehicle",
      "Luggage Assistance Included",
      "Direct Drop-off at Hotel/Resort",
      "24/7 Booking Support"
    ],
    popular: false,
    gradient: "from-sky-400 to-blue-500"
  },
  {
    name: "SGR to Watamu",
    price: "1,300",
    features: [
      "One-Way SGR Transfer",
      "Professional & Safe Driver",
      "Clean, Air-Conditioned Vehicle",
      "Luggage Assistance Included",
      "Direct Drop-off at Hotel/Resort",
      "24/7 Booking Support"
    ],
    popular: true,
    gradient: "from-orange-400 to-pink-500"
  },
  {
    name: "SGR to Malindi",
    price: "1,200",
    features: [
      "One-Way SGR Transfer",
      "Professional & Safe Driver",
      "Clean, Air-Conditioned Vehicle",
      "Luggage Assistance Included",
      "Direct Drop-off at Hotel/Resort",
      "24/7 Booking Support"
    ],
    popular: false,
    gradient: "from-emerald-400 to-teal-500"
  }
];

export function Packages() {
  return (
    <section id="packages" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-sky-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Kilifi Tour <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Packages</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Choose the perfect package for your Kilifi beach adventure
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={packageFlyer}
              alt="Kilifi Tour Packages"
              className="w-full rounded-2xl shadow-2xl"
            />
          </motion.div>

          <div className="grid gap-4 sm:gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative bg-white p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 ${
                  pkg.popular ? 'border-orange-400' : 'border-transparent'
                }`}
              >
                {pkg.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg"
                  >
                    <Star className="w-4 h-4 fill-current" />
                    Popular
                  </motion.div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">{pkg.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                        KES {pkg.price}
                      </span>
                      <span className="text-gray-500 text-sm">/ person</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${pkg.gradient} rounded-lg flex items-center justify-center`}>
                    <Check className="w-6 h-6 text-white" />
                  </div>
                </div>

                <ul className="space-y-2 sm:space-y-3">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm sm:text-base text-gray-700">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all block text-center ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
                      : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                  }`}
                >
                  Book Now
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
