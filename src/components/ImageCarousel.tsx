"use client";

interface ImageCarouselProps {
  images: {
    front: string;
    side: string;
    rear: string;
  };
  altText: string;
}

export default function ImageCarousel({ images, altText }: ImageCarouselProps) {
  const src = images.front || images.side || images.rear;

  if (!src) {
    return (
      <div className="w-full aspect-[16/10] rounded-xl bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">No image available</span>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border bg-muted">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={altText}
        className="w-full h-auto min-h-[280px] max-h-[420px] object-contain bg-black/40"
        loading="eager"
      />
    </div>
  );
}
