# Free Traveler — Decision Log

**Document ID:** DECISION-LOG-001
**작성일:** 2026-09-16
**상태:** LOCKED — 아래 결정은 번복 없이 이후 모든 문서·Task·구현의 전제로 사용한다. 번복이 필요하면 새 항목(DEC-015 이상)으로 추가하고 이 문서의 기존 항목을 지우지 않는다.

---

## 열 정의

각 결정은 `ID / 결정 / 배경 / 대안(기각) / 영향 범위 / 근거 문서`로 기록한다.

---

## DEC-001 — 실제 개발 루트는 `traveler/app`

**결정:** 이 프로젝트의 실제 코드·Git 저장소 루트는 `C:\AI_SERVICE\traveler\app`이다. 상위 `C:\AI_SERVICE\traveler\docs`(`00_PRD_Travel_v1.md`, `05_SRS_Travel_v1.md`)는 초기 기획 원본이 보관된 별도 위치이며 개발 루트가 아니다.

**배경:** `traveler/`(상위) 밑에 `traveler/docs`와 `traveler/app`이 공존한다. Git 저장소(`.git`)와 Next.js 프로젝트(`package.json`, `src/app`)는 `traveler/app`에만 존재하며, `traveler/docs`의 PRD/SRS 원본은 `traveler/app/docs/01_PRD.md`, `02_SRS_BASELINE.md`로 이미 옮겨져 재작성되었다.

**대안(기각):** 상위 `traveler/`를 모노레포 루트로 승격하고 `app/`을 하위 패키지로 재편하는 방안 — 현재 규모(단일 Next.js 앱)에서 불필요한 복잡도로 판단해 기각.

**영향 범위:** 이후 모든 경로 참조(`src/app/*`, `docs/*`, `design-reference/*`, `TASKS/*`, `scripts/*`)는 `traveler/app`을 기준으로 한다. `traveler/docs`는 더 이상 갱신하지 않는다.

**근거 문서:** 저장소 실측(`traveler/` 하위 디렉터리 확인), `docs/01_PRD.md`, `docs/02_SRS_BASELINE.md`.

---

## DEC-002 — 디자인 Screen은 핵심 4개·보조 1개

**결정:** 공개 디자인 Screen은 정확히 5개(SCR-001~005)로 고정하며, 그중 SCR-001(`/`)·SCR-003(`/travel-tools`)·SCR-004(`/mates`)·SCR-005(`/account`)를 핵심, SCR-002(`/about`)를 보조로 분류한다.

**배경:** SRS 원안의 다중 공개 Route(`/destinations/*`, `/flights`, `/hotels`, `/mates/*`, `/safety/*`, `/auth/*`, `/my/*`, `/admin/*`)를 5개 Screen의 탭·Drawer·패널로 통합했다. SCR-002는 전환 플로우가 아닌 신뢰·브랜딩 콘텐츠라 보조로 분류했다.

**대안(기각):** 원안 그대로 8개 이상 개별 Route 유지 — 승인·검증 대상이 늘어나고 Playwright/디자인 검증 범위가 불필요하게 커져 기각.

**영향 범위:** `design-reference/SCREEN_ROUTE_CONTRACT.json`이 Screen 목록의 유일한 정본이 되고, 이후 신규 공개 Route 추가는 이 문서 개정 없이는 허용하지 않는다.

**근거 문서:** `docs/03_UI_COVERAGE_ANALYSIS.md`, `docs/06_SRS_UIUX_REVISED.md` 2절, `design-reference/UI_CONTRACT.md` 0절, `design-reference/SCREEN_ROUTE_CONTRACT.json`.

---

## DEC-003 — `/travel-tools`에 항공·숙소·동행 작성을 통합

**결정:** 원래 별도 Route였던 `/flights`, `/hotels`, `/mates/new`를 하나의 Screen(SCR-003)의 3개 탭(항공편 찾기/숙소 찾기/동행 구하기)으로 통합한다. 세 탭은 입력·검증·완료 상태를 서로 독립적으로 유지한다.

**배경:** 세 기능 모두 "여행 조건을 정리한 뒤 다음 행동(외부 이동 또는 동행 모집)으로 넘어간다"는 동일한 사용자 흐름을 공유해 하나의 준비 허브로 묶는 것이 자연스럽다고 판단했다.

