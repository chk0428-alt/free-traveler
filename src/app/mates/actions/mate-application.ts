"use server";

import {
  requireAdultUser,
  requireAuthenticatedUser,
  escapeUserInput,
} from "@/lib/auth/guards";
import {
  createMateApplication,
  hasActiveApplication,
  listApplicationsForPost,
  updateMateApplicationStatus,
} from "@/lib/data/mate-applications";
import { getMatePostById } from "@/lib/data/mate-posts";
import type { MateApplicationRow } from "@/lib/data/types";

export type MateApplicationActionResult =
  { ok: true; application: MateApplicationRow } | { ok: false; error: string };

const MAX_MESSAGE_LENGTH = 500;

/** SCR-004 동행 상세에서 참가 요청을 제출한다(성인확인 완료 회원만). */
export async function createMateApplicationAction(
  postId: string,
  message: string,
): Promise<MateApplicationActionResult> {
  const guard = await requireAdultUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }

  const trimmedMessage = message.trim();
  if (!trimmedMessage) {
    return { ok: false, error: "참가 메시지를 입력해 주세요." };
  }
  if (trimmedMessage.length > MAX_MESSAGE_LENGTH) {
    return { ok: false, error: "참가 메시지는 500자 이내로 작성해 주세요." };
  }

  const post = await getMatePostById(postId);
  if (!post) {
    return { ok: false, error: "존재하지 않는 모집글입니다." };
  }
  if (post.owner_id === guard.user.id) {
    return {
      ok: false,
      error: "본인이 작성한 모집글에는 참가 요청을 보낼 수 없습니다.",
    };
  }

  const alreadyApplied = await hasActiveApplication(postId, guard.user.id);
  if (alreadyApplied) {
    return {
      ok: false,
      error: "이미 대기중이거나 수락된 참가 요청이 있습니다.",
    };
  }

  const application = await createMateApplication({
    postId,
    applicantId: guard.user.id,
    message: escapeUserInput(trimmedMessage),
  });

  return { ok: true, application };
}

/**
 * 요청한 사람이 해당 postId의 작성자이고, applicationId가 실제로 그 글에 속하는지
 * 확인한다. DB-RLS-BASE의 mate_application_update_post_owner 정책이 최종 방어선을
 * 맡지만, 이 계층에서도 재검증해 잘못된 postId/applicationId 조합을 조기에 거른다.
 */
async function assertPostOwnerOfApplication(
  postId: string,
  applicationId: string,
  userId: string,
): Promise<string | null> {
  const post = await getMatePostById(postId);
  if (!post) {
    return "존재하지 않는 모집글입니다.";
  }
  if (post.owner_id !== userId) {
    return "본인이 작성한 모집글의 참가 요청만 처리할 수 있습니다.";
  }
  const applications = await listApplicationsForPost(postId);
  if (
    !applications.some(
      (application) => application.application_id === applicationId,
    )
  ) {
    return "해당 모집글에 속하지 않는 참가 요청입니다.";
  }
  return null;
}

/** 모집글 작성자가 참가 요청을 승인한다. */
export async function acceptMateApplicationAction(
  postId: string,
  applicationId: string,
): Promise<MateApplicationActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }

  const ownerError = await assertPostOwnerOfApplication(
    postId,
    applicationId,
    guard.user.id,
  );
  if (ownerError) {
    return { ok: false, error: ownerError };
  }

  const application = await updateMateApplicationStatus(
    applicationId,
    "ACCEPTED",
  );
  return { ok: true, application };
}

/** 모집글 작성자가 참가 요청을 거절한다. */
export async function rejectMateApplicationAction(
  postId: string,
  applicationId: string,
): Promise<MateApplicationActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }

  const ownerError = await assertPostOwnerOfApplication(
    postId,
    applicationId,
    guard.user.id,
  );
  if (ownerError) {
    return { ok: false, error: ownerError };
  }

  const application = await updateMateApplicationStatus(
    applicationId,
    "REJECTED",
  );
  return { ok: true, application };
}
