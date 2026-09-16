# Free Traveler — Architecture

**Document ID:** ARCH-TRAVEL-001
**기반 문서:** `package.json`, `docs/06_SRS_UIUX_REVISED.md`, `docs/PROJECT_SCOPE.md`, `design-reference/D-001/DESIGN.md`, `design-reference/UI_CONTRACT.md`, `design-reference/SCREEN_ROUTE_CONTRACT.json`, `TASKS/TASK_MANIFEST.csv`
**작성일:** 2026-09-16
**상태:** 구현 경계 정의 — 코드 구현 착수 전 기준선

---

## 1. 목적

이 문서는 Free Traveler를 구현할 때 **"어디까지가 이 프로젝트의 범위인가"**를 코드 작성 전에 명확히 한다. 기능 목록이 아니라 **경계**(무엇을 어떤 계층에서, 무엇으로, 어디까지만 구현하는지)를 정의하며, `TASKS/TASK_MANIFEST.csv`의 66개 Task는 모두 이 경계 안에서 설계되었다.

---

## 2. 기술 스택

| 영역 | 선택 | 근거 |
|---|---|---|
| 프레임워크 | **Next.js App Router** (`next` 16.3.4, `package.json` 확인) | `docs/06_SRS_UIUX_REVISED.md`, `design-reference/SCREEN_ROUTE_CONTRACT.json`(`framework: "nextjs-app-router"`) |
| 언어 | **TypeScript**(`^5`, `tsconfig.json` 존재) | 전 소스 `.ts`/`.tsx`만 사용, `.js` 신규 작성 금지 |
| UI | React 19 + Tailwind CSS 4(`@tailwindcss/postcss`) | `design-reference/D-001/DESIGN.md` 토큰을 Tailwind 설정으로 구현 |
| 데이터/인증 | Supabase(`@supabase/supabase-js`, 아직 미설치 — 8절 참고) | `docs/PROJECT_SCOPE.md` |
| 테스트 | Vitest(단위) + Playwright(E2E, Chromium 전용) | 12절 |
| 배포 | Vercel | 13절 |

App Router 규칙을 따른다: 라우트는 `src/app/<segment>/page.tsx`, 공용 레이아웃은 `src/app/layout.tsx`, 서버 전용 로직은 Server Action(`"use server"`) 또는 Route Handler(`src/app/api/**/route.ts`)로 작성한다.

---

## 3. 화면 구조 — 핵심 4 + 보조 1

승인된 디자인 Screen은 정확히 5개이며 신규 공개 Route를 추가하지 않는다(`design-reference/SCREEN_ROUTE_CONTRACT.json` 정본).

| 분류 | Screen | Route | Page Entry |
|---|---|---|---|
| 핵심 | SCR-001 메인 | `/` | `src/app/page.tsx` |
| 보조 | SCR-002 대표 소개 | `/about` | `src/app/about/page.tsx` |
| 핵심 | SCR-003 통합 여행 준비 | `/travel-tools` | `src/app/travel-tools/page.tsx` |
| 핵심 | SCR-004 동행 조회 | `/mates` | `src/app/mates/page.tsx` |
| 핵심 | SCR-005 계정·관리 | `/account` | `src/app/account/page.tsx` |

기술 Route(위 5개 Screen 수에 포함하지 않음): `src/app/auth/callback/route.ts`, `src/app/api/**/route.ts`, `src/app/not-found.tsx`, `src/app/error.tsx`.

여행지 상세, 안전정보, 동행 상세 등 하위 화면은 **새 Route를 만들지 않고** 해당 Screen 내부의 Drawer/Modal/탭/패널로 구현한다(`design-reference/UI_CONTRACT.md`).

---

## 4. Server Component / Client Component 경계

**기본값은 Server Component다.** 각 Page Entry(`page.tsx`)는 Server Component로 시작하며, 정적 데이터(`src/data/*`)나 Supabase 서버 클라이언트로 읽은 데이터를 props로 내려준다. 상호작용이 필요한 하위 트리에만 `"use client"`를 선언한다.

| 항상 Client Component | 이유 |
|---|---|
| 항공/숙소 입력 Form(`FlightForm`, `HotelForm`) | 로컬 입력 상태, 클라이언트 검증, 외부 이동 버튼 |
| 여행지 상세 Drawer/Modal, 동행 상세 Drawer/분할 패널 | 열림/닫힘 상태, 포커스 트랩 |
| 탭 셸(SCR-003 항공/숙소/동행 탭) | 활성 탭 상태를 화면 이동 없이 전환 |
| 필터 바, Chip 선택 | 즉시 반영되는 로컬 상태 |
| 즐겨찾기 버튼, Toast | `localStorage` 접근, 일시 알림 |
| 로그인/가입/성인확인/프로필 수정 Form | 폼 상태, 클라이언트 검증, Server Action 호출 |

