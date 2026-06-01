import { motion, AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
  Users,
  Baby,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { CONTACT_PHONES } from "../data/siteContact";
import {
  estimateHirePrice,
  HIRE_PICKUP_LOCATIONS,
  HIRE_PURPOSES,
  type HirePurposeId,
  type HireVehicleSpec,
  purposeNeedsEndDate,
} from "../data/hireFleet";

type CarHireBookingFormProps = {
  vehicle: HireVehicleSpec;
  className?: string;
};

export function CarHireBookingForm({ vehicle, className = "" }: CarHireBookingFormProps) {
  const [purpose, setPurpose] = useState<HirePurposeId>("full-day");
  const [pickup, setPickup] = useState("");
  const [pickupDetail, setPickupDetail] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [days, setDays] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childSeat, setChildSeat] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [state, setState] = useState<"idle" | "submitting" | "success">("idle");

  const needsEnd = purposeNeedsEndDate(purpose);
  const effectiveDays = useMemo(() => {
    if (!needsEnd) return purpose === "multi-day" || purpose === "safari" || purpose === "corporate" ? days : 1;
    if (startDate && endDate) {
      const a = new Date(startDate);
      const b = new Date(endDate);
      const diff = Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      return Math.max(1, diff);
    }
    return days;
  }, [needsEnd, startDate, endDate, days, purpose]);

  const estimate = estimateHirePrice(vehicle, purpose, effectiveDays);
  const purposeMeta = HIRE_PURPOSES.find((p) => p.id === purpose)!;

  const overCapacity = adults + children > vehicle.maxPassengers;

  const buildWhatsAppMessage = () => {
    const lines = [
      `*Car hire request — Ephream Tours*`,
      ``,
      `Vehicle: ${vehicle.model} (${vehicle.type})`,
      `Hire type: ${purposeMeta.label}`,
      `Pick-up: ${pickup}${pickupDetail ? ` — ${pickupDetail}` : ""}`,
      destination ? `Destination / itinerary: ${destination}` : null,
      `Date: ${startDate} at ${startTime}`,
      needsEnd && endDate ? `Until: ${endDate}` : null,
      effectiveDays > 1 ? `Duration: ${effectiveDays} day(s)` : null,
      `Passengers: ${adults} adult(s)${children ? `, ${children} child(ren)` : ""}`,
      childSeat ? `Child seat: Yes` : null,
      estimate ? `Est. from: KES ${estimate.toLocaleString()}` : null,
      notes ? `Notes: ${notes}` : null,
      ``,
      `Name: ${name}`,
      `Phone: ${phone}`,
      email ? `Email: ${email}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (overCapacity) {
      toast.error(`This vehicle fits up to ${vehicle.maxPassengers} passengers. Choose a larger model.`);
      return;
    }
    setState("submitting");
    setTimeout(() => {
      setState("success");
      const msg = buildWhatsAppMessage();
      toast.success("Request saved — open WhatsApp to confirm?", {
        action: {
          label: "WhatsApp",
          onClick: () => {
            window.open(
              `https://wa.me/${CONTACT_PHONES[0].tel.replace("+", "")}?text=${encodeURIComponent(msg)}`,
              "_blank"
            );
          },
        },
        duration: 12000,
      });
    }, 1200);
  };

  if (state === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`flex flex-col items-center justify-center py-12 text-center ${className}`}
      >
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Hire request received</h3>
        <p className="text-gray-600 text-sm mb-6 max-w-xs leading-relaxed">
          We will confirm your {vehicle.shortName} and chauffeur on WhatsApp within minutes.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="text-[#003B73] font-bold hover:text-[#F9A03F]"
        >
          Book another vehicle
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-5 ${className}`}>
      <div>
        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight">Book this vehicle</h3>
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">
          Chauffeur included · No self-drive
        </p>
      </div>

      {/* Hire purpose — not SGR trip type */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 ml-1">What do you need the car for?</label>
        <div className="grid grid-cols-2 gap-2">
          {HIRE_PURPOSES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPurpose(p.id)}
              className={`touch-target text-left p-3 rounded-xl border transition-all active:scale-[0.98] ${
                purpose === p.id
                  ? "border-emerald-500 bg-emerald-50 shadow-inner ring-1 ring-emerald-500/30"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-lg leading-none">{p.emoji}</span>
              <span className="block text-xs font-bold text-gray-900 mt-1">{p.label}</span>
              <span className="block text-[10px] text-gray-500 mt-0.5 leading-snug">{p.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pickup */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 ml-1">Pick-up location</label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
          <select
            required
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-10 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          >
            <option value="" disabled>
              Where should we pick you up?
            </option>
            {HIRE_PICKUP_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>
        {(pickup.includes("Hotel") || pickup.includes("Other")) && (
          <input
            type="text"
            required
            placeholder="Hotel name or exact address"
            value={pickupDetail}
            onChange={(e) => setPickupDetail(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
          />
        )}
      </div>

      {/* Destination / itinerary */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 ml-1">
          {purpose === "transfer" ? "Drop-off destination" : "Itinerary or destination"}
        </label>
        <input
          type="text"
          required
          placeholder={
            purpose === "multi-day" || purpose === "safari"
              ? "e.g. Watamu → Tsavo East → return Malindi"
              : "e.g. PrideInn Paradise Shanzu"
          }
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 px-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
        />
      </div>

      {/* Dates */}
      <div className={`grid gap-4 ${needsEnd ? "grid-cols-2" : "grid-cols-2"}`}>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 ml-1">Start date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-3 text-sm font-medium"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 ml-1">Pick-up time</label>
          <div className="relative">
            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="time"
              required
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-3 text-sm font-medium"
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {needsEnd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <label className="text-xs font-bold text-gray-700 ml-1">End date</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                required
                min={startDate}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-3 text-sm font-medium"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {(purpose === "multi-day" || purpose === "safari") && !needsEnd && (
        <div className="flex items-center justify-between bg-slate-50 border border-gray-100 rounded-xl p-4">
          <span className="text-sm font-bold text-gray-900">Number of days</span>
          <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
            <button
              type="button"
              onClick={() => setDays((d) => Math.max(1, d - 1))}
              className="w-8 h-8 rounded bg-slate-100 font-bold"
            >
              −
            </button>
            <span className="w-8 text-center font-bold">{days}</span>
            <button type="button" onClick={() => setDays((d) => d + 1)} className="w-8 h-8 rounded bg-slate-100 font-bold">
              +
            </button>
          </div>
        </div>
      )}

      {/* Passengers */}
      <div className="bg-slate-50 border border-gray-100 rounded-2xl p-4 space-y-3">
        <label className="text-xs font-bold text-gray-700 flex items-center gap-1">
          <Users className="w-4 h-4 text-[#003B73]" /> Passengers (max {vehicle.maxPassengers})
        </label>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold">Adults</span>
          <div className="flex items-center gap-2 bg-white rounded-lg border p-1">
            <button type="button" onClick={() => setAdults((n) => Math.max(1, n - 1))} className="w-7 h-7 rounded bg-slate-100 font-bold">
              −
            </button>
            <span className="w-6 text-center font-bold">{adults}</span>
            <button type="button" onClick={() => setAdults((n) => n + 1)} className="w-7 h-7 rounded bg-slate-100 font-bold">
              +
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold flex items-center gap-1">
            Children <Baby className="w-3 h-3 text-gray-400" />
          </span>
          <div className="flex items-center gap-2 bg-white rounded-lg border p-1">
            <button type="button" onClick={() => setChildren((n) => Math.max(0, n - 1))} className="w-7 h-7 rounded bg-slate-100 font-bold">
              −
            </button>
            <span className="w-6 text-center font-bold">{children}</span>
            <button type="button" onClick={() => setChildren((n) => n + 1)} className="w-7 h-7 rounded bg-slate-100 font-bold">
              +
            </button>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={childSeat} onChange={(e) => setChildSeat(e.target.checked)} className="rounded" />
          Request child safety seat (free)
        </label>
        {overCapacity && (
          <p className="text-xs text-red-600 font-bold">Too many passengers for {vehicle.shortName}. Try Hiace or Coaster.</p>
        )}
      </div>

      {/* Contact */}
      <div className="space-y-3 pt-2 border-t border-gray-100">
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            required
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium"
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="tel"
            required
            placeholder="WhatsApp / phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium"
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-sm font-medium"
          />
        </div>
        <div className="relative">
          <MessageSquare className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
          <textarea
            placeholder="Special requests (vehicle colour, stops, flight number…)"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium resize-none"
          />
        </div>
      </div>

      {/* Estimate */}
      <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-4 flex items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-emerald-900">Estimated hire (from)</h4>
          <p className="text-[11px] text-emerald-700/80">
            {vehicle.shortName} · {purposeMeta.label}
            {effectiveDays > 1 ? ` · ${effectiveDays} days` : ""}
          </p>
        </div>
        {estimate ? (
          <span className="text-2xl font-black text-emerald-800 whitespace-nowrap">
            KES {estimate.toLocaleString()}
          </span>
        ) : (
          <span className="text-sm font-bold text-[#F9A03F]">Custom quote</span>
        )}
      </div>

      <button
        type="submit"
        disabled={state === "submitting" || overCapacity}
        className="touch-target w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
      >
        {state === "submitting" ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Request {vehicle.shortName} hire
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
      <p className="text-center text-[11px] text-gray-500 leading-relaxed">
        Final rate confirmed on WhatsApp. All hires include a professional Ephream chauffeur.
      </p>
    </form>
  );
}
