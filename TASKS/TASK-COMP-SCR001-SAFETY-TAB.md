# TASK-COMP-SCR001-SAFETY-TAB — 안전정보 하위 탭(Drawer 내)

**Category:** COMPONENT  
**Implementation Status:** IMPLEMENT(축소)  
**Seq:** 25  
**Task ID:** COMP-SCR001-SAFETY-TAB

---

## Context

SCR-001(`/`) 내부에 들어가는 '안전정보 하위 탭(Drawer 내)' 컴포넌트를 구현하는 Task다. 이 컴포넌트는 해당 Screen의 Page Owner Task가 조립할 때 사용되며, 독립적으로 라우팅되지 않는다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT(축소)**로 분류됨(대상 Requirement: REQ-FUNC-046, REQ-FUNC-047, REQ-FUNC-048, REQ-FUNC-049, REQ-FUNC-050, REQ-FUNC-051, REQ-FUNC-052, REQ-FUNC-053, REQ-FUNC-054, REQ-NF-028). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-046, REQ-FUNC-047, REQ-FUNC-048, REQ-FUNC-049, REQ-FUNC-050, REQ-FUNC-051, REQ-FUNC-052, REQ-FUNC-053, REQ-FUNC-054, REQ-NF-028

## Screen / Route / Page Entry

- Screen: SCR-001
- Route: `/`
- Page Entry: `src/app/page.tsx`

## Design Ref

- design-reference/UI_CONTRACT.md 1절(SCR-001 `/` 메인)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/D-001/DESIGN.md 9~14절(Destination Card/Form·Tabs/Mate Post Card/Drawer·Modal/Alert·Toast 등 관련 컴포넌트 스펙)

## Depends On

- COMP-SCR001-DETAIL-DRAWER — 이 Task 시작 전 완료되어 있어야 한다.
- DATA-SAFETY — 이 Task 시작 전 완료되어 있어야 한다.
- INFRA-OUTBOUND-LINK — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/components/scr001/SafetyTab.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 8개 카테고리 표시, `verified_at` 기준 렌더링 시점 7일 초과 시 stale 경고, 중대 경보 상단 텍스트 표시, MOFA 원문 새 탭, 공식 판단 대체 불가 고지; MOFA 원문 링크 접근 실패 시 오류 안내를 표시한다(Error 상태, `design-reference/UI_CONTRACT.md` 1절)

## Visual AC

- stale 배지는 `badge-warning`, 중대 경보는 `badge-danger`, 색상만으로 구분하지 않음(텍스트 라벨 병기)

## Security/Privacy AC

- 해당 없음(N/A)

## Test Cases

- [Functional] 8개 카테고리 표시가 의도대로 동작하는지 확인한다.
- [Functional] `verified_at` 기준 렌더링 시점 7일 초과 시 stale 경고가 의도대로 동작하는지 확인한다.
- [Functional] 중대 경보 상단 텍스트 표시가 의도대로 동작하는지 확인한다.
- [Functional] MOFA 원문 새 탭가 의도대로 동작하는지 확인한다.
- [Functional] 공식 판단 대체 불가 고지가 의도대로 동작하는지 확인한다.
- [Functional] MOFA 원문 링크 접근 실패 시 오류 안내(Error 상태)가 표시되는지 확인한다.
- [Visual] stale 배지는 `badge-warning`, 중대 경보는 `badge-danger`, 색상만으로 구분하지 않음(텍스트 라벨 병기) 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.

## Verify

- E2E-PUBLIC-SMOKE
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
