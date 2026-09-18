import {
  domesticDestinations,
  overseasDestinations,
  destinations,
} from "@/data/destinations";
import { Hero } from "@/components/scr001/Hero";
import { DestinationCardGrid } from "@/components/scr001/DestinationCardGrid";
import { DestinationDrawer } from "@/components/scr001/DestinationDrawer";
import { MatePreview } from "@/components/scr001/MatePreview";
import { FounderSummary } from "@/components/scr001/FounderSummary";

const THEME_HIGHLIGHTS = ["자연", "역사", "미식", "해변", "도심", "휴양"];

// 국가별 주의사항 Card 6개 — 안전정보가 등록된 국가 중 6곳을 대표 여행지로 보여주고,
// 클릭 시 같은 상세 Drawer의 안전정보 탭으로 연결한다.
const SAFETY_HIGHLIGHT_COUNTRIES = [
  "일본",
  "태국",
  "베트남",
  "필리핀",
  "튀르키예",
  "미국",
];

const safetyHighlightDestinations = SAFETY_HIGHLIGHT_COUNTRIES.map((country) =>
  destinations.find((destination) => destination.country === country)!,
);

export default function Home() {
  return (
    <>
      <Hero />

      <div className="bg-canvas">
        <DestinationCardGrid
          title="국내 인기 여행지"
          destinations={domesticDestinations.slice(0, 6)}
        />
      </div>

      <div className="bg-surface-soft">
        <DestinationCardGrid
          title="해외 인기 여행지"
          destinations={overseasDestinations.slice(0, 6)}
        />
      </div>

      <section className="mx-auto w-full max-w-content-desktop-max bg-canvas px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
        <h2 className="mb-lg text-display-lg-mobile font-bold text-ink md:text-display-lg">
          어떤 여행을 꿈꾸시나요?
        </h2>
        <div className="flex flex-wrap gap-sm">
          {THEME_HIGHLIGHTS.map((theme) => (
            <span
              key={theme}
              className="rounded-full bg-primary-tint px-lg py-sm text-btn font-semibold text-primary"
            >
              {theme}
            </span>
          ))}
        </div>
      </section>

      <div className="bg-surface-soft">
        <DestinationCardGrid
          title="국가별 여행 전 꼭 확인하세요"
          destinations={safetyHighlightDestinations}
        />
      </div>

      <MatePreview />

      <div className="bg-canvas">
        <FounderSummary />
      </div>

      <DestinationDrawer />
    </>
  );
}
