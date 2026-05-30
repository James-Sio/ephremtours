import { motion } from "motion/react";
import { Check, Star, Map } from "lucide-react";
import { Link } from "react-router";
import safariHeroImage from "../../imports/gallery-10.jpg";

const MotionLink = motion.create(Link);

const packages = [
  {
    name: "Maasai Mara Safari",
    duration: "3 Days / 2 Nights",
    price: "25,000",
    features: [
      "Big Five Experience",
      "Exciting Game Drives",
      "Professional Guide",
      "Comfortable 4x4 Van",
      "Meals & Accommodation"
    ],
    popular: true,
    gradient: "from-orange-400 to-pink-500"
  },
  {
    name: "Amboseli National Park",
    duration: "2 Days / 1 Night",
    price: "18,500",
    features: [
      "Land of Giants (Elephant Herds)",
      "Mt. Kilimanjaro Views",
      "Game Drives",
      "Amazing Landscapes",
      "Meals & Accommodation"
    ],
    popular: false,
    gradient: "from-sky-400 to-blue-500"
  },
  {
    name: "Tsavo East Safari",
    duration: "2 Days / 1 Night",
    price: "15,000",
    features: [
      "Discover the Untamed",
      "Red Elephants",
      "Aruba Dam & Yatta Plateau",
      "Diverse Wildlife",
      "Meals & Accommodation"
    ],
    popular: true,
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    name: "Wasini Island Tour",
    duration: "Full Day",
    price: "4,500",
    features: [
      "Paradise Awaits",
      "Traditional Dhow Ride",
      "Snorkeling Adventure",
      "Seafood Lunch",
      "Island Exploration"
    ],
    popular: false,
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    name: "Mombasa Day Tour",
    duration: "Full Day",
    price: "3,000",
    features: [
      "History. Culture. Adventure.",
      "Fort Jesus Visit",
      "Old Town Exploration",
      "Beach Time",
      "Local Shopping"
    ],
    popular: false,
    gradient: "from-purple-400 to-pink-500"
  },
  {
    name: "Marafa Hell's Kitchen",
    duration: "Half Day",
    price: "2,500",
    features: [
      "A Natural Wonder",
      "Stunning Views",
      "Great for Photography",
      "Guided Experience",
      "Perfect for Sunsets"
    ],
    popular: false,
    gradient: "from-orange-400 to-amber-500"
  },
  {
    name: "Malindi Beach Holidays",
    duration: "Full Day",
    price: "2,000",
    features: [
      "Sun. Sand. Serenity.",
      "Beautiful Beaches",
      "Water Activities",
      "City Tours",
      "Relax & Unwind"
    ],
    popular: false,
    gradient: "from-blue-400 to-indigo-500"
  }
];

export function Packages() {
  return (
    <section id="packages" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-sky-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-sky-100 px-3 py-1.5 rounded-full mb-3">
            <Map className="w-4 h-4 text-sky-600" />
            <span className="text-xs sm:text-sm font-semibold text-sky-700 uppercase tracking-wider">Unforgettable Journeys</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Explore Kenya <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Packages</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Affordable safari packages and beach excursions for everyone. Let's make your dream trip a reality!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start mb-12">
          {/* Hero Image for Packages */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sticky top-24 hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={safariHeroImage}
                alt="Wild Safari Expeditions"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Wild Beauty. Real Adventure.</h3>
                <p className="text-gray-200">Discover the untamed landscapes and majestic wildlife of Kenya.</p>
              </div>
            </div>
          </motion.div>

          {/* Packages Grid */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className={`relative flex flex-col bg-white p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all border-2 ${
                  pkg.popular ? 'border-orange-400' : 'border-transparent'
                }`}
              >
                {pkg.popular && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-10"
                  >
                    <Star className="w-3 h-3 fill-current" />
                    Popular
                  </motion.div>
                )}

                <div className="flex flex-col mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 leading-tight">{pkg.name}</h3>
                    <div className={`w-10 h-10 shrink-0 bg-gradient-to-br ${pkg.gradient} rounded-lg flex items-center justify-center shadow-md`}>
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-sky-600 mb-2">{pkg.duration}</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-500">From</span>
                    <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                      KES {pkg.price}
                    </span>
                    <span className="text-gray-500 text-xs sm:text-sm">/ p.p.</span>
                  </div>
                </div>

                <div className="w-full h-px bg-gray-100 my-4" />

                <ul className="space-y-2 mb-6 flex-grow">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <MotionLink
                  to="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full mt-auto py-3 rounded-xl text-sm font-bold transition-all block text-center ${
                    pkg.popular
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md'
                      : 'bg-sky-50 text-sky-700 hover:bg-sky-100'
                  }`}
                >
                  Book Now
                </MotionLink>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
