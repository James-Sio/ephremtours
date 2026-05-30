import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import { 
  Plane, Train, Hotel, MapPin, Users, Camera, Search, Ship, 
  Moon, Sun, Coffee, Music, Building2, ShieldCheck, HeartPulse, 
  Video, Compass, Anchor, Car, CheckCircle2, ChevronRight 
} from "lucide-react";
import { Link } from "react-router";

// --- Data Structure for 25+ Services ---
const serviceCategories = [
  "All", 
  "Transfers", 
  "Safaris & Wildlife", 
  "Coastal Excursions", 
  "City & Culture", 
  "Specialized Transit"
];

const allServices = [
  // Transfers
  {
    id: 1,
    category: "Transfers",
    title: "SGR Terminus Transfers",
    description: "Seamless pickups from Mombasa Terminus. Connections to Kilifi, Watamu, and Malindi.",
    icon: Train,
    color: "from-orange-400 to-red-500",
    shadow: "shadow-orange-500/20"
  },
  {
    id: 2,
    category: "Transfers",
    title: "VIP Airport Meet & Greet",
    description: "Premium arrivals at Mombasa (MBA) and Malindi (MYD) airports with luggage assistance.",
    icon: Plane,
    color: "from-sky-400 to-blue-500",
    shadow: "shadow-sky-500/20"
  },
  {
    id: 3,
    category: "Transfers",
    title: "Hotel-to-Hotel Shuttles",
    description: "Comfortable, direct transfers between luxury coastal resorts.",
    icon: Hotel,
    color: "from-green-400 to-emerald-500",
    shadow: "shadow-green-500/20"
  },
  {
    id: 4,
    category: "Transfers",
    title: "Intercity Private Cars",
    description: "Direct, private road travel between major cities and coastal towns.",
    icon: Car,
    color: "from-purple-400 to-indigo-500",
    shadow: "shadow-purple-500/20"
  },
  {
    id: 5,
    category: "Transfers",
    title: "Late Night Travel Solutions",
    description: "Safe, monitored 24/7 transport for late arrivals or early departures.",
    icon: Moon,
    color: "from-slate-700 to-gray-900",
    shadow: "shadow-gray-800/20"
  },

  // Safaris & Wildlife
  {
    id: 6,
    category: "Safaris & Wildlife",
    title: "Maasai Mara Big Five Tours",
    description: "Multi-day guided expeditions into the heart of the Maasai Mara reserve.",
    icon: Camera,
    color: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/20"
  },
  {
    id: 7,
    category: "Safaris & Wildlife",
    title: "Tsavo East & West Drives",
    description: "Discover the legendary red elephants and massive untamed landscapes.",
    icon: Compass,
    color: "from-red-400 to-rose-600",
    shadow: "shadow-red-500/20"
  },
  {
    id: 8,
    category: "Safaris & Wildlife",
    title: "Amboseli Kilimanjaro Views",
    description: "Majestic elephant herds with Mount Kilimanjaro as your backdrop.",
    icon: Sun,
    color: "from-yellow-400 to-amber-500",
    shadow: "shadow-yellow-500/20"
  },
  {
    id: 9,
    category: "Safaris & Wildlife",
    title: "Night Game Drives",
    description: "Exciting nocturnal safaris to spot leopards and active predators.",
    icon: Moon,
    color: "from-indigo-600 to-purple-800",
    shadow: "shadow-indigo-500/20"
  },
  {
    id: 10,
    category: "Safaris & Wildlife",
    title: "Photography Safaris",
    description: "Custom-paced tours with expert positioning for professional photographers.",
    icon: Camera,
    color: "from-sky-300 to-cyan-500",
    shadow: "shadow-cyan-500/20"
  },
  {
    id: 11,
    category: "Safaris & Wildlife",
    title: "Arabuko Sokoke Bird Watching",
    description: "Specialized guides for rare coastal birding in Africa's largest coastal forest.",
    icon: CheckCircle2,
    color: "from-emerald-400 to-green-600",
    shadow: "shadow-emerald-500/20"
  },

  // Coastal & Marine Excursions
  {
    id: 12,
    category: "Coastal Excursions",
    title: "Wasini Island Dhow Safari",
    description: "Traditional sailing, dolphin spotting, and incredible seafood dining.",
    icon: Ship,
    color: "from-blue-400 to-cyan-500",
    shadow: "shadow-blue-500/20"
  },
  {
    id: 13,
    category: "Coastal Excursions",
    title: "Watamu Glass-Bottom Boats",
    description: "View spectacular coral reefs without getting wet.",
    icon: Anchor,
    color: "from-teal-400 to-emerald-500",
    shadow: "shadow-teal-500/20"
  },
  {
    id: 14,
    category: "Coastal Excursions",
    title: "Malindi Deep Sea Fishing",
    description: "Chartered boats equipped for big game fishing adventures.",
    icon: Ship,
    color: "from-sky-500 to-blue-700",
    shadow: "shadow-sky-500/20"
  },
  {
    id: 15,
    category: "Coastal Excursions",
    title: "Sunset Ocean Cruises",
    description: "Romantic evening sailing with dinner and drinks on the Indian Ocean.",
    icon: Sun,
    color: "from-orange-400 to-pink-500",
    shadow: "shadow-pink-500/20"
  },
  {
    id: 16,
    category: "Coastal Excursions",
    title: "Scuba Diving Expeditions",
    description: "Guided dives exploring vibrant coastal marine parks and wrecks.",
    icon: Anchor,
    color: "from-cyan-500 to-blue-600",
    shadow: "shadow-cyan-500/20"
  },

  // City & Culture
  {
    id: 17,
    category: "City & Culture",
    title: "Mombasa Historic City Tour",
    description: "Guided walks through Fort Jesus, Old Town, and the spice markets.",
    icon: Building2,
    color: "from-stone-400 to-stone-600",
    shadow: "shadow-stone-500/20"
  },
  {
    id: 18,
    category: "City & Culture",
    title: "Marafa Hell's Kitchen",
    description: "Sunset tours of the majestic sandstone gorge known as Nyari.",
    icon: Sun,
    color: "from-orange-500 to-red-600",
    shadow: "shadow-orange-500/20"
  },
  {
    id: 19,
    category: "City & Culture",
    title: "Gede Ruins Exploration",
    description: "Discover the mysteries of the abandoned 12th-century Swahili settlement.",
    icon: MapPin,
    color: "from-green-500 to-emerald-700",
    shadow: "shadow-green-500/20"
  },
  {
    id: 20,
    category: "City & Culture",
    title: "Local Village Experiences",
    description: "Authentic, respectful interactions with local coastal communities.",
    icon: Users,
    color: "from-amber-500 to-orange-600",
    shadow: "shadow-amber-500/20"
  },
  {
    id: 21,
    category: "City & Culture",
    title: "Swahili Culinary Tours",
    description: "Taste your way through the coast's best street food and local delicacies.",
    icon: Coffee,
    color: "from-orange-300 to-amber-500",
    shadow: "shadow-orange-500/20"
  },
  {
    id: 22,
    category: "City & Culture",
    title: "Coastal Nightlife Tours",
    description: "Safe, guided experiences to the best evening entertainment venues.",
    icon: Music,
    color: "from-fuchsia-500 to-purple-600",
    shadow: "shadow-purple-500/20"
  },

  // Specialized Transit
  {
    id: 23,
    category: "Specialized Transit",
    title: "Corporate Retreat Transport",
    description: "Reliable fleet coordination for large teams and company events.",
    icon: Building2,
    color: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20"
  },
  {
    id: 24,
    category: "Specialized Transit",
    title: "Wedding Fleet Services",
    description: "Premium, decorated vehicles for bridal parties and guest shuttles.",
    icon: HeartPulse,
    color: "from-pink-400 to-rose-500",
    shadow: "shadow-pink-500/20"
  },
  {
    id: 25,
    category: "Specialized Transit",
    title: "SOS/Emergency Evacuation",
    description: "Priority, fast-response travel logistics for medical or urgent needs.",
    icon: ShieldCheck,
    color: "from-red-500 to-rose-700",
    shadow: "shadow-red-500/20"
  },
  {
    id: 26,
    category: "Specialized Transit",
    title: "Film Crew Transport",
    description: "Heavy-duty transit solutions for production companies and equipment.",
    icon: Video,
    color: "from-zinc-600 to-neutral-800",
    shadow: "shadow-zinc-500/20"
  }
];

