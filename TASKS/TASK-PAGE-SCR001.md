# TASK-PAGE-SCR001 — SCR-001 메인 페이지 조립

**Category:** PAGE_OWNER  
**Implementation Status:** IMPLEMENT  
**Seq:** 51  
**Task ID:** PAGE-SCR001

---

## Context

SCR-001(`/`)의 Page Owner Task다. 이 Screen에 속한 Component/Data/API Task가 만든 결과물을 ``src/app/page.tsx``에서 실제 Route Page로 조립하는 것이 유일한 책임이다. 새로운 Component를 이 Task 안에서 직접 만들지 않는다(Component 생성은 각 COMP-* Task의 책임).

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-001). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-001

## Screen / Route / Page Entry

- Screen: SCR-001
- Route: `/`
- Page Entry: `src/app/page.tsx`

## Design Ref

- design-reference/UI_CONTRACT.md 1절(SCR-001 `/` 메인)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/D-001/DESIGN.md 17절(화면별 Section 순서와 최소 콘텐츠 수), 18절(완성형 Empty State/Placeholder 금지 규칙)

## Depends On

- COMP-SCR001-HERO-SEARCH — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR001-CARDGRID — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR001-DETAIL-DRAWER — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR001-SAFETY-TAB — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR001-MATE-PREVIEW — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR001-FOUNDER-SUMMARY — 이 Task 시작 전 완료되어 있어야 한다.
- INFRA-LAYOUT-SHELL — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/app/page.tsx`(기존 파일 수정 — Next.js Starter 콘텐츠 전면 교체)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- **Starter 제거**: `create-next-app` 기본 로고/“Get Started”/Vercel 안내 링크 완전 제거. **Section 순서**: ① Hero ② 국내 여행지 6개 ③ 해외 여행지 6개 ④ 여행 동기 6개(Chip) ⑤ 국가별 주의사항 6개 ⑥ 최근 동행글 3개 또는 완성형 Empty State ⑦ free_traveler 소개. **데이터 출처**: ②③은 DATA-DESTINATIONS, ⑤는 DATA-SAFETY, ⑦은 DATA-REPRESENTATIVE, ⑥은 API-MATE-POST 조회. **최소 콘텐츠 수**: ②③ 각 6개 Card, ④ 6개 Chip, ⑤ 6개 Card

## Visual AC

- 큰 빈 영역 없음, Section 간 배경(`canvas`/`surface-soft`) 교차, Hero 480~620px로 다음 Section 미리보기 확보, Desktop 3~4열/Mobile 1열

## Security/Privacy AC

- `Lorem ipsum`/`준비 중`/`정보 확인 필요`/내용 없는 Card 금지, ⑥ 데이터 없을 때도 안내 문장+이용 방법+CTA가 있는 완성형 Empty State; 비공개 데이터(참가 메시지 등) 미노출

## Test Cases

- [Functional] Next.js Starter 기본 로고/“Get Started”/Vercel 안내 링크가 화면 어디에도 남아있지 않은지 확인한다.
- [Functional] Section이 Hero→국내 6개→해외 6개→테마 Chip 6개→안전정보 6개→최근 동행글 3개(또는 Empty State)→free_traveler 소개 순서로 렌더되는지 확인한다.
- [Functional] 국내/해외 Card 각 6개, 테마 Chip 6개, 안전정보 Card 6개가 DATA-DESTINATIONS/DATA-SAFETY 데이터로 채워지는지 확인한다.
- [Functional] 동행글이 0건일 때 안내 문장+이용 방법+작성 CTA가 있는 완성형 Empty State가 표시되는지 확인한다(`Lorem ipsum`/`준비 중`/`정보 확인 필요` 미사용).
- [Visual] Desktop 1440px에서 Hero가 480~620px로 제한되어 다음 Section 상단이 스크롤 없이 보이는지 확인한다.
- [Visual] Desktop 3~4열/Mobile 1열 Card Grid, Section 배경(`canvas`/`surface-soft`) 교차를 확인한다.
- [Security/Privacy] 동행글 미리보기에 이메일/전화번호 등 비공개 연락처가 노출되지 않는지 확인한다.

## Verify

- E2E-PUBLIC-SMOKE
- MANUAL-RESPONSIVE-CHECK
- MANUAL-A11Y-CHECK
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
