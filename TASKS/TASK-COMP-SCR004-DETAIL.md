# TASK-COMP-SCR004-DETAIL — 상세 영역(Desktop 분할/Mobile Drawer)

**Category:** COMPONENT  
**Implementation Status:** IMPLEMENT  
**Seq:** 42  
**Task ID:** COMP-SCR004-DETAIL

---

## Context

SCR-004(`/mates`) 내부에 들어가는 '상세 영역(Desktop 분할/Mobile Drawer)' 컴포넌트를 구현하는 Task다. 이 컴포넌트는 해당 Screen의 Page Owner Task가 조립할 때 사용되며, 독립적으로 라우팅되지 않는다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-027, REQ-FUNC-036, REQ-FUNC-038, REQ-NF-013). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-027, REQ-FUNC-036, REQ-FUNC-038, REQ-NF-013

## Screen / Route / Page Entry

- Screen: SCR-004
- Route: `/mates`
- Page Entry: `src/app/mates/page.tsx`

## Design Ref

- design-reference/UI_CONTRACT.md 4절(SCR-004 `/mates` 동행 조회)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/D-001/DESIGN.md 9~14절(Destination Card/Form·Tabs/Mate Post Card/Drawer·Modal/Alert·Toast 등 관련 컴포넌트 스펙)

## Depends On

- COMP-SCR004-LIST — 이 Task 시작 전 완료되어 있어야 한다.
- INFRA-AUTH-GUARD — 이 Task 시작 전 완료되어 있어야 한다.
- API-MATE-APPLICATION — 이 Task 시작 전 완료되어 있어야 한다.
- API-MATE-POST — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/components/scr004/MatePostDetail.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 작성자 뷰에서 요청 목록·승인/거절, 마감/수정/삭제; 비로그인 접근 시 안내 카드

## Visual AC

- Desktop 좌우 분할, Mobile 전체화면 Drawer, `Esc`/Scrim 닫힘; 상세 데이터 로드 전 스켈레톤(Loading) 상태를 표시한다(`design-reference/UI_CONTRACT.md` 4절 상태 정의)

## Security/Privacy AC

- 비작성자 승인/거절 시도 403

## Test Cases

- [Functional] 작성자 뷰에서 요청 목록·승인/거절가 의도대로 동작하는지 확인한다.
- [Functional] 마감/수정/삭제가 의도대로 동작하는지 확인한다.
- [Functional] 비로그인 접근 시 안내 카드가 의도대로 동작하는지 확인한다.
- [Visual] Desktop 좌우 분할, Mobile 전체화면 Drawer, `Esc`/Scrim 닫힘 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.
- [Visual] 상세 데이터 로드 전 스켈레톤(Loading) 상태가 표시되는지 확인한다.
- [Security/Privacy] 비작성자 승인/거절 시도 403 조건이 위반되지 않는지 확인한다.

## Verify

- TEST-RLS-BASIC
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
