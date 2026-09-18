import { describe, test, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * TEST-RLS-BASIC — 6개 테이블 중 비공개 데이터(mate_application/report/user_block)에
 * 본인 외 사용자가 접근하면 전부 403 또는 빈 결과로 차단되는지 실제 Supabase 프로젝트를
 * 대상으로 검증한다.
 *
 * 이 테스트는 `supabase/seed.sql`로 시드된 로컬/테스트 Supabase 프로젝트가 필요하다.
 * 아래 환경변수가 없으면 전체를 skip한다(CI에 실 Supabase 프로젝트가 없을 때
 * `npm run test:unit`이 이 파일 때문에 실패하지 않도록 하기 위함).
 *
 *   - NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY
 *   - RLS_TEST_OWNER_EMAIL / RLS_TEST_OWNER_PASSWORD       (seed-owner)
 *   - RLS_TEST_APPLICANT_EMAIL / RLS_TEST_APPLICANT_PASSWORD (seed-applicant)
 *   - RLS_TEST_OUTSIDER_EMAIL / RLS_TEST_OUTSIDER_PASSWORD   (seed 데이터와 무관한 제3자 계정)
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const OWNER_EMAIL = process.env.RLS_TEST_OWNER_EMAIL;
const OWNER_PASSWORD = process.env.RLS_TEST_OWNER_PASSWORD;
const OUTSIDER_EMAIL = process.env.RLS_TEST_OUTSIDER_EMAIL;
const OUTSIDER_PASSWORD = process.env.RLS_TEST_OUTSIDER_PASSWORD;

const SEED_MATE_POST_ID = "44444444-4444-4444-4444-444444444444";
const SEED_APPLICATION_ID = "55555555-5555-5555-5555-555555555555";
const SEED_REPORT_ID = "66666666-6666-6666-6666-666666666666";
const SEED_OWNER_ID = "11111111-1111-1111-1111-111111111111";

const hasEnv = Boolean(
  SUPABASE_URL &&
  SUPABASE_ANON_KEY &&
  OWNER_EMAIL &&
  OWNER_PASSWORD &&
  OUTSIDER_EMAIL &&
  OUTSIDER_PASSWORD,
);

async function signIn(
  email: string,
  password: string,
): Promise<SupabaseClient> {
  const client = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
  const { error } = await client.auth.signInWithPassword({ email, password });
  if (error) {
    throw error;
  }
  return client;
}

describe.skipIf(!hasEnv)("TEST-RLS-BASIC — 비공개 데이터 접근 제어", () => {
  let ownerClient: SupabaseClient;
  let outsiderClient: SupabaseClient;

  beforeAll(async () => {
    ownerClient = await signIn(OWNER_EMAIL!, OWNER_PASSWORD!);
    outsiderClient = await signIn(OUTSIDER_EMAIL!, OUTSIDER_PASSWORD!);
  });

  test("작성자는 자신의 모집글에 달린 mate_application을 조회할 수 있다", async () => {
    const { data, error } = await ownerClient
      .from("mate_application")
      .select("application_id")
      .eq("application_id", SEED_APPLICATION_ID);

    expect(error).toBeNull();
    expect(data).toHaveLength(1);
  });

  test("제3자는 다른 사람의 mate_application을 조회할 수 없다(빈 결과)", async () => {
    const { data, error } = await outsiderClient
      .from("mate_application")
      .select("application_id")
      .eq("application_id", SEED_APPLICATION_ID);

    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });

  test("제3자는 다른 사람이 접수한 report를 조회할 수 없다(빈 결과, Admin 아님)", async () => {
    const { data, error } = await outsiderClient
      .from("report")
      .select("report_id")
      .eq("report_id", SEED_REPORT_ID);

    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });

  test("제3자는 다른 사람의 user_block 행을 조회할 수 없다(빈 결과)", async () => {
    const { data, error } = await outsiderClient
      .from("user_block")
      .select("blocker_id")
      .eq("blocker_id", SEED_OWNER_ID);

    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });

  test("본인 소유가 아닌 mate_post는 update가 0건 반영된다", async () => {
    const { data, error } = await outsiderClient
      .from("mate_post")
      .update({ title: "무단 수정 시도" })
      .eq("post_id", SEED_MATE_POST_ID)
      .select("post_id");

    expect(error).toBeNull();
    expect(data).toHaveLength(0);
  });
});
