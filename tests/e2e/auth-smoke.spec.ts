import { test, expect } from "@playwright/test";

/**
 * Auth Smoke — 로그인이 필요한 핵심 흐름의 골격(E2E-006~007).
 *
 * 인증 환경변수가 없으면 이 파일 전체를 명시적으로 skip한다(공개 Smoke까지
 * 실패시키지 않기 위함 — CI에 실제 Supabase 테스트 계정 Secret이 없을 때는
 * `npm run test:e2e:public`만 돌리는 운용과 짝을 이룬다).
 *
 * 필요한 환경변수:
 *   - E2E_TEST_USER_EMAIL / E2E_TEST_USER_PASSWORD
 *       동행글을 작성하는 성인 인증 완료 계정(E2E-006, E2E-007의 작성자)
 *   - E2E_TEST_APPLICANT_EMAIL / E2E_TEST_APPLICANT_PASSWORD
 *       참가 요청을 보내는 별도 계정(E2E-007 전용, 작성자 본인 글에는 신청할 수 없으므로)
 *
 * 이 계정들은 Supabase 프로젝트에 미리 만들어 둔 테스트 전용 계정이어야 하며,
 * 이 스크립트가 새로 만들지 않는다.
 */

const OWNER_EMAIL = process.env.E2E_TEST_USER_EMAIL;
const OWNER_PASSWORD = process.env.E2E_TEST_USER_PASSWORD;
const APPLICANT_EMAIL = process.env.E2E_TEST_APPLICANT_EMAIL;
const APPLICANT_PASSWORD = process.env.E2E_TEST_APPLICANT_PASSWORD;

const hasOwnerCreds = Boolean(OWNER_EMAIL && OWNER_PASSWORD);
const hasApplicantCreds = Boolean(APPLICANT_EMAIL && APPLICANT_PASSWORD);

async function login(page: import("@playwright/test").Page, email: string, password: string) {
  await page.goto("/account");
  await page.getByLabel(/이메일/).fill(email);
  await page.getByLabel(/비밀번호/).fill(password);
  await page.getByRole("button", { name: /로그인/ }).click();
}

test.describe("E2E-006 로그인 사용자의 동행글 작성과 목록·상세 확인", () => {
  test.skip(
    !hasOwnerCreds,
    "E2E_TEST_USER_EMAIL / E2E_TEST_USER_PASSWORD 미설정 — 인증 Smoke 생략",
  );

  test("동행글을 작성하면 목록·상세에서 확인할 수 있다", async ({ page }) => {
    await login(page, OWNER_EMAIL!, OWNER_PASSWORD!);
    await expect(page.getByText(/로그인/).first()).not.toBeVisible();

    const postTitle = `E2E-006 테스트 동행글 ${Date.now()}`;

    await page.goto("/travel-tools");
    await page.getByRole("tab", { name: /동행\s*구하기/ }).click();

    await page.getByLabel(/모집글\s*제목|제목/).fill(postTitle);
    await page.getByLabel(/국가/).selectOption({ index: 1 }).catch(async () => {
      await page.getByRole("combobox", { name: /국가/ }).click();
    });
    await page.getByLabel(/지역|도시/).selectOption({ index: 1 }).catch(() => {});
    await page.getByLabel(/시작일/).fill("2027-03-01");
    await page.getByLabel(/종료일/).fill("2027-03-05");
    await page.getByLabel(/모집\s*인원/).fill("2");
    await page.getByLabel(/상세\s*설명|설명/).fill("E2E-006 자동화 테스트용 더미 설명입니다.");
    await page.getByLabel(/안전수칙.*동의|동의/).check();

    await page.getByRole("button", { name: /등록|작성|제출/ }).click();

    await page.goto("/mates");
    await expect(page.getByText(postTitle)).toBeVisible();

    await page.getByText(postTitle).click();
    await expect(
      page.getByRole("heading", { name: postTitle }).or(page.getByText(postTitle)),
    ).toBeVisible();
  });
});

test.describe("E2E-007 동행글 신청과 계정 화면의 내 활동 확인", () => {
  test.skip(
    !hasOwnerCreds || !hasApplicantCreds,
    "E2E_TEST_USER_EMAIL·E2E_TEST_APPLICANT_EMAIL 등 미설정 — 인증 Smoke 생략",
  );

  test("다른 사용자가 참가 요청을 보내면 신청자의 내 활동에서 상태를 확인할 수 있다", async ({
    page,
  }) => {
    // 1) 작성자로 로그인해 신청 대상 동행글 확인(선행 데이터는 E2E-006 또는
    //    별도 Seed로 이미 존재한다고 가정하고, 없으면 이 자리에서 최소 1개 생성한다).
    await login(page, OWNER_EMAIL!, OWNER_PASSWORD!);
    await page.goto("/mates");
    const anyOwnerPost = page.getByTestId("mate-post-card").first();
    await expect(anyOwnerPost).toBeVisible();
    const postTitle = (await anyOwnerPost.textContent())?.trim() ?? "";

    // 2) 로그아웃 후 신청자 계정으로 재로그인
    await page.getByRole("button", { name: /로그아웃/ }).click();
    await login(page, APPLICANT_EMAIL!, APPLICANT_PASSWORD!);

    // 3) 해당 동행글에 참가 요청 제출
    await page.goto("/mates");
    await page.getByText(postTitle).click();
    await page.getByLabel(/참가\s*메시지|메시지/).fill("E2E-007 자동화 테스트 참가 요청입니다.");
    await page.getByRole("button", { name: /참가\s*요청|신청/ }).click();

    await expect(page.getByText(/요청.*접수|신청.*완료/)).toBeVisible();

    // 4) 계정 화면의 내 활동에서 PENDING 상태 확인
    await page.goto("/account");
    await page.getByRole("tab", { name: /내\s*활동/ }).click();
    await expect(page.getByText(postTitle)).toBeVisible();
    await expect(page.getByText(/PENDING|대기/)).toBeVisible();
  });
});
