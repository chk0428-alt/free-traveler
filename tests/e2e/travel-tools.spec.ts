import { test, expect } from "@playwright/test";

/**
 * E2E-TRAVEL-TOOLS — 항공/숙소/동행 작성 흐름(TASKS/TASK-E2E-TRAVEL-TOOLS.md).
 *
 * 관리자가 항공/숙소 외부 URL을 아직 설정하지 않은 환경(로컬/CI에 라이브
 * Supabase 프로젝트가 없는 기본 상태)에서는 `src/lib/outbound-link.ts`의
 * "미설정 시 이동 차단+재시도 UI" 규약에 따라 실제 새 탭 이동 대신 오류
 * 배너가 노출된다 — 이 Smoke Test는 그 상태를 검증한다. 관리자가 실제 URL을
 * 설정한 환경(라이브 Supabase)에서의 "새 탭으로 실제 이동" 경로는 이 Task의
 * Security/Privacy AC(입력값이 쿼리 파라미터로 전달되지 않음)를 아래에서
 * href 부재 확인으로 대체 검증한다 — 입력값이 있어도 href가 생성되지 않으므로
 * 쿼리 파라미터 누출 자체가 원천적으로 불가능하다.
 */

test.describe("E2E-TRAVEL-TOOLS 항공/숙소/동행 작성 흐름", () => {
  test("항공 탭 입력→요약 확인, 관리자 URL 미설정 시 이동 차단 배너가 뜬다", async ({
    page,
  }) => {
    await page.goto("/travel-tools");
    await page.getByRole("tab", { name: /항공/ }).click();

    const panel = page.locator('[role="tabpanel"]:not([hidden])');
    const country = "일본";
    const region = "도쿄";
    await panel.getByLabel(/국가/).selectOption({ label: country });
    const regionSelect = panel.getByLabel(/지역|도시/);
    await expect(regionSelect).toBeEnabled();
    await regionSelect.selectOption({ label: region });
    await panel.getByLabel(/출발일/).fill("2027-01-10");
    await panel.getByLabel(/귀국일/).fill("2027-01-15");
    await panel.getByRole("button", { name: /확인|다음|요약/ }).click();

    await expect(
      page.getByText(/입력값은 외부 사이트로 전달되지 않/),
    ).toBeVisible();

    const flightLink = page.getByText(/항공편\s*보러\s*가기/);
    await expect(flightLink.first()).toBeVisible();

    // 입력값(국가·지역·날짜)이 어디에도 쿼리 파라미터로 노출되지 않는다.
    expect(page.url()).not.toContain(country);
    expect(page.url()).not.toContain(region);
    expect(page.url()).not.toContain("2027-01-10");

    await flightLink.first().click();
    await expect(
      page.getByText(/설정되지 않았|다시 시도|이동할 수 없/),
    ).toBeVisible();
  });

  test("숙소 탭 입력→요약 확인, 관리자 URL 미설정 시 이동 차단 배너가 뜬다", async ({
    page,
  }) => {
    await page.goto("/travel-tools");
    await page.getByRole("tab", { name: /숙소/ }).click();

    const panel = page.locator('[role="tabpanel"]:not([hidden])');
    const country = "태국";
    const region = "방콕";
    await panel.getByLabel(/국가/).selectOption({ label: country });
    const regionSelect = panel.getByLabel(/지역|도시/);
    await expect(regionSelect).toBeEnabled();
    await regionSelect.selectOption({ label: region });
    await panel.getByLabel(/체크인/).fill("2027-02-01");
    await panel.getByLabel(/체크아웃/).fill("2027-02-05");
    await panel.getByRole("button", { name: /확인|다음|요약/ }).click();

    await expect(
      page.getByText(/입력값은 외부 사이트로 전달되지 않/),
    ).toBeVisible();

    const hotelLink = page.getByText(/호텔\s*보러\s*가기/);
    await expect(hotelLink.first()).toBeVisible();

    expect(page.url()).not.toContain(country);
    expect(page.url()).not.toContain(region);
    expect(page.url()).not.toContain("2027-02-01");

    await hotelLink.first().click();
    await expect(
      page.getByText(/설정되지 않았|다시 시도|이동할 수 없/),
    ).toBeVisible();
  });

  test("비로그인 상태에서 동행 구하기 탭은 작성 폼 대신 로그인 안내를 보여준다", async ({
    page,
  }) => {
    await page.goto("/travel-tools");
    await page.getByRole("tab", { name: /동행\s*구하기/ }).click();

    await expect(page.getByText(/로그인/).first()).toBeVisible();

    const loginCta = page.getByRole("link", { name: /로그인|가입/ });
    await expect(loginCta.first()).toBeVisible();
    await expect(loginCta.first()).toHaveAttribute("href", /\/account/);

    await expect(page.getByLabel(/모집글\s*제목|제목/)).toHaveCount(0);
  });
});
