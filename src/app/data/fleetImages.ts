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

export function fleetImagesFor(model: string): string[] {
  const slug = FLEET_SLUGS[model];
  if (!slug) return [];
  return Array.from({ length: FLEET_IMAGE_COUNT }, (_, i) => `/fleet/${slug}/${i + 1}.jpg`);
}
