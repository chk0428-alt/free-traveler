"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto flex w-full max-w-content-desktop-max flex-1 flex-col items-center justify-center gap-md px-gutter-mobile py-section-mobile-min text-center md:px-gutter-desktop md:py-section-desktop-min">
      <div className="w-full rounded-sm bg-danger-bg px-lg py-md text-body-sm text-danger">
        일시적인 오류가 발생했습니다.
      </div>
      <h1 className="text-display-lg-mobile font-bold text-ink md:text-display-lg">
        문제가 발생했습니다
      </h1>
      <p className="max-w-md text-body-md text-body">
        잠시 후 다시 시도하거나 홈으로 이동해 주세요.
      </p>
      <div className="mt-md flex gap-sm">
        <button
          type="button"
          onClick={() => reset()}
          className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="flex h-12 items-center justify-center rounded-sm border border-ink px-lg text-btn font-semibold text-ink"
        >
          홈으로 이동
        </Link>
      </div>
    </div>
  );
}
