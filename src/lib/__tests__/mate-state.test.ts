import { describe, test, expect } from "vitest";
import { computeMatePostStatus } from "@/lib/data/mate-posts";
import {
  isActiveApplicationStatus,
  canTransitionApplicationStatus,
} from "@/lib/data/mate-applications";

const TODAY = "2026-09-18";

describe("computeMatePostStatus — OPEN→CLOSED(조회 시점 계산)", () => {
  test("작성자가 수동으로 CLOSED 처리한 글은 항상 CLOSED", () => {
    expect(
      computeMatePostStatus(
        { status: "CLOSED", end_date: "2027-01-01" },
        TODAY,
      ),
    ).toBe("CLOSED");
  });

  test("종료일이 지나지 않은 OPEN 글은 OPEN", () => {
    expect(
      computeMatePostStatus({ status: "OPEN", end_date: "2027-01-01" }, TODAY),
    ).toBe("OPEN");
  });

  test("종료일이 지난 OPEN 글은 조회 시점에 CLOSED로 계산된다", () => {
    expect(
      computeMatePostStatus({ status: "OPEN", end_date: "2026-01-01" }, TODAY),
    ).toBe("CLOSED");
  });

  test("종료일=오늘인 경계값은 아직 OPEN이다", () => {
    expect(
      computeMatePostStatus({ status: "OPEN", end_date: TODAY }, TODAY),
    ).toBe("OPEN");
  });
});

describe("isActiveApplicationStatus — 중복 신청 차단 대상", () => {
  test("PENDING은 차단 대상이다", () => {
    expect(isActiveApplicationStatus("PENDING")).toBe(true);
  });

  test("ACCEPTED는 차단 대상이다", () => {
    expect(isActiveApplicationStatus("ACCEPTED")).toBe(true);
  });

  test("REJECTED는 재신청을 허용한다(차단 대상 아님)", () => {
    expect(isActiveApplicationStatus("REJECTED")).toBe(false);
  });
});

describe("canTransitionApplicationStatus — PENDING→ACCEPTED/REJECTED", () => {
  test("PENDING에서 ACCEPTED로 전이 가능", () => {
    expect(canTransitionApplicationStatus("PENDING", "ACCEPTED")).toBe(true);
  });

  test("PENDING에서 REJECTED로 전이 가능", () => {
    expect(canTransitionApplicationStatus("PENDING", "REJECTED")).toBe(true);
  });

  test("이미 ACCEPTED인 요청은 다시 전이할 수 없다", () => {
    expect(canTransitionApplicationStatus("ACCEPTED", "REJECTED")).toBe(false);
  });

  test("이미 REJECTED인 요청은 다시 전이할 수 없다", () => {
    expect(canTransitionApplicationStatus("REJECTED", "ACCEPTED")).toBe(false);
  });
});
