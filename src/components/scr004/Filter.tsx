"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const TRAVEL_STYLE_OPTIONS = ["자연", "역사", "미식", "해변", "도심", "휴양"];
const AGE_BAND_OPTIONS = ["20대", "30대", "40대", "50대+"];
const GENDER_OPTIONS = ["무관", "여성", "남성"];
const STATUS_OPTIONS = [
  { value: "", label: "전체" },
  { value: "OPEN", label: "모집중" },
  { value: "CLOSED", label: "마감" },
];

export type MatePostFilterState = {
  countryId: string;
  ageBand: string;
  gender: string;
  travelStyles: string[];
  status: string;
};

export type FilterProps = {
  /** 필터 결과 개수(Page Owner가 서버에서 계산해 전달). */
  resultCount?: number;
};

function readFiltersFromParams(params: URLSearchParams): MatePostFilterState {
  return {
    countryId: params.get("countryId") ?? "",
    ageBand: params.get("ageBand") ?? "",
    gender: params.get("gender") ?? "",
    travelStyles: params.get("styles")?.split(",").filter(Boolean) ?? [],
    status: params.get("status") ?? "",
  };
}

export function Filter({ resultCount }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<MatePostFilterState>(() =>
    readFiltersFromParams(searchParams),
  );

  function applyFilters(next: MatePostFilterState) {
    setFilters(next);
    const params = new URLSearchParams();
    if (next.countryId) params.set("countryId", next.countryId);
    if (next.ageBand) params.set("ageBand", next.ageBand);
    if (next.gender) params.set("gender", next.gender);
    if (next.travelStyles.length > 0) {
      params.set("styles", next.travelStyles.join(","));
    }
    if (next.status) params.set("status", next.status);
    router.push(`/mates${params.toString() ? `?${params.toString()}` : ""}`);
  }

  function toggleStyle(style: string) {
    const travelStyles = filters.travelStyles.includes(style)
      ? filters.travelStyles.filter((item) => item !== style)
      : [...filters.travelStyles, style];
    applyFilters({ ...filters, travelStyles });
  }

  return (
    <section className="mx-auto w-full max-w-content-desktop-max px-gutter-mobile md:px-gutter-desktop">
      <div className="flex flex-col gap-md rounded-md border border-hairline bg-canvas p-lg">
        <div className="grid grid-cols-1 gap-md md:grid-cols-4">
          <label className="flex flex-col gap-xs text-body-sm text-body">
            국가
            <input
              aria-label="국가"
              value={filters.countryId}
              onChange={(event) =>
                applyFilters({ ...filters, countryId: event.target.value })
              }
              className="h-12 rounded-sm border border-hairline px-md text-body-md text-ink"
            />
          </label>

          <label className="flex flex-col gap-xs text-body-sm text-body">
            연령대
            <select
              aria-label="연령대"
              value={filters.ageBand}
              onChange={(event) =>
                applyFilters({ ...filters, ageBand: event.target.value })
              }
              className="h-12 rounded-sm border border-hairline px-md text-body-md text-ink"
            >
              <option value="">전체</option>
              {AGE_BAND_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-xs text-body-sm text-body">
            성별
            <select
              aria-label="성별"
              value={filters.gender}
              onChange={(event) =>
                applyFilters({ ...filters, gender: event.target.value })
              }
              className="h-12 rounded-sm border border-hairline px-md text-body-md text-ink"
            >
              {GENDER_OPTIONS.map((option) => (
                <option key={option} value={option === "무관" ? "" : option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-xs text-body-sm text-body">
            모집상태
            <select
              aria-label="모집상태"
              value={filters.status}
              onChange={(event) =>
                applyFilters({ ...filters, status: event.target.value })
              }
              className="h-12 rounded-sm border border-hairline px-md text-body-md text-ink"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="flex flex-wrap gap-sm">
          {TRAVEL_STYLE_OPTIONS.map((style) => {
            const selected = filters.travelStyles.includes(style);
            return (
              <button
                key={style}
                type="button"
                onClick={() => toggleStyle(style)}
                aria-pressed={selected}
                className={
                  selected
                    ? "rounded-full bg-primary-tint px-md py-xs text-body-sm font-semibold text-primary"
                    : "rounded-full bg-surface-soft px-md py-xs text-body-sm text-ink"
                }
              >
                {style}
              </button>
            );
          })}
        </div>

        {typeof resultCount === "number" ? (
          <p className="text-body-sm text-muted">
            총 {resultCount}개의 동행 모집글
          </p>
        ) : null}
      </div>
    </section>
  );
}
