import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { 
  Plane, Train, Hotel, MapPin, Users, Camera, Car,
  ArrowLeft, CheckCircle2, Star, Calendar, 
  Clock, User, Phone, Mail, ShieldCheck, Check,
  Send, Navigation, Info, ChevronDown, Briefcase, Baby, ArrowRightLeft
} from "lucide-react";

// Gallery image imports
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


type ServiceData = {
  id: string;
  title: string;
  shortDesc: string;
  icon: any;
  color: string; // Used for accents
  coverImage: string;
  gallery: string[];
  longDesc: string;
  features: string[];
  pricing: { route: string; price: string }[];
  testimonial: { text: string; author: string };
  faqs: { q: string; a: string }[];
  routeTable?: {
    title: string;
    note: string;
    headers: string[];
    rows: { col1: string; col2: string; col3?: string; col4?: string }[];
  };
  scheduleTable?: {
    title: string;
    note: string;
    trains: { time: string; pickups: string[] }[];
  };
};

const defaultFaqs = [
  { q: "How far in advance should I book?", a: "We recommend booking at least 24 hours in advance to guarantee vehicle availability, especially during peak holiday seasons." },
  { q: "Are your vehicles air-conditioned?", a: "Yes, our entire fleet consists of modern, fully air-conditioned vehicles for your comfort." },
  { q: "What happens if my plans change or I am delayed?", a: "We track all flights and train schedules. If you are delayed, our driver will wait for you at no extra charge. For cancellations, please notify us 12 hours prior." },
  { q: "Do you provide child safety seats?", a: "Yes, child seats are available upon request at the time of booking, free of charge." }
];