| Server Component로 유지 | 이유 |
|---|---|
| 각 `page.tsx` 최상위 | 정적 데이터·초기 Supabase 조회를 서버에서 수행 |
| 여행지 Card Grid, Gallery, Timeline, 방문국가 Chip 목록(SCR-001/002) | 정적 데이터를 그대로 렌더, 상호작용 없음 |
| 동행글 목록의 서버 조회 부분 | 최초 목록은 서버에서 가져오고, 상세/필터 조작만 Client Component로 감싼다 |

Server Component 안에서 데이터를 가져오고, 그 결과를 Client Component에 props로 전달하는 방향만 사용한다(Client Component가 직접 서버 전용 모듈을 import하지 않는다).

---

## 5. 항공·숙소 입력 폼 — Client 일시 상태만 사용

`REQ-FUNC-011~026`, `REQ-NF-017`에 따라 SCR-003의 항공/숙소 Form(`COMP-SCR003-FLIGHT-FORM`, `COMP-SCR003-HOTEL-FORM`)은 **Client Component의 `useState`(또는 동등한 로컬 상태)에만 값을 보관**한다.

**명시적으로 하지 않는 것:**
- 입력값(국가·지역·출발일/체크인·귀국일/체크아웃)을 **Server Action이나 Route Handler로 전송하지 않는다.**
- 입력값을 **DB(Supabase 테이블)에 저장하지 않는다.** 이 데이터를 위한 테이블은 8절의 6개 테이블에도 존재하지 않는다.
- 입력값을 **외부 이동 URL의 쿼리 파라미터로 붙이지 않는다.** `src/lib/outbound-link.ts`는 관리자가 설정한 일반 URL만 새 탭으로 연다.
- 입력값을 **서버 로그·분석 이벤트로 기록하지 않는다.**

이 폼과 통신하는 유일한 서버 상호작용은 "제출"이 아니라 "이동"이며, 이동 자체는 `window.open` 또는 `<a target="_blank" rel="noopener noreferrer">` 수준의 순수 클라이언트 동작이다.

---

## 6. 정적 데이터 계층(`src/data`)

여행지, 국가 안전정보, `free_traveler` 대표 소개는 DB 테이블이 아니라 **`src/data/*.ts`의 정적 TypeScript 상수**로 관리한다(`docs/PROJECT_SCOPE.md`, Skill 규칙 11).

| 파일(예정) | 내용 | Requirement |
|---|---|---|
| `src/data/destinations.ts` | 국내 10곳 이상 + 해외 15개국 30도시 이상, 상세 콘텐츠 스키마 | REQ-FUNC-004, 008 |
| `src/data/safety.ts` | 국가별 8개 안전 카테고리, 출처, 최종 확인일 | REQ-FUNC-046~053 |
| `src/data/profile.ts` | 대표 프로필(`50+ Trips`/`30+ Countries`), Timeline, 방문국가, Gallery | REQ-FUNC-057~061 |

`src/data`는 이미 디렉터리로 존재하지만(현재 트리 확인) 비어 있다 — 파일 3개는 아직 생성되지 않았다(11절 참고). 콘텐츠 편집을 위한 CMS/관리자 CRUD UI는 만들지 않는다(`docs/PROJECT_SCOPE.md`, REQ-FUNC-072~076 EXCLUDED).

---

## 7. Supabase — Auth와 동행 기능 중심

Supabase는 **이메일 인증(Auth)** 과 **동행(Mate) 관련 쓰기 기능**에만 사용한다. 콘텐츠(여행지/안전/대표)는 6절과 같이 Supabase 밖(정적 데이터)에 둔다.

Supabase가 담당하는 것:
- 이메일 가입/인증/로그인/로그아웃/재설정(`REQ-FUNC-066`), 성인확인 상태 저장(`REQ-FUNC-028`)
- 동행 모집글 작성/수정/마감(`REQ-FUNC-031~038`)
- 참가 요청 제출/승인/거절(`REQ-FUNC-034~036, 043`)
- 신고 접수/상태 변경(`REQ-FUNC-039, 041`), 차단/해제(`REQ-FUNC-040`)
- 관리자 외부 URL 설정 저장(`REQ-FUNC-077`)

---

## 8. DB — 6개 테이블

Supabase Postgres에는 아래 **6개 테이블만** 만든다(`TASKS/TASK_MANIFEST.csv`의 DB/API Task 전량이 이 범위로 설계됨).

