# TASK-PAGE-SCR003 — SCR-003 통합 여행 준비 페이지 조립

**Category:** PAGE_OWNER  
**Implementation Status:** IMPLEMENT  
**Seq:** 53  
**Task ID:** PAGE-SCR003

---

## Context

SCR-003(`/travel-tools`)의 Page Owner Task다. 이 Screen에 속한 Component/Data/API Task가 만든 결과물을 ``src/app/travel-tools/page.tsx``에서 실제 Route Page로 조립하는 것이 유일한 책임이다. 새로운 Component를 이 Task 안에서 직접 만들지 않는다(Component 생성은 각 COMP-* Task의 책임).

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-011). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-011

## Screen / Route / Page Entry

- Screen: SCR-003
- Route: `/travel-tools`
- Page Entry: `src/app/travel-tools/page.tsx`

## Design Ref

- design-reference/UI_CONTRACT.md 3절(SCR-003 `/travel-tools` 통합 여행 준비)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/D-001/DESIGN.md 17절(화면별 Section 순서와 최소 콘텐츠 수), 18절(완성형 Empty State/Placeholder 금지 규칙)

## Depends On

- COMP-SCR003-INTRO-TABS — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR003-FLIGHT-FORM — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR003-HOTEL-FORM — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR003-TIPS — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR003-MATE-WRITE — 이 Task 시작 전 완료되어 있어야 한다.
- INFRA-LAYOUT-SHELL — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/app/travel-tools/page.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- **Section 순서**: ① Intro ② 탭(항공/숙소/동행) ③ 여행정보 Form ④ 입력 요약·외부 이동 ⑤ 찾기 Tip 3개 ⑥ 동행 작성 또는 로그인 안내·안전 안내. **탭 조립**: 항공·숙소·동행 세 탭 컴포넌트를 모두 실제로 조립(하나라도 누락 시 미완료), 탭별 상태 독립

## Visual AC

- 큰 빈 영역 없음, Section 상하 여백 64~96/40~64px

## Security/Privacy AC

- 각 탭에 `Lorem ipsum`/`준비 중`/`정보 확인 필요` 금지; 항공·숙소 입력값 서버/DB/URL 미전달(브라우저 메모리만)

## Test Cases

- [Functional] Section이 Intro→탭→여행정보 Form→입력 요약·외부 이동→Tip 3개→동행 작성/로그인 안내 순서로 렌더되는지 확인한다.
- [Functional] 항공편/숙소/동행 구하기 3개 탭 컴포넌트가 모두 실제로 조립되어 있고 하나라도 누락되지 않았는지 확인한다.
- [Functional] 탭을 전환해도 다른 탭에 입력한 값이 초기화되지 않고 독립적으로 유지되는지 확인한다.
- [Security/Privacy] 항공·숙소 입력값이 네트워크 요청(Server Action, fetch, URL 쿼리)에 전혀 포함되지 않는지 확인한다.

## Verify

- E2E-TRAVEL-TOOLS
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
