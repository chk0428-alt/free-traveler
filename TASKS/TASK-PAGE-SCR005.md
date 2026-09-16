# TASK-PAGE-SCR005 — SCR-005 계정·관리 페이지 조립(Guest/Member/Admin)

**Category:** PAGE_OWNER  
**Implementation Status:** IMPLEMENT  
**Seq:** 55  
**Task ID:** PAGE-SCR005

---

## Context

SCR-005(`/account`)의 Page Owner Task다. 이 Screen에 속한 Component/Data/API Task가 만든 결과물을 ``src/app/account/page.tsx``에서 실제 Route Page로 조립하는 것이 유일한 책임이다. 새로운 Component를 이 Task 안에서 직접 만들지 않는다(Component 생성은 각 COMP-* Task의 책임).

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-066). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-066

## Screen / Route / Page Entry

- Screen: SCR-005
- Route: `/account`
- Page Entry: `src/app/account/page.tsx`

## Design Ref

- design-reference/UI_CONTRACT.md 5절(SCR-005 `/account` 계정·관리)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/D-001/DESIGN.md 17절(화면별 Section 순서와 최소 콘텐츠 수), 18절(완성형 Empty State/Placeholder 금지 규칙)

## Depends On

- COMP-SCR005-AUTH — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR005-PROFILE — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR005-MY-ACTIVITY-POSTS — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR005-MY-ACTIVITY-FAVORITES-BLOCKS — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR005-ADMIN-REPORTS — 이 Task 시작 전 완료되어 있어야 한다.
- COMP-SCR005-ADMIN-OUTBOUND-URL — 이 Task 시작 전 완료되어 있어야 한다.
- INFRA-LAYOUT-SHELL — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/app/account/page.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- **역할별 조립**: 현재 역할(Guest/Member/Admin)의 Intro→핵심 작업→도움말/다음 행동만 렌더링. Guest: 로그인/가입/재설정+보안안내. Member: 프로필+내 모집글+참가요청+즐겨찾기+차단. Admin: Member 화면 + 신고 상태 변경 + 외부 URL 설정 탭. **역할에 없는 관리 영역은 렌더링하지 않음**(DOM에도 존재 안 함)

## Visual AC

- 큰 빈 영역 없음, 좌측 탭 메뉴 Desktop 고정/Mobile 상단 축소

## Security/Privacy AC

- 즐겨찾기 0건 등 목록형 Section은 완성형 Empty State, `Lorem ipsum`/`준비 중`/`정보 확인 필요` 금지; 역할 판별은 서버에서 검증(클라이언트 상태만으로 Admin 탭 노출 금지), 비Admin이 Admin API 직접 호출 시 403

## Test Cases

- [Functional] 비로그인 상태에서는 Guest 화면(로그인/가입/재설정+보안안내)만 렌더되는지 확인한다.
- [Functional] 로그인+성인확인 완료 Member는 프로필/내 모집글/참가요청/즐겨찾기/차단 Section이 렌더되는지 확인한다.
- [Functional] Admin 계정에서만 신고 상태 변경, 외부 URL 설정 탭이 추가로 렌더되는지 확인한다.
- [Security/Privacy] 비Admin 계정으로 접근 시 관리자 탭이 DOM에도 존재하지 않고, 관리자 API를 직접 호출해도 403이 반환되는지 확인한다.
- [Functional] 즐겨찾기 0건일 때 홈 이동 CTA가 있는 완성형 Empty State가 표시되는지 확인한다.

## Verify

- E2E-MATE-AUTH
- TEST-RLS-BASIC
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
