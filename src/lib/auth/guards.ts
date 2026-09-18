import { getCurrentSessionUser, type SessionUser } from "@/lib/auth/session";
import type { UserProfileStatus } from "@/lib/data/types";

export type AuthGuardReason =
  "UNAUTHENTICATED" | "NOT_ADULT" | "SUSPENDED" | "FORBIDDEN";

export type AuthGuardResult =
  { ok: true; user: SessionUser } | { ok: false; reason: AuthGuardReason };

/**
 * Server Action/Server Component에서 쓰기 전에 항상 먼저 호출한다.
 * 비로그인/제한 계정의 요청을 서버에서 차단하는 유일한 지점이며, RLS는 마지막
 * 방어선으로만 취급한다(이 계층에서도 반드시 재검증한다).
 */
export async function requireAuthenticatedUser(): Promise<AuthGuardResult> {
  const user = await getCurrentSessionUser();
  if (!user) {
    return { ok: false, reason: "UNAUTHENTICATED" };
  }
  if (user.status === "suspended") {
    return { ok: false, reason: "SUSPENDED" };
  }
  return { ok: true, user };
}

/** 성인확인이 완료된 계정만 통과한다(동행글 작성 등 성인 전용 쓰기 경로). */
export async function requireAdultUser(): Promise<AuthGuardResult> {
  const result = await requireAuthenticatedUser();
  if (!result.ok) {
    return result;
  }
  if (!result.user.isAdult) {
    return { ok: false, reason: "NOT_ADULT" };
  }
  return result;
}

const MODERATOR_ROLES: UserProfileStatus[] = ["moderator", "admin"];

/** 신고 처리 등 Moderator/Admin 전용 쓰기 경로에서 사용한다. */
export async function requireModeratorOrAdmin(): Promise<AuthGuardResult> {
  const result = await requireAuthenticatedUser();
  if (!result.ok) {
    return result;
  }
  if (!MODERATOR_ROLES.includes(result.user.status)) {
    return { ok: false, reason: "FORBIDDEN" };
  }
  return result;
}

/**
 * 저장 전 사용자 입력 문자열을 HTML 이스케이프한다(저장형 XSS 차단).
 * 값을 그대로 DB에 저장하는 모든 API Server Action(제목/설명/메시지 등)에서 사용한다.
 */
export function escapeUserInput(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
