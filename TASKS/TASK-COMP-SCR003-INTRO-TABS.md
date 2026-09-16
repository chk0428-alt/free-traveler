# TASK-COMP-SCR003-INTRO-TABS — Intro + 탭 셸(항공/숙소/동행)

**Category:** COMPONENT  
**Implementation Status:** IMPLEMENT  
**Seq:** 34  
**Task ID:** COMP-SCR003-INTRO-TABS

---

## Context

SCR-003(`/travel-tools`) 내부에 들어가는 'Intro + 탭 셸(항공/숙소/동행)' 컴포넌트를 구현하는 Task다. 이 컴포넌트는 해당 Screen의 Page Owner Task가 조립할 때 사용되며, 독립적으로 라우팅되지 않는다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류된 인프라/검증 성격의 Task(직접 대응하는 REQ-FUNC/REQ-NF ID 없음, 여러 Requirement 구현을 지원).

## Requirement Ref

- (직접 대응하는 REQ-FUNC/REQ-NF ID 없음 — 인프라/검증 지원 Task)

## Screen / Route / Page Entry

- Screen: SCR-003
- Route: `/travel-tools`
- Page Entry: `src/app/travel-tools/page.tsx`

## Design Ref

- design-reference/UI_CONTRACT.md 3절(SCR-003 `/travel-tools` 통합 여행 준비)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/D-001/DESIGN.md 9~14절(Destination Card/Form·Tabs/Mate Post Card/Drawer·Modal/Alert·Toast 등 관련 컴포넌트 스펙)

## Depends On

- INFRA-DESIGN-TOKENS — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/components/scr003/IntroTabs.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 이용 순서 3단계 요약, 3개 탭 전환 UI, 탭별 입력·검증·완료 상태 독립 유지(다른 탭 전환 시 초기화 안 함)

## Visual AC

- 활성 탭은 코랄 강조, 비활성은 muted

## Security/Privacy AC

- 해당 없음(N/A)

## Test Cases

- [Functional] 이용 순서 3단계 요약가 의도대로 동작하는지 확인한다.
- [Functional] 3개 탭 전환 UI가 의도대로 동작하는지 확인한다.
- [Functional] 탭별 입력·검증·완료 상태 독립 유지(다른 탭 전환 시 초기화 안 함)가 의도대로 동작하는지 확인한다.
- [Visual] 활성 탭은 코랄 강조, 비활성은 muted 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.

## Verify

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
