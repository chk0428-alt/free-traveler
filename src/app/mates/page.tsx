import type { Metadata } from "next";
import { Suspense } from "react";
import { Intro } from "@/components/scr004/Intro";
import { Filter } from "@/components/scr004/Filter";
import {
  MatePostList,
  getVisibleMatePosts,
  type MatePostListFilters,
} from "@/components/scr004/MatePostList";
import { MatePostDetail } from "@/components/scr004/MatePostDetail";
import { ApplyForm } from "@/components/scr004/ApplyForm";
import { SafetyActions } from "@/components/scr004/SafetyActions";
import { getMatePostById } from "@/lib/data/mate-posts";

export const metadata: Metadata = {
  title: "동행 찾기 | Free Traveler",
  description: "함께 떠날 동행을 찾고 참가 요청을 보내보세요.",
};

type MatesPageSearchParams = {
  countryId?: string;
  ageBand?: string;
  gender?: string;
  styles?: string;
  status?: string;
  postId?: string;
};

export default async function MatesPage({
  searchParams,
}: {
  searchParams: Promise<MatesPageSearchParams>;
}) {
  const params = await searchParams;

  const filters: MatePostListFilters = {
    countryId: params.countryId,
    ageBand: params.ageBand,
    gender: params.gender,
    travelStyles: params.styles?.split(",").filter(Boolean),
    status: params.status,
  };

  // Supabase 미연결 등 조회 실패도 "0건"과 동일하게 취급해 완성형 Empty State로
  // 대체한다(페이지 전체 크래시를 막는다).
  const posts = await getVisibleMatePosts(filters).catch(() => []);

  const selectedPost = params.postId
    ? await getMatePostById(params.postId).catch(() => null)
    : null;

  return (
    <>
      <Intro />

      <Suspense fallback={null}>
        <Filter resultCount={posts.length} />
      </Suspense>

      <div className="mx-auto grid w-full max-w-content-desktop-max grid-cols-1 gap-lg px-gutter-mobile py-section-mobile-min md:grid-cols-[2fr_3fr] md:px-gutter-desktop md:py-section-desktop-min">
        <MatePostList posts={posts} selectedPostId={params.postId} />

        {params.postId ? (
          <MatePostDetail
            postId={params.postId}
            applyForm={<ApplyForm postId={params.postId} />}
            safetyActions={
              <SafetyActions
                targetType="mate_post"
                targetId={params.postId}
                targetUserId={selectedPost?.owner_id}
              />
            }
          />
        ) : null}
      </div>
    </>
  );
}
