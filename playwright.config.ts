import { defineConfig, devices } from "@playwright/test";

/**
 * Traveler Playwright 설정 — Chromium 단일 Project(핵심 Smoke 전용).
 *
 * Firefox/WebKit Project, 부하 테스트, 시각적 회귀 테스트는 이 설정에 추가하지
 * 않는다(`CLAUDE.md` 18번 규칙, `docs/ARCHITECTURE.md` 9절).
 */

const DEFAULT_BASE_URL = "http://127.0.0.1:3000";

// PLAYWRIGHT_BASE_URL이 있으면 Preview URL(예: Vercel Preview 배포)로 덮어쓴다.
// 이 경우 로컬 dev 서버를 새로 띄우지 않는다(이미 떠 있는 원격 대상이므로).
const baseURL = process.env.PLAYWRIGHT_BASE_URL || DEFAULT_BASE_URL;
const isRemoteTarget = Boolean(process.env.PLAYWRIGHT_BASE_URL);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // 로컬 실행(PLAYWRIGHT_BASE_URL 미설정) 시에만 `npm run dev`를 webServer로 사용한다.
  // Preview/Production URL을 대상으로 할 때는 이미 떠 있는 서버이므로 새로 띄우지 않는다.
  webServer: isRemoteTarget
    ? undefined
    : {
        command: "npm run dev",
        url: DEFAULT_BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
});
