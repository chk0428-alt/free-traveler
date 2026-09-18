import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { MatePostRow, MatePostStoredStatus } from "@/lib/data/types";

export type MatePostWithComputedStatus = MatePostRow & {
  /** 저장된 status와 무관하게 조회 시점 기준으로 계산한 실제 상태. */
  computedStatus: MatePostStoredStatus;
};

/**
 * 저장된 status와 무관하게 조회 시점 기준(OPEN→CLOSED)을 계산한다. 순수 함수라
 * UNIT-MATE-STATE에서 Supabase 없이 직접 테스트한다.
 */
export function computeMatePostStatus(
  row: Pick<MatePostRow, "status" | "end_date">,
  today: string = new Date().toISOString().slice(0, 10),
): MatePostStoredStatus {
  if (row.status === "CLOSED") {
    return "CLOSED";
  }
  return row.end_date < today ? "CLOSED" : "OPEN";
}

function withComputedStatus(row: MatePostRow): MatePostWithComputedStatus {
  return { ...row, computedStatus: computeMatePostStatus(row) };
}

export type CreateMatePostInput = {
  ownerId: string;
  countryId: string;
  regionId?: string | null;
  startDate: string;
  endDate: string;
  capacity: number;
  preferences?: string | null;
  travelStyles: string[];
  title: string;
  description: string;
};

export async function listMatePosts(): Promise<MatePostWithComputedStatus[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("mate_post")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }
  return (data as MatePostRow[]).map(withComputedStatus);
}

export async function getMatePostById(
  postId: string,
): Promise<MatePostWithComputedStatus | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("mate_post")
    .select("*")
    .eq("post_id", postId)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data ? withComputedStatus(data as MatePostRow) : null;
}

export async function createMatePost(
  input: CreateMatePostInput,
): Promise<MatePostRow> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("mate_post")
    .insert({
      owner_id: input.ownerId,
      country_id: input.countryId,
      region_id: input.regionId ?? null,
      start_date: input.startDate,
      end_date: input.endDate,
      capacity: input.capacity,
      preferences: input.preferences ?? null,
      travel_styles: input.travelStyles,
      title: input.title,
      description: input.description,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data as MatePostRow;
}

export type UpdateMatePostInput = Partial<
  Pick<
    CreateMatePostInput,
    | "countryId"
    | "regionId"
    | "startDate"
    | "endDate"
    | "capacity"
    | "preferences"
    | "travelStyles"
    | "title"
    | "description"
  >
>;

export async function updateMatePost(
  postId: string,
  patch: UpdateMatePostInput,
): Promise<MatePostRow> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("mate_post")
    .update({
      ...(patch.countryId !== undefined ? { country_id: patch.countryId } : {}),
      ...(patch.regionId !== undefined ? { region_id: patch.regionId } : {}),
      ...(patch.startDate !== undefined ? { start_date: patch.startDate } : {}),
      ...(patch.endDate !== undefined ? { end_date: patch.endDate } : {}),
      ...(patch.capacity !== undefined ? { capacity: patch.capacity } : {}),
      ...(patch.preferences !== undefined
        ? { preferences: patch.preferences }
        : {}),
      ...(patch.travelStyles !== undefined
        ? { travel_styles: patch.travelStyles }
        : {}),
      ...(patch.title !== undefined ? { title: patch.title } : {}),
      ...(patch.description !== undefined
        ? { description: patch.description }
        : {}),
      updated_at: new Date().toISOString(),
    })
    .eq("post_id", postId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data as MatePostRow;
}

export async function closeMatePost(postId: string): Promise<MatePostRow> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("mate_post")
    .update({ status: "CLOSED", updated_at: new Date().toISOString() })
    .eq("post_id", postId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data as MatePostRow;
}

export async function deleteMatePost(postId: string): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("mate_post")
    .delete()
    .eq("post_id", postId);
  if (error) {
    throw error;
  }
}
