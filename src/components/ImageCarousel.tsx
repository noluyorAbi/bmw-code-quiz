"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ImageCarouselProps {
  images: {
    front: string;
    side: string;
    rear: string;
  };
  altText: string;
}

const labels = ["Front", "Side", "Rear"] as const;
const keys = ["front", "side", "rear"] as const;

export default function ImageCarousel({ images, altText }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const validImages = keys.filter((k) => images[k]);

  if (validImages.length === 0) {
    return (
      <div className="w-full aspect-[16/10] rounded-xl bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">No image available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-muted border border-border">
        {validImages.map((key, i) => (
          <div
            key={key}
            className={`absolute inset-0 transition-opacity duration-500 ${
              i === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[key]}
              alt={altText}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ))}
      </div>
      {validImages.length > 1 && (
        <div className="flex gap-1.5">
          {validImages.map((key, i) => (
            <Button
              key={key}
              variant={i === activeIndex ? "default" : "ghost"}
              size="sm"
              className={i === activeIndex ? "text-xs" : "text-xs text-muted-foreground"}
              onClick={() => setActiveIndex(i)}
            >
              {labels[keys.indexOf(key)]}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
