import { motion } from "motion/react";
import { Link } from "react-router";
import { Car, ArrowRight, Phone, Check } from "lucide-react";

const hireHighlights = [
  "Toyota MPVs, 4x4 Prado & Coaster buses",
  "Professional chauffeur on every hire",
  "Airport, SGR, safaris, weddings & events",
  "Hourly, daily, or custom multi-day rates",
];

export function CarHirePromo() {
  return (
    <section id="car-hire" className="relative py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-[#003B73] to-[#002244]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F9A03F]/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-6">
              <Car className="w-4 h-4 text-[#F9A03F]" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-100">
                Car hire services
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight mb-4">
              Need a car?
              <span className="block text-[#F9A03F] mt-1">We offer car hire.</span>
            </h2>

            <p className="text-base sm:text-lg text-sky-100/90 font-light leading-relaxed mb-8 max-w-xl">
              Browse all 7 Toyota models with the same real photos as our partnership fleet — 5 images per car.
              Book with a trained driver for transfers, full-day hire, safaris, or events.
            </p>

            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {hireHighlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-sky-50/90">
                  <Check className="w-4 h-4 text-[#F9A03F] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/car-hire"
                className="touch-target inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F9A03F] hover:bg-amber-400 text-gray-900 font-bold rounded-full transition-all shadow-lg"
              >
                Browse fleet & book
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="touch-target inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold rounded-full transition-all"
              >
                <Phone className="w-5 h-5" />
                Book now
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 sm:p-8 text-white"
          >
            <h3 className="text-lg font-bold mb-4 text-[#F9A03F]">Popular hire uses</h3>
            <div className="space-y-4">
              {[
                { title: "Airport & SGR transfers", desc: "Mombasa MBA, Malindi MYD, SGR Terminus" },
                { title: "Full-day chauffeur hire", desc: "Weddings, meetings, coastal day trips" },
                { title: "Safari & group travel", desc: "Hiace, Coaster, Prado with driver" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 p-4 rounded-2xl bg-black/20 border border-white/10"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F9A03F]/20 flex items-center justify-center shrink-0">
                    <Car className="w-5 h-5 text-[#F9A03F]" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item.title}</p>
                    <p className="text-xs text-sky-100/70 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-sky-100/50 mt-6 leading-relaxed">
              Own a Toyota and want to earn instead? See our{" "}
              <Link to="/partnership" className="text-[#F9A03F] font-semibold hover:underline">
                vehicle partnership program
              </Link>
              .
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
