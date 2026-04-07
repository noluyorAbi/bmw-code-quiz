"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  loading?: "eager" | "lazy";
}

export default function SafeImage({ src, alt, className, fallbackClassName, loading = "eager" }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return fallbackClassName ? (
      <div className={cn("flex items-center justify-center", fallbackClassName)}>
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">NO_IMAGE_DATA</span>
      </div>
    ) : null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      onError={() => setFailed(true)}
    />
  );
}
