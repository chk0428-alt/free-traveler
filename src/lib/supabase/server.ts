import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server Component/Server Action 전용 Supabase 클라이언트. 요청마다 새로 생성해야
 * 하며(모듈 스코프에 캐시하지 않는다), 쿠키 기반 세션으로 RLS가 서버에서 강제된다.
 * Service Role Key는 이 파일에서도 사용하지 않는다 — RLS 우회 코드를 만들지 않는다
 * (`CLAUDE.md` 14~15번 규칙).
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Server Component에서 호출된 경우 쿠키 쓰기가 불가능하다 — 세션 갱신은
            // 미들웨어가 없는 이 프로젝트 범위에서는 다음 Server Action 호출 시
            // 자연스럽게 재시도된다. 렌더링을 막지 않기 위해 조용히 무시한다.
          }
        },
      },
    },
  );
}
