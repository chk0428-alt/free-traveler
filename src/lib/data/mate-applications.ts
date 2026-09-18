import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  MateApplicationRow,
  MateApplicationStatus,
} from "@/lib/data/types";

export type CreateMateApplicationInput = {
  postId: string;
  applicantId: string;
  message: string;
};

/** 중복 신청 차단 대상 상태(PENDING/ACCEPTED). REJECTED는 재신청을 허용한다. */
export const ACTIVE_APPLICATION_STATUSES: MateApplicationStatus[] = [
  "PENDING",
  "ACCEPTED",
];

/** 순수 함수라 UNIT-MATE-STATE에서 Supabase 없이 직접 테스트한다. */
export function isActiveApplicationStatus(
  status: MateApplicationStatus,
): boolean {
  return ACTIVE_APPLICATION_STATUSES.includes(status);
}

/** PENDING 상태에서만 승인/거절로 전이할 수 있다(순수 함수, 직접 테스트 가능). */
export function canTransitionApplicationStatus(
  current: MateApplicationStatus,
  next: Extract<MateApplicationStatus, "ACCEPTED" | "REJECTED">,
): boolean {
  void next;
  return current === "PENDING";
}

export async function hasActiveApplication(
  postId: string,
  applicantId: string,
): Promise<boolean> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("mate_application")
    .select("application_id")
    .eq("post_id", postId)
    .eq("applicant_id", applicantId)
    .in("status", ACTIVE_APPLICATION_STATUSES)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data !== null;
}

export async function createMateApplication(
  input: CreateMateApplicationInput,
): Promise<MateApplicationRow> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("mate_application")
    .insert({
      post_id: input.postId,
      applicant_id: input.applicantId,
      message: input.message,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data as MateApplicationRow;
}

export async function listApplicationsForPost(
  postId: string,
): Promise<MateApplicationRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("mate_application")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }
  return data as MateApplicationRow[];
}

export async function listApplicationsByApplicant(
  applicantId: string,
): Promise<MateApplicationRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("mate_application")
    .select("*")
    .eq("applicant_id", applicantId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }
  return data as MateApplicationRow[];
}

export async function updateMateApplicationStatus(
  applicationId: string,
  status: Extract<MateApplicationStatus, "ACCEPTED" | "REJECTED">,
): Promise<MateApplicationRow> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("mate_application")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("application_id", applicationId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data as MateApplicationRow;
}
