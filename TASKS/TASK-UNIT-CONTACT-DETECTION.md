# TASK-UNIT-CONTACT-DETECTION — 연락처 탐지 단위 테스트

**Category:** UNIT_TEST  
**Implementation Status:** IMPLEMENT  
**Seq:** 57  
**Task ID:** UNIT-CONTACT-DETECTION

---

## Context

'연락처 탐지 단위 테스트'에 대한 단위 테스트 Task다. 관련 구현 Task의 순수 로직(날짜 계산, 패턴 탐지, 상태 전이)을 코드 레벨에서 검증한다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-032). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-032

## Screen / Route / Page Entry

- Screen: -
- Route: -
- Page Entry: -

## Design Ref

- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)
- docs/06_SRS_UIUX_REVISED.md 5절(Traceability), docs/PROJECT_SCOPE.md 확인 방법 열

## Depends On

- INFRA-CONTACT-DETECTION — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/lib/__tests__/contact-detection.test.ts`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 전화번호/이메일/카카오톡·텔레그램 패턴 탐지율 기준 테스트셋 기준 검증(오탐 케이스 포함)

## Visual AC

- 해당 없음(N/A)

## Security/Privacy AC

- 해당 없음(N/A)

## Test Cases

- [Functional] 전화번호/이메일/카카오톡·텔레그램 패턴 탐지율 기준 테스트셋 기준 검증(오탐 케이스 포함)가 의도대로 동작하는지 확인한다.
- [Visual] 해당 없음(N/A) 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.

## Verify

- CI-PIPELINE

## Definition of Done

- Functional AC, Visual AC, Security/Privacy AC 항목이 전부 충족된다.
- Expected Files 목록의 파일만 생성/수정되었다(목록 밖 파일 변경 없음).
- Depends On에 명시된 Task가 모두 완료된 상태다.
- 테스트가 실제로 작성되고 로컬/CI에서 통과한다.

## Forbidden

- Firefox/WebKit Playwright 프로젝트, 부하 테스트, 시각적 회귀 테스트를 추가하지 않는다.
- EC2 등 AWS 리소스를 프로비저닝하지 않는다.
- GitHub Auto-merge/Merge Queue 등 무인 자동 병합 설정을 추가하지 않는다.
- `user_profile`, `mate_post`, `mate_application`, `user_block`, `report`, `outbound_link_setting` 6개 테이블 외 신규 DB 테이블을 만들지 않는다.
- 항공·숙소 입력값을 서버 액션·DB·URL 쿼리 파라미터로 전달하지 않는다.
- 이 Task의 Requirement Ref에 없는 EXCLUDED Requirement 기능을 구현하지 않는다.
- 본 문서의 Expected Files 목록 밖의 파일을 생성·수정하지 않는다.
