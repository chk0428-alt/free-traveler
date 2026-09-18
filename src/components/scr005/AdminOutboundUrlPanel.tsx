"use client";

import { useState, useTransition } from "react";
import { updateOutboundLinkSettingAction } from "@/app/account/actions/admin-settings";
import { showToast } from "@/components/ui/Toast";
import type { OutboundLinkSettingRow } from "@/lib/data/types";

export type AdminOutboundUrlPanelProps = {
  setting: OutboundLinkSettingRow | null;
};

export function AdminOutboundUrlPanel({ setting }: AdminOutboundUrlPanelProps) {
  const [flightUrl, setFlightUrl] = useState(setting?.flight_url ?? "");
  const [hotelUrl, setHotelUrl] = useState(setting?.hotel_url ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSave(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await updateOutboundLinkSettingAction(flightUrl, hotelUrl);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      showToast("외부 이동 URL을 저장했습니다.");
    });
  }

  return (
    <form
      onSubmit={handleSave}
      className="flex flex-col gap-md rounded-md border border-hairline bg-canvas p-lg"
    >
      <h3 className="text-title font-semibold text-ink">
        항공·숙소 외부 URL 설정
      </h3>

      <label className="flex flex-col gap-xs text-body-sm text-body">
        항공편 검색 URL
        <input
          type="url"
          required
          placeholder="https://www.google.com/travel/flights"
          value={flightUrl}
          onChange={(event) => setFlightUrl(event.target.value)}
          className="h-12 rounded-sm border border-hairline px-md text-body-md text-ink"
        />
      </label>

      <label className="flex flex-col gap-xs text-body-sm text-body">
        숙소 검색 URL
        <input
          type="url"
          required
          placeholder="https://www.booking.com"
          value={hotelUrl}
          onChange={(event) => setHotelUrl(event.target.value)}
          className="h-12 rounded-sm border border-hairline px-md text-body-md text-ink"
        />
      </label>

      {error ? <p className="text-body-sm text-danger">{error}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="flex h-12 w-fit items-center justify-center rounded-sm bg-primary px-lg text-btn font-semibold text-on-primary hover:bg-primary-active disabled:opacity-60"
      >
        저장
      </button>
    </form>
  );
}
