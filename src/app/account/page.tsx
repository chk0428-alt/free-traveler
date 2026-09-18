import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentSessionUser } from "@/lib/auth/session";
import { getUserProfile } from "@/lib/data/user-profiles";
import { listBlockedUserIds } from "@/lib/data/user-blocks";
import { getOutboundLinkSetting } from "@/lib/data/outbound-link-settings";
import { AuthPanel } from "@/components/scr005/AuthPanel";
import { ProfilePanel } from "@/components/scr005/ProfilePanel";
import { MyPostsPanel } from "@/components/scr005/MyPostsPanel";
import { FavoritesBlocksPanel } from "@/components/scr005/FavoritesBlocksPanel";
import { AdminReportsPanel } from "@/components/scr005/AdminReportsPanel";
import { AdminOutboundUrlPanel } from "@/components/scr005/AdminOutboundUrlPanel";

export const metadata: Metadata = {
  title: "계정 | Free Traveler",
  description: "프로필, 내 활동, 즐겨찾기를 관리하세요.",
};

export default async function AccountPage() {
  // Supabase 미연결 등 오류도 "비로그인"과 동일하게 취급한다(session.ts가 이미
  // try/catch로 null을 반환하지만, 이후 프로필 조회 실패까지 방어적으로 감싼다).
  const currentUser = await getCurrentSessionUser().catch(() => null);

  if (!currentUser) {
    return <AuthPanel mode="guest" />;
  }

  if (!currentUser.isAdult) {
    return <AuthPanel mode="verify-adult" />;
  }

  const profile = await getUserProfile(currentUser.id).catch(() => null);
  const blockedUserIds = await listBlockedUserIds(currentUser.id).catch(
    () => [],
  );
  const isAdmin = currentUser.status === "admin";
  const outboundSetting = isAdmin
    ? await getOutboundLinkSetting().catch(() => null)
    : null;

  return (
    <div className="mx-auto flex w-full max-w-content-desktop-max flex-col gap-lg px-gutter-mobile py-section-mobile-min md:px-gutter-desktop md:py-section-desktop-min">
      <h1 className="text-display-lg-mobile font-bold text-ink md:text-display-lg">
        계정
      </h1>

      {profile ? <ProfilePanel profile={profile} /> : null}

      <MyPostsPanel userId={currentUser.id} />

      <FavoritesBlocksPanel blockedUserIds={blockedUserIds} />

      {isAdmin ? (
        <section className="flex flex-col gap-lg rounded-md border border-hairline p-lg">
          <h2 className="text-title font-semibold text-ink">관리자</h2>
          <AdminReportsPanel />
          <AdminOutboundUrlPanel setting={outboundSetting} />
        </section>
      ) : null}

      <div className="flex justify-center rounded-md bg-primary-tint p-lg text-center">
        <Link
          href="/travel-tools"
          className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
        >
          새 동행글 작성하기
        </Link>
      </div>
    </div>
  );
}