| 테이블 | 핵심 컬럼(요약) | 관련 Task |
|---|---|---|
| `user_profile` | `user_id`(FK `auth.users`), `nickname`, `is_adult`, `adult_verified_at`, `age_band`, `gender`, `travel_styles`, `bio`, `status` | `API-ACCOUNT-PROFILE` |
| `mate_post` | `post_id`, `owner_id`, `country_id`, `region_id`, `start_date`, `end_date`, `capacity`, `preferences`, `travel_styles`, `title`, `description`, `status`, `created_at` | `API-MATE-POST` |
| `mate_application` | `application_id`, `post_id`, `applicant_id`, `message`, `status`, `created_at` | `API-MATE-APPLICATION` |
| `user_block` | `blocker_id`, `blocked_id`, `created_at` | `API-MATE-BLOCK` |
| `report` | `report_id`, `reporter_id`, `target_type`, `target_id`, `reason_code`, `description`, `status`, `assignee_id`, `created_at`, `resolved_at` | `API-MATE-REPORT` |
| `outbound_link_setting` | `id`, `flight_url`, `hotel_url`, `updated_by`, `updated_at` | `API-ADMIN-SETTINGS` |

`COUNTRY`/`REGION`/`DESTINATION`/`COUNTRY_SAFETY`/`MEDIA_ASSET`/`REPRESENTATIVE_PROFILE`/`AUDIT_LOG` 등 `02_SRS_BASELINE.md` 6.3절에 언급된 나머지 엔터티는 정적 데이터이거나 EXCLUDED이므로 테이블로 만들지 않는다. 새 테이블이 필요하다고 판단되면 이 문서와 `TASKS/00_TASK_LIST.md`를 먼저 갱신한 뒤 추가한다.

### 8-1. Browser / Server Supabase Client 분리

`DB-ACCESS` Task가 정의하는 두 진입점만 사용한다.

| 클라이언트 | 파일(예정) | 용도 |
|---|---|---|
| Browser Client | `src/lib/supabase/client.ts` | Client Component에서 로그인 폼 제출, 세션 확인 등 브라우저 컨텍스트 호출 |
| Server Client | `src/lib/supabase/server.ts` | Server Component/Server Action에서 쿠키 기반 세션으로 서버 사이드 조회·쓰기 |

Anon Key는 Browser Client에서만, Service Role Key(있다면)는 서버 전용 코드에서만 사용하며 클라이언트 번들에 포함하지 않는다.

### 8-2. 간단한 RLS 원칙

- 기본값은 **비허용**이며, 아래 규칙만 명시적으로 허용한다.
- `mate_post`: 상태가 공개 가능한 글은 누구나 `SELECT` 가능(차단 관계는 애플리케이션 계층에서 추가 필터링), 쓰기는 `owner_id = auth.uid()`인 본인만.
- `mate_application`: `SELECT`/쓰기 모두 `applicant_id = auth.uid()` 이거나 해당 글의 `owner_id = auth.uid()`인 경우만.
- `user_block`: `blocker_id = auth.uid()`인 본인 행만 `SELECT`/쓰기.
- `report`: `INSERT`는 로그인 사용자 본인, `SELECT`/상태 변경은 작성자 본인 신고 이력 또는 Admin만.
- `user_profile`: 본인 행만 전체 `SELECT`/쓰기, 닉네임 등 공개 필드는 다른 사용자도 최소 범위로 조회 가능.
- `outbound_link_setting`: `SELECT`는 인증된 사용자 전체, `UPDATE`는 Admin 역할만.
- Admin 판별은 `user_profile.status`(또는 별도 역할 컬럼)를 서버에서 확인하며, 클라이언트가 보낸 역할 값을 신뢰하지 않는다.

이 이상의 세분화된 정책(행 단위 세밀한 권한, 다단계 역할 체계)은 이번 범위에서 만들지 않는다 — "간단한 원칙"을 유지한다.

### 8-3. Prisma·ORM 미사용

DB 접근은 `@supabase/supabase-js`가 제공하는 쿼리 빌더만 사용한다. Prisma, Drizzle 등 별도 ORM/쿼리 빌더를 추가하지 않는다. 스키마는 SQL 마이그레이션 파일(`supabase/migrations/*.sql`)로 직접 관리한다.

---

## 9. 테스트 전략

| 계층 | 도구 | 대상 |
|---|---|---|
| 단위 테스트 | **Vitest** | 날짜 검증(`UNIT-TRAVEL-DATES`), 연락처 탐지(`UNIT-CONTACT-DETECTION`), 동행 상태 전이(`UNIT-MATE-STATE`) |
| RLS 검증 | Vitest 또는 SQL 테스트(`TEST-RLS-BASIC`) | 6개 테이블의 권한별 접근 제어 |
| E2E | **Playwright, Chromium 프로젝트만** | `E2E-PUBLIC-SMOKE`, `E2E-TRAVEL-TOOLS`, `E2E-MATE-AUTH` 3개 Task로 핵심 흐름 5~7개를 커버 |

Firefox/WebKit 프로젝트, 부하 테스트, 시각적 회귀 테스트 도구는 도입하지 않는다.

---

## 10. CI/CD

