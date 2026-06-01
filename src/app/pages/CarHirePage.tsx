import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Car, ShieldCheck, Check, Handshake, ArrowRight } from "lucide-react";
import { CarHireBookingForm } from "../components/CarHireBookingForm";
import { HireFleetModelGrid, HireFleetShowcase } from "../components/HireFleetShowcase";
import { FleetProgressiveImage } from "../components/FleetProgressiveImage";
import { HIRE_VEHICLES, formatWeeklyRate, getHireVehicle } from "../data/hireFleet";
import { preloadAllFleetThumbs } from "../hooks/useFleetPreload";

export function CarHirePage() {
  const [searchParams] = useSearchParams();
  const modelFromUrl = searchParams.get("vehicle");
  const initial =
    modelFromUrl && getHireVehicle(modelFromUrl) ? modelFromUrl : HIRE_VEHICLES[0].model;

  const [activeModel, setActiveModel] = useState(initial);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const bookRef = useRef<HTMLElement>(null);
  const fleetRef = useRef<HTMLElement>(null);

  const vehicle = getHireVehicle(activeModel) ?? HIRE_VEHICLES[0];
  const heroImage = vehicle.gallery[galleryIndex] ?? vehicle.gallery[0];

  useEffect(() => {
    preloadAllFleetThumbs();
  }, []);

  useEffect(() => {
    setGalleryIndex(0);
  }, [activeModel]);

  useEffect(() => {
    if (modelFromUrl && getHireVehicle(modelFromUrl)) {
      setActiveModel(modelFromUrl);
    }
  }, [modelFromUrl]);

  const scrollToBook = () => {
    bookRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const selectModelAndShowcase = (model: string) => {
    setActiveModel(model);
    setGalleryIndex(0);
    fleetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleBookVehicle = (model: string) => {
    setActiveModel(model);
    scrollToBook();
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* Hero — live fleet photo */}
      <section className="relative pt-28 pb-10 sm:pt-32 sm:pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-[#003B73] to-[#001a33]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F9A03F]/15 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6">
                <Car className="w-4 h-4 text-[#F9A03F]" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-100">
                  {HIRE_VEHICLES.length} Toyota models · 5 photos each
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                Car hire with
                <span className="block text-[#F9A03F] mt-1">real fleet photos.</span>
              </h1>
              <p className="text-lg text-sky-100/90 font-light max-w-xl leading-relaxed mb-6">
                The same Toyota gallery as our partnership page — Alphard, Esquire, Voxy, Noah, Hiace, Prado &
                Coaster. Book <strong className="text-white font-semibold">with driver</strong> or{" "}
                <strong className="text-white font-semibold">self-drive</strong> — instant price estimate & M-Pesa Till.
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-white text-sm font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#F9A03F]" /> Professional driver included
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full text-white text-sm font-medium">
                  <Check className="w-4 h-4 text-emerald-300" /> With driver or self-drive
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleBookVehicle(activeModel)}
                className="touch-target inline-flex items-center gap-2 bg-[#F9A03F] hover:bg-amber-400 text-gray-900 font-bold px-8 py-4 rounded-full shadow-lg"
              >
                Book {vehicle.shortName} now
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08 }}
              className="rounded-2xl overflow-hidden aspect-[16/10] border border-white/20 shadow-2xl relative"
            >
              <FleetProgressiveImage
                image={heroImage}
                alt={`${vehicle.model} for hire`}
                priority
                className="h-full w-full"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/75 via-transparent to-transparent pointer-events-none z-[1]" />
              <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <p className="text-white font-black text-xl">{vehicle.model}</p>
                  <p className="text-[#F9A03F] text-xs font-bold uppercase">{vehicle.type}</p>
                </div>
                <span className="bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full">
                  {vehicle.gallery.length} photos
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership-grade fleet showcase */}
      <div ref={fleetRef}>
        <HireFleetShowcase
          activeModel={activeModel}
          onActiveModelChange={setActiveModel}
          galleryIndex={galleryIndex}
          onGalleryIndexChange={setGalleryIndex}
          onBookVehicle={handleBookVehicle}
        />
      </div>

      {/* All models grid — every car, all 5 images */}
      <HireFleetModelGrid activeModel={activeModel} onSelectModel={selectModelAndShowcase} />

      {/* Booking */}
      <section id="book" ref={bookRef} className="py-14 sm:py-20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              Book <span className="text-emerald-600">{vehicle.shortName}</span>
            </h2>
            <p className="text-gray-600 font-light max-w-lg mx-auto">
              Hire-specific booking — pick purpose, dates, and passengers. Your selected vehicle is{" "}
              <strong className="font-semibold text-gray-800">{vehicle.model}</strong>.
            </p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
            <div className="hidden lg:block relative rounded-2xl overflow-hidden aspect-[4/3] border border-gray-200 shadow-md sticky top-24">
              <FleetProgressiveImage
                image={vehicle.gallery[0]}
                alt={vehicle.model}
                className="h-full w-full"
                sizes="280px"
              />
              <div className="absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-bold text-sm">{vehicle.model}</p>
                <p className="text-emerald-300 text-xs">
                  {formatWeeklyRate(vehicle) ?? `KES ${vehicle.hireDailyRate.toLocaleString()}/day`}
                </p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <CarHireBookingForm key={vehicle.model} vehicle={vehicle} />
            </div>
          </div>

          {/* Quick switcher */}
          <p className="text-center text-xs text-gray-500 mt-8 mb-3 uppercase tracking-widest font-bold">
            Switch vehicle
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {HIRE_VEHICLES.map((v) => (
              <button
                key={v.model}
                type="button"
                onClick={() => {
                  setActiveModel(v.model);
                  setGalleryIndex(0);
                }}
                className={`touch-target px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeModel === v.model
                    ? "bg-emerald-600 text-white"
                    : "bg-white border border-gray-200 text-gray-700 hover:border-emerald-400"
                }`}
              >
                {v.shortName}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Handshake className="w-10 h-10 text-[#F9A03F] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Own a Toyota?</h2>
          <p className="text-gray-600 mb-6 font-light">
            These are the same models and photos on our partnership page. List your vehicle and earn when guests
            hire it.
          </p>
          <Link
            to="/partnership"
            className="touch-target inline-flex items-center gap-2 px-8 py-3 bg-[#003B73] hover:bg-[#002a52] text-white font-bold rounded-full"
          >
            View partnership fleet
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
