# Free Traveler — Project State

**Document ID:** PROJECT-STATE-001
**작성일:** 2026-09-17
**성격:** 살아있는 상태 스냅샷 — Wave/Task/배포가 진행될 때마다 이 문서를 갱신한다. 확인하지 않은 값은 추정해서 채우지 않고 `N/A` 또는 `UNKNOWN`으로 남긴다.

이 문서는 저장소를 직접 확인한 사실만 기록한다(추정 없음). 확인 방법은 각 필드에 함께 적는다.

---

## 1. 상태 필드

| 필드 | 값 | 근거/확인 방법 |
|---|---|---|
| **Harness Schema** | `traveler-screen-route-v1` | `CLAUDE.md` Harness Marker, `design-reference/SCREEN_ROUTE_CONTRACT.json`의 `schema_version` |
| **Design Version** | `D-001` (LOCKED) | `design-reference/DESIGN_MANIFEST.md`(`Active Design Version: D-001`, `Status: LOCKED`) |
| **Scope Mode** | `LOCKED` — 114/114 Requirement 분류 완료(IMPLEMENT 계열 77 / EXCLUDED 37) | `docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md`, `TASKS/00_TASK_LIST.md` NON_IMPLEMENTATION 표(37건) |
| **Current Wave** | `NOT_STARTED`(Wave 계획 자체가 아직 없음) | `TASKS/WAVE_PLAN.md`, `TASKS/WAVE_STATE.json` 둘 다 저장소에 없음(확인 완료) |
| **Current Task** | `N/A` | `prepare-task` 절차/`READY_TO_IMPLEMENT` Task 없음(진행 중인 Wave가 없으므로) |
| **Completed Tasks** | `0 / 66` | `TASKS/00_TASK_LIST.md` 구현 Task 66개의 Expected Files를 실측: `src/app/{about,travel-tools,mates,account}`, `supabase/`, `src/data/*.ts`, `playwright.config.ts`, `.github/workflows/` 전부 미생성 확인. `src/app/page.tsx`도 아직 Next.js Starter 상태 |
| **Blocked Tasks** | `0`(아직 아무 Task도 시작하지 않아 BLOCKED로 전이된 것 없음) | `TASKS/WAVE_STATE.json` 부재 — 단 `docs/ARCHITECTURE.md` 12절의 착수 차단 8건은 여전히 유효(아래 Next Action 참고) |
| **Latest CI** | `N/A`(워크플로 자체가 없음) | `.github/workflows/ci.yml` 없음(확인 완료) |
| **Supabase State** | `NOT_PROVISIONED` | `package.json`에 `@supabase/supabase-js` 없음, `supabase/` 디렉터리 없음, `.env`/`.env.local`/`.env.example` 없음(확인 완료) |
| **Vercel Preview URL** | `N/A`(배포 이력 없음) | 배포된 적 없음 — `RELEASE-VERCEL-SUPABASE-CHECK` Task 미착수 |
| **Screen Checkpoints** | 아래 표 참고 | — |
| **Playwright State** | `NOT_CONFIGURED` | `package.json`에 `@playwright/test` 없음, `playwright.config.ts` 없음(확인 완료) |
| **Deferred Items** | EXCLUDED 37건(REQ-FUNC 15 + REQ-NF 22) | `docs/PROJECT_SCOPE.md` 5·6절, `TASKS/00_TASK_LIST.md` NON_IMPLEMENTATION 표(근거·후속 방향 포함) — 상세는 4절 |
| **Next Action** | 아래 5절 참고 | — |

---

## 2. Screen Checkpoints

| Screen | Route | 상태 |
|---|---|---|
| SCR-001 | `/` | PENDING |
| SCR-002 | `/about` | PENDING |
| SCR-003 | `/travel-tools` | PENDING |
| SCR-004 | `/mates` | PENDING |
| SCR-005 | `/account` | PENDING |
| **FINAL** | (전체 릴리스 판정, `/release-check` 참고) | PENDING |

