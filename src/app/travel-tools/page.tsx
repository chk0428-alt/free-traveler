import type { Metadata } from "next";
import { getOutboundLinkSetting } from "@/lib/data/outbound-link-settings";
import { IntroTabs } from "@/components/scr003/IntroTabs";
import { FlightForm } from "@/components/scr003/FlightForm";
import { HotelForm } from "@/components/scr003/HotelForm";
import { Tips } from "@/components/scr003/Tips";
import { MateWriteForm } from "@/components/scr003/MateWriteForm";

export const metadata: Metadata = {
  title: "여행 준비 | Free Traveler",
  description: "항공편·숙소 조건을 정리하고 동행을 구해보세요.",
};

export default async function TravelToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ mateError?: string }>;
}) {
  const { mateError } = await searchParams;

  // Supabase 미연결 등으로 설정 조회에 실패해도 화면 전체가 깨지지 않도록 한다
  // (미설정과 동일하게 취급 — INFRA-OUTBOUND-LINK가 차단+재시도 UI를 보여준다).
  const outboundSetting = await getOutboundLinkSetting().catch(() => null);

  return (
    <>
      <IntroTabs
        flightPanel={<FlightForm flightUrl={outboundSetting?.flight_url} />}
        hotelPanel={<HotelForm hotelUrl={outboundSetting?.hotel_url} />}
        matePanel={<MateWriteForm errorMessage={mateError} />}
      />
      <Tips />
    </>
  );
}
