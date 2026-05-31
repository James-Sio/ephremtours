import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Star, Map, Calendar, Users, Eye, Search, SlidersHorizontal, ArrowUpDown, ChevronRight, X, Heart, Shield, HelpCircle } from "lucide-react";
import { Link } from "react-router";

const MotionLink = motion.create(Link);

const categories = ["All Experience", "Wildlife Safaris", "Coastal Marine", "Cultural & Scenic"];

const packages = [
  {
    id: "mara",
    name: "Maasai Mara National Reserve",
    duration: "3 Days / 2 Nights",
    price: 25000,
    image: "/tourImages/1.png",
    rating: "4.9",
    reviews: "184 reviews",
    category: "Wildlife Safaris",
    tagline: "The World's Greatest Wildlife Haven",
    specs: { groupSize: "2-8 people", ageLimit: "All Ages", difficulty: "Easy" },
    features: [
      "Big Five Premium Game Drives",
      "Executive Chauffeur Tour Guide",
      "Comfortable 4x4 Land Cruiser",
      "Luxury Savanna Lodge Stay",
      "Park Entry & Pick-up Services"
    ],
    popular: true,
    badge: "Best Seller"
  },
  {
    id: "amboseli",
    name: "Amboseli Elephant Wilderness",
    duration: "2 Days / 1 Night",
    price: 18500,
    image: "/tourImages/4.png",
    rating: "4.8",
    reviews: "92 reviews",
    category: "Wildlife Safaris",
    tagline: "In the Shadow of Mount Kilimanjaro",
    specs: { groupSize: "2-6 people", ageLimit: "All Ages", difficulty: "Easy" },
    features: [
      "Giant Elephant Herd Tracking",
      "Spectacular Mt. Kilimanjaro Views",
      "Luxury Park Lodge Stay",
      "Private 4x4 Game Drives",
      "Gourmet Dining & Sundowners"
    ],
    popular: false,
    badge: "Photographers Choice"
  },
  {
    id: "tsavo",
    name: "Tsavo East National Park",
    duration: "2 Days / 1 Night",
    price: 15000,
    image: "/tourImages/5.png",
    rating: "4.9",
    reviews: "116 reviews",
    category: "Wildlife Safaris",
    tagline: "Discover the Untamed Theater of Nature",
    specs: { groupSize: "2-8 people", ageLimit: "All Ages", difficulty: "Easy" },
    features: [
      "Famous Red-dust Covered Elephants",
      "Aruba Dam Wildlife Viewing",
      "Scenic Yatta Plateau tour",
      "Professional Ranger Escort",
      "Classic Safari Camp stay"
    ],
    popular: true,
    badge: "Untamed Beauty"
  },
  {
    id: "wasini",
    name: "Wasini Island & Kisite Dhow",
    duration: "Full Day",
    price: 4500,
    image: "/tourImages/7.png",
    rating: "5.0",
    reviews: "215 reviews",
    category: "Coastal Marine",
    tagline: "Tropical Snorkeling & Dolphin Safaris",
    specs: { groupSize: "4-20 people", ageLimit: "All Ages", difficulty: "Moderate" },
    features: [
      "Traditional Swahili Dhow Cruise",
      "Snorkeling in Crystal Coral Gardens",
      "Playful Dolphin Spotting Experience",
      "Sumptuous Seafood Banquet",
      "Historical Swahili Village Walk"
    ],
    popular: false,
    badge: "Top Rated"
  },
  {
    id: "mombasa",
    name: "Mombasa Cultural Heritage Tour",
    duration: "Full Day",
    price: 3000,
    image: "/tourImages/10.png",
    rating: "4.7",
    reviews: "78 reviews",
    category: "Cultural & Scenic",
    tagline: "Uncover 500 Years of Coastal History",
    specs: { groupSize: "1-12 people", ageLimit: "All Ages", difficulty: "Easy" },
    features: [
      "Guided Fort Jesus Exploration",
      "Mombasa Old Town Walking Tour",
      "Famous Elephant Tusks visit",
      "Authentic Swahili Lunch",
      "Spices & Crafts Souvenir Market"
    ],
    popular: false,
    badge: "Rich Heritage"
  },
  {
    id: "marafa",
    name: "Marafa Hell's Kitchen Canyon",
    duration: "Half Day",
    price: 2500,
    image: "/tourImages/13.png",
    rating: "4.8",
    reviews: "64 reviews",
    category: "Cultural & Scenic",
    tagline: "Kenya's Breathtaking Sandstone Gorges",
    specs: { groupSize: "2-10 people", ageLimit: "All Ages", difficulty: "Easy" },
    features: [
      "Stunning Sandstone Canyon Formations",
      "Guided Sunset Gorges Trek",
      "Incredible Sunset Photography",
      "Fascinating Local Folklore",
      "Comfortable Hotel Transfers"
    ],
    popular: false,
    badge: "Unique Landscape"
  },
  {
    id: "malindi",
    name: "Malindi Golden Beach Escapes",
    duration: "Full Day",
    price: 2000,
    image: "/tourImages/14.png",
    rating: "4.6",
    reviews: "82 reviews",
    category: "Coastal Marine",
    tagline: "Sun, History, and Pristine Coastal Shores",
    specs: { groupSize: "1-15 people", ageLimit: "All Ages", difficulty: "Easy" },
    features: [
      "Pristine Golden Sand Beach relaxation",
      "Vasco da Gama Pillar Visit",
      "Malindi Marine Park glass boat cruise",
      "Premium Coastal Resort Access",
      "Swahili Coastal Promenades"
    ],
    popular: false,
    badge: "Relaxing Getaway"
  }
];

