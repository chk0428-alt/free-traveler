# TASK-COMP-SCR005-ADMIN-REPORTS — Admin: 신고 상태 변경

**Category:** COMPONENT  
**Implementation Status:** IMPLEMENT(축소)  
**Seq:** 49  
**Task ID:** COMP-SCR005-ADMIN-REPORTS

---

## Context

SCR-005(`/account`) 내부에 들어가는 'Admin: 신고 상태 변경' 컴포넌트를 구현하는 Task다. 이 컴포넌트는 해당 Screen의 Page Owner Task가 조립할 때 사용되며, 독립적으로 라우팅되지 않는다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT(축소)**로 분류됨(대상 Requirement: REQ-FUNC-041). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-041

## Screen / Route / Page Entry

- Screen: SCR-005
- Route: `/account`
- Page Entry: `src/app/account/page.tsx`

## Design Ref

- design-reference/UI_CONTRACT.md 5절(SCR-005 `/account` 계정·관리)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/D-001/DESIGN.md 9~14절(Destination Card/Form·Tabs/Mate Post Card/Drawer·Modal/Alert·Toast 등 관련 컴포넌트 스펙)

## Depends On

- COMP-SCR005-AUTH — 이 Task 시작 전 완료되어 있어야 한다.
- API-MATE-REPORT — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/components/scr005/AdminReportsPanel.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 신고 목록(대상·사유·접수일·상태) + 상태 변경 드롭다운, 통계 차트 없음

## Visual AC

- 목록형 UI만(대시보드 아님)

## Security/Privacy AC

- 비Admin 접근 시 렌더링 안 함, 서버 403

## Test Cases

- [Functional] 신고 목록(대상·사유·접수일·상태) + 상태 변경 드롭다운가 의도대로 동작하는지 확인한다.
- [Functional] 통계 차트 없음가 의도대로 동작하는지 확인한다.
- [Visual] 목록형 UI만(대시보드 아님) 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.
- [Security/Privacy] 비Admin 접근 시 렌더링 안 함, 서버 403 조건이 위반되지 않는지 확인한다.

## Verify

- TEST-RLS-BASIC

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
