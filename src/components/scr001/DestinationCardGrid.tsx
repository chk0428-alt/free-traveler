"use client";

import Image from "next/image";
import type { Destination } from "@/data/destinations";
import { openDestinationDrawer } from "@/components/scr001/DestinationDrawer";

export type DestinationCardGridProps = {
  title: string;
  destinations: Destination[];
  /** 데이터 로드 전 스켈레톤을 보여줄 때 사용한다(정적 데이터라 기본은 false). */
  loading?: boolean;
  /** 생략하면 DestinationDrawer.tsx의 공유 상태를 통해 상세 Drawer를 연다. */
  onSelect?: (destination: Destination) => void;
};

function CardSkeleton() {
  return (
    <div className="flex flex-col gap-sm rounded-md border border-hairline bg-surface-soft p-md">
      <div className="h-40 w-full rounded-md bg-hairline" />
      <div className="h-4 w-2/3 rounded-sm bg-hairline" />
      <div className="h-3 w-1/3 rounded-sm bg-hairline" />
    </div>
  );
}

export function DestinationCardGrid({
  title,
  destinations,
  loading = false,
  onSelect,
}: DestinationCardGridProps) {
  return (
    <section className="mx-auto w-full max-w-content-desktop-max px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
      <h2 className="mb-lg text-display-lg-mobile font-bold text-ink md:text-display-lg">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-md md:grid-cols-3 md:gap-lg lg:grid-cols-4">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          : destinations.map((destination) => (
              <button
                key={destination.id}
                type="button"
                onClick={() =>
                  onSelect
                    ? onSelect(destination)
                    : openDestinationDrawer(destination)
                }
                data-testid={
                  destination.region === "overseas"
                    ? "destination-card-overseas"
                    : "destination-card-domestic"
                }
                className="flex flex-col overflow-hidden rounded-md border border-hairline bg-surface-card text-left hover:shadow-raised"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={destination.heroImageUrl}
                    alt={destination.heroImageAlt}
                    fill
                    sizes="(min-width: 768px) 25vw, 100vw"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex flex-col gap-xs p-md">
                  <p className="text-title font-semibold text-ink">
                    {destination.name}
                  </p>
                  <p className="text-body-sm text-muted">
                    {destination.country}
                  </p>
                  <div className="flex flex-wrap gap-xs">
                    {destination.themes.slice(0, 2).map((theme) => (
                      <span
                        key={theme}
                        className="rounded-full bg-surface-soft px-sm py-xs text-body-sm text-ink"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
      </div>
    </section>
  );
}