- **GitHub Actions**(`.github/workflows/ci.yml`, `CI-PIPELINE` Task)로 `tsc --noEmit`, ESLint, Vitest 단위 테스트, RLS 테스트, Playwright E2E 3종을 병합 조건으로 묶는다.
- **Vercel**을 배포 대상으로 하며, PR마다 Preview 배포로 확인하고 `main` 병합 시 Production에 반영한다. 배포 확인은 `RELEASE-VERCEL-SUPABASE-CHECK` Task(브라우저 수동 확인)로 마무리한다.
- Self-hosted Runner, 별도 컨테이너 레지스트리 등 추가 CI 인프라는 구성하지 않는다.

---

## 11. 제외되는 인프라·서비스

| 항목 | 상태 |
|---|---|
| AWS, EC2 등 자체 서버 인프라 | **사용하지 않음.** 컴퓨트/배포는 Vercel, 데이터는 Supabase로 한정한다. |
| GitHub Auto-merge/Merge Queue 등 무인 자동 병합 | **사용하지 않음.** PR은 사람이 검토 후 병합한다. |
| 콘텐츠 CMS | **프로젝트 범위 제외.** 여행지/안전/대표 콘텐츠는 6절의 정적 데이터로만 관리하며, 별도 CMS·Headless CMS 연동을 만들지 않는다. |
| 외부 Email 발송 공급자(SendGrid 등) | **프로젝트 범위 제외.** 상태 변경 알림은 인앱 Toast/화면 상태로만 제공하고 실제 이메일 발송 연동은 만들지 않는다. |
| 외부 Monitoring/APM(Sentry, Datadog 등) | **프로젝트 범위 제외.** 구조화 로그, 장애 알림, 성능 모니터링 도구는 이번 범위에서 도입하지 않는다(`docs/PROJECT_SCOPE.md` REQ-NF-009/032/033 EXCLUDED). |

---

## 12. 착수 차단(Blocking) 항목

아래는 지금 저장소를 실제로 확인해 **현재 존재하지 않는 것으로 확인된** 파일/환경변수만 기록한다(추정이 아님). 이 항목들이 준비되기 전에는 해당 영역의 구현에 착수할 수 없다.

| # | 누락 항목 | 확인 방법 | 필요한 조치 |
|---|---|---|---|
| 1 | `@supabase/supabase-js` 의존성 | `package.json` `dependencies`에 없음(확인 완료) | `DB-ACCESS` Task 착수 전 설치 필요 |
| 2 | Supabase 환경변수 | 저장소 루트에 `.env`, `.env.local`, `.env.example` 파일 없음(확인 완료) | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, (필요 시) `SUPABASE_SERVICE_ROLE_KEY`를 Vercel 환경변수와 로컬 `.env.local`에 설정해야 `INFRA-AUTH-GUARD`, `DB-ACCESS`, 모든 API Task 착수 가능 |
| 3 | 외부 이동 URL 환경변수/기본값 | 저장소에 항공/숙소 기본 URL을 정의한 설정 파일 없음(확인 완료) | `INFRA-OUTBOUND-LINK` 착수 전 기본 허용목록(HTTPS URL) 값 결정 필요 — 관리자 설정 전 fallback 값으로 사용 |
| 4 | `supabase/` 디렉터리(마이그레이션) | 저장소에 `supabase/` 폴더 없음(확인 완료) | `DB-SCHEMA-BASE` 착수 전 `supabase init` 또는 마이그레이션 디렉터리 생성 필요 |
| 5 | `src/data/*.ts` 콘텐츠 파일 | `src/data`는 존재하나 파일 없음(확인 완료) | `DATA-DESTINATIONS`/`DATA-SAFETY`/`DATA-REPRESENTATIVE` 착수 전 실제 콘텐츠 데이터(문안·이미지 URL) 확보 필요 — 이 문서는 콘텐츠 자체를 정의하지 않는다 |
| 6 | Vitest/Playwright devDependency | `package.json` `devDependencies`에 `vitest`, `@playwright/test` 없음(확인 완료) | `INFRA-PLAYWRIGHT-CONFIG`, `UNIT-*` Task 착수 전 설치 필요 |
| 7 | `.github/workflows/` 디렉터리 | 저장소에 없음(확인 완료) | `CI-PIPELINE` 착수 전 워크플로 디렉터리 생성 필요 |
| 8 | `src/app/{about,travel-tools,mates,account}` 디렉터리 | 현재 `src/app`에는 `layout.tsx`, `page.tsx`만 존재(확인 완료) | 각 `PAGE-SCR00X` Task 착수 시 해당 라우트 디렉터리를 새로 생성 |

CMS, 외부 Email 공급자, Monitoring은 "누락"이 아니라 **11절과 같이 프로젝트 범위에서 제외**된 것이므로 착수 차단 목록에 포함하지 않는다.
