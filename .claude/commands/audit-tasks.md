---
description: TASKS/00_TASK_LIST.md와 TASKS/TASK-*.md를 scripts/audit_tasks.py의 18개 규칙으로 재검사하고 결과를 있는 그대로 보고한다.
---

## 0. Skill 로드

`traveler-project-pipeline` Skill을 로드한다(아직 로드하지 않았다면). 이 커맨드는 `/gen-task-details`가 끝날 때 자동 실행되는 감사를 **언제든 단독으로 다시 실행**하고 싶을 때 쓴다(예: `TASKS/00_TASK_LIST.md`나 `TASKS/TASK-*.md`를 수동으로 고친 뒤 재확인).

이 커맨드는 **구현 코드를 만들지 않는다.** 어떤 애플리케이션 코드도 작성·수정하지 않으며, 순수하게 기존 Task 산출물을 정적으로 검사만 한다.

## 1. 실제 파일 확인 후 감사 실행

먼저 `TASKS/00_TASK_LIST.md` 존재 여부와 `TASKS/TASK-*.md` 개수를 실제로 확인한다(추정하지 않는다). 그 다음 실행한다:

```
python scripts/audit_tasks.py
```

이 스크립트는 Skill 6절의 18개 항목(1:1 대응, 중복 ID, Depends On 누락, Dependency Cycle, Screen당 Page Owner 1개, Route/Page Entry/Expected Files 일치, Component-only Screen, SCR-001 Starter 제거, SCR-003 3탭, SCR-005 역할별 조립, DB 4종 Task, DB 6테이블 범위, 외부 입력 비저장, Auth·성인·RLS AC, Playwright Chromium, AWS/EC2/자동 Merge 미포함, REQ-FUNC/REQ-NF 114건 커버리지, EXCLUDED 미구현)를 검사하고, 실행할 때마다 `TASKS/TASK_MANIFEST.csv`와 `TASKS/TASK_AUDIT_REPORT.md`를 갱신한다.

## 2. 결과 보고 — 실패를 무시하지 않는다

종료 코드에 따라 다음과 같이 보고한다. **어떤 경우에도 실패(1)나 NO_ARTIFACTS(2)를 성공/완료로 포장해 보고하지 않는다.**

- **0 (AUDIT_PASS)**: "AUDIT_PASS"와 함께 총 검사 수(18), Task 수, Page Owner 5개 확인, EXCLUDED 등록 건수 등 핵심 지표를 `TASKS/TASK_AUDIT_REPORT.md` 내용을 근거로 요약한다.
- **1 (AUDIT_FAIL)**: 실패한 검사 항목을 `TASKS/TASK_AUDIT_REPORT.md`의 "실패 항목 상세" 절 내용 그대로(요약해서 뭉개지 말고) 나열한다. 각 실패 항목이 Skill의 몇 번 규칙·몇 번 검사에 해당하는지 함께 표시한다. 이 커맨드는 위반 사항을 **보고만** 하며 자동으로 코드를 고치지 않는다. 수정은 `/gen-tasklist` 또는 `/gen-task-details`를 다시 실행하거나, 사용자가 직접 지시할 때만 진행한다.
- **2 (NO_ARTIFACTS)**: `TASKS/00_TASK_LIST.md`가 없다는 뜻이다. `/gen-tasklist`를 먼저 실행하라고 안내한다.

## 3. 참고

- 이 스크립트는 파일을 수정하지 않는다(`TASKS/TASK_MANIFEST.csv`, `TASKS/TASK_AUDIT_REPORT.md` 갱신 제외). 순수 검사 도구다.
- Task 개수는 정보로만 보고하며 합격/불합격 기준으로 쓰지 않는다(Skill 7절).
- `docs/UIUX_TRACEABILITY.md`와 `docs/PROJECT_SCOPE.md`를 정본으로 삼아 114개 Requirement 커버리지를 검사하므로, 두 문서가 바뀌었다면 재실행 전에 최신 상태인지 먼저 확인한다.
