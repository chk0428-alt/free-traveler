"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  representativeProfile,
  TOTAL_TRIPS_LABEL,
  TOTAL_COUNTRIES_LABEL,
} from "@/data/profile";
import {
  isFavoriteDestination,
  toggleFavoriteDestination,
} from "@/lib/client/favorites";
import { showToast } from "@/components/ui/Toast";

const FAVORITE_ID = "founder-profile";

export function FounderSummary() {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // localStorage는 클라이언트에만 존재하는 외부 저장소라 마운트 후 동기화한다
    // (SSR과의 초기 렌더 불일치를 피하기 위해 useState 초기값은 항상 false로 둔다).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFavorite(isFavoriteDestination(FAVORITE_ID));
  }, []);

  function handleToggleFavorite() {
    toggleFavoriteDestination(FAVORITE_ID);
    const next = isFavoriteDestination(FAVORITE_ID);
    setIsFavorite(next);
    showToast(next ? "즐겨찾기에 추가했습니다." : "즐겨찾기를 해제했습니다.");
  }

  return (
    <section className="mx-auto flex w-full max-w-content-desktop-max flex-col gap-lg px-gutter-mobile py-section-mobile-min md:flex-row md:items-center md:px-gutter-desktop md:py-section-desktop-min">
      <div className="relative h-64 w-full overflow-hidden rounded-md md:h-80 md:w-1/2">
        <Image
          src={representativeProfile.heroImageUrl}
          alt={representativeProfile.heroImageAlt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col gap-md">
        <h2 className="text-display-lg-mobile font-bold text-ink md:text-display-lg">
          {representativeProfile.name}
        </h2>
        <p className="text-body-md text-body">
          {representativeProfile.tagline}
        </p>

        <div className="flex gap-lg">
          <div>
            <p className="text-title font-semibold text-primary">
              {TOTAL_TRIPS_LABEL}
            </p>
          </div>
          <div>
            <p className="text-title font-semibold text-primary">
              {TOTAL_COUNTRIES_LABEL}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-sm">
          <Link
            href="/about"
            className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
          >
            대표 소개 보러 가기
          </Link>
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-pressed={isFavorite}
            className="flex h-12 items-center justify-center rounded-sm border border-ink px-lg text-btn font-semibold text-ink"
          >
            {isFavorite ? "★ 즐겨찾기됨" : "☆ 즐겨찾기"}
          </button>
        </div>
      </div>
    </section>
  );
}
