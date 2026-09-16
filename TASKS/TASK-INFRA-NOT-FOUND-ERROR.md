# TASK-INFRA-NOT-FOUND-ERROR — 404/500 기술 Route

**Category:** INFRA  
**Implementation Status:** IMPLEMENT  
**Seq:** 7  
**Task ID:** INFRA-NOT-FOUND-ERROR

---

## Context

Screen에 종속되지 않는 공통 인프라/유틸리티 Task '404/500 기술 Route'다. 여러 Screen의 Component/Page Owner Task가 이 결과물에 의존한다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-078). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-078

## Screen / Route / Page Entry

- Screen: -
- Route: `*`
- Page Entry: `src/app/not-found.tsx`, `src/app/error.tsx`

## Design Ref

- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)

## Depends On

- INFRA-LAYOUT-SHELL — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/app/not-found.tsx`(신규)
- `src/app/error.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 404/500/외부연결 실패 시 홈 이동 또는 재시도 CTA 최소 1개 제공

## Visual AC

- 공통 Header/Footer 유지, D-001 톤 준수

## Security/Privacy AC

- 스택 트레이스 등 민감정보 미노출

## Test Cases

- [Functional] 404/500/외부연결 실패 시 홈 이동 또는 재시도 CTA 최소 1개 제공가 의도대로 동작하는지 확인한다.
- [Visual] 공통 Header/Footer 유지, D-001 톤 준수 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.
- [Security/Privacy] 스택 트레이스 등 민감정보 미노출 조건이 위반되지 않는지 확인한다.

## Verify

- E2E-PUBLIC-SMOKE
- 코드리뷰

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
