---
description: Wave 단위로 여러 Task를 prepare-task→implement-task 순서로 연속 실행한다. 자동 Branch·PR·Merge는 절대 포함하지 않는다.
argument-hint: "W03 | status | resume | dry-run W03"
---

## 0. Skill 로드와 이 커맨드의 위치

`traveler-project-pipeline` Skill을 로드한다(아직 로드하지 않았다면). 이 커맨드는 `/implement-task`를 Wave 단위로 반복 호출하는 **오케스트레이터**다. 실제 코드 작성은 내부적으로 `/implement-task` 규칙을 따를 때만 발생하며, 그 규칙(Expected Files 범위, AC 준수, Unit Test/Playwright 조건부 실행, Commit 기본 비활성 등)을 그대로 상속한다.

**자동 Branch 생성, 자동 PR 생성, 자동 Merge는 이 커맨드의 어떤 하위 동작에도 포함하지 않는다.** Git 상태를 바꾸는 유일한 경우는 `/implement-task`가 "사용자가 명시적으로 요청한 Task 단위 Commit"을 수행할 때뿐이며, 이 경우에도 Push/PR/Merge는 하지 않는다.

## 1. 인자 해석

| 인자 | 동작 |
|---|---|
| `<WAVE_ID>`(예: `W03`) | 2~8절의 순서로 해당 Wave를 실행한다 |
| `status` | 9절: 아무것도 실행하지 않고 현재 Wave/Task 상태만 보고한다 |
| `resume` | 10절: 중단된 지점(마지막 `IN_PROGRESS`/`BLOCKED`/`WAITING_FOR_PREVIEW` Wave)부터 이어간다 |
| `dry-run <WAVE_ID>` | 11절: 아무것도 구현/기록하지 않고 이번 실행에서 무엇을 할지만 미리 보여준다 |

인자가 없거나 위 네 형태에 맞지 않으면 사용법을 안내하고 멈춘다.

## 2. WAVE_PLAN과 WAVE_STATE 읽기

먼저 아래 두 파일을 **실제로 Read**한다.

- **`TASKS/WAVE_PLAN.md`** — Wave 구성 정본. 각 Wave(`W01`, `W02`, ...)가 어떤 Task ID들로 구성되는지, 그리고 그 Wave가 끝난 뒤 **사람 Preview Checkpoint**가 필요한지(보통 하나의 Screen에 대응하는 Page Owner Wave)를 담는다. 형식 예시:

  ```markdown
  ## W03
  - Tasks: COMP-SCR001-HERO-SEARCH, COMP-SCR001-CARDGRID, COMP-SCR001-DETAIL-DRAWER, COMP-SCR001-SAFETY-TAB, COMP-SCR001-MATE-PREVIEW, COMP-SCR001-FOUNDER-SUMMARY, PAGE-SCR001
  - Preview Checkpoint: yes (SCR-001 `/`)
  ```

- **`TASKS/WAVE_STATE.json`** — 실행 상태 정본. Wave별/Task별 현재 상태를 기록한다. 형식 예시:

  ```json
  {
    "harness_schema": "traveler-screen-route-v1",
    "current_wave": "W03",
    "waves": {
      "W03": {
        "status": "IN_PROGRESS",
        "preview_checkpoint": true,
        "tasks": {
          "COMP-SCR001-HERO-SEARCH": "DONE",
          "COMP-SCR001-CARDGRID": "READY_TO_IMPLEMENT",
          "PAGE-SCR001": "NOT_STARTED"
        }
      }
    },
    "updated_at": "2026-09-17T00:00:00+09:00"
  }
  ```

**둘 중 하나라도 없으면(`W03` 실행/`resume`/`dry-run`의 경우) 아무것도 구현하지 않고 멈춘다.** `TASKS/WAVE_PLAN.md`가 없으면 "Wave 계획이 아직 없다"고 보고하고, Wave 구성은 `docs/DECISION_LOG.md` DEC-010(Depends On 그래프를 위상 정렬해 Wave로 묶는다)을 따라 먼저 만들어야 한다고 안내한다. `TASKS/WAVE_STATE.json`만 없고 `TASKS/WAVE_PLAN.md`는 있으면, `TASKS/00_TASK_LIST.md`의 현재 `Task Status` 열 값으로 `TASKS/WAVE_STATE.json`을 새로 초기화한 뒤 계속 진행한다(빈 상태를 그때그때 지어내지 않고, 실제 Task List 상태에서 부트스트랩한다).

