import { fleetGalleryFor, type FleetImageSet } from "./fleetImages";

export type HireVehicleSpec = {
  model: string;
  shortName: string;
  type: string;
  seats: string;
  maxPassengers: number;
  luggage: string;
  /** Per day with professional driver (KES). */
  hireDailyRate: number;
  /** Per week with driver. Null = quote on request (Coaster weekly / lease). */
  hireWeeklyRate: number | null;
  /** Multi-day / weekly hire needs custom quote (Coaster). */
  quoteWeeklyOnRequest?: boolean;
  transferFrom: number;
  halfDayFrom: number;
  suitability: string;
  highlight: string;
  bestFor: string[];
  gallery: FleetImageSet[];
};

const specs = [
  {
    model: "Toyota Alphard",
    type: "Elite First-Class MPV",
    seats: "7 VIP seats",
    maxPassengers: 6,
    luggage: "4 large bags",
    hireDailyRate: 16_000,
    hireWeeklyRate: 25_000,
    halfDayFrom: 9000,
    transferFrom: 6000,
    suitability: "VIP Airport Meet & Greets & Executive Corporate Transfers",
    highlight: "KES 16,000/day · KES 25,000/week with driver",
    bestFor: ["VIP airport", "Executive meetings", "Luxury resort transfers"],
  },
  {
    model: "Toyota Esquire",
    type: "Executive Luxury MPV",
    seats: "7 premium seats",
    maxPassengers: 6,
    luggage: "4 large bags",
    hireDailyRate: 12_000,
    hireWeeklyRate: 18_000,
    halfDayFrom: 7000,
    transferFrom: 4500,
    suitability: "Direct Resort Shuttles & Luxury Tourist Excursions",
    highlight: "KES 12,000/day · KES 18,000/week with driver",
    bestFor: ["Watamu & Diani shuttles", "Boutique hotels", "Family groups"],
  },
  {
    model: "Toyota Voxy",
    type: "Luxury Family MPV",
    seats: "7–8 seats",
    maxPassengers: 7,
    luggage: "5 bags",
    hireDailyRate: 12_000,
    hireWeeklyRate: 18_000,
    halfDayFrom: 7000,
    transferFrom: 4000,
    suitability: "Coastal Day Trips & Family Hotel-to-Hotel Transfers",
    highlight: "KES 12,000/day · KES 18,000/week with driver",
    bestFor: ["Coastal day trips", "Hotel hops", "Small families"],
  },
  {
    model: "Toyota Noah",
    type: "Premium Comfort MPV",
    seats: "7–8 seats",
    maxPassengers: 7,
    luggage: "5 bags",
    hireDailyRate: 12_000,
    hireWeeklyRate: 18_000,
    halfDayFrom: 7000,
    transferFrom: 3800,
    suitability: "SGR Terminus Shuttles & Local Mombasa Old Town Excursions",
    highlight: "KES 12,000/day · KES 18,000/week with driver",
    bestFor: ["SGR & city runs", "Old Town tours", "Value-conscious groups"],
  },
  {
    model: "Toyota Hiace",
    type: "Hiace 9L · 16 Seater",
    seats: "16 seats",
    maxPassengers: 16,
    luggage: "16 bags",
    hireDailyRate: 18_000,
    hireWeeklyRate: 30_000,
    halfDayFrom: 10_000,
    transferFrom: 6000,
    suitability: "Tsavo East Safaris & High-Capacity Corporate Events",
    highlight: "16-seater from KES 18,000/day · KES 30,000/week with driver",
    bestFor: ["Group transfers", "Tsavo safaris", "Team outings"],
  },
  {
    model: "Toyota Prado",
    type: "Premium 4×4 Safari SUV",
    seats: "7 seats (4×4)",
    maxPassengers: 6,
    luggage: "4 bags + gear",
    hireDailyRate: 18_000,
    hireWeeklyRate: null,
    halfDayFrom: 10_000,
    transferFrom: 6500,
    suitability: "Safari Game Drives & Rough Coastal Terrains (Tsavo/Amboseli)",
    highlight: "KES 18,000/day with driver — safari ready 4×4",
    bestFor: ["Game drives", "Rough roads", "Safari packages"],
  },
  {
    model: "Toyota Coaster",
    type: "Group Coaster Bus",
    seats: "23–30 seats",
    maxPassengers: 28,
    luggage: "Group cargo",
    hireDailyRate: 30_000,
    hireWeeklyRate: null,
    quoteWeeklyOnRequest: true,
    halfDayFrom: 18_000,
    transferFrom: 12_000,
    suitability: "School Trips, Church Events, Wedding Fleets & Large Corporate Groups",
    highlight: "KES 30,000/day hire · weekly / car lease — price depends on the job",
    bestFor: ["Weddings", "Church & school trips", "Large corporate groups"],
  },
] as const;

export const HIRE_VEHICLES: HireVehicleSpec[] = specs.map((s) => ({
  ...s,
  shortName: s.model.replace("Toyota ", ""),
  gallery: fleetGalleryFor(s.model),
}));

export type HirePurposeId =
  | "transfer"
  | "half-day"
  | "full-day"
  | "multi-day"
  | "wedding"
  | "safari"
  | "corporate";

export type HirePurpose = {
  id: HirePurposeId;
  label: string;
  description: string;
  emoji: string;
};

