"use server";

import { requireAuthenticatedUser, escapeUserInput } from "@/lib/auth/guards";
import { createReport, updateReportStatus } from "@/lib/data/reports";
import type {
  ReportRow,
  ReportStatus,
  ReportTargetType,
} from "@/lib/data/types";

export type CreateReportActionResult =
  { ok: true; reportId: string } | { ok: false; error: string };

export type UpdateReportStatusActionResult =
  { ok: true; report: ReportRow } | { ok: false; error: string };

/** SCR-004/SCR-005에서 로그인 사용자가 게시글·사용자를 신고한다. */
export async function createReportAction(
  targetType: ReportTargetType,
  targetId: string,
  reasonCode: string,
  description?: string,
): Promise<CreateReportActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }

  if (!reasonCode.trim()) {
    return { ok: false, error: "신고 사유를 선택해 주세요." };
  }

  const report = await createReport({
    reporterId: guard.user.id,
    targetType,
    targetId,
    reasonCode,
    description: description ? escapeUserInput(description.trim()) : null,
  });

  return { ok: true, reportId: report.report_id };
}

const ADMIN_ONLY_STATUSES: ReportStatus[] = [
  "OPEN",
  "REVIEWING",
  "RESOLVED",
  "DISMISSED",
];

/** SCR-005 관리자 탭에서 Admin만 신고 상태를 전이시킨다(Moderator 포함하지 않음). */
export async function updateReportStatusAction(
  reportId: string,
  status: ReportStatus,
): Promise<UpdateReportStatusActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }
  if (guard.user.status !== "admin") {
    return { ok: false, error: "FORBIDDEN" };
  }
  if (!ADMIN_ONLY_STATUSES.includes(status)) {
    return { ok: false, error: "허용되지 않은 상태 값입니다." };
  }

  const report = await updateReportStatus(reportId, status, guard.user.id);
  return { ok: true, report };
}
