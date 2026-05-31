import { useState, useMemo, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, Star, Map, Calendar, Eye, Search, ArrowUpDown, ChevronRight, X, Heart, Shield, HelpCircle, 
  ChevronLeft, Sparkles, Clock, Compass, Coffee, Sunset, Camera, Compass as Binoculars, Gift, Info,
  ArrowLeft, Bed, MapPin, Users, HeartHandshake, PhoneCall
} from "lucide-react";
import { packages } from "../components/Packages";

export function PackageDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Find current package data
  const pkg = useMemo(() => {
    return packages.find(p => p.id === id);
  }, [id]);

  // If package doesn't exist, redirect back
  useEffect(() => {
    if (!pkg) {
      navigate("/packages");
    }
  }, [pkg, navigate]);

  if (!pkg) return null;

  // Form & Premium upgrades state
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

  // Gallery active view state
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Scroll tracking to make sub-navigation sticky
  const [isSticky, setIsSticky] = useState(false);
  const subNavRef = useRef<HTMLDivElement>(null);

  // Section Refs for smooth anchor scrolling
  const overviewRef = useRef<HTMLDivElement>(null);
  const itineraryRef = useRef<HTMLDivElement>(null);
  const lodgingRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleScroll = () => {
      if (subNavRef.current) {
        const offset = subNavRef.current.offsetTop;
        setIsSticky(window.scrollY > 450);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
    if (elementRef.current) {
      const offset = 120; // sticky header spacing offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = elementRef.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const toggleFavorite = (packageId: string) => {
    setFavorites(prev => 
      prev.includes(packageId) ? prev.filter(fId => fId !== packageId) : [...prev, packageId]
    );
  };

  const toggleUpgrade = (upgradeId: string) => {
    setSelectedUpgrades(prev =>
      prev.includes(upgradeId) ? prev.filter(uid => uid !== upgradeId) : [...prev, upgradeId]
    );
  };

  // Live Auto-Concierge Price Engine
  const calculatedCost = useMemo(() => {
    const baseVal = pkg.price;
    const adultsSubtotal = baseVal * adultsCount;
    const childrenSubtotal = Math.round(baseVal * 0.5) * childrenCount;
    const pickupSubtotal = needsPickup ? 2000 : 0;
    
    let upgradesSubtotal = 0;
    pkg.upgrades.forEach((up) => {
      if (selectedUpgrades.includes(up.id)) {
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
  }, [pkg, adultsCount, childrenCount, needsPickup, selectedUpgrades]);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !travelDate) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen relative overflow-hidden font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Cinematic Full-Width Hero Header (Go2Africa Layout) */}
      <section className="relative h-[80vh] w-full bg-gray-900 overflow-hidden flex items-end">
        
        {/* Massive full screen dynamic background image */}
        <div className="absolute inset-0">
          <img 
            src={pkg.images[0]} 
            alt={pkg.name} 
            className="w-full h-full object-cover transform scale-105 animate-[kenburns_40s_ease-out_infinite]"
          />
          {/* Elite dual-gradient backdrop mapping */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-black/35" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Back navigation button */}
        <Link 
          to="/packages"
          className="absolute top-28 left-6 sm:left-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400/40 text-xs font-bold uppercase tracking-widest text-white hover:text-amber-400 transition-all hover:scale-105 z-30"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>

        {/* Floating Favorite Button */}
        <button
          onClick={() => toggleFavorite(pkg.id)}
          className="absolute top-28 right-6 sm:right-10 w-11 h-11 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-white hover:text-red-500 transition-all hover:scale-110 z-30 cursor-pointer"
        >
          <Heart className={`w-5 h-5 ${favorites.includes(pkg.id) ? "fill-red-500 text-red-500" : ""}`} />
        </button>

        {/* Editorial Heading Content Block */}
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-16 z-20">
          <div className="max-w-3xl">
            {/* Breadcrumb Trail */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              <span>Home</span>
              <ChevronRight className="w-3 h-3" />
              <span>Kenya Tour Packages</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-amber-400">{pkg.category}</span>
            </div>

            {/* Custom Grade Badge */}
            <span className="inline-block bg-[#003B73] border border-sky-400/20 text-white px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-4 shadow-md">
              💎 {pkg.badge}
            </span>

            {/* Headline Title */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 tracking-tight leading-[1.05] text-white">
              {pkg.name}
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-2xl text-gray-200 italic font-light mb-6">
              "{pkg.tagline}"
            </p>

            {/* In-Hero Action strip */}
            <div className="flex flex-wrap items-center gap-6">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl flex items-baseline gap-2">
                <div>
                  <span className="block text-[8px] uppercase tracking-wider text-gray-400 font-extrabold">All-Inclusive Starting From</span>
                  <span className="text-2xl font-black text-amber-400">KES {pkg.price.toLocaleString()}</span>
                  <span className="text-xs text-gray-300 ml-1 font-semibold">/ Person</span>
                </div>
              </div>

              <button
                onClick={() => setIsGalleryOpen(true)}
                className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/15 hover:border-amber-400/40 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 hover:scale-105 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-amber-400" />
                View Gallery ({pkg.images.length} Photos)
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* Sticky Sub-Navigation anchor bar (Go2Africa Layout) */}
      <div 
        ref={subNavRef}
        className={`w-full border-b border-white/10 bg-gray-950/95 backdrop-blur-xl z-40 transition-all duration-300 ${
          isSticky ? "fixed top-20 left-0 right-0 shadow-lg border-b-amber-500/20" : "relative"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex items-center gap-1 sm:gap-6 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {[
                { id: "overview", label: "Overview", ref: overviewRef },
                { id: "itinerary", label: "Interactive Itinerary", ref: itineraryRef },
                { id: "lodges", label: "Luxury Lodging", ref: lodgingRef },
                { id: "reviews", label: "Guest Journals", ref: reviewsRef }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.ref)}
                  className="px-3 sm:px-5 py-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollToSection(bookingRef)}
              className="px-5 py-3 sm:px-7 sm:py-3.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Enquire Expedition
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Premium Photo Strip (Go2Africa Visual) */}
      <section className="py-2 border-b border-white/5 bg-gray-900/40">
        <div className="flex items-center gap-3 overflow-x-auto py-3 px-4 scrollbar-none">
          {pkg.images.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => {
                setActiveGalleryIndex(idx);
                setIsGalleryOpen(true);
              }}
              className="relative w-64 sm:w-80 h-40 sm:h-48 rounded-2xl overflow-hidden shrink-0 border border-white/5 hover:border-amber-400/40 cursor-pointer group transition-all duration-500"
            >
              <img 
                src={img} 
                alt={`${pkg.name} slide ${idx + 1}`} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[9px] uppercase font-bold text-amber-300 tracking-wider">
                Photo {idx + 1}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial splitscreen double column detail board */}
      <main className="py-16 sm:py-24 pb-32 lg:pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 sm:gap-16">
          
          {/* LEFT COLUMN: Editorial Details, Timelines, Lodging (8 Columns) */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Overview / At a glance ref section */}
            <div ref={overviewRef} className="space-y-6">
              <h2 className="text-2xl sm:text-4xl font-black text-white flex items-center gap-3 tracking-tight">
                <Map className="w-7 h-7 text-amber-400" />
                At A Glance
              </h2>
              
              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Clock, label: "Duration", val: pkg.duration },
                  { icon: Users, label: "Group Capacity", val: pkg.specs.groupSize },
                  { icon: Compass, label: "Expedition Style", val: pkg.category },
                  { icon: HeartHandshake, label: "Intensity Level", val: pkg.specs.difficulty }
                ].map((spec, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-sm">
                    <spec.icon className="w-6 h-6 text-amber-400 mb-3" />
                    <span className="block text-[9px] text-gray-400 uppercase font-black tracking-widest mb-1">{spec.label}</span>
                    <span className="text-xs sm:text-sm font-bold text-white leading-tight">{spec.val}</span>
                  </div>
                ))}
              </div>

              {/* Rich Paragraph introduction */}
              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                Embark on an absolute masterclass of African travel. Curated specifically for discerning explorers who refuse compromises, this VIP journey through {pkg.name} provides premier localized immersion, private expert naturalists, and golden-standard operations. Woven seamlessly between dawn game drives and quiet champagne sunsets, this is a peerless experience you will treasure forever.
              </p>

              {/* Luxury features strip */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-4">
                <h3 className="text-xs font-black text-amber-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  VIP INCLUSIONS & AMENITIES
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-emerald-400 font-bold" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-300 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Timeline ref section */}
            <div ref={itineraryRef} className="space-y-6">
              <h2 className="text-2xl sm:text-4xl font-black text-white flex items-center gap-3 tracking-tight">
                <Calendar className="w-7 h-7 text-amber-400" />
                Expedition Itinerary
              </h2>

              <div className="relative pl-8 border-l-2 border-amber-500/20 space-y-12">
                {pkg.itinerary.map((day, index) => (
                  <div key={index} className="relative group/itinerary">
                    
                    {/* Floating timeline dot */}
                    <div className="absolute -left-[43px] top-0 w-6 h-6 rounded-full bg-amber-400 border-4 border-gray-950 flex items-center justify-center text-[10px] font-black text-black shadow-lg transition-transform duration-300 group-hover/itinerary:scale-125">
                      {day.day}
                    </div>

                    <div className="flex flex-wrap items-baseline gap-3 mb-2">
                      <span className="text-xs font-black uppercase text-amber-400 tracking-wider">Day {day.day}</span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">{day.time}</span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-bold text-white mb-3">
                      {day.title}
                    </h3>

                    {/* Timeline inner split columns */}
                    <div className="grid md:grid-cols-12 gap-6 items-start">
                      <div className="md:col-span-8">
                        <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">{day.description}</p>
                      </div>

                      {/* Small visual image placeholder directly inside the day to mimic Go2Africa */}
                      <div className="md:col-span-4 rounded-2xl overflow-hidden h-28 border border-white/10 bg-gray-900">
                        <img 
                          src={pkg.images[(day.day - 1) % pkg.images.length]} 
                          alt={`Day ${day.day}`} 
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Lodging & Accommodations ref section */}
            <div ref={lodgingRef} className="space-y-6">
              <h2 className="text-2xl sm:text-4xl font-black text-white flex items-center gap-3 tracking-tight">
                <Bed className="w-7 h-7 text-amber-400" />
                Luxury Accommodations
              </h2>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/5 rounded-bl-full pointer-events-none" />
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <span className="text-[9px] font-black uppercase text-amber-400 tracking-widest block mb-1">Accommodation Spotlight</span>
                    <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-4">Gold-Standard Elite Retreats</h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light mb-6">
                      Settle into fully curated, high-end base camps and private villas tucked away in prime, pristine wildlife and coastal settings. Enjoy deep-soaking bathtubs, private heated pool decks, dedicated butler services, and gourmet local dining.
                    </p>

                    <div className="space-y-3">
                      {[
                        "24/7 Fully Dedicated Private Chef & Concierge",
                        "Climate-Controlled Glamping & Air-Conditioning",
                        "Private Veranda overlooking wetlands / ocean"
                      ].map((amenity, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
                          <Check className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 h-64">
                    <div className="rounded-2xl overflow-hidden border border-white/5 h-full">
                      <img src={pkg.images[1 % pkg.images.length]} alt="bedroom" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-2xl overflow-hidden border border-white/5 h-full">
                      <img src={pkg.images[2 % pkg.images.length]} alt="pool" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials and Reviews ref section */}
            <div ref={reviewsRef} className="space-y-6">
              <h2 className="text-2xl sm:text-4xl font-black text-white flex items-center gap-3 tracking-tight">
                <Star className="w-7 h-7 text-amber-400" />
                Verified Guest Journals
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {pkg.reviewsList.map((rev, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-amber-400 text-black font-extrabold flex items-center justify-center text-xs">
                          {rev.avatar}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                          <span className="text-[9px] text-gray-500 font-semibold">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-300 italic font-light leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-4xl font-black text-white flex items-center gap-3 tracking-tight">
                <HelpCircle className="w-7 h-7 text-amber-400" />
                Logistic Prep Guide
              </h2>

              <div className="space-y-4">
                {pkg.faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
                    <h4 className="text-xs sm:text-sm font-bold text-amber-400 mb-2 flex items-center gap-2">
                      <Info className="w-4 h-4 shrink-0" />
                      {faq.question}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky booking concierge card (4 Columns) */}
          <div className="lg:col-span-4">
            <div 
              ref={bookingRef}
              className={`bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 transition-all duration-300 ${
                isSticky ? "lg:sticky lg:top-40 shadow-2xl shadow-black/80" : "relative"
              }`}
            >
              {!isSubmitted ? (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div className="pb-3 border-b border-white/10">
                    <span className="block text-[8px] font-black text-amber-400 uppercase tracking-widest mb-0.5">VIP Reservation desk</span>
                    <h3 className="text-lg font-black text-white uppercase">Instant Custom Inquiry</h3>
                  </div>

                  {/* Counters */}
                  <div className="space-y-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-bold text-amber-400 uppercase">Adult guests</p>
                        <p className="text-[8px] text-gray-400">Ages 12+ years</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                          className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-white w-4 text-center">{adultsCount}</span>
                        <button
                          type="button"
                          onClick={() => setAdultsCount(Math.min(10, adultsCount + 1))}
                          className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-bold text-amber-400 uppercase">Children</p>
                        <p className="text-[8px] text-gray-400">Ages 2-11 (50% Off)</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                          className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-white w-4 text-center">{childrenCount}</span>
                        <button
                          type="button"
                          onClick={() => setChildrenCount(Math.min(10, childrenCount + 1))}
                          className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/20 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Travel Date */}
                  <div>
                    <label className="block text-[9px] font-bold text-amber-400 uppercase mb-1.5">Expedition Date</label>
                    <input
                      type="date"
                      required
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white/5 text-white font-semibold cursor-pointer"
                    />
                  </div>

                  {/* VIP Airport Pickup Toggle */}
                  <label className="flex items-center gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={needsPickup}
                      onChange={(e) => setNeedsPickup(e.target.checked)}
                      className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <p className="text-[10px] font-bold text-white uppercase">Add VIP Pickup</p>
                      <p className="text-[8px] text-gray-400">KES 2,000 flat</p>
                    </div>
                  </label>

                  {/* Premium Accompaniment Upgrades checklist */}
                  <div className="space-y-2">
                    <span className="block text-[9px] font-black text-amber-400 uppercase tracking-widest mb-1">Add Premium Upgrades</span>
                    {pkg.upgrades.map((up) => (
                      <label
                        key={up.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                          selectedUpgrades.includes(up.id)
                            ? "bg-[#003B73]/20 border-sky-400/40"
                            : "bg-white/5 border-white/10"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedUpgrades.includes(up.id)}
                          onChange={() => toggleUpgrade(up.id)}
                          className="rounded border-gray-600 text-amber-500 focus:ring-amber-500 w-3.5 h-3.5 cursor-pointer mt-0.5"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <span className="text-[10px] font-bold text-white leading-tight">{up.name}</span>
                          </div>
                          <span className="text-[9px] font-black text-amber-400">+ KES {up.price.toLocaleString()}</span>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Contact Fields */}
                  <div className="space-y-3 pt-2">
                    <input
                      type="text"
                      required
                      placeholder="Sir/Madam Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white/5 text-white font-semibold placeholder:text-gray-600"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp / Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white/5 text-white font-semibold placeholder:text-gray-600"
                    />
                    <input
                      type="email"
                      placeholder="Private Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2.5 border border-white/10 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 bg-white/5 text-white font-semibold placeholder:text-gray-600"
                    />
                  </div>

                  {/* Dynamic cost calculations receipt sheet */}
                  <div className="bg-[#003B73]/20 border border-sky-400/20 rounded-2xl p-4 space-y-2">
                    <p className="text-[9px] font-black text-amber-300 uppercase tracking-widest border-b border-white/5 pb-1.5">Quote Calculation Sheet</p>
                    
                    <div className="space-y-1.5 text-[10px] text-gray-300">
                      <div className="flex justify-between">
                        <span>{adultsCount} Adults Base</span>
                        <span>KES {calculatedCost.adults.toLocaleString()}</span>
                      </div>
                      {childrenCount > 0 && (
                        <div className="flex justify-between">
                          <span>{childrenCount} Children (50% Off)</span>
                          <span>KES {calculatedCost.children.toLocaleString()}</span>
                        </div>
                      )}
                      {needsPickup && (
                        <div className="flex justify-between">
                          <span>VIP Executive Chauffeur</span>
                          <span>KES {calculatedCost.pickup.toLocaleString()}</span>
                        </div>
                      )}
                      {calculatedCost.upgrades > 0 && (
                        <div className="flex justify-between">
                          <span>Selected Premium upgrades</span>
                          <span>KES {calculatedCost.upgrades.toLocaleString()}</span>
                        </div>
                      )}
                      <div className="w-full h-px bg-white/5 my-1.5" />
                      <div className="flex justify-between text-xs font-black text-white">
                        <span>Estimated Net Total</span>
                        <span className="text-amber-400 text-sm">KES {calculatedCost.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-amber-400 hover:bg-amber-300 disabled:bg-gray-700 text-black font-extrabold rounded-2xl text-xs sm:text-sm shadow-lg shadow-amber-400/10 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        Transmitting Reservation...
                      </>
                    ) : (
                      <>
                        Request Booking Quote
                        <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center justify-center text-center py-6"
                >
                  <div className="w-16 h-16 bg-amber-400/10 border border-amber-500/30 rounded-full flex items-center justify-center text-3xl mb-4 shadow-xl animate-bounce">
                    👑
                  </div>
                  <h3 className="text-lg font-black text-white mb-2 uppercase tracking-wide">Coordinates Safely Logged!</h3>
                  <p className="text-xs text-gray-400 max-w-sm mb-6 leading-relaxed">
                    Sincere thanks, <span className="font-bold text-white">{fullName}</span>! Your customized booking catalog for <span className="font-bold text-amber-300">{pkg.name}</span> is securely registered on our master system.
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-w-md w-full text-left mb-6 space-y-2">
                    <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest mb-0.5">Onboarding Guidelines</p>
                    <div className="flex items-start gap-2.5 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <p className="text-[11px] leading-tight">Our VIP Travel Concierge is preparing your custom KES {calculatedCost.total.toLocaleString()} invoice summary sheet.</p>
                    </div>
                    <div className="flex items-start gap-2.5 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      <p className="text-[11px] leading-tight">We will connect directly via WhatsApp/Call at <span className="font-bold text-white">{phone}</span> within 10-15 minutes.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-xl text-xs border border-white/10 cursor-pointer"
                  >
                    Reset Portal
                  </button>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Full Screen Image Gallery Modal Backdrop */}
      <AnimatePresence>
        {isGalleryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsGalleryOpen(false)}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute top-5 right-5 flex items-center gap-3 z-55">
              <span className="text-xs text-gray-400 font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full uppercase tracking-widest">
                Photo {activeGalleryIndex + 1} of {pkg.images.length}
              </span>
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Lightbox Image */}
            <div 
              className="relative max-w-5xl w-full max-h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeGalleryIndex}
                  src={pkg.images[activeGalleryIndex]} 
                  alt={`${pkg.name} lightbox`} 
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.8 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full max-h-[80vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
                />
              </AnimatePresence>

              {/* Navigation arrows inside Lightbox */}
              <button
                onClick={() => setActiveGalleryIndex(prev => (prev - 1 + pkg.images.length) % pkg.images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-white hover:text-amber-400 hover:scale-110 transition-all z-20 cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => setActiveGalleryIndex(prev => (prev + 1) % pkg.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-white/10 hover:border-amber-400/40 flex items-center justify-center text-white hover:text-amber-400 hover:scale-110 transition-all z-20 cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Sticky Mobile Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-gray-950/90 backdrop-blur-xl border-t border-white/10 z-45 flex items-center justify-between shadow-2xl safe-bottom">
        <div>
          <span className="block text-[8px] uppercase tracking-wider text-gray-400 font-extrabold">All-Inclusive Starting</span>
          <span className="text-base font-black text-amber-400">KES {pkg.price.toLocaleString()}</span>
        </div>
        <button
          onClick={() => scrollToSection(bookingRef)}
          className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer"
        >
          Enquire Now
        </button>
      </div>

    </div>
  );
}
