# TASK-DATA-REPRESENTATIVE — free_traveler 대표 프로필 정적 데이터

**Category:** DATA  
**Implementation Status:** IMPLEMENT  
**Seq:** 11  
**Task ID:** DATA-REPRESENTATIVE

---

## Context

'free_traveler 대표 프로필 정적 데이터'를 `src/data/*`의 정적 TypeScript 상수로 제공하는 Task다. PROJECT_SCOPE.md의 결정에 따라 이 콘텐츠는 DB 테이블이 아니라 정적 데이터로 관리된다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-057, REQ-FUNC-058, REQ-FUNC-059, REQ-FUNC-060, REQ-FUNC-061). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-057, REQ-FUNC-058, REQ-FUNC-059, REQ-FUNC-060, REQ-FUNC-061

## Screen / Route / Page Entry

- Screen: -
- Route: -
- Page Entry: -

## Design Ref

- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)

## Depends On

- 없음(선행 Task 없이 시작 가능)

## Expected Files

- `src/data/profile.ts`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- `50+ Trips`/`30+ Countries` 단일 소스, 소개문·철학, Timeline 6개+, 방문국가 30개+, 대표 이미지 alt/출처 포함

## Visual AC

- 수치가 SCR-001/SCR-002 전역에서 동일 값 참조(하드코딩 중복 금지)

## Security/Privacy AC

- 인물 사진은 특정 서비스 보증으로 오인되지 않는 이미지만 사용

## Test Cases

- [Functional] `50+ Trips`/`30+ Countries` 단일 소스가 의도대로 동작하는지 확인한다.
- [Functional] 소개문·철학가 의도대로 동작하는지 확인한다.
- [Functional] Timeline 6개+가 의도대로 동작하는지 확인한다.
- [Functional] 방문국가 30개+가 의도대로 동작하는지 확인한다.
- [Functional] 대표 이미지 alt/출처 포함가 의도대로 동작하는지 확인한다.
- [Visual] 수치가 SCR-001/SCR-002 전역에서 동일 값 참조(하드코딩 중복 금지) 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.

## Verify

- 코드리뷰
- PAGE-SCR002

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
