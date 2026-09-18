"use client";

import { useState, type ReactNode } from "react";

const STEPS = [
  "1. 항공편 또는 숙소 조건을 입력하고 요약을 확인하세요",
  "2. 외부 예약 사이트에서 실제 가격·재고를 확인하세요",
  "3. 동행이 필요하면 동행 구하기 탭에서 모집글을 등록하세요",
];

const TABS = [
  { id: "flight", label: "항공편 찾기" },
  { id: "hotel", label: "숙소 찾기" },
  { id: "mate", label: "동행 구하기" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export type IntroTabsProps = {
  flightPanel: ReactNode;
  hotelPanel: ReactNode;
  matePanel: ReactNode;
};

export function IntroTabs({
  flightPanel,
  hotelPanel,
  matePanel,
}: IntroTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("flight");

  const panels: Record<TabId, ReactNode> = {
    flight: flightPanel,
    hotel: hotelPanel,
    mate: matePanel,
  };

  return (
    <section className="mx-auto w-full max-w-content-desktop-max px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
      <h1 className="mb-md text-display-lg-mobile font-bold text-ink md:text-display-lg">
        여행 준비
      </h1>
      <ol className="mb-lg flex flex-col gap-xs text-body-sm text-body">
        {STEPS.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <div
        role="tablist"
        aria-label="여행 준비 탭"
        className="mb-lg flex gap-sm overflow-x-auto"
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className={
                isActive
                  ? "shrink-0 rounded-full bg-primary-tint px-lg py-sm text-btn font-semibold text-primary"
                  : "shrink-0 rounded-full px-lg py-sm text-btn font-semibold text-muted"
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 탭 전환 시 입력값을 잃지 않도록 언마운트하지 않고 CSS로만 숨긴다. */}
      {TABS.map((tab) => (
        <div key={tab.id} role="tabpanel" hidden={tab.id !== activeTab}>
          {panels[tab.id]}
        </div>
      ))}
    </section>
  );
}
