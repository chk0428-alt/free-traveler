"use server";

import { requireAuthenticatedUser } from "@/lib/auth/guards";
import {
  validateOutboundUrl,
  getOutboundLinkErrorMessage,
} from "@/lib/outbound-link";
import {
  getOutboundLinkSetting,
  updateOutboundLinkSetting,
} from "@/lib/data/outbound-link-settings";
import type { OutboundLinkSettingRow } from "@/lib/data/types";

export type AdminSettingsActionResult =
  { ok: true; setting: OutboundLinkSettingRow } | { ok: false; error: string };

/** SCR-005 관리자 탭에서 Admin만 항공/숙소 외부 이동 URL을 저장한다. */
export async function updateOutboundLinkSettingAction(
  flightUrl: string,
  hotelUrl: string,
): Promise<AdminSettingsActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }
  if (guard.user.status !== "admin") {
    return { ok: false, error: "FORBIDDEN" };
  }

  const flightResult = validateOutboundUrl(flightUrl);
  if (!flightResult.ok) {
    return {
      ok: false,
      error: getOutboundLinkErrorMessage(flightResult.reason),
    };
  }
  const hotelResult = validateOutboundUrl(hotelUrl);
  if (!hotelResult.ok) {
    return {
      ok: false,
      error: getOutboundLinkErrorMessage(hotelResult.reason),
    };
  }

  const setting = await updateOutboundLinkSetting({
    flightUrl: flightResult.url,
    hotelUrl: hotelResult.url,
    updatedBy: guard.user.id,
  });

  return { ok: true, setting };
}

export async function getOutboundLinkSettingAction(): Promise<AdminSettingsActionResult> {
  const guard = await requireAuthenticatedUser();
  if (!guard.ok) {
    return { ok: false, error: guard.reason };
  }

  const setting = await getOutboundLinkSetting();
  if (!setting) {
    return { ok: false, error: "설정을 찾을 수 없습니다." };
  }
  return { ok: true, setting };
}
