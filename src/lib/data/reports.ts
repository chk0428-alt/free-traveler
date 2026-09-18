import { createSupabaseServerClient } from "@/lib/supabase/server";
import type {
  ReportRow,
  ReportStatus,
  ReportTargetType,
} from "@/lib/data/types";

export type CreateReportInput = {
  reporterId: string;
  targetType: ReportTargetType;
  targetId: string;
  reasonCode: string;
  description?: string | null;
};

export async function createReport(
  input: CreateReportInput,
): Promise<ReportRow> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("report")
    .insert({
      reporter_id: input.reporterId,
      target_type: input.targetType,
      target_id: input.targetId,
      reason_code: input.reasonCode,
      description: input.description ?? null,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data as ReportRow;
}

export async function listReportsForModerator(): Promise<ReportRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("report")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }
  return data as ReportRow[];
}

const TERMINAL_STATUSES: ReportStatus[] = ["RESOLVED", "DISMISSED"];

/** Admin이 신고 상태를 OPEN/REVIEWING/RESOLVED/DISMISSED 사이에서 전이시킨다. */
export async function updateReportStatus(
  reportId: string,
  status: ReportStatus,
  assigneeId?: string,
): Promise<ReportRow> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("report")
    .update({
      status,
      assignee_id: assigneeId ?? null,
      resolved_at: TERMINAL_STATUSES.includes(status)
        ? new Date().toISOString()
        : null,
    })
    .eq("report_id", reportId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data as ReportRow;
}
