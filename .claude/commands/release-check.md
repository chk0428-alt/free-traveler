---
description: 릴리스 가능 여부를 7개 항목으로 점검해 RELEASE_READY 또는 RELEASE_BLOCKED를 판정한다. 무엇도 구현·수정하지 않는 순수 점검 커맨드다.
---

## 0. Skill 로드와 이 커맨드의 성격

`traveler-project-pipeline` Skill을 로드한다(아직 로드하지 않았다면). 이 커맨드는 **읽기 전용 점검**이다. 코드, Task 상태, WAVE_STATE, Git 어느 것도 수정하지 않는다(단, 이번 실행 결과를 남기는 `TASKS/RELEASE_CHECK_REPORT.md`는 갱신한다).

7개 항목을 **전부** 확인하고 **하나라도 불충족이면 전체 판정은 `RELEASE_BLOCKED`**다. 일부만 통과했다고 부분적으로 "거의 준비됨"처럼 보고하지 않는다 — 판정은 이 두 값 중 하나로만 내린다.

## 1. 0단계 게이트 — 구조 감사 먼저

가장 먼저 실행한다:

```
python scripts/audit_tasks.py
```

이 결과가 `AUDIT_FAIL`이나 `AUDIT_NO_ARTIFACTS`(종료 코드 1 또는 2)면, 7개 항목을 하나씩 점검할 필요도 없이 **즉시 `RELEASE_BLOCKED`**로 판정하고 실패한 감사 항목을 그대로 보고한 뒤 멈춘다. 구조가 틀어진 상태에서 릴리스 점검을 계속하지 않는다.

`AUDIT_PASS`면 아래 7개 항목을 순서대로 점검한다.

## 2. 검사 1 — Task·Wave 상태

`TASKS/00_TASK_LIST.md`를 실제로 Read해 모든 구현 Task 행의 `Task Status`가 `DONE`인지 확인한다.

`TASKS/WAVE_STATE.json`이 존재하면 함께 Read해 모든 Wave의 상태가 `DONE`인지(즉 `NOT_STARTED`/`IN_PROGRESS`/`BLOCKED`/`WAITING_FOR_PREVIEW`인 Wave가 하나도 없는지) 확인한다. `TASKS/WAVE_STATE.json`이 없으면 `TASKS/00_TASK_LIST.md`의 `Task Status` 열만으로 판단하되, "Wave 실행 기록이 없어 Task List 상태만으로 확인했다"고 보고에 명시한다.

`DONE`이 아닌 Task/Wave가 하나라도 있으면 이 검사는 **불충족**이며 목록을 남긴다.

## 3. 검사 2 — 5개 Page Owner DONE

`TASKS/00_TASK_LIST.md`에서 `PAGE-SCR001`, `PAGE-SCR002`, `PAGE-SCR003`, `PAGE-SCR004`, `PAGE-SCR005` 5개 행을 찾아 **모두** `Task Status = DONE`인지 확인한다. 2번 검사에 포함되는 내용이지만, Page Owner는 화면 자체의 완성 여부를 대표하므로 별도 항목으로 명시해 보고한다. 5개 중 하나라도 `DONE`이 아니면 불충족이며 어느 Screen이 남았는지 명시한다.

## 4. 검사 3 — CI PASS

1. `.github/workflows/ci.yml`이 실제로 존재하는지 확인한다. 없으면 불충족("CI 워크플로 자체가 없음").
2. `gh` CLI 사용 가능 여부를 확인한다(`gh --version`). 사용 가능하고 원격 저장소가 연결되어 있으면 기본 브랜치의 최신 워크플로 실행 상태를 조회한다(예: `gh run list --workflow=ci.yml --branch main --limit 1`). 최신 실행이 `success`가 아니면 불충족.
3. `gh`를 쓸 수 없거나 실행 이력을 조회할 수 없으면, **자동으로 통과 처리하지 않는다.** `TASKS/RELEASE_EVIDENCE.md`(있다면)에서 CI 통과를 사람이 수동 기록한 항목을 찾는다. 그런 기록도 없으면 이 검사는 **불충족**이며 "CI 최신 실행 결과를 확인할 수 없음 — 수동 확인 후 `TASKS/RELEASE_EVIDENCE.md`에 기록 필요"로 보고한다.

## 5. 검사 4 — Playwright Smoke PASS

`TASKS/00_TASK_LIST.md`에서 `INFRA-PLAYWRIGHT-CONFIG`, `E2E-PUBLIC-SMOKE`, `E2E-TRAVEL-TOOLS`, `E2E-MATE-AUTH` 4개 Task가 모두 `DONE`인지 확인한다.

이 4개 Task는 `TASK-CI-PIPELINE.md`의 Depends On에 포함되어 CI 안에서 함께 실행되도록 설계되어 있다(`TASKS/TASK-CI-PIPELINE.md` 참고). 따라서 4번 검사(CI PASS)가 통과했다면 Playwright Smoke도 그 실행에 포함되어 통과한 것으로 간주할 수 있다 — 단, CI 워크플로 파일(`.github/workflows/ci.yml`)을 열어 실제로 Playwright 실행 스텝이 포함되어 있는지 확인한 뒤에만 그렇게 간주한다. 포함되어 있지 않거나 확인할 수 없으면, CI와 별개로 Playwright 실행 결과를 따로 확인해야 하며 찾지 못하면 불충족으로 보고한다.

