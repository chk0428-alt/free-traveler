# Free Traveler — Claude Code 프로젝트 규칙

이 파일은 이 저장소(`traveler/app`)에서 작업하는 모든 Claude Code 세션의 정본 규칙이다. 다른 Agent 규칙 파일(`AGENTS.md` 등)을 참조하지 않고, 필요한 규칙을 이 문서 안에 직접 기록한다. `AGENTS.md`는 `next dev`가 자동으로 재생성하는 파일이므로 삭제하지 않되, 이 저장소의 작업 규칙으로서 따르지는 않는다.

---

## Harness Marker

```
HARNESS_SCHEMA=traveler-screen-route-v1
DESIGN_PATH=design-reference/D-001/DESIGN.md
SCREEN_CONTRACT=design-reference/SCREEN_ROUTE_CONTRACT.json
PROJECT_SCOPE=docs/PROJECT_SCOPE.md
PLAYWRIGHT_ENABLED=true
PLAYWRIGHT_SCOPE=chromium-smoke
AUTO_MERGE=false
AWS_ENABLED=false
```

이 값들은 파이프라인·스크립트(`scripts/validate_inputs.py`, `scripts/audit_tasks.py`)와 동일한 값을 가져야 한다. 값이 달라지면 코드가 아니라 이 파일과 정본 문서를 먼저 맞춘다.

---

## 정본 문서

| 항목 | 경로 | 비고 |
|---|---|---|
| SRS 정본 | `docs/06_SRS_UIUX_REVISED.md` | 요구사항 원문은 `docs/02_SRS_BASELINE.md`, Route/Screen 구조는 이 문서가 갱신본 |
| Scope 분류 정본 | `docs/PROJECT_SCOPE.md` | REQ-FUNC-001~080, REQ-NF-001~034의 IMPLEMENT/IMPLEMENT(축소)/EXCLUDED |
| 디자인 정본 | `design-reference/D-001/DESIGN.md` | LOCKED, `design-reference/DESIGN_MANIFEST.md`로 상태 확인 |
| Screen 정본 | `design-reference/SCREEN_ROUTE_CONTRACT.json` | Screen 개수·Route·Page Entry의 유일한 정본 |
| 요구사항 추적표 | `docs/UIUX_TRACEABILITY.md` | 114개 Requirement × Screen/Route/Page Entry/Test |
| Task List | `TASKS/00_TASK_LIST.md` | 구현 Task 66개 + NON_IMPLEMENTATION(EXCLUDED) 표 |
| Task 상세 | `TASKS/TASK-<ID>.md` | Task List와 1:1 |
| Task 매니페스트/감사 | `TASKS/TASK_MANIFEST.csv`, `TASKS/TASK_AUDIT_REPORT.md` | `scripts/audit_tasks.py` 산출물 |
| 아키텍처 경계 | `docs/ARCHITECTURE.md` | 기술 스택·계층 경계 |
| 결정 기록 | `docs/DECISION_LOG.md` | DEC-001~014, 번복 없이 유지 |

---

## 필수 규칙

### 작업 시작 전

1. 작업 전 `package.json`과 현재 설치된 Next.js 버전의 문서(`node_modules/next/dist/docs/`)를 확인한다. 이 버전의 Next.js는 학습 데이터의 Next.js와 API·컨벤션이 다를 수 있으므로 기억에 의존해 코드를 쓰지 않는다.
2. SRS 정본은 `docs/06_SRS_UIUX_REVISED.md`다.
3. Scope 분류 정본은 `docs/PROJECT_SCOPE.md`다.
4. 디자인 정본은 `design-reference/D-001/DESIGN.md`다.
5. Screen 정본은 `design-reference/SCREEN_ROUTE_CONTRACT.json`이다.

### 개발 실행 단위

6. `/run-wave WXX`를 표준 개발 명령으로 사용한다. Wave는 `TASKS/00_TASK_LIST.md`의 Depends On 그래프를 위상 정렬해 묶은 Task 집합이다(`docs/DECISION_LOG.md` DEC-010).
7. Wave 내부 Task는 Depends On 순서로 **한 번에 하나만** 구현한다. 여러 Task를 동시에 시작하지 않는다(DEC-011).
8. 현재 진행 중인 Task의 **Expected Files 밖 파일은 수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 구현을 멈추고 범위를 재확인한다.

### 화면 조립 규칙

