import { describe, test, expect } from "vitest";
import { detectContactInfo } from "@/lib/contact-detection";

describe("detectContactInfo — 전화번호", () => {
  test("하이픈 포함 휴대전화 번호를 탐지한다", () => {
    const result = detectContactInfo("연락은 010-1234-5678 로 주세요.");
    expect(result.detected).toBe(true);
    expect(result.matches.some((m) => m.type === "phone")).toBe(true);
  });

  test("하이픈 없는 번호도 탐지한다", () => {
    const result = detectContactInfo("01012345678로 연락주세요");
    expect(result.detected).toBe(true);
  });
});

describe("detectContactInfo — 이메일", () => {
  test("일반적인 이메일 주소를 탐지한다", () => {
    const result = detectContactInfo("메일은 traveler@example.com 입니다.");
    expect(result.detected).toBe(true);
    expect(result.matches.some((m) => m.type === "email")).toBe(true);
  });
});

describe("detectContactInfo — 메신저 ID", () => {
  test("카카오톡 ID 언급을 탐지한다", () => {
    const result = detectContactInfo("카톡 아이디: traveler2026");
    expect(result.detected).toBe(true);
    expect(result.matches.some((m) => m.type === "messenger_id")).toBe(true);
  });

  test("텔레그램 ID 언급을 탐지한다", () => {
    const result = detectContactInfo("텔레그램 id: hiking_mate");
    expect(result.detected).toBe(true);
    expect(result.matches.some((m) => m.type === "messenger_id")).toBe(true);
  });
});

describe("detectContactInfo — 오탐 방지", () => {
  test("연락처가 없는 평범한 문장은 탐지되지 않는다", () => {
    const result = detectContactInfo(
      "제주도 3박4일 여행 같이 가실 동행분을 구합니다. 성격 좋고 사진 찍는 것 좋아해요.",
    );
    expect(result.detected).toBe(false);
    expect(result.matches).toHaveLength(0);
  });

  test("날짜·인원 등 숫자만 있는 문장은 탐지되지 않는다", () => {
    const result = detectContactInfo(
      "2026년 10월 1일부터 5일까지, 총 2명 모집합니다.",
    );
    expect(result.detected).toBe(false);
  });

  test("빈 문자열은 탐지되지 않는다", () => {
    const result = detectContactInfo("");
    expect(result.detected).toBe(false);
    expect(result.matches).toHaveLength(0);
  });
});
