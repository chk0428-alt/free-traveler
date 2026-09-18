import { test, expect } from "@playwright/test";

/**
 * E2E-PUBLIC-SMOKE — 홈 진입→여행지 Card 클릭→상세 Drawer→안전정보 하위 탭→
 * `/about` 이동→추천 여행지 클릭까지(TASKS/TASK-E2E-PUBLIC-SMOKE.md Functional AC).
 *
 * Selector 우선순위: role/accessible name → label → test id(반복되는 Card처럼
 * 고유한 role/name이 없을 때만 최후 수단으로 사용한다).
 */

test.describe("E2E-PUBLIC-SMOKE 공개 탐색 흐름", () => {
  test("홈→여행지 상세 Drawer→안전정보→about→추천 여행지 클릭까지 통과한다", async ({
    page,
  }) => {
    await page.goto("/");

    const domesticCards = page.getByTestId("destination-card-domestic");
    const overseasCards = page.getByTestId("destination-card-overseas");
    await expect(domesticCards.first()).toBeVisible();
    await expect(overseasCards.first()).toBeVisible();
    expect(await domesticCards.count()).toBeGreaterThanOrEqual(6);
    expect(await overseasCards.count()).toBeGreaterThanOrEqual(6);

    // 주요 CTA 3개(design-reference/SCREEN_ROUTE_CONTRACT.json required_navigation)
    const travelToolsCta = page.getByRole("link", {
      name: /여행\s*준비\s*시작|여행\s*도구|Travel\s*Tools/i,
    });
    const matesCta = page.getByRole("link", { name: /동행\s*찾기/i });
    const aboutCta = page.getByRole("link", {
      name: /대표\s*소개|free_traveler/i,
    });
    await expect(travelToolsCta.first()).toBeVisible();
    await expect(matesCta.first()).toBeVisible();
    await expect(aboutCta.first()).toBeVisible();

    // 여행지 Card 클릭 → 상세 Drawer(안전정보는 해외 여행지에만 표시된다)
    await overseasCards.first().click();
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();

    // 안전정보 하위 탭(SafetyTab)
    await expect(
      drawer.getByRole("heading", { name: /국가\s*안전정보/ }),
    ).toBeVisible();

    await drawer.getByRole("button", { name: /닫기/ }).click();
    await expect(drawer).not.toBeVisible();

    // /about 이동
    await aboutCta.first().click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.getByText("free_traveler").first()).toBeVisible();
    await expect(
      page.getByText(/50\+\s*Trips|50회\s*이상/).first(),
    ).toBeVisible();
    await expect(
      page.getByText(/30\+\s*Countries|30개국\s*이상/).first(),
    ).toBeVisible();

    // 추천 여행지 클릭 → 홈으로 이동
    const recommendedHeading = page.getByRole("heading", {
      name: /기억에\s*남는\s*여행지/,
    });
    await expect(recommendedHeading).toBeVisible();
    const recommendedLink = page
      .getByRole("link")
      .filter({ hasText: /.+/ })
      .and(page.locator('a[href="/"]'))
      .first();
    await recommendedLink.click();
    await expect(page).toHaveURL(/\/$/);
  });
});
