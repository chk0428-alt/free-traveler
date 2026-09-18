"use server";

import { requireAuthenticatedUser } from "@/lib/auth/guards";
import { blockUser, unblockUser } from "@/lib/data/user-blocks";

export type BlockActionResult = { ok: true } | { ok: false; error: string };

/** SCR-004/SCR-005에서 다른 사용자를 차단한다(차단 후 상호 글/프로필/요청 미노출). */
export async function blockUserAction(
  blockedUserId: string,
): Promise<BlockActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }
  if (blockedUserId === guard.user.id) {
    return { ok: false, error: "본인을 차단할 수 없습니다." };
  }

  await blockUser(guard.user.id, blockedUserId);
  return { ok: true };
}

/** SCR-005 내 활동에서 차단을 해제한다. */
export async function unblockUserAction(
  blockedUserId: string,
): Promise<BlockActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }

  await unblockUser(guard.user.id, blockedUserId);
  return { ok: true };
}