`<WAVE_ID>`가 `TASKS/WAVE_PLAN.md`에 없으면 존재하는 Wave 목록을 보여주고 멈춘다.

## 3. 현재 Wave의 READY Task 선택 — Depends On 순서로 1개

해당 Wave에 속한 Task 중, **이미 DONE이 아니고** Depends On이 전부 DONE(Wave 안이든 밖이든)인 Task를 `TASKS/00_TASK_LIST.md`의 `Seq` 순서로 정렬해 그중 **가장 앞선 것 하나**를 고른다.

- Wave 안에 아직 Depends On이 끝나지 않은 Task만 남아있다면(즉 지금 고를 수 있는 Task가 없다면), Wave 상태를 `BLOCKED`로 표시하고 어떤 선행 Task가 부족한지 보고한 뒤 멈춘다. 다른 Wave의 Task를 대신 끌어와 처리하지 않는다.

## 4. `prepare-task` 규칙으로 검사한다

선택한 Task 하나에 대해 다음을 확인한다(이 저장소에 `/prepare-task` 커맨드가 별도로 존재하면 그 규칙을 그대로 따르고, 아직 없다면 아래 최소 검사를 직접 수행한다):

1. `TASKS/TASK-<ID>.md` 상세 파일이 실제로 존재하고 14개 필수 절을 갖추고 있는가.
2. Depends On에 열거된 모든 Task가 `DONE`인가.
3. Expected Files 목록의 파일들이 **다른 진행 중(IN_PROGRESS) Task**의 Expected Files와 겹치지 않는가(동시에 같은 파일을 건드리는 Task가 없어야 한다).
4. 위 조건을 모두 만족하면 `TASKS/WAVE_STATE.json`에서 이 Task 상태를 `READY_TO_IMPLEMENT`로 갱신한다.

하나라도 만족하지 않으면 해당 Task 상태를 `BLOCKED`로 표시하고, Wave 상태도 `BLOCKED`로 바꾼 뒤 사유를 보고하고 멈춘다(다른 Task로 건너뛰지 않는다 — 3절의 Depends On 순서를 존중한다).

## 5. `implement-task` 규칙으로 Task 하나를 구현한다

Task 상태를 `IN_PROGRESS`로 표시한 뒤, `/implement-task <ID>`를 실행하는 것과 동일하게 `.claude/commands/implement-task.md`의 1~9절 규칙을 그대로 따른다(Expected Files 범위 준수, Functional/Visual/Security AC 충족, Page Owner 조립 규칙, 관련 Unit Test 실행, Page Owner/E2E일 때만 Playwright, 금지 사항, 기본 Commit 없음).

## 6. 검증 결과에 따라 Task 상태를 DONE으로 갱신한다

- 관련 검증(Unit Test/타입체크/Lint, 해당 시 Playwright)이 **전부 PASS**하면 `TASKS/WAVE_STATE.json`과 `TASKS/00_TASK_LIST.md`의 이 Task 상태를 `DONE`으로 갱신한다.
- 하나라도 실패하면 Task 상태를 `FAILED`로, Wave 상태를 `BLOCKED`로 표시하고 **다음 Task로 넘어가지 않고 즉시 멈춘 뒤** 실패 내용을 보고한다. 실패를 무시하거나 임의로 완료 처리하지 않는다.

## 7. 같은 Wave의 다음 READY Task를 계속 처리한다

6절에서 `DONE`으로 갱신되었으면 3절로 돌아가 같은 Wave 안에서 다음 Task를 고른다. 이 루프를 Wave의 모든 Task가 `DONE`이 되거나, 실패/차단으로 멈출 때까지 반복한다. 한 번의 `/run-wave <WAVE_ID>` 실행 안에서 **다른 Wave로 넘어가지 않는다.**

