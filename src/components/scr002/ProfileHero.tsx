"use client";

import { useState } from "react";
import Image from "next/image";
import {
  representativeProfile,
  TOTAL_TRIPS_LABEL,
  TOTAL_COUNTRIES_LABEL,
} from "@/data/profile";

const THIRD_METRIC = representativeProfile.metrics.find(
  (metric) =>
    metric.label !== TOTAL_TRIPS_LABEL &&
    metric.label !== TOTAL_COUNTRIES_LABEL,
);

export function ProfileHero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="flex min-h-[480px] flex-col justify-center gap-lg bg-surface-soft px-gutter-mobile py-section-mobile-min md:min-h-[540px] md:max-h-[620px] md:flex-row md:items-center md:px-gutter-desktop md:py-section-desktop-min">
      <div className="relative h-56 w-full overflow-hidden rounded-md md:h-72 md:w-1/2">
        {!imageLoaded ? (
          <div className="absolute inset-0 animate-pulse bg-hairline" />
        ) : null}
        <Image
          src={representativeProfile.heroImageUrl}
          alt={representativeProfile.heroImageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          unoptimized
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="flex flex-1 flex-col gap-md">
        <h1 className="text-display-xl-mobile font-bold text-ink md:text-display-xl">
          {representativeProfile.name}
        </h1>
        <p className="text-body-md text-body">
          {representativeProfile.tagline}
        </p>

        <div className="flex flex-wrap gap-md">
          {[
            { label: TOTAL_TRIPS_LABEL, value: TOTAL_TRIPS_LABEL },
            { label: TOTAL_COUNTRIES_LABEL, value: TOTAL_COUNTRIES_LABEL },
            ...(THIRD_METRIC
              ? [{ label: THIRD_METRIC.label, value: THIRD_METRIC.label }]
              : []),
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-md border border-hairline bg-canvas px-lg py-md text-center"
            >
              <p className="text-title font-semibold text-primary">
                {metric.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
