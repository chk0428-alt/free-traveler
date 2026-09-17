import { test, expect, type Locator } from "@playwright/test";

/**
 * Public Smoke — 로그인 없이 확인 가능한 핵심 흐름(E2E-001~005).
 *
 * Selector 우선순위: role/accessible name → label → test id(반복되는 Card처럼
 * 고유한 role/name이 없을 때만 최후 수단으로 사용한다).
 *
 * 외부 사이트(항공·숙소) 이동은 실제 새 탭을 열어 그 사이트 내용을 검사하지
 * 않는다 — 버튼/링크의 `href`·`target`·`rel` 속성과 화면에 보이는 안내 문구만
 * 검사한다(design-reference/UI_CONTRACT.md 3절, docs/ARCHITECTURE.md 5절).
 */

async function expectHrefDoesNotLeakInput(
  locator: Locator,
  inputValues: string[],
) {
  const href = await locator.getAttribute("href");
  expect(href, "외부 이동 링크에 href가 있어야 한다").toBeTruthy();
  expect(href).toMatch(/^https:\/\//);
  for (const value of inputValues) {
    expect(href).not.toContain(value);
  }
}

// E2E-001 — 메인 페이지의 추천 여행지와 주요 CTA
test.describe("E2E-001 메인 페이지 추천 여행지·주요 CTA", () => {
  test("국내·해외 추천 여행지 Card와 주요 CTA가 노출된다", async ({ page }) => {
    await page.goto("/");

    // 반복되는 Card 목록은 고유한 accessible name이 없으므로 test id를 사용한다.
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

    await travelToolsCta.first().click();
    await expect(page).toHaveURL(/\/travel-tools$/);
  });
});

// E2E-002 — 대표 소개의 free_traveler, 50회 이상, 30개국 이상
test.describe("E2E-002 대표 소개 핵심 지표", () => {
  test("free_traveler, 50+ Trips, 30+ Countries가 표시된다", async ({
    page,
  }) => {
    await page.goto("/about");

    await expect(page.getByText("free_traveler").first()).toBeVisible();
    await expect(
      page.getByText(/50\+\s*Trips|50회\s*이상/).first(),
    ).toBeVisible();
    await expect(
      page.getByText(/30\+\s*Countries|30개국\s*이상/).first(),
    ).toBeVisible();
  });
});

// E2E-003 — 여행 도구의 항공 외부 이동 안내와 href
test.describe("E2E-003 항공 외부 이동 안내·href", () => {
  test("항공 조건 입력 후 비전달 고지와 외부 이동 링크 href를 확인한다", async ({
    page,
  }) => {
    await page.goto("/travel-tools");

    await page.getByRole("tab", { name: /항공/ }).click();

    const country = "일본";
    const region = "도쿄";
    await page.getByLabel(/국가/).selectOption({ label: country }).catch(
      async () => {
        // 국가 필드가 select가 아니라 combobox(button+listbox)인 구현도 허용한다.
        await page.getByRole("combobox", { name: /국가/ }).fill(country);
      },
    );
    await page
      .getByLabel(/지역|도시/)
      .selectOption({ label: region })
      .catch(async () => {
        await page.getByRole("combobox", { name: /지역|도시/ }).fill(region);
      });
    await page.getByLabel(/출발일/).fill("2027-01-10");
    await page.getByLabel(/귀국일/).fill("2027-01-15");

    await page.getByRole("button", { name: /확인|다음|요약/ }).click();

    await expect(
      page.getByText(/입력값은 외부 사이트로 전달되지 않/),
    ).toBeVisible();

    const flightLink = page.getByRole("link", { name: /항공편\s*보러\s*가기/ });
    await expect(flightLink).toBeVisible();
    await expect(flightLink).toHaveAttribute("target", "_blank");
    const rel = await flightLink.getAttribute("rel");
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
    await expectHrefDoesNotLeakInput(flightLink, [
      country,
      region,
      "2027-01-10",
      "2027-01-15",
    ]);
  });
});

// E2E-004 — 여행 도구의 숙소 외부 이동 안내와 href
test.describe("E2E-004 숙소 외부 이동 안내·href", () => {
  test("숙소 조건 입력 후 비전달 고지와 외부 이동 링크 href를 확인한다", async ({
    page,
  }) => {
    await page.goto("/travel-tools");

    await page.getByRole("tab", { name: /숙소/ }).click();

    const country = "태국";
    const region = "방콕";
    await page.getByLabel(/국가/).selectOption({ label: country }).catch(
      async () => {
        await page.getByRole("combobox", { name: /국가/ }).fill(country);
      },
    );
    await page
      .getByLabel(/지역|도시/)
      .selectOption({ label: region })
      .catch(async () => {
        await page.getByRole("combobox", { name: /지역|도시/ }).fill(region);
      });
    await page.getByLabel(/체크인/).fill("2027-02-01");
    await page.getByLabel(/체크아웃/).fill("2027-02-05");

    await page.getByRole("button", { name: /확인|다음|요약/ }).click();

    await expect(
      page.getByText(/입력값은 외부 사이트로 전달되지 않/),
    ).toBeVisible();

    const hotelLink = page.getByRole("link", { name: /호텔\s*보러\s*가기/ });
    await expect(hotelLink).toBeVisible();
    await expect(hotelLink).toHaveAttribute("target", "_blank");
    const rel = await hotelLink.getAttribute("rel");
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
    await expectHrefDoesNotLeakInput(hotelLink, [
      country,
      region,
      "2027-02-01",
      "2027-02-05",
    ]);
  });
});

// E2E-005 — 비로그인 동행글 작성의 로그인 안내
test.describe("E2E-005 비로그인 동행글 작성 로그인 안내", () => {
  test("비로그인 상태에서 동행 구하기 탭은 작성 폼 대신 로그인 안내를 보여준다", async ({
    page,
  }) => {
    await page.goto("/travel-tools");

    await page.getByRole("tab", { name: /동행\s*구하기/ }).click();

    await expect(page.getByText(/로그인/).first()).toBeVisible();

    const loginCta = page.getByRole("link", { name: /로그인|가입/ });
    await expect(loginCta.first()).toBeVisible();
    await expect(loginCta.first()).toHaveAttribute("href", /\/account/);

    // 작성 폼 필드(예: 모집글 제목)는 렌더링되지 않아야 한다.
    await expect(page.getByLabel(/모집글\s*제목|제목/)).toHaveCount(0);
  });
});
