import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { UserProfileRow } from "@/lib/data/types";

export async function getUserProfile(
  userId: string,
): Promise<UserProfileRow | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_profile")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data as UserProfileRow | null;
}

export type UpsertUserProfileInput = {
  userId: string;
  nickname: string;
  isAdult: boolean;
  adultVerifiedAt?: string | null;
  ageBand?: string | null;
  gender?: string | null;
  travelStyles?: string[];
  bio?: string | null;
};

export async function upsertUserProfile(
  input: UpsertUserProfileInput,
): Promise<UserProfileRow> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_profile")
    .upsert(
      {
        user_id: input.userId,
        nickname: input.nickname,
        is_adult: input.isAdult,
        adult_verified_at: input.adultVerifiedAt ?? null,
        age_band: input.ageBand ?? null,
        gender: input.gender ?? null,
        travel_styles: input.travelStyles ?? [],
        bio: input.bio ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data as UserProfileRow;
}