**대안(기각):** 항공/숙소만 통합하고 동행 작성은 `/mates` 하위에 유지 — 작성 흐름과 조회 흐름을 분리하면 오히려 "여행 조건 정리 → 다음 행동" 흐름이 끊겨 기각.

**영향 범위:** `COMP-SCR003-FLIGHT-FORM`/`HOTEL-FORM`/`MATE-WRITE` 3개 Component Task가 모두 `PAGE-SCR003` 하나에 의존, 탭 하나라도 누락되면 Page Owner는 미완료로 간주(`TASKS/TASK_AUDIT_REPORT.md` 검사 9).

**근거 문서:** `design-reference/UI_CONTRACT.md` 3절, `docs/05_UIUX_APPROVED.md` 3절(Route 통합 매핑), `TASKS/00_TASK_LIST.md` COMP-SCR003-*.

---

## DEC-004 — 여행지·안전·대표는 정적 TypeScript Data

**결정:** 여행지, 국가별 안전정보, `free_traveler` 대표 소개 콘텐츠는 Supabase 테이블이 아니라 `src/data/*.ts`의 정적 TypeScript 상수로 관리한다.

**배경:** 콘텐츠 갱신 빈도가 낮고 운영 인력이 없는 MVP 단계에서 CMS/DB 기반 콘텐츠 관리는 과잉 설계다. 정적 데이터는 타입 체크로 완전성(필수 필드)을 강제할 수 있다.

**대안(기각):** DB 테이블(`DESTINATION`, `COUNTRY_SAFETY`, `REPRESENTATIVE_PROFILE`)로 관리 — Editor/Admin CRUD·미디어 업로드·완전성 게이트까지 함께 필요해져 EXCLUDED 범위(REQ-FUNC-072~076)를 다시 끌어들이게 되므로 기각.

**영향 범위:** `DATA-DESTINATIONS`/`DATA-SAFETY`/`DATA-REPRESENTATIVE` 3개 Task, DB 6개 테이블 목록(DEC-006)에 콘텐츠 테이블이 포함되지 않음.

**근거 문서:** `docs/PROJECT_SCOPE.md`(REQ-FUNC-004·046~053·057~063), `docs/ARCHITECTURE.md` 6절.

---

## DEC-005 — Supabase는 Auth와 동행 기능 중심

**결정:** Supabase의 사용 범위를 이메일 인증(Auth)과 동행(Mate) 관련 쓰기 기능(모집글·참가요청·신고·차단·관리자 설정)으로 한정한다.

**배경:** DEC-004로 콘텐츠가 Supabase 밖으로 빠지면서, Supabase에 남는 책임은 "로그인이 필요한 상호작용"뿐이다. 이 경계를 명시하지 않으면 이후 Task 생성 시 Supabase 책임이 점차 확장될 위험이 있다.

**대안(기각):** Supabase를 콘텐츠까지 포함하는 단일 데이터 계층으로 사용 — DEC-004와 상충하여 기각.

**영향 범위:** `docs/ARCHITECTURE.md` 7절이 이 경계를 코드 계층에서 재확인.

**근거 문서:** `docs/PROJECT_SCOPE.md`, `docs/ARCHITECTURE.md` 7절.

---

## DEC-006 — DB는 6개 Table로 제한

