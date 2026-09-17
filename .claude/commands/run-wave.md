---
description: Wave 하나를 대상으로 pending Task를 prepare→implement 순서로 한 개씩 실행한다. --status/--dry-run/--resume 옵션을 지원하며 자동 Branch·PR·Merge는 절대 포함하지 않는다.
argument-hint: "<WAVE_ID> [--dry-run|--resume|--status]"
---

## 0. Skill 로드와 이 커맨드의 위치

`traveler-project-pipeline` Skill을 로드한다(아직 로드하지 않았다면). 이 커맨드는 `.claude/commands/implement-task.md`를 Wave 단위로 반복 호출하는 **오케스트레이터**다. 실제 코드 작성은 내부적으로 `implement-task.md`의 규칙을 따를 때만 발생하며, 그 규칙(Expected Files 범위, AC 준수, 관련 검증 실행, 기본 Commit 비활성 등)을 그대로 상속한다.

이 커맨드가 읽는 Wave 구성·상태 파일(`TASKS/WAVE_PLAN.md`, `TASKS/WAVE_STATE.json`)은 `scripts/build_waves.py`가 생성한 것이 정본이다. 이 커맨드는 그 두 파일의 **Wave 구성**(`task_ids`, `checkpoint_required`)은 신뢰하고 절대 재배치하지 않으며, **실행 상태**(아래 9절에서 설명하는 `status`, `tasks`, `blocked_reason`, `checkpoint_result`)만 갱신한다.

## 1. 입력과 옵션

| 형태 | 동작 |
|---|---|
| `/run-wave <WAVE_ID>` | 기본 동작(5절) — 해당 Wave의 pending Task를 한 개씩 prepare→implement한다 |
| `/run-wave <WAVE_ID> --status` | 3절 — 아무것도 실행·수정하지 않고 현재 Wave/Task 상태만 보고한다 |
| `/run-wave <WAVE_ID> --dry-run` | 4절 — 아무것도 수정하지 않고 이번에 실행될 Task·파일·검증·Checkpoint만 미리 보여준다 |
| `/run-wave <WAVE_ID> --resume` | 6절 — 그 Wave의 첫 `pending` 또는 `blocked` Task부터 다시 시작한다 |

**`<WAVE_ID>`는 네 형태 모두에서 필수 입력이다.** WAVE_ID가 없거나 `--dry-run`/`--resume`/`--status` 중 두 개 이상이 동시에 주어지면 사용법을 안내하고 멈춘다(아무것도 실행하지 않는다).

## 2. WAVE_PLAN과 WAVE_STATE 읽기 — 모든 형태 공통

먼저 아래 두 파일을 **실제로 Read**한다.

- **`TASKS/WAVE_PLAN.md`** — Wave 구성 정본(`scripts/build_waves.py` 산출물). 각 `## W<NN>` 절이 `Group`, `Tasks:`(소속 Task ID 목록, 실행 순서 아님 — 5절 참고), `Preview Checkpoint: yes|no`를 담는다.
- **`TASKS/WAVE_STATE.json`** — 실행 상태 정본. `scripts/build_waves.py`가 만드는 최소 스키마는 다음과 같다.

  ```json
  {
    "schema_version": "traveler-screen-route-v1",
    "generated_at": "2026-09-17T11:25:59+00:00",
    "waves": [
      {
        "wave_id": "W06",
        "title": "SCR-001 메인 Component와 Page Owner (2/2)",
        "task_ids": ["PAGE-SCR001"],
        "status": "pending",
        "checkpoint_required": true,
        "checkpoint_result": null
      }
    ]
  }
  ```

  이 커맨드는 이 스키마에 **Wave당 두 필드를 추가로 관리**한다(둘 다 처음에는 없으므로 그 Wave를 처음 만질 때 아래처럼 만든다 — 지어내지 않고 `task_ids`에서 그대로 초기화한다):
  - `tasks`: `{ "<TASK_ID>": "pending" | "in_progress" | "blocked" | "completed" }` — 그 Wave의 `task_ids` 각각에 대응. 처음 만들 때는 전부 `"pending"`.
  - `blocked_reason`: Wave `status`가 `"blocked"`일 때만 존재하는 문자열(어떤 Task가 왜 막혔는지).

  **주의(알려진 상호작용):** `scripts/build_waves.py`를 나중에 다시 실행하면 `TASKS/WAVE_STATE.json`을 처음부터 재생성하면서 이 두 필드(`tasks`, `blocked_reason`)와 지금까지의 `status`/`checkpoint_result` 값을 전부 지운다. Wave 실행 중에는 `build_waves.py`를 다시 실행하지 않는다 — Task 구성 자체를 바꿔야 한다면 먼저 이 커맨드로 진행 상황을 사람이 기록해 둔 뒤에 진행한다.

