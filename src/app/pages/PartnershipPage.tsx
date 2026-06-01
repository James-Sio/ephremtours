import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { 
  Shield, Key, Award, Users, MapPin, 
  Phone, Mail, User, Send, CheckCircle2, 
  HelpCircle, Car, ArrowRight, DollarSign, 
  Calendar, Check, ChevronDown, Sparkles,
  Handshake, Luggage
} from "lucide-react";
import { toast } from "sonner";
import { fleetGalleryFor, type FleetImageSet } from "../data/fleetImages";
import { FleetProgressiveImage } from "../components/FleetProgressiveImage";
import { FleetThumbImage } from "../components/FleetThumbImage";
import { preloadFleetModel, preloadUrl, useFleetPreload } from "../hooks/useFleetPreload";

type ToyotaVehicle = {
  model: string;
  type: string;
  gallery: FleetImageSet[];
  baseDailyRate: number;
  seats: string;
  suitability: string;
  highlight: string;
};

const vehicleSpecs = [
  {
    model: "Toyota Alphard",
    type: "Elite First-Class MPV",
    baseDailyRate: 8500,
    seats: "7 VIP Seats",
    suitability: "VIP Airport Meet & Greets & Executive Corporate Transfers",
    highlight: "Highest earning potential with premium coastal bookings",
  },
  {
    model: "Toyota Esquire",
    type: "Executive Luxury MPV",
    baseDailyRate: 6500,
    seats: "7 Premium Seats",
    suitability: "Direct Resort Shuttles & Luxury Tourist Excursions",
    highlight: "Extremely popular for Watamu and Diani boutique transfers",
  },
  {
    model: "Toyota Voxy",
    type: "Luxury Family MPV",
    baseDailyRate: 5500,
    seats: "7-8 Versatile Seats",
    suitability: "Coastal Day Trips & Family Hotel-to-Hotel Transfers",
    highlight: "Consistent daily bookings due to high coastal tourist demand",
  },
  {
    model: "Toyota Noah",
    type: "Premium Comfort MPV",
    baseDailyRate: 5000,
    seats: "7-8 Comfort Seats",
    suitability: "SGR Terminus Shuttles & Local Mombasa Old Town Excursions",
    highlight: "Excellent fuel-to-yield ratio for long-term lease returns",
  },
  {
    model: "Toyota Hiace",
    type: "High-Capacity Safari Shuttle",
    baseDailyRate: 7500,
    seats: "14 Group Seats",
    suitability: "Tsavo East Safaris & High-Capacity Corporate Events",
    highlight: "High demand during safari peak seasons (Watamu/Diani departures)",
  },
  {
    model: "Toyota Prado",
    type: "Premium 4x4 Safari SUV",
    baseDailyRate: 9000,
    seats: "7 Seats (4x4)",
    suitability: "Safari Game Drives & Rough Coastal Terrains (Tsavo/Amboseli packages)",
    highlight: "Highly requested for premium safari excursions departing Watamu/Diani",
  },
  {
    model: "Toyota Coaster",
    type: "High-Capacity Group Bus",
    baseDailyRate: 12000,
    seats: "23-30 Group Seats",
    suitability: "School Trips, Church Events, Wedding Fleets & Large Corporate Groups",
    highlight: "Best yield for high-capacity group transport requirements",
  },
] as const;

const targetVehicles: ToyotaVehicle[] = vehicleSpecs.map((spec) => ({
  ...spec,
  gallery: fleetGalleryFor(spec.model),
}));

