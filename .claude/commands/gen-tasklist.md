---
description: Traveler 구현 Task List(TASKS/00_TASK_LIST.md)를 실제 정본 문서를 읽어 생성하거나 최신 상태로 갱신한다.
---

## 0. Skill 로드

`traveler-project-pipeline` Skill을 로드한다(아직 로드하지 않았다면). 이 Skill의 0절(정본 문서/산출물 경로), 1절(20개 핵심 규칙), 2절(Task ID 접두사), 3절(DB 6테이블), 4절(Screen 정본), 7절(개수 원칙), 8절(금지 항목)을 이번 작업의 규칙집으로 삼는다.

이 커맨드는 **구현 코드를 만들지 않는다.** 산출물은 `TASKS/00_TASK_LIST.md` 하나뿐이며, 컴포넌트/Server Action/스키마 등 실제 애플리케이션 코드는 작성하지 않는다.

## 1. 입력 검증 게이트

가장 먼저 실행한다:

```
python scripts/validate_inputs.py
```

- 종료 코드가 0이 아니면 **Task List를 생성/수정하지 않고 멈춘다.** 실패한 검사 항목을 그대로 사용자에게 보고하고, 어떤 입력 문서를 먼저 고쳐야 하는지 안내한다. 이 게이트 실패를 우회하거나 무시하지 않는다.
- 종료 코드가 0이면 계속 진행한다. 이 스크립트가 갱신한 `docs/tasks/_src_app_tree_snapshot.json`을 읽어 현재 `src/app` 실제 파일 트리를 확인한다(Skill 규칙 4) — 스냅샷을 확인하지 않고 Expected Files를 추정하지 않는다.

## 2. 실제 파일 읽기

요약하지 말고 아래 문서를 실제로 Read한다:

- `docs/06_SRS_UIUX_REVISED.md`
- `docs/PROJECT_SCOPE.md`
- `docs/UIUX_TRACEABILITY.md`(114개 Requirement의 Implementation Status·Screen·Route·Page Entry 정본)
- `design-reference/D-001/DESIGN.md`(특히 7~19절: 컴포넌트 스펙, Section 계약, Empty State 규칙)
- `design-reference/UI_CONTRACT.md`
- `design-reference/SCREEN_ROUTE_CONTRACT.json`
- `docs/ARCHITECTURE.md`(기술 경계 — 특히 Supabase 범위, DB 6테이블, ORM/AWS 미사용)
- `TASKS/00_TASK_LIST.md`가 **이미 존재하면 먼저 읽는다.** 처음부터 새로 쓰지 않고, 기존 Task ID·구조를 최대한 보존하면서 정본 문서와 어긋나는 부분만 갱신한다(예: 요구사항이 추가/변경되었거나 Screen 계약이 바뀐 경우).

## 3. Task 목록 설계

Skill 1·2·3·4절의 규칙을 그대로 적용해 Task 목록을 설계한다:

1. **Infra Task(`INFRA-<NAME>`)**: 디자인 토큰/Tailwind 설정, 공통 Header/Footer 레이아웃(`src/app/layout.tsx`), Supabase 클라이언트 설정, Supabase 마이그레이션(Skill 3절의 6개 테이블 + RLS), not-found/error 기술 Route, Playwright 프로젝트 설정(Chromium만), 연락처 탐지·외부 링크·인증 가드 등 Screen에 종속되지 않는 작업.
2. **Data Task(`DATA-<NAME>`)**: 여행지, 국가 안전정보, 대표 프로필 정적 데이터(`src/data/*`) — Skill 규칙 11.
3. **DB Task(`DB-<NAME>`)**: Schema/RLS/Access/Seed 4종 — Skill 규칙 10.
4. **API Task(`API-<NAME>`)**: Server Action/Route Handler — DB Task에 의존.
5. **Component Task(`COMP-SCR00X-<NAME>`)**: `UIUX_TRACEABILITY.md`에서 해당 Screen에 배치된 IMPLEMENT/IMPLEMENT(축소) Requirement들을 실제로 구현하는 단위. 하나의 Component Task가 여러 Requirement를 커버할 수 있다.
6. **Page Owner Task(`PAGE-SCR00X`)**: Screen당 정확히 1개, 그 Screen의 모든 Component Task(+필요한 Data/Infra Task)에 의존한다.
   - SCR-001 Owner: Next.js Starter 템플릿 제거 AC 포함(Skill 규칙 7).
   - SCR-003 Owner: 항공/숙소/동행 탭 Component 3개 모두에 의존(Skill 규칙 8).
   - SCR-005 Owner: Guest/Member/Admin Component 모두에 의존(Skill 규칙 9).
   - 모든 Owner: Functional AC에 `design-reference/D-001/DESIGN.md` 17절의 Section 순서·최소 콘텐츠 수를 그대로 옮기고(Skill 규칙 19), 빈 영역·Placeholder 금지 및 완성형 Empty State 요구를 명시한다(Skill 규칙 20).
