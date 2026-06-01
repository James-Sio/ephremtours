import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Car,
  Check,
  Luggage,
  Sparkles,
  Users,
} from "lucide-react";
import { FleetProgressiveImage } from "./FleetProgressiveImage";
import { FleetThumbImage } from "./FleetThumbImage";
import {
  HIRE_VEHICLES,
  estimateHirePrice,
  formatDailyRate,
  formatWeeklyRate,
  getHireVehicle,
  type HireVehicleSpec,
} from "../data/hireFleet";
import { FLEET_IMAGE_COUNT } from "../data/fleetImages";
import { preloadFleetModel, preloadUrl, useFleetPreload } from "../hooks/useFleetPreload";

type HireFleetShowcaseProps = {
  activeModel: string;
  onActiveModelChange: (model: string) => void;
  galleryIndex: number;
  onGalleryIndexChange: (index: number) => void;
  onBookVehicle: (model: string) => void;
};

export function HireFleetShowcase({
  activeModel,
  onActiveModelChange,
  galleryIndex,
  onGalleryIndexChange,
  onBookVehicle,
}: HireFleetShowcaseProps) {
  const vehicle = getHireVehicle(activeModel) ?? HIRE_VEHICLES[0];
  useFleetPreload(activeModel, vehicle.gallery);

  const heroImage = vehicle.gallery[galleryIndex] ?? vehicle.gallery[0];

  return (
    <section id="fleet" className="py-16 sm:py-24 bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full mb-5">
            <Car className="w-4 h-4 text-[#F9A03F]" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-100">
              Same fleet as partnership · {HIRE_VEHICLES.length} Toyota models
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">
            Hire our{" "}
            <span className="bg-gradient-to-r from-[#F9A03F] to-orange-400 bg-clip-text text-transparent">
              Toyota fleet
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            The exact vehicles and photos from our partnership program — Alphard to Coaster.
            Each model has {FLEET_IMAGE_COUNT} reference photos. All hires include a professional driver — no self-drive.
          </p>
        </div>

        {/* Model pills — partnership style */}
        <div className="-mx-4 px-4 sm:mx-0 overflow-x-auto scrollbar-none mb-8 sm:mb-10">
          <div className="flex gap-2 sm:flex-wrap sm:justify-center sm:gap-3 min-w-max sm:min-w-0 pb-1">
            {HIRE_VEHICLES.map((v) => (
              <button
                key={v.model}
                type="button"
                onClick={() => {
                  onActiveModelChange(v.model);
                  onGalleryIndexChange(0);
                }}
                onMouseEnter={() => preloadFleetModel(v.model)}
                onFocus={() => preloadFleetModel(v.model)}
                className={`touch-target shrink-0 px-4 sm:px-5 py-3 rounded-full font-bold text-xs sm:text-sm transition-all active:scale-[0.98] ${
                  activeModel === v.model
                    ? "bg-[#F9A03F] text-gray-900 shadow-lg shadow-orange-500/25"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                {v.shortName}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={vehicle.model}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl"
          >
            {/* Gallery — partnership layout */}
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-gray-800 border border-white/10 shadow-lg relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${vehicle.model}-${galleryIndex}`}
                    initial={{ opacity: 0.88 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.88 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    <FleetProgressiveImage
                      image={heroImage}
                      alt={`${vehicle.model} — hire photo ${galleryIndex + 1}`}
                      priority
                      className="h-full w-full"
                      sizes="(max-width: 1024px) 100vw, 640px"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/65 to-transparent pointer-events-none z-[1]" />
                <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap gap-2 justify-between items-end">
                  <span className="bg-[#F9A03F] text-gray-900 text-xs font-bold uppercase px-3 py-1 rounded-full">
                    {vehicle.type}
                  </span>
                  <span className="bg-black/50 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    Photo {galleryIndex + 1} of {vehicle.gallery.length}
                  </span>
                </div>
              </div>

              <div className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-1 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible">
                {vehicle.gallery.map((img, index) => (
                  <button
                    key={img.hero}
                    type="button"
                    onClick={() => onGalleryIndexChange(index)}
                    onMouseEnter={() => preloadUrl(img.hero)}
                    aria-label={`View ${vehicle.shortName} photo ${index + 1}`}
                    aria-pressed={galleryIndex === index}
                    className={`touch-target snap-start shrink-0 w-[4.75rem] sm:w-auto rounded-xl overflow-hidden aspect-[4/3] bg-gray-800 border-2 transition-all focus-visible:ring-2 focus-visible:ring-[#F9A03F] active:scale-[0.98] ${
                      galleryIndex === index
                        ? "border-[#F9A03F] ring-2 ring-[#F9A03F]/40 scale-[1.02]"
                        : "border-white/10 opacity-80 hover:opacity-100 hover:border-white/30"
                    }`}
                  >
                    <FleetThumbImage image={img} alt={`${vehicle.shortName} view ${index + 1}`} />
                  </button>
                ))}
              </div>

              {/* All 5 photos visible at once — same set as partnership */}
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  All {vehicle.shortName} photos ({vehicle.gallery.length})
                </p>
                <div className="grid grid-cols-5 gap-2">
                  {vehicle.gallery.map((img, index) => (
                    <button
                      key={`mosaic-${img.hero}`}
                      type="button"
                      onClick={() => onGalleryIndexChange(index)}
                      className={`rounded-lg overflow-hidden aspect-[4/3] border-2 transition-all ${
                        galleryIndex === index
                          ? "border-[#F9A03F] ring-1 ring-[#F9A03F]/50"
                          : "border-white/10 opacity-90 hover:opacity-100"
                      }`}
                    >
                      <FleetThumbImage image={img} alt={`${vehicle.shortName} ${index + 1}`} />
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[11px] text-gray-500 text-center sm:text-left">
                Authentic {vehicle.shortName} reference photos · Wikimedia Commons (CC) · Same gallery as partnership page
              </p>
            </div>

            {/* Specs */}
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{vehicle.model}</h3>
                <p className="text-[#F9A03F] text-sm font-bold uppercase tracking-wider mt-1">{vehicle.type}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                    Per day (with driver)
                  </span>
                  <span className="text-xl font-bold text-emerald-400">{formatDailyRate(vehicle)}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                    Per week (with driver)
                  </span>
                  <span className="text-xl font-bold text-[#F9A03F]">
                    {formatWeeklyRate(vehicle) ?? "—"}
                  </span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                    Seats
                  </span>
                  <span className="text-lg font-bold flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#F9A03F]" />
                    {vehicle.seats}
                  </span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                    Transfer from
                  </span>
                  <span className="text-lg font-bold">KES {vehicle.transferFrom.toLocaleString()}</span>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">
                    Luggage
                  </span>
                  <span className="text-sm font-bold flex items-center gap-1.5">
                    <Luggage className="w-4 h-4 text-sky-300" />
                    {vehicle.luggage}
                  </span>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-white/10">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Best for</h4>
                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed">{vehicle.suitability}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Why guests choose it</h4>
                  <p className="text-[#F9A03F] text-sm sm:text-base leading-relaxed font-semibold flex gap-2">
                    <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                    {vehicle.highlight}
                  </p>
                </div>
                <ul className="space-y-2">
                  {vehicle.bestFor.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onBookVehicle(vehicle.model)}
                className="touch-target inline-flex w-full items-center justify-center gap-2 bg-[#F9A03F] hover:bg-amber-400 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all shadow-xl hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Book {vehicle.shortName}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

type HireFleetModelGridProps = {
  activeModel: string;
  onSelectModel: (model: string) => void;
};

/** Every Toyota type with all 5 partnership photos on each card */
export function HireFleetModelGrid({ activeModel, onSelectModel }: HireFleetModelGridProps) {
  return (
    <section className="py-16 sm:py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
            All {HIRE_VEHICLES.length} hire vehicles · full photo sets
          </h2>
          <p className="text-gray-600 font-light max-w-xl mx-auto text-sm sm:text-base">
            Tap any card to view that model in the showcase above — every card shows all five real car photos.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {HIRE_VEHICLES.map((v) => (
            <FleetHireCard
              key={v.model}
              vehicle={v}
              isActive={activeModel === v.model}
              onSelect={() => onSelectModel(v.model)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FleetHireCard({
  vehicle,
  isActive,
  onSelect,
}: {
  vehicle: HireVehicleSpec;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.article
      layout
      className={`rounded-3xl overflow-hidden border-2 bg-white shadow-md transition-all hover:shadow-xl ${
        isActive ? "border-emerald-500 ring-2 ring-emerald-500/20" : "border-gray-100 hover:border-gray-200"
      }`}
    >
      <div className="grid grid-cols-4 grid-rows-2 gap-0.5 bg-gray-900 p-0.5">
        {vehicle.gallery.map((img, i) => (
          <div
            key={img.hero}
            className={`overflow-hidden bg-gray-800 ${
              i === 0 ? "col-span-2 row-span-2 min-h-[8rem]" : "aspect-[4/3]"
            }`}
          >
            <FleetThumbImage
              image={img}
              alt={`${vehicle.shortName} photo ${i + 1}`}
              className="h-full w-full hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="text-lg font-black text-gray-900">{vehicle.shortName}</h3>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide">{vehicle.type}</p>
          </div>
          <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full shrink-0">
            5 photos
          </span>
        </div>
          <p className="text-xs text-gray-500 mb-3 line-clamp-2">{vehicle.suitability}</p>
        <div className="flex flex-wrap gap-2 text-[10px] font-bold mb-3">
          <span className="bg-emerald-50 text-emerald-800 px-2 py-1 rounded-full">{formatDailyRate(vehicle)}</span>
          {formatWeeklyRate(vehicle) && (
            <span className="bg-[#F9A03F]/15 text-amber-900 px-2 py-1 rounded-full">{formatWeeklyRate(vehicle)}</span>
          )}
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-bold text-gray-500">Chauffeur included</p>
          <button
            type="button"
            onClick={onSelect}
            className={`touch-target shrink-0 text-xs font-bold px-4 py-2.5 rounded-full transition-colors ${
              isActive
                ? "bg-emerald-600 text-white"
                : "bg-[#003B73] hover:bg-[#002a52] text-white"
            }`}
          >
            {isActive ? "Selected" : "Select"}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
