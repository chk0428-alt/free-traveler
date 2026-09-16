# TASK-INFRA-OUTBOUND-LINK — 외부 링크 이동 유틸(새 탭/허용목록)

**Category:** INFRA  
**Implementation Status:** IMPLEMENT  
**Seq:** 4  
**Task ID:** INFRA-OUTBOUND-LINK

---

## Context

Screen에 종속되지 않는 공통 인프라/유틸리티 Task '외부 링크 이동 유틸(새 탭/허용목록)'다. 여러 Screen의 Component/Page Owner Task가 이 결과물에 의존한다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT**로 분류됨(대상 Requirement: REQ-FUNC-016, REQ-FUNC-018, REQ-FUNC-024, REQ-FUNC-026, REQ-FUNC-049, REQ-FUNC-077). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-016, REQ-FUNC-018, REQ-FUNC-024, REQ-FUNC-026, REQ-FUNC-049, REQ-FUNC-077

## Screen / Route / Page Entry

- Screen: -
- Route: -
- Page Entry: -

## Design Ref

- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)

## Depends On

- 없음(선행 Task 없이 시작 가능)

## Expected Files

- `src/lib/outbound-link.ts`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 설정된 URL만 새 탭으로 열기, 허용목록(HTTPS만) 밖 URL·미설정 시 이동 차단+재시도 UI

## Visual AC

- 오류 상태는 `color.danger` 인라인 배너로 표시

## Security/Privacy AC

- `target=_blank`+`rel="noopener noreferrer"` 강제, `javascript:`/`http:` URL 저장 차단

## Test Cases

- [Functional] 설정된 URL만 새 탭으로 열기가 의도대로 동작하는지 확인한다.
- [Functional] 허용목록(HTTPS만)가 의도대로 동작하는지 확인한다.
- [Functional] 밖 URL·미설정 시 이동 차단+재시도 UI가 의도대로 동작하는지 확인한다.
- [Visual] 오류 상태는 `color.danger` 인라인 배너로 표시 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.
- [Security/Privacy] `target=_blank`+`rel="noopener noreferrer"` 강제, `javascript:`/`http:` URL 저장 차단 조건이 위반되지 않는지 확인한다.

## Verify

- E2E-TRAVEL-TOOLS
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
