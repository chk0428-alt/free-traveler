import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { OutboundLinkSettingRow } from "@/lib/data/types";

const SETTING_ROW_ID = 1;

export async function getOutboundLinkSetting(): Promise<OutboundLinkSettingRow | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("outbound_link_setting")
    .select("*")
    .eq("id", SETTING_ROW_ID)
    .maybeSingle();

  if (error) {
    throw error;
  }
  return data as OutboundLinkSettingRow | null;
}

export type UpdateOutboundLinkSettingInput = {
  flightUrl?: string | null;
  hotelUrl?: string | null;
  updatedBy: string;
};

export async function updateOutboundLinkSetting(
  input: UpdateOutboundLinkSettingInput,
): Promise<OutboundLinkSettingRow> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("outbound_link_setting")
    .update({
      ...(input.flightUrl !== undefined ? { flight_url: input.flightUrl } : {}),
      ...(input.hotelUrl !== undefined ? { hotel_url: input.hotelUrl } : {}),
      updated_by: input.updatedBy,
      updated_at: new Date().toISOString(),
    })
    .eq("id", SETTING_ROW_ID)
    .select("*")
    .single();

  if (error) {
    throw error;
  }
  return data as OutboundLinkSettingRow;
}
