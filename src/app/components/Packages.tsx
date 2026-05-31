import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, Star, Map, Calendar, Eye, Search, ArrowUpDown, ChevronRight, X, Heart, Shield, HelpCircle, 
  ChevronLeft, Sparkles, Clock, Compass, Coffee, Sunset, Camera, Compass as Binoculars, Gift, Info
} from "lucide-react";
import { Link } from "react-router";

const MotionLink = motion.create(Link);

const categories = ["All Experience", "Wildlife Safaris", "Coastal Marine", "Cultural & Scenic"];

// Rich luxury packages dataset mapped to high-quality public tour images
const packages = [
  {
    id: "mara",
    name: "Maasai Mara Private Reserve",
    duration: "3 Days / 2 Nights",
    price: 25000,
    images: [
      "/tourImages/1.png",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80",
      "/tourImages/2.png",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80",
      "/tourImages/3.png",
      "https://images.unsplash.com/photo-1518098268026-4e43a1a009de?auto=format&fit=crop&w=800&q=80"
    ],
    rating: "4.9",
    reviews: "184 reviews",
    category: "Wildlife Safaris",
    tagline: "The World's Greatest Wildlife Haven",
    specs: { groupSize: "Private Chauffeur (2-8)", ageLimit: "All Ages Welcome", difficulty: "Easy / Moderate" },
    features: [
      "Executive Big Five Premium Safari Drives",
      "Signature Luxury Savanna Lodge Stay",
      "Private Climate-Controlled 4x4 Land Cruiser",
      "Golden Hour Balloon Safari & Champagne Dinner",
      "All-Inclusive Park Conservation Entry Fees"
    ],
    popular: true,
    badge: "Most Demanded",
    itinerary: [
      {
        day: 1,
        title: "Grand Arrival & Sunset Game Exploration",
        time: "12:00 PM - 07:00 PM",
        description: "Be greeted at the airstrip by your private guide. Check into your luxury savanna lodge, followed by a premier golden-hour game drive to spot majestic lions and leopards.",
        icon: Sunset
      },
      {
        day: 2,
        title: "Full-Day Savanna Expedition & Maasai Interaction",
        time: "06:00 AM - 06:00 PM",
        description: "An early start for peak wildlife activity. Witness sweeping herds across the Mara River. In the afternoon, enjoy an exclusive private cultural exchange within an authentic Maasai Village.",
        icon: Binoculars
      },
      {
        day: 3,
        title: "Dawn Safari Patrol & Departure",
        time: "05:30 AM - 11:30 AM",
        description: "Capture the perfect dawn photography as predators wind up their hunts. Savor a luxurious bush breakfast under an acacia tree before your executive private transfer back.",
        icon: Coffee
      }
    ],
    upgrades: [
      { id: "balloon", name: "Premium Hot Air Balloon & Champagne Flight", price: 45000, description: "Float gracefully above the Great Migration at sunrise followed by an elite champagne breakfast in the bush." },
      { id: "drone", name: "Professional Drone Photography & Cinema package", price: 15000, description: "A dedicated professional media guide captures stunning 4K drone videos and high-res photos of your entire expedition." },
      { id: "guide", name: "Elite Resident Naturalist Biologist Escort", price: 10000, description: "Enrich your safari with in-depth zoological and conservation insights from a certified master wildlife expert." }
    ],
    faqs: [
      { question: "What is the best time of year to visit?", answer: "The Maasai Mara is incredible year-round. However, the world-famous Great Wildebeest Migration occurs between July and October." },
      { question: "What should I pack for the game drives?", answer: "We highly recommend neutral or khaki-colored clothing, sturdy closed-toed walking shoes, a sun hat, high-quality sunscreen, and premium binoculars." }
    ],
    reviewsList: [
      { name: "Lord Harrison Sterling", avatar: "HS", rating: 5, text: "An absolutely peerless experience. The lodge was hyper-luxurious, our guide possessed unparalleled tracking skills, and the private dinners under the stars were magical.", date: "May 2026" },
      { name: "Dr. Elena Rostova", avatar: "ER", rating: 5, text: "Splendidly coordinated from start to finish. The custom 4x4 cruiser was clean, spacious, and perfect for capturing steady 4K wildlife footage. Worth every single KES.", date: "April 2026" }
    ]
  },
  {
    id: "amboseli",
    name: "Amboseli Elephant Wilderness",
    duration: "2 Days / 1 Night",
    price: 18500,
    images: [
      "/tourImages/4.png",
      "https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=800&q=80",
      "/tourImages/6.png",
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80",
      "/tourImages/8.png",
      "https://images.unsplash.com/photo-1504541989296-167df755af3f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603566436906-8c430ee81414?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1629814402685-64539ef5b451?auto=format&fit=crop&w=800&q=80"
    ],
    rating: "4.8",
    reviews: "92 reviews",
    category: "Wildlife Safaris",
    tagline: "In the Shadow of Mount Kilimanjaro",
    specs: { groupSize: "Private / Couples (2-6)", ageLimit: "All Ages", difficulty: "Leisurely" },
    features: [
      "Giant Tusker Elephant Tracking Drives",
      "Stunning Kilimanjaro Backdrop Lodge Stay",
      "Private Open-Roof VIP 4x4 Cruisers",
      "Gourmet Bush Dining & Sundowner Cocktails",
      "Expert Local Maasai Tracker Assistance"
    ],
    popular: false,
    badge: "Photographers Choice",
    itinerary: [
      {
        day: 1,
        title: "Kilimanjaro Vista Arrival & Elephant Tracking",
        time: "10:00 AM - 06:30 PM",
        description: "Arrive at your premium luxury tented camp facing Mount Kilimanjaro. Embark on a afternoon safari tracking the legendary giant 'Tusker' elephant herds in pristine wetlands.",
        icon: Sunset
      },
      {
        day: 2,
        title: "Dawn Vista Photography & Luxury Bush Breakfast",
        time: "06:00 AM - 01:00 PM",
        description: "Photograph the snowcapped peak of Kilimanjaro at first light when the air is crystal clear. Enjoy a custom breakfast on the plains before heading home.",
        icon: Camera
      }
    ],
    upgrades: [
      { id: "drone", name: "Professional Drone Photography & Cinema package", price: 15000, description: "A dedicated professional media guide captures stunning 4K drone videos and high-res photos of your entire expedition." },
      { id: "cottage", name: "Presidential Kilimanjaro Suite Upgrade", price: 8000, description: "Upgrade to the master suite featuring a private heated plunge pool facing the majestic mountain." }
    ],
    faqs: [
      { question: "Are elephants guaranteed to be seen?", answer: "Yes, Amboseli is world-renowned for its dense populations of free-ranging African elephants, ensuring spectacular viewings year-round." },
      { question: "Is the road dusty?", answer: "The dry lake basin can be dusty. Our premium executive cruisers are fully climate-controlled and sealed for your maximum comfort." }
    ],
    reviewsList: [
      { name: "Sophia & Charles Dupont", avatar: "SD", rating: 5, text: "Waking up to see Mount Kilimanjaro clear of clouds while herds of elephants walked by the deck is a memory we will treasure forever. Sublime!", date: "June 2026" }
    ]
  },
  {
    id: "tsavo",
    name: "Tsavo East Untamed Wilderness",
    duration: "2 Days / 1 Night",
    price: 15000,
    images: [
      "/tourImages/5.png",
      "https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=800&q=80",
      "/tourImages/9.png",
      "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80",
      "/tourImages/11.png",
      "https://images.unsplash.com/photo-1551085254-e96b210db58a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602491453979-02654b3a896a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
    ],
    rating: "4.9",
    reviews: "116 reviews",
    category: "Wildlife Safaris",
    tagline: "Discover the Untamed Theater of Nature",
    specs: { groupSize: "Private Family (2-8)", ageLimit: "All Ages", difficulty: "Easy" },
    features: [
      "Famous 'Red Elephants' Tracking Drives",
      "Scenic Aruba Dam & Yatta Plateau Tour",
      "Executive Safari Camp overlooking River",
      "Night Safari option with Spotlights",
      "Dedicated Expert Ranger Escort"
    ],
    popular: true,
    badge: "Best Adventure",
    itinerary: [
      {
        day: 1,
        title: "Yatta Plateau Traverse & Red Dust Elephants",
        time: "09:00 AM - 06:00 PM",
        description: "Drive through the massive sandstone formations. Track the iconic red-dust covered elephants bathing along the Galana River, and check into your luxury riverside camp.",
        icon: Compass
      },
      {
        day: 2,
        title: "Aruba Dam Oasis Patrol & River Walk",
        time: "06:30 AM - 02:00 PM",
        description: "Visit the vital water source where hundreds of animals gather at sunrise. Guided walk along the riverbank under armed ranger protection for an intimate nature feel.",
        icon: Binoculars
      }
    ],
    upgrades: [
      { id: "night", name: "Midnight Premium Spotlight Safari Drive", price: 6000, description: "Venture out after dark with advanced thermal scopes and spotlights to witness nocturnal predators hunting." }
    ],
    faqs: [
      { question: "Why are the elephants red?", answer: "The elephants in Tsavo roll in the park's distinctive rich, red volcanic soil to protect their skin from the sun and insects, giving them a beautiful red glow." }
    ],
    reviewsList: [
      { name: "Marcus Vane", avatar: "MV", rating: 5, text: "A rugged yet incredibly sophisticated safari. Watching lions cross the river right from our dining table was sensational.", date: "May 2026" }
    ]
  },
  {
    id: "wasini",
    name: "Wasini Premium Dhow & Marine Park",
    duration: "Full Day VIP Experience",
    price: 4500,
    images: [
      "/tourImages/7.png",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      "/tourImages/12.png",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      "/tourImages/15.png",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1538964173425-93884d738596?auto=format&fit=crop&w=800&q=80"
    ],
    rating: "5.0",
    reviews: "215 reviews",
    category: "Coastal Marine",
    tagline: "Tropical Snorkeling & Dolphin Safaris",
    specs: { groupSize: "VIP Small Group (4-16)", ageLimit: "All Ages", difficulty: "Moderate" },
    features: [
      "Custom Handcrafted Swahili Dhow Cruise",
      "Snorkeling in Pristine Coral Gardens",
      "Playful Bottlenose Dolphin Spotting",
      "Sumptuous Swahili Seafood & Lobster Feast",
      "Historical Shimoni Slave Caves Guided Walk"
    ],
    popular: false,
    badge: "Top Rated Marine",
    itinerary: [
      {
        day: 1,
        title: "Dolphin Patrol, Snorkel Oasis & Swahili Banquet",
        time: "07:30 AM - 05:00 PM",
        description: "Board our luxury dhow with cushions and refreshments. Sail to Kisite Marine Park to swim with dolphins and snorkel in crystal coral reefs. Relish an executive seafood platter on Wasini Island before touring historical Shimoni.",
        icon: Compass
      }
    ],
    upgrades: [
      { id: "lobster", name: "Premium Jumbo Lobster & Champagne Upgrade", price: 3500, description: "Indulge in a premium freshly caught double jumbo lobster tail paired with chilled French champagne during lunch." },
      { id: "privateDhow", name: "Fully Private VIP Dhow Charter Upgrade", price: 25000, description: "Reserve the entire luxury Swahili dhow exclusively for your party with dedicated captain, chef, and guide." }
    ],
    faqs: [
      { question: "What if I don't know how to swim?", answer: "We provide high-grade life jackets and have certified professional marine safety guides who will swim alongside you to ensure full safety and comfort." }
    ],
    reviewsList: [
      { name: "Amelia Thorne", avatar: "AT", rating: 5, text: "The snorkeling was like swimming inside a giant, colorful aquarium. The Swahili coconut crab and grilled fish lunch was the best meal of our entire Kenyan trip!", date: "June 2026" }
    ]
  },
  {
    id: "mombasa",
    name: "Mombasa Cultural Heritage Tour",
    duration: "Full Day VIP",
    price: 3000,
    images: [
      "/tourImages/10.png",
      "https://images.unsplash.com/photo-1598285514605-64db9f939e6a?auto=format&fit=crop&w=800&q=80",
      "/tourImages/16.png",
      "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80",
      "/tourImages/17.png",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&w=800&q=80"
    ],
    rating: "4.7",
    reviews: "78 reviews",
    category: "Cultural & Scenic",
    tagline: "Uncover 500 Years of Coastal History",
    specs: { groupSize: "Private Guide (1-10)", ageLimit: "All Ages", difficulty: "Easy / Walking" },
    features: [
      "Exclusive Guided Fort Jesus Exploration",
      "Mombasa Old Town Architecture Walk",
      "Famous Mombasa Tusks Photography",
      "Traditional Swahili Multi-Course Lunch",
      "Spice Market Sensory Journey"
    ],
    popular: false,
    badge: "Rich Heritage",
    itinerary: [
      {
        day: 1,
        title: "Portuguese Fortresses, Old Town Walks & Spices",
        time: "08:30 AM - 04:30 PM",
        description: "Skip the lines at Fort Jesus for an immersive historical tour. Wander the narrow streets of Old Town admiring ancient carved doors, enjoy authentic coastal cuisine, and shop at the aromatic spice bazaar.",
        icon: Compass
      }
    ],
    upgrades: [
      { id: "tuktuk", name: "Vintage Tuk-Tuk Private City Cruise", price: 2000, description: "Explore the bustling city in an elegantly decorated private vintage Tuk-Tuk with unlimited chilled coconut water." }
    ],
    faqs: [
      { question: "Is the walking strenuous?", answer: "No, it is a leisurely historical stroll. We take regular air-conditioned breaks, and our tour is entirely self-paced." }
    ],
    reviewsList: [
      { name: "David Sinclair", avatar: "DS", rating: 5, text: "Our private historian guide knew every nook and cranny of the old city. Absolutely fascinating storytelling!", date: "April 2026" }
    ]
  },
  {
    id: "marafa",
    name: "Marafa Hell's Kitchen Canyon",
    duration: "Half Day Sunset VIP",
    price: 2500,
    images: [
      "/tourImages/13.png",
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
      "/tourImages/18.png",
      "https://images.unsplash.com/photo-1472214222555-d404758b1c42?auto=format&fit=crop&w=800&q=80",
      "/tourImages/19.png",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
    ],
    rating: "4.8",
    reviews: "64 reviews",
    category: "Cultural & Scenic",
    tagline: "Kenya's Breathtaking Sandstone Gorges",
    specs: { groupSize: "Private Group (2-12)", ageLimit: "All Ages Welcome", difficulty: "Easy / Hiking" },
    features: [
      "Spectacular Sandstone Canyon Formations",
      "Guided Golden Hour Gorges Hike",
      "Breath-Taking Sunset Photography Vistas",
      "Engaging Local Folklore & Mystical Stories",
      "Premium Air-Conditioned Transfers"
    ],
    popular: false,
    badge: "Unique Landscape",
    itinerary: [
      {
        day: 1,
        title: "Canyon Descent, Sacred Stories & Sunset Fire",
        time: "02:30 PM - 07:00 PM",
        description: "Depart from your coastal resort in luxury transportation. Arrive at the stunning canyon, descend into the multi-colored sandstone gorges with a resident elder, and witness the rocks shifting colors under the setting sun.",
        icon: Sunset
      }
    ],
    upgrades: [
      { id: "photography", name: "Premium Professional Sunset Drone shoot", price: 12000, description: "Get majestic 4K aerial shots of you standing on the edge of the colored canyon cliffs during the golden hour." }
    ],
    faqs: [
      { question: "Why is it called Hell's Kitchen?", answer: "The local Giriama people call it 'Nyari' meaning 'the place broken by itself'. High afternoon temperatures inside the gorge combined with vibrant red cliffs inspired the nickname." }
    ],
    reviewsList: [
      { name: "Clara Mendonza", avatar: "CM", rating: 5, text: "The color transitions at sunset from pink to deep purple were absolutely mesmerizing. The local folklore was beautifully narrated.", date: "May 2026" }
    ]
  },
  {
    id: "malindi",
    name: "Malindi Golden Beach Escapes",
    duration: "Full Day Premium",
    price: 2000,
    images: [
      "/tourImages/14.png",
      "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80",
      "/tourImages/20.png",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506953823976-52e1fdc0135a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1468413253725-0d5181091126?auto=format&fit=crop&w=800&q=80"
    ],
    rating: "4.6",
    reviews: "82 reviews",
    category: "Coastal Marine",
    tagline: "Sun, History, and Pristine Coastal Shores",
    specs: { groupSize: "Custom Party (1-15)", ageLimit: "All Ages", difficulty: "Leisurely" },
    features: [
      "Pristine Golden Sand Private Beach Cabana",
      "Historical Vasco da Gama Pillar Guided tour",
      "Marine Park Glass-Bottom Boat Exploration",
      "All-Day Luxury Coastal Resort VIP Access",
      "Custom Seafood Platter Beachside"
    ],
    popular: false,
    badge: "Relaxing Getaway",
    itinerary: [
      {
        day: 1,
        title: "Vasco da Gama Pillar, Glass Boat Reefs & Beach Cabana",
        time: "08:00 AM - 05:30 PM",
        description: "Discover the 15th-century historical pillar. Board a glass-bottom boat to see coral gardens, relax under a private canopy on Malindi's golden beach, and dine on freshly grilled red snapper.",
        icon: Sunset
      }
    ],
    upgrades: [
      { id: "spa", name: "Premium Beachside Deep Tissue Swahili Massage", price: 5000, description: "A 90-minute signature massage inside a beachfront open-air cabana using natural organic coastal coconut oils." }
    ],
    faqs: [
      { question: "Is the glass-bottom boat safe for kids?", answer: "Extremely safe. The waters are remarkably calm inside the protective reef, making it a stellar family-friendly activity." }
    ],
    reviewsList: [
      { name: "Dr. Kenji Sato", avatar: "KS", rating: 5, text: "Malindi has a quiet, aristocratic charm. The beach resort cabana service was excellent, and the massage was top-class.", date: "May 2026" }
    ]
  }
];

