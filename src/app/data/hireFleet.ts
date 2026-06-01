import { fleetGalleryFor, type FleetImageSet } from "./fleetImages";

export type HireVehicleSpec = {
  model: string;
  shortName: string;
  type: string;
  seats: string;
  maxPassengers: number;
  luggage: string;
  /** Full-day with driver (derived from weekly where set). */
  hireDailyRate: number;
  /** Official weekly rate with driver (KES). Null = quote on request. */
  hireWeeklyRate: number | null;
  transferFrom: number;
  halfDayFrom: number;
  /** Coaster & similar — no fixed calculator total. */
  quoteOnRequest?: boolean;
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
    hireWeeklyRate: 25_000,
    transferFrom: 4500,
    halfDayFrom: 5000,
    suitability: "VIP Airport Meet & Greets & Executive Corporate Transfers",
    highlight: "Our most requested executive hire along the coast",
    bestFor: ["VIP airport", "Executive meetings", "Luxury resort transfers"],
  },
  {
    model: "Toyota Esquire",
    type: "Executive Luxury MPV",
    seats: "7 premium seats",
    maxPassengers: 6,
    luggage: "4 large bags",
    hireWeeklyRate: 18_000,
    transferFrom: 4000,
    halfDayFrom: 4000,
    suitability: "Direct Resort Shuttles & Luxury Tourist Excursions",
    highlight: "Extremely popular for Watamu and Diani boutique transfers",
    bestFor: ["Watamu & Diani shuttles", "Boutique hotels", "Family groups"],
  },
  {
    model: "Toyota Voxy",
    type: "Luxury Family MPV",
    seats: "7–8 seats",
    maxPassengers: 7,
    luggage: "5 bags",
    hireWeeklyRate: 18_000,
    transferFrom: 3500,
    halfDayFrom: 3500,
    suitability: "Coastal Day Trips & Family Hotel-to-Hotel Transfers",
    highlight: "Consistent daily bookings for family coastal holidays",
    bestFor: ["Coastal day trips", "Hotel hops", "Small families"],
  },
  {
    model: "Toyota Noah",
    type: "Premium Comfort MPV",
    seats: "7–8 seats",
    maxPassengers: 7,
    luggage: "5 bags",
    hireWeeklyRate: 18_000,
    transferFrom: 3200,
    halfDayFrom: 3200,
    suitability: "SGR Terminus Shuttles & Local Mombasa Old Town Excursions",
    highlight: "Excellent value for groups wanting comfort without premium MPV rates",
    bestFor: ["SGR & city runs", "Old Town tours", "Value-conscious groups"],
  },
  {
    model: "Toyota Hiace",
    type: "Hiace 9L · 16 Seater",
    seats: "16 seats",
    maxPassengers: 16,
    luggage: "16 bags",
    hireWeeklyRate: 30_000,
    transferFrom: 5000,
    halfDayFrom: 4500,
    suitability: "Tsavo East Safaris & High-Capacity Corporate Events",
    highlight: "Toyota Hiace 9L — 16-seater weekly hire along the coast",
    bestFor: ["Group transfers", "Tsavo safaris", "Team outings"],
  },
  {
    model: "Toyota Prado",
    type: "Premium 4×4 Safari SUV",
    seats: "7 seats (4×4)",
    maxPassengers: 6,
    luggage: "4 bags + gear",
    hireWeeklyRate: null,
    hireDailyRate: 9000,
    transferFrom: 5500,
    halfDayFrom: 5500,
    suitability: "Safari Game Drives & Rough Coastal Terrains (Tsavo/Amboseli)",
    highlight: "Top choice for premium safari excursions departing the coast",
    bestFor: ["Game drives", "Rough roads", "Safari packages"],
  },
  {
    model: "Toyota Coaster",
    type: "Group Coaster Bus",
    seats: "23–30 seats",
    maxPassengers: 28,
    luggage: "Group cargo",
    hireWeeklyRate: null,
    hireDailyRate: 0,
    transferFrom: 8000,
    halfDayFrom: 7000,
    quoteOnRequest: true,
    suitability: "School Trips, Church Events, Wedding Fleets & Large Corporate Groups",
    highlight: "Rate depends on the job — contact us for Coaster availability & pricing",
    bestFor: ["Weddings", "Church & school trips", "Large corporate groups"],
  },
] as const;

