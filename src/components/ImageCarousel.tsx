"use client";

import { useState } from "react";
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
  const [active, setActive] = useState(0);

  if (available.length === 0) {
    return (
      <div className="w-full aspect-[16/10] rounded-xl bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">No image available</span>
      </div>
    );
  }

  // Check if all images are actually different
  const uniqueUrls = new Set(available.map((v) => images[v.key]));
  const hasMultipleViews = uniqueUrls.size > 1;

  return (
    <div className="w-full space-y-3">
      {/* Main large image */}
      <div className="w-full rounded-xl overflow-hidden border border-border bg-black/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[available[active].key]}
          alt={`${altText} - ${available[active].label}`}
          className="w-full h-auto min-h-[280px] max-h-[420px] object-contain"
          loading="eager"
        />
      </div>

      {/* Thumbnail strip — only show if we have different images */}
      {hasMultipleViews && (
        <div className="grid grid-cols-3 gap-2">
          {available.map((v, i) => (
            <button
              key={v.key}
              onClick={() => setActive(i)}
              className={cn(
                "relative rounded-lg overflow-hidden border-2 transition-all",
                i === active
                  ? "border-primary ring-1 ring-primary/30"
                  : "border-border/50 opacity-60 hover:opacity-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[v.key]}
                alt={`${altText} - ${v.label}`}
                className="w-full aspect-[16/10] object-cover"
                loading="eager"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/60 text-[10px] font-medium text-white/80 text-center py-0.5 uppercase tracking-wider">
                {v.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
