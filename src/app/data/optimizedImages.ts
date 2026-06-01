/** Responsive WebP variants served from /public (hero + thumb + original fallback). */

export type OptimizedImageSet = {
  fallback: string;
  hero: string;
  thumb: string;
};

/** Build optimized paths from a public URL like `/tourImages/1.png` or `/fleet/alphard/1.jpg`. */
export function publicImageSet(publicPath: string): OptimizedImageSet {
  const base = publicPath.replace(/\.(png|jpe?g|webp)$/i, "");
  return {
    fallback: publicPath,
    hero: `${base}-hero.webp`,
    thumb: `${base}-thumb.webp`,
  };
}

export function publicImageSets(paths: string[]): OptimizedImageSet[] {
  return paths.map(publicImageSet);
}
