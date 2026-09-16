# Wave Plan

**HARNESS_SCHEMA:** traveler-screen-route-v1
**생성 스크립트:** `scripts/build_waves.py` — 이 문서와 `TASKS/WAVE_STATE.json`의 Wave ID가
이후 `/run-wave`, `/release-check` 등 모든 단계의 정본이다. Wave ID는 W00~W10으로 사전 고정하지
않고, 그룹(1~10) 총 Task 수가 7개를 넘거나 Expected Files 충돌·Page Owner 단독 배치 규칙 때문에
그룹이 여러 Wave로 나뉜 결과에 따라 동적으로 부여했다.

각 Wave의 `Tasks:` 목록은 **소속 표시용으로 Seq 오름차순 나열**한 것이며 실행 순서가 아니다. 실제 실행 순서는 `.claude/commands/run-wave.md` 3절의 런타임 규칙 — 그 Wave에서 Depends On이 전부 DONE인 Task 중 Seq가 가장 앞선 것을 하나씩 고르는 방식 — 을 따른다. 이 방식은 매번 DONE 여부로 다시 계산되므로, 나열 순서와 무관하게(예: W03의 `INFRA-AUTH-GUARD`가 `DB-SCHEMA-BASE`보다 먼저 나열되어 있어도) 항상 의존 순서를 지켜 실행된다.

## W01
- Group: 2 — Airbnb 스타일 공통 UI, 정적 데이터, Layout (1/2)
- Tasks: INFRA-DESIGN-TOKENS, INFRA-LAYOUT-SHELL, INFRA-CLIENT-STATE, INFRA-OUTBOUND-LINK, INFRA-CONTACT-DETECTION, INFRA-NOT-FOUND-ERROR, INFRA-PLAYWRIGHT-CONFIG
- Preview Checkpoint: no

## W02
- Group: 2 — Airbnb 스타일 공통 UI, 정적 데이터, Layout (2/2)
- Tasks: DATA-DESTINATIONS, DATA-SAFETY, DATA-REPRESENTATIVE
- Preview Checkpoint: no

## W03
- Group: 3 — Supabase Auth, 6개 Table, 기본 RLS (1/2)
- Tasks: DB-SCHEMA-BASE, DB-RLS-BASE, DB-ACCESS, DB-SEED-BASE, INFRA-AUTH-GUARD, API-MATE-POST, API-MATE-APPLICATION
- Preview Checkpoint: no

## W04
- Group: 3 — Supabase Auth, 6개 Table, 기본 RLS (2/2)
- Tasks: API-MATE-REPORT, API-MATE-BLOCK, API-ACCOUNT-PROFILE, API-ADMIN-SETTINGS, TEST-RLS-BASIC
- Preview Checkpoint: no

## W05
- Group: 4 — SCR-001 메인 Component와 Page Owner (1/2)
- Tasks: COMP-SCR001-HERO-SEARCH, COMP-SCR001-CARDGRID, COMP-SCR001-DETAIL-DRAWER, COMP-SCR001-SAFETY-TAB, COMP-SCR001-MATE-PREVIEW, COMP-SCR001-FOUNDER-SUMMARY
- Preview Checkpoint: no

## W06
- Group: 4 — SCR-001 메인 Component와 Page Owner (2/2)
- Tasks: PAGE-SCR001
- Preview Checkpoint: yes (SCREEN SCR-001 `/`)

## W07
- Group: 5 — SCR-002 대표 소개 Component와 Page Owner (1/2)
- Tasks: COMP-SCR002-HERO-METRICS, COMP-SCR002-STORY, COMP-SCR002-TIMELINE, COMP-SCR002-COUNTRIES, COMP-SCR002-GALLERY, COMP-SCR002-RECOMMENDED-CTA
- Preview Checkpoint: no

## W08
- Group: 5 — SCR-002 대표 소개 Component와 Page Owner (2/2)
- Tasks: PAGE-SCR002
- Preview Checkpoint: yes (SCREEN SCR-002 `/about`)

## W09
- Group: 6 — SCR-003 여행 입력·외부 이동·동행글 입력 Component와 Page Owner (1/2)
- Tasks: COMP-SCR003-INTRO-TABS, COMP-SCR003-FLIGHT-FORM, COMP-SCR003-HOTEL-FORM, COMP-SCR003-TIPS, COMP-SCR003-MATE-WRITE
- Preview Checkpoint: no

## W10
- Group: 6 — SCR-003 여행 입력·외부 이동·동행글 입력 Component와 Page Owner (2/2)
- Tasks: PAGE-SCR003
- Preview Checkpoint: yes (SCREEN SCR-003 `/travel-tools`)

## W11
- Group: 7 — SCR-004 동행 목록·상세·신청 Component와 Page Owner (1/2)
- Tasks: COMP-SCR004-INTRO, COMP-SCR004-FILTER, COMP-SCR004-LIST, COMP-SCR004-DETAIL, COMP-SCR004-APPLY, COMP-SCR004-SAFETY-ACTIONS
- Preview Checkpoint: no

## W12
- Group: 7 — SCR-004 동행 목록·상세·신청 Component와 Page Owner (2/2)
- Tasks: PAGE-SCR004
- Preview Checkpoint: yes (SCREEN SCR-004 `/mates`)

## W13
- Group: 8 — SCR-005 계정·내 활동·간단 관리자 Component와 Page Owner (1/2)
- Tasks: COMP-SCR005-AUTH, COMP-SCR005-PROFILE, COMP-SCR005-MY-ACTIVITY-POSTS, COMP-SCR005-MY-ACTIVITY-FAVORITES-BLOCKS, COMP-SCR005-ADMIN-REPORTS, COMP-SCR005-ADMIN-OUTBOUND-URL
- Preview Checkpoint: no

## W14
- Group: 8 — SCR-005 계정·내 활동·간단 관리자 Component와 Page Owner (2/2)
- Tasks: PAGE-SCR005
- Preview Checkpoint: yes (SCREEN SCR-005 `/account`)

## W15
- Group: 9 — Unit·Playwright·접근성·CI (1/2)
- Tasks: UNIT-TRAVEL-DATES, UNIT-CONTACT-DETECTION, UNIT-MATE-STATE, E2E-PUBLIC-SMOKE, E2E-TRAVEL-TOOLS, E2E-MATE-AUTH, CI-PIPELINE
- Preview Checkpoint: no

## W16
- Group: 9 — Unit·Playwright·접근성·CI (2/2)
- Tasks: MANUAL-RESPONSIVE-CHECK, MANUAL-A11Y-CHECK
- Preview Checkpoint: no

## W17
- Group: 10 — Vercel Preview와 Release 확인
- Tasks: RELEASE-VERCEL-SUPABASE-CHECK
- Preview Checkpoint: yes (전체 릴리스 판정)
