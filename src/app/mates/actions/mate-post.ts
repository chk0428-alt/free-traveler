"use server";

import { requireAuthenticatedUser, escapeUserInput } from "@/lib/auth/guards";
import { detectContactInfo } from "@/lib/contact-detection";
import {
  closeMatePost,
  deleteMatePost,
  getMatePostById,
  updateMatePost,
  type UpdateMatePostInput,
} from "@/lib/data/mate-posts";
import type { MatePostRow } from "@/lib/data/types";

export type MatePostActionResult =
  { ok: true; post: MatePostRow } | { ok: false; error: string };

export type VoidActionResult = { ok: true } | { ok: false; error: string };

async function assertOwner(
  postId: string,
  userId: string,
): Promise<string | null> {
  const post = await getMatePostById(postId);
  if (!post) {
    return "존재하지 않는 모집글입니다.";
  }
  if (post.owner_id !== userId) {
    return "본인이 작성한 모집글만 관리할 수 있습니다.";
  }
  return null;
}

/** SCR-004/SCR-005에서 작성자 본인이 모집글 내용을 수정한다. */
export async function updateMatePostAction(
  postId: string,
  patch: UpdateMatePostInput,
): Promise<MatePostActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }

  const ownerError = await assertOwner(postId, guard.user.id);
  if (ownerError) {
    return { ok: false, error: ownerError };
  }

  if (patch.startDate && patch.endDate && patch.endDate < patch.startDate) {
    return { ok: false, error: "종료일은 시작일보다 빠를 수 없습니다." };
  }

  const contactCheck = [patch.title, patch.description, patch.preferences]
    .filter((value): value is string => typeof value === "string")
    .map((text) => detectContactInfo(text))
    .find((result) => result.detected);
  if (contactCheck) {
    return {
      ok: false,
      error: "전화번호·이메일·메신저 ID 등 개인 연락처는 입력할 수 없습니다.",
    };
  }

  const post = await updateMatePost(postId, {
    ...patch,
    ...(patch.title !== undefined
      ? { title: escapeUserInput(patch.title) }
      : {}),
    ...(patch.description !== undefined
      ? { description: escapeUserInput(patch.description) }
      : {}),
    ...(patch.preferences
      ? { preferences: escapeUserInput(patch.preferences) }
      : {}),
  });

  return { ok: true, post };
}

/** 작성자가 모집을 수동으로 마감한다. */
export async function closeMatePostAction(
  postId: string,
): Promise<MatePostActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }

  const ownerError = await assertOwner(postId, guard.user.id);
  if (ownerError) {
    return { ok: false, error: ownerError };
  }

  const post = await closeMatePost(postId);
  return { ok: true, post };
}

/** 작성자가 모집글을 삭제한다. */
export async function deleteMatePostAction(
  postId: string,
): Promise<VoidActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }

  const ownerError = await assertOwner(postId, guard.user.id);
  if (ownerError) {
    return { ok: false, error: ownerError };
  }

  await deleteMatePost(postId);
  return { ok: true };
}