export function PartnershipPage() {
  const [selectedModel, setSelectedModel] = useState<string>("Toyota Alphard");
  const [leaseDays, setLeaseDays] = useState<number>(20);
  const [ownerName, setOwnerName] = useState<string>("");
  const [ownerPhone, setOwnerPhone] = useState<string>("");
  const [carYear, setCarYear] = useState<string>("");
  const [carTown, setCarTown] = useState<string>("");
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success">("idle");
  const [activeTab, setActiveTab] = useState<string>("Toyota Alphard");
  const [galleryIndex, setGalleryIndex] = useState(0);

  const currentVehicle = targetVehicles.find(v => v.model === selectedModel) || targetVehicles[0];
  const activeVehicle = targetVehicles.find((v) => v.model === activeTab) ?? targetVehicles[0];

  useFleetPreload(activeTab, activeVehicle.gallery);

  useEffect(() => {
    setGalleryIndex(0);
  }, [activeTab]);
  const monthlyEarnings = currentVehicle.baseDailyRate * leaseDays;
  const weeklyEarnings = Math.round(monthlyEarnings / 4);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(carYear) < 2016) {
      toast.error("Ephream Tours only partners with Toyota vehicles from model year 2016 or newer to guarantee maximum guest reliability.", {
        description: "Please register a vehicle manufactured in 2016 or later.",
        duration: 8000
      });
      return;
    }
    setSubmitState("submitting");
    setTimeout(() => {
      setSubmitState("success");
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen min-h-[100dvh] pt-20 sm:pt-24 font-sans relative overflow-x-clip">
      
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero Left Typography */}
          <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-[#003B73]/10 border border-[#003B73]/20 px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#F9A03F]" />
              <span className="text-xs sm:text-sm font-bold text-[#003B73] uppercase tracking-wider">Partner With Ephream Tours</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6"
            >
              Give Your Car,<br />
              <span className="bg-gradient-to-r from-[#003B73] to-[#F9A03F] bg-clip-text text-transparent">We Pay You!</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-lg text-gray-600 font-light leading-relaxed mb-10 max-w-xl"
            >
              One professional Toyota fleet powers everything we do: owners can register their vehicles and earn, while travellers and companies hire the same vetted fleet for transfers, safaris, and events along the coast.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a href="#calculator" className="px-8 py-4 bg-[#003B73] hover:bg-[#002B54] text-white font-bold rounded-full transition-all shadow-lg hover:shadow-2xl">
                Estimate Your Earnings
              </a>
              <a href="#how-it-works" className="px-8 py-4 bg-white border border-gray-200 hover:border-[#003B73] text-gray-700 hover:text-[#003B73] font-bold rounded-full transition-all shadow-sm">
                How it works
              </a>
              <a href="#apply" className="px-8 py-4 bg-white border border-[#F9A03F] hover:bg-[#F9A03F] hover:text-white text-[#F9A03F] font-bold rounded-full transition-all shadow-sm">
                Apply to Lease
              </a>
            </motion.div>
          </div>

          {/* Hero Right Card with floating logo details */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="bg-gradient-to-tr from-[#003B73] to-[#002244] p-8 rounded-3xl shadow-2xl w-full max-w-md text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award className="text-[#F9A03F]" />
                Coastal Partnership Perks
              </h3>
              
              <ul className="space-y-6">
                {[
                  { title: "Weekly / Monthly Payouts", desc: "No delays. Recieve guaranteed, stable financial returns directly into your bank or M-Pesa." },
                  { title: "Pristine Fleet Management", desc: "Our executive logistics division coordinates professional washing, driving, and upkeep." },
                  { title: "Premium Coastal Coverage", desc: "Serving luxury itineraries in Diani, Mombasa, Kilifi, Watamu, and Malindi." }
                ].map((perk, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-[#F9A03F]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{perk.title}</h4>
                      <p className="text-xs text-slate-300 mt-1 leading-normal">{perk.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 font-bold uppercase tracking-wider">
                <span>Ephream Tours Leasing</span>
                <span className="text-[#F9A03F]">Win-Win Scheme 🌟</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* --- TWO AUDIENCES: OWNERS + HIRERS --- */}
      <section id="how-it-works" className="relative z-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#F9A03F]">Complete picture</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mt-3 mb-4 tracking-tight">
              Two Ways to Use Our Fleet
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto font-light leading-relaxed">
              Ephream Tours is not only for car owners. The same professionally managed vehicles that owners place with us are what guests book for coastal travel — everyone wins.
            </p>
          </motion.div>

          {/* 3-step ecosystem */}
          <div className="grid md:grid-cols-3 gap-6 mb-14 md:mb-16">
            {[
              {
                step: "1",
                title: "You give us your Toyota",
                desc: "Owners register a 2016+ Alphard, Voxy, Noah, Esquire, Hiace, Prado, or Coaster. We inspect it and sign a transparent lease agreement.",
              },
              {
                step: "2",
                title: "We run it professionally",
                desc: "Ephream handles driving, cleaning, scheduling, and coastal logistics. Your car joins our active tour and transfer fleet — you do not drive for guests yourself.",
              },
              {
                step: "3",
                title: "Guests hire our fleet",
                desc: "Tourists, hotels, and companies book those same vehicles for SGR transfers, airport VIP, safaris, weddings, and group travel. Demand keeps owners earning.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
              >
                <span className="inline-flex w-10 h-10 rounded-full bg-[#003B73] text-white font-black text-sm items-center justify-center mb-4">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">{item.desc}</p>
                {i < 2 && (
                  <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 text-[#F9A03F] z-10" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Owner vs Hirer cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#003B73] to-[#002244] text-white rounded-3xl p-8 shadow-xl border border-sky-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                  <Handshake className="w-6 h-6 text-[#F9A03F]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-sky-200">For car owners</p>
                  <h3 className="text-2xl font-black">Give your car — we pay you</h3>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-sky-100/90 mb-8">
                {[
                  "Register your premium Toyota (2016 or newer)",
                  "Weekly or monthly lease payouts to M-Pesa or bank",
                  "We manage drivers, maintenance, and bookings",
                  "Earn from coastal tourist demand without daily hassle",
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <Check className="w-4 h-4 text-[#F9A03F] shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="#apply"
                  className="touch-target flex-1 text-center px-6 py-3.5 bg-[#F9A03F] hover:bg-amber-400 text-gray-900 font-bold rounded-xl transition-all"
                >
                  Apply to lease your car
                </a>
                <a
                  href="#calculator"
                  className="touch-target flex-1 text-center px-6 py-3.5 border border-white/20 hover:bg-white/10 font-bold rounded-xl transition-all"
                >
                  Estimate earnings
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white border-2 border-[#F9A03F]/30 rounded-3xl p-8 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                  <Luggage className="w-6 h-6 text-[#F9A03F]" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-600">For travellers & companies</p>
                  <h3 className="text-2xl font-black text-gray-900">Hire our fleet</h3>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                {[
                  "Book owner-managed & company-owned vehicles in one place",
                  "Airport & SGR transfers, hotel shuttles, safaris, weddings",
                  "Toyota MPVs, 4x4 Prado, and Coaster buses with pro drivers",
                  "Transparent rates — pay per trip, day, or custom package",
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  to="/services"
                  className="touch-target flex-1 text-center px-6 py-3.5 bg-[#003B73] hover:bg-[#002B54] text-white font-bold rounded-xl transition-all"
                >
                  View hire services
                </Link>
                <Link
                  to="/contact"
                  className="touch-target flex-1 text-center px-6 py-3.5 border-2 border-[#003B73] text-[#003B73] hover:bg-sky-50 font-bold rounded-xl transition-all"
                >
                  Book / enquire now
                </Link>
              </div>
            </motion.div>
          </div>

          {/* FAQ — both audiences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-14 md:mt-16 bg-sky-50 border border-sky-100 rounded-3xl p-6 sm:p-10"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#003B73]" />
              Common questions
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  q: "I want to give Ephream my car. Is this the right page?",
                  a: "Yes. Use the earnings calculator and lease application below. We only accept premium Toyota models from 2016 onwards.",
                },
                {
                  q: "I only want to hire a car — do I apply here?",
                  a: "No application needed. Go to Services to see transfers and safaris, or Contact to book a specific vehicle and date.",
                },
                {
                  q: "Who drives the car when I lease it to you?",
                  a: "Our licensed professional drivers operate your vehicle for Ephream Tours guests. You receive lease income; we handle operations.",
                },
                {
                  q: "Can I hire the same cars shown on this page?",
                  a: "Yes. The fleet gallery shows the Toyota models we recruit and operate. Availability depends on dates and route — contact us to confirm.",
                },
              ].map((faq) => (
                <div key={faq.q} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h4 className="font-bold text-gray-900 text-sm mb-2">{faq.q}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- TARGET TOYOTA FLEET SECTION --- */}
      <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black mb-6 tracking-tight">
              Wanted <span className="bg-gradient-to-r from-[#F9A03F] to-orange-400 bg-clip-text text-transparent">Toyota Vehicles</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              These are the Toyota models we recruit from owners and offer for hire to guests — same vehicles, professionally managed end to end.
            </p>
          </div>

          {/* Vehicle Navigation Buttons */}
          <div className="-mx-4 px-4 sm:mx-0 overflow-x-auto scrollbar-none mb-10 sm:mb-12">
            <div className="flex gap-2 sm:flex-wrap sm:justify-center sm:gap-3 min-w-max sm:min-w-0 pb-1">
            {targetVehicles.map((veh) => (
              <button
                key={veh.model}
                onClick={() => setActiveTab(veh.model)}
                onMouseEnter={() => preloadFleetModel(veh.model)}
                onFocus={() => preloadFleetModel(veh.model)}
                className={`touch-target shrink-0 px-4 sm:px-5 py-3 rounded-full font-bold text-xs sm:text-sm transition-all active:scale-[0.98] ${
                  activeTab === veh.model
                    ? "bg-[#F9A03F] text-gray-900 shadow-lg shadow-orange-500/20"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                {veh.model.replace("Toyota ", "")}
              </button>
            ))}
            </div>
          </div>

          {/* Display Details of Selected Vehicle */}
          <AnimatePresence mode="wait">
            {targetVehicles.map((veh) => {
              if (veh.model !== activeTab) return null;
              const heroImage = veh.gallery[galleryIndex] ?? veh.gallery[0];
              const shortName = veh.model.replace("Toyota ", "");
              return (
                <motion.div
                  key={veh.model}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 shadow-2xl"
                >
                  {/* Left: authentic model photo gallery */}
                  <div className="space-y-4">
                    <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-gray-800 border border-white/10 shadow-lg relative group">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={`${veh.model}-${galleryIndex}`}
                          initial={{ opacity: 0.85 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0.85 }}
                          transition={{ duration: 0.25 }}
                          className="absolute inset-0"
                        >
                          <FleetProgressiveImage
                            image={heroImage}
                            alt={`${veh.model} — photo ${galleryIndex + 1}`}
                            priority
                            className="h-full w-full"
                            sizes="(max-width: 1024px) 100vw, 640px"
                          />
                        </motion.div>
                      </AnimatePresence>
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 to-transparent pointer-events-none z-[1]" />
                      <div className="absolute bottom-6 left-6 z-10 flex flex-wrap gap-2">
                        <span className="bg-[#F9A03F] text-gray-900 text-xs font-bold uppercase px-3 py-1 rounded-full">{veh.type}</span>
                        <span className="bg-black/50 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                          {galleryIndex + 1} / {veh.gallery.length}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-1 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:pb-0">
                      {veh.gallery.map((img, index) => (
                        <button
                          key={img.hero}
                          type="button"
                          onClick={() => setGalleryIndex(index)}
                          onMouseEnter={() => {
                            preloadUrl(img.hero);
                          }}
                          aria-label={`View ${shortName} photo ${index + 1}`}
                          aria-pressed={galleryIndex === index}
                          className={`touch-target snap-start shrink-0 w-[4.75rem] sm:w-auto rounded-xl overflow-hidden aspect-[4/3] bg-gray-800 border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F9A03F] active:scale-[0.98] ${
                            galleryIndex === index
                              ? "border-[#F9A03F] ring-2 ring-[#F9A03F]/40 scale-[1.02]"
                              : "border-white/10 opacity-80 hover:opacity-100 hover:border-white/30"
                          }`}
                        >
                          <FleetThumbImage
                            image={img}
                            alt={`${shortName} view ${index + 1}`}
                          />
                        </button>
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-500 text-center sm:text-left">
                      Authentic {shortName} reference photos · Wikimedia Commons (CC)
                    </p>
                  </div>

                  {/* Right: Technical specifications */}
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-extrabold mb-2 tracking-tight">{veh.model}</h3>
                      <p className="text-[#F9A03F] text-sm font-bold uppercase tracking-wider">{veh.type}</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Earning Capacity</span>
                        <span className="text-xl font-bold text-emerald-400">KES {veh.baseDailyRate.toLocaleString()} / Day</span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Seats Layout</span>
                        <span className="text-xl font-bold">{veh.seats}</span>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Target Suitability</h4>
                        <p className="text-slate-200 text-sm sm:text-base leading-relaxed">{veh.suitability}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Partnership Edge</h4>
                        <p className="text-[#F9A03F] text-sm sm:text-base leading-relaxed font-bold">✨ {veh.highlight}</p>
                      </div>
                    </div>

                    <a
                      href="#apply"
                      onClick={() => setSelectedModel(veh.model)}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-[#F9A03F] hover:bg-amber-400 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all shadow-xl hover:-translate-y-0.5"
                    >
                      Lease this Model
                      <ArrowRight className="w-5 h-5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

        </div>
      </section>

      {/* --- INTERACTIVE CALCULATOR SECTION --- */}
      <section id="calculator" className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-3xl shadow-2xl p-8 sm:p-12 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-amber-100 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Calculator Left: Slider controls */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Earnings Estimator</h2>
                <p className="text-gray-600 font-light text-sm sm:text-base leading-relaxed">
                  Select your Toyota model and choose how many days per month you wish to lease your vehicle to Ephream Tours. Adjust the values to estimate your payouts.
                </p>
              </div>

              {/* Model Picker */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-700 ml-1 block">Select Toyota Model</label>
                <div className="relative">
                  <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-10 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-bold shadow-sm"
                  >
                    {targetVehicles.map(veh => (
                      <option key={veh.model} value={veh.model}>{veh.model} (KES {veh.baseDailyRate.toLocaleString()} / Day)</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Days Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-gray-700 flex items-center gap-1"><Calendar className="w-4 h-4 text-[#003B73]" /> Lease Days (Per Month)</label>
                  <span className="text-sm font-black text-[#003B73] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">{leaseDays} Days</span>
                </div>
                
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={leaseDays}
                  onChange={(e) => setLeaseDays(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#003B73] focus:outline-none"
                />
                
                <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider px-1">
                  <span>5 Days (Minimum)</span>
                  <span>15 Days</span>
                  <span>30 Days (Maximum)</span>
                </div>
              </div>
            </div>

            {/* Calculator Right: Output visual dashboard */}
            <div className="bg-gradient-to-br from-[#003B73] to-blue-900 rounded-3xl p-8 text-white relative shadow-xl space-y-8 flex flex-col justify-between h-full min-h-[300px]">
              
              <div>
                <span className="text-[10px] text-sky-200 font-bold uppercase tracking-widest block mb-2">Passive Income Yield</span>
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <DollarSign className="text-[#F9A03F]" />
                  Estimates for {selectedModel.replace("Toyota ", "")}
                </h3>
              </div>

              <div className="space-y-6 py-6 border-y border-white/10">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs text-sky-200 font-medium block">Weekly Payout Estimate</span>
                    <span className="text-[10px] text-gray-300">Paid out every week</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#F9A03F]">KES {weeklyEarnings.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs text-sky-200 font-medium block">Monthly Return Estimate</span>
                    <span className="text-[10px] text-gray-300">Total accumulated lease income</span>
                  </div>
                  <div className="text-right">
                    <span className="text-4xl font-black text-emerald-400">KES {monthlyEarnings.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-sky-200/70 italic leading-normal flex items-start gap-2">
                <span>ℹ️</span>
                <span>Calculations are estimations based on standard base rates. Real payouts may vary based on seasonal tourist demand spikes.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- APPLICATION FORM SECTION --- */}
      <section id="apply" className="py-20 bg-slate-50 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="grid lg:grid-cols-[1fr_450px] gap-12 lg:gap-20 items-start">
          
          {/* Left Column: Visual details / checklist */}
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Lease Registration</h2>
              <p className="text-gray-600 font-light text-lg leading-relaxed">
                Join our trusted vehicle network and start earning today. Fill out the application form with your vehicle details and our onboarding specialist will inspect your vehicle and provide your custom lease agreement.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Mombasa Terminal Escorts", desc: "High passenger demand syncing with daily SGR trains." },
                { title: "Coastal Resort Gateways", desc: "Providing premium lobby drop-offs in Watamu, Kilifi, and Diani." },
                { title: "National Safari Drives", desc: "Long-term group bookings driving high Hiace safari yields." },
                { title: "Weekly Audits", desc: "Full reports of odometer, mechanical health, and cleanings." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-gray-150 p-6 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-5 h-5 text-[#F9A03F]" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Support Box */}
            <div className="bg-sky-50 border border-sky-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shrink-0 border border-sky-200 shadow-sm text-2xl">
                📞
              </div>
              <div>
                <h4 className="font-bold text-[#003B73] mb-1">Direct Recruitment Hotlines</h4>
                <p className="text-sm text-gray-600 mb-2 leading-relaxed">Have a question about payouts, insurance coverage, or mechanical reviews?</p>
                <div className="flex flex-wrap gap-4 text-xs font-bold text-[#F9A03F]">
                  <span className="flex items-center gap-1 bg-white border border-sky-200 px-3 py-1.5 rounded-full"><Phone className="w-3 h-3"/> 0701 738 725</span>
                  <span className="flex items-center gap-1 bg-white border border-sky-200 px-3 py-1.5 rounded-full"><Phone className="w-3 h-3"/> 0736 070 030</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Card */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-100 to-transparent rounded-full blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {submitState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Application Logged!</h3>
                  <p className="text-slate-600 text-sm mb-8 leading-relaxed">
                    Thank you! A vehicle onboarding supervisor from Ephream Tours will reach out to you on WhatsApp within 2 hours to coordinate the mechanical inspection.
                  </p>
                  <button
                    onClick={() => setSubmitState("idle")}
                    className="text-[#003B73] font-bold hover:text-[#F9A03F] transition-colors"
                  >
                    Submit another vehicle
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="relative z-10 space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 mb-1 tracking-tight">Partner Application</h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-6">Let's grow together</p>
                  </div>

                  {/* Owner Info */}
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="text" 
                        required
                        placeholder="Owner's Full Name" 
                        value={ownerName} 
                        onChange={e => setOwnerName(e.target.value)} 
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium placeholder:text-gray-400 placeholder:font-normal" 
                      />
                    </div>

                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="tel" 
                        required
                        placeholder="WhatsApp / Mobile Number" 
                        value={ownerPhone} 
                        onChange={e => setOwnerPhone(e.target.value)} 
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium placeholder:text-gray-400 placeholder:font-normal" 
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input 
                        type="email" 
                        required
                        placeholder="Email Address" 
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium placeholder:text-gray-400 placeholder:font-normal" 
                      />
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="space-y-4 pt-4 border-t border-gray-150">
                    <div className="relative">
                      <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <select 
                        required 
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-10 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] transition-all font-medium"
                      >
                        {targetVehicles.map(veh => (
                          <option key={veh.model} value={veh.model}>{veh.model}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="number" 
                        required 
                        placeholder="Year (From 2016)" 
                        min="2016"
                        max="2027"
                        value={carYear} 
                        onChange={e => setCarYear(e.target.value)} 
                        className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 px-4 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#003B73]/20 focus:border-[#003B73] placeholder:text-gray-400 placeholder:font-normal" 
                      />
                      <div className="relative">
                        <select 
                          required 
                          value={carTown} 
                          onChange={e => setCarTown(e.target.value)} 
                          className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-4 pr-10 text-sm text-gray-900 appearance-none focus:outline-none"
                        >
                          <option value="" disabled>Select Operating Town</option>
                          <option value="Mombasa">Mombasa</option>
                          <option value="Diani">Diani</option>
                          <option value="Watamu">Watamu</option>
                          <option value="Kilifi">Kilifi</option>
                          <option value="Malindi">Malindi</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Submission */}
                  <button 
                    type="submit" 
                    disabled={submitState === "submitting"}
                    className="w-full mt-4 py-4 rounded-xl text-white font-bold bg-[#003B73] hover:bg-[#00254C] transition-all flex items-center justify-center gap-2 shadow-xl"
                  >
                    {submitState === "submitting" ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Register Vehicle
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>

          </div>
        </div>
      </section>

    </div>
  );
}
