# TASK-DATA-SAFETY — 국가 안전정보 정적 데이터

**Category:** DATA  
**Implementation Status:** IMPLEMENT  
**Seq:** 10  
**Task ID:** DATA-SAFETY

---

## Context

'국가 안전정보 정적 데이터'를 `src/data/*`의 정적 TypeScript 상수로 제공하는 Task다. PROJECT_SCOPE.md의 결정에 따라 이 콘텐츠는 DB 테이블이 아니라 정적 데이터로 관리된다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-046, REQ-FUNC-047, REQ-FUNC-048, REQ-FUNC-052, REQ-FUNC-053, REQ-NF-027). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-046, REQ-FUNC-047, REQ-FUNC-048, REQ-FUNC-052, REQ-FUNC-053, REQ-NF-027

## Screen / Route / Page Entry

- Screen: -
- Route: -
- Page Entry: -

## Design Ref

- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)

## Depends On

- 없음(선행 Task 없이 시작 가능)

## Expected Files

- `src/data/safety.ts`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 소개된 모든 해외 국가에 8개 카테고리(치안/사기/법규/교통/재난/보건/문화/긴급연락처) + 출처 + `verified_at` + 경보 범위(scope_type/scope_text) 포함

## Visual AC

- 필수 카테고리 누락 시 게시 불가(데이터 검증 스크립트 또는 타입 체크)

## Security/Privacy AC

- 공식 출처 URL만 사용, 임의 생성 정보 금지

## Test Cases

- [Functional] 소개된 모든 해외 국가에 8개 카테고리(치안/사기/법규/교통/재난/보건/문화/긴급연락처) + 출처 + `verified_at` + 경보 범위(scope_type/scope_text)가 의도대로 동작하는지 확인한다.
- [Visual] 필수 카테고리 누락 시 게시 불가(데이터 검증 스크립트 또는 타입 체크) 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.
- [Security/Privacy] 공식 출처 URL만 사용, 임의 생성 정보 금지 조건이 위반되지 않는지 확인한다.

## Verify

- 코드리뷰
- SCR-001-SAFETY-TAB

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
