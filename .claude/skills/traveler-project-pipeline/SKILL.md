---
name: traveler-project-pipeline
description: Free Traveler 구현 Task List와 Task 상세 파일을 SCREEN_ROUTE_CONTRACT.json / UIUX_TRACEABILITY.md 기준으로 생성·검증하는 파이프라인. Task List 생성(/gen-tasklist), Task 상세 생성(/gen-task-details), Task 감사(/audit-tasks) 중 반드시 로드한다. Traveler 프로젝트의 구현 Task를 만들거나 점검하는 모든 작업에서 이 Skill을 우선 따른다.
---

# Traveler Project Pipeline

이 Skill은 Free Traveler의 승인된 디자인·요구사항 문서를 Next.js App Router 구현 Task로 변환하는 **결정론적 파이프라인**을 정의한다. 파이프라인은 3단계로 구성된다.

```
/gen-tasklist      → scripts/validate_inputs.py (게이트) → TASKS/00_TASK_LIST.md
/gen-task-details  → TASKS/TASK-<ID>.md (00_TASK_LIST.md와 1:1) → scripts/audit_tasks.py 자동 실행
/audit-tasks       → scripts/audit_tasks.py 단독 재실행 → TASKS/TASK_MANIFEST.csv, TASKS/TASK_AUDIT_REPORT.md
```

이 Skill 문서는 **정본 규칙집**이다. 세 커맨드(`gen-tasklist`, `gen-task-details`, `audit-tasks`)와 두 스크립트(`validate_inputs.py`, `audit_tasks.py`)는 모두 이 문서의 규칙을 참조하며, 규칙이 바뀌면 이 문서부터 수정한다. 산출물 경로가 실제 저장소와 다르면 **저장소 실측이 옳고 이 문서가 틀린 것**이므로, 이 문서를 먼저 고친다.

---

## 0. 정본 입력·출력 문서

### 입력(정본)

| 문서 | 역할 |
|---|---|
| `docs/06_SRS_UIUX_REVISED.md` | Route/Screen 구조 개정본 (요구사항 원문은 `docs/02_SRS_BASELINE.md`가 정본) |
| `docs/PROJECT_SCOPE.md` | REQ-FUNC-001~080, REQ-NF-001~034의 IMPLEMENT/IMPLEMENT(축소)/EXCLUDED 확정 분류 |
| `docs/UIUX_TRACEABILITY.md` | 114개 Requirement × Screen/Route/Page Entry/Test 매핑(정본 추적표) |
| `design-reference/D-001/DESIGN.md` | 디자인 정본(LOCKED) — 색상/타이포/컴포넌트/Section 계약 |
| `design-reference/UI_CONTRACT.md` | Screen별 영역 순서·컴포넌트·상태·이동 계약 |
| `design-reference/SCREEN_ROUTE_CONTRACT.json` | **Screen 목록의 유일한 정본**(schema `traveler-screen-route-v1`) |
| `docs/ARCHITECTURE.md` | 기술 스택·Server/Client 경계·Supabase 범위·DB 6테이블·제외 인프라 |
| `docs/DECISION_LOG.md` | DEC-001~014, 번복 없이 유지되는 프로젝트 결정 |
| `CLAUDE.md`(저장소 루트) | Harness Marker(`HARNESS_SCHEMA` 등)와 23개 필수 규칙 |
| `package.json`, `src/app/**`(실제 파일 트리) | 현재 코드베이스 상태 — Expected Files 산정의 근거 |

`design-reference/SCREEN_ROUTE_CONTRACT.json` 이외의 문서가 Screen 개수·Route·Page Entry에 대해 서로 다른 내용을 말하면 **JSON을 따른다.**

### 출력(정본)

