import { fleetGalleryFor, type FleetImageSet } from "./fleetImages";

export type HireVehicleSpec = {
  model: string;
  shortName: string;
  type: string;
  seats: string;
  maxPassengers: number;
  luggage: string;
  hireDailyRate: number;
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
    hireDailyRate: 8500,
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
    hireDailyRate: 6500,
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
    hireDailyRate: 5500,
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
    hireDailyRate: 5000,
    transferFrom: 3200,
    halfDayFrom: 3200,
    suitability: "SGR Terminus Shuttles & Local Mombasa Old Town Excursions",
    highlight: "Excellent value for groups wanting comfort without premium MPV rates",
    bestFor: ["SGR & city runs", "Old Town tours", "Value-conscious groups"],
  },
  {
    model: "Toyota Hiace",
    type: "Safari & Group Shuttle",
    seats: "14 seats",
    maxPassengers: 14,
    luggage: "14 bags",
    hireDailyRate: 7500,
    transferFrom: 5000,
    halfDayFrom: 4500,
    suitability: "Tsavo East Safaris & High-Capacity Corporate Events",
    highlight: "High demand during safari peak seasons from Watamu & Diani",
    bestFor: ["Group transfers", "Tsavo safaris", "Team outings"],
  },
  {
    model: "Toyota Prado",
    type: "Premium 4×4 Safari SUV",
    seats: "7 seats (4×4)",
    maxPassengers: 6,
    luggage: "4 bags + gear",
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
    hireDailyRate: 12000,
    transferFrom: 8000,
    halfDayFrom: 7000,
    suitability: "School Trips, Church Events, Wedding Fleets & Large Corporate Groups",
    highlight: "Best for high-capacity group transport and wedding convoys",
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
  { id: "half-day", label: "Half day", description: "4 hours with chauffeur — weddings, meetings, city", emoji: "🕐" },
  { id: "full-day", label: "Full day", description: "8 hours — full coastal itinerary at your pace", emoji: "☀️" },
  { id: "multi-day", label: "Multi-day", description: "2+ days — safaris, road trips, extended hire", emoji: "📅" },
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

export function estimateHirePrice(
  vehicle: HireVehicleSpec,
  purpose: HirePurposeId,
  days: number
): number | null {
  const d = Math.max(1, days);

  switch (purpose) {
    case "transfer":
      return vehicle.transferFrom;
    case "half-day":
      return Math.max(vehicle.halfDayFrom, Math.round(vehicle.hireDailyRate * 0.55));
    case "full-day":
      return vehicle.hireDailyRate;
    case "multi-day": {
      const discount = d >= 5 ? 0.9 : d >= 3 ? 0.92 : 1;
      return Math.round(vehicle.hireDailyRate * d * discount);
    }
    case "wedding":
      return Math.round(vehicle.hireDailyRate * 1.15);
    case "safari":
      return Math.round(vehicle.hireDailyRate * 1.1 * d);
    case "corporate":
      return Math.round(vehicle.hireDailyRate * d * (d >= 3 ? 0.93 : 1));
    default:
      return null;
  }
}

export function purposeNeedsEndDate(purpose: HirePurposeId): boolean {
  return purpose === "multi-day" || purpose === "safari" || purpose === "corporate";
}