**둘 중 하나라도 없으면 아무것도 하지 않고 멈춘다.** `TASKS/WAVE_PLAN.md`가 없으면 "Wave 계획이 아직 없다, 먼저 `python scripts/build_waves.py`를 실행한다"고 안내한다. `<WAVE_ID>`가 `TASKS/WAVE_PLAN.md`에 없으면 존재하는 Wave ID 목록을 보여주고 멈춘다.

### 규칙 1 — 이전 Wave가 completed가 아니면 시작하지 않는다

`TASKS/WAVE_PLAN.md`에 나열된 순서 기준으로 `<WAVE_ID>` **바로 앞** Wave(없으면 이 검사를 건너뜀 — 첫 Wave)의 `status`가 `"completed"`가 아니면, `--status`/`--dry-run`으로는 상태를 보여주되(멈추지 않음), 기본 실행과 `--resume`은 **즉시 멈추고** 어떤 이전 Wave가 아직 끝나지 않았는지, 그 Wave의 현재 `status`가 무엇인지 보고한다. 이전 Wave를 대신 실행하지 않는다.

## 3. `--status`

아무것도 구현·수정하지 않는다. `<WAVE_ID>`의 현재 `status`, `checkpoint_required`/`checkpoint_result`, 그리고 `tasks`가 있으면 Task별 상태 표를 그대로 보고한다(`tasks`가 아직 없으면 "아직 시작 전 — 전체 task_ids가 암묵적으로 pending"이라고 명시한다). 직전 Wave의 `status`도 함께 보여줘 규칙 1 통과 여부를 알 수 있게 한다.

## 4. `--dry-run`

**아무 파일도 쓰지 않고 아무 코드도 구현하지 않는다.** 2절처럼 읽기만 하고, 5절의 선택·검사 로직을 그대로 계산만 해서 다음을 보여준다:

- 규칙 1(이전 Wave completed 여부) 통과 여부.
- 이 Wave에서 실행될 Task들의 예상 순서(Depends On이 모두 충족된 상태를 기준으로 Seq 순 시뮬레이션).
- 각 Task의 `TASKS/TASK-<ID>.md`에서 가져온 Expected Files 목록과 Verify 목록(어떤 검증이 실행될지 미리 보여준다).
- `checkpoint_required`가 `true`면 어떤 Browser Checkpoint가 필요한지(7절 참고).
- 지금 시점에 Depends On 미충족·Expected Files 충돌로 곧바로 `blocked`가 될 Task가 있는지.

`TASKS/WAVE_STATE.json`, `TASKS/00_TASK_LIST.md`, 애플리케이션 코드 중 어느 것도 수정하지 않는다.

## 5. 기본 동작 — pending Task를 한 개씩 prepare→implement

규칙 1을 통과했다면(2절), 아래를 반복한다.

### 5-1. Task 선택

`<WAVE_ID>`의 `tasks`(없으면 위 2절대로 `task_ids`에서 전부 `"pending"`으로 새로 만든다) 중 상태가 `"pending"`이고 Depends On이 전부 `"completed"`(Wave 안이든 밖이든, `TASKS/TASK_MANIFEST.csv`의 Depends On 기준)인 Task를 `TASKS/00_TASK_LIST.md`의 `Seq` 순으로 정렬해 **가장 앞선 것 하나만** 고른다.

- 남은 Task가 없고 전부 `"completed"`면 8절(Wave 종료 처리)로 간다.
- 남은 `"pending"` Task는 있는데 그중 어느 것도 Depends On을 만족하지 못하면(선행 Task가 아직 `completed`가 아니면), 규칙 2에 따라 그 Task를 `"blocked"`로, Wave `status`를 `"blocked"`로 표시하고(`blocked_reason`에 어떤 선행 Task가 부족한지 기록) 멈춘다. 다른 Wave의 Task를 대신 끌어오지 않는다.

