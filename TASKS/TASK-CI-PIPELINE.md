# TASK-CI-PIPELINE — CI 게이트(빌드/린트/유닛/RLS/E2E)

**Category:** CI  
**Implementation Status:** IMPLEMENT(축소)  
**Seq:** 63  
**Task ID:** CI-PIPELINE

---

## Context

빌드/린트/단위/RLS/E2E 결과를 병합 조건으로 묶는 CI 파이프라인 Task다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT(축소)**로 분류됨(대상 Requirement: REQ-NF-031). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-NF-031

## Screen / Route / Page Entry

- Screen: -
- Route: -
- Page Entry: -

## Design Ref

- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)

## Depends On

- UNIT-TRAVEL-DATES — 이 Task 시작 전 완료되어 있어야 한다.
- UNIT-CONTACT-DETECTION — 이 Task 시작 전 완료되어 있어야 한다.
- UNIT-MATE-STATE — 이 Task 시작 전 완료되어 있어야 한다.
- TEST-RLS-BASIC — 이 Task 시작 전 완료되어 있어야 한다.
- E2E-PUBLIC-SMOKE — 이 Task 시작 전 완료되어 있어야 한다.
- E2E-TRAVEL-TOOLS — 이 Task 시작 전 완료되어 있어야 한다.
- E2E-MATE-AUTH — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `.github/workflows/ci.yml`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- `tsc --noEmit`, `eslint`, 3개 Unit, RLS, 3개 E2E가 병합 조건으로 실행

## Visual AC

- 해당 없음(N/A)

## Security/Privacy AC

- 워크플로에 비밀키 하드코딩 금지(GitHub Secrets만 사용)

## Test Cases

- [Functional] `tsc --noEmit`가 의도대로 동작하는지 확인한다.
- [Functional] `eslint`가 의도대로 동작하는지 확인한다.
- [Functional] 3개 Unit가 의도대로 동작하는지 확인한다.
- [Functional] 3개 E2E가 병합 조건으로 실행가 의도대로 동작하는지 확인한다.
- [Visual] 해당 없음(N/A) 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.
- [Security/Privacy] 워크플로에 비밀키 하드코딩 금지(GitHub Secrets만 사용) 조건이 위반되지 않는지 확인한다.

## Verify

- 코드리뷰(워크플로 실행 로그)

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