## 6. 검사 5 — Supabase 6개 Table·기본 RLS 확인 기록

1. `TASKS/00_TASK_LIST.md`에서 `DB-SCHEMA-BASE`, `DB-RLS-BASE`, `DB-ACCESS`, `DB-SEED-BASE`, `TEST-RLS-BASIC` 5개 Task가 모두 `DONE`인지 확인한다(코드/마이그레이션이 만들어졌다는 근거).
2. `TASKS/RELEASE_EVIDENCE.md`에서 "Supabase RLS 확인" 기록을 찾는다 — 실제 Supabase 프로젝트에서 `user_profile`/`mate_post`/`mate_application`/`user_block`/`report`/`outbound_link_setting` 6개 테이블이 존재하고, 각 테이블에 `design-reference` 기준 RLS 정책(간단한 본인/작성자 조건)이 실제로 걸려 있음을 사람이 확인한 날짜·확인자·근거가 적힌 기록이어야 한다.
3. 1과 2가 모두 있어야 통과다. 코드가 존재한다는 사실만으로는(즉 1만으로는) 통과시키지 않는다 — **실제 Supabase 프로젝트에 반영되어 확인된 기록**이 따로 필요하다. 기록이 없으면 불충족이며 "Supabase 콘솔에서 6개 테이블·RLS를 확인하고 `TASKS/RELEASE_EVIDENCE.md`에 기록 필요"로 보고한다.

## 7. 검사 6 — Vercel Preview Checkpoint

1. `TASKS/WAVE_PLAN.md`가 있으면 `Preview Checkpoint: yes`로 표시된 모든 Wave를 찾는다.
2. 각 Wave가 `TASKS/WAVE_STATE.json`에서 `WAITING_FOR_PREVIEW`에 머물러 있지 않고 사람 확인을 거쳐 `DONE`으로 넘어갔는지 확인한다.
3. `TASKS/WAVE_PLAN.md`/`TASKS/WAVE_STATE.json`이 아직 없으면, 최소한 `RELEASE-VERCEL-SUPABASE-CHECK` Task(`TASKS/00_TASK_LIST.md`)가 `DONE`인지와 `TASKS/RELEASE_EVIDENCE.md`에 "Vercel Preview Checkpoint" 기록(Preview URL, 확인한 Screen, 확인일, 확인자)이 5개 Screen 전부에 대해 있는지 확인한다.
4. `WAITING_FOR_PREVIEW`로 남아있는 Wave가 있거나 위 기록이 5개 Screen 중 일부라도 없으면 불충족이며 어느 Screen의 Preview 확인이 비어 있는지 명시한다.

## 8. 검사 7 — EXCLUDED 목록

`TASKS/00_TASK_LIST.md`의 `## NON_IMPLEMENTATION` 표를 실제로 Read하고, `docs/PROJECT_SCOPE.md`의 EXCLUDED 항목과 개수·ID가 일치하는지 확인한다(1단계 게이트의 `scripts/audit_tasks.py` 검사 17·18이 이미 이 내용을 확인했으므로, 여기서는 그 결과를 재인용하고 표의 항목 수를 다시 한번 명시적으로 보고한다). EXCLUDED 항목이 삭제되었거나, EXCLUDED로 분류된 Requirement를 구현한 Task가 발견되면(감사 검사 18 위반) 불충족이다.

## 9. 판정

7개 검사가 **전부** 충족되어야 `RELEASE_READY`다. 하나라도 불충족이면 `RELEASE_BLOCKED`다.

## 10. `TASKS/RELEASE_CHECK_REPORT.md` 작성

매 실행마다 아래 형식으로 갱신한다(기존 파일이 있으면 덮어쓴다):

```markdown
# Release Check Report

**실행일:** <ISO 날짜>
**판정:** RELEASE_READY | RELEASE_BLOCKED

| # | 검사 항목 | 결과 | 근거 |
|---|---|---|---|
| 0 | 구조 감사(scripts/audit_tasks.py) | PASS/FAIL | ... |
| 1 | Task·Wave 상태 | PASS/FAIL | ... |
| 2 | 5개 Page Owner DONE | PASS/FAIL | ... |
| 3 | CI PASS | PASS/FAIL | ... |
| 4 | Playwright Smoke PASS | PASS/FAIL | ... |
| 5 | Supabase 6개 Table·기본 RLS 확인 기록 | PASS/FAIL | ... |
| 6 | Vercel Preview Checkpoint | PASS/FAIL | ... |
| 7 | EXCLUDED 목록 | PASS/FAIL | ... |
```

## 11. 보고

콘솔에도 위 표와 최종 판정(`RELEASE_READY` 또는 `RELEASE_BLOCKED`)을 그대로 보고한다. `RELEASE_BLOCKED`면 어떤 항목이 왜 막혔는지, 무엇을 하면(어떤 Wave를 실행하고, 어디에 어떤 기록을 남기면) 다음 점검에서 통과할 수 있는지까지 함께 안내한다. 이 커맨드는 부족한 부분을 스스로 구현하거나 대신 기록을 남기지 않는다 — 점검과 보고만 한다.
