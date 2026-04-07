"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: { front: string; side: string; rear: string };
  altText: string;
  overlayTitle?: string;
}

const views = [
  { key: "front" as const, label: "FRONT" },
  { key: "side" as const, label: "SIDE" },
  { key: "rear" as const, label: "REAR" },
];

export default function ImageCarousel({ images, altText, overlayTitle }: ImageCarouselProps) {
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
      <div className="relative aspect-[16/9] w-full bg-[#0c0e11] rounded-xl overflow-hidden group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[activeView]}
          alt={`${altText} - ${activeView}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e11]/80 to-transparent" />
        {overlayTitle && (
          <div className="absolute bottom-6 left-6">
            <h2 className="text-3xl md:text-4xl font-black font-[family-name:var(--font-display)] tracking-tighter uppercase italic text-white leading-none">
              {overlayTitle}
            </h2>
            <p className="font-mono text-xs text-primary-container tracking-widest mt-2">
              ENCRYPTED DATA STREAM... ACTIVE
            </p>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-4">
        {available.map((v) => (
          <button
            key={v.key}
            onClick={() => setActiveView(v.key)}
            className={cn(
              "relative aspect-video rounded overflow-hidden transition-all",
              activeView === v.key
                ? "border-2 border-primary-container ring-offset-2 ring-offset-background"
                : "border border-border opacity-40 hover:opacity-100 hover:border-foreground/20"
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[v.key]}
              alt={`${altText} - ${v.label}`}
              className={cn("w-full h-full object-cover", activeView === v.key ? "opacity-80" : "")}
              loading="eager"
            />
            <div className="absolute bottom-2 left-2 text-[8px] font-mono text-white bg-black/50 px-1">
              VIEW_{v.label}.JPG
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
