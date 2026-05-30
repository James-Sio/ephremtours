import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { 
  Plane, Train, Hotel, MapPin, Users, Camera, 
  ArrowLeft, CheckCircle2, ChevronRight, Star 
} from "lucide-react";
import { Link } from "react-router";

// Gallery image imports
import gallery10 from "../../imports/gallery-10.jpg";
import gallery11 from "../../imports/gallery-11.jpg";
import gallery12 from "../../imports/gallery-12.jpg";
import gallery14 from "../../imports/gallery-14.jpg";
import gallery15 from "../../imports/gallery-15.jpg";
import gallery17 from "../../imports/gallery-17.jpg";
import gallery19 from "../../imports/gallery-19.jpg";
import gallery20 from "../../imports/gallery-20.jpg";
import gallery21 from "../../imports/gallery-21.jpg";
import gallery23 from "../../imports/gallery-23.jpg";

const coreServices = [
  {
    id: "sgr",
    title: "SGR Terminus Transfers",
    shortDesc: "Comfortable, direct transit from Mombasa Terminus to your coastal destination.",
    icon: Train,
    color: "from-orange-400 to-red-500",
    shadow: "shadow-orange-500/20",
    coverImage: gallery14,
    gallery: [gallery14, gallery21, gallery23],
    longDesc: "Start your coastal holiday the moment you step off the Madaraka Express. Our drivers monitor train schedules to ensure they are waiting for you at the Mombasa SGR Terminus, whether you arrive on the morning, afternoon, or night train. We handle your luggage and provide a cool, air-conditioned ride directly to your hotel or residence.",
    features: [
      "Timely pickups synchronized with train schedules",
      "Air-conditioned, clean, and spacious vans",
      "Professional drivers with local route knowledge",
      "Luggage handling assistance"
    ],
    pricing: [
      { route: "SGR to Mombasa Island", price: "KES 500" },
      { route: "SGR to Kilifi", price: "KES 1,000" },
      { route: "SGR to Watamu", price: "KES 1,300" },
      { route: "SGR to Malindi", price: "KES 1,200" }
    ],
    testimonial: {
      text: "Our train was delayed by an hour, but the driver was patiently waiting with a sign. The van was spotless and the drive to Watamu was smooth.",
      author: "David M., Nairobi"
    }
  },
  {
    id: "airport",
    title: "VIP Airport Meet & Greet",
    shortDesc: "Premium arrivals at Mombasa (MBA) and Malindi (MYD) airports.",
    icon: Plane,
    color: "from-sky-400 to-blue-500",
    shadow: "shadow-sky-500/20",
    coverImage: gallery11,
    gallery: [gallery11, gallery21, gallery14],
    longDesc: "Avoid the stress of haggling with local taxis after a long flight. Our Airport Meet & Greet service provides a dedicated driver waiting at arrivals with a personalized name board. We serve both Moi International Airport (Mombasa) and Malindi Airport, offering direct, private transfers to any resort on the coast.",
    features: [
      "Flight tracking for early or delayed arrivals",
      "Personalized meet and greet at the arrivals terminal",
      "Executive sedans and spacious family vans available",
      "Direct transfers with no shared stops"
    ],
    pricing: [
      { route: "Moi Airport (MBA) to Nyali", price: "KES 1,500" },
      { route: "Moi Airport (MBA) to Diani", price: "KES 3,500" },
      { route: "Malindi Airport to Malindi Town", price: "KES 800" },
      { route: "Malindi Airport to Watamu", price: "KES 1,500" }
    ],
    testimonial: {
      text: "The perfect start to our holiday. The driver helped with our heavy bags and had cold water waiting in the car. Highly professional.",
      author: "Sarah J., UK"
    }
  },
  {
    id: "hotel",
    title: "Hotel-to-Hotel Shuttles",
    shortDesc: "Comfortable, direct transfers between luxury coastal resorts.",
    icon: Hotel,
    color: "from-green-400 to-emerald-500",
    shadow: "shadow-green-500/20",
    coverImage: gallery12,
    gallery: [gallery12, gallery17, gallery23],
    longDesc: "Planning to split your holiday between different coastal towns? We provide seamless hotel-to-hotel transfers so you can easily move from a resort in Diani to a boutique hotel in Watamu without the hassle of public transport. Enjoy a scenic, private drive along the coast.",
    features: [
      "Door-to-door service from lobby to lobby",
      "Flexible departure times based on your schedule",
      "Scenic coastal routes with optional photo stops",
      "Spacious vehicles for families and large luggage"
    ],
    pricing: [
      { route: "Diani Hotels to Mombasa", price: "KES 3,000" },
      { route: "Mombasa to Kilifi Hotels", price: "KES 4,500" },
      { route: "Kilifi to Watamu/Malindi", price: "KES 3,500" }
    ],
    testimonial: {
      text: "We moved from a hotel in Bamburi to a villa in Watamu. The transfer was easy to book, on time, and very comfortable.",
      author: "The Omondi Family"
    }
  },
  {
    id: "city",
    title: "City & Cultural Tours",
    shortDesc: "Explore the best sights and cultural spots in Mombasa, Malindi, and Watamu.",
    icon: MapPin,
    color: "from-purple-400 to-pink-500",
    shadow: "shadow-purple-500/20",
    coverImage: gallery19,
    gallery: [gallery19, gallery17, gallery20],
    longDesc: "Discover the rich history and vibrant culture of the Kenyan coast. Our guided city tours take you beyond the beach. Walk through the narrow streets of Mombasa's Old Town, explore the historic Fort Jesus, visit the Gede Ruins in Watamu, or take a sunset trip to Marafa Hell's Kitchen. We provide knowledgeable local guides and comfortable transport.",
    features: [
      "Knowledgeable local guides",
      "Customizable itineraries (half-day or full-day)",
      "Safe, guided exploration of markets and historic sites",
      "Convenient hotel pick-up and drop-off"
    ],
    pricing: [
      { route: "Mombasa City Tour (Full Day)", price: "KES 3,000" },
      { route: "Marafa Hell's Kitchen (Half Day)", price: "KES 2,500" },
      { route: "Malindi Town & Ruins Tour", price: "KES 2,000" }
    ],
    testimonial: {
      text: "Our guide was fantastic. He knew so much about the history of Fort Jesus and took us to a great local spot for Swahili lunch.",
      author: "Elena R., Italy"
    }
  },
  {
    id: "safari",
    title: "Safari & Excursions",
    shortDesc: "Thrilling game drives and marine excursions with professional guides.",
    icon: Camera,
    color: "from-amber-400 to-orange-500",
    shadow: "shadow-amber-500/20",
    coverImage: gallery10,
    gallery: [gallery10, gallery15, gallery20],
    longDesc: "Experience the ultimate Kenyan adventure. We organize comprehensive safari packages to top national parks including Maasai Mara, Tsavo East, and Amboseli. If you prefer the ocean, join our coastal excursions like the Wasini Island Dhow Safari or glass-bottom boat tours in Watamu Marine Park. All packages include transport, park fees, and professional guides.",
    features: [
      "Custom-outfitted 4x4 safari vehicles",
      "Experienced, certified wildlife guides",
      "All-inclusive packages (meals, accommodation, park fees)",
      "Both wildlife safaris and marine excursions available"
    ],
    pricing: [
      { route: "Maasai Mara Safari (3 Days)", price: "KES 25,000" },
      { route: "Amboseli National Park (2 Days)", price: "KES 18,500" },
      { route: "Tsavo East Safari (2 Days)", price: "KES 15,000" },
      { route: "Wasini Island Tour (Full Day)", price: "KES 4,500" }
    ],
    testimonial: {
      text: "The Tsavo East trip was unforgettable. We saw lions, huge herds of red elephants, and our driver made sure we had the best views for photos.",
      author: "Mark & Lisa, Canada"
    }
  },
  {
    id: "group",
    title: "Group & Corporate Transport",
    shortDesc: "Reliable fleet coordination for large teams and events.",
    icon: Users,
    color: "from-indigo-400 to-blue-600",
    shadow: "shadow-indigo-500/20",
    coverImage: gallery21,
    gallery: [gallery21, gallery14, gallery12],
    longDesc: "Managing transport for a large group can be challenging, but we make it simple. Whether you are organizing a corporate retreat, a large family reunion, or a wedding, we can coordinate a fleet of well-maintained vans and buses to ensure everyone arrives together and on time. We handle the logistics so you can focus on the event.",
    features: [
      "Dedicated logistics coordinator for large events",
      "Fleet of 7-seater, 14-seater, and larger buses",
      "Consistent, high-quality vehicles",
      "Customized billing and corporate accounts available"
    ],
    pricing: [
      { route: "Full Day Van Hire (Within City)", price: "KES 8,000 / day" },
      { route: "Wedding Fleet Package (3 Vans)", price: "KES 20,000 / day" },
      { route: "Corporate Retreat (Multi-day)", price: "Custom Quote" }
    ],
    testimonial: {
      text: "We used them for our company team-building weekend in Kilifi. The drivers were punctual, the vans were in great condition, and the communication was excellent.",
      author: "TechCorp Kenya HR Team"
    }
  }
];