### 5-2. prepare — Task 하나를 검사한다

선택한 Task에 대해 다음을 확인한다(`.claude/commands/`에 별도 `prepare-task.md`가 생기면 그 규칙을 우선하고, 없으면 이 최소 검사를 직접 수행한다):

1. `TASKS/TASK-<ID>.md`가 실제로 존재하고 14개 필수 절을 갖추고 있는가.
2. Depends On에 열거된 모든 Task가 `"completed"`인가(이미 5-1에서 확인했지만 재확인).
3. Expected Files 목록의 파일이 같은 시점에 **다른 `"in_progress"` Task**의 Expected Files와 겹치지 않는가.

하나라도 만족하지 않으면 그 Task를 `"blocked"`로, Wave도 `"blocked"`로 표시하고(규칙 2) `blocked_reason`에 사유를 적은 뒤 멈춘다.

### 5-3. implement — Task 하나를 구현한다

Task 상태를 `"in_progress"`로 표시한 뒤, `/implement-task <ID>`와 동일하게 `.claude/commands/implement-task.md`의 규칙을 그대로 따른다(Expected Files 범위 준수, Functional/Visual/Security AC 충족, Page Owner 조립 규칙, 금지 사항, 기본 Commit 없음).

### 5-4. 검증 — Task마다 지정된 최소 검증을 실행한다(규칙 3)

`TASKS/TASK-<ID>.md`의 **Verify** 절(예: `UNIT-TRAVEL-DATES`, `TEST-RLS-BASIC`, `E2E-PUBLIC-SMOKE`, `코드리뷰`)에 열거된 항목을 실행한다.

- 이미 구현되어 있는 Unit/RLS/E2E Test Task면 그것을 실행한다(`npm run test:unit`, `npm run task:contract`, `npm run test:e2e[:public]` 등 이미 등록된 `package.json` Script를 우선 사용한다).
- 아직 그 Verify Task 자체가 구현 전이면(테스트 파일이 없으면) 건너뛰고 종료 보고의 "남은 수동 Browser 확인" 또는 검증 목록에 "미실행 — 사유"로 남긴다. 없는 검증을 지어내거나 이 Task 범위에서 대신 작성하지 않는다.
- `타입 체크`(`npm run typecheck`)와 `Lint`(`npm run lint`)는 Category와 무관하게 항상 실행한다.

### 5-5. 결과 반영

- 지정된 검증이 **전부 PASS**하면 Task 상태를 `"completed"`로 갱신하고 5-1로 돌아가 같은 Wave의 다음 Task를 고른다.
- 하나라도 실패하면 Task 상태를 `"blocked"`로, Wave `status`도 `"blocked"`로 표시하고(규칙 2) `blocked_reason`에 실패한 검증과 원인을 적은 뒤 **다음 Task로 넘어가지 않고 즉시 멈춘다.** 실패를 무시하거나 임의로 완료 처리하지 않는다.

이 루프는 Wave의 모든 Task가 `"completed"`가 되거나, 실패/차단으로 멈출 때까지 반복한다. 한 번의 `/run-wave <WAVE_ID>` 실행 안에서 **다른 Wave로 넘어가지 않는다.**

## 6. `--resume`

`<WAVE_ID>`의 `tasks`에서 상태가 `"pending"` 또는 `"blocked"`인 것 중 `TASKS/00_TASK_LIST.md` Seq가 가장 앞선 Task를 찾는다.

- `"blocked"` Task가 있으면 그 Task부터 5-2(prepare)로 다시 진행한다(막혔던 원인이 그동안 해소됐는지부터 재확인 — 예를 들어 선행 Task가 그새 `completed`로 바뀌었는지).
- `"blocked"`는 없고 `"pending"`만 있으면 5-1부터 정상적으로 이어간다.
- 전부 `"completed"`면 8절(Wave 종료 처리)로 가서 Browser Checkpoint 대기 여부를 확인한다.
- `tasks` 자체가 아직 없으면(한 번도 시작한 적 없는 Wave) `--resume` 대신 `/run-wave <WAVE_ID>`로 처음 시작해야 한다고 안내하고 멈춘다.

## 7. Browser Checkpoint — Page Owner가 있는 Wave(규칙 4)

