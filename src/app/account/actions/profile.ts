"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAuthenticatedUser } from "@/lib/auth/guards";
import { getUserProfile, upsertUserProfile } from "@/lib/data/user-profiles";

export type ProfileActionResult = { ok: true } | { ok: false; error: string };

const AUTH_CALLBACK_PATH = "/auth/callback";

function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3000";
}

/** 이메일 가입 + 닉네임 유일성 확인(성인확인은 별도 단계, 생년월일은 저장하지 않는다). */
export async function signUpAction(
  email: string,
  password: string,
  nickname: string,
): Promise<ProfileActionResult> {
  const trimmedNickname = nickname.trim();
  if (!email.trim() || !password || !trimmedNickname) {
    return { ok: false, error: "이메일·비밀번호·닉네임을 모두 입력해 주세요." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      emailRedirectTo: `${getSiteUrl()}${AUTH_CALLBACK_PATH}`,
    },
  });

  if (error || !data.user) {
    return { ok: false, error: error?.message ?? "가입에 실패했습니다." };
  }

  try {
    await upsertUserProfile({
      userId: data.user.id,
      nickname: trimmedNickname,
      isAdult: false,
    });
  } catch (profileError) {
    // Postgres unique_violation — 닉네임 중복.
    const code = (profileError as { code?: string } | null)?.code;
    if (code === "23505") {
      return { ok: false, error: "이미 사용 중인 닉네임입니다." };
    }
    throw profileError;
  }

  return { ok: true };
}

export async function signInAction(
  email: string,
  password: string,
): Promise<ProfileActionResult> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    return { ok: false, error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }
  return { ok: true };
}

export async function signOutAction(): Promise<ProfileActionResult> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return { ok: false, error: "로그아웃에 실패했습니다." };
  }
  return { ok: true };
}

/** 비밀번호 재설정 메일을 발송한다(비밀번호 자체는 Supabase Auth가 전담). */
export async function requestPasswordResetAction(
  email: string,
): Promise<ProfileActionResult> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${getSiteUrl()}${AUTH_CALLBACK_PATH}`,
  });

  if (error) {
    return { ok: false, error: "재설정 메일 발송에 실패했습니다." };
  }
  return { ok: true };
}

export type UpdateProfileInput = {
  nickname: string;
  ageBand: string;
  gender?: string;
  travelStyles: string[];
};

/** 로그인 사용자가 닉네임·연령대·성별·여행 스타일을 수정한다. */
export async function updateProfileAction(
  input: UpdateProfileInput,
): Promise<ProfileActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }

  const trimmedNickname = input.nickname.trim();
  if (!trimmedNickname || !input.ageBand) {
    return { ok: false, error: "닉네임과 연령대는 필수입니다." };
  }

  const profile = await getUserProfile(guard.user.id);
  if (!profile) {
    return { ok: false, error: "프로필을 찾을 수 없습니다." };
  }

  try {
    await upsertUserProfile({
      userId: guard.user.id,
      nickname: trimmedNickname,
      isAdult: profile.is_adult,
      adultVerifiedAt: profile.adult_verified_at,
      ageBand: input.ageBand,
      gender: input.gender ?? profile.gender,
      travelStyles: input.travelStyles,
      bio: profile.bio,
    });
  } catch (error) {
    const code = (error as { code?: string } | null)?.code;
    if (code === "23505") {
      return { ok: false, error: "이미 사용 중인 닉네임입니다." };
    }
    throw error;
  }

  return { ok: true };
}

/**
 * 성인확인 체크박스 동의를 기록한다. 정확한 생년월일은 어디에도 저장하지 않고
 * `is_adult`+`adult_verified_at`(확인 시각)만 남긴다.
 */
export async function verifyAdultAction(): Promise<ProfileActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }

  const profile = await getUserProfile(guard.user.id);
  if (!profile) {
    return { ok: false, error: "프로필을 찾을 수 없습니다." };
  }

  await upsertUserProfile({
    userId: guard.user.id,
    nickname: profile.nickname,
    isAdult: true,
    adultVerifiedAt: new Date().toISOString(),
    ageBand: profile.age_band,
    gender: profile.gender,
    travelStyles: profile.travel_styles,
    bio: profile.bio,
  });

  return { ok: true };
}