| 산출물 | 경로 |
|---|---|
| Task List | `TASKS/00_TASK_LIST.md` |
| Task 상세 | `TASKS/TASK-<ID>.md` (1개 Task = 1개 파일, `00_TASK_LIST.md`와 1:1) |
| Task 매니페스트(CSV) | `TASKS/TASK_MANIFEST.csv` — `scripts/audit_tasks.py` 실행마다 갱신 |
| Task 감사 리포트 | `TASKS/TASK_AUDIT_REPORT.md` — `scripts/audit_tasks.py` 실행마다 갱신 |
| 입력 스냅샷 | `docs/tasks/_src_app_tree_snapshot.json`(`scripts/validate_inputs.py`가 매 실행 시 갱신하는 실제 `src/app` 파일 트리 기록) |

과거 버전의 산출물 경로(`docs/tasks/TASKLIST.md`, `docs/tasks/details/<ID>.md`)는 더 이상 정본이 아니다 — 지금은 `TASKS/00_TASK_LIST.md`와 `TASKS/TASK-<ID>.md`가 유일한 정본이다.

---

## 1. Skill 핵심 규칙 (1~20)

1. **HARNESS_SCHEMA = `traveler-screen-route-v1`.** 이 파이프라인이 생성하는 모든 산출물(Task List 프런트매터, 스크립트 검증 로그)은 이 스키마 버전 문자열을 그대로 사용한다. `SCREEN_ROUTE_CONTRACT.json`의 `schema_version` 및 `CLAUDE.md`의 `HARNESS_SCHEMA` 값과 불일치하면 파이프라인을 중단한다.
2. **Screen 목록의 정본은 `SCREEN_ROUTE_CONTRACT.json`이다.** `docs/`나 `design-reference/*.md`의 서술이 JSON과 다르면 JSON이 우선한다.
3. **정확히 5개 Screen 각각에 Page Owner Task를 하나씩 만든다.** SCR-001~SCR-005 외 추가 Page Owner Task는 만들지 않는다. Task ID는 `PAGE-SCR001`~`PAGE-SCR005`를 쓴다.
4. **Expected Files는 실제 `src/app` 파일 트리를 확인한 뒤 쓴다.** `scripts/validate_inputs.py`가 매 실행 시 `docs/tasks/_src_app_tree_snapshot.json`으로 현재 트리를 스냅샷하며, Task 상세의 Expected Files는 이 스냅샷 기준으로 "신규 생성"과 "기존 파일 수정"을 구분해 기록한다.
5. **Page Owner Task와 Component Task를 구분한다.** Page Owner는 하나의 `page.tsx`를 조립하는 Task이고, Component Task는 그 안에 들어가는 개별 섹션/컴포넌트/서버 액션/데이터 Task다. Task ID 접두사로 구분한다(2절).
6. **Page Owner는 같은 Screen의 모든 Component Task에 의존(Depends On)한다.** Component Task가 끝나기 전에는 Page Owner가 "완료"로 표시될 수 없다.
7. **`src/app/page.tsx`(SCR-001) Owner는 Next.js Starter 제거 Acceptance Criteria를 가진다.** `create-next-app` 기본 템플릿(로고, "Get Started", Vercel 링크 등)이 남아있지 않음을 AC로 명시한다.
8. **`/travel-tools`(SCR-003) Owner는 항공·숙소·동행 탭을 실제로 조립한다.** 세 탭 컴포넌트가 모두 Depends On에 포함되어야 하며, 탭 중 하나라도 누락되면 Owner Task는 완료로 간주하지 않는다.
9. **`/account`(SCR-005) Owner는 Guest·Member·Admin 상태를 실제로 조립한다.** 역할별 분기 로직과 각 역할의 컴포넌트 Task가 모두 Depends On에 포함되어야 한다.
10. **DB는 6개 테이블로 제한한다.** 허용 테이블은 3절의 표가 유일한 정본이다. 이 표에 없는 테이블을 만드는 Task는 생성하지 않는다.
11. **여행지·안전정보·대표 소개는 정적 데이터 Task로 만든다.** `src/data/*`에 TypeScript 상수로 작성하며 DB 테이블을 만들지 않는다(REQ-FUNC-004, 046~053, 057~063 등).
12. **외부 항공·숙소 입력값을 서버·DB·URL에 보내지 않는다.** 관련 Task의 Security/Privacy AC에 "브라우저 메모리 상태로만 유지, 서버 액션/DB 저장/쿼리 파라미터 전달 금지"를 명시한다.
13. **Playwright는 Chromium Smoke Task만 만든다.** Firefox/WebKit 프로젝트, 비주얼 회귀, 부하 테스트 Task는 만들지 않는다.
14. **자동 Merge·EC2·AWS Task를 만들지 않는다.** Vercel/Supabase 외 인프라 프로비저닝, GitHub Auto-merge/Merge Queue 설정 Task는 생성 대상이 아니다.
15. **114개 Requirement 전체에 IMPLEMENT 또는 EXCLUDED 상태를 기록한다.** `docs/UIUX_TRACEABILITY.md`와 `docs/PROJECT_SCOPE.md`의 Implementation Status를 그대로 가져오며, IMPLEMENT와 IMPLEMENT(축소)는 모두 "IMPLEMENT 계열"로 취급해 Task를 만든다.
16. **EXCLUDED는 상세 구현 Task를 만들지 않지만 추적표에서 삭제하지 않는다.** `TASKS/00_TASK_LIST.md`의 `## NON_IMPLEMENTATION` 표에 근거·후속 방향과 함께 전건 보존한다.
17. **Task List와 상세 파일이 1:1이어야 한다.** IMPLEMENT 계열 Task 각각에 대해 `TASKS/TASK-<ID>.md`가 정확히 하나 존재해야 하며, 목록에 없는 상세 파일(고아 파일)이나 상세가 없는 목록 항목이 있으면 안 된다.
18. **상세 생성 후 `scripts/audit_tasks.py`를 실행한다.** `/gen-task-details` 커맨드는 상세 파일 생성 직후 이 스크립트를 자동 실행하고 결과를 보고한다. **Task Audit 실패를 무시하지 않는다** — 실패(exit 1)나 NO_ARTIFACTS(exit 2)를 완료로 보고하지 않는다.
19. **Page Owner Task 상세에 화면별 Section 순서와 최소 콘텐츠 수를 기록한다.** `design-reference/D-001/DESIGN.md` 17절과 `design-reference/UI_CONTRACT.md`의 영역 순서·개수(예: SCR-001 7 Section·국내/해외 Card 각 6개, SCR-004 Card 최대 8개 등)를 Functional AC에 그대로 옮긴다.
20. **Page Owner는 큰 빈 영역·Placeholder 문구를 금지하고, 데이터가 없을 때도 안내·이용 방법·CTA가 있는 Empty State를 요구한다.** `Lorem ipsum`, `준비 중`, `정보 확인 필요` 금지와 완성형 Empty State 요구(`design-reference/D-001/DESIGN.md` 18절)를 Page Owner AC에 명시한다.

