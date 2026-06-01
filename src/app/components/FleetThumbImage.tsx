import { useState } from "react";
import { cn } from "./ui/utils";
import type { OptimizedImageSet } from "../data/optimizedImages";

type FleetThumbImageProps = {
  image: OptimizedImageSet;
  alt: string;
  className?: string;
};

/** Lightweight thumbnail — only loads the small WebP variant. */
export function FleetThumbImage({ image, alt, className }: FleetThumbImageProps) {
  const [ready, setReady] = useState(false);

  return (
    <div className={cn("relative h-full w-full bg-gray-800", className)}>
      {!ready && (
        <div className="absolute inset-0 animate-pulse bg-gray-700" aria-hidden />
      )}
      <img
        src={image.thumb}
        alt={alt}
        width={200}
        height={150}
        loading="lazy"
        decoding="async"
        onLoad={() => setReady(true)}
        className={cn(
          "h-full w-full object-cover transition-opacity duration-200",
          ready ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
