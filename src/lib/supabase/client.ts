import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Component 전용 Supabase 클라이언트. Anon Key만 사용하며 Service Role Key는
 * 이 파일에서 절대 참조하지 않는다(docs/ARCHITECTURE.md 8-1절).
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
