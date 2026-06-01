/** Public fleet gallery paths — images from Wikimedia Commons (CC-licensed). */

export const FLEET_SLUGS: Record<string, string> = {
  "Toyota Alphard": "alphard",
  "Toyota Esquire": "esquire",
  "Toyota Voxy": "voxy",
  "Toyota Noah": "noah",
  "Toyota Hiace": "hiace",
  "Toyota Prado": "prado",
  "Toyota Coaster": "coaster",
};

export const FLEET_IMAGE_COUNT = 5;

export type FleetImageSet = {
  /** Full-size JPEG fallback */
  fallback: string;
  /** ~960px WebP for hero display */
  hero: string;
  /** ~200px WebP for thumbnails & instant preview */
  thumb: string;
};

export function fleetImageSet(model: string, index: number): FleetImageSet {
  const slug = FLEET_SLUGS[model];
  const n = index + 1;
  const base = `/fleet/${slug}/${n}`;
  return {
    fallback: `${base}.jpg`,
    hero: `${base}-hero.webp`,
    thumb: `${base}-thumb.webp`,
  };
}

export function fleetGalleryFor(model: string): FleetImageSet[] {
  return Array.from({ length: FLEET_IMAGE_COUNT }, (_, i) => fleetImageSet(model, i));
}

/** @deprecated Use fleetGalleryFor — kept for simple path lists */
export function fleetImagesFor(model: string): string[] {
  return fleetGalleryFor(model).map((img) => img.hero);
}