---

## 2. Task ID 규칙 (실제 사용 중인 접두사)

| 접두사 | Task 유형 | 예시 |
|---|---|---|
| `INFRA-<NAME>` | 인프라/설정(디자인 토큰, Supabase 클라이언트, 레이아웃, Playwright 설정 등 Screen 비종속 Task) | `INFRA-DESIGN-TOKENS`, `INFRA-AUTH-GUARD` |
| `DATA-<NAME>` | 정적 데이터 Task(`src/data/*`) | `DATA-DESTINATIONS`, `DATA-SAFETY`, `DATA-REPRESENTATIVE` |
| `DB-<NAME>` | Supabase 스키마/RLS/접근 계층/Seed | `DB-SCHEMA-BASE`, `DB-RLS-BASE`, `DB-ACCESS`, `DB-SEED-BASE` |
| `API-<NAME>` | Server Action/Route Handler | `API-MATE-POST`, `API-ACCOUNT-PROFILE` |
| `COMP-SCR00X-<NAME>` | 해당 Screen의 Component Task | `COMP-SCR003-FLIGHT-FORM` |
| `PAGE-SCR00X` | Page Owner Task(Screen당 정확히 1개) | `PAGE-SCR001` |
| `UNIT-<NAME>` | Vitest 단위 테스트 | `UNIT-TRAVEL-DATES`, `UNIT-CONTACT-DETECTION`, `UNIT-MATE-STATE` |
| `TEST-RLS-BASIC` | Supabase RLS 검증 | `TEST-RLS-BASIC` |
| `E2E-<NAME>` | Playwright Chromium Smoke Task | `E2E-PUBLIC-SMOKE`, `E2E-TRAVEL-TOOLS`, `E2E-MATE-AUTH` |
| `CI-PIPELINE` | CI 게이트 | `CI-PIPELINE` |
| `RELEASE-<NAME>` | Vercel/Supabase 배포 확인 | `RELEASE-VERCEL-SUPABASE-CHECK` |
| `MANUAL-<NAME>-CHECK` | 브라우저 수동 확인 | `MANUAL-RESPONSIVE-CHECK`, `MANUAL-A11Y-CHECK` |

