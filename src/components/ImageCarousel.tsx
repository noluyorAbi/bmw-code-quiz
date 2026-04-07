"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: { front: string; side: string; rear: string };
  altText: string;
}

const views = [
  { key: "front" as const, label: "FRONT" },
  { key: "side" as const, label: "SIDE" },
  { key: "rear" as const, label: "REAR" },
];

export default function ImageCarousel({ images, altText }: ImageCarouselProps) {
  const available = views.filter((v) => images[v.key]);
  const [activeView, setActiveView] = useState(available[0]?.key ?? "front");

  if (available.length === 0) {
    return (
      <div className="w-full aspect-[16/9] rounded-xl bg-surface-container-low flex items-center justify-center border border-border">
        <span className="text-muted-foreground text-sm font-mono">NO_IMAGE_DATA</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/9] w-full bg-surface-container-low rounded-xl overflow-hidden group border border-border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[activeView]}
          alt={`${altText} - ${activeView}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <p className="font-mono text-[10px] text-primary-container tracking-[0.2em] uppercase">
            VIEW_{activeView.toUpperCase()}.JPG
          </p>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-3">
        {available.map((v) => {
          const uniqueUrls = new Set(available.map((av) => images[av.key]));
          const hasMultiple = uniqueUrls.size > 1;

          return (
            <button
              key={v.key}
              onClick={() => setActiveView(v.key)}
              className={cn(
                "relative aspect-video rounded-lg overflow-hidden transition-all",
                activeView === v.key
                  ? "border-2 border-primary-container ring-2 ring-primary-container/20"
                  : "border border-border hover:border-outline-variant opacity-60 hover:opacity-100"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={hasMultiple ? images[v.key] : images[available[0].key]}
                alt={`${altText} - ${v.label}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute bottom-1.5 left-2 text-[8px] font-mono text-white bg-black/50 px-1.5 py-0.5 rounded">
                VIEW_{v.label}.JPG
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
