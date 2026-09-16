# TASK-COMP-SCR003-MATE-WRITE — 동행 구하기 탭(작성 폼/연락처 탐지/안전수칙 동의/로그인 안내)

**Category:** COMPONENT  
**Implementation Status:** IMPLEMENT(축소)  
**Seq:** 38  
**Task ID:** COMP-SCR003-MATE-WRITE

---

## Context

SCR-003(`/travel-tools`) 내부에 들어가는 '동행 구하기 탭(작성 폼/연락처 탐지/안전수칙 동의/로그인 안내)' 컴포넌트를 구현하는 Task다. 이 컴포넌트는 해당 Screen의 Page Owner Task가 조립할 때 사용되며, 독립적으로 라우팅되지 않는다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT(축소)**로 분류됨(대상 Requirement: REQ-FUNC-027, REQ-FUNC-031, REQ-FUNC-032, REQ-FUNC-080). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-027, REQ-FUNC-031, REQ-FUNC-032, REQ-FUNC-080

## Screen / Route / Page Entry

- Screen: SCR-003
- Route: `/travel-tools`
- Page Entry: `src/app/travel-tools/page.tsx`

## Design Ref

- design-reference/UI_CONTRACT.md 3절(SCR-003 `/travel-tools` 통합 여행 준비)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/D-001/DESIGN.md 9~14절(Destination Card/Form·Tabs/Mate Post Card/Drawer·Modal/Alert·Toast 등 관련 컴포넌트 스펙)

## Depends On

- COMP-SCR003-INTRO-TABS — 이 Task 시작 전 완료되어 있어야 한다.
- INFRA-AUTH-GUARD — 이 Task 시작 전 완료되어 있어야 한다.
- INFRA-CONTACT-DETECTION — 이 Task 시작 전 완료되어 있어야 한다.
- API-MATE-POST — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/components/scr003/MateWriteForm.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 비로그인/미성년 시 로그인 안내 카드로 대체, 로그인+성인확인 시 제목/국가/지역/기간/인원/조건/설명/안전수칙 동의 폼 노출, 연락처 탐지 시 제출 차단

## Visual AC

- 안내 카드와 폼이 동일 톤(코랄 CTA)

## Security/Privacy AC

- 이메일·전화번호·메신저 ID 미포함 검증, 전체 법적 문서는 미구현(축소 — 체크박스 동의만)

## Test Cases

- [Functional] 비로그인/미성년 시 로그인 안내 카드로 대체가 의도대로 동작하는지 확인한다.
- [Functional] 로그인+성인확인 시 제목/국가/지역/기간/인원/조건/설명/안전수칙 동의 폼 노출가 의도대로 동작하는지 확인한다.
- [Functional] 연락처 탐지 시 제출 차단가 의도대로 동작하는지 확인한다.
- [Visual] 안내 카드와 폼이 동일 톤(코랄 CTA) 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.
- [Security/Privacy] 이메일·전화번호·메신저 ID 미포함 검증, 전체 법적 문서는 미구현(축소 — 체크박스 동의만) 조건이 위반되지 않는지 확인한다.

## Verify

- UNIT-CONTACT-DETECTION
- E2E-MATE-AUTH

## Definition of Done

- Functional AC, Visual AC, Security/Privacy AC 항목이 전부 충족된다.
- Expected Files 목록의 파일만 생성/수정되었다(목록 밖 파일 변경 없음).
- Depends On에 명시된 Task가 모두 완료된 상태다.
- Verify 열에 명시된 Test Task(있는 경우) 또는 코드리뷰로 결과가 확인된다.

## Forbidden

- Firefox/WebKit Playwright 프로젝트, 부하 테스트, 시각적 회귀 테스트를 추가하지 않는다.
- EC2 등 AWS 리소스를 프로비저닝하지 않는다.
- GitHub Auto-merge/Merge Queue 등 무인 자동 병합 설정을 추가하지 않는다.
- `user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `outbound_link_setting` 6개 테이블 외 신규 DB 테이블을 만들지 않는다.
- 항공·숙소 입력값을 서버 액션·DB·URL 쿼리 파라미터로 전달하지 않는다.
- 이 Task의 Requirement Ref에 없는 EXCLUDED Requirement 기능을 구현하지 않는다.
- 본 문서의 Expected Files 목록 밖의 파일을 생성·수정하지 않는다.
- 전화번호/이메일/메신저 ID 등 공개 연락처 입력 필드를 만들지 않는다(탐지·차단 대상일 뿐 수집 대상이 아님).
