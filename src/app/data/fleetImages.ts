import type { OptimizedImageSet } from "./optimizedImages";
import { publicImageSet } from "./optimizedImages";

export type { OptimizedImageSet };
export type FleetImageSet = OptimizedImageSet;

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

export function fleetImageSet(model: string, index: number): OptimizedImageSet {
  const slug = FLEET_SLUGS[model];
  const n = index + 1;
  return publicImageSet(`/fleet/${slug}/${n}.jpg`);
}

export function fleetGalleryFor(model: string): FleetImageSet[] {
  return Array.from({ length: FLEET_IMAGE_COUNT }, (_, i) => fleetImageSet(model, i));
}

/** @deprecated Use fleetGalleryFor — kept for simple path lists */
export function fleetImagesFor(model: string): string[] {
  return fleetGalleryFor(model).map((img) => img.hero);
}
