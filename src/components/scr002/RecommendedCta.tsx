import Image from "next/image";
import Link from "next/link";
import { destinations } from "@/data/destinations";
import { representativeProfile } from "@/data/profile";

// "비공개 여행지 자동 제외" — 상세 표시에 필요한 필드(이미지·alt)가 없는 항목은
// 정적 데이터라 실제로 발생하지 않지만, 방어적으로 걸러낸다.
const recommendedDestinations = representativeProfile.memorableDestinations
  .map((memorable) => {
    const destination = destinations.find(
      (entry) => entry.id === memorable.destinationId,
    );
    return destination ? { destination, caption: memorable.caption } : null;
  })
  .filter(
    (
      entry,
    ): entry is {
      destination: (typeof destinations)[number];
      caption: string;
    } =>
      entry !== null &&
      Boolean(entry.destination.heroImageUrl) &&
      Boolean(entry.destination.heroImageAlt),
  );

export function RecommendedCta() {
  return (
    <section className="mx-auto w-full max-w-content-desktop-max px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
      <h2 className="mb-lg text-display-lg-mobile font-bold text-ink md:text-display-lg">
        기억에 남는 여행지
      </h2>

      <div className="grid grid-cols-1 gap-md md:grid-cols-4 md:gap-lg">
        {recommendedDestinations.map(({ destination, caption }) => (
          <Link
            key={destination.id}
            href="/"
            className="flex flex-col overflow-hidden rounded-md border border-hairline bg-surface-card text-left hover:shadow-raised"
          >
            <div className="relative h-32 w-full">
              <Image
                src={destination.heroImageUrl}
                alt={destination.heroImageAlt}
                fill
                sizes="(min-width: 768px) 25vw, 100vw"
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex flex-col gap-xs p-md">
              <p className="text-title font-semibold text-ink">
                {destination.name}
              </p>
              <p className="text-body-sm text-muted">{caption}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-lg flex flex-col items-center gap-sm rounded-md bg-primary-tint px-lg py-lg text-center md:flex-row md:justify-between md:text-left">
        <p className="text-title font-semibold text-ink">
          이제 직접 여행을 준비해 볼까요?
        </p>
        <div className="flex flex-wrap justify-center gap-sm">
          <Link
            href="/travel-tools"
            className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
          >
            여행 준비 시작하기
          </Link>
          <Link
            href="/mates"
            className="flex h-12 items-center justify-center rounded-sm border border-ink px-lg text-btn font-semibold text-ink"
          >
            동행 찾아보기
          </Link>
        </div>
      </div>
    </section>
  );
}
