"use server";

import { requireAdultUser, escapeUserInput } from "@/lib/auth/guards";
import { detectContactInfo } from "@/lib/contact-detection";
import { createMatePost } from "@/lib/data/mate-posts";
import type { MatePostRow } from "@/lib/data/types";

export type CreateMatePostFormInput = {
  countryId: string;
  regionId?: string;
  startDate: string;
  endDate: string;
  capacity: number;
  travelStyles: string[];
  title: string;
  description: string;
  preferences?: string;
};

export type MatePostActionResult =
  { ok: true; post: MatePostRow } | { ok: false; error: string };

function validateInput(input: CreateMatePostFormInput): string | null {
  if (
    !input.countryId ||
    !input.startDate ||
    !input.endDate ||
    !input.capacity ||
    !input.title.trim() ||
    !input.description.trim()
  ) {
    return "필수 항목을 모두 입력해 주세요.";
  }
  if (input.endDate < input.startDate) {
    return "종료일은 시작일보다 빠를 수 없습니다.";
  }
  const today = new Date().toISOString().slice(0, 10);
  if (input.endDate < today) {
    return "이미 종료된 일정으로는 모집글을 만들 수 없습니다.";
  }
  return null;
}

/** SCR-003 동행 구하기 탭에서 새 모집글을 등록한다(성인확인 완료 회원만). */
export async function createMatePostAction(
  input: CreateMatePostFormInput,
): Promise<MatePostActionResult> {
  const guard = await requireAdultUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }

  const validationError = validateInput(input);
  if (validationError) {
    return { ok: false, error: validationError };
  }

  // 클라이언트 검증을 신뢰하지 않고 서버에서 연락처 패턴을 재탐지한다.
  const contactCheck = [input.title, input.description, input.preferences ?? ""]
    .map((text) => detectContactInfo(text))
    .find((result) => result.detected);
  if (contactCheck) {
    return {
      ok: false,
      error: "전화번호·이메일·메신저 ID 등 개인 연락처는 입력할 수 없습니다.",
    };
  }

  const post = await createMatePost({
    ownerId: guard.user.id,
    countryId: input.countryId,
    regionId: input.regionId ?? null,
    startDate: input.startDate,
    endDate: input.endDate,
    capacity: input.capacity,
    preferences: input.preferences ? escapeUserInput(input.preferences) : null,
    travelStyles: input.travelStyles,
    title: escapeUserInput(input.title.trim()),
    description: escapeUserInput(input.description.trim()),
  });

  return { ok: true, post };
}
