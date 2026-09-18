import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { UserBlockRow } from "@/lib/data/types";

export async function listBlockedUserIds(blockerId: string): Promise<string[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("user_block")
    .select("blocked_id")
    .eq("blocker_id", blockerId);

  if (error) {
    throw error;
  }
  return (data as Pick<UserBlockRow, "blocked_id">[]).map(
    (row) => row.blocked_id,
  );
}

export async function blockUser(
  blockerId: string,
  blockedId: string,
): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("user_block")
    .insert({ blocker_id: blockerId, blocked_id: blockedId });

  if (error) {
    throw error;
  }
}

export async function unblockUser(
  blockerId: string,
  blockedId: string,
): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("user_block")
    .delete()
    .eq("blocker_id", blockerId)
    .eq("blocked_id", blockedId);

  if (error) {
    throw error;
  }
}
