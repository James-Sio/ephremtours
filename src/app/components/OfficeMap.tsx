import { motion } from "motion/react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import {
  MAIN_OFFICE,
  officeAddressLines,
  googleMapsEmbedUrl,
  googleMapsDirectionsUrl,
  googleMapsViewUrl,
  appleMapsDirectionsUrl,
} from "../data/siteContact";

type OfficeMapProps = {
  variant?: "light" | "dark";
  showTitle?: boolean;
  className?: string;
};

export function OfficeMap({ variant = "dark", showTitle = true, className = "" }: OfficeMapProps) {
  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {showTitle && (
        <div className="mb-4 sm:mb-5">
          <h3
            className={`text-lg sm:text-xl font-bold tracking-wide flex items-center gap-2 ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            <MapPin className={`w-5 h-5 shrink-0 ${isDark ? "text-[#F9A03F]" : "text-sky-600"}`} />
            Visit Our Main Office
          </h3>
          <p className={`text-sm mt-1 ${isDark ? "text-sky-100/60" : "text-gray-500"}`}>
            Get directions to {MAIN_OFFICE.city} — we serve the full Kenyan coast from here.
          </p>
        </div>
      )}

      <div
        className={`rounded-2xl overflow-hidden border shadow-xl ${
          isDark ? "border-white/10 bg-white/5" : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="relative w-full aspect-[16/10] sm:aspect-[21/9] min-h-[200px] bg-gray-800">
          <iframe
            title={`Map — ${MAIN_OFFICE.name}`}
            src={googleMapsEmbedUrl()}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div
          className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
            isDark ? "bg-[#002244]/80" : "bg-white"
          }`}
        >
          <div className="min-w-0">
            <p className={`font-bold text-sm sm:text-base ${isDark ? "text-white" : "text-gray-900"}`}>
              {MAIN_OFFICE.name}
            </p>
            {officeAddressLines().map((line) => (
              <p key={line} className={`text-xs sm:text-sm mt-0.5 ${isDark ? "text-sky-100/70" : "text-gray-600"}`}>
                {line}
              </p>
            ))}
            <p className={`text-[10px] sm:text-xs mt-2 font-medium uppercase tracking-wider ${isDark ? "text-[#F9A03F]" : "text-sky-600"}`}>
              {MAIN_OFFICE.serviceArea}
            </p>
          </div>

          <div className="flex flex-col xs:flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
            <a
              href={googleMapsDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`touch-target inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide transition-all active:scale-[0.98] ${
                isDark
                  ? "bg-[#F9A03F] hover:bg-amber-400 text-gray-900 shadow-lg"
                  : "bg-sky-600 hover:bg-sky-700 text-white shadow-md"
              }`}
            >
              <Navigation className="w-4 h-4 shrink-0" />
              Get Directions
            </a>
            <a
              href={googleMapsViewUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`touch-target inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all active:scale-[0.98] ${
                isDark
                  ? "border-white/15 text-white hover:bg-white/10"
                  : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              Open in Maps
            </a>
            <a
              href={appleMapsDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={`sm:hidden touch-target inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isDark ? "text-sky-100/60 hover:text-white" : "text-gray-500 hover:text-gray-800"
              }`}
            >
              Apple Maps
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
