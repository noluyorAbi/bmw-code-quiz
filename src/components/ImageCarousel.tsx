"use client";

import Image from "next/image";
import { useState } from "react";

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

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden bg-base-300">
        {validImages.map((key, i) => (
          <div
            key={key}
            className={`absolute inset-0 transition-opacity duration-300 ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={images[key]}
              alt={`${altText} - ${labels[keys.indexOf(key)]}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
              unoptimized
            />
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {validImages.map((key, i) => (
          <button
            key={key}
            className={`btn btn-sm ${
              i === activeIndex ? "btn-primary" : "btn-ghost"
            }`}
            onClick={() => setActiveIndex(i)}
          >
            {labels[keys.indexOf(key)]}
          </button>
        ))}
      </div>
    </div>
  );
}
