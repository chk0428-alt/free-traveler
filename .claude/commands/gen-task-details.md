---
description: TASKS/00_TASK_LIST.md의 각 구현 Task에 대해 TASKS/TASK-<ID>.md 상세 파일을 1:1로 생성/갱신하고, 직후 scripts/audit_tasks.py를 실행한다.
---

## 0. Skill 로드

`traveler-project-pipeline` Skill을 로드한다(아직 로드하지 않았다면). 특히 Skill 5절(14개 필수 절 구조)과 6절(18개 감사 항목)을 이번 작업의 템플릿·완료 기준으로 삼는다.

이 커맨드는 **구현 코드를 만들지 않는다.** 산출물은 `TASKS/TASK-<ID>.md` 마크다운 상세 파일뿐이며, 컴포넌트/Server Action/스키마 등 실제 애플리케이션 코드는 작성하지 않는다.

## 1. 선행 조건

`TASKS/00_TASK_LIST.md`가 없으면 **아무것도 만들지 않고** 먼저 `/gen-tasklist`를 실행하라고 안내한 뒤 멈춘다.

`TASKS/00_TASK_LIST.md`가 있으면 **실제로 Read**해 모든 카테고리 표의 구현 Task 행(Task ID, Type, Screen, Route, Page Entry, Depends On, Requirement Ref, Expected Files, Functional/Visual/Security AC, Verify, Priority)을 파악한다. `## NON_IMPLEMENTATION` 표의 Requirement는 이 단계에서 상세 파일을 만들지 않는다(Skill 규칙 16).

기존 `TASKS/TASK-*.md` 파일이 있으면 먼저 Read한다. 내용이 최신 `00_TASK_LIST.md`와 일치하면 그대로 두고, 달라졌으면(Requirement Ref, AC, Depends On 변경 등) 해당 파일만 갱신한다 — 이미 맞는 파일까지 불필요하게 다시 쓰지 않는다.

## 2. Task 상세 파일 작성

`Tasks` 표의 **모든 구현 Task 행**에 대해 `TASKS/TASK-<Task ID>.md`를 정확히 하나씩 작성/갱신한다(Skill 규칙 17 — Task List와 상세 파일 1:1). `TASKS/00_TASK_LIST.md`에 없는 Task ID로 된 상세 파일이 `TASKS/`에 남아 있으면 삭제해 1:1을 맞춘다.

각 상세 파일은 Skill 5절의 14개 절을 이 순서로 포함한다:

```markdown
# TASK-<ID> — <제목>

**Category:** ...
**Implementation Status:** ...
**Seq:** ...
**Task ID:** ...

---

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

### Expected Files 작성 규칙(Skill 규칙 4)

`docs/tasks/_src_app_tree_snapshot.json`(없으면 `python scripts/validate_inputs.py`를 먼저 실행해 생성)을 읽어 **현재 실제로 존재하는 파일**과 **아직 없어서 새로 만들어야 하는 파일**을 구분해서 적는다. 존재 여부를 확인하지 않고 추정해서 쓰지 않는다. Expected Files 밖의 파일은 이후 구현 단계에서도 수정하지 않는다는 점을 Forbidden 절에 명시한다.

### Page Owner Task 상세 작성 규칙

- **PAGE-SCR001**: Functional AC 또는 Test Cases에 "Next.js `create-next-app` 기본 템플릿(로고, Get Started 링크, Vercel 안내 등)이 제거되어 있다"를 명시한다(Skill 규칙 7).
- **PAGE-SCR003**: Depends On에 항공/숙소/동행 탭 Component Task 3개가 모두 포함되어야 하며, "세 탭이 각각 독립된 입력·검증·완료 상태를 유지한다"를 명시한다(Skill 규칙 8).
- **PAGE-SCR005**: Depends On에 Guest/Member/Admin Component Task가 모두 포함되어야 하며, "역할에 없는 탭/섹션은 렌더링하지 않는다"를 명시한다(Skill 규칙 9).
- **모든 Page Owner**: `design-reference/D-001/DESIGN.md` 17절과 `design-reference/UI_CONTRACT.md`에서 해당 Screen의 **Section 순서와 최소 콘텐츠 수**를 Functional AC에 그대로 옮긴다(Skill 규칙 19). "큰 빈 영역과 Placeholder 문구(`Lorem ipsum`, `준비 중`, `정보 확인 필요`) 금지", "데이터가 없을 때도 안내 문장·이용 방법·CTA가 있는 완성형 Empty State"를 명시한다(Skill 규칙 20).

### 항공·숙소 Component/Infra Task 작성 규칙(Skill 규칙 12)

관련 Task의 Security/Privacy AC에 "입력값을 서버 액션·DB·URL 쿼리 파라미터·서버 로그로 전달하지 않는다. 브라우저 메모리 상태로만 유지한다"를 명시한다.

### DB 관련 Task 작성 규칙(Skill 규칙 10)

DB에 접근하는 Task는 Skill 3절 6개 테이블 중 실제로 쓰는 것만 명시한다. 6개 목록 밖의 이름을 새 테이블처럼 쓰지 않는다. Prisma 등 ORM을 Expected Files/Functional AC에 포함하지 않는다(`docs/ARCHITECTURE.md` 8-3절).

### Test Task 작성 규칙(Skill 규칙 13)

Playwright(E2E) Task의 AC/설명에 Chromium만 사용한다고 명시하고, Firefox/WebKit 프로젝트나 부하·시각적 회귀 테스트를 포함하지 않는다고 명시한다.

## 3. 감사 자동 실행 (Skill 규칙 18) — 실패를 무시하지 않는다

상세 파일 작성/갱신을 마친 뒤 반드시 실행한다:

```
python scripts/audit_tasks.py
```

- **종료 코드 0(AUDIT_PASS)**: 18개 검사 결과를 요약해 사용자에게 보고하고, `TASKS/TASK_MANIFEST.csv`·`TASKS/TASK_AUDIT_REPORT.md`가 갱신되었음을 알린다.
- **종료 코드 1(AUDIT_FAIL)**: 실패한 검사 항목을 스크립트 출력 그대로 나열하고, 어떤 Task/상세 파일을 고쳐야 하는지 구체적으로 보고한다. **이 실패를 완료로 보고하지 않는다.** 자동으로 임의 수정하지 않는다 — 1:1 파일 정리처럼 명백히 기계적인 수정만 스스로 고친 뒤 재실행할 수 있으며, 그 경우 무엇을 왜 고쳤는지 보고한다.
- **종료 코드 2(NO_ARTIFACTS)**: 발생하면 안 되는 상태다(상세 파일을 이미 만들었으므로) — 발생 시 원인을 확인하고 사용자에게 알린다.

어떤 경우에도 `AUDIT_FAIL`이나 `NO_ARTIFACTS`를 "작업 완료"로 요약하지 않는다.
