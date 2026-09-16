# TASK-MANUAL-A11Y-CHECK — 키보드/스크린리더 브라우저 수동 확인

**Category:** MANUAL_CHECK  
**Implementation Status:** IMPLEMENT(축소)  
**Seq:** 66  
**Task ID:** MANUAL-A11Y-CHECK

---

## Context

자동화 도구로 완전히 대체할 수 없어 브라우저에서 사람이 직접 확인해야 하는 '키보드/스크린리더 브라우저 수동 확인' Task다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT(축소)**로 분류됨(대상 Requirement: REQ-NF-023, REQ-FUNC-079). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-NF-023, REQ-FUNC-079

## Screen / Route / Page Entry

- Screen: SCR-001, SCR-002, SCR-003, SCR-004, SCR-005
- Route: `/`, `/about`, `/travel-tools`, `/mates`, `/account`
- Page Entry: -

## Design Ref

- design-reference/UI_CONTRACT.md 1절(SCR-001 `/` 메인)
- design-reference/UI_CONTRACT.md 2절(SCR-002 `/about` 대표 소개)
- design-reference/UI_CONTRACT.md 3절(SCR-003 `/travel-tools` 통합 여행 준비)
- design-reference/UI_CONTRACT.md 4절(SCR-004 `/mates` 동행 조회)
- design-reference/UI_CONTRACT.md 5절(SCR-005 `/account` 계정·관리)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)

## Depends On

- PAGE-SCR001 — 이 Task 시작 전 완료되어 있어야 한다.
- PAGE-SCR002 — 이 Task 시작 전 완료되어 있어야 한다.
- PAGE-SCR003 — 이 Task 시작 전 완료되어 있어야 한다.
- PAGE-SCR004 — 이 Task 시작 전 완료되어 있어야 한다.
- PAGE-SCR005 — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- (코드 없음 — 브라우저 확인 체크리스트)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 키보드만으로 검색·폼 입력·Drawer/Modal 닫기·신고 제출 가능, 포커스 순서 논리적

## Visual AC

- 포커스 표시가 `focus-ring` 2px로 시각적으로 보임

## Security/Privacy AC

- 해당 없음(N/A)

## Test Cases

- [Functional] 키보드만으로 검색·폼 입력·Drawer/Modal 닫기·신고 제출 가능가 의도대로 동작하는지 확인한다.
- [Functional] 포커스 순서 논리적가 의도대로 동작하는지 확인한다.
- [Visual] 포커스 표시가 `focus-ring` 2px로 시각적으로 보임 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.

## Verify

- 브라우저 수동 확인(키보드 Tab 순회)

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
