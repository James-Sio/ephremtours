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

  // Form State
  const [isInquiryMode, setIsInquiryMode] = useState(false);
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [travelDate, setTravelDate] = useState("");
  const [luggage, setLuggage] = useState("Standard");
  const [needsPickup, setNeedsPickup] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Toggle favorite helper
  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  // Reset form states
  const openPackage = (pkg: typeof packages[0], directEnquiry = false) => {
    setSelectedPackage(pkg);
    setIsInquiryMode(directEnquiry);
    setAdultsCount(2);
    setChildrenCount(0);
    setTravelDate("");
    setLuggage("Standard");
    setNeedsPickup(false);
    setFullName("");
    setPhone("");
    setEmail("");
    setIsSubmitting(false);
    setIsSubmitted(false);
  };

  // Live Auto-Calculator Calculations
  const calculatedCost = useMemo(() => {
    if (!selectedPackage) return { adults: 0, children: 0, pickup: 0, total: 0 };
    const adultsSubtotal = selectedPackage.price * adultsCount;
    const childrenSubtotal = Math.round(selectedPackage.price * 0.5) * childrenCount;
    const pickupSubtotal = needsPickup ? 2000 : 0; // KES 2,000 for VIP transfer
    return {
      adults: adultsSubtotal,
      children: childrenSubtotal,
      pickup: pickupSubtotal,
      total: adultsSubtotal + childrenSubtotal + pickupSubtotal
    };
  }, [selectedPackage, adultsCount, childrenCount, needsPickup]);

  // Handle inquiry submit
  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !travelDate) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
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
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {filteredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer ${
                    pkg.popular ? 'ring-2 ring-[#F9A03F]' : ''
                  }`}
                  onClick={() => openPackage(pkg, false)}
                >
                  
                  {/* Card Image Header with skeleton background & lazy loading */}
                  <div className="relative h-44 sm:h-48 overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    
                    {/* Visual Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    {/* Popular / Custom Badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5">
                      <button
                        onClick={(e) => toggleFavorite(pkg.id, e)}
                        className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md text-gray-700 hover:text-red-500 transition-colors"
                      >
                        <Heart className={`w-3.5 h-3.5 ${favorites.includes(pkg.id) ? "fill-red-500 text-red-500" : ""}`} />
                      </button>

                      {pkg.popular ? (
                        <div className="bg-gradient-to-r from-[#F9A03F] to-amber-500 text-white px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-sm">
                          Best Seller
                        </div>
                      ) : (
                        <div className="bg-[#003B73] text-white px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-wider shadow-sm">
                          {pkg.badge}
                        </div>
                      )}
                    </div>

                    {/* Category tag */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-900 px-2.5 py-1 rounded-full text-[9px] font-bold shadow-sm uppercase tracking-wider">
                      {pkg.category}
                    </div>

                    {/* Package Duration over Image */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-semibold">
                      <Calendar className="w-3 h-3 text-[#F9A03F]" />
                      {pkg.duration}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col p-5 flex-grow">
                    
                    {/* Rating & Review Summary */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="flex items-center text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="text-xs font-bold text-gray-900 ml-0.5">{pkg.rating}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">({pkg.reviews})</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 leading-snug group-hover:text-[#003B73] transition-colors line-clamp-1">
                      {pkg.name}
                    </h3>

                    {/* Short Tagline */}
                    <p className="text-[11px] text-gray-500 mb-3 line-clamp-1 italic font-medium">
                      "{pkg.tagline}"
                    </p>

                    {/* Quick Specifications Strip */}
                    <div className="grid grid-cols-3 gap-1 bg-gray-50 rounded-xl p-2 mb-4 border border-gray-100/50 text-center">
                      <div>
                        <p className="text-[8px] uppercase font-bold tracking-wider text-gray-400">Size</p>
                        <p className="text-[10px] font-bold text-gray-700">{pkg.specs.groupSize}</p>
                      </div>
                      <div>
                        <p className="text-[8px] uppercase font-bold tracking-wider text-gray-400">Ages</p>
                        <p className="text-[10px] font-bold text-gray-700">{pkg.specs.ageLimit}</p>
                      </div>
                      <div>
                        <p className="text-[8px] uppercase font-bold tracking-wider text-gray-400">Difficulty</p>
                        <p className="text-[10px] font-bold text-gray-700">{pkg.specs.difficulty}</p>
                      </div>
                    </div>

                    {/* Highlights List */}
                    <ul className="space-y-2 mb-4 flex-grow">
                      {pkg.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-gray-600">
                          <div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-emerald-600 font-bold" />
                          </div>
                          <span className="leading-tight line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Footer Pricing & Booking */}
                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[8px] uppercase font-bold tracking-wider text-gray-400">From / Person</span>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-lg sm:text-xl font-extrabold text-[#003B73]">
                            KES {pkg.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openPackage(pkg, true);
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          pkg.popular
                            ? 'bg-[#003B73] hover:bg-[#002a52] text-white shadow-sm'
                            : 'bg-sky-50 hover:bg-sky-100 text-[#003B73]'
                        }`}
                      >
                        Enquire
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

                {/* Right Side: Information & Customizable Details / Dynamic Form */}
                <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[480px]">
                  <AnimatePresence mode="wait">
                    {!isInquiryMode ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full justify-between flex-grow"
                      >
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
                          
                          <ul className="space-y-3 mb-6">
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

                          <button
                            onClick={() => setIsInquiryMode(true)}
                            className="px-6 py-4 bg-[#003B73] hover:bg-[#002a52] text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-lg shadow-blue-900/10 transition-all flex items-center gap-2"
                          >
                            Instant Inquiry
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="inquiryForm"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full justify-between flex-grow"
                      >
                        {!isSubmitted ? (
                          <form onSubmit={handleInquirySubmit} className="space-y-4">
                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                              <h4 className="text-sm font-black text-gray-900 uppercase tracking-wider">VIP Instant Inquiry</h4>
                              <button
                                type="button"
                                onClick={() => setIsInquiryMode(false)}
                                className="text-xs text-[#003B73] font-bold hover:underline"
                              >
                                ← Back to Features
                              </button>
                            </div>

                            {/* Row 1: Guest Selection Counters */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex justify-between items-center">
                                <div>
                                  <p className="text-[10px] font-bold text-gray-400 uppercase">Adults</p>
                                  <p className="text-xs text-gray-500">12+ years</p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <button
                                    type="button"
                                    onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                                    className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                                  >
                                    -
                                  </button>
                                  <span className="text-sm font-bold text-gray-800">{adultsCount}</span>
                                  <button
                                    type="button"
                                    onClick={() => setAdultsCount(Math.min(10, adultsCount + 1))}
                                    className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 flex justify-between items-center">
                                <div>
                                  <p className="text-[10px] font-bold text-gray-400 uppercase">Children</p>
                                  <p className="text-xs text-gray-500">2-11 years (50% off)</p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <button
                                    type="button"
                                    onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                                    className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                                  >
                                    -
                                  </button>
                                  <span className="text-sm font-bold text-gray-800">{childrenCount}</span>
                                  <button
                                    type="button"
                                    onClick={() => setChildrenCount(Math.min(10, childrenCount + 1))}
                                    className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Row 2: Travel Date & VIP Transfer options */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Travel Date</label>
                                <input
                                  type="date"
                                  required
                                  value={travelDate}
                                  onChange={(e) => setTravelDate(e.target.value)}
                                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold text-gray-800"
                                />
                              </div>

                              <div className="flex flex-col justify-end">
                                <label className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-xl p-3 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={needsPickup}
                                    onChange={(e) => setNeedsPickup(e.target.checked)}
                                    className="rounded border-gray-300 text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer"
                                  />
                                  <div>
                                    <p className="text-[10px] font-bold text-gray-700 uppercase">Add VIP Pickup</p>
                                    <p className="text-[9px] text-gray-400">+ KES 2,000</p>
                                  </div>
                                </label>
                              </div>
                            </div>

                            {/* Row 3: Customer Details */}
                            <div className="space-y-3">
                              <div>
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Full Name</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="John Doe"
                                  value={fullName}
                                  onChange={(e) => setFullName(e.target.value)}
                                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold text-gray-800"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">WhatsApp / Phone</label>
                                  <input
                                    type="tel"
                                    required
                                    placeholder="+254 700 000 000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold text-gray-800"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Email Address</label>
                                  <input
                                    type="email"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-sky-500 font-semibold text-gray-800"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Interactive Cost Breakdown Summary */}
                            <div className="bg-sky-50/70 rounded-2xl p-4 border border-sky-100/50">
                              <p className="text-[10px] font-bold text-sky-800 uppercase tracking-widest mb-2">Price Estimation</p>
                              <div className="space-y-1.5 text-xs text-gray-600 font-medium">
                                <div className="flex justify-between">
                                  <span>{adultsCount} Adults</span>
                                  <span>KES {calculatedCost.adults.toLocaleString()}</span>
                                </div>
                                {childrenCount > 0 && (
                                  <div className="flex justify-between text-gray-500">
                                    <span>{childrenCount} Children (50% Off)</span>
                                    <span>KES {calculatedCost.children.toLocaleString()}</span>
                                  </div>
                                )}
                                {needsPickup && (
                                  <div className="flex justify-between text-gray-500">
                                    <span>VIP Airport/SGR Private Chauffeur Pickup</span>
                                    <span>KES {calculatedCost.pickup.toLocaleString()}</span>
                                  </div>
                                )}
                                <div className="w-full h-px bg-sky-200/50 my-2" />
                                <div className="flex justify-between text-sm font-black text-gray-900">
                                  <span>Estimated Total</span>
                                  <span className="text-emerald-700">KES {calculatedCost.total.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            {/* Submit Button */}
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-4 bg-[#003B73] hover:bg-[#002a52] disabled:bg-gray-400 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  Sending VIP Booking Inquiry...
                                </>
                              ) : (
                                <>
                                  Submit VIP Inquiry Request
                                  <ChevronRight className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </form>
                        ) : (
                          <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center justify-center text-center py-10 flex-grow"
                          >
                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-3xl mb-6 shadow-md shadow-emerald-100 animate-bounce">
                              🎉
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-2">VIP Inquiry Successfully Sent!</h3>
                            <p className="text-sm text-gray-500 max-w-sm mb-8 leading-relaxed">
                              Thank you, <span className="font-bold text-gray-800">{fullName}</span>! Your inquiry for <span className="font-bold text-[#003B73]">{selectedPackage.name}</span> has been securely transmitted.
                            </p>

                            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 max-w-md w-full text-left mb-8 space-y-2">
                              <p className="text-xs font-bold text-sky-800 uppercase tracking-widest mb-1.5">What Happens Next?</p>
                              <div className="flex items-start gap-2.5 text-xs text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                                <p>Our VIP Travel Concierge will review your custom KES {calculatedCost.total.toLocaleString()} quote.</p>
                              </div>
                              <div className="flex items-start gap-2.5 text-xs text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                                <p>We will contact you via WhatsApp / Phone at <span className="font-bold text-gray-800">{phone}</span> within 15 minutes to finalize details.</p>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedPackage(null);
                                setIsSubmitted(false);
                              }}
                              className="px-6 py-3 bg-[#003B73] hover:bg-[#002a52] text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-sm"
                            >
                              Close Portal
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
