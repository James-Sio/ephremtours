import { motion } from "motion/react";
import { Check, Star, Map, Calendar, Users, Eye } from "lucide-react";
import { Link } from "react-router";

// Standardizing import paths for package background images
import safariHeroImage from "../../imports/gallery-10.jpg";
import maraImage from "../../imports/gallery-13.jpg";
import amboseliImage from "../../imports/gallery-14.jpg";
import tsavoImage from "../../imports/gallery-15.jpg";
import wasiniImage from "../../imports/gallery-16.jpg";
import mombasaImage from "../../imports/gallery-17.jpg";
import marafaImage from "../../imports/gallery-18.jpg";
import malindiImage from "../../imports/gallery-19.jpg";

const MotionLink = motion.create(Link);

const packages = [
  {
    name: "Maasai Mara Safari",
    duration: "3 Days / 2 Nights",
    price: "25,000",
    image: maraImage,
    rating: "4.9",
    reviews: "184 reviews",
    category: "Wildlife Safari",
    features: [
      "Big Five Game Drives",
      "Professional Chauffeur Guide",
      "Comfortable 4x4 Cruiser",
      "Full Board Accommodation",
      "Park Entry & Pick-up Services"
    ],
    popular: true,
    gradient: "from-orange-500 to-amber-600"
  },
  {
    name: "Amboseli Elephant Wilderness",
    duration: "2 Days / 1 Night",
    price: "18,500",
    image: amboseliImage,
    rating: "4.8",
    reviews: "92 reviews",
    category: "Mountain View",
    features: [
      "Giant Elephant Herd Tracking",
      "Spectacular Mt. Kilimanjaro Views",
      "Luxury Park Lodge Stay",
      "Private 4x4 Game Drives",
      "Chef-prepared Meals"
    ],
    popular: false,
    gradient: "from-sky-500 to-blue-600"
  },
  {
    name: "Tsavo East Adventure",
    duration: "2 Days / 1 Night",
    price: "15,000",
    image: tsavoImage,
    rating: "4.9",
    reviews: "116 reviews",
    category: "Untamed Nature",
    features: [
      "Famous Red-dust Elephants",
      "Aruba Dam Wildlife Viewing",
      "Scenic Yatta Plateau tour",
      "Professional Ranger Escort",
      "Classic Safari Camp stay"
    ],
    popular: true,
    gradient: "from-emerald-500 to-teal-600"
  },
  {
    name: "Wasini Island Dhow Tour",
    duration: "Full Day",
    price: "4,500",
    image: wasiniImage,
    rating: "5.0",
    reviews: "215 reviews",
    category: "Marine Adventure",
    features: [
      "Traditional Swahili Dhow Cruise",
      "Snorkeling in Coral Gardens",
      "Dolphin Spotting Experience",
      "Sumptuous Seafood Banquet",
      "Historical Island Walk"
    ],
    popular: false,
    gradient: "from-cyan-500 to-blue-600"
  },
  {
    name: "Mombasa Cultural Day Tour",
    duration: "Full Day",
    price: "3,000",
    image: mombasaImage,
    rating: "4.7",
    reviews: "78 reviews",
    category: "Heritage & History",
    features: [
      "Guided Fort Jesus Exploration",
      "Mombasa Old Town Walking Tour",
      "Famous Elephant Tusks visit",
      "Authentic Swahili Lunch",
      "Spices & Crafts Souvenir Market"
    ],
    popular: false,
    gradient: "from-purple-500 to-pink-600"
  },
  {
    name: "Marafa Hell's Kitchen Canyon",
    duration: "Half Day",
    price: "2,500",
    image: marafaImage,
    rating: "4.8",
    reviews: "64 reviews",
    category: "Geological Wonder",
    features: [
      "Stunning Sandstone Gorges",
      "Guided Canyon Sunset Trek",
      "Amazing Panoramic Photography",
      "Local Folklore Stories",
      "Convenient Hotel Transfers"
    ],
    popular: false,
    gradient: "from-orange-500 to-amber-600"
  },
  {
    name: "Malindi Golden Beach Holiday",
    duration: "Full Day",
    price: "2,000",
    image: malindiImage,
    rating: "4.6",
    reviews: "82 reviews",
    category: "Beach Escapes",
    features: [
      "Pristine White Sands",
      "Vasco da Gama Pillar Visit",
      "Malindi Marine Park glass boat",
      "Premium Coastal Resort Access",
      "Sunset Ocean Promenade"
    ],
    popular: false,
    gradient: "from-blue-500 to-indigo-600"
  }
];

export function Packages() {
  return (
    <section id="packages" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-sky-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100/50 px-4 py-2 rounded-full mb-4 shadow-sm">
            <Map className="w-4 h-4 text-sky-600 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-[#003B73] uppercase tracking-widest">Unforgettable Journeys</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Explore Kenya <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-[#003B73] bg-clip-text text-transparent">Packages</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 font-light leading-relaxed">
            Premium luxury safari excursions, beautiful coastal island tours, and rich heritage experiences curated for the discerning traveler.
          </p>
        </motion.div>

        {/* Dynamic Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8 md:gap-10">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex flex-col bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 ${
                pkg.popular ? 'ring-2 ring-[#F9A03F]' : ''
              }`}
            >
              
              {/* Card Image Header */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Visual Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#F9A03F] to-amber-500 text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-10 uppercase tracking-wider">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    Best Seller
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-md uppercase tracking-wider">
                  {pkg.category}
                </div>

                {/* Package Duration over Image */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#F9A03F]" />
                  {pkg.duration}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-col p-6 sm:p-7 flex-grow">
                
                {/* Rating & Review Summary */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-gray-900 ml-1">{pkg.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">({pkg.reviews})</span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-gray-800 mb-4 group-hover:text-[#003B73] transition-colors leading-tight">
                  {pkg.name}
                </h3>

                {/* Separator */}
                <div className="w-full h-px bg-gray-100 mb-5" />

                {/* Highlights List */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-600 font-bold" />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer Pricing & Booking */}
                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">All-Inclusive From</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black text-[#003B73]">
                        KES {pkg.price}
                      </span>
                      <span className="text-gray-400 text-xs font-semibold">/ p.p</span>
                    </div>
                  </div>

                  <MotionLink
                    to="/contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all ${
                      pkg.popular
                        ? 'bg-[#003B73] hover:bg-[#002a52] text-white shadow-lg shadow-blue-900/20'
                        : 'bg-sky-50 hover:bg-sky-100 text-[#003B73]'
                    }`}
                  >
                    Enquire Now
                  </MotionLink>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
