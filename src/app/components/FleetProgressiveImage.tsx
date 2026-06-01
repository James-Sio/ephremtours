import { useEffect, useState } from "react";
import { cn } from "./ui/utils";
import type { OptimizedImageSet } from "../data/optimizedImages";

type FleetProgressiveImageProps = {
  image: OptimizedImageSet;
  alt: string;
  className?: string;
  /** Hero: eager + high priority. Thumbs: lazy. */
  priority?: boolean;
  sizes?: string;
};

export function FleetProgressiveImage({
  image,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: FleetProgressiveImageProps) {
  const [heroReady, setHeroReady] = useState(false);
  const [thumbReady, setThumbReady] = useState(false);

  useEffect(() => {
    setHeroReady(false);
    setThumbReady(false);

    const thumb = new Image();
    thumb.decoding = "async";
    thumb.src = image.thumb;
    thumb.onload = () => setThumbReady(true);

    const hero = new Image();
    hero.decoding = "async";
    if (priority && "fetchPriority" in hero) {
      (hero as HTMLImageElement & { fetchPriority: string }).fetchPriority = "high";
    }
    hero.src = image.hero;
    hero.onload = () => setHeroReady(true);
    hero.onerror = () => {
      hero.src = image.fallback;
    };

    return () => {
      thumb.onload = null;
      hero.onload = null;
      hero.onerror = null;
    };
  }, [image.hero, image.thumb, image.fallback, priority]);

  const showPlaceholder = !thumbReady && !heroReady;

  return (
    <div className={cn("relative overflow-hidden bg-gray-800", className)}>
      {showPlaceholder && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"
          aria-hidden
        />
      )}

      {thumbReady && !heroReady && (
        <img
          src={image.thumb}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover scale-105 blur-sm brightness-90"
          decoding="async"
        />
      )}

      <picture className="absolute inset-0 block">
        <source type="image/webp" srcSet={image.hero} sizes={sizes} />
        <img
          src={image.fallback}
          alt={alt}
          width={960}
          height={600}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            heroReady ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setHeroReady(true)}
        />
      </picture>
    </div>
  );
}
