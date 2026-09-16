# TASK-COMP-SCR001-FOUNDER-SUMMARY — free_traveler 요약 섹션 + 즐겨찾기 토글

**Category:** COMPONENT  
**Implementation Status:** IMPLEMENT  
**Seq:** 27  
**Task ID:** COMP-SCR001-FOUNDER-SUMMARY

---

## Context

SCR-001(`/`) 내부에 들어가는 'free_traveler 요약 섹션 + 즐겨찾기 토글' 컴포넌트를 구현하는 Task다. 이 컴포넌트는 해당 Screen의 Page Owner Task가 조립할 때 사용되며, 독립적으로 라우팅되지 않는다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-057, REQ-FUNC-068). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-057, REQ-FUNC-068

## Screen / Route / Page Entry

- Screen: SCR-001
- Route: `/`
- Page Entry: `src/app/page.tsx`

## Design Ref

- design-reference/UI_CONTRACT.md 1절(SCR-001 `/` 메인)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/D-001/DESIGN.md 9~14절(Destination Card/Form·Tabs/Mate Post Card/Drawer·Modal/Alert·Toast 등 관련 컴포넌트 스펙)

## Depends On

- DATA-REPRESENTATIVE — 이 Task 시작 전 완료되어 있어야 한다.
- INFRA-CLIENT-STATE — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/components/scr001/FounderSummary.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- `50+ Trips`/`30+ Countries` 표시(SCR-002와 동일 값), `/about` CTA, 즐겨찾기 버튼 localStorage 연동

## Visual AC

- 좌우 분할 레이아웃(D-001 16절 시각 리듬)

## Security/Privacy AC

- 해당 없음(N/A)

## Test Cases

- [Functional] `50+ Trips`/`30+ Countries` 표시(SCR-002와 동일 값)가 의도대로 동작하는지 확인한다.
- [Functional] `/about` CTA가 의도대로 동작하는지 확인한다.
- [Functional] 즐겨찾기 버튼 localStorage 연동가 의도대로 동작하는지 확인한다.
- [Visual] 좌우 분할 레이아웃(D-001 16절 시각 리듬) 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.

## Verify

- 코드리뷰

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