export function ServicesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = useMemo(() => {
    return allServices.filter(service => {
      const matchesCategory = activeTab === "All" || service.category === activeTab;
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="pt-24 pb-20 bg-gray-900 min-h-screen relative overflow-hidden">
      
      {/* Premium Dark Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-900/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6"
          >
            <Plane className="w-4 h-4 text-sky-400" />
            <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">Comprehensive Directory</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6"
          >
            World-Class <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto font-light"
          >
            Explore our massive catalog of over 25 specialized transportation and tour services. Whatever your journey requires, we deliver with excellence.
          </motion.p>
        </div>

        {/* Controls: Search & Tabs */}
        <div className="mb-12 flex flex-col items-center gap-6">
          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative w-full max-w-md"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for a service... (e.g., Airport, Safari)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 backdrop-blur-md transition-all"
            />
          </motion.div>

          {/* Categories / Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 max-w-4xl"
          >
            {serviceCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeTab === category
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 border border-transparent"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Services Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <motion.div
                  layout
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.5) }}
                  className="group h-full"
                >
                  <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-3xl transition-all duration-300 hover:border-white/20 hover:-translate-y-2 hover:shadow-2xl hover:bg-white/10 flex flex-col relative overflow-hidden">
                    
                    {/* Glowing Orb on Hover */}
                    <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.color} rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    
                    {/* Icon Header */}
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className={`w-14 h-14 bg-gradient-to-br ${service.color} ${service.shadow} rounded-2xl flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:rotate-12`}>
                        <service.icon className="w-7 h-7 text-white drop-shadow-md" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-sky-400 uppercase tracking-wider bg-sky-400/10 px-3 py-1 rounded-full border border-sky-400/20">
                        {service.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow relative z-10">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white">{service.title}</h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-6">
                        {service.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <Link 
                      to="/contact"
                      className="mt-auto inline-flex items-center gap-2 text-sky-400 font-semibold group-hover:text-white transition-colors relative z-10"
                    >
                      Book Service
                      <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="col-span-full py-20 text-center"
              >
                <Search className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-bold text-white mb-2">No Services Found</h3>
                <p className="text-gray-400">Try adjusting your search terms or category filter.</p>
                <button 
                  onClick={() => {setSearchQuery(""); setActiveTab("All");}}
                  className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 sm:mt-24 text-center bg-gradient-to-r from-sky-900/50 to-blue-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Don't see what you need?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              We specialize in custom itineraries and highly tailored logistics. Contact our team to design the perfect travel experience for you.
            </p>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-sky-500/25"
            >
              Request Custom Service
              <Plane className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
