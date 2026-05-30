import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";

// Imports for the remaining real photos
import gallery9 from "../../imports/gallery-9.jpg";
import gallery10 from "../../imports/gallery-10.jpg";
import gallery11 from "../../imports/gallery-11.jpg";
import gallery12 from "../../imports/gallery-12.jpg";
import gallery13 from "../../imports/gallery-13.jpg";
import gallery14 from "../../imports/gallery-14.jpg";
import gallery15 from "../../imports/gallery-15.jpg";
import gallery16 from "../../imports/gallery-16.jpg";
import gallery17 from "../../imports/gallery-17.jpg";
import gallery18 from "../../imports/gallery-18.jpg";
import gallery19 from "../../imports/gallery-19.jpg";
import gallery20 from "../../imports/gallery-20.jpg";
import gallery21 from "../../imports/gallery-21.jpg";
import gallery22 from "../../imports/gallery-22.jpg";
import gallery23 from "../../imports/gallery-23.jpg";

const categories = ["All", "Transfers", "Safaris & Wildlife", "Destinations", "Experiences"];

const images = [
  { url: gallery9, title: "Luxury Resorts", description: "Transfers to top-tier coastal resorts.", category: "Destinations" },
  { url: gallery10, title: "Wild Safari Expeditions", description: "Authentic wildlife excursions.", category: "Safaris & Wildlife" },
  { url: gallery11, title: "SOS/Emergency Transit", description: "Quick, reliable 24/7 evacuation services.", category: "Transfers" },
  { url: gallery12, title: "Custom Excursions", description: "Tailored transit planning for corporate events.", category: "Experiences" },
  { url: gallery13, title: "Coastline Cruising", description: "Relaxing road trips along the beach roads.", category: "Destinations" },
  { url: gallery14, title: "Premium Fleets", description: "Well-maintained vehicles for ultimate travel comfort.", category: "Transfers" },
  { url: gallery15, title: "Sunset Safaris", description: "Breathtaking evening drives through national reserves.", category: "Safaris & Wildlife" },
  { url: gallery16, title: "Reliable Transfers", description: "On-time pickups and departures every single time.", category: "Transfers" },
  { url: gallery17, title: "Explore Watamu", description: "Travel to marine parks and beautiful coral gardens.", category: "Destinations" },
  { url: gallery18, title: "Group Adventures", description: "Safe and comfortable vans for large travel groups.", category: "Experiences" },
  { url: gallery19, title: "Historic Landmarks", description: "Trips to ruins, monuments, and historical sites.", category: "Destinations" },
  { url: gallery20, title: "Local Wildlife", description: "Spotting beautiful birds, elephants, and coastal animals.", category: "Safaris & Wildlife" },
  { url: gallery21, title: "Executive Services", description: "Top-tier private transfers for VIP clients.", category: "Transfers" },
  { url: gallery22, title: "Scenic Malindi", description: "Beautiful resort transfers and local sightseeing.", category: "Destinations" },
  { url: gallery23, title: "Dedicated Support", description: "Around-the-clock booking and travel assistance.", category: "Experiences" }
];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filteredImages = selectedCategory === "All"
    ? images
    : images.filter(img => img.category === selectedCategory);

  const handlePrev = () => {
    setSelectedImageIndex(prev => 
      prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null
    );
  };

  const handleNext = () => {
    setSelectedImageIndex(prev => 
      prev !== null ? (prev + 1) % filteredImages.length : null
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedImageIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImageIndex, filteredImages.length]);

  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-50 pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-4 shadow-sm border border-gray-100">
            <ImageIcon className="w-4 h-4 text-sky-600" />
            <span className="text-xs sm:text-sm font-bold text-sky-700 uppercase tracking-wider">Visual Tour</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Destination <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Discover the breathtaking beauty of Kenya's coastal treasures and safari excursions.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 max-w-4xl mx-auto px-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedImageIndex(null);
              }}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200"
                  : "bg-white text-gray-600 hover:bg-sky-50 hover:text-sky-700 border border-gray-200"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Uniform CSS Grid instead of Masonry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.url + index}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedImageIndex(index)}
              className="relative overflow-hidden rounded-2xl cursor-pointer group shadow-lg bg-white aspect-[4/3]"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Subtle overlay to make text pop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-400 mb-2 inline-block">
                  {image.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {image.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  {image.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImageIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImageIndex(null)}
              className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 select-none backdrop-blur-md"
            >
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 rounded-full flex items-center justify-center text-white transition-all z-50 cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative w-full max-w-6xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 lg:-left-12 w-12 h-12 bg-white/10 hover:bg-white/25 active:scale-95 rounded-full flex items-center justify-center text-white transition-all z-50 cursor-pointer"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>

                <div className="flex flex-col items-center max-w-full">
                  <motion.img
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    src={filteredImages[selectedImageIndex].url}
                    alt={filteredImages[selectedImageIndex].title}
                    className="max-h-[70vh] sm:max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
                  />
                  
                  <motion.div 
                    key={`info-${selectedImageIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mt-6 px-4"
                  >
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-sky-400 mb-1 inline-block">
                      {filteredImages[selectedImageIndex].category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {filteredImages[selectedImageIndex].title}
                    </h3>
                    <p className="text-sm text-gray-300 max-w-2xl mx-auto">
                      {filteredImages[selectedImageIndex].description}
                    </p>
                    <span className="text-xs text-gray-500 mt-3 block font-medium">
                      {selectedImageIndex + 1} / {filteredImages.length}
                    </span>
                  </motion.div>
                </div>

                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 lg:-right-12 w-12 h-12 bg-white/10 hover:bg-white/25 active:scale-95 rounded-full flex items-center justify-center text-white transition-all z-50 cursor-pointer"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