const coreServices: ServiceData[] = [
  {
    id: "car-hire",
    title: "Car & Van Hire",
    shortDesc: "Need a vehicle? Hire our Toyota fleet with a professional chauffeur.",
    icon: Car,
    color: "from-emerald-500 to-teal-600",
    coverImage: gallery14,
    gallery: [gallery14, gallery13, gallery16, gallery11],
    longDesc: "Looking for a car? Ephream Tours offers full car hire services along the Kenyan coast. Every booking includes a licensed, professional driver and a well-maintained Toyota — from executive Alphards and Voxys to Hiace shuttles and Coaster buses. Use us for airport and SGR transfers, full-day city hire, safaris, weddings, and corporate events. Tell us your dates and route; we confirm availability and a clear rate before you travel.",
    features: [
      "Car hire with professional chauffeur (we do not offer self-drive)",
      "Hourly, full-day, and multi-day hire available",
      "Airport, SGR, hotel, safari, wedding & event itineraries",
      "Toyota Alphard, Voxy, Noah, Esquire, Hiace, Prado, Coaster",
      "Transparent pricing — per trip or per day on request",
    ],
    pricing: [
      { route: "Half-day hire (4 hrs, within city)", price: "From KES 5,000" },
      { route: "Full-day hire (8 hrs)", price: "From KES 8,000" },
      { route: "Airport / SGR one-way transfer", price: "See route rates below" },
      { route: "Safari or multi-day hire", price: "Custom quote" },
    ],
    testimonial: {
      text: "We hired a van with driver for three days between Mombasa and Watamu. Easy to book on WhatsApp, clean vehicle, and the driver was excellent.",
      author: "Sarah M., UK visitor",
    },
    faqs: [
      { q: "Do you offer self-drive car hire?", a: "No. All our hires include a professional Ephream Tours chauffeur for your safety, insurance, and local knowledge." },
      { q: "How do I book a car?", a: "Contact us via WhatsApp or the booking form with your dates, pickup location, and vehicle size needed. We confirm availability within minutes." },
      { q: "Which vehicles can I hire?", a: "Our hire fleet includes Toyota MPVs (Alphard, Voxy, Noah, Esquire), Hiace vans, Land Cruiser Prado, and Coaster buses depending on group size." },
      ...defaultFaqs.slice(3),
    ],
  },
  {
    id: "lobby-concierge",
    title: "Lobby-to-Platform VIP Concierge",
    shortDesc: "The ultimate white-glove connection between your hotel lobby and the SGR train platform.",
    icon: Hotel,
    color: "from-blue-800 to-amber-500",
    coverImage: gallery13,
    gallery: [
      gallery9,
      gallery10,
      gallery11,
      gallery12,
      gallery13,
      gallery14,
      gallery15,
      gallery16,
      gallery17,
      gallery18,
      gallery22
    ],
    longDesc: "Elevate your coastal holiday to the absolute peak of luxury. Our elite Lobby-to-Platform VIP Concierge service bridges the gap between the Mombasa SGR Terminus and your luxury resort. Enjoy a seamless, white-glove experience where a private professional concierge handles your luggage directly from your hotel room, coordinates your pre-check-in with the front desk so your room keys are ready on arrival, and providesSwahili coconut water and cold towels in a luxury vehicle.",
    features: [
      "Room-to-train platform complete luggage handling",
      "Pre-arranged resort room-key handoff in-transit",
      "Swahili welcome refreshments & cold towel service",
      "Express SGR terminal check-in & boarding assistance",
      "Executive luxury fleet with Wi-Fi & device charging"
    ],
    pricing: [
      { route: "Nyali/Bamburi Resorts <-> SGR", price: "KES 2,500" },
      { route: "Kilifi Resorts <-> SGR", price: "KES 4,000" },
      { route: "Watamu Resorts <-> SGR", price: "KES 5,500" },
      { route: "Malindi Resorts <-> SGR", price: "KES 6,500" },
      { route: "Diani Beach Resorts <-> SGR", price: "KES 5,000" }
    ],
    testimonial: {
      text: "An absolute game-changer! Our concierge met us in the lobby, handled all our bags, and when we reached our villa, we walked straight to our room—no front desk lines. Exquisite service.",
      author: "Lord & Lady Harrington, UK"
    },
    faqs: [
      { q: "How is the room-key handoff coordinated?", a: "We partner directly with leading luxury resorts on the coast. With your permission, we pre-verify your check-in documents with the front desk and retrieve your room keys so our concierge can hand them to you inside the vehicle during transit." },
      { q: "Do you handle the train ticket booking?", a: "Yes, our VIP Concierge package can include pre-booking of SGR First Class tickets upon request to ensure a seamless end-to-end journey." },
      { q: "What happens if the train is delayed?", a: "We monitor train schedules in real-time. Your concierge and private chauffeur are synchronized perfectly with the actual arrival or departure, guaranteeing zero wait time." },
      { q: "Is the vehicle private?", a: "Yes, the Lobby-to-Platform service is always 100% private, utilizing our signature fleet of luxury SUVs and executive vans." }
    ],
    routeTable: {
      title: "VIP Concierge Partner Resorts & Rates",
      note: "Rates are all-inclusive per vehicle, covering up to 5 guests with full premium concierge treatment.",
      headers: ["Luxury Partner Resort", "Region", "Direct Executive Rate"],
      rows: [
        { col1: "Hemingways Watamu", col2: "Watamu", col3: "KES 5,500" },
        { col1: "Medina Palms Watamu", col2: "Watamu", col3: "KES 5,500" },
        { col1: "PrideInn Paradise Shanzu", col2: "Mombasa North", col3: "KES 2,500" },
        { col1: "Sarova Whitesands Mombasa", col2: "Mombasa North", col3: "KES 2,500" },
        { col1: "Silver Palms Beach Kilifi", col2: "Kilifi", col3: "KES 4,000" },
        { col1: "Vipingo Ridge Kilifi", col2: "Kilifi", col3: "KES 4,500" },
        { col1: "Sands at Nomad Diani", col2: "Diani Beach", col3: "KES 5,000" },
        { col1: "Baobab Beach Resort Diani", col2: "Diani Beach", col3: "KES 5,000" }
      ]
    }
  },
  {
    id: "sgr",
    title: "SGR Terminus Transfers",
    shortDesc: "Comfortable, direct transit from Mombasa Terminus to your coastal destination.",
    icon: Train,
    color: "from-orange-500 to-red-500",
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
      { route: "SGR To/From Mombasa Island", price: "KES 500" },
      { route: "SGR To/From Kilifi", price: "KES 1,000" },
      { route: "SGR To/From Watamu", price: "KES 1,300" },
      { route: "SGR To/From Malindi", price: "KES 1,500" }
    ],
    testimonial: {
      text: "Our train was delayed by an hour, but the driver was patiently waiting with a sign. The van was spotless and the drive to Watamu was smooth.",
      author: "David M., Nairobi"
    },
    faqs: defaultFaqs,
    routeTable: {
      title: "Fare Chart (To/From SGR Mombasa Terminus)",
      note: "Prices apply to shared shuttle services. Private transfers available on request.",
      headers: ["Origin / Destination", "Shared Shuttle", "Private Transfer"],
      rows: [
        { col1: "Mombasa Island", col2: "KES 500", col3: "On Request" },
        { col1: "Nyali / Bamburi", col2: "KES 700", col3: "On Request" },
        { col1: "Kilifi", col2: "KES 1,000", col3: "KES 4,500" },
        { col1: "Watamu", col2: "KES 1,300", col3: "KES 6,000" },
        { col1: "Malindi", col2: "KES 1,500", col3: "KES 7,000" },
        { col1: "Diani Beach", col2: "N/A", col3: "KES 5,500" },
      ]
    },
    scheduleTable: {
      title: "SGR Train & Departure Schedule",
      note: "Our departures are carefully timed to guarantee early arrival and stress-free boarding at the SGR terminal.",
      trains: [
        { time: "8:00 AM (Morning Train)", pickups: ["Malindi: 4:30 AM", "Watamu: 5:00 AM", "Kilifi: 6:00 AM"] },
        { time: "3:00 PM (Afternoon Train)", pickups: ["Malindi: 10:30 AM", "Watamu: 11:00 AM", "Kilifi: 12:00 PM"] },
        { time: "10:00 PM (Night Train)", pickups: ["Malindi: 5:30 PM", "Watamu: 6:00 PM", "Kilifi: 7:00 PM"] },
      ]
    }
  },
  {
    id: "airport",
    title: "VIP Airport Meet & Greet",
    shortDesc: "Premium arrivals at Mombasa (MBA) and Malindi (MYD) airports.",
    icon: Plane,
    color: "from-sky-400 to-blue-500",
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
    },
    faqs: defaultFaqs,
    routeTable: {
      title: "Airport Transfer Routes & Rates",
      note: "Rates are customized per booking based on vehicle choice (Sedan vs Executive Van).",
      headers: ["From", "To Destination", "Estimated Rate"],
      rows: [
        { col1: "Moi Airport (MBA)", col2: "Mombasa CBD / Nyali", col3: "From KES 1,500" },
        { col1: "Moi Airport (MBA)", col2: "Diani Beach", col3: "From KES 3,500" },
        { col1: "Moi Airport (MBA)", col2: "Kilifi / Watamu", col3: "From KES 5,000" },
        { col1: "Malindi Airport", col2: "Malindi Town", col3: "From KES 800" },
        { col1: "Malindi Airport", col2: "Watamu Resorts", col3: "From KES 1,500" },
      ]
    }
  },
  {
    id: "hotel",
    title: "Hotel-to-Hotel Shuttles",
    shortDesc: "Comfortable, direct transfers between luxury coastal resorts.",
    icon: Hotel,
    color: "from-green-400 to-emerald-500",
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
    },
    faqs: defaultFaqs,
    routeTable: {
      title: "Popular Inter-Hotel Routes",
      note: "Rates apply per vehicle, accommodating up to 6 passengers.",
      headers: ["From", "To", "Estimated Rate"],
      rows: [
        { col1: "Diani Beach Resorts", col2: "Nyali / Bamburi", col3: "KES 3,500" },
        { col1: "Mombasa Island", col2: "Kilifi Resorts", col3: "KES 4,500" },
        { col1: "Kilifi", col2: "Watamu / Malindi", col3: "KES 3,500" },
        { col1: "Watamu", col2: "Malindi Town", col3: "KES 1,500" },
      ]
    }
  },
  {
    id: "city",
    title: "City & Cultural Tours",
    shortDesc: "Explore the best sights and cultural spots in Mombasa, Malindi, and Watamu.",
    icon: MapPin,
    color: "from-purple-400 to-pink-500",
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
    },
    faqs: [
      { q: "Are entrance fees included in the tour price?", a: "Standard tour prices cover transportation and the guide. Museum and park entrance fees are generally excluded unless stated in a custom package." },
      ...defaultFaqs.slice(1)
    ],
    routeTable: {
      title: "Popular Day Tours",
      note: "Tour prices exclude park/museum entry fees unless stated.",
      headers: ["Tour Destination", "Duration", "Estimated Price"],
      rows: [
        { col1: "Mombasa Old Town & Fort Jesus", col2: "Half Day", col3: "KES 2,500 pp" },
        { col1: "Haller Park Wildlife Tour", col2: "3 Hours", col3: "KES 1,500 pp" },
        { col1: "Gede Ruins (Watamu)", col2: "Half Day", col3: "KES 2,000 pp" },
        { col1: "Marafa Hell's Kitchen Sunset", col2: "Half Day", col3: "KES 2,500 pp" },
      ]
    }
  },
  {
    id: "safari",
    title: "Safari & Excursions",
    shortDesc: "Thrilling game drives and marine excursions with professional guides.",
    icon: Camera,
    color: "from-amber-400 to-orange-500",
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
    },
    faqs: [
      { q: "What should I pack for a Safari?", a: "Bring lightweight, neutral-colored clothing, a wide-brimmed hat, sunscreen, binoculars, and a good camera." },
      { q: "Are meals provided on Safari?", a: "Yes, our multi-day safari packages are fully inclusive of all meals, accommodation, and park entry fees." },
      ...defaultFaqs.slice(2)
    ],
  },
  {
    id: "group",
    title: "Group & Corporate Transport",
    shortDesc: "Reliable fleet coordination for large teams and events.",
    icon: Users,
    color: "from-[#003B73] to-blue-600",
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
    },
    faqs: defaultFaqs
  }
];

