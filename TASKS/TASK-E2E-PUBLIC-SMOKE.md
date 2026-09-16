# TASK-E2E-PUBLIC-SMOKE — Playwright Chromium Smoke: 공개 탐색 흐름

**Category:** E2E_TEST  
**Implementation Status:** IMPLEMENT  
**Seq:** 60  
**Task ID:** E2E-PUBLIC-SMOKE

---

## Context

Playwright(Chromium 전용)로 'Playwright Chromium Smoke: 공개 탐색 흐름'를 검증하는 Smoke Test Task다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-001, REQ-FUNC-006, REQ-FUNC-057). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-001, REQ-FUNC-006, REQ-FUNC-057

## Screen / Route / Page Entry

- Screen: SCR-001, SCR-002
- Route: `/`, `/about`
- Page Entry: -

## Design Ref

- design-reference/UI_CONTRACT.md 1절(SCR-001 `/` 메인)
- design-reference/UI_CONTRACT.md 2절(SCR-002 `/about` 대표 소개)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- docs/06_SRS_UIUX_REVISED.md 5절(Traceability), docs/PROJECT_SCOPE.md 확인 방법 열

## Depends On

- INFRA-PLAYWRIGHT-CONFIG — 이 Task 시작 전 완료되어 있어야 한다.
- PAGE-SCR001 — 이 Task 시작 전 완료되어 있어야 한다.
- PAGE-SCR002 — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `e2e/public-smoke.spec.ts`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 홈 진입→여행지 Card 클릭→상세 Drawer→안전정보 하위 탭→`/about` 이동→추천 여행지 클릭까지 Chromium에서 통과

## Visual AC

- 해당 없음(N/A)

## Security/Privacy AC

- 해당 없음(N/A)

## Test Cases

- [Functional] 홈 진입→여행지 Card 클릭→상세 Drawer→안전정보 하위 탭→`/about` 이동→추천 여행지 클릭까지 Chromium에서 통과가 의도대로 동작하는지 확인한다.
- [Visual] 해당 없음(N/A) 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.

## Verify

- CI-PIPELINE

## Definition of Done

- Functional AC, Visual AC, Security/Privacy AC 항목이 전부 충족된다.
- Expected Files 목록의 파일만 생성/수정되었다(목록 밖 파일 변경 없음).
- Depends On에 명시된 Task가 모두 완료된 상태다.
- 테스트가 실제로 작성되고 로컬/CI에서 통과한다.

## Forbidden

- Firefox/WebKit Playwright 프로젝트, 부하 테스트, 시각적 회귀 테스트를 추가하지 않는다.
- EC2 등 AWS 리소스를 프로비저닝하지 않는다.
- GitHub Auto-merge/Merge Queue 등 무인 자동 병합 설정을 추가하지 않는다.
- `user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `outbound_link_setting` 6개 테이블 외 신규 DB 테이블을 만들지 않는다.
- 항공·숙소 입력값을 서버 액션·DB·URL 쿼리 파라미터로 전달하지 않는다.
- 이 Task의 Requirement Ref에 없는 EXCLUDED Requirement 기능을 구현하지 않는다.
- 본 문서의 Expected Files 목록 밖의 파일을 생성·수정하지 않는다.
- Chromium 외 브라우저 프로젝트(Firefox/WebKit/Safari)를 설정에 추가하지 않는다.