Task ID는 전역에서 유일해야 하며, 이미 사용된 ID를 재사용하지 않는다. 새 Task를 추가할 때도 이 접두사 규칙을 따른다.

---

## 3. DB Table Allowlist (6개, 초과 금지)

| 테이블 | 핵심 컬럼(요약) | 관련 Requirement |
|---|---|---|
| `user_profile` | user_id(FK auth.users), nickname, is_adult, adult_verified_at, age_band, gender, travel_styles, bio, status | REQ-FUNC-028, 029, 044 |
| `mate_post` | post_id, owner_id, country_id, region_id, start_date, end_date, capacity, preferences, travel_styles, title, description, status, created_at | REQ-FUNC-031~038 |
| `mate_application` | application_id, post_id, applicant_id, message, status, created_at | REQ-FUNC-034~036, 043 |
| `user_block` | blocker_id, blocked_id, created_at | REQ-FUNC-040 |
| `report` | report_id, reporter_id, target_type, target_id, reason_code, description, status, assignee_id, created_at, resolved_at | REQ-FUNC-039, 041 |
| `outbound_link_setting` | id, flight_url, hotel_url, updated_by, updated_at | REQ-FUNC-077 |

`COUNTRY`, `REGION`, `DESTINATION`, `DESTINATION_CONTENT`, `COUNTRY_SAFETY`, `MEDIA_ASSET`, `REPRESENTATIVE_PROFILE`, `AUDIT_LOG` 등 `docs/02_SRS_BASELINE.md` 6.3절의 나머지 엔터티는 이번 범위에서 DB 테이블로 만들지 않는다(정적 데이터이거나 EXCLUDED). `scripts/audit_tasks.py` 검사 12는 6개 초과분을 소량(±2)까지만 허용하고 그 이상은 실패시킨다.

---

## 4. Screen 정본 요약 (SCREEN_ROUTE_CONTRACT.json 발췌)

| Screen ID | Route | Page Entry | 분류 | Mobile 변형 |
|---|---|---|---|---|
| SCR-001 | `/` | `src/app/page.tsx` | 핵심, `starter_template_forbidden: true` | 있음 |
| SCR-002 | `/about` | `src/app/about/page.tsx` | 보조 | 없음(구현 시 별도 검증) |
| SCR-003 | `/travel-tools` | `src/app/travel-tools/page.tsx` | 핵심, 탭 3개 | 있음 |
| SCR-004 | `/mates` | `src/app/mates/page.tsx` | 핵심 | 없음(구현 시 별도 검증) |
| SCR-005 | `/account` | `src/app/account/page.tsx` | 핵심, 역할 3종 | 없음(구현 시 별도 검증) |

기술 Route(Screen 수에 미포함): `src/app/auth/callback/route.ts`, `src/app/api/**/route.ts`, `src/app/not-found.tsx`, `src/app/error.tsx`.

---

## 5. Task 상세 파일 구조(14개 필수 절)

`TASKS/TASK-<ID>.md`는 아래 14개 절을 이 순서로 포함한다. `scripts/audit_tasks.py` 검사 항목(1:1 대응, 14절 존재 등)이 이 구조를 전제로 한다.

