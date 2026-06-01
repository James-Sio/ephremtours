import { useEffect, useRef } from "react";
import type { OptimizedImageSet } from "../data/optimizedImages";
import { fleetGalleryFor, FLEET_SLUGS } from "../data/fleetImages";

const cache = new Set<string>();

export function preloadUrl(url: string) {
  if (cache.has(url)) return;
  cache.add(url);
  const img = new Image();
  img.decoding = "async";
  img.src = url;
}

/** Preload thumb + hero WebPs for a vehicle model (deduped globally). */
export function preloadFleetModel(model: string) {
  for (const set of fleetGalleryFor(model)) {
    preloadUrl(set.thumb);
    preloadUrl(set.hero);
  }
}

/** Preload all fleet thumbs once (lightweight) for snappy tab switches. */
export function preloadAllFleetThumbs() {
  for (const model of Object.keys(FLEET_SLUGS)) {
    for (const set of fleetGalleryFor(model)) {
      preloadUrl(set.thumb);
    }
  }
}

/** Preload current model gallery; optionally warm other models after idle. */
export function useFleetPreload(activeModel: string, gallery: OptimizedImageSet[]) {
  const warmed = useRef(false);

  useEffect(() => {
    for (const set of gallery) {
      preloadUrl(set.thumb);
      preloadUrl(set.hero);
    }
  }, [activeModel, gallery]);

  useEffect(() => {
    if (warmed.current) return;
    warmed.current = true;
    preloadFleetModel(activeModel);

    const idle = window.requestIdleCallback?.(
      () => {
        for (const model of Object.keys(FLEET_SLUGS)) {
          if (model !== activeModel) preloadFleetModel(model);
        }
      },
      { timeout: 4000 }
    );

    return () => {
      if (idle != null) window.cancelIdleCallback?.(idle);
    };
  }, [activeModel]);
}
