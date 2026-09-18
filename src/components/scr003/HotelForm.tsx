"use client";

import { useMemo, useState } from "react";
import {
  openOutboundLink,
  getOutboundLinkErrorMessage,
} from "@/lib/outbound-link";
import { validateHotelDates } from "@/lib/travel-dates";

const COUNTRY_REGIONS: Record<string, string[]> = {
  일본: ["도쿄", "오사카"],
  태국: ["방콕", "치앙마이"],
  베트남: ["하노이", "호이안"],
  대만: ["타이베이", "가오슝"],
  필리핀: ["마닐라", "세부"],
  프랑스: ["파리", "니스"],
  이탈리아: ["로마", "피렌체"],
  스페인: ["바르셀로나", "마드리드"],
  영국: ["런던", "에든버러"],
  독일: ["베를린", "뮌헨"],
  미국: ["뉴욕", "로스앤젤레스"],
  호주: ["시드니", "멜버른"],
  튀르키예: ["이스탄불", "카파도키아"],
  그리스: ["아테네", "산토리니"],
  아이슬란드: ["레이캬비크", "비크"],
};

const COUNTRIES = Object.keys(COUNTRY_REGIONS);

export type HotelFormProps = {
  /** 관리자가 설정한 숙소 검색 URL(SCR-005 관리자 탭). Page Owner가 서버에서 조회해 전달한다. */
  hotelUrl?: string | null;
};

export function HotelForm({ hotelUrl }: HotelFormProps) {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const regionOptions = country ? COUNTRY_REGIONS[country] : [];

  const summary = useMemo(
    () =>
      showSummary
        ? `${country} ${region} · ${checkInDate} ~ ${checkOutDate}`
        : null,
    [showSummary, country, region, checkInDate, checkOutDate],
  );

  function handleCountryChange(value: string) {
    setCountry(value);
    setRegion(""); // 국가 변경 시 지역 초기화
    setShowSummary(false);
  }

  function handleCheckSummary() {
    if (!country || !region) {
      setError("국가·지역·체크인·체크아웃을 모두 입력해 주세요.");
      setShowSummary(false);
      return;
    }
    const dateError = validateHotelDates(checkInDate, checkOutDate);
    if (dateError === "MISSING") {
      setError("국가·지역·체크인·체크아웃을 모두 입력해 주세요.");
      setShowSummary(false);
      return;
    }
    if (dateError === "CHECKOUT_NOT_AFTER_CHECKIN") {
      setError("체크아웃은 체크인보다 늦어야 합니다.");
      setShowSummary(false);
      return;
    }
    setError(null);
    setShowSummary(true);
  }

  function handleOpenHotelSite() {
    setIsNavigating(true);
    setLinkError(null);
    const result = openOutboundLink(hotelUrl);
    if (!result.ok) {
      setLinkError(getOutboundLinkErrorMessage(result.reason));
    }
    setIsNavigating(false);
  }

  return (
    <div className="flex flex-col gap-md">
      <div className="grid grid-cols-1 gap-md md:grid-cols-2">
        <label className="flex flex-col gap-xs text-body-sm text-body">
          국가
          <select
            aria-label="국가"
            value={country}
            onChange={(event) => handleCountryChange(event.target.value)}
            className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
          >
            <option value="">국가 선택</option>
            {COUNTRIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-xs text-body-sm text-body">
          지역
          <select
            aria-label="지역"
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            disabled={!country}
            className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink disabled:bg-surface-soft"
          >
            <option value="">지역 선택</option>
            {regionOptions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-xs text-body-sm text-body">
          체크인
          <input
            aria-label="체크인"
            type="date"
            value={checkInDate}
            onChange={(event) => setCheckInDate(event.target.value)}
            className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
          />
        </label>

        <label className="flex flex-col gap-xs text-body-sm text-body">
          체크아웃
          <input
            aria-label="체크아웃"
            type="date"
            value={checkOutDate}
            onChange={(event) => setCheckOutDate(event.target.value)}
            className="h-14 rounded-sm border border-hairline px-md text-body-md text-ink"
          />
        </label>
      </div>

      {error ? <p className="text-body-sm text-danger">{error}</p> : null}

      <button
        type="button"
        onClick={handleCheckSummary}
        className="flex h-12 items-center justify-center rounded-sm border border-ink px-lg text-btn font-semibold text-ink md:w-fit"
      >
        확인
      </button>

      {summary ? (
        <div className="flex flex-col gap-sm rounded-sm bg-surface-soft p-lg">
          <p className="text-body-md text-ink">{summary}</p>
          <p className="text-body-sm text-muted">
            입력값은 외부 사이트로 전달되지 않습니다. 실제 숙소 가격·재고는
            이동한 사이트에서 확인해 주세요.
          </p>
          {linkError ? (
            <p className="text-body-sm text-danger">{linkError}</p>
          ) : null}
          <a
            href={hotelUrl ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              event.preventDefault();
              handleOpenHotelSite();
            }}
            aria-disabled={isNavigating}
            className="flex h-12 w-fit items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active aria-disabled:opacity-60"
          >
            {isNavigating ? "이동 중..." : "호텔 보러 가기"}
          </a>
        </div>
      ) : null}
    </div>
  );
}
