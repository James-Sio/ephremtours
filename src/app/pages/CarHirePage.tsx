import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  Car,
  Users,
  Luggage,
  ShieldCheck,
  ArrowRight,
  Check,
  Handshake,
} from "lucide-react";
import { FleetProgressiveImage } from "../components/FleetProgressiveImage";
import { FleetThumbImage } from "../components/FleetThumbImage";
import { CarHireBookingForm } from "../components/CarHireBookingForm";
import { HIRE_VEHICLES, getHireVehicle } from "../data/hireFleet";
import { preloadFleetModel, preloadUrl, useFleetPreload } from "../hooks/useFleetPreload";

export function CarHirePage() {
  const [searchParams] = useSearchParams();
  const modelFromUrl = searchParams.get("vehicle");
  const initial =
    modelFromUrl && getHireVehicle(modelFromUrl) ? modelFromUrl : HIRE_VEHICLES[0].model;

  const [activeModel, setActiveModel] = useState(initial);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const vehicle = getHireVehicle(activeModel) ?? HIRE_VEHICLES[0];
  useFleetPreload(activeModel, vehicle.gallery);

  useEffect(() => {
    setGalleryIndex(0);
  }, [activeModel]);

  useEffect(() => {
    if (modelFromUrl && getHireVehicle(modelFromUrl)) {
      setActiveModel(modelFromUrl);
    }
  }, [modelFromUrl]);

  const heroImage = vehicle.gallery[galleryIndex] ?? vehicle.gallery[0];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Hero */}
      <section className="relative pt-28 pb-12 sm:pt-32 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-[#003B73] to-[#001a33]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F9A03F]/15 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6">
                <Car className="w-4 h-4 text-[#F9A03F]" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-100">
                  Car hire with chauffeur
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                Choose your Toyota.
                <span className="block text-[#F9A03F] mt-1">We handle the rest.</span>
              </h1>
              <p className="text-lg text-sky-100/90 font-light max-w-xl leading-relaxed mb-6">
                Real fleet photos, clear daily rates, and a booking form built for car hire — not SGR transfers.
                Every vehicle comes with a professional Ephream driver.
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-white font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#F9A03F]" /> Insured chauffeurs
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-white font-medium">
                  <Check className="w-4 h-4 text-emerald-300" /> No self-drive
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden aspect-[16/10] border border-white/20 shadow-2xl relative"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeModel}-${galleryIndex}`}
                  initial={{ opacity: 0.9 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0.9 }}
                  className="absolute inset-0"
                >
                  <FleetProgressiveImage
                    image={heroImage}
                    alt={`${vehicle.model} for hire`}
                    priority
                    className="h-full w-full"
                    sizes="(max-width: 1024px) 100vw, 560px"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent pointer-events-none z-[1]" />
              <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="text-white font-black text-xl">{vehicle.model}</p>
                  <p className="text-[#F9A03F] text-xs font-bold uppercase">{vehicle.type}</p>
                </div>
                <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
                  From KES {vehicle.hireDailyRate.toLocaleString()}/day
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vehicle picker + booking */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm font-medium mb-6 uppercase tracking-widest">
            Select a vehicle
          </p>

          <div className="-mx-4 px-4 sm:mx-0 overflow-x-auto scrollbar-none mb-10">
            <div className="flex gap-3 min-w-max sm:min-w-0 sm:flex-wrap sm:justify-center pb-1">
              {HIRE_VEHICLES.map((v) => (
                <button
                  key={v.model}
                  type="button"
                  onClick={() => setActiveModel(v.model)}
                  onMouseEnter={() => preloadFleetModel(v.model)}
                  className={`touch-target shrink-0 flex flex-col items-center gap-2 p-2 rounded-2xl border-2 transition-all active:scale-[0.98] w-[5.5rem] sm:w-24 ${
                    activeModel === v.model
                      ? "border-emerald-500 bg-emerald-50 shadow-md"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <FleetThumbImage image={v.gallery[0]} alt={v.shortName} />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-gray-900 text-center leading-tight">
                    {v.shortName}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-10 lg:gap-12 items-start">
            {/* Left: gallery + specs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={vehicle.model}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-6"
              >
                <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-gray-200 border border-gray-200 shadow-lg relative">
                  <FleetProgressiveImage
                    image={heroImage}
                    alt={`${vehicle.model} — photo ${galleryIndex + 1}`}
                    priority
                    className="h-full w-full"
                    sizes="(max-width: 1024px) 100vw, 720px"
                  />
                  <div className="absolute bottom-4 left-4 z-10 flex gap-2">
                    <span className="bg-[#003B73] text-white text-xs font-bold px-3 py-1 rounded-full">
                      {galleryIndex + 1} / {vehicle.gallery.length}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-1 sm:grid sm:grid-cols-5 sm:gap-3">
                  {vehicle.gallery.map((img, index) => (
                    <button
                      key={img.hero}
                      type="button"
                      onClick={() => setGalleryIndex(index)}
                      onMouseEnter={() => preloadUrl(img.hero)}
                      aria-pressed={galleryIndex === index}
                      className={`touch-target snap-start shrink-0 w-[4.5rem] sm:w-auto rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all ${
                        galleryIndex === index
                          ? "border-emerald-500 ring-2 ring-emerald-500/30"
                          : "border-gray-200 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <FleetThumbImage image={img} alt={`${vehicle.shortName} ${index + 1}`} />
                    </button>
                  ))}
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                  <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-1">{vehicle.model}</h2>
                  <p className="text-emerald-600 text-sm font-bold uppercase tracking-wide mb-6">{vehicle.type}</p>

                  <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-gray-100">
                      <Users className="w-5 h-5 text-[#003B73] mb-2" />
                      <p className="text-xs text-gray-500 font-bold uppercase">Capacity</p>
                      <p className="font-bold text-gray-900">{vehicle.seats}</p>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 border border-gray-100">
                      <Luggage className="w-5 h-5 text-[#F9A03F] mb-2" />
                      <p className="text-xs text-gray-500 font-bold uppercase">Luggage</p>
                      <p className="font-bold text-gray-900">{vehicle.luggage}</p>
                    </div>
                    <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                      <Car className="w-5 h-5 text-emerald-600 mb-2" />
                      <p className="text-xs text-emerald-700 font-bold uppercase">Full day from</p>
                      <p className="font-black text-emerald-800">
                        KES {vehicle.hireDailyRate.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 mb-3">Ideal for</h3>
                  <ul className="space-y-2 mb-8">
                    {vehicle.bestFor.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="grid sm:grid-cols-3 gap-3 text-center text-sm">
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Transfer from</p>
                      <p className="font-black text-[#003B73]">KES {vehicle.transferFrom.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Half day from</p>
                      <p className="font-black text-[#003B73]">KES {vehicle.halfDayFrom.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <p className="text-[10px] text-gray-500 font-bold uppercase">Full day</p>
                      <p className="font-black text-[#003B73]">KES {vehicle.hireDailyRate.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-gray-400 text-center sm:text-left">
                  Reference photos of each Toyota model · Wikimedia Commons (CC)
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Right: hire booking */}
            <div className="lg:sticky lg:top-24 z-20">
              <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
                <CarHireBookingForm vehicle={vehicle} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Owner CTA */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Handshake className="w-10 h-10 text-[#F9A03F] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Own a Toyota?</h2>
          <p className="text-gray-600 mb-6 font-light">
            The same fleet powers our hire business. Partner with Ephream and earn when guests book your vehicle.
          </p>
          <Link
            to="/partnership"
            className="touch-target inline-flex items-center gap-2 px-8 py-3 bg-[#003B73] hover:bg-[#002a52] text-white font-bold rounded-full"
          >
            Vehicle partnership
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