**결정:** Supabase Postgres 테이블은 `user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `outbound_link_setting` 6개로 제한한다.

**배경:** SRS 원안 6.3절의 13개 엔터티 중 콘텐츠 계열(DEC-004)과 감사 로그(EXCLUDED, DEC-014)를 제외하면 실제로 쓰기 트랜잭션이 필요한 엔터티는 이 6개뿐이다.

**대안(기각):** `AUDIT_LOG` 테이블 추가 — REQ-FUNC-076이 EXCLUDED로 확정되어 근거가 없어 기각. `MEDIA_ASSET` 테이블 추가 — 이미지가 URL+alt만 사용하는 정적 데이터 필드로 충분해 기각.

**영향 범위:** `DB-SCHEMA-BASE` Task, `TASKS/TASK_AUDIT_REPORT.md` 검사 11·12(DB Task 존재/테이블 범위).

**근거 문서:** `docs/PROJECT_SCOPE.md`, `docs/ARCHITECTURE.md` 8절, `TASKS/00_TASK_LIST.md`.

---

## DEC-007 — 항공·숙소 입력은 Browser Memory에만 유지

**결정:** SCR-003의 항공/숙소 입력값(국가·지역·날짜)은 Client Component의 로컬 상태(Browser Memory)에만 보관하며, Server Action·DB·외부 URL 쿼리 파라미터·서버 로그 어디로도 전송하지 않는다.

**배경:** PRD 제품 원칙("항공·호텔 입력값은 MVP에서 외부 사이트로 전달하거나 서버에 저장하지 않는다")과 개인정보 최소 수집 원칙을 그대로 계승했다.

**대안(기각):** 입력 이력을 개인화·재방문 편의를 위해 서버에 저장 — 수집 목적 대비 위험이 커 기각.

**영향 범위:** `COMP-SCR003-FLIGHT-FORM`/`HOTEL-FORM`의 Forbidden 절, `docs/ARCHITECTURE.md` 5절, `TASKS/TASK_AUDIT_REPORT.md` 검사 13.

**근거 문서:** `docs/01_PRD.md` 2-3절 제품 원칙, `docs/PROJECT_SCOPE.md`(REQ-FUNC-017·025, REQ-NF-017), `docs/ARCHITECTURE.md` 5절.

---

## DEC-008 — Airbnb `DESIGN.md`는 vendor 참고본, D-001이 실제 정본

**결정:** `design-reference/vendor/airbnb/DESIGN-airbnb.md`는 레이아웃·elevation·밀도 같은 **원리**만 참고하는 자료로 취급하고, 실제 색상·타이포·컴포넌트·Section 계약의 정본은 `design-reference/D-001/DESIGN.md`(LOCKED) 하나로 한정한다.

**배경:** Airbnb 고유 상표 요소(워드마크, Rausch 정확값, "Guest favorite"/"NEW" 배지, 3-product 내비게이션, Reserve/체크아웃 컴포넌트)를 그대로 쓰면 상표·저작권 문제와 예약 마켓플레이스로의 오인을 동시에 일으킨다.

**대안(기각):** Airbnb DESIGN.md를 부분 수정해 그대로 사용 — 상표 요소 제거가 불완전해질 위험이 있어 기각하고 전면 재작성(D-001) 방식을 택했다.

**영향 범위:** 모든 Stitch 화면 생성·검증(`STITCH_VALIDATION_REPORT.md`)과 구현 Task(`TASKS/*`)는 D-001만 인용한다. Airbnb 문서를 코드나 Task 상세에 직접 인용하지 않는다.

**근거 문서:** `design-reference/D-001/DESIGN.md` 1절, `design-reference/DESIGN_MANIFEST.md`, `STITCH_VALIDATION_REPORT.md`.

---

## DEC-009 — Playwright는 Chromium Smoke만 필수

**결정:** Playwright E2E는 Chromium 프로젝트 1개만 설정하고, 핵심 사용자 흐름 5~7개를 3개 Task(`E2E-PUBLIC-SMOKE`/`E2E-TRAVEL-TOOLS`/`E2E-MATE-AUTH`)로 묶은 Smoke Test만 필수로 둔다.

**배경:** MVP 단계에서 크로스 브라우저 회귀·부하·시각적 회귀 테스트까지 갖추는 것은 검증 대비 비용이 크다. 핵심 흐름이 Chromium에서 통과하는 것으로 릴리스 가능 여부를 판단한다.

**대안(기각):** Firefox/WebKit 프로젝트 추가, 시각적 회귀 테스트 도입 — REQ-NF-001~005·007·024·025가 EXCLUDED로 확정된 것과 상충해 기각.

**영향 범위:** `INFRA-PLAYWRIGHT-CONFIG`, `TASKS/TASK_AUDIT_REPORT.md` 검사 15·16.

**근거 문서:** `docs/PROJECT_SCOPE.md`, `docs/ARCHITECTURE.md` 9절, `.claude/skills/traveler-project-pipeline/SKILL.md` 규칙 13.

---

## DEC-010 — 사용자의 개발 실행 단위는 Wave

**결정:** 사용자가 실제 구현을 진행할 때의 실행 단위를 **Wave**로 정의한다. 하나의 Wave는 `TASKS/00_TASK_LIST.md`에서 서로 의존성이 없거나 이미 완료된 Task에만 의존하는 Task 묶음이며, 한 Wave 안의 Task들은 병렬로 착수 가능하되 Wave 자체는 순서대로 진행한다(예: Wave 1 = Depends On이 없는 INFRA/DATA/DB-SCHEMA-BASE, Wave 2 = Wave 1에만 의존하는 DB-RLS-BASE/DB-ACCESS 등, 이하 Depends On 그래프를 따라 순차 확장).

**배경:** 66개 Task를 개별적으로 지시하면 순서 실수(선행 Task 누락)가 발생하기 쉽다. `TASKS/00_TASK_LIST.md`의 Depends On 그래프(`TASKS/TASK_AUDIT_REPORT.md` 검사 4에서 순환 없음을 이미 확인)를 위상 정렬해 Wave로 묶으면 매번 "지금 무엇을 시켜도 되는가"를 판단하는 비용이 줄어든다.

**대안(기각):** Task를 Seq 순서(1~66)대로 그대로 순차 실행 — Category가 섞여 있어 병렬화 가능한 Task까지 불필요하게 직렬화되므로 기각.

**영향 범위:** 이후 "Wave 계획" 문서(있다면)와 실행 지시는 이 정의를 따른다. Wave 번호·구성은 이 문서가 아니라 별도 Wave 계획 산출물에서 확정한다.

**근거 문서:** `TASKS/00_TASK_LIST.md`, `TASKS/TASK_AUDIT_REPORT.md`(검사 4: Dependency Cycle 0).

---

## DEC-011 — Single Agent가 Wave 내부 Task를 순차 수행

**결정:** 하나의 Wave 내부에서도 Task 구현은 **Single Agent(현재 세션)가 순차적으로** 수행한다. 여러 Task를 동시에 병렬 실행하는 멀티 에이전트/Workflow 방식은 기본값으로 사용하지 않는다.

**배경:** 지금까지의 모든 작업(문서 체계, Stitch 화면, Task List/상세, 감사 스크립트)이 단일 세션의 순차 실행으로 일관성 있게 이어져 왔다. Task 간 Expected Files가 겹치지 않도록 설계되어 있어(Skill 규칙 16, `TASKS/TASK_AUDIT_REPORT.md` 검사 6) 병렬 실행이 기술적으로 불가능하지는 않지만, 이 프로젝트 규모에서는 병렬화로 얻는 이득보다 조율 비용이 크다고 판단했다.

**대안(기각):** Workflow 도구로 Wave 내부 Task를 병렬 Agent에 분배 — 사용자가 명시적으로 멀티 에이전트 실행을 요청하기 전까지는 채택하지 않는다.

**영향 범위:** 향후 "지금 Wave의 Task를 구현해줘" 같은 지시는 Single Agent가 Task를 하나씩 완료하며 진행하는 것으로 해석한다. 사용자가 명시적으로 병렬/Workflow 실행을 요청하면 이 결정을 그 요청 범위에서만 예외로 둔다.

**근거 문서:** 세션 작업 이력(문서 체계~감사 스크립트까지 전부 단일 세션 순차 실행), `.claude/skills/traveler-project-pipeline/SKILL.md`.

---

## DEC-012 — PR·Merge는 사용자가 수동 수행

**결정:** Pull Request 생성과 Merge는 항상 **사용자가 수동으로** 수행한다. Agent가 자동으로 PR을 만들거나 병합하지 않는다.

**배경:** DEC-013(EC2·AWS 미사용)과 마찬가지로 무인 자동화 범위를 최소화하는 원칙의 연장이며, DEC-015(자동 Merge 관련)와도 직접 연결된다. 코드 변경의 최종 승인은 사람이 담당한다.

**대안(기각):** GitHub Actions로 테스트 통과 시 자동 PR 생성/병합 — 무인 자동 병합을 명시적으로 금지한 기존 결정(Skill 규칙 14, `docs/PROJECT_SCOPE.md` "무인 자동 Merge Runner" 제외)과 정면으로 상충해 기각.

**영향 범위:** `CI-PIPELINE`(`.github/workflows/ci.yml`)은 검증만 수행하고 Merge Queue/Auto-merge 설정을 포함하지 않는다(`TASKS/TASK_AUDIT_REPORT.md` 검사 16).

**근거 문서:** `docs/PROJECT_SCOPE.md`(무인 자동 Merge Runner 제외), `.claude/skills/traveler-project-pipeline/SKILL.md` 규칙 14, `docs/ARCHITECTURE.md` 10~11절.

---

## DEC-013 — EC2·AWS는 사용하지 않음

**결정:** 이 프로젝트는 AWS(EC2 포함) 인프라를 어떤 용도로도 사용하지 않는다. 컴퓨트/배포는 Vercel, 데이터/인증은 Supabase로만 구성한다.

**배경:** 최초 PROJECT_SCOPE 단계부터 일관되게 유지된 인프라 제약이다. 별도 서버 운영은 이 규모의 MVP에 불필요한 운영 부담을 추가한다.

**대안(기각):** 항공·숙소 외부 이동을 위한 프록시 서버를 EC2에 구성 — DEC-007(입력값 서버 미전송)로 인해 애초에 그런 서버가 필요하지 않아 기각.

**영향 범위:** `TASKS/00_TASK_LIST.md`/`TASKS/TASK-*.md` 전체의 Forbidden 절, `TASKS/TASK_AUDIT_REPORT.md` 검사 16.

**근거 문서:** `docs/PROJECT_SCOPE.md`, `docs/ARCHITECTURE.md` 11절.

---

## DEC-014 — 제외 기능은 EXCLUDED로 관리

**결정:** 구현하지 않기로 한 모든 Requirement(REQ-FUNC/REQ-NF)는 삭제하지 않고 **EXCLUDED** 상태로 추적표·Task List에 계속 보존한다. EXCLUDED 항목은 상세 구현 Task를 만들지 않되, 근거와 후속 방향을 함께 기록한다.

**배경:** 요구사항을 삭제하면 이후 왜 빠졌는지, 다시 필요해질 때 무엇을 검토해야 하는지 알 수 없게 된다. `docs/PROJECT_SCOPE.md`부터 `TASKS/00_TASK_LIST.md`의 NON_IMPLEMENTATION 표까지 이 원칙을 일관되게 적용했다.

**대안(기각):** 제외 항목을 문서에서 완전히 제거 — 요구사항 114건 전수 추적성을 깨뜨려 기각.

**영향 범위:** `docs/UIUX_TRACEABILITY.md`, `TASKS/00_TASK_LIST.md` NON_IMPLEMENTATION 표(37건), `TASKS/TASK_AUDIT_REPORT.md` 검사 17·18(전수 커버리지, EXCLUDED 구현 파일 미생성).

**근거 문서:** `docs/PROJECT_SCOPE.md`, `docs/UIUX_TRACEABILITY.md`, `TASKS/00_TASK_LIST.md`.

---

## 결정 요약표

| ID | 한 줄 요약 |
|---|---|
| DEC-001 | 개발 루트는 `traveler/app` |
| DEC-002 | Screen 5개(핵심 4·보조 1) |
| DEC-003 | `/travel-tools`에 항공·숙소·동행 작성 통합 |
| DEC-004 | 여행지·안전·대표는 정적 TS Data |
| DEC-005 | Supabase는 Auth+동행 기능 중심 |
| DEC-006 | DB 테이블 6개로 제한 |
| DEC-007 | 항공·숙소 입력은 Browser Memory만 |
| DEC-008 | Airbnb DESIGN.md는 vendor 참고, D-001이 정본 |
| DEC-009 | Playwright는 Chromium Smoke만 필수 |
| DEC-010 | 실행 단위는 Wave |
| DEC-011 | Single Agent가 Wave 내부 Task 순차 수행 |
| DEC-012 | PR·Merge는 사용자 수동 |
| DEC-013 | EC2·AWS 미사용 |
| DEC-014 | 제외 기능은 EXCLUDED로 보존 |
