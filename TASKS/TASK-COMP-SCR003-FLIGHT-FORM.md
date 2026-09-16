# TASK-COMP-SCR003-FLIGHT-FORM — 항공편 찾기 탭(폼·검증·요약·외부 이동)

**Category:** COMPONENT  
**Implementation Status:** IMPLEMENT  
**Seq:** 35  
**Task ID:** COMP-SCR003-FLIGHT-FORM

---

## Context

SCR-003(`/travel-tools`) 내부에 들어가는 '항공편 찾기 탭(폼·검증·요약·외부 이동)' 컴포넌트를 구현하는 Task다. 이 컴포넌트는 해당 Screen의 Page Owner Task가 조립할 때 사용되며, 독립적으로 라우팅되지 않는다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-011, REQ-FUNC-012, REQ-FUNC-013, REQ-FUNC-014, REQ-FUNC-015, REQ-FUNC-016, REQ-FUNC-017, REQ-FUNC-018, REQ-FUNC-054, REQ-NF-017). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-011, REQ-FUNC-012, REQ-FUNC-013, REQ-FUNC-014, REQ-FUNC-015, REQ-FUNC-016, REQ-FUNC-017, REQ-FUNC-018, REQ-FUNC-054, REQ-NF-017

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
- INFRA-OUTBOUND-LINK — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/components/scr003/FlightForm.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 국가/지역/출발일/귀국일 필수, 국가 변경 시 지역 초기화, 과거·역전 날짜 차단, 요약+비전달 고지, 외부 이동 새 탭, 서버 미전송

## Visual AC

- 필드 오류는 danger 텍스트, 요약 카드는 surface-soft; 외부 이동 버튼 클릭 직후 버튼 비활성화+로딩 표시(Loading 상태, `design-reference/UI_CONTRACT.md` 3절)

## Security/Privacy AC

- 입력값을 서버 액션·DB·URL 쿼리로 전달하지 않음(브라우저 메모리만)

## Test Cases

- [Functional] 국가/지역/출발일/귀국일 필수가 의도대로 동작하는지 확인한다.
- [Functional] 국가 변경 시 지역 초기화가 의도대로 동작하는지 확인한다.
- [Functional] 과거·역전 날짜 차단가 의도대로 동작하는지 확인한다.
- [Functional] 요약+비전달 고지가 의도대로 동작하는지 확인한다.
- [Functional] 외부 이동 새 탭가 의도대로 동작하는지 확인한다.
- [Functional] 서버 미전송가 의도대로 동작하는지 확인한다.
- [Visual] 외부 이동 버튼 클릭 직후 버튼 비활성화+로딩 표시(Loading 상태)가 나타나는지 확인한다.

## Verify

- UNIT-TRAVEL-DATES
- E2E-TRAVEL-TOOLS

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
- 입력값을 Server Action, DB, 외부 URL 쿼리 파라미터로 전달하는 코드를 추가하지 않는다.