```
## Context
## Project Scope
## Requirement Ref
## Screen / Route / Page Entry
## Design Ref
## Depends On
## Expected Files
## Functional AC
## Visual AC
## Security/Privacy AC
## Test Cases
## Verify
## Definition of Done
## Forbidden
```

- **Expected Files 밖의 파일은 생성·수정하지 않는다.** 모든 상세 파일의 Forbidden 절에 이 제약을 명시한다.
- Page Owner Task는 하위 Component를 새로 만들지 않는다(조립만 수행) — Forbidden 절에 명시한다.

---

## 6. 산출물에 대한 최종 감사 (18개 검사)

`scripts/audit_tasks.py`는 아래 18개 항목을 번호 순서대로 검사하고, `TASKS/TASK_MANIFEST.csv`와 `TASKS/TASK_AUDIT_REPORT.md`를 항상(통과/실패 무관) 갱신한다.

1. Task List 구현 ID와 상세 Task 파일 1:1
2. 중복 Task ID 0
3. Depends On 누락 0
4. Dependency Cycle 0
5. Screen 5개 모두 Page Owner 정확히 1개
6. Route·Page Entry·Expected Files 일치(`SCREEN_ROUTE_CONTRACT.json` 대조)
7. Component-only Screen 0(Owner 없이 Component만 존재하는 Screen 없음)
8. SCR-001 Starter 제거 AC 존재
9. SCR-003 세 탭 조립 AC 존재
10. SCR-005 역할별 상태 조립 AC 존재
11. DB Schema·RLS·Access·Seed Task 존재
12. DB Table 범위가 6개 기본 테이블을 크게 넘지 않음(허용 초과 2개까지)
13. 외부 입력(항공·숙소) 비저장 AC 존재
14. Auth·성인·기본 RLS AC 존재
15. Playwright Chromium Smoke Task 존재
16. AWS·EC2·자동 Merge 구현 Task 0(금지 문구 자체는 위반으로 세지 않음)
17. REQ-FUNC 80개와 REQ-NF 34개가 Task 또는 NON_IMPLEMENTATION 표에 존재(`docs/PROJECT_SCOPE.md`와 교차 검증)
18. EXCLUDED 상세 구현 파일이 생성되지 않음

종료 코드: `0`=AUDIT_PASS, `1`=AUDIT_FAIL(하나 이상 위반), `2`=NO_ARTIFACTS(`TASKS/00_TASK_LIST.md` 없음). **1이나 2를 성공으로 보고하지 않는다.**

---

## 7. Task 개수에 대한 원칙

약 45~65개 Task가 나오는 것이 자연스럽지만(현재 66개: Page Owner 5 + Component 29 + Infra 8 + Data 3 + DB 4 + API 6 + Test 11), **개수 자체를 완료 조건으로 쓰지 않는다.** `scripts/audit_tasks.py`는 개수를 정보로만 출력하고 pass/fail 판정에 사용하지 않는다.

---

## 8. 금지 항목(요약)

- Firefox/WebKit Playwright 프로젝트, 부하 테스트, 시각적 회귀 테스트 Task
- EC2, 기타 AWS 리소스 프로비저닝 Task
- GitHub Auto-merge/Merge Queue 등 무인 자동 병합 Task
- 6개 허용 테이블 외 신규 DB 테이블 생성 Task(허용 초과 2개까지만)
- 항공·숙소 입력값을 서버/DB/쿼리 파라미터로 전달하는 구현을 요구하는 Task
- EXCLUDED Requirement에 대한 상세 구현 Task(단, NON_IMPLEMENTATION 표 등록은 유지)
- Prisma 등 ORM 도입 Task(`docs/ARCHITECTURE.md` 8-3절)
- 세 Command(`/gen-tasklist`, `/gen-task-details`, `/audit-tasks`) 모두 **실제 애플리케이션 구현 코드(컴포넌트, Server Action 등)를 작성하지 않는다.** 이 파이프라인은 계획·검증 문서만 생성한다.