// Sub-component: In-Card Image Carousel with Hover Navigation
function CardImageCarousel({ images, name, onClick }: { images: string[], name: string, onClick: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="relative h-48 sm:h-56 overflow-hidden bg-gray-100 group/carousel cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${name} slide ${currentIndex + 1}`}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 1, scale: isHovered ? 1.06 : 1 }}
          exit={{ opacity: 0.8 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full h-full object-cover transition-all duration-700"
        />
      </AnimatePresence>

      {/* Luxury Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none" />

      {/* Next/Prev Navigation buttons - visible on hover */}
      <AnimatePresence>
        {isHovered && images.length > 1 && (
          <>
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-gray-800 shadow-md hover:bg-white hover:scale-105 transition-all z-20 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-gray-800 shadow-md hover:bg-white hover:scale-105 transition-all z-20 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* Slide dots tracking indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(i);
            }}
            className={`h-1 rounded-full transition-all duration-300 ${
              currentIndex === i ? "w-4 bg-white" : "w-1.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Packages() {
  const [selectedCategory, setSelectedCategory] = useState("All Experience");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<typeof packages[0] | null>(null);

  // Form & Premium upgrades state
  const [isInquiryMode, setIsInquiryMode] = useState(false);
  const [adultsCount, setAdultsCount] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [travelDate, setTravelDate] = useState("");
  const [needsPickup, setNeedsPickup] = useState(false);
  const [selectedUpgrades, setSelectedUpgrades] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Detail Modal Tab system
  const [activeModalTab, setActiveModalTab] = useState<"itinerary" | "upgrades" | "reviews" | "faqs">("itinerary");
  const [activeHeroImageIndex, setActiveHeroImageIndex] = useState(0);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const openPackage = (pkg: typeof packages[0], directEnquiry = false) => {
    setSelectedPackage(pkg);
    setIsInquiryMode(directEnquiry);
    setActiveModalTab("itinerary");
    setActiveHeroImageIndex(0);
    setAdultsCount(2);
    setChildrenCount(0);
    setTravelDate("");
    setNeedsPickup(false);
    setSelectedUpgrades([]);
    setFullName("");
    setPhone("");
    setEmail("");
    setIsSubmitting(false);
    setIsSubmitted(false);
  };

  const toggleUpgrade = (upgradeId: string) => {
    setSelectedUpgrades(prev =>
      prev.includes(upgradeId) ? prev.filter(id => id !== upgradeId) : [...prev, upgradeId]
    );
  };

  // Real-time calculation logic including custom premium upgrades
  const calculatedCost = useMemo(() => {
    if (!selectedPackage) return { base: 0, adults: 0, children: 0, pickup: 0, upgrades: 0, total: 0 };
    const baseVal = selectedPackage.price;
    const adultsSubtotal = baseVal * adultsCount;
    const childrenSubtotal = Math.round(baseVal * 0.5) * childrenCount;
    const pickupSubtotal = needsPickup ? 2000 : 0;
    
    // Sum pricing of selected upgrades
    let upgradesSubtotal = 0;
    selectedPackage.upgrades.forEach((up) => {
      if (selectedUpgrades.includes(up.id)) {
        // Balloon or lobster could be per person, drone or guide flat. We'll simplify to per person for balloon/lobster/spa/tuktuk, flat for others.
        const isPerPerson = ["balloon", "lobster", "spa", "tuktuk"].includes(up.id);
        upgradesSubtotal += isPerPerson ? up.price * (adultsCount + childrenCount) : up.price;
      }
    });

    return {
      base: baseVal,
      adults: adultsSubtotal,
      children: childrenSubtotal,
      pickup: pickupSubtotal,
      upgrades: upgradesSubtotal,
      total: adultsSubtotal + childrenSubtotal + pickupSubtotal + upgradesSubtotal
    };
  }, [selectedPackage, adultsCount, childrenCount, needsPickup, selectedUpgrades]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !travelDate) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

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
        return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="packages" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-950 via-gray-900 to-[#001f3f] text-white min-h-screen relative overflow-hidden">
      
      {/* Immersive Dark luxury ambient glow assets */}
      <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-sky-950/20 rounded-full blur-[160px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[600px] h-[600px] bg-indigo-950/20 rounded-full blur-[160px] opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Editorial Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-[#003B73]/40 border border-sky-500/20 px-5 py-2 rounded-full mb-6 backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-widest">ONE OF A KIND EXPERIENCES</span>
          </div>
          
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tight leading-[1.05]">
            Explore Kenya <span className="bg-gradient-to-r from-amber-400 via-[#F9A03F] to-sky-400 bg-clip-text text-transparent">VIP Packages</span>
          </h2>
          
          <p className="text-lg sm:text-2xl text-gray-300 max-w-3xl mx-auto px-4 font-light leading-relaxed">
            Premium luxury safari excursions, beautiful coastal island tours, and rich heritage experiences curated for the discerning traveler.
          </p>
        </motion.div>

        {/* Controls Layout */}
        <div className="bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 mb-16">
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2.5 w-full lg:w-auto">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all relative cursor-pointer ${
                    selectedCategory === cat
                      ? "text-white bg-[#003B73] border border-sky-500/30 shadow-lg shadow-sky-950/55"
                      : "text-gray-400 hover:text-white hover:bg-white/5 bg-white/5 border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filter controls */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
              
              {/* Elegant Search */}
              <div className="relative flex-grow sm:flex-grow-0 sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-4" />
                <input
                  type="text"
                  placeholder="Search ultra-luxury experiences..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-white/10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-950/70 focus:bg-gray-950 transition-all text-white font-semibold placeholder:text-gray-500"
                />
              </div>

              {/* Sort Selector */}
              <div className="relative shrink-0 flex items-center gap-2 border border-white/10 rounded-2xl px-4 py-3.5 bg-gray-950/70 hover:bg-gray-950 transition-all text-xs sm:text-sm font-bold text-gray-300">
                <ArrowUpDown className="w-4 h-4 text-amber-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="focus:outline-none bg-transparent cursor-pointer font-bold text-white select-none [&>option]:bg-gray-950"
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

        {/* Catalog Grid */}
        <AnimatePresence mode="popLayout">
          {filteredPackages.length > 0 ? (
            <motion.div 
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
            >
              {filteredPackages.map((pkg) => (
                <motion.div
                  key={pkg.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative flex flex-col bg-gray-900/50 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-[#003B73]/20 transition-all duration-500 overflow-hidden border border-white/5 hover:border-amber-500/30 cursor-pointer ${
                    pkg.popular ? 'ring-2 ring-amber-500/50 bg-gray-900/70' : ''
                  }`}
                  onClick={() => openPackage(pkg, false)}
                >
                  
                  {/* Card Image Slideshow Component */}
                  <CardImageCarousel 
                    images={pkg.images} 
                    name={pkg.name} 
                    onClick={() => openPackage(pkg, false)} 
                  />

                  {/* Badges Overlays */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                    <button
                      onClick={(e) => toggleFavorite(pkg.id, e)}
                      className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg text-white hover:text-red-500 hover:scale-105 transition-all cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(pkg.id) ? "fill-red-500 text-red-500" : ""}`} />
                    </button>

                    {pkg.popular ? (
                      <div className="bg-gradient-to-r from-amber-500 to-[#F9A03F] text-black px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                        Best Seller
                      </div>
                    ) : (
                      <div className="bg-[#003B73] border border-sky-400/20 text-white px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                        {pkg.badge}
                      </div>
                    )}
                  </div>

                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-amber-300 px-3 py-1 rounded-full text-[10px] font-bold shadow-md uppercase tracking-wider z-20">
                    {pkg.category}
                  </div>

                  {/* Duration Overlay */}
                  <div className="absolute top-40 left-4 flex items-center gap-1.5 text-white bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-semibold z-20">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    {pkg.duration}
                  </div>

                  {/* Card Content body */}
                  <div className="flex flex-col p-6 flex-grow">
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center text-amber-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-xs font-black ml-1 text-white">{pkg.rating}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">({pkg.reviews})</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5 leading-snug group-hover:text-amber-300 transition-colors line-clamp-1">
                      {pkg.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs text-gray-400 mb-4 line-clamp-1 italic font-light">
                      "{pkg.tagline}"
                    </p>

                    {/* Luxury details strip */}
                    <div className="grid grid-cols-3 gap-1 bg-white/5 rounded-xl p-2.5 mb-5 border border-white/5 text-center">
                      <div>
                        <p className="text-[8px] uppercase font-bold tracking-wider text-amber-400">Escort</p>
                        <p className="text-[10px] font-bold text-gray-200 truncate">{pkg.specs.groupSize}</p>
                      </div>
                      <div>
                        <p className="text-[8px] uppercase font-bold tracking-wider text-amber-400">Ages</p>
                        <p className="text-[10px] font-bold text-gray-200 truncate">{pkg.specs.ageLimit}</p>
                      </div>
                      <div>
                        <p className="text-[8px] uppercase font-bold tracking-wider text-amber-400">Intensity</p>
                        <p className="text-[10px] font-bold text-gray-200 truncate">{pkg.specs.difficulty}</p>
                      </div>
                    </div>

                    {/* Highlights List */}
                    <ul className="space-y-2.5 mb-6 flex-grow">
                      {pkg.features.slice(0, 3).map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-xs text-gray-300">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-emerald-400 font-bold" />
                          </div>
                          <span className="leading-tight line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price and Action bar */}
                    <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[8px] uppercase font-bold tracking-wider text-gray-400">Private All-inclusive starting</span>
                        <div className="flex items-baseline gap-0.5">
                          <span className="text-xl sm:text-2xl font-black text-amber-400">
                            KES {pkg.price.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openPackage(pkg, true);
                        }}
                        className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                          pkg.popular
                            ? 'bg-amber-400 text-black hover:bg-amber-300 shadow-lg shadow-amber-400/20'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                        }`}
                      >
                        Enquire VIP
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
              className="text-center py-24 bg-gray-900/50 rounded-3xl border border-white/10 shadow-2xl"
            >
              <HelpCircle className="w-14 h-14 text-amber-400/60 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Luxury Packages Located</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto px-4">
                We couldn't locate any premium tour coordinates matching your filters. Try choosing another category tab or broadening your query.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Immersive splitscreen luxury detail portal overlay */}
      <AnimatePresence>
        {selectedPackage && (
          <>
            {/* Dark glassmorphic backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPackage(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-0 md:p-6"
            >
              
              {/* Massive Full-Screen Splitscreen Details Board */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 40 }}
                transition={{ type: "spring", damping: 28, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gray-950 border border-white/10 w-full md:max-w-6xl h-full md:h-[90vh] md:rounded-3xl overflow-hidden z-[51] relative grid md:grid-cols-12 shadow-2xl"
              >
                
                {/* Float Close Button */}
                <button
                  onClick={() => setSelectedPackage(null)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:text-amber-400 hover:scale-105 transition-all shadow-lg z-30 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* LEFT COLUMN: Panoramic split-screen gallery carousel (Takes 5 columns) */}
                <div className="relative md:col-span-5 h-[360px] md:h-full overflow-hidden bg-gray-900 flex flex-col justify-end">
                  {/* Embedded slideshow specifically for the detail panel */}
                  <div className="absolute inset-0">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeHeroImageIndex}
                        src={selectedPackage.images[activeHeroImageIndex]} 
                        alt={selectedPackage.name} 
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0.8 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-black/20" />
                  </div>

                  <div className="relative p-6 sm:p-8 text-white z-20">
                    <span className="bg-amber-400 text-black px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block shadow-lg">
                      {selectedPackage.category}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-black mb-2 text-white leading-tight">
                      {selectedPackage.name}
                    </h3>
                    <p className="text-sm text-gray-300 italic font-light mb-6">
                      "{selectedPackage.tagline}"
                    </p>

                    {/* Elite Interactive Touch Gallery Thumbnails */}
                    <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none z-20 relative">
                      {selectedPackage.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveHeroImageIndex(idx)}
                          className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all duration-300 cursor-pointer ${
                            activeHeroImageIndex === idx
                              ? "border-amber-400 scale-105 shadow-md shadow-amber-400/20"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>

                    {/* VIP Specs Grid */}
                    <div className="grid grid-cols-2 gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                      <div>
                        <span className="block text-[8px] text-amber-400 font-bold uppercase tracking-wider">Group Accomodation</span>
                        <span className="text-xs font-bold text-white">{selectedPackage.specs.groupSize}</span>
                      </div>
                      <div>
                        <span className="block text-[8px] text-amber-400 font-bold uppercase tracking-wider">Guide Level</span>
                        <span className="text-xs font-bold text-white">Platinum Certified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Interactive detailed layout panel (Takes 7 columns) */}
                <div className="md:col-span-7 p-6 sm:p-10 flex flex-col h-[calc(100vh-320px)] md:h-full overflow-y-auto bg-gray-950">
                  <AnimatePresence mode="wait">
                    {!isInquiryMode ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col h-full justify-between"
                      >
                        <div>
                          {/* Navigation Tabs for detailed portal */}
                          <div className="flex items-center gap-1.5 border-b border-white/10 pb-4 mb-6 overflow-x-auto shrink-0">
                            {[
                              { id: "itinerary", label: "Interactive Itinerary" },
                              { id: "upgrades", label: "Executive Upgrades" },
                              { id: "reviews", label: "Guest Testimonials" },
                              { id: "faqs", label: "Preparation Guide" }
                            ].map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setActiveModalTab(tab.id as any)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                                  activeModalTab === tab.id
                                    ? "bg-[#003B73] text-white border border-sky-400/20 shadow-md"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                }`}
                              >
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          {/* Dynamic Modal Content by active tab */}
                          <div className="min-h-[220px]">
                            {activeModalTab === "itinerary" && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-5"
                              >
                                <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest">Day-by-Day Luxury Timeline</h4>
                                <div className="relative pl-6 border-l-2 border-amber-500/25 space-y-6">
                                  {selectedPackage.itinerary.map((item, idx) => (
                                    <div key={idx} className="relative group/timeline">
                                      {/* Chronological pointer bullet */}
                                      <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-amber-400 border-4 border-gray-950 flex items-center justify-center shadow-lg group-hover/timeline:scale-125 transition-all" />
                                      
                                      <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">Day {item.day}</span>
                                        <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-400 font-semibold">{item.time}</span>
                                      </div>

                                      <h5 className="text-sm font-bold text-white mb-1.5">{item.title}</h5>
                                      <p className="text-xs text-gray-400 leading-relaxed font-light">{item.description}</p>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {activeModalTab === "upgrades" && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                              >
                                <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest mb-3">Add Custom Premium Accompaniments</h4>
                                <div className="space-y-3.5">
                                  {selectedPackage.upgrades.map((up) => (
                                    <label
                                      key={up.id}
                                      className={`flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer select-none ${
                                        selectedUpgrades.includes(up.id)
                                          ? "bg-[#003B73]/20 border-sky-400/40 shadow-md"
                                          : "bg-white/5 border-white/15 hover:border-white/20"
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={selectedUpgrades.includes(up.id)}
                                        onChange={() => toggleUpgrade(up.id)}
                                        className="rounded border-gray-600 bg-gray-900 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer mt-1"
                                      />
                                      <div className="flex-grow">
                                        <div className="flex justify-between items-baseline mb-0.5">
                                          <span className="text-xs font-bold text-white">{up.name}</span>
                                          <span className="text-xs font-black text-amber-400 whitespace-nowrap ml-2">
                                            + KES {up.price.toLocaleString()}
                                          </span>
                                        </div>
                                        <p className="text-[10px] text-gray-400 font-light leading-relaxed">{up.description}</p>
                                      </div>
                                    </label>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {activeModalTab === "reviews" && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-5"
                              >
                                <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest">Guest Expedition Journals</h4>
                                <div className="space-y-4">
                                  {selectedPackage.reviewsList.map((rev, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 relative">
                                      <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                          <div className="w-9 h-9 rounded-full bg-amber-400 text-black font-extrabold flex items-center justify-center text-xs">
                                            {rev.avatar}
                                          </div>
                                          <div>
                                            <h5 className="text-xs font-bold text-white">{rev.name}</h5>
                                            <span className="text-[9px] text-gray-500 font-semibold">{rev.date}</span>
                                          </div>
                                        </div>
                                        <div className="flex items-center text-amber-400">
                                          {[...Array(rev.rating)].map((_, i) => (
                                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                          ))}
                                        </div>
                                      </div>
                                      <p className="text-xs text-gray-300 italic font-light leading-relaxed">
                                        "{rev.text}"
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}

                            {activeModalTab === "faqs" && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                              >
                                <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest">Expert Advice & Logistics Checklist</h4>
                                <div className="space-y-3">
                                  {selectedPackage.faqs.map((faq, idx) => (
                                    <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                      <h5 className="text-xs font-bold text-amber-400 mb-1.5 flex items-center gap-2">
                                        <Info className="w-3.5 h-3.5" />
                                        {faq.question}
                                      </h5>
                                      <p className="text-xs text-gray-300 leading-relaxed font-light">{faq.answer}</p>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {/* Exclusive Safety Board */}
                          <div className="flex gap-4 p-4 bg-sky-950/20 border border-sky-500/15 rounded-2xl mt-8">
                            <Shield className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-bold text-white mb-0.5">Ephrem Tours Platinum Guarantee</h5>
                              <p className="text-[10px] text-gray-400 leading-relaxed font-light">Fully private operations, highest spec custom customized safari vehicles, satellite comms onboard, and premium direct boutique resort check-ins guaranteed.</p>
                            </div>
                          </div>
                        </div>

                        {/* Actions Price Footer */}
                        <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between shrink-0">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-gray-400 tracking-wider">Private Expedition Cost</span>
                            <div className="flex items-baseline gap-1">
                              <span className="text-2xl sm:text-3xl font-black text-amber-400">
                                KES {selectedPackage.price.toLocaleString()}
                              </span>
                              <span className="text-gray-500 text-xs font-bold">/ p.p</span>
                            </div>
                          </div>

                          <button
                            onClick={() => setIsInquiryMode(true)}
                            className="px-6 py-4 bg-amber-400 text-black hover:bg-amber-300 font-extrabold rounded-2xl text-xs sm:text-sm shadow-xl shadow-amber-400/10 transition-all flex items-center gap-2 cursor-pointer"
                          >
                            VIP Reservation Portal
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
                        className="flex flex-col h-full justify-between"
                      >
                        {!isSubmitted ? (
                          <form onSubmit={handleInquirySubmit} className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-white/10">
                              <h4 className="text-sm font-black text-white uppercase tracking-wider">VIP Instant Reservation</h4>
                              <button
                                type="button"
                                onClick={() => setIsInquiryMode(false)}
                                className="text-xs text-amber-400 font-bold hover:underline cursor-pointer"
                              >
                                ← Return to details
                              </button>
                            </div>

                            {/* Counters */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex justify-between items-center">
                                <div>
                                  <p className="text-[10px] font-bold text-amber-400 uppercase">Adult guests</p>
                                  <p className="text-[9px] text-gray-400">Age 12+ years</p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <button
                                    type="button"
                                    onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                                    className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20 cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <span className="text-sm font-bold text-white">{adultsCount}</span>
                                  <button
                                    type="button"
                                    onClick={() => setAdultsCount(Math.min(10, adultsCount + 1))}
                                    className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20 cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>

                              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex justify-between items-center">
                                <div>
                                  <p className="text-[10px] font-bold text-amber-400 uppercase">Children</p>
                                  <p className="text-[9px] text-gray-400">2-11 years (50% Off)</p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                  <button
                                    type="button"
                                    onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                                    className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20 cursor-pointer"
                                  >
                                    -
                                  </button>
                                  <span className="text-sm font-bold text-white">{childrenCount}</span>
                                  <button
                                    type="button"
                                    onClick={() => setChildrenCount(Math.min(10, childrenCount + 1))}
                                    className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20 cursor-pointer"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Date and Pickup */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1.5">Expedition Date</label>
                                <input
                                  type="date"
                                  required
                                  value={travelDate}
                                  onChange={(e) => setTravelDate(e.target.value)}
                                  className="w-full px-3 py-2.5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white/5 text-white font-semibold cursor-pointer"
                                />
                              </div>

                              <div className="flex flex-col justify-end">
                                <label className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={needsPickup}
                                    onChange={(e) => setNeedsPickup(e.target.checked)}
                                    className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                                  />
                                  <div>
                                    <p className="text-[10px] font-bold text-white uppercase">Add VIP Pickup</p>
                                    <p className="text-[8px] text-gray-400">+ KES 2,000</p>
                                  </div>
                                </label>
                              </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-3">
                              <div>
                                <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Full Name</label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Sir/Madam John Doe"
                                  value={fullName}
                                  onChange={(e) => setFullName(e.target.value)}
                                  className="w-full px-3 py-2.5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white/5 text-white font-semibold placeholder:text-gray-600"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Phone / WhatsApp</label>
                                  <input
                                    type="tel"
                                    required
                                    placeholder="+254 700 000 000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white/5 text-white font-semibold placeholder:text-gray-600"
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-amber-400 uppercase mb-1">Private Email</label>
                                  <input
                                    type="email"
                                    placeholder="johndoe@luxury.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2.5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white/5 text-white font-semibold placeholder:text-gray-600"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Upgrades selected breakdown in Form */}
                            {selectedUpgrades.length > 0 && (
                              <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                                <span className="block text-[9px] font-bold text-amber-400 uppercase tracking-widest mb-1.5">Accompaniments Chosen</span>
                                <div className="space-y-1">
                                  {selectedPackage.upgrades.map((up) => {
                                    if (selectedUpgrades.includes(up.id)) {
                                      return (
                                        <div key={up.id} className="flex justify-between text-[10px] text-gray-300">
                                          <span>• {up.name}</span>
                                          <span className="text-amber-400">KES {up.price.toLocaleString()}</span>
                                        </div>
                                      );
                                    }
                                    return null;
                                  })}
                                </div>
                              </div>
                            )}

                            {/* Auto price breakdown */}
                            <div className="bg-[#003B73]/25 border border-sky-400/20 rounded-2xl p-4">
                              <p className="text-[10px] font-black text-amber-300 uppercase tracking-widest mb-2.5">Concierge Quote Summary</p>
                              <div className="space-y-2 text-xs text-gray-300 font-medium">
                                <div className="flex justify-between">
                                  <span>{adultsCount} Adults Base</span>
                                  <span>KES {calculatedCost.adults.toLocaleString()}</span>
                                </div>
                                {childrenCount > 0 && (
                                  <div className="flex justify-between text-gray-400">
                                    <span>{childrenCount} Children (50% Off)</span>
                                    <span>KES {calculatedCost.children.toLocaleString()}</span>
                                  </div>
                                )}
                                {needsPickup && (
                                  <div className="flex justify-between text-gray-400">
                                    <span>VIP Executive Chauffeur Airport Pickup</span>
                                    <span>KES {calculatedCost.pickup.toLocaleString()}</span>
                                  </div>
                                )}
                                {calculatedCost.upgrades > 0 && (
                                  <div className="flex justify-between text-gray-400">
                                    <span>Selected Custom Accompaniments</span>
                                    <span>KES {calculatedCost.upgrades.toLocaleString()}</span>
                                  </div>
                                )}
                                <div className="w-full h-px bg-sky-400/20 my-2" />
                                <div className="flex justify-between text-sm font-black text-white">
                                  <span>Estimated Net Total</span>
                                  <span className="text-amber-400">KES {calculatedCost.total.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>

                            {/* Submit */}
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full py-4 bg-amber-400 hover:bg-amber-300 disabled:bg-gray-700 text-black font-extrabold rounded-2xl text-xs sm:text-sm shadow-lg shadow-amber-400/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                            >
                              {isSubmitting ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                  Broadcasting VIP Reservation Coordinates...
                                </>
                              ) : (
                                <>
                                  Dispatch VIP Tour Reservation Request
                                  <ChevronRight className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </form>
                        ) : (
                          <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex flex-col items-center justify-center text-center py-10 flex-grow"
                          >
                            <div className="w-20 h-20 bg-amber-400/10 border border-amber-500/30 rounded-full flex items-center justify-center text-4xl mb-6 shadow-xl animate-bounce">
                              👑
                            </div>
                            <h3 className="text-2xl font-black text-white mb-2">Expedition Coordinates Transmitted!</h3>
                            <p className="text-xs sm:text-sm text-gray-400 max-w-sm mb-8 leading-relaxed">
                              Sincere thanks, <span className="font-bold text-white">{fullName}</span>! Your customized booking catalog for <span className="font-bold text-amber-300">{selectedPackage.name}</span> is safely registered on the master log.
                            </p>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 max-w-md w-full text-left mb-8 space-y-3">
                              <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1">Onboarding Checklist</p>
                              <div className="flex items-start gap-3 text-xs text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                <p>Our VIP Lead Travel Concierge is preparing your custom KES {calculatedCost.total.toLocaleString()} invoice summary.</p>
                              </div>
                              <div className="flex items-start gap-3 text-xs text-gray-300">
                                <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                                <p>We will connect directly via WhatsApp / Call at <span className="font-bold text-white">{phone}</span> within 10-15 minutes to secure deposits.</p>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                setSelectedPackage(null);
                                setIsSubmitted(false);
                              }}
                              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-2xl text-xs sm:text-sm border border-white/10 cursor-pointer"
                            >
                              Exit VIP Portal
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