export function Packages() {
  const [selectedCategory, setSelectedCategory] = useState("All Experience");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular"); // popular, priceAsc, priceDesc, rating
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);

  // Toggle favorite helper
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  // Filter & Sort Logic
  const filteredPackages = useMemo(() => {
    return packages
      .filter(pkg => {
        const matchesCategory = selectedCategory === "All Experience" || pkg.category === selectedCategory;
        const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              pkg.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              pkg.tagline.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "priceAsc") return a.price - b.price;
        if (sortBy === "priceDesc") return b.price - a.price;
        if (sortBy === "rating") return parseFloat(b.rating) - parseFloat(a.rating);
        // Default to popular: puts popular ones first
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="packages" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-sky-50/40 min-h-screen relative overflow-hidden">
      
      {/* Decorative luxury elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-sky-50 rounded-full blur-[140px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[140px] opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Upper Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100/60 px-4 py-2 rounded-full mb-4 shadow-sm">
            <Map className="w-4 h-4 text-sky-600 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-[#003B73] uppercase tracking-widest">Unforgettable Journeys</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1]">
            Explore Kenya <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-[#003B73] bg-clip-text text-transparent">Packages</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 font-light leading-relaxed">
            Premium luxury safari excursions, beautiful coastal island tours, and rich heritage experiences curated for the discerning traveler.
          </p>
        </motion.div>

        {/* Filter, Search & Sort Control Panel */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 p-5 sm:p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            
            {/* Category Switcher Tabs */}
            <div className="flex flex-wrap gap-2 w-full lg:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all relative ${
                    selectedCategory === cat
                      ? "text-white bg-[#003B73]"
                      : "text-gray-600 hover:bg-gray-50 bg-gray-100/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search and Sort controls */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
              
              {/* Elegant Search Input */}
              <div className="relative flex-grow sm:flex-grow-0 sm:w-72">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                <input
                  type="text"
                  placeholder="Search destinations, tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-gray-50/50 focus:bg-white transition-all text-gray-800 font-semibold"
                />
              </div>

              {/* Advanced Sorting Selector */}
              <div className="relative shrink-0 flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-3 bg-gray-50/50 hover:bg-white transition-all text-xs sm:text-sm font-bold text-gray-700">
                <ArrowUpDown className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="focus:outline-none bg-transparent cursor-pointer font-bold text-gray-700"
                >
                  <option value="popular">Highly Popular</option>
                  <option value="priceAsc">Price: Low to High</option>
                  <option value="priceDesc">Price: High to Low</option>
                  <option value="rating">Top Customer Rated</option>
                </select>
              </div>

            </div>

          </div>
        </div>

        {/* Dynamic Grid Layout */}
        <AnimatePresence mode="popLayout">
          {filteredPackages.length > 0 ? (
            <motion.div 
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
            >
              {filteredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative flex flex-col bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/80 cursor-pointer ${
                    pkg.popular ? 'ring-2 ring-[#F9A03F]' : ''
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  
                  {/* Card Image Header */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    
                    {/* Visual Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    {/* Popular / Custom Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <button
                        onClick={(e) => toggleFavorite(pkg.id, e)}
                        className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md text-gray-700 hover:text-red-500 transition-colors"
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(pkg.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </button>

                      {pkg.popular ? (
                        <div className="bg-gradient-to-r from-[#F9A03F] to-amber-500 text-white px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                          Best Seller
                        </div>
                      ) : (
                        <div className="bg-[#003B73] text-white px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">
                          {pkg.badge}
                        </div>
                      )}
                    </div>

                    {/* Category tag */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full text-[10px] font-bold shadow-md uppercase tracking-wider">
                      {pkg.category}
                    </div>

                    {/* Package Duration over Image */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-xl text-xs font-semibold">
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
                    <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 leading-snug group-hover:text-[#003B73] transition-colors">
                      {pkg.name}
                    </h3>

                    {/* Short Tagline */}
                    <p className="text-xs text-gray-500 mb-4 line-clamp-1 italic font-medium">
                      "{pkg.tagline}"
                    </p>

                    {/* Quick Specifications Strip */}
                    <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-2xl p-3 mb-5 border border-gray-100 text-center">
                      <div>
                        <p className="text-[9px] uppercase font-extrabold text-gray-400">Size</p>
                        <p className="text-[11px] font-bold text-gray-700">{pkg.specs.groupSize}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-extrabold text-gray-400">Ages</p>
                        <p className="text-[11px] font-bold text-gray-700">{pkg.specs.ageLimit}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase font-extrabold text-gray-400">Difficulty</p>
                        <p className="text-[11px] font-bold text-gray-700">{pkg.specs.difficulty}</p>
                      </div>
                    </div>

                    {/* Highlights List (Truncated to first 3 for card design space) */}
                    <ul className="space-y-2.5 mb-6 flex-grow">
                      {pkg.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-gray-600">
                          <div className="w-4.5 h-4.5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-emerald-600 font-bold" />
                          </div>
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                      {pkg.features.length > 3 && (
                        <li className="text-[11px] font-bold text-[#003B73] flex items-center gap-1 mt-1 pl-1">
                          View details for {pkg.features.length - 3} more features <ChevronRight className="w-3 h-3" />
                        </li>
                      )}
                    </ul>

                    {/* Footer Pricing & Booking */}
                    <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-extrabold tracking-wider text-gray-400">From KES / Person</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-xl sm:text-2xl font-black text-[#003B73]">
                            KES {pkg.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
                          pkg.popular
                            ? 'bg-[#003B73] hover:bg-[#002a52] text-white shadow-md'
                            : 'bg-sky-50 hover:bg-sky-100 text-[#003B73]'
                        }`}
                      >
                        Enquire Now
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm"
            >
              <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-800 mb-1">No Packages Found</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                We couldn't find any tour packages matching your search criteria. Try choosing another category tab or broadening your terms.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Stunning Immersive Details Drawer / Modal Backdrop */}
      <AnimatePresence>
        {selectedPackage && (
          <>
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPackage(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
            >
              
              {/* Detailed View Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto z-[51] relative grid md:grid-cols-2"
              >
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 flex items-center justify-center text-gray-700 hover:text-black hover:scale-105 transition-all shadow-md z-30"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Left Side: Panoramic Banner Image & Details */}
                <div className="relative h-64 md:h-auto min-h-[300px] overflow-hidden">
                  <img
                    src={selectedPackage.image}
                    alt={selectedPackage.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="bg-sky-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-3 inline-block shadow-sm">
                      {selectedPackage.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold mb-2 leading-tight">
                      {selectedPackage.name}
                    </h3>
                    <p className="text-sm text-gray-200 italic font-light">
                      "{selectedPackage.tagline}"
                    </p>
                  </div>
                </div>

                {/* Right Side: Information & Customizable Details */}
                <div className="p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold text-gray-900 ml-1">{selectedPackage.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400 font-medium">({selectedPackage.reviews})</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                      <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">{selectedPackage.duration}</span>
                    </div>

                    <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">Tour Features & Inclusions</h4>
                    
                    <ul className="space-y-3.5 mb-8">
                      {selectedPackage.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
                          <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 font-bold" />
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Booking Safety Guarantees */}
                    <div className="flex gap-4 p-4 bg-sky-50/50 rounded-2xl border border-sky-100/40 mb-6">
                      <Shield className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-xs font-bold text-gray-800 mb-0.5">Ephream Tours Guarantee</h5>
                        <p className="text-[11px] text-gray-500">Premium fully-guided experience, high-spec fully equipped 4x4, and custom transfers guaranteed.</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price Footer */}
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Estimated Base Cost</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-3xl font-black text-[#003B73]">
                          KES {selectedPackage.price.toLocaleString()}
                        </span>
                        <span className="text-gray-400 text-xs font-bold">/ p.p</span>
                      </div>
                    </div>

                    <MotionLink
                      to="/contact"
                      onClick={() => setSelectedPackage(null)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-4 bg-[#003B73] hover:bg-[#002a52] text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-lg shadow-blue-900/10 transition-all flex items-center gap-2"
                    >
                      Instant Inquiry
                      <ChevronRight className="w-4 h-4" />
                    </MotionLink>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
