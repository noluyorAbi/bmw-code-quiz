"use client";

import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: {
    front: string;
    side: string;
    rear: string;
  };
  altText: string;
}

const views = [
  { key: "front" as const, label: "Front" },
  { key: "side" as const, label: "Side" },
  { key: "rear" as const, label: "Rear" },
];

export default function ImageCarousel({ images, altText }: ImageCarouselProps) {
  const available = views.filter((v) => images[v.key]);

  if (available.length === 0) {
    return (
      <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">No image available</span>
      </div>
    );
  }

  const uniqueUrls = new Set(available.map((v) => images[v.key]));
  const hasMultipleViews = uniqueUrls.size > 1;

  if (!hasMultipleViews) {
    return (
      <div className="w-full rounded-lg overflow-hidden border border-border bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[available[0].key]}
          alt={altText}
          className="w-full h-full object-contain"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div className="w-full grid grid-rows-3 gap-1.5 h-full">
      {available.map((v) => (
        <div
          key={v.key}
          className={cn(
            "relative rounded-lg overflow-hidden border border-border bg-black/40"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[v.key]}
            alt={`${altText} - ${v.label}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <span className="absolute top-1 left-1.5 bg-black/60 text-[9px] font-medium text-white/70 px-1.5 py-0.5 rounded uppercase tracking-wider">
            {v.label}
          </span>
        </div>
      ))}
    </div>
  );
}
