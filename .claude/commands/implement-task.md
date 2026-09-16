---
description: prepare-task가 READY_TO_IMPLEMENT로 표시한 Task 하나를 Expected Files 범위 안에서 실제로 구현한다. 기본적으로 Commit·Push·PR은 하지 않는다.
argument-hint: "[TASK-ID] (생략 시 READY_TO_IMPLEMENT Task 중 가장 우선순위 높은 것 1개)"
---

## 0. Skill 로드와 범위

`traveler-project-pipeline` Skill을 로드한다(아직 로드하지 않았다면). 이 커맨드는 **이전 세 커맨드(`/gen-tasklist`, `/gen-task-details`, `/audit-tasks`)와 달리 실제 애플리케이션 코드를 작성하는 유일한 커맨드다.** 단, 아래 8개 규칙 밖의 일을 하지 않는다.

## 1. 대상 Task 선정 — READY_TO_IMPLEMENT 1개만

`TASKS/00_TASK_LIST.md`를 실제로 Read해 `prepare-task`가 `READY_TO_IMPLEMENT`로 표시한 Task를 찾는다.

- 인자로 Task ID가 주어지면 그 Task의 상태가 `READY_TO_IMPLEMENT`인지 확인한다. 아니면(예: `NOT_STARTED`, `DONE`, 존재하지 않는 ID) **구현하지 않고** 이유를 보고한 뒤 멈춘다.
- 인자가 없으면 `READY_TO_IMPLEMENT` 상태인 Task 중 `Seq`가 가장 작은(= Depends On 순서상 가장 앞선) Task **하나만** 고른다.
- `READY_TO_IMPLEMENT` 상태인 Task가 **하나도 없으면** 구현을 시작하지 않고, 먼저 `/prepare-task`로 다음 Task를 `READY_TO_IMPLEMENT`로 전이시켜야 한다고 안내한 뒤 멈춘다. 임의로 `NOT_STARTED` Task를 골라 대신 진행하지 않는다.
- 한 번의 실행에서 **정확히 1개** Task만 구현한다. 여러 Task를 동시에 진행하지 않는다(`CLAUDE.md` 7번 규칙).

Task를 고른 뒤 `TASKS/TASK-<ID>.md` 상세 파일을 **실제로 Read**한다(Context/Project Scope/Requirement Ref/Screen·Route·Page Entry/Design Ref/Depends On/Expected Files/Functional AC/Visual AC/Security-Privacy AC/Test Cases/Verify/Definition of Done/Forbidden 14개 절 전부).

### 1-1. 선행 조건 확인

Depends On에 열거된 Task들이 `TASKS/00_TASK_LIST.md`에서 이미 완료 상태인지 확인한다. 완료되지 않은 Depends On이 있으면 구현하지 않고 무엇이 선행되어야 하는지 보고한 뒤 멈춘다.

## 2. Expected Files 안에서만 작업 — 밖은 건드리지 않는다

상세 파일의 **Expected Files 목록에 있는 파일만** 생성·수정한다. 목록에 없는 파일을 고쳐야 할 것 같으면 **그 자리에서 멈추고** 왜 범위를 벗어나야 하는지, Expected Files를 갱신해야 하는지 사용자에게 보고한다 — 임의로 범위를 넓히지 않는다.

작업 전 대상 파일들의 현재 상태(신규인지 기존 수정인지)를 실제로 확인한다(추정하지 않는다).

## 3. Functional · Visual · Security AC를 따른다

구현은 상세 파일의 세 AC 절을 전부 충족해야 한다.

- **Functional AC**: 명시된 동작·상태 전이·검증 로직을 그대로 구현한다.
- **Visual AC**: `design-reference/D-001/DESIGN.md`의 색상/타이포/spacing/radius/shadow 토큰과 레이아웃 규칙(Section 여백, Card 열 수, Hero 높이 등)을 그대로 적용한다. 토큰에 없는 임의 색상·값을 추가하지 않는다.
- **Security/Privacy AC**: 특히 항공·숙소 입력값 미전송, RLS 전제, 공개 연락처 미노출 등 명시된 제약을 코드에 실제로 반영한다.

세 AC 중 하나라도 충족하지 못한 채로는 "구현 완료"로 보고하지 않는다.

## 4. Page Owner는 실제 Page Entry를 조립한다

Task의 Category가 `PAGE_OWNER`이면, 상세 파일의 Page Entry(`src/app/**/page.tsx`)에서 **이미 구현되어 있는 Component**들을 실제로 import·배치해 조립하는 것만 한다.

- 이 Task 안에서 새 Component 파일을 만들지 않는다(그건 각 `COMP-*` Task의 몫이며, 1-1절에서 이미 완료되어 있어야 한다).
- `PAGE-SCR001`이면 `create-next-app` 기본 Starter 콘텐츠(로고, "Get Started", Vercel 링크 등)가 완전히 제거되었는지 diff로 확인한다.
- `PAGE-SCR003`이면 항공/숙소/동행 구하기 3개 탭이 모두 실제로 렌더 트리에 포함되어 있는지 확인한다.
- `PAGE-SCR005`이면 현재 역할(Guest/Member/Admin)에 해당하는 영역만 조립되고, 역할에 없는 탭/섹션은 렌더링되지 않는지 확인한다.