export function ServicesPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedService = coreServices.find(s => s.id === selectedId);

  return (
    <div className="pt-24 pb-20 bg-gray-900 min-h-screen relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-900/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid View */}
        <AnimatePresence mode="wait">
          {!selectedId ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6">
                  <MapPin className="w-4 h-4 text-sky-400" />
                  <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-widest">Our Expertise</span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
                  Core <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">Services</span>
                </h1>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
                  We focus on doing six things exceptionally well. Select a service below to view detailed routes, pricing, and our photo galleries.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {coreServices.map((service) => (
                  <motion.div
                    layoutId={`card-container-${service.id}`}
                    key={service.id}
                    onClick={() => setSelectedId(service.id)}
                    className="cursor-pointer group"
                  >
                    <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-sky-900/50 flex flex-col relative">
                      
                      {/* Thumbnail Image */}
                      <motion.div layoutId={`image-${service.id}`} className="w-full h-48 overflow-hidden relative">
                        <img 
                          src={service.coverImage} 
                          alt={service.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                      </motion.div>

                      <div className="p-6 sm:p-8 relative z-10 flex-grow flex flex-col -mt-12">
                        <motion.div
                          layoutId={`icon-${service.id}`}
                          className={`w-14 h-14 bg-gradient-to-br ${service.color} ${service.shadow} rounded-2xl flex items-center justify-center shadow-lg mb-4`}
                        >
                          <service.icon className="w-7 h-7 text-white drop-shadow-md" />
                        </motion.div>

                        <motion.h3 layoutId={`title-${service.id}`} className="text-2xl font-bold mb-3 text-white">
                          {service.title}
                        </motion.h3>
                        
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-6 flex-grow">
                          {service.shortDesc}
                        </p>

                        <div className="mt-auto inline-flex items-center gap-2 text-sky-400 font-semibold group-hover:text-white transition-colors">
                          View Details
                          <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            
            // Detailed View
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="max-w-5xl mx-auto"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium mb-8 transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Services
              </button>

              {selectedService && (
                <motion.div layoutId={`card-container-${selectedService.id}`} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                  
                  {/* Big Hero Image */}
                  <motion.div layoutId={`image-${selectedService.id}`} className="w-full h-[30vh] sm:h-[40vh] relative">
                    <img 
                      src={selectedService.coverImage} 
                      alt={selectedService.title} 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  </motion.div>

                  <div className="p-6 sm:p-10 lg:p-12 relative -mt-20">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-8">
                      <motion.div
                        layoutId={`icon-${selectedService.id}`}
                        className={`w-20 h-20 bg-gradient-to-br ${selectedService.color} ${selectedService.shadow} rounded-3xl flex items-center justify-center shadow-xl border border-white/20 shrink-0`}
                      >
                        <selectedService.icon className="w-10 h-10 text-white drop-shadow-md" />
                      </motion.div>
                      <motion.h2 layoutId={`title-${selectedService.id}`} className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                        {selectedService.title}
                      </motion.h2>
                    </div>

                    <div className="grid lg:grid-cols-[2fr_1fr] gap-10 lg:gap-16">
                      
                      {/* Left Column: Description & Features */}
                      <div>
                        <div className="prose prose-invert max-w-none mb-10">
                          <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed">
                            {selectedService.longDesc}
                          </p>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                          <CheckCircle2 className="text-sky-400 w-6 h-6" /> What to Expect
                        </h3>
                        <ul className="space-y-4 mb-10">
                          {selectedService.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                              <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                              <span className="text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Mini Gallery */}
                        <h3 className="text-2xl font-bold text-white mb-6">Service Gallery</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                          {selectedService.gallery.map((img, idx) => (
                            <div key={idx} className="aspect-square rounded-xl overflow-hidden border border-white/10">
                              <img src={img} alt="Gallery view" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column: Pricing, Testimonial, CTA */}
                      <div className="space-y-8">
                        
                        {/* Pricing Box */}
                        <div className="bg-gray-900 border border-white/10 rounded-2xl p-6 shadow-xl">
                          <h3 className="text-xl font-bold text-white mb-6 pb-4 border-b border-white/10">Common Routes & Pricing</h3>
                          <div className="space-y-4">
                            {selectedService.pricing.map((route, idx) => (
                              <div key={idx} className="flex flex-col gap-1">
                                <span className="text-sm text-gray-400 font-medium">{route.route}</span>
                                <span className="text-lg font-bold text-sky-400">{route.price}</span>
                              </div>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500 mt-6 pt-4 border-t border-white/10">
                            * Prices are indicative and may vary based on vehicle type and season.
                          </p>
                        </div>

                        {/* Testimonial */}
                        <div className="bg-gradient-to-br from-sky-900/30 to-blue-900/30 border border-sky-400/20 rounded-2xl p-6 relative">
                          <Star className="absolute top-4 right-4 w-6 h-6 text-yellow-500/50" fill="currentColor" />
                          <p className="text-gray-300 italic mb-4 leading-relaxed relative z-10">
                            "{selectedService.testimonial.text}"
                          </p>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center font-bold text-sky-400">
                              {selectedService.testimonial.author.charAt(0)}
                            </div>
                            <span className="font-semibold text-white">{selectedService.testimonial.author}</span>
                          </div>
                        </div>

                        {/* CTA */}
                        <Link 
                          to="/contact"
                          className={`w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95 bg-gradient-to-r ${selectedService.color}`}
                        >
                          Book This Service
                          <ChevronRight className="w-5 h-5" />
                        </Link>

                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>

          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
