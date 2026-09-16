# TASK-DB-RLS-BASE — Supabase RLS 정책

**Category:** DB  
**Implementation Status:** IMPLEMENT  
**Seq:** 13  
**Task ID:** DB-RLS-BASE

---

## Context

'Supabase RLS 정책'를 담당하는 Supabase 인프라 Task다. 이 프로젝트의 DB는 `user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `outbound_link_setting` 6개 테이블로 제한되며, 이 Task는 그 범위 안에서만 스키마/정책/접근 계층을 정의한다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-044, REQ-NF-013). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-044, REQ-NF-013

## Screen / Route / Page Entry

- Screen: -
- Route: -
- Page Entry: -

## Design Ref

- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- design-reference/SCREEN_ROUTE_CONTRACT.json(Route/Page Entry 정본)

## Depends On

- DB-SCHEMA-BASE — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `supabase/migrations/0002_rls_base.sql`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 본인 글/요청, 작성자, Moderator/Admin만 비공개 데이터 열람; 그 외 요청은 403 또는 빈 결과

## Visual AC

- 해당 없음(N/A)

## Security/Privacy AC

- RLS가 서버에서 강제(클라이언트 신뢰 금지)

## Test Cases

- [Functional] 본인 글/요청가 의도대로 동작하는지 확인한다.
- [Functional] Moderator/Admin만 비공개 데이터 열람가 의도대로 동작하는지 확인한다.
- [Functional] 그 외 요청은 403 또는 빈 결과가 의도대로 동작하는지 확인한다.
- [Visual] 해당 없음(N/A) 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.
- [Security/Privacy] RLS가 서버에서 강제(클라이언트 신뢰 금지) 조건이 위반되지 않는지 확인한다.

## Verify

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
- `user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `outbound_link_setting` 6개 외 테이블/뷰/함수를 이 Task 범위에서 추가하지 않는다.
