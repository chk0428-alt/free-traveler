import { defineConfig } from "vitest/config";

/**
 * Traveler Unit Test 설정.
 *
 * 대상 범위(harness 규칙):
 * - `src` 안의 Unit Test(`src/**\/*.test.ts` 등 — 예: `src/lib/__tests__/*.test.ts`)
 * - `tests/unit/**` 안의 Unit Test
 *
 * `e2e/**`와 `tests/e2e/**`는 Playwright 전용 영역이므로 명시적으로 제외한다
 * (Vitest가 Playwright spec 파일을 잘못 수집해 실행하지 않도록 방지).
 *
 * 아직 Unit Test 파일이 하나도 없는 단계이므로 `passWithNoTests: true`로
 * "테스트 없음"을 실패가 아닌 정상 종료로 처리한다. Unit Test Task
 * (UNIT-TRAVEL-DATES / UNIT-CONTACT-DETECTION / UNIT-MATE-STATE)가 실제로
 * 구현되면 이 옵션을 유지한 채로도 정상적으로 해당 테스트들이 실행된다.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: [
      "src/**/*.{test,spec}.{ts,tsx}",
      "tests/unit/**/*.{test,spec}.{ts,tsx}",
    ],
    exclude: ["node_modules/**", ".next/**", "e2e/**", "tests/e2e/**"],
    passWithNoTests: true,
  },
});
