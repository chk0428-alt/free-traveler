# TASK-INFRA-CLIENT-STATE — 즐겨찾기 localStorage 유틸 + Toast 알림 컴포넌트

**Category:** INFRA  
**Implementation Status:** IMPLEMENT(축소)  
**Seq:** 3  
**Task ID:** INFRA-CLIENT-STATE

---

## Context

Screen에 종속되지 않는 공통 인프라/유틸리티 Task '즐겨찾기 localStorage 유틸 + Toast 알림 컴포넌트'다. 여러 Screen의 Component/Page Owner Task가 이 결과물에 의존한다.

## Project Scope

`docs/PROJECT_SCOPE.md`에서 **IMPLEMENT(축소)**로 분류됨(대상 Requirement: REQ-FUNC-068, REQ-FUNC-043). EXCLUDED 항목이 아니므로 상세 구현 Task로 존재한다.

## Requirement Ref

REQ-FUNC-068, REQ-FUNC-043

## Screen / Route / Page Entry

- Screen: -
- Route: -
- Page Entry: -

## Design Ref

- design-reference/D-001/DESIGN.md 2~6절(Color/Typography/Spacing/Radius/Shadow 토큰)

## Depends On

- INFRA-DESIGN-TOKENS — 이 Task 시작 전 완료되어 있어야 한다.

## Expected Files

- `src/lib/client/favorites.ts`(신규)
- `src/components/ui/Toast.tsx`(신규)

**이 목록 밖의 파일은 생성·수정하지 않는다.** 다른 파일 변경이 필요하다고 판단되면 이 Task를 완료 처리하지 말고 범위를 재확인한다.

## Functional AC

- 즐겨찾기는 `localStorage`에만 저장(서버 미전송), 중복 추가 방지; Toast는 상태 변경 시 일시 노출 후 자동 소멸

## Visual AC

- D-001 13절 Toast 스펙(잉크 배경/흰 텍스트) 준수

## Security/Privacy AC

- localStorage 키에 개인식별정보 저장 금지(여행지 ID만 저장)

## Test Cases

- [Functional] 즐겨찾기는 `localStorage`에만 저장(서버 미전송)가 의도대로 동작하는지 확인한다.
- [Functional] 중복 추가 방지가 의도대로 동작하는지 확인한다.
- [Functional] Toast는 상태 변경 시 일시 노출 후 자동 소멸가 의도대로 동작하는지 확인한다.
- [Visual] D-001 13절 Toast 스펙(잉크 배경/흰 텍스트) 준수 조건을 Desktop 1440px/Mobile 390px에서 육안 확인한다.
- [Security/Privacy] localStorage 키에 개인식별정보 저장 금지(여행지 ID만 저장) 조건이 위반되지 않는지 확인한다.

## Verify

- 코드리뷰
- E2E-PUBLIC-SMOKE

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
