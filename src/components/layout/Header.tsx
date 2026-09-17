"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { label: "여행지", href: "/" },
  { label: "여행 준비", href: "/travel-tools" },
  { label: "동행 찾기", href: "/mates" },
  { label: "대표 소개", href: "/about" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-canvas">
      <div className="mx-auto flex h-[60px] max-w-content-desktop-max items-center justify-between px-gutter-mobile md:h-[72px] md:px-gutter-desktop">
        <Link href="/" className="text-title font-semibold text-ink">
          Free Traveler
        </Link>

        <nav className="hidden items-center gap-lg md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body-md text-ink hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-md md:flex">
          <Link href="/account" className="text-btn font-semibold text-ink">
            로그인
          </Link>
          <Link
            href="/account"
            className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
          >
            가입하기
          </Link>
        </div>

        <button
          type="button"
          className="flex items-center justify-center rounded-sm p-sm text-ink md:hidden"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" className="text-title">
            {isMenuOpen ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {isMenuOpen ? (
        <nav
          id="mobile-nav"
          className="flex flex-col gap-md border-t border-hairline bg-canvas px-gutter-mobile py-lg md:hidden"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body-md text-ink"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-sm flex flex-col gap-sm">
            <Link
              href="/account"
              className="text-btn font-semibold text-ink"
              onClick={() => setIsMenuOpen(false)}
            >
              로그인
            </Link>
            <Link
              href="/account"
              className="flex h-12 items-center justify-center rounded-sm bg-primary text-btn font-semibold text-on-primary hover:bg-primary-active"
              onClick={() => setIsMenuOpen(false)}
            >
              가입하기
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
