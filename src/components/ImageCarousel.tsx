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
      <div className="w-full h-full rounded-2xl bg-muted/50 flex items-center justify-center border border-border">
        <span className="text-muted-foreground text-sm">No image available</span>
      </div>
    );
  }

  const uniqueUrls = new Set(available.map((v) => images[v.key]));
  const hasMultipleViews = uniqueUrls.size > 1;

  if (!hasMultipleViews) {
    return (
      <div className="w-full h-full rounded-2xl overflow-hidden border border-border bg-black/20">
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
    <div className="w-full grid grid-rows-3 gap-2 h-full">
      {available.map((v) => (
        <div
          key={v.key}
          className={cn(
            "relative rounded-xl overflow-hidden border border-border bg-black/20 group"
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[v.key]}
            alt={`${altText} - ${v.label}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />
          <span className="absolute top-1.5 left-2 bg-black/50 backdrop-blur-sm text-[9px] font-semibold text-white/70 px-2 py-0.5 rounded-md uppercase tracking-wider">
            {v.label}
          </span>
        </div>
      ))}
    </div>
  );
}