export function ServicesPage() {
  const location = useLocation();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bookingState, setBookingState] = useState<"idle" | "submitting" | "success">("idle");
  const [tripType, setTripType] = useState<"one-way" | "return">("one-way");
  const [passengers, setPassengers] = useState({ adults: 1, children: 0 });
  const [luggage, setLuggage] = useState(2);
  const [fromLocation, setFromLocation] = useState("");
  const [customFromLocation, setCustomFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [customToLocation, setCustomToLocation] = useState("");
  const [calculatedPrice, setCalculatedPrice] = useState<number | null>(null);

  const locations = [
    "Moi International Airport (MBA)",
    "SGR Mombasa Terminus",
    "Mombasa Island",
    "Nyali / Bamburi / Shanzu",
    "Mtwapa / Vipingo",
    "Kilifi",
    "Watamu",
    "Malindi",
    "Diani Beach / Ukunda",
    "Tsavo National Park",
    "Nairobi",
    "Other / Custom Location"
  ];

  const selectedService = coreServices.find(s => s.id === selectedId);

  // Dynamic Location Lists based on Service Type
  const getLocationsList = () => {
    if (selectedId === "lobby-concierge") {
      return [
        "SGR Mombasa Terminus",
        "Hemingways Watamu",
        "Medina Palms Watamu",
        "PrideInn Paradise Shanzu",
        "Sarova Whitesands Mombasa",
        "Silver Palms Beach Kilifi",
        "Vipingo Ridge Kilifi",
        "Sands at Nomad Diani",
        "Baobab Beach Resort Diani",
        "Other / Custom Resort"
      ];
    }
    if (selectedId === "sgr") {
      return [
        "SGR Mombasa Terminus",
        "Mombasa Island / CBD",
        "Nyali / Bamburi / Shanzu Resorts",
        "Kilifi Hotels & Resorts",
        "Watamu Hotels & Resorts",
        "Malindi Hotels & Resorts",
        "Diani Beach Resorts / Ukunda",
        "Other / Custom Location"
      ];
    }
    if (selectedId === "airport") {
      return [
        "Moi International Airport (MBA) Mombasa",
        "Malindi Airport (MYD)",
        "Diani / Ukunda Airstrip",
        "Nyali / Bamburi / Shanzu Resorts",
        "Kilifi Hotels & Resorts",
        "Watamu Hotels & Resorts",
        "Malindi Hotels & Resorts",
        "Diani Beach Resorts",
        "Other / Custom Location"
      ];
    }
    if (selectedId === "hotel") {
      return [
        "Medina Palms (Watamu)",
        "Hemingways Watamu",
        "Temple Point Resort (Watamu)",
        "Kobe Suite Resort (Watamu)",
        "Baobab Beach Resort (Diani)",
        "Sands at Nomad (Diani)",
        "Diani Reef Beach Resort",
        "Serena Beach Resort (Mombasa)",
        "Sarova Whitesands (Mombasa)",
        "PrideInn Paradise (Shanzu)",
        "Silver Palms Beach Resort (Kilifi)",
        "Vipingo Ridge (Kilifi)",
        "Sandies Tropical Village (Malindi)",
        "Ocean Beach Resort (Malindi)",
        "Other / Custom Resort"
      ];
    }
    return locations;
  };

  // Helper to detect what coast region a hotel belongs to for price calculations
  const getRegion = (locName: string) => {
    const name = locName.toLowerCase();
    if (name.includes("watamu") || name.includes("hemingways") || name.includes("medina")) return "Watamu";
    if (name.includes("diani") || name.includes("nomad") || name.includes("baobab")) return "Diani";
    if (name.includes("mombasa") || name.includes("whitesands") || name.includes("shanzu") || name.includes("prideinn") || name.includes("nyali")) return "Mombasa";
    if (name.includes("kilifi") || name.includes("vipingo") || name.includes("silver palms")) return "Kilifi";
    if (name.includes("malindi")) return "Malindi";
    if (name.includes("sgr")) return "SGR";
    if (name.includes("airport") || name.includes("mba") || name.includes("myd")) return "Airport";
    return "Custom";
  };

  useEffect(() => {
    if (!fromLocation || !toLocation || fromLocation === "Other / Custom Location" || toLocation === "Other / Custom Location" || fromLocation === "Other / Custom Resort" || toLocation === "Other / Custom Resort") {
      setCalculatedPrice(null);
      return;
    }

    let basePrice = 2000;
    const fromRegion = getRegion(fromLocation);
    const toRegion = getRegion(toLocation);

    // If Lobby-to-Platform VIP Concierge calculations
    if (selectedId === "lobby-concierge") {
      const routeStr = [fromLocation, toLocation].join("-");
      const routeRev = [toLocation, fromLocation].join("-");
      const route = routeStr + "|" + routeRev;

      if (route.includes("SGR Mombasa Terminus")) {
        if (route.includes("Watamu") || route.includes("Hemingways") || route.includes("Medina")) basePrice = 5500;
        else if (route.includes("Kilifi") || route.includes("Vipingo") || route.includes("Silver Palms")) basePrice = 4000;
        else if (route.includes("Diani") || route.includes("Nomad") || route.includes("Baobab")) basePrice = 5000;
        else if (route.includes("Mombasa") || route.includes("PrideInn") || route.includes("Whitesands")) basePrice = 2500;
      }
    }
    // If Hotel-to-Hotel dynamic calculations
    else if (selectedId === "hotel") {
      if (fromRegion === toRegion) {
        basePrice = 1500; // Local inter-hotel transfers (e.g. Hemingways to Medina Palms)
      } else {
        const route = [fromRegion, toRegion].join("-") + "|" + [toRegion, fromRegion].join("-");
        if (route.includes("Diani") && route.includes("Watamu")) basePrice = 9000; // Deep south to deep north coast
        else if (route.includes("Diani") && route.includes("Mombasa")) basePrice = 3500;
        else if (route.includes("Diani") && route.includes("Kilifi")) basePrice = 6500;
        else if (route.includes("Diani") && route.includes("Malindi")) basePrice = 10000;
        else if (route.includes("Mombasa") && route.includes("Watamu")) basePrice = 5500;
        else if (route.includes("Mombasa") && route.includes("Kilifi")) basePrice = 4500;
        else if (route.includes("Mombasa") && route.includes("Malindi")) basePrice = 6500;
        else if (route.includes("Kilifi") && route.includes("Watamu")) basePrice = 3500;
        else if (route.includes("Kilifi") && route.includes("Malindi")) basePrice = 4500;
        else if (route.includes("Watamu") && route.includes("Malindi")) basePrice = 2000;
      }
    } else {
      // SGR or Airport transfers general fallback
      const routeStr = [fromLocation, toLocation].join("-");
      const routeRev = [toLocation, fromLocation].join("-");
      const route = routeStr + "|" + routeRev;

      if (route.includes("SGR Mombasa Terminus")) {
        if (route.includes("Mombasa Island")) basePrice = 500;
        else if (route.includes("Nyali")) basePrice = 700;
        else if (route.includes("Kilifi")) basePrice = 1000;
        else if (route.includes("Watamu")) basePrice = 1300;
        else if (route.includes("Malindi")) basePrice = 1500;
        else if (route.includes("Diani")) basePrice = 4500;
      } else if (route.includes("Airport")) {
        if (route.includes("Mombasa Island") || route.includes("Nyali")) basePrice = 1500;
        else if (route.includes("Diani")) basePrice = 3500;
        else if (route.includes("Watamu") || route.includes("Kilifi")) basePrice = 5000;
      } else if (route.includes("Diani") && route.includes("Nyali")) {
        basePrice = 3500;
      } else if (route.includes("Mombasa Island") && route.includes("Kilifi")) {
        basePrice = 4500;
      } else if (route.includes("Watamu") && route.includes("Malindi")) {
        basePrice = 1500;
      }
    }

    let totalPassengers = passengers.adults + passengers.children;
    if (totalPassengers > 4) {
      basePrice += (totalPassengers - 4) * 500;
    }

    if (tripType === "return") {
      basePrice *= 2;
    }

    setCalculatedPrice(basePrice);
  }, [fromLocation, toLocation, tripType, passengers, selectedId]);

  // Open service from URL hash (e.g. /services#car-hire)
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash && coreServices.some((s) => s.id === hash)) {
      setSelectedId(hash);
      setBookingState("idle");
    }
  }, [location.hash]);

  // Scroll to top when a service is selected
  useEffect(() => {
    if (selectedId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedId]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingState("submitting");
    // Simulate network request
    setTimeout(() => {
      setBookingState("success");
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen relative overflow-hidden font-sans">
      
      {/* Subtle Background Effects for the Main Grid */}
      {!selectedId && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-100 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] opacity-60" />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!selectedId ? (
          // --- MAIN GRID VIEW ---
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          >
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-white shadow-sm border border-gray-200 px-4 py-2 rounded-full mb-6">
                <MapPin className="w-4 h-4 text-[#F9A03F]" />
                <span className="text-xs sm:text-sm font-bold text-[#003B73] uppercase tracking-widest">Our Expertise</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Core <span className="text-[#003B73]">Services</span>
              </h1>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Need a car? We offer <strong className="font-semibold text-gray-800">car hire with driver</strong> plus transfers, safaris, and VIP concierge. Select a service below to view rates and book.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {coreServices.map((service) => (
                <motion.div
                  layoutId={`card-container-${service.id}`}
                  key={service.id}
                  onClick={() => {
                    setSelectedId(service.id);
                    setBookingState("idle");
                  }}
                  className="cursor-pointer group"
                >
                  <div className="h-full bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col relative">
                    
                    <motion.div layoutId={`image-${service.id}`} className="w-full h-56 overflow-hidden relative">
                      <img 
                        src={service.coverImage} 
                        alt={service.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    </motion.div>

                    <div className="p-6 sm:p-8 relative z-10 flex-grow flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <motion.div
                          layoutId={`icon-${service.id}`}
                          className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center shadow-lg`}
                        >
                          <service.icon className="w-7 h-7 text-white drop-shadow-md" />
                        </motion.div>
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#003B73] transition-colors border border-gray-100">
                          <Plane className="w-4 h-4 text-gray-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform group-hover:text-white" />
                        </div>
                      </div>

                      <motion.h3 layoutId={`title-${service.id}`} className="text-2xl font-bold mb-3 text-gray-900 tracking-tight">
                        {service.title}
                      </motion.h3>
                      
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light mb-6 flex-grow">
                        {service.shortDesc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          
          // --- DETAILED EDGE-TO-EDGE EXPLORATIVE LANDING PAGE ---
          <motion.div
            key="detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {selectedService && (
              <motion.div layoutId={`card-container-${selectedService.id}`} className="bg-white min-h-screen">
                
                {/* Edge-to-Edge Hero Image */}
                <motion.div layoutId={`image-${selectedService.id}`} className="w-full h-[45vh] sm:h-[55vh] relative overflow-hidden">
                  <img 
                    src={selectedService.coverImage} 
                    alt={selectedService.title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-transparent to-white" />
                  
                  {/* Floating Back Button */}
                  <div className="absolute top-24 left-4 sm:left-8 z-20">
                    <button
                      onClick={() => setSelectedId(null)}
                      className="inline-flex items-center gap-2 text-white font-bold bg-black/40 hover:bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 transition-all hover:-translate-x-1 shadow-lg"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back to Services
                    </button>
                  </div>
                </motion.div>

                {/* Content Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-24 sm:-mt-32 pb-24">
                  
                  <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 mb-10 lg:mb-16">
                    <motion.div
                      layoutId={`icon-${selectedService.id}`}
                      className={`w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br ${selectedService.color} rounded-3xl flex items-center justify-center shadow-2xl border-4 border-white shrink-0`}
                    >
                      <selectedService.icon className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-md" />
                    </motion.div>
                    <div className="pb-2">
                      <motion.h2 layoutId={`title-${selectedService.id}`} className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-3 tracking-tight">
                        {selectedService.title}
                      </motion.h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-[#003B73]">
                        <span className="flex items-center gap-1 bg-sky-50 px-3 py-1 rounded-full"><ShieldCheck className="w-4 h-4 text-[#F9A03F]" /> Secure Booking</span>
                        <span className="flex items-center gap-1 bg-sky-50 px-3 py-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-[#F9A03F]" /> Instant Confirmation</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-start">
                    
                    {/* Left Column: Long Explorative Information */}
                    <div className="order-2 lg:order-1 space-y-16">
                      
                      {/* Overview */}
                      <section>
                        <h3 className="text-2xl font-bold text-[#003B73] mb-6 flex items-center gap-2">
                          <Info className="w-6 h-6 text-[#F9A03F]" /> Service Overview
                        </h3>
                        <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed">
                          {selectedService.longDesc}
                        </p>
                      </section>

                      {/* Extensive Route Tables */}
                      {selectedService.routeTable && (
                        <section>
                          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                            <div className="p-6 sm:p-8 border-b border-gray-100 bg-slate-50">
                              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Navigation className="w-6 h-6 text-[#003B73]" />
                                {selectedService.routeTable.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                                <Info className="w-4 h-4 shrink-0 text-[#F9A03F]" />
                                {selectedService.routeTable.note}
                              </p>
                            </div>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-gray-700">
                                <thead>
                                  <tr className="bg-white border-b border-gray-100">
                                    {selectedService.routeTable.headers.map((header, idx) => (
                                      <th key={idx} className="px-6 sm:px-8 py-5 font-bold text-xs sm:text-sm uppercase tracking-widest text-[#003B73]">{header}</th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedService.routeTable.rows.map((row, idx) => (
                                    <tr key={idx} className="border-b border-gray-50 hover:bg-slate-50 transition-colors">
                                      <td className="px-6 sm:px-8 py-5 font-bold text-gray-900">{row.col1}</td>
                                      <td className="px-6 sm:px-8 py-5 font-medium">{row.col2}</td>
                                      {row.col3 && <td className="px-6 sm:px-8 py-5 font-medium text-gray-500">{row.col3}</td>}
                                      {row.col4 && <td className="px-6 sm:px-8 py-5">{row.col4}</td>}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </section>
                      )}

                      {/* Schedule Tables */}
                      {selectedService.scheduleTable && (
                        <section>
                          <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
                            <div className="p-6 sm:p-8 border-b border-gray-100 bg-slate-50">
                              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Clock className="w-6 h-6 text-[#003B73]" />
                                {selectedService.scheduleTable.title}
                              </h3>
                              <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
                                <Info className="w-4 h-4 shrink-0 text-[#F9A03F]" />
                                {selectedService.scheduleTable.note}
                              </p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-px bg-gray-100">
                              {selectedService.scheduleTable.trains.map((train, idx) => (
                                <div key={idx} className="bg-white p-6 sm:p-8 hover:bg-slate-50 transition-colors">
                                  <div className="flex flex-col gap-2 font-bold mb-6 border-b border-gray-100 pb-4">
                                    <span className="text-[#003B73] uppercase tracking-wider text-xs">Departure</span>
                                    <div className="flex items-center gap-2 text-xl text-gray-900">
                                      <Train className="w-5 h-5 text-[#F9A03F]" />
                                      {train.time}
                                    </div>
                                  </div>
                                  <ul className="space-y-4">
                                    {train.pickups.map((pickup, i) => (
                                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600 font-medium">
                                        <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                                          <MapPin className="w-3 h-3 text-[#F9A03F]" />
                                        </div>
                                        <span>Pick up at <strong className="text-gray-900 block mt-0.5">{pickup}</strong></span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </section>
                      )}

                      {/* Features & Testimonial Split */}
                      <section className="grid sm:grid-cols-2 gap-8">
                        <div className="bg-slate-50 border border-gray-100 rounded-3xl p-8 shadow-sm">
                          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <CheckCircle2 className="text-[#F9A03F] w-6 h-6" /> What to Expect
                          </h3>
                          <ul className="space-y-4">
                            {selectedService.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-gray-600 font-medium">
                                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-gradient-to-br from-[#003B73] to-blue-900 rounded-3xl p-8 relative flex flex-col shadow-xl">
                          <Star className="absolute top-6 right-6 w-8 h-8 text-[#F9A03F]/20" fill="currentColor" />
                          <h3 className="text-xl font-bold text-white mb-6">Client Review</h3>
                          <p className="text-sky-100 italic mb-8 text-lg flex-grow leading-relaxed font-light">
                            "{selectedService.testimonial.text}"
                          </p>
                          <div className="flex items-center gap-4 mt-auto">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
                              {selectedService.testimonial.author.charAt(0)}
                            </div>
                            <div>
                              <span className="font-bold text-white block">{selectedService.testimonial.author}</span>
                              <span className="text-sky-200 text-sm">Verified Client</span>
                            </div>
                          </div>
                        </div>
                      </section>

                      {/* Frequently Asked Questions */}
                      <section>
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                          {selectedService.faqs.map((faq, idx) => (
                            <details key={idx} className="group bg-white border border-gray-200 rounded-2xl shadow-sm open:shadow-md transition-all cursor-pointer">
                              <summary className="flex items-center justify-between p-6 font-bold text-gray-900 select-none">
                                {faq.q}
                                <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
                              </summary>
                              <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                                <p className="pt-4 border-t border-gray-100">{faq.a}</p>
                              </div>
                            </details>
                          ))}
                        </div>
                      </section>

                      {/* Large Immersive Gallery */}
                      <section>
                        <h3 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Experience Gallery</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedService.gallery.map((img, idx) => (
                            <div key={idx} className={`rounded-2xl overflow-hidden shadow-md group/img ${idx === 0 ? 'col-span-2 md:col-span-2 row-span-2 aspect-auto' : 'aspect-square'}`}>
                              <img src={img} alt="Gallery view" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700" />
                            </div>
                          ))}
                        </div>
                      </section>
                    </div>

                    {/* Right Column: Floating Clean Booking Form */}
                    <div className="order-1 lg:order-2 lg:sticky lg:top-24 mt-8 lg:mt-0 z-20">
                      <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                        
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-100 to-transparent rounded-full blur-2xl pointer-events-none" />

                        <AnimatePresence mode="wait">
                          {bookingState === "success" ? (
                            <motion.div 
                              key="success"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex flex-col items-center justify-center py-12 text-center"
                            >
                              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                              </div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-3">Request Received!</h3>
                              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                                Thank you! A dedicated representative will contact you on WhatsApp within 10 minutes to confirm your luxury vehicle.
                              </p>
                              <button
                                onClick={() => setBookingState("idle")}
                                className="text-[#003B73] font-bold hover:text-[#F9A03F] transition-colors"
                              >
                                Book another ride
                              </button>
                            </motion.div>
                          ) : (
                            <motion.form 
                              key="form"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              onSubmit={handleBookingSubmit}
                              className="relative z-10 space-y-6"
                            >
                              <div>
                                <h3 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Book Your Ride</h3>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-6">Get Instant Confirmation</p>
                              </div>

                              {/* Trip Type Selector */}
                              <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                                <button type="button" onClick={() => setTripType("one-way")} className={`flex-1 flex justify-center items-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${tripType === "one-way" ? "bg-white text-[#003B73] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                                  <ArrowRightLeft className="w-4 h-4 opacity-50" /> One Way
                                </button>
                                <button type="button" onClick={() => setTripType("return")} className={`flex-1 flex justify-center items-center gap-2 py-2 text-sm font-bold rounded-lg transition-all ${tripType === "return" ? "bg-white text-[#003B73] shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
                                  <ArrowRightLeft className="w-4 h-4" /> Return Trip
                                </button>
                              </div>

                              {/* VIP Concierge Widgets */}
                              {selectedId === "lobby-concierge" && (
                                <div className="space-y-4 bg-slate-50 border border-gray-150 p-4 rounded-2xl">
                                  {/* Resort Quick Select */}
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 ml-1 block">🏨 VIP Partner Resort Handoff</label>
                                    <div className="grid grid-cols-2 gap-2">
                                      {[
                                        { name: "Hemingways", loc: "Hemingways Watamu" },
                                        { name: "Medina Palms", loc: "Medina Palms Watamu" },
                                        { name: "PrideInn Shanzu", loc: "PrideInn Paradise Shanzu" },
                                        { name: "Sands at Nomad", loc: "Sands at Nomad Diani" },
                                      ].map((resort) => {
                                        const isSelected = toLocation === resort.loc && fromLocation === "SGR Mombasa Terminus";
                                        return (
                                          <button
                                            key={resort.name}
                                            type="button"
                                            onClick={() => {
                                              setFromLocation("SGR Mombasa Terminus");
                                              setToLocation(resort.loc);
                                            }}
                                            className={`p-2.5 rounded-xl border text-[11px] font-bold text-left transition-all hover:scale-[1.02] active:scale-95 ${
                                              isSelected
                                                ? "border-[#F9A03F] bg-amber-50 text-[#003B73] shadow-inner"
                                                : "border-gray-200 bg-white hover:bg-slate-50 text-gray-700 shadow-sm"
                                            }`}
                                          >
                                            <span className="mr-1">🏝️</span> {resort.name}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  {/* Train Coordination */}
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 ml-1 block">🚆 Train Arrival/Departure Sync</label>
                                    <div className="grid grid-cols-3 gap-2 p-1 bg-white rounded-xl border border-gray-200">
                                      {[
                                        { name: "🌅 Morning", time: "8:00 AM" },
                                        { name: "☀️ Afternoon", time: "3:00 PM" },
                                        { name: "🌙 Night", time: "10:00 PM" },
                                      ].map((trainOption) => (
                                        <button
                                          key={trainOption.name}
                                          type="button"
                                          className="py-2.5 rounded-lg text-[10px] font-bold text-center bg-slate-50 text-[#003B73] border border-gray-100 hover:border-[#F9A03F] transition-all"
                                        >
                                          <div className="font-black text-gray-800">{trainOption.name}</div>
                                          <div className="text-[9px] text-[#F9A03F] font-bold mt-0.5">{trainOption.time}</div>
                                        </button>
                                      ))}
                                    </div>
                                    <p className="text-[10px] text-gray-500 italic mt-1 leading-normal ml-1 flex items-start gap-1">
                                      <span>✨</span>
                                      <span>VIP Chauffeur and concierge meet you on the platform 30 mins before arrival.</span>
                                    </p>
                                  </div>
                                </div>
                              )}

                              {/* Locations */}
                              <div className="space-y-3 relative bg-slate-50 p-4 border border-gray-100 rounded-2xl">
                                <div className="relative">
                                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                                  <select 
                                    required 
                                    value={fromLocation}
                                    onChange={(e) => setFromLocation(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-10 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium shadow-sm"
                                  >
                                    <option value="" disabled>Select Pick-up Location (From)...</option>
                                    {getLocationsList().map(loc => (
                                      <option key={loc} value={loc} disabled={loc === toLocation && loc !== "Other / Custom Location" && loc !== "Other / Custom Resort"}>{loc}</option>
                                    ))}
                                  </select>
                                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                {(fromLocation === "Other / Custom Location" || fromLocation === "Other / Custom Resort") && (
                                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                                    <input type="text" placeholder="Type custom Pick-up hotel or location..." required value={customFromLocation} onChange={e => setCustomFromLocation(e.target.value)} className="w-full mt-2 bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73]" />
                                  </motion.div>
                                )}
                                <div className="absolute left-[38px] top-[45px] bottom-[45px] w-0.5 bg-gray-200 z-0 hidden sm:block"></div>
                                <div className="relative mt-2">
                                  <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                                  <select 
                                    required 
                                    value={toLocation}
                                    onChange={(e) => setToLocation(e.target.value)}
                                    className="w-full bg-white border border-gray-200 rounded-xl py-3.5 pl-12 pr-10 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium shadow-sm"
                                  >
                                    <option value="" disabled>Select Drop-off Location (To)...</option>
                                    {getLocationsList().map(loc => (
                                      <option key={loc} value={loc} disabled={loc === fromLocation && loc !== "Other / Custom Location" && loc !== "Other / Custom Resort"}>{loc}</option>
                                    ))}
                                  </select>
                                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                                </div>
                                {(toLocation === "Other / Custom Location" || toLocation === "Other / Custom Resort") && (
                                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                                    <input type="text" placeholder="Type custom Drop-off hotel or location..." required value={customToLocation} onChange={e => setCustomToLocation(e.target.value)} className="w-full mt-2 bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73]" />
                                  </motion.div>
                                )}
                              </div>

                              {/* Date & Time */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-700 ml-1">{tripType === "return" ? "Departure Date" : "Date"}</label>
                                  <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="date" required className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium shadow-sm" />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-xs font-bold text-gray-700 ml-1">Time</label>
                                  <div className="relative">
                                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input type="time" required className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium shadow-sm" />
                                  </div>
                                </div>
                              </div>

                              {tripType === "return" && (
                                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 ml-1">Return Date</label>
                                    <div className="relative">
                                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                      <input type="date" required className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium shadow-sm" />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-700 ml-1">Return Time</label>
                                    <div className="relative">
                                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                      <input type="time" required className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium shadow-sm" />
                                    </div>
                                  </div>
                                </motion.div>
                              )}

                              {/* Passengers & Luggage */}
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 border border-gray-100 p-4 rounded-2xl">
                                  <label className="text-xs font-bold text-gray-700 block mb-3 flex items-center gap-1"><Users className="w-4 h-4 text-[#003B73]" /> Passengers</label>
                                  <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-bold text-gray-900">Adults</span>
                                      <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
                                        <button type="button" onClick={() => setPassengers(p => ({...p, adults: Math.max(1, p.adults - 1)}))} className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center font-bold text-gray-600 hover:bg-slate-200">-</button>
                                        <span className="text-sm font-bold w-4 text-center">{passengers.adults}</span>
                                        <button type="button" onClick={() => setPassengers(p => ({...p, adults: p.adults + 1}))} className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center font-bold text-gray-600 hover:bg-slate-200">+</button>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-bold text-gray-900 flex items-center gap-1">Children <Baby className="w-3 h-3 text-gray-400"/></span>
                                      <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
                                        <button type="button" onClick={() => setPassengers(p => ({...p, children: Math.max(0, p.children - 1)}))} className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center font-bold text-gray-600 hover:bg-slate-200">-</button>
                                        <span className="text-sm font-bold w-4 text-center">{passengers.children}</span>
                                        <button type="button" onClick={() => setPassengers(p => ({...p, children: p.children + 1}))} className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center font-bold text-gray-600 hover:bg-slate-200">+</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-slate-50 border border-gray-100 p-4 rounded-2xl">
                                  <label className="text-xs font-bold text-gray-700 block mb-3 flex items-center gap-1"><Briefcase className="w-4 h-4 text-[#F9A03F]" /> Luggage</label>
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-gray-900">Suitcases</span>
                                    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
                                      <button type="button" onClick={() => setLuggage(l => Math.max(0, l - 1))} className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center font-bold text-gray-600 hover:bg-slate-200">-</button>
                                      <span className="text-sm font-bold w-4 text-center">{luggage}</span>
                                      <button type="button" onClick={() => setLuggage(l => l + 1)} className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center font-bold text-gray-600 hover:bg-slate-200">+</button>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Personal Info */}
                              <div className="space-y-4 pt-2 border-t border-gray-100">
                                <div className="relative">
                                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input type="text" placeholder="Full Name" required className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium shadow-sm placeholder:text-gray-400 placeholder:font-normal" />
                                </div>
                                <div className="relative">
                                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input type="tel" placeholder="WhatsApp / Phone Number" required className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium shadow-sm placeholder:text-gray-400 placeholder:font-normal" />
                                </div>
                                <div className="relative">
                                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                  <input type="email" placeholder="Email Address" required className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium shadow-sm placeholder:text-gray-400 placeholder:font-normal" />
                                </div>
                              </div>

                              {/* Price Estimation */}
                              <div className="bg-[#003B73]/5 border border-[#003B73]/10 rounded-2xl p-4 flex items-center justify-between">
                                <div>
                                  <h4 className="text-sm font-bold text-[#003B73]">Estimated Fare</h4>
                                  <p className="text-xs text-gray-500">Based on standard vehicle rates</p>
                                </div>
                                <div className="text-right">
                                  {calculatedPrice ? (
                                    <span className="text-2xl font-black text-[#003B73]">KES {calculatedPrice.toLocaleString()}</span>
                                  ) : (
                                    <span className="text-sm font-bold text-[#F9A03F]">Custom Quote</span>
                                  )}
                                </div>
                              </div>

                              {/* Submit Button */}
                              <button 
                                type="submit" 
                                disabled={bookingState === "submitting"}
                                className={`w-full mt-4 py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-2xl bg-[#003B73] hover:bg-[#002B54] active:scale-95 disabled:opacity-70 disabled:hover:scale-100`}
                              >
                                {bookingState === "submitting" ? (
                                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                  <>
                                    Get Instant Quote
                                    <Send className="w-4 h-4" />
                                  </>
                                )}
                              </button>
                              <p className="text-center text-xs font-medium text-gray-500 mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                No payment required to request. We confirm availability & final pricing instantly via WhatsApp.
                              </p>
                            </motion.form>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

        )}
      </AnimatePresence>

    </div>
  );
}
