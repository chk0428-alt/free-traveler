import { describe, test, expect } from "vitest";
import { validateFlightDates, validateHotelDates } from "@/lib/travel-dates";

const TODAY = "2026-09-18";

describe("validateFlightDates", () => {
  test("필수값이 비어 있으면 MISSING", () => {
    expect(validateFlightDates("", "", TODAY)).toBe("MISSING");
    expect(validateFlightDates("2026-10-01", "", TODAY)).toBe("MISSING");
  });

  test("출발일이 과거면 PAST_DEPARTURE", () => {
    expect(validateFlightDates("2026-09-01", "2026-10-01", TODAY)).toBe(
      "PAST_DEPARTURE",
    );
  });

  test("귀국일이 출발일보다 빠르면 RETURN_BEFORE_DEPARTURE", () => {
    expect(validateFlightDates("2026-10-10", "2026-10-05", TODAY)).toBe(
      "RETURN_BEFORE_DEPARTURE",
    );
  });

  test("출발일=오늘, 귀국일=출발일인 경계값은 통과", () => {
    expect(validateFlightDates(TODAY, TODAY, TODAY)).toBeNull();
  });

  test("정상 범위는 null", () => {
    expect(validateFlightDates("2026-10-01", "2026-10-05", TODAY)).toBeNull();
  });
});

describe("validateHotelDates", () => {
  test("필수값이 비어 있으면 MISSING", () => {
    expect(validateHotelDates("", "")).toBe("MISSING");
  });

  test("체크아웃이 체크인과 같으면 차단(CHECKOUT_NOT_AFTER_CHECKIN)", () => {
    expect(validateHotelDates("2026-10-01", "2026-10-01")).toBe(
      "CHECKOUT_NOT_AFTER_CHECKIN",
    );
  });

  test("체크아웃이 체크인보다 이르면 차단", () => {
    expect(validateHotelDates("2026-10-05", "2026-10-01")).toBe(
      "CHECKOUT_NOT_AFTER_CHECKIN",
    );
  });

  test("체크아웃이 체크인 다음날이면 통과", () => {
    expect(validateHotelDates("2026-10-01", "2026-10-02")).toBeNull();
  });
});
