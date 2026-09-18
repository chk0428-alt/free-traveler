"use client";

import Link from "next/link";
import { useState } from "react";

export type DestinationScope = "all" | "domestic" | "overseas";

export type DestinationFilters = {
  scope: DestinationScope;
  country: string;
  city: string;
  season: string;
  themes: string[];
  startDate: string;
  endDate: string;
};

const DEFAULT_FILTERS: DestinationFilters = {
  scope: "all",
  country: "",
  city: "",
  season: "",
  themes: [],
  startDate: "",
  endDate: "",
};

const SEASON_OPTIONS = ["봄", "여름", "가을", "겨울"];
const THEME_OPTIONS = ["자연", "역사", "미식", "해변", "도심", "휴양"];

export type HeroProps = {
  /** 필터 변경 시마다(모든 항목 AND 조합) 호출된다. 없으면 이 컴포넌트만으로도 동작한다. */
  onFilterChange?: (filters: DestinationFilters) => void;
  /** 부모가 실제 필터링된 개수를 알려주면 0건 안내 배너를 표시한다. */
  resultCount?: number;
};

export function Hero({ onFilterChange, resultCount }: HeroProps) {
  const [filters, setFilters] = useState<DestinationFilters>(DEFAULT_FILTERS);

  function emit(next: DestinationFilters) {
    setFilters(next);
    onFilterChange?.(next);
  }

  function toggleTheme(theme: string) {
    const themes = filters.themes.includes(theme)
      ? filters.themes.filter((item) => item !== theme)
      : [...filters.themes, theme];
    emit({ ...filters, themes });
  }

  function resetFilters() {
    emit(DEFAULT_FILTERS);
  }

  const showEmptyGuidance = resultCount === 0;

  return (
    <section className="flex min-h-[480px] flex-col justify-center gap-lg bg-surface-soft px-gutter-mobile py-section-mobile-min md:min-h-[540px] md:max-h-[620px] md:px-gutter-desktop md:py-section-desktop-min">
      <div className="mx-auto flex w-full max-w-content-desktop-max flex-col gap-lg">
        <div className="flex flex-col gap-sm text-center md:text-left">
          <h1 className="text-display-xl-mobile font-bold text-ink md:text-display-xl">
            어디로, 언제 떠나볼까요?
          </h1>
          <p className="text-body-md text-body">
            국내·해외 여행지를 조건으로 찾아보고, 여행 준비까지 한 번에
            이어가세요.
          </p>
        </div>

        <div
          role="group"
          aria-label="국내/해외 구분"
          className="flex justify-center gap-sm md:justify-start"
        >
          {(
            [
              { value: "all", label: "전체" },
              { value: "domestic", label: "국내" },
              { value: "overseas", label: "해외" },
            ] as const
          ).map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => emit({ ...filters, scope: option.value })}
              aria-pressed={filters.scope === option.value}
              className={
                filters.scope === option.value
                  ? "rounded-full bg-primary-tint px-lg py-sm text-btn font-semibold text-primary"
                  : "rounded-full px-lg py-sm text-btn font-semibold text-muted"
              }
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-sm rounded-md border border-hairline bg-canvas p-md shadow-none lg:flex-row lg:items-center lg:gap-md lg:rounded-full lg:py-sm">
          <input
            type="text"
            placeholder="국가"
            value={filters.country}
            onChange={(event) =>
              emit({ ...filters, country: event.target.value })
            }
            className="h-12 min-w-0 flex-1 rounded-sm border border-hairline px-md text-body-md text-ink lg:rounded-full lg:border-0"
            aria-label="국가"
          />
          <input
            type="text"
            placeholder="도시/지역"
            value={filters.city}
            onChange={(event) => emit({ ...filters, city: event.target.value })}
            className="h-12 min-w-0 flex-1 rounded-sm border border-hairline px-md text-body-md text-ink lg:rounded-full lg:border-0"
            aria-label="도시 또는 지역"
          />
          <select
            value={filters.season}
            onChange={(event) =>
              emit({ ...filters, season: event.target.value })
            }
            className="h-12 min-w-0 rounded-sm border border-hairline px-md text-body-md text-ink lg:rounded-full lg:border-0"
            aria-label="계절"
          >
            <option value="">계절 전체</option>
            {SEASON_OPTIONS.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
          <div className="flex gap-sm lg:contents">
            <input
              type="date"
              value={filters.startDate}
              onChange={(event) =>
                emit({ ...filters, startDate: event.target.value })
              }
              className="h-12 min-w-0 flex-1 rounded-sm border border-hairline px-md text-body-md text-ink lg:flex-none lg:rounded-full lg:border-0"
              aria-label="여행 시작일"
            />
            <input
              type="date"
              value={filters.endDate}
              onChange={(event) =>
                emit({ ...filters, endDate: event.target.value })
              }
              className="h-12 min-w-0 flex-1 rounded-sm border border-hairline px-md text-body-md text-ink lg:flex-none lg:rounded-full lg:border-0"
              aria-label="여행 종료일"
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-sm md:justify-start">
          {THEME_OPTIONS.map((theme) => {
            const selected = filters.themes.includes(theme);
            return (
              <button
                key={theme}
                type="button"
                onClick={() => toggleTheme(theme)}
                aria-pressed={selected}
                className={
                  selected
                    ? "rounded-full bg-primary-tint px-md py-xs text-body-sm font-semibold text-primary"
                    : "rounded-full bg-surface-soft px-md py-xs text-body-sm text-ink"
                }
              >
                {theme}
              </button>
            );
          })}
        </div>

        {showEmptyGuidance ? (
          <div className="flex flex-col items-center gap-sm rounded-sm border border-hairline bg-canvas p-md text-center md:flex-row md:justify-between md:text-left">
            <p className="text-body-sm text-body">
              조건에 맞는 여행지가 없습니다. 조건을 완화하거나 초기화해 보세요.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="text-btn font-semibold text-primary"
            >
              필터 초기화
            </button>
          </div>
        ) : null}

        <div className="flex justify-center md:justify-start">
          <Link
            href="/travel-tools"
            className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
          >
            여행 준비 시작하기
          </Link>
        </div>
      </div>
    </section>
  );
}
