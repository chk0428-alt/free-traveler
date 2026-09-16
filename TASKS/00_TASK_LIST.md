# Traveler Task List

**Document ID:** TASKS-000-TRAVELER
**기반 문서:** `docs/06_SRS_UIUX_REVISED.md`(원문 요구사항은 `docs/02_SRS_BASELINE.md`), `docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md`, `design-reference/D-001/DESIGN.md`, `design-reference/UI_CONTRACT.md`, `design-reference/SCREEN_ROUTE_CONTRACT.json`, 실제 `src/app` 파일 트리(`docs/tasks/_src_app_tree_snapshot.json`)
**선행 검사:** `python3 scripts/validate_inputs.py` — 33건 전부 PASS(실행 로그: HARNESS_SCHEMA=traveler-screen-route-v1, Screen 5개, D-001 LOCKED, Requirement 114건 확인). 실패 시 본 문서를 작성하지 않는다는 조건을 충족했으므로 작성을 진행한다.
**작성일:** 2026-09-19
**상태:** Task List Baseline — 구현 코드/Branch/Commit/Issue 없음(계획 문서만)

---

## 요약

| 구분 | 값 |
|---|---|
| Task 총수 | **66개** |
| Requirement 커버리지 | REQ-FUNC-001~080(80) + REQ-NF-001~034(34) = **114건 전수** — IMPLEMENT 계열 77건은 Task에, EXCLUDED 37건은 NON_IMPLEMENTATION 표에 등록. 누락 0건 |
| 누락된 Requirement ID | **없음** |

### Category별 Task 수

| Category | 설명 | Task 수 |
|---|---|---|
| INFRA | Screen 비종속 인프라/유틸 | 8 |
| DATA | 정적 데이터(여행지/안전/대표) | 3 |
| DB | Schema/RLS/Access/Seed | 4 |
| API | Server Action/Route Handler | 6 |
| COMPONENT | Screen 내 컴포넌트(SCR-001~005) | 29 |
| PAGE_OWNER | Screen 조립(SCR-001~005 각 1개) | 5 |
| UNIT_TEST | 단위 테스트 | 3 |
| RLS_TEST | Supabase RLS 검증 | 1 |
| E2E_TEST | Playwright Chromium Smoke | 3 |
| CI | 빌드/린트/테스트 게이트 | 1 |
| RELEASE_CHECK | Vercel/Supabase 배포 확인 | 1 |
| MANUAL_CHECK | 브라우저 수동 확인 | 2 |
| **합계** | | **66** |

### 열 정의

`Seq, Task ID, 제목, Category, Implementation Status, Requirement Ref, Screen, Route, Page Entry, Depends On, Expected Files, Functional AC, Visual AC, Security/Privacy AC, Verify, Priority`

- **Implementation Status**: `docs/PROJECT_SCOPE.md` 분류(`IMPLEMENT`/`IMPLEMENT(축소)`)를 그대로 사용한다. Task List에는 EXCLUDED 항목의 구현 Task를 만들지 않는다(하단 NON_IMPLEMENTATION 표 참고).
- **Screen/Route/Page Entry**: Screen 비종속 Task(INFRA/DATA/DB/API/CI/RELEASE)는 `-`로 표기한다.
- **Depends On**: 없으면 `-`.
- **Verify**: 이 Task를 검증하는 다른 Task ID(Unit/RLS/E2E/Manual/Release) 또는 `코드리뷰`.
- **Priority**: `P0`(MVP 필수, 없으면 릴리스 불가) / `P1`(MVP 품질에 필요) / `P2`(구조적 뼈대·저위험 콘텐츠).

---

## 1. INFRA (8)

| Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | INFRA-DESIGN-TOKENS | 디자인 토큰/Tailwind 설정 | INFRA | IMPLEMENT | REQ-NF-006, REQ-NF-023 | - | - | - | - | `tailwind.config.ts`(신규), `src/app/globals.css`(수정) | D-001 색상(coral #F2613B 등)·타이포(Inter+시스템 한글)·spacing(64~96/40~64)·radius·shadow 토큰이 코드 상수로 정의된다 | 토큰 값이 D-001 표와 1:1 일치(임의 색상 추가 없음) | 해당 없음(N/A) | 코드리뷰 | P0 |
| 2 | INFRA-LAYOUT-SHELL | 공통 Header/Footer 레이아웃 | INFRA | IMPLEMENT | REQ-FUNC-064, REQ-FUNC-065, REQ-FUNC-079 | COMMON | - | `src/app/layout.tsx` | INFRA-DESIGN-TOKENS | `src/app/layout.tsx`(수정), `src/components/layout/Header.tsx`(신규), `src/components/layout/Footer.tsx`(신규) | 5개 Screen 전체에 동일 Header/Footer 렌더, 320px~1440px 반응형, Mobile 햄버거 메뉴 | D-001 7절 Header 72px/Mobile 60px, Footer 4컬럼/Mobile 1컬럼 아코디언 재현 | 외부 링크에 `noopener noreferrer` 없음(내비게이션은 내부 링크만) | MANUAL-RESPONSIVE-CHECK, MANUAL-A11Y-CHECK | P0 |
| 3 | INFRA-CLIENT-STATE | 즐겨찾기 localStorage 유틸 + Toast 알림 컴포넌트 | INFRA | IMPLEMENT(축소) | REQ-FUNC-068, REQ-FUNC-043 | - | - | - | INFRA-DESIGN-TOKENS | `src/lib/client/favorites.ts`(신규), `src/components/ui/Toast.tsx`(신규) | 즐겨찾기는 `localStorage`에만 저장(서버 미전송), 중복 추가 방지; Toast는 상태 변경 시 일시 노출 후 자동 소멸 | D-001 13절 Toast 스펙(잉크 배경/흰 텍스트) 준수 | localStorage 키에 개인식별정보 저장 금지(여행지 ID만 저장) | 코드리뷰, E2E-PUBLIC-SMOKE | P1 |
| 4 | INFRA-OUTBOUND-LINK | 외부 링크 이동 유틸(새 탭/허용목록) | INFRA | IMPLEMENT | REQ-FUNC-016, REQ-FUNC-018, REQ-FUNC-024, REQ-FUNC-026, REQ-FUNC-049, REQ-FUNC-077 | - | - | - | - | `src/lib/outbound-link.ts`(신규) | 설정된 URL만 새 탭으로 열기, 허용목록(HTTPS만) 밖 URL·미설정 시 이동 차단+재시도 UI | 오류 상태는 `color.danger` 인라인 배너로 표시 | `target=_blank`+`rel="noopener noreferrer"` 강제, `javascript:`/`http:` URL 저장 차단 | E2E-TRAVEL-TOOLS, 코드리뷰 | P0 |
| 5 | INFRA-CONTACT-DETECTION | 공개 연락처(전화/이메일/메신저 ID) 탐지 유틸 | INFRA | IMPLEMENT | REQ-FUNC-032 | - | - | - | - | `src/lib/contact-detection.ts`(신규) | 전화번호/이메일/카카오톡·텔레그램 ID 패턴 탐지 시 제출 차단 및 수정 안내 | 탐지 시 필드 인라인 오류(`color.danger`) 표시 | 탐지 로직은 클라이언트·서버 양쪽에서 재검증(서버 우회 방지) | UNIT-CONTACT-DETECTION | P0 |
| 6 | INFRA-AUTH-GUARD | 인증/역할 가드 유틸 + CSRF/입력 검증 | INFRA | IMPLEMENT | REQ-FUNC-027, REQ-FUNC-028, REQ-NF-014, REQ-NF-015 | - | - | - | DB-SCHEMA-BASE, DB-RLS-BASE | `src/lib/auth/session.ts`(신규), `src/lib/auth/guards.ts`(신규) | 비로그인/미성년/제한 계정의 쓰기 요청을 서버에서 차단, Server Action은 Next.js 기본 CSRF 보호 사용 | 접근 거부 시 로그인 안내 카드로 대체(빈 화면 금지) | 정확한 생년월일 미저장(`is_adult`+`adult_verified_at`만), 입력값 이스케이프로 저장 XSS 차단 | TEST-RLS-BASIC, 코드리뷰 | P0 |
| 7 | INFRA-NOT-FOUND-ERROR | 404/500 기술 Route | INFRA | IMPLEMENT | REQ-FUNC-078 | - | `*` | `src/app/not-found.tsx`, `src/app/error.tsx` | INFRA-LAYOUT-SHELL | `src/app/not-found.tsx`(신규), `src/app/error.tsx`(신규) | 404/500/외부연결 실패 시 홈 이동 또는 재시도 CTA 최소 1개 제공 | 공통 Header/Footer 유지, D-001 톤 준수 | 스택 트레이스 등 민감정보 미노출 | E2E-PUBLIC-SMOKE, 코드리뷰 | P1 |
| 8 | INFRA-PLAYWRIGHT-CONFIG | Playwright Chromium 프로젝트 설정 | INFRA | IMPLEMENT | - | - | - | - | - | `playwright.config.ts`(신규), `package.json`(devDependency 추가) | `projects` 배열에 Chromium 1개만 정의(Firefox/WebKit 없음) | 해당 없음(N/A) | 해당 없음(N/A) | CI-PIPELINE | P0 |

---

## 2. DATA (3, 필수 Task ID)

| Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 9 | DATA-DESTINATIONS | 여행지 정적 데이터 | DATA | IMPLEMENT | REQ-FUNC-004, REQ-FUNC-008, REQ-NF-026 | - | - | - | - | `src/data/destinations.ts`(신규) | 국내 10곳 이상·해외 15개국 30도시 이상, 여행지당 소개 300자+·명소 5개+·1일/3일 일정·예산·교통·음식 3개+·에티켓 3개+·출처·수정일 필드 충족 | 대표 이미지 URL은 실제 장소 사진, `alt`는 해당 장소를 설명하는 문장(자리표시자 금지) | 이미지 URL은 공개 인터넷 URL만 사용(자격 증명 불필요 소스) | 코드리뷰, PAGE-SCR001 | P0 |
| 10 | DATA-SAFETY | 국가 안전정보 정적 데이터 | DATA | IMPLEMENT | REQ-FUNC-046, REQ-FUNC-047, REQ-FUNC-048, REQ-FUNC-052, REQ-FUNC-053, REQ-NF-027 | - | - | - | - | `src/data/safety.ts`(신규) | 소개된 모든 해외 국가에 8개 카테고리(치안/사기/법규/교통/재난/보건/문화/긴급연락처) + 출처 + `verified_at` + 경보 범위(scope_type/scope_text) 포함 | 필수 카테고리 누락 시 게시 불가(데이터 검증 스크립트 또는 타입 체크) | 공식 출처 URL만 사용, 임의 생성 정보 금지 | 코드리뷰, SCR-001-SAFETY-TAB | P0 |
| 11 | DATA-REPRESENTATIVE | free_traveler 대표 프로필 정적 데이터 | DATA | IMPLEMENT | REQ-FUNC-057, REQ-FUNC-058, REQ-FUNC-059, REQ-FUNC-060, REQ-FUNC-061 | - | - | - | - | `src/data/profile.ts`(신규) | `50+ Trips`/`30+ Countries` 단일 소스, 소개문·철학, Timeline 6개+, 방문국가 30개+, 대표 이미지 alt/출처 포함 | 수치가 SCR-001/SCR-002 전역에서 동일 값 참조(하드코딩 중복 금지) | 인물 사진은 특정 서비스 보증으로 오인되지 않는 이미지만 사용 | 코드리뷰, PAGE-SCR002 | P0 |

---

## 3. DB (4, 필수 Task ID)

| Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 12 | DB-SCHEMA-BASE | Supabase 스키마(6개 테이블) | DB | IMPLEMENT | - | - | - | - | - | `supabase/migrations/0001_schema_base.sql`(신규) | `user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `outbound_link_setting` 6개 테이블만 생성, 그 외 테이블 생성 금지 | 해당 없음(N/A) | `user_profile`에 생년월일 컬럼 없음(`is_adult`, `adult_verified_at`만) | TEST-RLS-BASIC | P0 |
| 13 | DB-RLS-BASE | Supabase RLS 정책 | DB | IMPLEMENT | REQ-FUNC-044, REQ-NF-013 | - | - | - | DB-SCHEMA-BASE | `supabase/migrations/0002_rls_base.sql`(신규) | 본인 글/요청, 작성자, Moderator/Admin만 비공개 데이터 열람; 그 외 요청은 403 또는 빈 결과 | 해당 없음(N/A) | RLS가 서버에서 강제(클라이언트 신뢰 금지) | TEST-RLS-BASIC | P0 |
| 14 | DB-ACCESS | 데이터 접근 계층(Supabase client/server 헬퍼) | DB | IMPLEMENT | REQ-NF-012, REQ-NF-016 | - | - | - | DB-SCHEMA-BASE, DB-RLS-BASE | `src/lib/supabase/client.ts`(신규), `src/lib/supabase/server.ts`(신규), `src/lib/data/*.ts`(신규) | 모든 DB 접근이 이 계층을 통해서만 이루어짐(직접 fetch 금지) | 해당 없음(N/A) | 비밀키는 서버 전용 환경변수로만 접근, 클라이언트 번들 미포함, TLS 1.2+ | RELEASE-VERCEL-SUPABASE-CHECK, 코드리뷰 | P0 |
| 15 | DB-SEED-BASE | 개발/테스트용 Seed 데이터 | DB | IMPLEMENT(축소) | - | - | - | - | DB-SCHEMA-BASE | `supabase/seed.sql`(신규) | 로컬/테스트 환경에서 mate_post·mate_application·report 등 최소 샘플 행 생성(RLS 테스트용) | 해당 없음(N/A) | 실제 개인정보 미포함(더미 데이터만) | TEST-RLS-BASIC | P1 |

---

## 4. API (6)

| Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 16 | API-MATE-POST | 동행글 생성/수정/마감 Server Action | API | IMPLEMENT | REQ-FUNC-031, REQ-FUNC-037, REQ-FUNC-038 | SCR-003, SCR-004 | `/travel-tools`, `/mates` | `src/app/travel-tools/actions/mate-post.ts`, `src/app/mates/actions/mate-post.ts` | DB-ACCESS, INFRA-CONTACT-DETECTION, INFRA-AUTH-GUARD | `src/app/travel-tools/actions/mate-post.ts`(신규), `src/app/mates/actions/mate-post.ts`(신규) | 필수값 누락/역전 날짜/과거 종료일 차단, 종료일 경과 글은 조회 시점에 CLOSED로 계산, 작성자 수동 마감/수정/삭제 | 해당 없음(N/A) | 연락처 패턴 서버측 재탐지, 비로그인/미인증 요청 차단 | UNIT-MATE-STATE, E2E-MATE-AUTH | P0 |
| 17 | API-MATE-APPLICATION | 참가 요청 제출/승인/거절 Server Action | API | IMPLEMENT | REQ-FUNC-034, REQ-FUNC-035, REQ-FUNC-036, REQ-FUNC-043 | SCR-004, SCR-005 | `/mates`, `/account` | `src/app/mates/actions/mate-application.ts` | DB-ACCESS, INFRA-AUTH-GUARD | `src/app/mates/actions/mate-application.ts`(신규) | 500자 이내 비공개 메시지, PENDING 저장, 동일 사용자 중복 PENDING/ACCEPTED 차단, 작성자만 승인/거절 | 상태 변경 시 Toast로 확인 | 참가 메시지는 작성자·요청자만 열람(RLS) | UNIT-MATE-STATE, TEST-RLS-BASIC | P0 |
| 18 | API-MATE-REPORT | 신고 접수/상태 변경 Server Action | API | IMPLEMENT | REQ-FUNC-039, REQ-FUNC-041 | SCR-004, SCR-005 | `/mates`, `/account` | `src/app/mates/actions/report.ts` | DB-ACCESS, INFRA-AUTH-GUARD | `src/app/mates/actions/report.ts`(신규) | 신고 접수 시 접수 ID 즉시 반환, Admin만 OPEN/REVIEWING/RESOLVED/DISMISSED 상태 변경 가능 | 접수 확인 Toast(3초 이내 노출) | 신고자/피신고자 상세는 Admin만 열람(RLS) | TEST-RLS-BASIC, E2E-MATE-AUTH | P0 |
| 19 | API-MATE-BLOCK | 사용자 차단/해제 Server Action | API | IMPLEMENT | REQ-FUNC-040 | SCR-004, SCR-005 | `/mates`, `/account` | `src/app/mates/actions/block.ts` | DB-ACCESS, INFRA-AUTH-GUARD | `src/app/mates/actions/block.ts`(신규) | 차단 후 상호 글/프로필/요청 미노출, 차단 해제 가능 | 해당 없음(N/A) | 차단 관계는 본인만 열람(RLS) | TEST-RLS-BASIC | P0 |
| 20 | API-ACCOUNT-PROFILE | 프로필/성인확인/가입 Server Action | API | IMPLEMENT | REQ-FUNC-028, REQ-FUNC-029, REQ-FUNC-066 | SCR-005 | `/account` | `src/app/account/actions/profile.ts` | DB-ACCESS, INFRA-AUTH-GUARD | `src/app/account/actions/profile.ts`(신규) | 이메일 가입/인증/로그인/로그아웃/재설정, 닉네임 유일성, 성인확인 시각만 기록 | 해당 없음(N/A) | 생년월일 미저장, 비밀번호는 Supabase Auth 위임(자체 저장 금지) | E2E-MATE-AUTH | P0 |
| 21 | API-ADMIN-SETTINGS | 외부 URL 설정 Server Action | API | IMPLEMENT | REQ-FUNC-077 | SCR-005 | `/account` | `src/app/account/actions/admin-settings.ts` | DB-ACCESS, INFRA-AUTH-GUARD, INFRA-OUTBOUND-LINK | `src/app/account/actions/admin-settings.ts`(신규) | Admin만 항공/숙소 URL 저장, HTTPS·허용목록 검증, 실패 시 인라인 오류 | 저장 완료 Toast | `javascript:`/`http:` URL 저장 차단, 비Admin 요청 403 | TEST-RLS-BASIC, 코드리뷰 | P0 |

---

## 5. COMPONENT — SCR-001 (6)

| Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 22 | COMP-SCR001-HERO-SEARCH | Hero + 검색/필터 바 | COMPONENT | IMPLEMENT | REQ-FUNC-001, REQ-FUNC-002, REQ-FUNC-003, REQ-FUNC-005 | SCR-001 | `/` | `src/app/page.tsx` | INFRA-DESIGN-TOKENS, INFRA-LAYOUT-SHELL | `src/components/scr001/Hero.tsx`(신규) | 국내/해외 구분 표시, 국가·도시·계절·테마·기간 AND 필터, 결과 0건 시 조건 완화 안내+초기화 버튼(300ms 이내) | Hero 높이 480~620px 범위(D-001 15절), 다음 Section 미리보기 확보 | 해당 없음(N/A) | MANUAL-RESPONSIVE-CHECK, E2E-PUBLIC-SMOKE | P0 |
| 23 | COMP-SCR001-CARDGRID | 국내/해외 여행지 Card Grid | COMPONENT | IMPLEMENT | REQ-FUNC-004, REQ-FUNC-007 | SCR-001 | `/` | `src/app/page.tsx` | INFRA-DESIGN-TOKENS, DATA-DESTINATIONS | `src/components/scr001/DestinationCardGrid.tsx`(신규) | 국내 6개·해외 6개 Card, 각 Card에 alt 있는 이미지·테마 태그, 클릭 시 상세 Drawer 오픈(라우트 이동 아님) | Desktop 3~4열/Mobile 1열, Card 간격 24px/16px; 데이터 로드 전 Card 스켈레톤(Loading) 상태 표시 | 해당 없음(N/A) | E2E-PUBLIC-SMOKE | P0 |
| 24 | COMP-SCR001-DETAIL-DRAWER | 여행지 상세 Drawer/Modal | COMPONENT | IMPLEMENT | REQ-FUNC-004, REQ-FUNC-006 | SCR-001 | `/` | `src/app/page.tsx` | COMP-SCR001-CARDGRID, DATA-DESTINATIONS | `src/components/scr001/DestinationDrawer.tsx`(신규) | 소개 300자+·명소 5개+·추천시기·1일/3일 일정·예산·교통·음식3개+·에티켓3개+·출처/수정일 전부 표시, 해외는 안전정보 연결; 상세 데이터 로드 실패 시 오류 안내+닫기 제공(Error 상태) | Desktop 우측 슬라이드 480px, Mobile 전체화면, `Esc`/Scrim으로 닫힘, 포커스 트랩 | 해당 없음(N/A) | MANUAL-A11Y-CHECK, E2E-PUBLIC-SMOKE | P0 |
| 25 | COMP-SCR001-SAFETY-TAB | 안전정보 하위 탭(Drawer 내) | COMPONENT | IMPLEMENT(축소) | REQ-FUNC-046, REQ-FUNC-047, REQ-FUNC-048, REQ-FUNC-049, REQ-FUNC-050, REQ-FUNC-051, REQ-FUNC-052, REQ-FUNC-053, REQ-FUNC-054, REQ-NF-028 | SCR-001 | `/` | `src/app/page.tsx` | COMP-SCR001-DETAIL-DRAWER, DATA-SAFETY, INFRA-OUTBOUND-LINK | `src/components/scr001/SafetyTab.tsx`(신규) | 8개 카테고리 표시, `verified_at` 기준 렌더링 시점 7일 초과 시 stale 경고, 중대 경보 상단 텍스트 표시, MOFA 원문 새 탭, 공식 판단 대체 불가 고지; MOFA 원문 링크 실패 시 오류 안내 표시(Error 상태) | stale 배지는 `badge-warning`, 중대 경보는 `badge-danger`, 색상만으로 구분하지 않음(텍스트 라벨 병기) | 해당 없음(N/A) | E2E-PUBLIC-SMOKE, 코드리뷰 | P0 |
| 26 | COMP-SCR001-MATE-PREVIEW | 최근 동행글 3개 또는 완성형 Empty State | COMPONENT | IMPLEMENT | - | SCR-001 | `/` | `src/app/page.tsx` | DB-ACCESS | `src/components/scr001/MatePreview.tsx`(신규) | 최근 3개 조회 또는 데이터 없을 시 안내 문장+이용 방법+"동행글 작성하기" CTA(`Lorem ipsum`/`준비 중`/`정보 확인 필요`/빈 Card 금지) | 다른 Section과 시각적 리듬 교차(Card 목록형) | 비공개 연락처 미노출 | E2E-PUBLIC-SMOKE | P1 |
| 27 | COMP-SCR001-FOUNDER-SUMMARY | free_traveler 요약 섹션 + 즐겨찾기 토글 | COMPONENT | IMPLEMENT | REQ-FUNC-057, REQ-FUNC-068 | SCR-001 | `/` | `src/app/page.tsx` | DATA-REPRESENTATIVE, INFRA-CLIENT-STATE | `src/components/scr001/FounderSummary.tsx`(신규) | `50+ Trips`/`30+ Countries` 표시(SCR-002와 동일 값), `/about` CTA, 즐겨찾기 버튼 localStorage 연동 | 좌우 분할 레이아웃(D-001 16절 시각 리듬) | 해당 없음(N/A) | 코드리뷰 | P1 |

---

## 6. COMPONENT — SCR-002 (6)

| Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 28 | COMP-SCR002-HERO-METRICS | Profile Hero + 여행 지표 카드 3개 | COMPONENT | IMPLEMENT | REQ-FUNC-057, REQ-FUNC-058 | SCR-002 | `/about` | `src/app/about/page.tsx` | DATA-REPRESENTATIVE, INFRA-DESIGN-TOKENS | `src/components/scr002/ProfileHero.tsx`(신규) | 대표명·`50+ Trips`·`30+ Countries` 표시, SCR-001과 값 일치 | Hero 480~620px, 다음 Section 미리보기; Hero 이미지 로드 전 스켈레톤(Loading) 상태 표시 | 해당 없음(N/A) | 코드리뷰, MANUAL-RESPONSIVE-CHECK | P1 |
| 29 | COMP-SCR002-STORY | 자기소개·철학 2~4문단 | COMPONENT | IMPLEMENT | REQ-FUNC-058 | SCR-002 | `/about` | `src/app/about/page.tsx` | DATA-REPRESENTATIVE | `src/components/scr002/Story.tsx`(신규) | 확정 소개문·철학·편집 원칙 줄임 없이 표시 | 좌우 분할(이미지+텍스트) | 해당 없음(N/A) | 코드리뷰 | P1 |
| 30 | COMP-SCR002-TIMELINE | 여행 Timeline | COMPONENT | IMPLEMENT | REQ-FUNC-060 | SCR-002 | `/about` | `src/app/about/page.tsx` | DATA-REPRESENTATIVE | `src/components/scr002/Timeline.tsx`(신규) | 6개 이상 시점(연도·장소·요약 한 줄) | 세로 타임라인, Empty 항목 없음 | 해당 없음(N/A) | 코드리뷰 | P1 |
| 31 | COMP-SCR002-COUNTRIES | 방문 국가 권역별 Chip | COMPONENT | IMPLEMENT | REQ-FUNC-059 | SCR-002 | `/about` | `src/app/about/page.tsx` | DATA-REPRESENTATIVE | `src/components/scr002/CountriesChips.tsx`(신규) | 30개국 이상, 권역별 그룹 헤더 | Chip은 `rounded.full`, 그룹 구분 명확 | 해당 없음(N/A) | 코드리뷰 | P1 |
| 32 | COMP-SCR002-GALLERY | Gallery | COMPONENT | IMPLEMENT(축소) | REQ-FUNC-061 | SCR-002 | `/about` | `src/app/about/page.tsx` | DATA-REPRESENTATIVE, INFRA-DESIGN-TOKENS | `src/components/scr002/Gallery.tsx`(신규) | 서로 다른 장소 사진 8개 이상, 각 이미지에 장소를 설명하는 alt; 이미지 로드 실패 시 alt 유지한 중립 플레이스홀더로 대체(Error 상태) | 이미지 URL/alt만 사용, 출처·작가·라이선스 입력 UI 없음(축소 구현) | 해당 없음(N/A) | 코드리뷰 | P1 |
| 33 | COMP-SCR002-RECOMMENDED-CTA | 추천 여행지 4개 + CTA Banner | COMPONENT | IMPLEMENT(축소) | REQ-FUNC-062, REQ-FUNC-063 | SCR-002 | `/about` | `src/app/about/page.tsx` | DATA-REPRESENTATIVE, DATA-DESTINATIONS | `src/components/scr002/RecommendedCta.tsx`(신규) | 추천 여행지 4개, 비공개 여행지 자동 제외, `/travel-tools`·`/mates` CTA 2개 | Card Grid + CTA Banner 교차 배치 | 빈 링크(SNS 등) 렌더링 안 함, 허용 프로토콜만 오픈 | 코드리뷰 | P1 |

---

## 7. COMPONENT — SCR-003 (5)

| Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 34 | COMP-SCR003-INTRO-TABS | Intro + 탭 셸(항공/숙소/동행) | COMPONENT | IMPLEMENT | - | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | INFRA-DESIGN-TOKENS | `src/components/scr003/IntroTabs.tsx`(신규) | 이용 순서 3단계 요약, 3개 탭 전환 UI, 탭별 입력·검증·완료 상태 독립 유지(다른 탭 전환 시 초기화 안 함) | 활성 탭은 코랄 강조, 비활성은 muted | 해당 없음(N/A) | E2E-TRAVEL-TOOLS | P0 |
| 35 | COMP-SCR003-FLIGHT-FORM | 항공편 찾기 탭(폼·검증·요약·외부 이동) | COMPONENT | IMPLEMENT | REQ-FUNC-011, REQ-FUNC-012, REQ-FUNC-013, REQ-FUNC-014, REQ-FUNC-015, REQ-FUNC-016, REQ-FUNC-017, REQ-FUNC-018, REQ-FUNC-054, REQ-NF-017 | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | COMP-SCR003-INTRO-TABS, INFRA-OUTBOUND-LINK | `src/components/scr003/FlightForm.tsx`(신규) | 국가/지역/출발일/귀국일 필수, 국가 변경 시 지역 초기화, 과거·역전 날짜 차단, 요약+비전달 고지, 외부 이동 새 탭, 서버 미전송 | 필드 오류는 danger 텍스트, 요약 카드는 surface-soft; 외부 이동 버튼 클릭 직후 버튼 비활성화+로딩 표시(Loading 상태) | 입력값을 서버 액션·DB·URL 쿼리로 전달하지 않음(브라우저 메모리만) | UNIT-TRAVEL-DATES, E2E-TRAVEL-TOOLS | P0 |
| 36 | COMP-SCR003-HOTEL-FORM | 숙소 찾기 탭(폼·검증·요약·외부 이동) | COMPONENT | IMPLEMENT | REQ-FUNC-019, REQ-FUNC-020, REQ-FUNC-021, REQ-FUNC-022, REQ-FUNC-023, REQ-FUNC-024, REQ-FUNC-025, REQ-FUNC-026 | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | COMP-SCR003-INTRO-TABS, INFRA-OUTBOUND-LINK | `src/components/scr003/HotelForm.tsx`(신규) | 국가/지역/체크인/체크아웃 필수, 체크아웃≤체크인 차단, 요약+비전달 고지, 외부 이동 새 탭, 서버 미전송 | FlightForm과 동일 패턴(재사용 가능한 Form 스펙); 외부 이동 버튼 클릭 직후 버튼 비활성화+로딩 표시(Loading 상태) | 입력값 서버/DB/쿼리 미전달 | UNIT-TRAVEL-DATES, E2E-TRAVEL-TOOLS | P0 |
| 37 | COMP-SCR003-TIPS | 찾기 Tip 3개 섹션 | COMPONENT | IMPLEMENT | - | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | COMP-SCR003-INTRO-TABS | `src/components/scr003/Tips.tsx`(신규) | "입력값 비전달", "가격/재고는 외부에서 확인", "탭 이동해도 입력값 유지" 3개 카드 | 3단계 안내 카드 패턴(D-001 16절) | 해당 없음(N/A) | 코드리뷰 | P2 |
| 38 | COMP-SCR003-MATE-WRITE | 동행 구하기 탭(작성 폼/연락처 탐지/안전수칙 동의/로그인 안내) | COMPONENT | IMPLEMENT(축소) | REQ-FUNC-027, REQ-FUNC-031, REQ-FUNC-032, REQ-FUNC-080 | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | COMP-SCR003-INTRO-TABS, INFRA-AUTH-GUARD, INFRA-CONTACT-DETECTION, API-MATE-POST | `src/components/scr003/MateWriteForm.tsx`(신규) | 비로그인/미성년 시 로그인 안내 카드로 대체, 로그인+성인확인 시 제목/국가/지역/기간/인원/조건/설명/안전수칙 동의 폼 노출, 연락처 탐지 시 제출 차단 | 안내 카드와 폼이 동일 톤(코랄 CTA) | 이메일·전화번호·메신저 ID 미포함 검증, 전체 법적 문서는 미구현(축소 — 체크박스 동의만) | UNIT-CONTACT-DETECTION, E2E-MATE-AUTH | P0 |

---

## 8. COMPONENT — SCR-004 (6)

| Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 39 | COMP-SCR004-INTRO | Intro + 글 작성 CTA | COMPONENT | IMPLEMENT | - | SCR-004 | `/mates` | `src/app/mates/page.tsx` | INFRA-DESIGN-TOKENS | `src/components/scr004/Intro.tsx`(신규) | 성인 인증 회원만 작성 가능 안내, `/travel-tools` 동행 탭 CTA | 해당 없음(N/A) | 해당 없음(N/A) | 코드리뷰 | P2 |
| 40 | COMP-SCR004-FILTER | Filter 바 + 결과 요약 | COMPONENT | IMPLEMENT | REQ-FUNC-030 | SCR-004 | `/mates` | `src/app/mates/page.tsx` | DB-ACCESS | `src/components/scr004/Filter.tsx`(신규) | 국가·기간 겹침·연령대·성별·스타일·모집상태 필터, 차단 사용자 글 결과 제외, 결과 개수 표시 | 필터는 드롭다운/Chip 혼합 | 차단 관계 서버측 필터링(클라이언트 숨김 아님) | E2E-MATE-AUTH | P0 |
| 41 | COMP-SCR004-LIST | 동행글 Card 목록(최대 8개) | COMPONENT | IMPLEMENT | REQ-FUNC-033, REQ-FUNC-037 | SCR-004 | `/mates` | `src/app/mates/page.tsx` | COMP-SCR004-FILTER, API-MATE-POST | `src/components/scr004/MatePostList.tsx`(신규) | 데이터 있으면 최대 8개 우선 노출, 모집중/마감(조회 시점 계산) 배지, 연락처 비노출; 결과 0건 시 완성형 Empty State(조건 초기화+작성 CTA+이용 방법) | Desktop 3~4열/Mobile 1열; 데이터 로드 전 목록 스켈레톤(Loading) 상태 표시 | HTML 응답에 이메일/전화번호 미포함 | E2E-MATE-AUTH | P0 |
| 42 | COMP-SCR004-DETAIL | 상세 영역(Desktop 분할/Mobile Drawer) | COMPONENT | IMPLEMENT | REQ-FUNC-027, REQ-FUNC-036, REQ-FUNC-038, REQ-NF-013 | SCR-004 | `/mates` | `src/app/mates/page.tsx` | COMP-SCR004-LIST, INFRA-AUTH-GUARD, API-MATE-APPLICATION, API-MATE-POST | `src/components/scr004/MatePostDetail.tsx`(신규) | 작성자 뷰에서 요청 목록·승인/거절, 마감/수정/삭제; 비로그인 접근 시 안내 카드 | Desktop 좌우 분할, Mobile 전체화면 Drawer, `Esc`/Scrim 닫힘; 상세 데이터 로드 전 스켈레톤(Loading) 상태 표시 | 비작성자 승인/거절 시도 403 | TEST-RLS-BASIC, E2E-MATE-AUTH | P0 |
| 43 | COMP-SCR004-APPLY | 참가 요청 폼 | COMPONENT | IMPLEMENT | REQ-FUNC-034, REQ-FUNC-035, REQ-FUNC-043 | SCR-004 | `/mates` | `src/app/mates/page.tsx` | COMP-SCR004-DETAIL, API-MATE-APPLICATION, INFRA-CLIENT-STATE | `src/components/scr004/ApplyForm.tsx`(신규) | 500자 이내 메시지, 중복 PENDING/ACCEPTED 차단(오류 안내), 제출 완료 Toast | 폼은 상세 패널 내 인라인 배치 | 메시지는 작성자·요청자만 열람 | UNIT-MATE-STATE, E2E-MATE-AUTH | P0 |
| 44 | COMP-SCR004-SAFETY-ACTIONS | 신고·차단 액션 + 신청방법 3단계 + 안전 CTA Banner | COMPONENT | IMPLEMENT | REQ-FUNC-039, REQ-FUNC-040 | SCR-004 | `/mates` | `src/app/mates/page.tsx` | COMP-SCR004-DETAIL, API-MATE-REPORT, API-MATE-BLOCK | `src/components/scr004/SafetyActions.tsx`(신규) | 신고(사유코드+설명) 3초 이내 접수 ID 표시, 차단 시 상호 노출 제한, 신청방법 3단계 안내, `/travel-tools` CTA | CTA Banner는 코랄 배경 | 신고자/피신고자 상세는 Admin만 노출 | TEST-RLS-BASIC, E2E-MATE-AUTH | P0 |

---

## 9. COMPONENT — SCR-005 (6)

| Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 45 | COMP-SCR005-AUTH | Guest: 로그인·가입·비밀번호 재설정 + 성인확인 | COMPONENT | IMPLEMENT | REQ-FUNC-066, REQ-FUNC-028 | SCR-005 | `/account` | `src/app/account/page.tsx` | INFRA-AUTH-GUARD, API-ACCOUNT-PROFILE | `src/components/scr005/AuthPanel.tsx`(신규) | 이메일 가입/인증/로그인/로그아웃/재설정, 성인확인 절차(생년월일 미저장), 미완료 시 Member/Admin 영역 렌더링 안 함 | Guest 화면은 Intro+Form+보안안내 3단계로 구성 | 비밀번호는 Supabase Auth 위임 | E2E-MATE-AUTH | P0 |
| 46 | COMP-SCR005-PROFILE | Member: 프로필 요약 + 수정 | COMPONENT | IMPLEMENT | REQ-FUNC-029 | SCR-005 | `/account` | `src/app/account/page.tsx` | COMP-SCR005-AUTH, API-ACCOUNT-PROFILE | `src/components/scr005/ProfilePanel.tsx`(신규) | 닉네임/연령대/여행스타일 필수, 성별 선택, 성인확인 완료 배지 | 좌우 분할(정보+수정 버튼); 탭 전환·목록 로드 시 스켈레톤(Loading) 상태 표시 | 해당 없음(N/A) | 코드리뷰 | P0 |
| 47 | COMP-SCR005-MY-ACTIVITY-POSTS | Member: 내 모집글/참가 요청 목록 | COMPONENT | IMPLEMENT | REQ-FUNC-036, REQ-FUNC-038, REQ-FUNC-043 | SCR-005 | `/account` | `src/app/account/page.tsx` | COMP-SCR005-AUTH, API-MATE-POST, API-MATE-APPLICATION, INFRA-CLIENT-STATE | `src/components/scr005/MyPostsPanel.tsx`(신규) | 내 글(상태·받은요청수), 내 요청(PENDING/ACCEPTED/REJECTED) 목록, 데이터 없으면 완성형 Empty State | Card 목록형, 배지로 상태 구분(텍스트 병기) | 본인 데이터만 조회(RLS) | TEST-RLS-BASIC | P0 |
| 48 | COMP-SCR005-MY-ACTIVITY-FAVORITES-BLOCKS | Member: 즐겨찾기 + 차단 목록 | COMPONENT | IMPLEMENT | REQ-FUNC-040, REQ-FUNC-068 | SCR-005 | `/account` | `src/app/account/page.tsx` | COMP-SCR005-AUTH, INFRA-CLIENT-STATE, API-MATE-BLOCK | `src/components/scr005/FavoritesBlocksPanel.tsx`(신규) | 즐겨찾기 0건 시 완성형 Empty State(홈 이동 CTA), 차단 목록+해제 버튼 | 좌우 2컬럼 배치 | 차단 목록은 본인만 조회 | TEST-RLS-BASIC | P1 |
| 49 | COMP-SCR005-ADMIN-REPORTS | Admin: 신고 상태 변경 | COMPONENT | IMPLEMENT(축소) | REQ-FUNC-041 | SCR-005 | `/account` | `src/app/account/page.tsx` | COMP-SCR005-AUTH, API-MATE-REPORT | `src/components/scr005/AdminReportsPanel.tsx`(신규) | 신고 목록(대상·사유·접수일·상태) + 상태 변경 드롭다운, 통계 차트 없음 | 목록형 UI만(대시보드 아님) | 비Admin 접근 시 렌더링 안 함, 서버 403 | TEST-RLS-BASIC | P1 |
| 50 | COMP-SCR005-ADMIN-OUTBOUND-URL | Admin: 항공·숙소 외부 URL 설정 | COMPONENT | IMPLEMENT | REQ-FUNC-077 | SCR-005 | `/account` | `src/app/account/page.tsx` | COMP-SCR005-AUTH, API-ADMIN-SETTINGS | `src/components/scr005/AdminOutboundUrlPanel.tsx`(신규) | URL 입력 2개(항공/숙소) + 저장 버튼, HTTPS 허용목록 검증 실패 시 인라인 오류 | 폼 카드형 UI | 비Admin 접근 시 렌더링 안 함, 서버 403 | TEST-RLS-BASIC | P1 |

---

## 10. PAGE_OWNER (5, 필수 Task ID)

| Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 51 | PAGE-SCR001 | SCR-001 메인 페이지 조립 | PAGE_OWNER | IMPLEMENT | REQ-FUNC-001 | SCR-001 | `/` | `src/app/page.tsx` | COMP-SCR001-HERO-SEARCH, COMP-SCR001-CARDGRID, COMP-SCR001-DETAIL-DRAWER, COMP-SCR001-SAFETY-TAB, COMP-SCR001-MATE-PREVIEW, COMP-SCR001-FOUNDER-SUMMARY, INFRA-LAYOUT-SHELL | `src/app/page.tsx`(기존 파일 수정 — Next.js Starter 콘텐츠 전면 교체) | **Starter 제거**: `create-next-app` 기본 로고/“Get Started”/Vercel 안내 링크 완전 제거. **Section 순서**: ① Hero ② 국내 여행지 6개 ③ 해외 여행지 6개 ④ 여행 동기 6개(Chip) ⑤ 국가별 주의사항 6개 ⑥ 최근 동행글 3개 또는 완성형 Empty State ⑦ free_traveler 소개. **데이터 출처**: ②③은 DATA-DESTINATIONS, ⑤는 DATA-SAFETY, ⑦은 DATA-REPRESENTATIVE, ⑥은 API-MATE-POST 조회. **최소 콘텐츠 수**: ②③ 각 6개 Card, ④ 6개 Chip, ⑤ 6개 Card | 큰 빈 영역 없음, Section 간 배경(`canvas`/`surface-soft`) 교차, Hero 480~620px로 다음 Section 미리보기 확보, Desktop 3~4열/Mobile 1열 | `Lorem ipsum`/`준비 중`/`정보 확인 필요`/내용 없는 Card 금지, ⑥ 데이터 없을 때도 안내 문장+이용 방법+CTA가 있는 완성형 Empty State; 비공개 데이터(참가 메시지 등) 미노출 | E2E-PUBLIC-SMOKE, MANUAL-RESPONSIVE-CHECK, MANUAL-A11Y-CHECK, RELEASE-VERCEL-SUPABASE-CHECK | P0 |
| 52 | PAGE-SCR002 | SCR-002 대표 소개 페이지 조립 | PAGE_OWNER | IMPLEMENT | REQ-FUNC-057 | SCR-002 | `/about` | `src/app/about/page.tsx` | COMP-SCR002-HERO-METRICS, COMP-SCR002-STORY, COMP-SCR002-TIMELINE, COMP-SCR002-COUNTRIES, COMP-SCR002-GALLERY, COMP-SCR002-RECOMMENDED-CTA, INFRA-LAYOUT-SHELL | `src/app/about/page.tsx`(신규) | **Section 순서**: ① Profile Hero ② 여행 지표 ③ 소개·철학 ④ Timeline 6개 ⑤ 방문 국가 30개 ⑥ Gallery 8개 ⑦ 기억에 남는 여행지 4개+CTA. **데이터 출처**: 전 Section DATA-REPRESENTATIVE(⑦ 여행지 링크는 DATA-DESTINATIONS). **최소 콘텐츠 수**: Timeline 6개+, 국가 30개+, Gallery 8장+, 추천 4개 | 큰 빈 영역 없음, Hero 480~620px, Desktop 3~4열/Mobile 1열 | Placeholder 금지(정적 콘텐츠이므로 Empty State 대상 아님, 데이터 누락 시 게시 차단); 해당 없음(N/A, 공개 정적 페이지) | E2E-PUBLIC-SMOKE, MANUAL-RESPONSIVE-CHECK, RELEASE-VERCEL-SUPABASE-CHECK | P1 |
| 53 | PAGE-SCR003 | SCR-003 통합 여행 준비 페이지 조립 | PAGE_OWNER | IMPLEMENT | REQ-FUNC-011 | SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | COMP-SCR003-INTRO-TABS, COMP-SCR003-FLIGHT-FORM, COMP-SCR003-HOTEL-FORM, COMP-SCR003-TIPS, COMP-SCR003-MATE-WRITE, INFRA-LAYOUT-SHELL | `src/app/travel-tools/page.tsx`(신규) | **Section 순서**: ① Intro ② 탭(항공/숙소/동행) ③ 여행정보 Form ④ 입력 요약·외부 이동 ⑤ 찾기 Tip 3개 ⑥ 동행 작성 또는 로그인 안내·안전 안내. **탭 조립**: 항공·숙소·동행 세 탭 컴포넌트를 모두 실제로 조립(하나라도 누락 시 미완료), 탭별 상태 독립 | 큰 빈 영역 없음, Section 상하 여백 64~96/40~64px | 각 탭에 `Lorem ipsum`/`준비 중`/`정보 확인 필요` 금지; 항공·숙소 입력값 서버/DB/URL 미전달(브라우저 메모리만) | E2E-TRAVEL-TOOLS, MANUAL-RESPONSIVE-CHECK, RELEASE-VERCEL-SUPABASE-CHECK | P0 |
| 54 | PAGE-SCR004 | SCR-004 동행 조회 페이지 조립 | PAGE_OWNER | IMPLEMENT | REQ-FUNC-030 | SCR-004 | `/mates` | `src/app/mates/page.tsx` | COMP-SCR004-INTRO, COMP-SCR004-FILTER, COMP-SCR004-LIST, COMP-SCR004-DETAIL, COMP-SCR004-APPLY, COMP-SCR004-SAFETY-ACTIONS, INFRA-LAYOUT-SHELL | `src/app/mates/page.tsx`(신규) | **Section 순서**: ① Intro+작성CTA ② Filter·결과요약 ③ 동행 목록 ④ 상세 ⑤ 신청 방법 3단계 ⑥ 안전·신고·차단 안내+CTA. **최소 콘텐츠 수**: 목록 데이터 있으면 최대 8개 Card | 큰 빈 영역 없음, Desktop 목록+상세 분할/Mobile Drawer | 목록 0건 시 조건 초기화+작성 CTA+이용 방법이 있는 완성형 Empty State(빈 Card 금지); 신고·차단 데이터는 RLS로 본인/Admin만 노출 | E2E-MATE-AUTH, TEST-RLS-BASIC, MANUAL-RESPONSIVE-CHECK, RELEASE-VERCEL-SUPABASE-CHECK | P0 |
| 55 | PAGE-SCR005 | SCR-005 계정·관리 페이지 조립(Guest/Member/Admin) | PAGE_OWNER | IMPLEMENT | REQ-FUNC-066 | SCR-005 | `/account` | `src/app/account/page.tsx` | COMP-SCR005-AUTH, COMP-SCR005-PROFILE, COMP-SCR005-MY-ACTIVITY-POSTS, COMP-SCR005-MY-ACTIVITY-FAVORITES-BLOCKS, COMP-SCR005-ADMIN-REPORTS, COMP-SCR005-ADMIN-OUTBOUND-URL, INFRA-LAYOUT-SHELL | `src/app/account/page.tsx`(신규) | **역할별 조립**: 현재 역할(Guest/Member/Admin)의 Intro→핵심 작업→도움말/다음 행동만 렌더링. Guest: 로그인/가입/재설정+보안안내. Member: 프로필+내 모집글+참가요청+즐겨찾기+차단. Admin: Member 화면 + 신고 상태 변경 + 외부 URL 설정 탭. **역할에 없는 관리 영역은 렌더링하지 않음**(DOM에도 존재 안 함) | 큰 빈 영역 없음, 좌측 탭 메뉴 Desktop 고정/Mobile 상단 축소 | 즐겨찾기 0건 등 목록형 Section은 완성형 Empty State, `Lorem ipsum`/`준비 중`/`정보 확인 필요` 금지; 역할 판별은 서버에서 검증(클라이언트 상태만으로 Admin 탭 노출 금지), 비Admin이 Admin API 직접 호출 시 403 | E2E-MATE-AUTH, TEST-RLS-BASIC, MANUAL-A11Y-CHECK, RELEASE-VERCEL-SUPABASE-CHECK | P0 |

---

## 11. TEST — UNIT / RLS (4, 필수 Task ID)

| Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 56 | UNIT-TRAVEL-DATES | 날짜 검증 단위 테스트 | UNIT_TEST | IMPLEMENT | REQ-FUNC-013, REQ-FUNC-021 | - | - | - | COMP-SCR003-FLIGHT-FORM, COMP-SCR003-HOTEL-FORM | `src/lib/__tests__/travel-dates.test.ts`(신규) | 과거 출발일/체크인, 귀국일<출발일, 체크아웃≤체크인 등 경계값 케이스 전부 차단 검증 | 해당 없음(N/A) | 해당 없음(N/A) | CI-PIPELINE | P0 |
| 57 | UNIT-CONTACT-DETECTION | 연락처 탐지 단위 테스트 | UNIT_TEST | IMPLEMENT | REQ-FUNC-032 | - | - | - | INFRA-CONTACT-DETECTION | `src/lib/__tests__/contact-detection.test.ts`(신규) | 전화번호/이메일/카카오톡·텔레그램 패턴 탐지율 기준 테스트셋 기준 검증(오탐 케이스 포함) | 해당 없음(N/A) | 해당 없음(N/A) | CI-PIPELINE | P0 |
| 58 | UNIT-MATE-STATE | 동행글/참가요청 상태 전이 단위 테스트 | UNIT_TEST | IMPLEMENT | REQ-FUNC-035, REQ-FUNC-037 | - | - | - | API-MATE-POST, API-MATE-APPLICATION | `src/lib/__tests__/mate-state.test.ts`(신규) | OPEN→CLOSED(조회시점 계산), PENDING→ACCEPTED/REJECTED, 중복 PENDING 차단 로직 검증 | 해당 없음(N/A) | 해당 없음(N/A) | CI-PIPELINE | P0 |
| 59 | TEST-RLS-BASIC | Supabase RLS 기본 검증 | RLS_TEST | IMPLEMENT | REQ-FUNC-044, REQ-NF-013 | - | - | - | DB-RLS-BASE, DB-SEED-BASE | `supabase/tests/rls_basic.sql`(신규) 또는 `src/lib/__tests__/rls-basic.test.ts`(신규) | 본인 외 사용자의 비공개 mate_application/report/user_block 접근 시도가 전부 403 또는 빈 결과로 차단됨을 계정별 시나리오로 검증 | 해당 없음(N/A) | 검증 자체가 보안 목적(권한별 부정 접근 케이스 포함) | CI-PIPELINE | P0 |

---

## 12. TEST — E2E / CI / RELEASE / MANUAL (7, 필수 Task ID 포함)

| Seq | Task ID | 제목 | Category | Implementation Status | Requirement Ref | Screen | Route | Page Entry | Depends On | Expected Files | Functional AC | Visual AC | Security/Privacy AC | Verify | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 60 | E2E-PUBLIC-SMOKE | Playwright Chromium Smoke: 공개 탐색 흐름 | E2E_TEST | IMPLEMENT | REQ-FUNC-001, REQ-FUNC-006, REQ-FUNC-057 | SCR-001, SCR-002 | `/`, `/about` | - | INFRA-PLAYWRIGHT-CONFIG, PAGE-SCR001, PAGE-SCR002 | `e2e/public-smoke.spec.ts`(신규) | 홈 진입→여행지 Card 클릭→상세 Drawer→안전정보 하위 탭→`/about` 이동→추천 여행지 클릭까지 Chromium에서 통과 | 해당 없음(N/A) | 해당 없음(N/A) | CI-PIPELINE | P0 |
| 61 | E2E-TRAVEL-TOOLS | Playwright Chromium Smoke: 항공/숙소/동행 작성 흐름 | E2E_TEST | IMPLEMENT | REQ-FUNC-014, REQ-FUNC-016, REQ-FUNC-022, REQ-FUNC-024 | SCR-003 | `/travel-tools` | - | INFRA-PLAYWRIGHT-CONFIG, PAGE-SCR003 | `e2e/travel-tools.spec.ts`(신규) | 항공 탭 입력→요약→외부 이동 새 탭 열림 확인, 숙소 탭 동일 흐름, 동행 탭 비로그인 안내 노출까지 Chromium에서 통과 | 해당 없음(N/A) | 외부 이동 시 쿼리 파라미터에 입력값 없음을 네트워크 요청으로 검증 | CI-PIPELINE | P0 |
| 62 | E2E-MATE-AUTH | Playwright Chromium Smoke: 인증·동행·관리자 흐름 | E2E_TEST | IMPLEMENT | REQ-FUNC-027, REQ-FUNC-034, REQ-FUNC-066 | SCR-004, SCR-005 | `/mates`, `/account` | - | INFRA-PLAYWRIGHT-CONFIG, PAGE-SCR004, PAGE-SCR005 | `e2e/mate-auth.spec.ts`(신규) | 로그인/가입→성인확인→동행글 작성(SCR-003)→SCR-004 참가 요청 제출→SCR-005 내 활동에서 상태 확인→(테스트 계정) 관리자 탭 신고 상태 변경까지 Chromium에서 통과 | 해당 없음(N/A) | 비Admin 계정으로 관리자 탭 접근 시 렌더링 안 됨을 검증 | CI-PIPELINE | P0 |
| 63 | CI-PIPELINE | CI 게이트(빌드/린트/유닛/RLS/E2E) | CI | IMPLEMENT(축소) | REQ-NF-031 | - | - | - | UNIT-TRAVEL-DATES, UNIT-CONTACT-DETECTION, UNIT-MATE-STATE, TEST-RLS-BASIC, E2E-PUBLIC-SMOKE, E2E-TRAVEL-TOOLS, E2E-MATE-AUTH | `.github/workflows/ci.yml`(신규) | `tsc --noEmit`, `eslint`, 3개 Unit, RLS, 3개 E2E가 병합 조건으로 실행 | 해당 없음(N/A) | 워크플로에 비밀키 하드코딩 금지(GitHub Secrets만 사용) | 코드리뷰(워크플로 실행 로그) | P0 |
| 64 | RELEASE-VERCEL-SUPABASE-CHECK | Vercel/Supabase 배포 확인(Release Check) | RELEASE_CHECK | IMPLEMENT | REQ-NF-012, REQ-NF-016 | SCR-001, SCR-002, SCR-003, SCR-004, SCR-005 | `/`, `/about`, `/travel-tools`, `/mates`, `/account` | - | PAGE-SCR001, PAGE-SCR002, PAGE-SCR003, PAGE-SCR004, PAGE-SCR005, DB-SCHEMA-BASE | (코드 없음 — 배포 체크리스트) | Vercel Preview/Production 배포 후 5개 Route 모두 200 응답, Supabase 연결 성공, 환경변수 클라이언트 번들 미노출 확인 | 해당 없음(N/A) | HTTPS 강제, 비밀키 Vercel 환경변수로만 관리 | 브라우저 수동 확인(배포 URL 직접 접속) | P0 |
| 65 | MANUAL-RESPONSIVE-CHECK | 반응형/터치영역 브라우저 수동 확인 | MANUAL_CHECK | IMPLEMENT(축소) | REQ-FUNC-065 | SCR-001, SCR-002, SCR-003, SCR-004, SCR-005 | `/`, `/about`, `/travel-tools`, `/mates`, `/account` | - | PAGE-SCR001, PAGE-SCR002, PAGE-SCR003, PAGE-SCR004, PAGE-SCR005 | (코드 없음 — 브라우저 확인 체크리스트) | 320px/390px/768px/1440px 뷰포트에서 가로 스크롤·요소 겹침 없음, 인터랙션 요소 44×44px 이상 | 5개 Screen 모두 Section 상하 여백·Card 열 수가 D-001 15절 범위 준수 | 해당 없음(N/A) | 브라우저 수동 확인(DevTools 뷰포트 전환) | P1 |
| 66 | MANUAL-A11Y-CHECK | 키보드/스크린리더 브라우저 수동 확인 | MANUAL_CHECK | IMPLEMENT(축소) | REQ-NF-023, REQ-FUNC-079 | SCR-001, SCR-002, SCR-003, SCR-004, SCR-005 | `/`, `/about`, `/travel-tools`, `/mates`, `/account` | - | PAGE-SCR001, PAGE-SCR002, PAGE-SCR003, PAGE-SCR004, PAGE-SCR005 | (코드 없음 — 브라우저 확인 체크리스트) | 키보드만으로 검색·폼 입력·Drawer/Modal 닫기·신고 제출 가능, 포커스 순서 논리적 | 포커스 표시가 `focus-ring` 2px로 시각적으로 보임 | 해당 없음(N/A) | 브라우저 수동 확인(키보드 Tab 순회) | P1 |

---

## NON_IMPLEMENTATION — EXCLUDED Requirement 등록표 (37건)

`docs/PROJECT_SCOPE.md`에서 EXCLUDED로 확정된 Requirement는 상세 구현 Task를 만들지 않는다. 아래 표에 전건을 근거·후속 방향과 함께 기록해 추적표에서 삭제하지 않는다.

| Requirement | 근거(PROJECT_SCOPE.md) | 후속 방향 |
|---|---|---|
| REQ-FUNC-009 | F1, Should 우선순위, 직접 구현 범위 밖 | 트래픽/콘텐츠 데이터 확보 후 관련 여행지 추천 기능 후속 Iteration 후보로 검토 |
| REQ-FUNC-010 | F1, Should 우선순위, 직접 구현 범위 밖 | 필터 상태 URL 동기화는 공유/북마크 요구가 확인되면 후속 스프린트에서 추가 |
| REQ-FUNC-042 | F4, 관리자 범위(신고 상태·외부 URL)를 벗어난 제재 기능 | 신고 급증 등 운영 필요성이 확인되면 경고·숨김·계정 제한 기능을 별도 관리자 정책과 함께 재설계 |
| REQ-FUNC-045 | F4, 범용 운영 절차로 직접 구현 범위 밖 | 개인정보 보호 담당자 지정 후 탈퇴 비식별화·삭제 파이프라인을 별도 프로젝트로 구축 |
| REQ-FUNC-055 | F5, 전체 콘텐츠 CMS 제외 방침(정적 데이터로 대체) | 안전정보 갱신 빈도가 늘어나면 Editor 워크플로/CMS 도입 재검토 |
| REQ-FUNC-056 | F5, 범용 감사 로그 제외 방침 | 콘텐츠 변경 이력은 Git 커밋 이력으로 대체, 감사 요건 발생 시 별도 로그 테이블 추가 검토 |
| REQ-FUNC-067 | F7, 직접 구현 범위 밖(여행지 검색으로 대체) | 안전정보까지 포함한 통합 검색은 콘텐츠 규모 확대 시 검토 |
| REQ-FUNC-069 | F7, Should 우선순위, 직접 구현 범위 밖 | Web Share API 기반 공유 버튼은 후속 스프린트 후보 |
| REQ-FUNC-070 | F7, 직접 구현 범위 밖 | SEO 임팩트 측정 후 canonical/OG/구조화 데이터 도입 검토 |
| REQ-FUNC-071 | F7, 직접 구현 범위 밖 | 행동 분석 도구(GA4 등) 도입 결정 시 이벤트 스키마와 함께 재설계 |
| REQ-FUNC-072 | F7, 전체 콘텐츠 CMS 제외 방침 | 콘텐츠 운영 인력 확보 시 Editor/Admin CRUD 도입 검토 |
| REQ-FUNC-073 | F7, 미디어 업로드·라이선스 워크플로 제외 방침 | 자체 이미지 자산 도입 시 업로드+라이선스 메타데이터 입력 워크플로 구축 |
| REQ-FUNC-074 | F7, CMS 워크플로 전제로 제외 | CMS 도입과 함께 게시 전 완전성 게이트 자동화 재검토 |
| REQ-FUNC-075 | F7, 관리자 범위 밖 | 안전정보 운영 담당자 지정 후 stale 대시보드 추가 검토 |
| REQ-FUNC-076 | F7, 범용 감사 로그 제외 방침 | 컴플라이언스 요건 발생 시 별도 감사 로그 테이블/뷰 설계 |
| REQ-NF-001 | Performance, 부하 테스트/성능 측정 체계 제외 방침 | Public Beta 트래픽 확보 후 Core Web Vitals 실측 도입 |
| REQ-NF-002 | Performance, 부하 테스트/성능 측정 체계 제외 방침 | 동일(Core Web Vitals 실측 도입 시 함께 측정) |
| REQ-NF-003 | Performance, 부하 테스트/성능 측정 체계 제외 방침 | 동일 |
| REQ-NF-004 | Performance, 부하 테스트 제외 방침 | 동시 사용자 증가 시 부하 테스트 도구 도입 검토 |
| REQ-NF-005 | Performance, 부하 테스트 제외 방침 | 동일 |
| REQ-NF-007 | Performance, CI 성능 게이트 제외 방침 | Lighthouse CI는 성능 이슈 제보 발생 시 도입 |
| REQ-NF-008 | Reliability, 인프라 운영 범위 밖 | Vercel/Supabase 플랜 업그레이드 시 SLA 모니터링 재검토 |
| REQ-NF-009 | Reliability, 장애 알림 제외 방침 | 운영 알림 채널(Slack 등) 확보 시 5xx 알림 연동 |
| REQ-NF-010 | Reliability, 자동 백업 제외 방침 | Supabase 기본 백업 기능으로 대체, 별도 RPO/RTO 목표는 운영 단계에서 설정 |
| REQ-NF-011 | Reliability, 자동 점검 배치 미구축 | 배포 전 수동 링크 점검으로 대체, 링크 수 증가 시 자동화 검토 |
| REQ-NF-018 | Security, 직접 구현 범위 밖 | 개인정보 내보내기/삭제 요청 창구는 이메일 문의로 우선 대응 후 기능화 검토 |
| REQ-NF-019 | Safety/Moderation, 부하 테스트 제외 방침 | 신고량 증가 시 응답시간 SLA 측정 도입 |
| REQ-NF-020 | Safety/Moderation, 운영 인력 체계 전제로 범위 밖 | Moderator 인력 배정 후 24h SLA 운영 체계 수립 |
| REQ-NF-021 | Safety/Moderation, 속도 제한 인프라 미구축 | 스팸/어뷰징 신호 확인 시 Rate Limiting(Edge Middleware 등) 도입 |
| REQ-NF-022 | Safety/Moderation, 감사 로그 제외 방침 | REQ-FUNC-076과 함께 감사 로그 도입 시 재검토 |
| REQ-NF-024 | Accessibility, 자동 검사 도구 도입 범위 밖 | axe 등 자동 접근성 검사는 CI 확장 시 추가 |
| REQ-NF-025 | Accessibility, 전문 수동 QA 프로세스 범위 밖 | 접근성 전문 QA는 Public Beta 전 별도 예산 확보 시 진행 |
| REQ-NF-029 | Content/SEO, 미디어 라이선스 워크플로 제외 방침 | REQ-FUNC-073과 함께 재검토 |
| REQ-NF-030 | Content/SEO, SEO 메타데이터 게이트 범위 밖 | REQ-FUNC-070과 함께 재검토 |
| REQ-NF-032 | Maintainability, 구조화 로그 제외 방침 | 운영 관측성 요구 발생 시 구조화 로그(request_id 등) 도입 |
| REQ-NF-033 | Maintainability, 장애 알림 제외 방침 | REQ-NF-009와 함께 재검토 |
| REQ-NF-034 | Maintainability, 인프라 비용 모니터링 체계 미구축 | Vercel/Supabase 무료·개인 플랜 사용으로 목표 충족 가정, 유료 전환 시 비용 대시보드 도입 |

---

## 완료 조건 자체 점검

| 점검 항목 | 결과 |
|---|---|
| REQ-FUNC-001~080, REQ-NF-001~034 전건이 Task List(Requirement Ref) 또는 NON_IMPLEMENTATION 표에 등장 | 충족 — 114건 전수(누락 0건) |
| IMPLEMENT 계열(77건)이 구현 Task와 최소 1개 Verify(Test Task 또는 코드리뷰)에 연결 | 충족 |
| EXCLUDED(37건)가 NON_IMPLEMENTATION 표에 근거·후속 방향과 함께 등록 | 충족 |
| 승인된 5개 Screen마다 Page Owner Task 정확히 1개(PAGE-SCR001~005) | 충족 |
| Page Owner Expected Files에 해당 page_entry 포함 | 충족 |
| Page Owner가 자신의 Component/Data/API Task에 의존(Depends On) | 충족 |
| SCR-003 항공·숙소·동행 작성 영역 Component 분리 | 충족(COMP-SCR003-FLIGHT-FORM/HOTEL-FORM/MATE-WRITE) |
| SCR-004 목록·필터·상세·참가·신고·차단 분리 | 충족(COMP-SCR004-FILTER/LIST/DETAIL/APPLY/SAFETY-ACTIONS) |
| SCR-005 Auth·Profile·My Activity·Admin 분리 | 충족(COMP-SCR005-AUTH/PROFILE/MY-ACTIVITY-*/ADMIN-*) |
| DB Schema/RLS/Access 별도 Task | 충족(DB-SCHEMA-BASE/DB-RLS-BASE/DB-ACCESS/DB-SEED-BASE) |
| 날짜 검증·연락처 탐지·상태 전이 Unit Test | 충족(UNIT-TRAVEL-DATES/UNIT-CONTACT-DETECTION/UNIT-MATE-STATE) |
| Playwright는 핵심 흐름을 2~3개 Task로 묶음(Chromium만) | 충족(E2E-PUBLIC-SMOKE/E2E-TRAVEL-TOOLS/E2E-MATE-AUTH, 총 7개 흐름) |
| CI, Vercel/Supabase 확인 Task 존재 | 충족(CI-PIPELINE, RELEASE-VERCEL-SUPABASE-CHECK) |
| 하나의 Task가 여러 Page Entry를 동시에 소유하지 않음 | 충족(Page Owner는 각자 1개 page.tsx만 소유, API/공용 Task는 Page Entry 대신 개별 모듈 파일 소유) |
| Page Owner AC에 Section 순서/데이터 출처/최소 Card·Timeline·Gallery 수/반응형 밀도 포함 | 충족(51~55행 Functional/Visual AC 참고) |
| Page Owner AC에 Placeholder 금지 + 완성형 Empty State 포함 | 충족(51~55행 Security/Privacy 및 Functional AC 참고) |
| 구현 코드/Branch/Commit/Issue 생성 여부 | 생성하지 않음(본 문서만 작성) |

**빠진 Requirement ID 없음 — 본 Task List를 완료로 보고한다.**
