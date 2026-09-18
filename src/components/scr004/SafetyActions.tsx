"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import {
  createReportAction,
  type CreateReportActionResult,
} from "@/app/mates/actions/report";
import { blockUserAction } from "@/app/mates/actions/block";
import { showToast } from "@/components/ui/Toast";

const REPORT_REASONS = [
  { value: "CONTACT_INFO", label: "공개 연락처 노출" },
  { value: "FRAUD", label: "사기 의심" },
  { value: "HARASSMENT", label: "괴롭힘·불쾌한 언행" },
  { value: "OTHER", label: "기타" },
];

const APPLY_STEPS = [
  "1. 마음에 드는 동행 모집글을 선택하세요",
  "2. 상세 화면에서 비공개 메시지로 참가 요청을 보내세요",
  "3. 작성자가 승인하면 계정의 내 활동에서 확인할 수 있습니다",
];

export type SafetyActionsProps = {
  targetType: "mate_post" | "mate_application" | "user_profile";
  targetId: string;
  targetUserId?: string;
};

export function SafetyActions({
  targetType,
  targetId,
  targetUserId,
}: SafetyActionsProps) {
  const [reasonCode, setReasonCode] = useState("");
  const [description, setDescription] = useState("");
  const [reportResult, setReportResult] =
    useState<CreateReportActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleReport(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reasonCode) {
      return;
    }
    startTransition(async () => {
      const result = await createReportAction(
        targetType,
        targetId,
        reasonCode,
        description,
      );
      setReportResult(result);
      if (result.ok) {
        showToast(
          `신고가 접수되었습니다(접수번호: ${result.reportId.slice(0, 8)})`,
        );
        setDescription("");
        setReasonCode("");
      }
    });
  }

  function handleBlock() {
    if (!targetUserId) {
      return;
    }
    startTransition(async () => {
      const result = await blockUserAction(targetUserId);
      if (result.ok) {
        showToast("차단했습니다. 이후 서로의 글과 요청이 보이지 않습니다.");
      } else {
        showToast(result.error);
      }
    });
  }

  return (
    <div className="flex flex-col gap-lg">
      <section className="flex flex-col gap-sm rounded-md border border-hairline p-lg">
        <h3 className="text-title font-semibold text-ink">신고 / 차단</h3>
        <form onSubmit={handleReport} className="flex flex-col gap-sm">
          <select
            aria-label="신고 사유"
            value={reasonCode}
            onChange={(event) => setReasonCode(event.target.value)}
            className="h-12 rounded-sm border border-hairline px-md text-body-md text-ink"
          >
            <option value="">신고 사유 선택</option>
            {REPORT_REASONS.map((reason) => (
              <option key={reason.value} value={reason.value}>
                {reason.label}
              </option>
            ))}
          </select>
          <textarea
            aria-label="신고 설명"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={2}
            placeholder="상세 설명(선택)"
            className="rounded-sm border border-hairline p-md text-body-md text-ink"
          />
          {reportResult && !reportResult.ok ? (
            <p className="text-body-sm text-danger">{reportResult.error}</p>
          ) : null}
          <div className="flex gap-sm">
            <button
              type="submit"
              disabled={isPending || !reasonCode}
              className="flex h-12 items-center justify-center rounded-sm border border-ink px-lg text-btn font-semibold text-ink disabled:opacity-60"
            >
              신고하기
            </button>
            {targetUserId ? (
              <button
                type="button"
                onClick={handleBlock}
                disabled={isPending}
                className="flex h-12 items-center justify-center rounded-sm border border-danger px-lg text-btn font-semibold text-danger disabled:opacity-60"
              >
                차단하기
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="flex flex-col gap-sm rounded-md border border-hairline p-lg">
        <h3 className="text-title font-semibold text-ink">참가 신청 방법</h3>
        <ol className="flex flex-col gap-xs text-body-sm text-body">
          {APPLY_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="flex flex-col items-center gap-sm rounded-md bg-primary-tint p-lg text-center">
        <p className="text-title font-semibold text-ink">
          안전한 만남을 위해 대면 전 충분히 대화하고, 공개된 장소에서 만나세요.
        </p>
        <Link
          href="/travel-tools"
          className="flex h-12 items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active"
        >
          여행 준비 시작하기
        </Link>
      </section>
    </div>
  );
}
