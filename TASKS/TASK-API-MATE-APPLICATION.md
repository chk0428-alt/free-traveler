# TASK-API-MATE-APPLICATION — 참가 요청 제출/승인/거절 Server Action

**Category:** API  
**Implementation Status:** IMPLEMENT  
**Seq:** 17  
**Task ID:** API-MATE-APPLICATION

---

## Context

'참가 요청 제출/승인/거절 Server Action'를 처리하는 Server Action/Route Handler를 구현하는 Task다. Supabase `mate_application` 테이블에 대한 쓰기/상태 전이를 담당하며, DB-ACCESS 계층을 통해서만 데이터에 접근한다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-034, REQ-FUNC-035, REQ-FUNC-036, REQ-FUNC-043). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-034, REQ-FUNC-035, REQ-FUNC-036, REQ-FUNC-043

## Screen / Route / Page Entry

- Screen: SCR-004, SCR-005
- Route: `/mates`, `/account`
- Page Entry: `src/app/mates/actions/mate-application.ts`

## Design Ref

- design-reference/UI_CONTRACT.md 4절(SCR-004 `/mates` 동행 조회)
- design-reference/UI_CONTRACT.md 5절(SCR-005 `/account` 계정·관리)
- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/SCREEN_ROUTE_CONTRACT.json(Route/Page Entry 정본)

## Depends On

- DB-ACCESS — 이 Task 시작 전 완료되어 있어야 한다.
- INFRA-AUTH-GUARD — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/app/mates/actions/mate-application.ts`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 500자 이내 비공개 메시지, PENDING 저장, 동일 사용자 중복 PENDING/ACCEPTED 차단, 작성자만 승인/거절

## Visual AC

- 상태 변경 시 Toast로 확인

## Security/Privacy AC

- 참가 메시지는 작성자·요청자만 열람(RLS)

## Test Cases

- [Functional] 500자 이내 비공개 메시지가 의도대로 동작하는지 확인한다.
- [Functional] PENDING 저장가 의도대로 동작하는지 확인한다.
- [Functional] 동일 사용자 중복 PENDING/ACCEPTED 차단가 의도대로 동작하는지 확인한다.
- [Functional] 작성자만 승인/거절가 의도대로 동작하는지 확인한다.
- [Visual] 상태 변경 시 Toast로 확인 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.
- [Security/Privacy] 참가 메시지는 작성자·요청자만 열람(RLS) 조건이 위반되지 않는지 확인한다.

## Verify

- UNIT-MATE-STATE
- TEST-RLS-BASIC

## Definition of Done

- Functional AC, Visual AC, Security/Privacy AC 항목이 전부 충족된다.
- Expected Files 목록의 파일만 생성/수정되었다(목록 밖 파일 변경 없음).
- Depends On에 명시된 Task가 모두 완료된 상태다.
- Verify 열에 명시된 Test Task(있는 경우) 또는 코드리뷰로 결과가 확인된다.

## Forbidden

- Firefox/WebKit Playwright 프로젝트, 부하 테스트, 시각적 회귀 테스트를 추가하지 않는다.
- EC2 등 AWS 리소스를 프로비저닝하지 않는다.
- GitHub Auto-merge/Merge Queue 등 무인 자동 병합 설정을 추가하지 않는다.
- `user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `outbound_link_setting` 6개 테이블 외 신규 DB 테이블을 만들지 않는다.
- 항공·숙소 입력값을 서버 액션·DB·URL 쿼리 파라미터로 전달하지 않는다.
- 이 Task의 Requirement Ref에 없는 EXCLUDED Requirement 기능을 구현하지 않는다.
- 본 문서의 Expected Files 목록 밖의 파일을 생성·수정하지 않는다.