export const HIRE_PURPOSES: HirePurpose[] = [
  { id: "transfer", label: "Point-to-point", description: "Airport, SGR, hotel, or one-way transfer", emoji: "✈️" },
  { id: "half-day", label: "Half day", description: "4 hours with chauffeur", emoji: "🕐" },
  { id: "full-day", label: "Full day", description: "Per-day rate with professional driver", emoji: "☀️" },
  { id: "multi-day", label: "Multi-day / weekly", description: "Daily or weekly rates — 7 days = 1 week", emoji: "📅" },
  { id: "wedding", label: "Wedding & events", description: "Fleet for your special day", emoji: "💒" },
  { id: "safari", label: "Safari hire", description: "Tsavo, Shimba, or custom routes", emoji: "🦁" },
  { id: "corporate", label: "Corporate / group", description: "Teams, conferences, delegate transport", emoji: "💼" },
];

export const HIRE_PICKUP_LOCATIONS = [
  "Moi International Airport (MBA)",
  "Malindi Airport (MYD)",
  "SGR Mombasa Terminus",
  "Mombasa Island / Nyali",
  "Kilifi / Mtwapa",
  "Watamu",
  "Malindi town",
  "Diani / Ukunda",
  "Hotel pickup (specify below)",
  "Other — type in notes",
] as const;

export function getHireVehicle(model: string): HireVehicleSpec | undefined {
  return HIRE_VEHICLES.find((v) => v.model === model);
}

export type HireEstimate = {
  purpose: HirePurposeId;
  days: number;
  total: number;
  customQuote?: boolean;
  priceNote?: string;
};

/** Full weeks at weekly rate + extra days at daily rate. */
export function weeklyHireTotal(weeklyRate: number, dailyRate: number, days: number): number {
  const d = Math.max(1, days);
  const weeks = Math.floor(d / 7);
  const remainder = d % 7;
  return weeks * weeklyRate + remainder * dailyRate;
}

function usesWeeklyPricing(purpose: HirePurposeId): boolean {
  return purpose === "multi-day" || purpose === "safari" || purpose === "corporate";
}

function needsCoasterCustomQuote(vehicle: HireVehicleSpec, purpose: HirePurposeId, days: number): boolean {
  return Boolean(
    vehicle.quoteWeeklyOnRequest &&
      (usesWeeklyPricing(purpose) || (purpose === "wedding" && days >= 2))
  );
}

function calculateTotal(vehicle: HireVehicleSpec, purpose: HirePurposeId, days: number): number | null {
  const d = Math.max(1, days);

  if (needsCoasterCustomQuote(vehicle, purpose, d)) return null;

  const weekly = vehicle.hireWeeklyRate;

  if (weekly != null && usesWeeklyPricing(purpose)) {
    return weeklyHireTotal(weekly, vehicle.hireDailyRate, d);
  }

  switch (purpose) {
    case "transfer":
      return vehicle.transferFrom;
    case "half-day":
      return vehicle.halfDayFrom;
    case "full-day":
      return vehicle.hireDailyRate;
    case "multi-day":
    case "corporate":
      if (weekly != null && d >= 7) return weeklyHireTotal(weekly, vehicle.hireDailyRate, d);
      return vehicle.hireDailyRate * d;
    case "wedding":
      return Math.round(vehicle.hireDailyRate * Math.max(1, d) * 1.1);
    case "safari":
      if (weekly != null && d >= 7) return weeklyHireTotal(weekly, vehicle.hireDailyRate, d);
      return Math.round(vehicle.hireDailyRate * d * 1.05);
    default:
      return vehicle.hireDailyRate;
  }
}

export function estimateHirePrice(
  vehicle: HireVehicleSpec,
  purpose: HirePurposeId,
  days: number
): HireEstimate | null {
  const d = Math.max(1, days);

  if (needsCoasterCustomQuote(vehicle, purpose, d)) {
    return {
      purpose,
      days: d,
      total: 0,
      customQuote: true,
      priceNote:
        "Coaster weekly hire and car lease pricing depends on the job, route, and dates. Submit your request — we quote on WhatsApp. Day hire is KES 30,000 with driver.",
    };
  }

  const total = calculateTotal(vehicle, purpose, d);
  if (total == null) return null;

  const priceNote =
    vehicle.hireWeeklyRate != null && usesWeeklyPricing(purpose)
      ? `Listed KES ${vehicle.hireDailyRate.toLocaleString()}/day · KES ${vehicle.hireWeeklyRate.toLocaleString()}/week (all with driver) · ${d} day(s)`
      : `KES ${vehicle.hireDailyRate.toLocaleString()}/day with professional driver`;

  return { purpose, days: d, total, priceNote };
}

export function estimateHireTotal(
  vehicle: HireVehicleSpec,
  purpose: HirePurposeId,
  days: number
): number | null {
  const est = estimateHirePrice(vehicle, purpose, days);
  if (!est || est.customQuote) return null;
  return est.total;
}

export function purposeNeedsEndDate(purpose: HirePurposeId): boolean {
  return purpose === "multi-day" || purpose === "safari" || purpose === "corporate";
}

export function formatDailyRate(vehicle: HireVehicleSpec): string {
  if (vehicle.hireDailyRate <= 0) return "On request";
  const from = vehicle.model === "Toyota Hiace" ? "from " : "";
  return `${from}KES ${vehicle.hireDailyRate.toLocaleString()}/day`;
}

export function formatWeeklyRate(vehicle: HireVehicleSpec): string | null {
  if (vehicle.quoteWeeklyOnRequest && vehicle.hireWeeklyRate == null) {
    return "Quote on request (depends on job)";
  }
  if (vehicle.hireWeeklyRate == null) return null;
  return `KES ${vehicle.hireWeeklyRate.toLocaleString()}/week`;
}
