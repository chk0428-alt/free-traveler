"use client";

import { useState } from "react";
import Image from "next/image";
import { representativeProfile } from "@/data/profile";

function GalleryItem({ url, alt }: { url: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-md bg-surface-soft">
      {hasError ? (
        <div className="flex h-full w-full items-center justify-center p-md text-center text-body-sm text-muted">
          {alt}
        </div>
      ) : (
        <Image
          src={url}
          alt={alt}
          fill
          sizes="(min-width: 768px) 25vw, 50vw"
          className="object-cover"
          unoptimized
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}

export function Gallery() {
  return (
    <section className="mx-auto w-full max-w-content-desktop-max bg-surface-soft px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
      <h2 className="mb-lg text-display-lg-mobile font-bold text-ink md:text-display-lg">
        Gallery
      </h2>
      <div className="grid grid-cols-2 gap-md md:grid-cols-4">
        {representativeProfile.gallery.map((image) => (
          <GalleryItem key={image.url} url={image.url} alt={image.alt} />
        ))}
      </div>
    </section>
  );
}
