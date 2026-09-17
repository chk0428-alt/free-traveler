import Link from "next/link";

const SERVICE_LINKS = [
  { label: "여행지", href: "/" },
  { label: "여행 준비", href: "/travel-tools" },
  { label: "동행 찾기", href: "/mates" },
];

const SAFETY_POLICY_ITEMS = [
  "이용약관",
  "개인정보 처리방침",
  "동행 안전수칙",
  "콘텐츠 면책 안내",
];

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas text-ink">
      <div className="mx-auto grid max-w-content-desktop-max grid-cols-1 gap-lg px-gutter-mobile py-section-mobile-min md:grid-cols-4 md:px-gutter-desktop md:py-section-desktop-min">
        <details
          open
          className="md:pointer-events-none md:[&_summary]:pointer-events-none"
        >
          <summary className="text-title font-semibold md:mb-md md:list-none">
            Free Traveler
          </summary>
          <div className="mt-sm flex flex-col gap-sm text-body-sm text-body">
            <p>
              여행 준비부터 동행까지, 한 곳에서 안전하게 이어주는 여행
              허브입니다.
            </p>
            <Link href="/about" className="text-body-sm text-primary">
              대표 소개 보러 가기
            </Link>
          </div>
        </details>

        <details
          open
          className="md:pointer-events-none md:[&_summary]:pointer-events-none"
        >
          <summary className="text-title font-semibold md:mb-md md:list-none">
            서비스
          </summary>
          <ul className="mt-sm flex flex-col gap-sm text-body-sm text-body">
            {SERVICE_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </details>

        <details
          open
          className="md:pointer-events-none md:[&_summary]:pointer-events-none"
        >
          <summary className="text-title font-semibold md:mb-md md:list-none">
            안전·정책
          </summary>
          <ul className="mt-sm flex flex-col gap-sm text-body-sm text-body">
            {SAFETY_POLICY_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>

        <details
          open
          className="md:pointer-events-none md:[&_summary]:pointer-events-none"
        >
          <summary className="text-title font-semibold md:mb-md md:list-none">
            문의
          </summary>
          <div className="mt-sm flex flex-col gap-sm text-body-sm text-body">
            <p>support@freetraveler.app</p>
          </div>
        </details>
      </div>

      <div className="border-t border-hairline px-gutter-mobile py-md text-body-sm text-muted md:px-gutter-desktop">
        <p>© {new Date().getFullYear()} Free Traveler. All rights reserved.</p>
        <p>외부 예약 사이트 이용 시 조건은 해당 사이트를 따릅니다.</p>
      </div>
    </footer>
  );
}