function dailyFromWeekly(weekly: number): number {
  return Math.round(weekly / 6);
}

export const HIRE_VEHICLES: HireVehicleSpec[] = specs.map((s) => {
  const hireDailyRate =
    "hireDailyRate" in s && s.hireDailyRate != null
      ? s.hireDailyRate
      : s.hireWeeklyRate != null
        ? dailyFromWeekly(s.hireWeeklyRate)
        : 0;

  return {
    ...s,
    hireDailyRate,
    shortName: s.model.replace("Toyota ", ""),
    gallery: fleetGalleryFor(s.model),
  };
});

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
  { id: "half-day", label: "Half day", description: "4 hours — weddings, meetings, city", emoji: "🕐" },
  { id: "full-day", label: "Full day", description: "8 hours — full coastal itinerary", emoji: "☀️" },
  { id: "multi-day", label: "Multi-day / weekly", description: "Weekly hire — best value for 7+ days", emoji: "📅" },
  { id: "wedding", label: "Wedding & events", description: "Decor-ready fleet for your special day", emoji: "💒" },
  { id: "safari", label: "Safari hire", description: "Tsavo, Shimba, or custom game-drive routes", emoji: "🦁" },
  { id: "corporate", label: "Corporate / group", description: "Teams, conferences, and delegate transport", emoji: "💼" },
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

export type HireDriverOption = "with-driver" | "self-drive";

export type HireEstimate = {
  driverOption: HireDriverOption;
  purpose: HirePurposeId;
  days: number;
  total: number;
  vehicleSubtotal: number;
  driverFee: number;
  mpesaDeposit?: number;
  customQuote?: boolean;
  priceNote?: string;
  weeksBilled?: number;
};

/** Bill by full weeks + extra days at weekly ÷ 6 (with driver). */
export function weeklyHireTotal(weeklyRate: number, days: number): number {
  const d = Math.max(1, days);
  const weeks = Math.floor(d / 7);
  const remainder = d % 7;
  const dayRate = Math.round(weeklyRate / 6);
  return weeks * weeklyRate + remainder * dayRate;
}

function usesWeeklyPricing(purpose: HirePurposeId, days: number): boolean {
  return (
    purpose === "multi-day" ||
    purpose === "safari" ||
    purpose === "corporate" ||
    (purpose === "wedding" && days >= 3)
  );
}

function withDriverTotal(vehicle: HireVehicleSpec, purpose: HirePurposeId, days: number): number | null {
  if (vehicle.quoteOnRequest) return null;

  const d = Math.max(1, days);
  const weekly = vehicle.hireWeeklyRate;

  if (weekly != null && usesWeeklyPricing(purpose, d)) {
    if (purpose === "wedding") {
      return Math.max(weeklyHireTotal(weekly, d), Math.round(weekly * 0.5));
    }
    if (purpose === "safari") {
      return Math.round(weeklyHireTotal(weekly, d) * 1.05);
    }
    return weeklyHireTotal(weekly, d);
  }

  switch (purpose) {
    case "transfer":
      return vehicle.transferFrom;
    case "half-day":
      return Math.max(vehicle.halfDayFrom, Math.round(vehicle.hireDailyRate * 0.55));
    case "full-day":
      return vehicle.hireDailyRate;
    case "multi-day":
    case "corporate":
      if (weekly != null) return weeklyHireTotal(weekly, d);
      return Math.round(vehicle.hireDailyRate * d * (d >= 3 ? 0.93 : 1));
    case "wedding":
      return Math.round(vehicle.hireDailyRate * 1.15);
    case "safari":
      if (weekly != null) return Math.round(weeklyHireTotal(weekly, d) * 1.05);
      return Math.round(vehicle.hireDailyRate * 1.1 * d);
    default:
      return 0;
  }
}

