export type OutboundLinkInvalidReason =
  "empty" | "invalid_url" | "unsupported_scheme" | "not_https";

export type OutboundLinkValidationResult =
  { ok: true; url: string } | { ok: false; reason: OutboundLinkInvalidReason };

const ALLOWED_PROTOCOL = "https:";

/**
 * 항공/숙소/외교부 등 외부 이동 URL을 저장·오픈 양쪽에서 동일 기준으로 검증한다.
 * HTTPS가 아니면(javascript:/http: 포함) 전부 차단한다.
 */
export function validateOutboundUrl(
  rawUrl: string | null | undefined,
): OutboundLinkValidationResult {
  if (!rawUrl || rawUrl.trim().length === 0) {
    return { ok: false, reason: "empty" };
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl.trim());
  } catch {
    return { ok: false, reason: "invalid_url" };
  }

  if (parsed.protocol !== ALLOWED_PROTOCOL) {
    if (parsed.protocol === "javascript:" || parsed.protocol === "http:") {
      return { ok: false, reason: "unsupported_scheme" };
    }
    return { ok: false, reason: "not_https" };
  }

  return { ok: true, url: parsed.toString() };
}

export const OUTBOUND_LINK_TARGET = "_blank" as const;
export const OUTBOUND_LINK_REL = "noopener noreferrer" as const;

export function getOutboundLinkErrorMessage(
  reason: OutboundLinkInvalidReason,
): string {
  switch (reason) {
    case "empty":
      return "이동할 주소가 아직 설정되지 않았습니다. 잠시 후 다시 시도해 주세요.";
    case "unsupported_scheme":
    case "not_https":
      return "허용되지 않은 주소 형식입니다. 관리자에게 문의해 주세요.";
    case "invalid_url":
      return "이동할 주소를 확인할 수 없습니다. 잠시 후 다시 시도해 주세요.";
  }
}

/**
 * 검증을 통과한 URL만 새 탭으로 연다(`noopener,noreferrer` 강제).
 * 실패하면 아무 것도 열지 않고 검증 결과를 그대로 반환해 호출부가 오류 배너를 그릴 수 있게 한다.
 */
export function openOutboundLink(
  rawUrl: string | null | undefined,
): OutboundLinkValidationResult {
  const result = validateOutboundUrl(rawUrl);
  if (result.ok && typeof window !== "undefined") {
    window.open(result.url, OUTBOUND_LINK_TARGET, OUTBOUND_LINK_REL);
  }
  return result;
}