## 5. 관련 Unit Test 실행

구현을 마친 뒤 이 Task와 관련된 Unit Test를 실행한다.

- Task 자체가 `UNIT_TEST` Category면, 이번에 작성한 테스트 파일을 실행해 통과를 확인한다.
- 그 외 Category(COMPONENT/API/INFRA/DB 등)면, 상세 파일의 **Verify** 열에 적힌 관련 Unit Test Task(예: `UNIT-TRAVEL-DATES`, `UNIT-CONTACT-DETECTION`, `UNIT-MATE-STATE`)가 이미 구현되어 있는 경우에만 해당 테스트를 실행해 회귀가 없는지 확인한다. 아직 그 Unit Test Task 자체가 구현되지 않았다면(테스트 파일이 없다면) 건너뛰고 그 사실을 보고에 남긴다 — 없는 테스트를 지어내거나 이 Task 범위에서 대신 작성하지 않는다.
- 타입 체크(`tsc --noEmit`)와 Lint도 함께 실행해 결과를 남긴다.

## 6. Playwright Smoke — Page Owner/E2E일 때만

Playwright(Chromium) Smoke Test는 **이 Task 자체의 Category가 `PAGE_OWNER` 또는 `E2E_TEST`일 때만** 실행한다.

- `PAGE_OWNER`: 이 Screen을 다루는 E2E Smoke Task(`E2E-PUBLIC-SMOKE`/`E2E-TRAVEL-TOOLS`/`E2E-MATE-AUTH` 중 해당하는 것)가 이미 구현되어 있으면 실행해 통과를 확인한다. 아직 그 E2E Task가 구현되지 않았다면 건너뛰고 보고에 남긴다.
- `E2E_TEST`: 이번에 작성/수정한 Spec을 직접 실행해 Chromium에서 통과하는지 확인한다.
- 그 외 Category(Component/Infra/Data/DB/API/Unit/CI/Release/Manual)에서는 Playwright를 실행하지 않는다.

## 7. 금지 사항

- AWS, EC2 등 인프라를 추가하지 않는다.
- Prisma 등 ORM을 추가하지 않는다 — DB 접근은 `@supabase/supabase-js` 쿼리 빌더만 사용한다(`docs/ARCHITECTURE.md` 8-3절).
- GitHub Auto-merge/Merge Queue 등 자동 Merge 기능을 추가하지 않는다.
- 상세 파일의 Forbidden 절에 적힌 항목(예: 항공·숙소 입력값 서버 전송, 6개 테이블 밖 신규 테이블, 공개 연락처 필드 등)을 위반하지 않는다.
- `docs/PROJECT_SCOPE.md`에서 EXCLUDED로 분류된 기능을 이 Task 범위에서 임의로 함께 구현하지 않는다.

## 8. Commit / Push / PR — 기본은 아무것도 하지 않는다

이 커맨드는 **기본적으로 Commit·Push·PR을 자동 수행하지 않는다.** 구현과 검증만 하고 Git 상태는 변경하지 않은 채로 둔다.

- 사용자가 이번 실행에서 **명시적으로 Commit을 요청한 경우에만**, 지금 구현한 **이 Task 하나에 해당하는 변경분만** 골라 Task 단위로 Commit할 수 있다(다른 미완료 작업이나 관련 없는 변경을 함께 커밋하지 않는다). Commit 메시지에는 Task ID를 포함한다.
- Commit을 요청받았더라도 **Push나 PR 생성은 별도로 명시적인 요청이 없는 한 하지 않는다.** Push/PR은 항상 사용자가 수동으로 수행한다(`docs/DECISION_LOG.md` DEC-012, `CLAUDE.md` 21번 규칙).
- Commit 전에는 항상 `git status`/`git diff`로 변경 범위가 Expected Files와 일치하는지 확인한다.

## 9. 완료 보고

작업을 마치면 아래 세 가지를 반드시 보고한다:

1. **변경 파일** — 실제로 생성/수정한 파일 목록(Expected Files와 정확히 일치하는지 함께 표시).
2. **검증 결과** — 실행한 Unit Test/타입체크/Lint/Playwright 결과(각각 통과/실패/미실행-사유).
3. **남은 제약사항** — 이번 Task에서 의도적으로 하지 않은 것(예: 아직 관련 Unit/E2E Task가 없어 건너뛴 검증), Depends On 관계상 아직 손대지 않은 부분, 다음으로 `READY_TO_IMPLEMENT`가 될 만한 Task 후보.

Definition of Done 전체 항목을 충족하지 못했다면 "완료"로 보고하지 않고 무엇이 남았는지 명시한다. Commit을 수행했다면 Commit 여부와 커밋 해시도 보고에 포함한다.