function selfDriveTotal(vehicle: HireVehicleSpec, purpose: HirePurposeId, days: number): number | null {
  const withDriver = withDriverTotal(vehicle, purpose, days);
  if (withDriver == null) return null;

  const multiplier =
    purpose === "transfer" ? 0.82 : purpose === "half-day" ? 0.78 : purpose === "wedding" ? 0.88 : 0.72;

  if (usesWeeklyPricing(purpose, days) && vehicle.hireWeeklyRate != null) {
    const weeklySelf = Math.round(vehicle.hireWeeklyRate * 0.72);
    const base = weeklyHireTotal(weeklySelf, days);
    return purpose === "safari" ? Math.round(base * 1.05) : base;
  }

  if (purpose === "multi-day" || purpose === "safari" || purpose === "corporate") {
    const dailySelf = Math.round(vehicle.hireDailyRate * 0.72);
    const discount = days >= 5 ? 0.9 : days >= 3 ? 0.92 : 1;
    const safariBump = purpose === "safari" ? 1.05 : 1;
    return Math.round(dailySelf * days * discount * safariBump);
  }

  return Math.round(withDriver * multiplier);
}

export function estimateHirePrice(
  vehicle: HireVehicleSpec,
  purpose: HirePurposeId,
  days: number,
  driverOption: HireDriverOption = "with-driver"
): HireEstimate | null {
  const d = Math.max(1, days);

  if (vehicle.quoteOnRequest) {
    return {
      driverOption,
      purpose,
      days: d,
      total: 0,
      vehicleSubtotal: 0,
      driverFee: 0,
      customQuote: true,
      priceNote:
        "Coaster pricing depends on the job, route, and dates. We will quote on WhatsApp once you submit this request.",
    };
  }

  const withTotal = withDriverTotal(vehicle, purpose, d);
  const selfTotal = selfDriveTotal(vehicle, purpose, d);

  if (withTotal == null || selfTotal == null) return null;

  const weeksBilled = vehicle.hireWeeklyRate != null && usesWeeklyPricing(purpose, d) ? Math.ceil(d / 7) : undefined;

  const priceNote =
    vehicle.hireWeeklyRate != null && usesWeeklyPricing(purpose, d)
      ? `Weekly rate KES ${vehicle.hireWeeklyRate.toLocaleString()}/week (with driver) · ${d} day(s) billed`
      : undefined;

  if (driverOption === "self-drive") {
    const deposit = Math.max(8000, Math.round(selfTotal * 0.35));
    return {
      driverOption,
      purpose,
      days: d,
      total: selfTotal,
      vehicleSubtotal: selfTotal,
      driverFee: 0,
      mpesaDeposit: deposit,
      weeksBilled,
      priceNote,
    };
  }

  return {
    driverOption,
    purpose,
    days: d,
    total: withTotal,
    vehicleSubtotal: selfTotal,
    driverFee: Math.max(0, withTotal - selfTotal),
    weeksBilled,
    priceNote,
  };
}

export function estimateHireTotal(
  vehicle: HireVehicleSpec,
  purpose: HirePurposeId,
  days: number,
  driverOption: HireDriverOption = "with-driver"
): number | null {
  const est = estimateHirePrice(vehicle, purpose, days, driverOption);
  if (!est || est.customQuote) return null;
  return est.total;
}

export function purposeNeedsEndDate(purpose: HirePurposeId): boolean {
  return purpose === "multi-day" || purpose === "safari" || purpose === "corporate";
}

export function formatWeeklyRate(vehicle: HireVehicleSpec): string | null {
  if (vehicle.quoteOnRequest) return "Quote on request";
  if (vehicle.hireWeeklyRate == null) return null;
  return `KES ${vehicle.hireWeeklyRate.toLocaleString()}/week`;
}
