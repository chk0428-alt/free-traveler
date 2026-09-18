import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getUserProfile } from "@/lib/data/user-profiles";
import type { UserProfileStatus } from "@/lib/data/types";

export type SessionUser = {
  id: string;
  email: string | null;
  nickname: string;
  isAdult: boolean;
  status: UserProfileStatus;
};

/**
 * 현재 요청의 로그인 사용자를 조회한다. 비로그인이면 `null`을 반환한다(예외를 던지지
 * 않는다 — 로그인 필요 여부 판단은 호출부의 Guard가 담당한다).
 *
 * Supabase 프로젝트 미연결 등 인프라 오류도 "비로그인"과 동일하게 처리한다 —
 * 페이지 전체를 500으로 크래시시키는 대신 로그인 안내 카드로 대체하기 위함이다.
 */
export async function getCurrentSessionUser(): Promise<SessionUser | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const profile = await getUserProfile(user.id);
    if (!profile) {
      return null;
    }

    return {
      id: user.id,
      email: user.email ?? null,
      nickname: profile.nickname,
      isAdult: profile.is_adult,
      status: profile.status,
    };
  } catch {
    return null;
  }
}