`<WAVE_ID>`의 `checkpoint_required`가 `true`(즉 그 Wave의 `task_ids`에 Page Owner Task가 포함된 화면 완성 Wave, 또는 최종 릴리스 확인 Wave)면, 그 Wave의 모든 Task가 `"completed"`가 되어도 Wave `status`를 곧바로 `"completed"`로 올리지 않는다.

- 대신 Wave `status`를 `"in_progress"`로 유지하고(별도의 "대기 중" 값을 만들지 않는다 — `checkpoint_required=true`이면서 모든 Task가 `completed`인 `in_progress` Wave가 곧 "Browser Checkpoint 대기 중"이라는 뜻이다), `checkpoint_result`는 `null`로 둔 채 종료한다.
- 사람이 로컬 실행(`npm run dev`) 또는 Vercel Preview로 해당 화면을 직접 확인하고, 그 결과를 `docs/preview-checks/<SCREEN_ID>.md`에 기록해야 한다(`scripts/check_screen_contract.py --mode=release` 검사 6이 이 파일을 확인한다).
- 사람이 확인 결과를 알려주면(이 세션 대화에서 "SCR-00X 확인했다, 문제없다" 등) 그때만 `checkpoint_result`를 `"PASS"`(문제 있었다면 `"FAIL"`)로 기록하고, `"PASS"`인 경우에만 Wave `status`를 `"completed"`로 올린다. `"FAIL"`이면 Wave `status`는 `"blocked"`로 바꾸고 어떤 재작업이 필요한지 사용자에게 되묻는다.
- **사람의 확인 전에는 다음 Wave를 자동으로 시작하지 않는다(규칙 5).** 이 커맨드는 스스로 "확인됐다"고 판단하거나 다음 `/run-wave <다음 WAVE_ID>`를 대신 호출하지 않는다.

`checkpoint_required`가 `false`인 Wave는 모든 Task가 `"completed"`가 되는 즉시 Wave `status`도 `"completed"`로 올린다.

## 8. Wave 종료 처리 요약

- 모든 Task `"completed"` + `checkpoint_required=false` → Wave `status: "completed"`.
- 모든 Task `"completed"` + `checkpoint_required=true` + `checkpoint_result` 미기록 → Wave `status: "in_progress"`로 유지, Browser Checkpoint 대기.
- 하나라도 `"blocked"` → Wave `status: "blocked"`, `blocked_reason` 기록, 즉시 중단.

## 9. 금지 사항(규칙 6)

- 자동 Commit을 하지 않는다. 사용자가 이번 실행에서 **명시적으로 Commit을 요청한 경우에만** `implement-task.md` 8절 규칙대로 Task 단위 Commit을 수행할 수 있다.
- 어떤 경우에도 자동 Push, 자동 PR 생성, 자동 Merge는 하지 않는다(`docs/DECISION_LOG.md` DEC-012, `CLAUDE.md` 21번 규칙).
- 자동 Branch 생성도 하지 않는다.

## 10. 종료 보고

`--status`/`--dry-run`을 제외한 모든 실행(기본 동작, `--resume`) 종료 시 아래 5개 항목을 반드시 보고한다:

1. **완료 Task** — 이번 실행에서 `"completed"`로 갱신된 Task ID 목록(각각의 `implement-task.md` 완료 보고 요약 포함).
2. **변경 파일** — 실제로 생성/수정된 파일 전체 목록(Task별 Expected Files와 대조).
3. **통과한 검사** — Task별로 실행되어 PASS한 검증(Unit/RLS/E2E/타입체크/Lint) 목록. 실행하지 못한 검증은 "미실행 — 사유"로 별도 표기한다.
4. **남은 수동 Browser 확인** — 아직 사람이 확인하지 않은 Browser Checkpoint(해당 Wave가 `checkpoint_required=true`이고 `checkpoint_result`가 없는 경우), 그리고 다음 확인 시 기록할 위치(`docs/preview-checks/<SCREEN_ID>.md`).
5. **다음에 입력할 명령** — 상황별로 정확히 하나를 제시한다: Wave가 `"blocked"`면 `/run-wave <WAVE_ID> --resume`(막힌 원인 해결 후), Browser Checkpoint 대기 중이면 확인 결과를 알려달라는 요청, Wave가 `"completed"`면 다음 Wave의 `/run-wave <다음 WAVE_ID>`.

`"blocked"`나 검증 실패로 멈췄다면 그 사실을 성공처럼 포장하지 않고 정확히 보고한다.
