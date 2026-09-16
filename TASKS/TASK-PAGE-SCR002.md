# TASK-PAGE-SCR002 — SCR-002 대표 소개 페이지 조립

**Category:** PAGE_OWNER  
**Implementation Status:** IMPLEMENT  
**Seq:** 52  
**Task ID:** PAGE-SCR002

---

## Context

SCR-002(`/about`)의 Page Owner Task다. 이 Screen에 속한 Component/Data/API Task가 만든 결과물을 ``src/app/about/page.tsx``에서 실제 Route Page로 조립하는 것이 유일한 책임이다. 새로운 Component를 이 Task 안에서 직접 만들지 않는다(Component 생성은 각 COMP-* Task의 책임).

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-057). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-057

## Screen / Route / Page Entry

- Screen: SCR-002
- Route: `/about`
- Page Entry: `src/app/about/page.tsx`

## Design Ref

- design-reference/UI_CONTRACT.md 2절(SCR-002 `/about` 대표 소개)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/D-001/DESIGN.md 17절(화면별 Section 순서와 최소 콘텐츠 수), 18절(완성형 Empty State/Placeholder 금지 규칙)

## Depends On

- COMP-SCR002-HERO-METRICS — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR002-STORY — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR002-TIMELINE — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR002-COUNTRIES — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR002-GALLERY — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR002-RECOMMENDED-CTA — 이 Task 시작 전 완료되어 있어야 한다.
- INFRA-LAYOUT-SHELL — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/app/about/page.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- **Section 순서**: ① Profile Hero ② 여행 지표 ③ 소개·철학 ④ Timeline 6개 ⑤ 방문 국가 30개 ⑥ Gallery 8개 ⑦ 기억에 남는 여행지 4개+CTA. **데이터 출처**: 전 Section DATA-REPRESENTATIVE(⑦ 여행지 링크는 DATA-DESTINATIONS). **최소 콘텐츠 수**: Timeline 6개+, 국가 30개+, Gallery 8장+, 추천 4개

## Visual AC

- 큰 빈 영역 없음, Hero 480~620px, Desktop 3~4열/Mobile 1열

## Security/Privacy AC

- Placeholder 금지(정적 콘텐츠이므로 Empty State 대상 아님, 데이터 누락 시 게시 차단); 해당 없음(N/A, 공개 정적 페이지)

## Test Cases

- [Functional] Section이 Profile Hero→여행 지표→소개·철학→Timeline 6개→방문국가 30개→Gallery 8개→추천 여행지 4개+CTA 순서로 렌더되는지 확인한다.
- [Functional] `50+ Trips`/`30+ Countries` 값이 SCR-001 free_traveler 요약 섹션과 동일한지 확인한다.
- [Functional] Timeline 6개 이상, 방문국가 30개 이상, Gallery 8장 이상, 추천 여행지 4개가 실제로 렌더되는지 확인한다(데이터 누락 시 게시 차단).
- [Visual] Hero가 480~620px로 제한되어 다음 Section이 미리보기 되는지, Desktop 3~4열/Mobile 1열 그리드가 적용되는지 확인한다.

## Verify

- E2E-PUBLIC-SMOKE
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
