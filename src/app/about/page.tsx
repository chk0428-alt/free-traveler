import type { Metadata } from "next";
import { ProfileHero } from "@/components/scr002/ProfileHero";
import { Story } from "@/components/scr002/Story";
import { Timeline } from "@/components/scr002/Timeline";
import { CountriesChips } from "@/components/scr002/CountriesChips";
import { Gallery } from "@/components/scr002/Gallery";
import { RecommendedCta } from "@/components/scr002/RecommendedCta";

export const metadata: Metadata = {
  title: "대표 소개 | Free Traveler",
  description:
    "free_traveler 대표의 여행 이야기와 방문 국가, 추천 여행지를 소개합니다.",
};

export default function AboutPage() {
  return (
    <>
      <ProfileHero />
      <Story />
      <Timeline />
      <CountriesChips />
      <Gallery />
      <RecommendedCta />
    </>
  );
}
