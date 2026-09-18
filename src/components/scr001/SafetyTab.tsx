"use client";

import { useState } from "react";
import { openOutboundLink } from "@/lib/outbound-link";
import type { CountrySafetyInfo, SafetySection } from "@/data/safety";

const MOFA_SAFETY_URL = "https://www.0404.go.kr/dev/country.mofa";
const STALE_THRESHOLD_DAYS = 7;

type SafetyCategoryKey = {
  [K in keyof CountrySafetyInfo]: CountrySafetyInfo[K] extends SafetySection
    ? K
    : never;
}[keyof CountrySafetyInfo];

const CATEGORY_LABELS: { key: SafetyCategoryKey; label: string }[] = [
  { key: "security", label: "치안" },
  { key: "fraud", label: "사기" },
  { key: "regulations", label: "법규" },
  { key: "transportation", label: "교통" },
  { key: "disaster", label: "재난" },
  { key: "health", label: "보건" },
  { key: "culture", label: "문화" },
  { key: "emergencyContacts", label: "긴급연락처" },
];

const DANGER_KEYWORDS = ["여행자제", "철수권고", "여행금지"];

function isStale(verifiedAt: string): boolean {
  const verifiedTime = new Date(verifiedAt).getTime();
  const diffDays = (Date.now() - verifiedTime) / (1000 * 60 * 60 * 24);
  return diffDays > STALE_THRESHOLD_DAYS;
}

export type SafetyTabProps = {
  safety: CountrySafetyInfo | null;
};

export function SafetyTab({ safety }: SafetyTabProps) {
  const [linkError, setLinkError] = useState(false);

  if (!safety) {
    return (
      <div className="rounded-sm bg-danger-bg px-lg py-md text-body-sm text-danger">
        안전정보를 불러오지 못했습니다.
      </div>
    );
  }

  const stale = isStale(safety.verifiedAt);
  const hasDangerAlert = DANGER_KEYWORDS.some((keyword) =>
    safety.scopeText.includes(keyword),
  );

  function handleMofaClick() {
    const result = openOutboundLink(MOFA_SAFETY_URL);
    setLinkError(!result.ok);
  }

  return (
    <section className="flex flex-col gap-md rounded-md border border-hairline p-md">
      <h3 className="text-title font-semibold text-ink">국가 안전정보</h3>

      {hasDangerAlert ? (
        <div className="rounded-sm bg-danger-bg px-lg py-md text-body-sm font-semibold text-danger">
          중대 여행경보: {safety.scopeText}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-sm">
        <span className="rounded-full bg-surface-soft px-md py-xs text-body-sm text-ink">
          경보 범위: {safety.scopeText}
        </span>
        {stale ? (
          <span className="rounded-full bg-warning-bg px-md py-xs text-body-sm font-semibold text-warning">
            갱신 필요(정보가 오래됨)
          </span>
        ) : null}
      </div>

      <dl className="flex flex-col gap-md">
        {CATEGORY_LABELS.map(({ key, label }) => (
          <div key={key}>
            <dt className="text-body-sm font-semibold text-ink">{label}</dt>
            <dd className="text-body-sm text-body">{safety[key].content}</dd>
          </div>
        ))}
      </dl>

      <p className="text-body-sm text-muted">
        출처: {safety.source} · 확인일 {safety.verifiedAt}
      </p>

      <p className="text-body-sm text-muted">
        이 정보는 참고용이며 공식 판단을 대체할 수 없습니다. 출발 전 외교부
        해외안전여행 원문을 반드시 확인하세요.
      </p>

      {linkError ? (
        <div className="rounded-sm bg-danger-bg px-lg py-md text-body-sm text-danger">
          외교부 원문 페이지로 이동하지 못했습니다. 잠시 후 다시 시도해 주세요.
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleMofaClick}
        className="flex h-12 items-center justify-center rounded-sm border border-ink text-btn font-semibold text-ink"
      >
        외교부 해외안전여행 원문 보기
      </button>
    </section>
  );
}