각 Screen 체크포인트는 해당 Page Owner Wave가 `WAITING_FOR_PREVIEW`에 도달해 사람이 Preview를 확인한 뒤 `PASS`(또는 재작업 필요 시 `FAIL`)로 갱신한다(`docs/DECISION_LOG.md` DEC-010, `.claude/commands/run-wave.md` 8절). `FINAL`은 5개 Screen이 전부 `PASS`이고 `/release-check`가 `RELEASE_READY`를 반환할 때 `PASS`로 갱신한다.

---

## 3. 알려진 스키마 격차 (참고)

`TASKS/00_TASK_LIST.md`의 실제 16개 열에는 `Implementation Status`(IMPLEMENT/IMPLEMENT(축소), `docs/PROJECT_SCOPE.md` 분류)만 있고, `NOT_STARTED`/`DONE` 같은 **Task 진행 상태 열은 없다.** Task 진행 상태의 정본은 `TASKS/WAVE_STATE.json`(아직 생성 전)이며, 이 문서의 `Completed Tasks`/`Blocked Tasks`는 그 파일이 생기기 전까지는 Expected Files 실측으로 대신 확인한다. `TASKS/WAVE_STATE.json`이 생기면 이후 갱신은 그 파일을 정본으로 삼는다.

---

## 4. Deferred Items 상세

EXCLUDED 37건은 삭제되지 않고 `TASKS/00_TASK_LIST.md`의 `## NON_IMPLEMENTATION` 표에 근거·후속 방향과 함께 보존되어 있다(`docs/DECISION_LOG.md` DEC-014). 대표 범주:

- 콘텐츠 CMS·미디어 라이선스 워크플로(REQ-FUNC-055·056·072~076)
- 통합검색·URL 공유·SEO·행동분석(REQ-FUNC-067·069~071)
- 성능/부하/모니터링/장애 알림(REQ-NF-001~005·007~011·019~022·024·025·029·030·032~034)
- 회원 탈퇴 비식별화, 개인정보 내보내기(REQ-FUNC-045, REQ-NF-018)
- Moderator 제재(경고/숨김/계정 제한)(REQ-FUNC-042)

전체 목록과 사유는 `docs/PROJECT_SCOPE.md`와 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표를 정본으로 한다.

---

## 5. Next Action

현재 상태 기준으로 다음 순서를 권장한다(`docs/ARCHITECTURE.md` 12절, `docs/DECISION_LOG.md` DEC-010 근거):

1. **착수 차단 해소**(`docs/ARCHITECTURE.md` 12절 8건): `@supabase/supabase-js`·`vitest`·`@playwright/test` 설치, Supabase 환경변수 설정, `supabase/` 디렉터리 초기화, `.github/workflows/` 생성, `src/data/*.ts` 콘텐츠 확보, 4개 Screen 라우트 디렉터리 생성.
2. **Wave 계획 작성**: `TASKS/00_TASK_LIST.md`의 Depends On 그래프를 위상 정렬해 `TASKS/WAVE_PLAN.md`를 만든다(Page Owner Wave마다 Preview Checkpoint 표시).
3. **Wave 실행 시작**: `/run-wave W01`부터 순서대로 진행하고, 각 Page Owner Wave 종료 시 `WAITING_FOR_PREVIEW`에서 사람이 Preview를 확인한 뒤 이 문서의 Screen Checkpoint를 갱신한다.
4. **릴리스 판정**: 5개 Screen 체크포인트가 전부 `PASS`가 되면 `/release-check`로 `RELEASE_READY` 여부를 확인한다.

이 문서의 `Current Wave`/`Current Task`/`Completed Tasks`/`Blocked Tasks`/`Latest CI`/`Supabase State`/`Vercel Preview URL`/`Playwright State`/`Screen Checkpoints`는 위 단계가 진행될 때마다(특히 `/run-wave`, `/release-check` 실행 후) 실제 확인한 값으로 갱신한다.
