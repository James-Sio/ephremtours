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
  Car,
  UserCircle,
  Smartphone,
  IdCard,
} from "lucide-react";
import { toast } from "sonner";
import { CONTACT_PHONES, MPESA_TILL } from "../data/siteContact";
import {
  estimateHirePrice,
  HIRE_PICKUP_LOCATIONS,
  HIRE_PURPOSES,
  type HireDriverOption,
  type HirePurposeId,
  type HireVehicleSpec,
  purposeNeedsEndDate,
} from "../data/hireFleet";

type CarHireBookingFormProps = {
  vehicle: HireVehicleSpec;
  className?: string;
};

export function CarHireBookingForm({ vehicle, className = "" }: CarHireBookingFormProps) {
  const [driverOption, setDriverOption] = useState<HireDriverOption>("with-driver");
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
  const [licenceConfirmed, setLicenceConfirmed] = useState(false);
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

  const estimateWithDriver = useMemo(
    () => estimateHirePrice(vehicle, purpose, effectiveDays, "with-driver"),
    [vehicle, purpose, effectiveDays]
  );

  const estimateSelfDrive = useMemo(
    () => estimateHirePrice(vehicle, purpose, effectiveDays, "self-drive"),
    [vehicle, purpose, effectiveDays]
  );

  const estimate = driverOption === "with-driver" ? estimateWithDriver : estimateSelfDrive;
  const purposeMeta = HIRE_PURPOSES.find((p) => p.id === purpose)!;

  const overCapacity = adults + children > vehicle.maxPassengers;
  const selfDriveBlocked = driverOption === "self-drive" && !licenceConfirmed;

  const buildWhatsAppMessage = () => {
    const driverLabel =
      driverOption === "with-driver"
        ? "With Ephream chauffeur"
        : "Self-drive (no driver)";

    const lines = [
      `*Car hire request — Ephream Tours*`,
      ``,
      `Vehicle: ${vehicle.model} (${vehicle.type})`,
      `Driver: ${driverLabel}`,
      `Hire type: ${purposeMeta.label}`,
      `Pick-up: ${pickup}${pickupDetail ? ` — ${pickupDetail}` : ""}`,
      destination ? `Destination / itinerary: ${destination}` : null,
      `Date: ${startDate} at ${startTime}`,
      needsEnd && endDate ? `Until: ${endDate}` : null,
      effectiveDays > 1 ? `Duration: ${effectiveDays} day(s)` : null,
      driverOption === "with-driver" && estimate
        ? `Passengers: ${adults} adult(s)${children ? `, ${children} child(ren)` : ""}`
        : null,
      childSeat && driverOption === "with-driver" ? `Child seat: Yes` : null,
      estimate
        ? [
            `Est. total: KES ${estimate.total.toLocaleString()}`,
            estimate.driverFee > 0 ? `(Vehicle KES ${estimate.vehicleSubtotal.toLocaleString()} + Driver KES ${estimate.driverFee.toLocaleString()})` : null,
            estimate.mpesaDeposit
              ? `Suggested deposit (self-drive): KES ${estimate.mpesaDeposit.toLocaleString()}`
              : null,
          ]
            .filter(Boolean)
            .join("\n")
        : null,
      `Pay via M-Pesa Till: *${MPESA_TILL}*`,
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
    if (overCapacity && driverOption === "with-driver") {
      toast.error(`This vehicle fits up to ${vehicle.maxPassengers} passengers. Choose a larger model.`);
      return;
    }
    if (selfDriveBlocked) {
      toast.error("Please confirm you hold a valid Kenyan driving licence for self-drive hire.");
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
        <p className="text-gray-600 text-sm mb-4 max-w-sm leading-relaxed">
          We will confirm your {vehicle.shortName}
          {driverOption === "with-driver" ? " with chauffeur" : " (self-drive)"} on WhatsApp shortly.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-4 mb-6 max-w-xs w-full">
          <p className="text-xs font-bold text-green-800 uppercase tracking-widest mb-1">M-Pesa Till</p>
          <p className="text-2xl font-black text-green-900 tracking-wider">{MPESA_TILL}</p>
          {estimate?.mpesaDeposit && (
            <p className="text-[11px] text-green-700 mt-2">
              Suggested deposit: KES {estimate.mpesaDeposit.toLocaleString()}
            </p>
          )}
        </div>
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
          With driver or self-drive · Pay Till {MPESA_TILL}
        </p>
      </div>

      {/* Driver vs self-drive */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-gray-700 ml-1">Driver option</label>
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-2xl">
          <button
            type="button"
            onClick={() => setDriverOption("with-driver")}
            className={`touch-target flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-xl font-bold text-sm transition-all ${
              driverOption === "with-driver"
                ? "bg-white text-[#003B73] shadow-md ring-1 ring-emerald-500/30"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <UserCircle className="w-6 h-6 text-emerald-600" />
            With driver
            {estimateWithDriver && (
              <span className="text-[10px] font-black text-emerald-600">
                from KES {estimateWithDriver.total.toLocaleString()}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setDriverOption("self-drive")}
            className={`touch-target flex flex-col items-center gap-1.5 py-3.5 px-2 rounded-xl font-bold text-sm transition-all ${
              driverOption === "self-drive"
                ? "bg-white text-[#003B73] shadow-md ring-1 ring-sky-500/30"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Car className="w-6 h-6 text-sky-600" />
            No driver
            {estimateSelfDrive && (
              <span className="text-[10px] font-black text-sky-600">
                from KES {estimateSelfDrive.total.toLocaleString()}
              </span>
            )}
          </button>
        </div>
        <p className="text-[11px] text-gray-500 leading-relaxed px-1">
          {driverOption === "with-driver"
            ? "Professional Ephream chauffeur, fuel guidance & local route knowledge included."
            : "You drive — valid licence & national ID required. Refundable deposit via M-Pesa Till."}
        </p>
      </div>

      <AnimatePresence>
        {driverOption === "self-drive" && (
          <motion.label
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-3 p-4 rounded-xl border-2 border-sky-200 bg-sky-50 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={licenceConfirmed}
              onChange={(e) => setLicenceConfirmed(e.target.checked)}
              className="mt-1 rounded"
            />
            <span className="text-sm text-gray-800 leading-relaxed">
              <IdCard className="w-4 h-4 inline mr-1 text-sky-600" />
              I hold a <strong>valid Kenyan driving licence</strong> and will present it with my ID at pick-up.
            </span>
          </motion.label>
        )}
      </AnimatePresence>

      {/* Hire purpose */}
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

      <div className="grid grid-cols-2 gap-4">
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

      {driverOption === "with-driver" && (
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
      )}

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
            placeholder="Special requests (flight number, licence class, etc.)"
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 pl-12 pr-4 text-sm font-medium resize-none"
          />
        </div>
      </div>

      {/* Price breakdown */}
      {estimate && (
        <div className="space-y-3">
          <div className="bg-emerald-50 border border-emerald-200/60 rounded-2xl p-4 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-emerald-900">Your estimate</h4>
                <p className="text-[11px] text-emerald-700/80">
                  {vehicle.shortName} · {purposeMeta.label}
                  {effectiveDays > 1 ? ` · ${effectiveDays} days` : ""} ·{" "}
                  {driverOption === "with-driver" ? "With driver" : "Self-drive"}
                </p>
              </div>
              <span className="text-2xl font-black text-emerald-800 whitespace-nowrap">
                KES {estimate.total.toLocaleString()}
              </span>
            </div>

            <div className="text-xs space-y-1.5 pt-2 border-t border-emerald-200/50">
              <div className="flex justify-between text-emerald-900/90">
                <span>Vehicle hire</span>
                <span className="font-bold">KES {estimate.vehicleSubtotal.toLocaleString()}</span>
              </div>
              {estimate.driverFee > 0 && (
                <div className="flex justify-between text-emerald-900/90">
                  <span>Professional driver</span>
                  <span className="font-bold">KES {estimate.driverFee.toLocaleString()}</span>
                </div>
              )}
              {estimateWithDriver && estimateSelfDrive && driverOption === "with-driver" && (
                <p className="text-[10px] text-emerald-600 pt-1">
                  Self-drive would be KES {estimateSelfDrive.total.toLocaleString()} (save KES{" "}
                  {(estimateWithDriver.total - estimateSelfDrive.total).toLocaleString()})
                </p>
              )}
              {estimateWithDriver && estimateSelfDrive && driverOption === "self-drive" && (
                <p className="text-[10px] text-sky-600 pt-1">
                  With driver would be KES {estimateWithDriver.total.toLocaleString()} (+KES{" "}
                  {(estimateWithDriver.total - estimateSelfDrive.total).toLocaleString()} for chauffeur)
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#003B73] text-white rounded-2xl p-4">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <Smartphone className="w-6 h-6 text-[#F9A03F]" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-sky-200">M-Pesa Till (Ephream Tours)</p>
              <p className="text-xl font-black tracking-wider">{MPESA_TILL}</p>
              {estimate.mpesaDeposit && (
                <p className="text-[11px] text-sky-100/90 mt-0.5">
                  Suggested deposit: KES {estimate.mpesaDeposit.toLocaleString()} · balance on return
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={state === "submitting" || (driverOption === "with-driver" && overCapacity) || selfDriveBlocked}
        className="touch-target w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
      >
        {state === "submitting" ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Request {vehicle.shortName}{" "}
            {driverOption === "with-driver" ? "with driver" : "self-drive"}
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
      <p className="text-center text-[11px] text-gray-500 leading-relaxed">
        Final rate confirmed on WhatsApp. Pay to M-Pesa Till <strong className="text-gray-700">{MPESA_TILL}</strong> when
        we confirm your booking.
      </p>
    </form>
  );
}