## 8. Wave 종료 처리

- Wave의 모든 Task가 `DONE`이고 **Preview Checkpoint가 없는 Wave**면, Wave 상태를 `DONE`으로 표시하고 종료한다.
- Wave의 모든 Task가 `DONE`이지만 **Preview Checkpoint가 있는 Wave**(`TASKS/WAVE_PLAN.md`에 `Preview Checkpoint: yes`로 표시된 경우, 보통 하나의 Screen이 완성되는 Wave)면, Wave 상태를 `DONE`이 아니라 **`WAITING_FOR_PREVIEW`**로 표시하고 종료한다. 사람이 로컬 실행 또는 Vercel Preview로 해당 화면을 확인하기 전까지 다음 Wave는 자동으로 시작하지 않는다(`CLAUDE.md` 22번 규칙, `docs/DECISION_LOG.md` DEC-010).

## 9. `/run-wave status`

아무것도 구현·수정하지 않는다. `TASKS/WAVE_STATE.json`(없으면 `TASKS/WAVE_PLAN.md` + `TASKS/00_TASK_LIST.md`)을 Read해 다음을 표로 보고한다: 전체 Wave 목록과 각 상태(`NOT_STARTED`/`IN_PROGRESS`/`DONE`/`WAITING_FOR_PREVIEW`/`BLOCKED`), 현재 진행 중이거나 막힌 Wave가 있다면 그 안의 Task별 상태.

## 10. `/run-wave resume`

`TASKS/WAVE_STATE.json`에서 상태가 `IN_PROGRESS`, `BLOCKED`, 또는 `WAITING_FOR_PREVIEW`인 Wave를 찾는다.

- 그런 Wave가 없으면(모든 Wave가 `DONE`이거나 아직 아무것도 시작 안 함) 그 사실을 보고하고, 다음으로 시작 가능한 Wave가 있으면 후보를 안내한 뒤 멈춘다(자동으로 그 Wave를 시작하지 않는다 — 시작은 항상 `/run-wave <WAVE_ID>`로 명시적으로 한다).
- 상태가 `IN_PROGRESS`나 `BLOCKED`면 해당 Wave에 대해 2절부터(WAVE_PLAN/STATE 재확인 포함) 다시 진행한다.
- 상태가 `WAITING_FOR_PREVIEW`면 **다음 Wave로 자동으로 넘어가지 않는다.** 사람이 Preview를 확인했는지 먼저 되묻고, 확인했다는 응답을 받은 뒤에만 다음 Wave를 무엇으로 시작할지 안내한다(시작 자체는 별도로 `/run-wave <다음 WAVE_ID>`를 호출해야 한다).

## 11. `/run-wave dry-run <WAVE_ID>`

**아무 파일도 쓰지 않고 아무 코드도 구현하지 않는다.** 2절처럼 WAVE_PLAN/WAVE_STATE를 Read하고, 3~4절의 선택·검사 로직을 그대로 계산만 해서 다음을 보여준다: 이 Wave에서 실행될 Task들의 예상 순서, 각 Task가 지금 시점에 `READY_TO_IMPLEMENT`가 될 수 있는지(안 되면 어떤 Depends On/파일 충돌 때문인지), Wave 종료 시 `DONE`으로 끝날지 `WAITING_FOR_PREVIEW`로 끝날지. `TASKS/WAVE_STATE.json`, `TASKS/00_TASK_LIST.md`, 애플리케이션 코드 중 어느 것도 수정하지 않는다.

## 12. 보고

`W03` 실행이든 `resume`이든, 종료 시 다음을 보고한다: 이번 실행에서 `DONE`이 된 Task 목록, 최종 Wave 상태(`DONE`/`WAITING_FOR_PREVIEW`/`BLOCKED`), 각 Task의 `/implement-task` 완료 보고(변경 파일·검증 결과·남은 제약)를 모은 요약, Commit을 수행했다면 그 목록. `BLOCKED`나 검증 실패로 멈췄다면 그 사실을 성공처럼 포장하지 않고 정확히 보고한다.