9. Page Owner Task는 자신의 Page Entry(`src/app/**/page.tsx`)에서 이미 만들어진 Component를 **실제로 조립**하는 것만 범위로 한다. Page Owner Task 안에서 새 Component를 만들지 않는다.
10. SCR-001(`src/app/page.tsx`) 완료 시 `create-next-app` 기본 Starter 콘텐츠(로고, "Get Started", Vercel 링크 등)를 전부 제거한다.
11. SCR-003(`/travel-tools`)은 항공·숙소·동행 구하기 3개 탭을 모두 실제로 조립한다. 하나라도 누락되면 완료로 보지 않는다.

### 데이터·보안 경계

12. 항공·숙소 입력값은 Server Action·DB·URL 쿼리 파라미터·서버 로그·분석 이벤트 어디로도 보내지 않는다. Client Component의 로컬 상태에만 유지한다.
13. Supabase 쓰기는 Auth(가입·로그인·성인확인), 동행(모집글·참가요청), 신고·차단, 관리자 외부 URL 설정 범위로 제한한다. 그 외 목적의 신규 쓰기 경로를 추가하지 않는다.
14. RLS를 우회하는 Client 코드를 작성하지 않는다(예: Service Role Key로 클라이언트 요청을 대신 처리하거나, RLS가 걸린 테이블을 관리자 API로 우회 조회하는 코드).
15. Service Role Key를 Client Component/브라우저에서 사용하지 않는다. 서버 전용 모듈에서만 참조하고 클라이언트 번들에 포함되지 않게 한다.
16. 여행지·안전정보·`free_traveler` 대표 소개는 `src/data/*.ts` 정적 데이터를 사용한다. 이 콘텐츠를 위한 DB 테이블이나 CMS를 추가하지 않는다.
17. Prisma 등 ORM, AWS, EC2를 추가하지 않는다. DB 접근은 `@supabase/supabase-js` 쿼리 빌더만 사용한다.

### 테스트

18. Playwright는 핵심 Smoke Test만 작성한다(Chromium 프로젝트 1개, `E2E-PUBLIC-SMOKE`/`E2E-TRAVEL-TOOLS`/`E2E-MATE-AUTH` 범위). Firefox/WebKit 프로젝트, 부하 테스트, 시각적 회귀 테스트를 추가하지 않는다.

### 범위·Git 안전

19. `docs/PROJECT_SCOPE.md`에서 EXCLUDED로 분류된 기능을 임의로 구현하지 않는다. 필요하다고 판단되면 먼저 사용자에게 확인한다.
20. `git reset --hard`, `git checkout --`, `git clean -f`, `git push --force` 등 destructive Git 명령을 임의로 사용하지 않는다. 꼭 필요하면 실행 전 `git status`로 확인하고 사용자에게 먼저 알린다.
21. 자동 PR 생성·자동 Merge를 실행하지 않는다. PR·Merge는 항상 사용자가 수동으로 수행한다(DEC-012).
22. 화면 단위 작업은 사람이 Preview(로컬 실행 또는 Vercel Preview)로 확인한 뒤에만 다음 화면 Wave로 진행한다. 확인 없이 다음 Wave를 임의로 시작하지 않는다.
23. 작업 완료 시 **변경한 파일 목록, 검증 결과(테스트/타입체크/Lint), 남은 제한사항**을 요약해 보고한다.

---

## Task 완료 순서

Wave 안의 Task 하나를 구현할 때 아래 순서를 따른다.

1. **Task 읽기** — `TASKS/TASK-<ID>.md`의 Context/AC/Forbidden을 전부 읽는다.
2. **입력 확인** — Depends On Task가 실제로 끝나 있는지, 관련 정본 문서(SRS/PROJECT_SCOPE/DESIGN/SCREEN_CONTRACT)와 현재 파일 트리를 확인한다.
3. **구현** — Expected Files 목록 안에서만 코드를 작성/수정한다.
4. **관련 포맷·Unit Test** — 관련 Lint/포맷을 맞추고, 해당 Task에 대응하는 Unit Test가 있으면 작성·실행한다.
5. **필요 시 Playwright** — Task가 E2E 대상이면 Chromium Smoke Test를 실행한다(18번 규칙 범위 내에서만).
6. **Diff 확인** — 변경 사항이 Expected Files 범위를 벗어나지 않았는지 diff로 재확인한다.
7. **완료 보고** — 변경 파일·검증 결과·남은 제한사항을 보고한다(23번 규칙).