7. **Unit/RLS Test Task(`UNIT-<NAME>`, `TEST-RLS-BASIC`)**: 날짜 검증, 연락처 탐지, 동행 상태 전이, RLS 기본 검증.
8. **E2E Test Task(`E2E-<NAME>`)**: Playwright **Chromium** Smoke Task만 만든다(Skill 규칙 13). Firefox/WebKit/부하테스트/시각적 회귀 Task는 만들지 않는다.
9. **CI/Release/Manual Task**: `CI-PIPELINE`, `RELEASE-<NAME>`(Vercel/Supabase 확인), `MANUAL-<NAME>-CHECK`(반응형/접근성 등 브라우저 수동 확인).

각 Task에 대해 결정한다: Task ID, Type/Category, Screen(SCR-00X 또는 COMMON), Title, Depends On(Task ID 목록), Requirement Refs(REQ-FUNC/REQ-NF ID 목록), Route/Page Entry/Expected Files, Functional/Visual/Security AC, Verify, Priority — `TASKS/00_TASK_LIST.md`의 16열 표 형식(Seq, Task ID, 제목, Category, Implementation Status, Requirement Ref, Screen, Route, Page Entry, Depends On, Expected Files, Functional AC, Visual AC, Security/Privacy AC, Verify, Priority)을 그대로 따른다.

**절대 만들지 않는 것**(Skill 8절): Firefox/WebKit Playwright Task, 부하/시각회귀 테스트 Task, EC2/AWS 프로비저닝 Task, GitHub Auto-merge/Merge Queue Task, 6개 허용 테이블을 크게 초과하는 신규 DB 테이블 Task, 항공·숙소 입력값을 서버/DB/URL로 전달하는 구현을 요구하는 Task, Prisma 등 ORM 도입 Task.

**EXCLUDED 처리**(Skill 규칙 16): `PROJECT_SCOPE.md`/`UIUX_TRACEABILITY.md`에서 EXCLUDED로 분류된 Requirement는 구현 Task를 만들지 않는다. 대신 `## NON_IMPLEMENTATION` 표에 전건 등록한다(Requirement, 근거, 후속 방향).

Task 개수는 45~65개 안팎이 자연스럽지만(Skill 7절) 이를 완료 조건으로 삼지 않는다.

## 4. `TASKS/00_TASK_LIST.md` 작성

Skill 0절이 정한 경로(`TASKS/00_TASK_LIST.md`)에 작성한다. 카테고리별로 여러 표로 나누어도 되며, 표마다 동일한 16개 열 순서를 지킨다. `Depends On`, `Requirement Ref`가 없으면 `-`로 채운다(빈 칸 금지). 모든 Task의 `Task Status`는 `NOT_STARTED`로 시작한다(아직 코드가 없으므로 다른 값을 쓰지 않는다). `## NON_IMPLEMENTATION` 표에는 EXCLUDED Requirement 전건(114건 중 EXCLUDED로 분류된 만큼)을 빠짐없이 기록한다.

## 5. 완료 후 확인

작성/갱신 후 스스로 점검한다(이 단계에서는 아직 상세 파일을 만들지 않으므로 `scripts/audit_tasks.py`는 실행하지 않는다 — 상세 생성 후 `/gen-task-details`가 자동 실행한다):

- Page Owner Task가 정확히 5개이고 SCR-001~005 각 1개인가
- Task ID 중복이 없는가
- IMPLEMENT 계열 Requirement가 모두 최소 1개 Task의 Requirement Ref에 등장하는가
- EXCLUDED Requirement가 모두 `## NON_IMPLEMENTATION` 표에 있는가

마지막으로 생성/변경된 Task 수, Page Owner 5개 여부, EXCLUDED 등록 건수를 사용자에게 간단히 보고한다.
