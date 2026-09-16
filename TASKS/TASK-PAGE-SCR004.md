# TASK-PAGE-SCR004 — SCR-004 동행 조회 페이지 조립

**Category:** PAGE_OWNER  
**Implementation Status:** IMPLEMENT  
**Seq:** 54  
**Task ID:** PAGE-SCR004

---

## Context

SCR-004(`/mates`)의 Page Owner Task다. 이 Screen에 속한 Component/Data/API Task가 만든 결과물을 ``src/app/mates/page.tsx``에서 실제 Route Page로 조립하는 것이 유일한 책임이다. 새로운 Component를 이 Task 안에서 직접 만들지 않는다(Component 생성은 각 COMP-* Task의 책임).

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-030). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-030

## Screen / Route / Page Entry

- Screen: SCR-004
- Route: `/mates`
- Page Entry: `src/app/mates/page.tsx`

## Design Ref

- design-reference/UI_CONTRACT.md 4절(SCR-004 `/mates` 동행 조회)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/D-001/DESIGN.md 17절(화면별 Section 순서와 최소 콘텐츠 수), 18절(완성형 Empty State/Placeholder 금지 규칙)

## Depends On

- COMP-SCR004-INTRO — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR004-FILTER — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR004-LIST — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR004-DETAIL — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR004-APPLY — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR004-SAFETY-ACTIONS — 이 Task 시작 전 완료되어 있어야 한다.
- INFRA-LAYOUT-SHELL — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/app/mates/page.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- **Section 순서**: ① Intro+작성CTA ② Filter·결과요약 ③ 동행 목록 ④ 상세 ⑤ 신청 방법 3단계 ⑥ 안전·신고·차단 안내+CTA. **최소 콘텐츠 수**: 목록 데이터 있으면 최대 8개 Card

## Visual AC

- 큰 빈 영역 없음, Desktop 목록+상세 분할/Mobile Drawer

## Security/Privacy AC

- 목록 0건 시 조건 초기화+작성 CTA+이용 방법이 있는 완성형 Empty State(빈 Card 금지); 신고·차단 데이터는 RLS로 본인/Admin만 노출

## Test Cases

- [Functional] Section이 Intro→Filter·결과요약→동행 목록→상세→신청방법 3단계→안전·신고·차단 안내+CTA 순서로 렌더되는지 확인한다.
- [Functional] 데이터가 있을 때 목록 Card가 최대 8개까지 우선 노출되는지 확인한다.
- [Functional] 필터 결과 0건일 때 조건 초기화+작성 CTA+이용 방법이 있는 완성형 Empty State가 표시되는지 확인한다.
- [Visual] Desktop은 목록+상세 좌우 분할, Mobile은 목록→상세 Drawer로 전환되는지 확인한다.
- [Security/Privacy] 신고·차단 관련 데이터가 RLS로 본인/Admin에게만 노출되는지 확인한다.

## Verify

- E2E-MATE-AUTH
- TEST-RLS-BASIC
- MANUAL-RESPONSIVE-CHECK
- RELEASE-VERCEL-SUPABASE-CHECK

## Definition of Done

- Functional AC, Visual AC, Security/Privacy AC 항목이 전부 충족된다.
- Expected Files 목록의 파일만 생성/수정되었다(목록 밖 파일 변경 없음).
- Depends On에 명시된 Task가 모두 완료된 상태다.
- Verify 열에 명시된 Test Task(있는 경우) 또는 코드리뷰로 결과가 확인된다.
- Section 순서·최소 콘텐츠 수·완성형 Empty State 요구가 실제 렌더 결과에서 확인된다(스크린샷 또는 로컬 실행으로 검증).

## Forbidden

- Firefox/WebKit Playwright 프로젝트, 부하 테스트, 시각적 회귀 테스트를 추가하지 않는다.
- EC2 등 AWS 리소스를 프로비저닝하지 않는다.
- GitHub Auto-merge/Merge Queue 등 무인 자동 병합 설정을 추가하지 않는다.
- `user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `outbound_link_setting` 6개 테이블 외 신규 DB 테이블을 만들지 않는다.
- 항공·숙소 입력값을 서버 액션·DB·URL 쿼리 파라미터로 전달하지 않는다.
- 이 Task의 Requirement Ref에 없는 EXCLUDED Requirement 기능을 구현하지 않는다.
- 본 문서의 Expected Files 목록 밖의 파일을 생성·수정하지 않는다.
- 이 Task 안에서 새로운 Component 파일을 만들지 않는다(하위 Component 생성은 범위 밖 — Route Page 조립만 수행).
