/** Central contact & main office location — update street line when you have the exact address. */

export const MAIN_OFFICE = {
  name: "Ephream Tours — Main Office",
  street: "Malindi Town Centre, Lamu Road area",
  city: "Malindi",
  county: "Kilifi County",
  country: "Kenya",
  postalCode: "80200",
  /** Malindi town centre — used for map pin & turn-by-turn navigation */
  lat: -3.2138,
  lng: 40.1165,
  serviceArea: "Diani · Mombasa · Kilifi · Watamu · Malindi",
  hours: "Open daily · 24/7 booking line",
} as const;

export const CONTACT_PHONES = [
  { label: "Primary", display: "+254 701 738 725", tel: "+254701738725" },
  { label: "Secondary", display: "+254 736 070 030", tel: "+254736070030" },
] as const;

export const CONTACT_EMAIL = "info@ephremtours.co.ke";
export const CONTACT_WEBSITE = "www.ephremtours.co.ke";
export const MPESA_TILL = "5669756";

export function officeAddressLines(): string[] {
  return [
    MAIN_OFFICE.street,
    `${MAIN_OFFICE.city}, ${MAIN_OFFICE.county}`,
    `${MAIN_OFFICE.country} ${MAIN_OFFICE.postalCode}`,
  ];
}

export function officeAddressSingleLine(): string {
  return `${MAIN_OFFICE.street}, ${MAIN_OFFICE.city}, ${MAIN_OFFICE.country}`;
}

/** Google Maps embed (no API key required). */
export function googleMapsEmbedUrl(): string {
  const { lat, lng } = MAIN_OFFICE;
  return `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`;
}

/** Turn-by-turn directions (opens Google Maps app on mobile). */
export function googleMapsDirectionsUrl(): string {
  const { lat, lng } = MAIN_OFFICE;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
}

export function googleMapsViewUrl(): string {
  const { lat, lng } = MAIN_OFFICE;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function appleMapsDirectionsUrl(): string {
  const { lat, lng } = MAIN_OFFICE;
  return `https://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
}
