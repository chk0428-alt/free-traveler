import {
  listReportsForModerator,
  updateReportStatus,
} from "@/lib/data/reports";
import { getCurrentSessionUser } from "@/lib/auth/session";
import type { ReportStatus } from "@/lib/data/types";

const STATUS_OPTIONS: ReportStatus[] = [
  "OPEN",
  "REVIEWING",
  "RESOLVED",
  "DISMISSED",
];

async function changeReportStatus(formData: FormData): Promise<void> {
  "use server";

  const currentUser = await getCurrentSessionUser();
  if (!currentUser || currentUser.status !== "admin") {
    // 서버 재검증 — 비Admin 요청은 아무 것도 하지 않는다(403과 동등한 효과).
    return;
  }

  const reportId = String(formData.get("reportId") ?? "");
  const status = String(formData.get("status") ?? "") as ReportStatus;
  if (!STATUS_OPTIONS.includes(status)) {
    return;
  }

  await updateReportStatus(reportId, status, currentUser.id);
}

export async function AdminReportsPanel() {
  const currentUser = await getCurrentSessionUser();

  // Admin이 아니면 이 패널 자체를 렌더링하지 않는다(서버 재검증 — 클라이언트 신뢰 안 함).
  if (!currentUser || currentUser.status !== "admin") {
    return null;
  }

  const reports = await listReportsForModerator().catch(() => []);

  return (
    <section className="flex flex-col gap-md">
      <h3 className="text-title font-semibold text-ink">신고 관리</h3>
      {reports.length === 0 ? (
        <p className="text-body-sm text-muted">접수된 신고가 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-sm">
          {reports.map((report) => (
            <li
              key={report.report_id}
              className="flex flex-col gap-sm rounded-md border border-hairline bg-canvas p-md md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="text-body-sm font-semibold text-ink">
                  {report.target_type} · {report.reason_code}
                </p>
                {report.description ? (
                  <p className="text-body-sm text-body">{report.description}</p>
                ) : null}
                <p className="text-body-sm text-muted">
                  접수일 {report.created_at.slice(0, 10)}
                </p>
              </div>
              <form action={changeReportStatus} className="flex gap-sm">
                <input type="hidden" name="reportId" value={report.report_id} />
                <select
                  name="status"
                  defaultValue={report.status}
                  aria-label="신고 상태"
                  className="h-10 rounded-sm border border-hairline px-md text-body-sm text-ink"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="text-body-sm font-semibold text-primary"
                >
                  변경
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
