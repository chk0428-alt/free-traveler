"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Destination } from "@/data/destinations";
import { countrySafetyInfo } from "@/data/safety";
import { SafetyTab } from "@/components/scr001/SafetyTab";

/**
 * Grid(카드 클릭)와 Drawer는 서로 다른 Client Component이고 그 사이의 Server
 * Component(page.tsx)는 상태를 들고 있을 수 없다. Page Owner가 새 Component 파일을
 * 만들지 않고도 둘을 연결할 수 있도록, Toast.tsx와 동일한 모듈 스코프 pub/sub로
 * "현재 열린 여행지 상세" 상태를 이 파일 안에서 함께 관리한다.
 */
type DrawerState = { destination: Destination | null; loadError: boolean };

let currentState: DrawerState = { destination: null, loadError: false };
const listeners = new Set<(state: DrawerState) => void>();

function notify(): void {
  for (const listener of listeners) {
    listener(currentState);
  }
}

export function openDestinationDrawer(destination: Destination): void {
  currentState = { destination, loadError: false };
  notify();
}

export function openDestinationDrawerError(): void {
  currentState = { destination: null, loadError: true };
  notify();
}

export function closeDestinationDrawer(): void {
  currentState = { destination: null, loadError: false };
  notify();
}

export function DestinationDrawer() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<DrawerState>(currentState);

  useEffect(() => {
    listeners.add(setState);
    return () => {
      listeners.delete(setState);
    };
  }, []);

  const { destination, loadError } = state;
  const onClose = closeDestinationDrawer;
  const isOpen = destination !== null || loadError;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end md:items-stretch">
      <button
        type="button"
        aria-label="상세 닫기"
        onClick={onClose}
        className="absolute inset-0 bg-scrim/50"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={
          destination ? `${destination.name} 상세` : "여행지 상세 오류"
        }
        tabIndex={-1}
        className="relative flex h-full w-full flex-col overflow-y-auto bg-canvas shadow-raised outline-none md:w-[480px]"
      >
        <div className="flex items-center justify-between border-b border-hairline px-lg py-md">
          <p className="text-title font-semibold text-ink">
            {destination ? destination.name : "여행지 상세"}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="text-body-md text-muted"
          >
            ✕
          </button>
        </div>

        {loadError || !destination ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-md p-lg text-center">
            <div className="w-full rounded-sm bg-danger-bg px-lg py-md text-body-sm text-danger">
              여행지 상세 정보를 불러오지 못했습니다.
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-12 items-center justify-center rounded-sm border border-ink px-lg text-btn font-semibold text-ink"
            >
              닫기
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-lg p-lg">
            <div className="relative h-48 w-full overflow-hidden rounded-md">
              <Image
                src={destination.heroImageUrl}
                alt={destination.heroImageAlt}
                fill
                sizes="480px"
                className="object-cover"
                unoptimized
              />
            </div>

            <p className="text-body-md text-body">{destination.intro}</p>

            <section>
              <h3 className="mb-sm text-title font-semibold text-ink">명소</h3>
              <ul className="flex flex-col gap-xs text-body-sm text-body">
                {destination.attractions.map((attraction) => (
                  <li key={attraction}>{attraction}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-sm text-title font-semibold text-ink">
                추천 시기
              </h3>
              <p className="text-body-sm text-body">
                {destination.themes.join(", ")} 테마 여행에 어울리는 곳입니다.
              </p>
            </section>

            <section>
              <h3 className="mb-sm text-title font-semibold text-ink">
                1일 코스
              </h3>
              <ol className="flex list-decimal flex-col gap-xs pl-lg text-body-sm text-body">
                {destination.itineraryOneDay.map((stop) => (
                  <li key={stop}>{stop}</li>
                ))}
              </ol>
            </section>

            <section>
              <h3 className="mb-sm text-title font-semibold text-ink">
                3일 코스
              </h3>
              <ol className="flex list-decimal flex-col gap-xs pl-lg text-body-sm text-body">
                {destination.itineraryThreeDay.map((entry) => (
                  <li key={entry.day}>{entry.summary}</li>
                ))}
              </ol>
            </section>

            <section>
              <h3 className="mb-sm text-title font-semibold text-ink">예산</h3>
              <p className="text-body-sm text-body">{destination.budget}</p>
            </section>

            <section>
              <h3 className="mb-sm text-title font-semibold text-ink">교통</h3>
              <p className="text-body-sm text-body">
                {destination.transportation}
              </p>
            </section>

            <section>
              <h3 className="mb-sm text-title font-semibold text-ink">음식</h3>
              <ul className="flex flex-col gap-xs text-body-sm text-body">
                {destination.food.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mb-sm text-title font-semibold text-ink">
                현지 에티켓
              </h3>
              <ul className="flex flex-col gap-xs text-body-sm text-body">
                {destination.etiquette.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <p className="text-body-sm text-muted">
              출처: {destination.source} · 수정일 {destination.updatedAt}
            </p>

            {destination.region === "overseas" ? (
              <SafetyTab
                safety={
                  countrySafetyInfo.find(
                    (entry) => entry.country === destination.country,
                  ) ?? null
                }
              />
            ) : null}

            <Link
              href="/travel-tools"
              className="flex h-12 items-center justify-center rounded-sm bg-primary text-btn font-semibold text-on-primary hover:bg-primary-active"
            >
              이 여행지로 여행 준비 시작하기
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
